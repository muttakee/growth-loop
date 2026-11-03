import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, delayRender, continueRender} from 'remotion';

// ---------- fonts (names come from the brand's brief, via the media spec) ----------

const fontsUrl = (style) => {
	const fam = (name) => `family=${encodeURIComponent(name).replace(/%20/g, '+')}:wght@300;400;500;600;700`;
	const names = [...new Set([style.fontLatin, style.fontMain].filter(Boolean))];
	return `https://fonts.googleapis.com/css2?${names.map(fam).join('&')}&display=block`;
};

// Latin font first: it has no Bangla (or other script) glyphs, so those fall back to the main
// font automatically. Mixed Bangla/English lines get the right font for each word.
export const family = (style) => [style.fontLatin, style.fontMain].filter(Boolean).map((f) => `'${f}'`).join(', ') + ', sans-serif';

export const useFonts = (style) => {
	const [handle] = useState(() => delayRender('Loading fonts'));
	useEffect(() => {
		const id = 'gl-fonts';
		let link = document.getElementById(id);
		if (!link) {
			link = document.createElement('link');
			link.id = id; link.rel = 'stylesheet'; link.href = fontsUrl(style);
			document.head.appendChild(link);
		}
		// The @font-face rules only exist once the stylesheet has loaded; asking for fonts before
		// that resolves with nothing and frames get captured with invisible text.
		const sheetReady = link.sheet ? Promise.resolve() : new Promise((res) => { link.addEventListener('load', res); link.addEventListener('error', res); });
		const names = [style.fontLatin, style.fontMain].filter(Boolean);
		// Load every weight the layouts use, for every script subset Google serves (Latin and
		// the brand's script), so no frame is captured before its glyphs exist.
		const sample = 'অআকখগ্রক্ষ ১২৩ AaZz 0123 ?!.,\'"+-=/';
		sheetReady.then(() => Promise.all(names.flatMap((n) => [300, 400, 500, 600, 700].map((w) => document.fonts.load(`${w} 40px '${n}'`, sample))))).then(() => document.fonts.ready).then(() => continueRender(handle)).catch(() => continueRender(handle));
	}, [handle, style]);
};

// ---------- text with *accent* highlights ----------

export const Rich = ({text, accent}) => {
	const parts = String(text).split(/(\*[^*]+\*)/g);
	return parts.map((p, i) => (p.startsWith('*') && p.endsWith('*')
		? <span key={i} style={{color: accent}}>{p.slice(1, -1)}</span>
		: <React.Fragment key={i}>{p}</React.Fragment>));
};

// ---------- blocks ----------

const sizes = {xl: 110, l: 84, m: 52, s: 38};

const Block = ({b, style, scale = 1}) => {
	const base = {textAlign: b.align || 'center', whiteSpace: 'pre-line', lineHeight: 1.3};
	switch (b.type) {
		case 'headline':
			return <div style={{...base, fontSize: (sizes[b.size] || sizes.xl) * scale, fontWeight: 700, lineHeight: 1.2}}><Rich text={b.text} accent={style.accent} /></div>;
		case 'text':
			return <div style={{...base, fontSize: (sizes[b.size] || sizes.m) * scale, fontWeight: 500}}><Rich text={b.text} accent={style.accent} /></div>;
		case 'kicker':
			return <div style={{...base, fontSize: sizes.s * scale, fontWeight: 600, color: style.accent, letterSpacing: 1}}><Rich text={b.text} accent={style.accent} /></div>;
		case 'list':
			return (
				<div style={{display: 'flex', flexDirection: 'column', gap: 26 * scale, alignSelf: 'stretch', padding: `0 ${40 * scale}px`}}>
					{b.items.map((it, i) => (
						<div key={i} style={{display: 'flex', gap: 24 * scale, alignItems: 'flex-start', fontSize: (sizes[b.size] || sizes.m) * scale, fontWeight: 500, lineHeight: 1.3}}>
							<span style={{color: style.accent, fontWeight: 700, minWidth: 40 * scale}}>{b.numbered ? `${i + 1}.` : '•'}</span>
							<span><Rich text={it} accent={style.accent} /></span>
						</div>
					))}
				</div>
			);
		case 'scale': {
			const n = b.items.length;
			const d = Math.min(96, Math.floor(980 / n) - 12) * scale;
			return (
				<div style={{display: 'flex', flexDirection: 'column', gap: 18 * scale, alignSelf: 'stretch', alignItems: 'center'}}>
					<div style={{display: 'flex', gap: 12 * scale}}>
						{b.items.map((it, i) => {
							const t = n > 1 ? i / (n - 1) : 1;
							return (
								<div key={i} style={{width: d, height: d, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
									fontSize: d * 0.45, fontWeight: 600, border: `${4 * scale}px solid ${t > 0.5 ? style.accent : style.text}`,
									background: `color-mix(in srgb, ${style.accent} ${Math.round(t * 100)}%, transparent)`}}>{it}</div>
							);
						})}
					</div>
					{b.labels && (
						<div style={{display: 'flex', justifyContent: 'space-between', width: n * (d + 12 * scale), fontSize: 32 * scale}}>
							<span>{b.labels[0]}</span><span>{b.labels[1]}</span>
						</div>
					)}
				</div>
			);
		}
		case 'spacer':
			return <div style={{height: (b.height || 60) * scale}} />;
		default:
			return null;
	}
};

// ---------- brand corners: person photo and logo ----------

const corner = (pos, inset) => {
	const [v, h] = (pos || 'bottom-right').split('-');
	return {position: 'absolute', [v]: inset.v, [h]: inset.h};
};

const Brand = ({style, inset, photoSize, logoSize, footer}) => (
	<>
		{style.photo && (
			<Img src={staticFile(style.photo)} style={{...corner(style.photoPosition || 'bottom-left', inset), width: photoSize, height: photoSize,
				borderRadius: '50%', objectFit: 'cover', border: `6px solid ${style.accent}`, background: '#fff'}} />
		)}
		{style.logo && (
			<Img src={staticFile(style.logo)} style={{...corner(style.logoPosition || 'bottom-right', inset), width: logoSize, objectFit: 'contain'}} />
		)}
		{footer && (
			<div style={{position: 'absolute', bottom: inset.v + photoSize * 0.3, left: (style.photo ? photoSize + 70 : 60), right: logoSize + 70,
				fontSize: 44, fontWeight: 600, lineHeight: 1.3}}><Rich text={footer} accent={style.accent} /></div>
		)}
	</>
);

// ---------- Card: one image, or one carousel card ----------

export const Card = ({style, card}) => {
	useFonts(style);
	const footer = card.blocks.find((b) => b.type === 'footer');
	const blocks = card.blocks.filter((b) => b.type !== 'footer');
	return (
		<AbsoluteFill style={{background: style.background, color: style.text, fontFamily: family(style)}}>
			<AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44,
				padding: '90px 60px 300px'}}>
				{blocks.map((b, i) => <Block key={i} b={b} style={style} />)}
			</AbsoluteFill>
			{card.page && (
				<div style={{position: 'absolute', top: 50, right: 60, fontSize: 30, fontWeight: 600, opacity: 0.8}}>{card.page}</div>
			)}
			<Brand style={style} inset={{v: 50, h: 50}} photoSize={200} logoSize={130} footer={footer && footer.text} />
		</AbsoluteFill>
	);
};

// ---------- Reel: silent vertical video, scene by scene ----------

export const reelDuration = (scenes, fps) => Math.max(1, Math.ceil(Math.max(...scenes.map((s) => s.end)) * fps));

const Scene = ({scene, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const inT = interpolate(t, [scene.start, scene.start + 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const outT = interpolate(t, [scene.end - 0.3, scene.end], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	if (t < scene.start || t >= scene.end) return null;
	return (
		// Text sits in the middle "safe zone": Reels' own buttons and caption cover the bottom and right.
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 50,
			padding: '290px 70px 860px', opacity: Math.min(inT, outT), transform: `translateY(${(1 - inT) * 40}px)`}}>
			{scene.blocks.map((b, i) => <Block key={i} b={b} style={style} scale={1.3} />)}
		</AbsoluteFill>
	);
};

export const Reel = ({style, scenes}) => {
	useFonts(style);
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	return (
		<AbsoluteFill style={{background: style.background, color: style.text, fontFamily: family(style)}}>
			{scenes.map((s, i) => <Scene key={i} scene={s} style={style} />)}
			<div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, background: style.accent}} />
			<Brand style={style} inset={{v: 690, h: 70}} photoSize={150} logoSize={120} />
		</AbsoluteFill>
	);
};
