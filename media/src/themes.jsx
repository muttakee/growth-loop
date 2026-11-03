import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {family, useFonts} from './compositions.jsx';

// Premium reel themes. Every colour and font still comes from the brand's style (the brief);
// a theme only changes layout, depth and motion. Pick one with "style": {"theme": "<name>"}.
//
//   editorial  light page, big left-aligned type, thin rules, chapter counter
//   glass      deep gradient, soft glow, frosted glass panel
//   kinetic    word-by-word reveal, accent words in solid pills, giant scene number
//   examcard   exam-style card on a grid, card header from the kicker
//   cinematic  dark, vignette and grain, slow push-in, blur-in type
//
// Safe zone (Meta, Oct 2026): keep text out of the top ~270px, bottom ~670px and 65px each side.

const SAFE = {top: 290, bottom: 700, side: 80};

const ease = Easing.bezier(0.22, 1, 0.36, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};

// mix two hex colours: t = 0 -> a, 1 -> b
const mix = (a, b, t) => {
	const p = (h) => [1, 3, 5].map((i) => parseInt(h.replace('#', '').padEnd(6, '0').slice(i - 1, i + 1), 16));
	const [x, y] = [p(a), p(b)];
	return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
};

const pad2 = (n) => String(n).padStart(2, '0');

// Split "a *b c* d" into words, keeping which ones are accented.
const words = (text) => {
	const out = [];
	String(text).split(/(\*[^*]+\*)/g).forEach((part) => {
		const acc = part.startsWith('*') && part.endsWith('*');
		const body = acc ? part.slice(1, -1) : part;
		body.split(/(\n)/).forEach((seg) => {
			if (seg === '\n') out.push({br: true});
			else seg.split(/\s+/).filter(Boolean).forEach((w) => out.push({w, acc}));
		});
	});
	return out;
};

// Scene timing helper: progress in/out for the active scene.
const useScene = (scene) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const active = t >= scene.start && t < scene.end;
	const local = t - scene.start;
	const len = scene.end - scene.start;
	const inP = interpolate(local, [0, 0.6], [0, 1], {...clamp, easing: ease});
	const outP = interpolate(local, [len - 0.35, len], [1, 0], clamp);
	return {active, local, len, inP, outP, t};
};

// Words that appear one after another (kinetic and editorial use this).
const Words = ({text, local, delay = 0, step = 0.07, accentStyle, baseStyle, pop = false}) => {
	const list = words(text);
	let k = 0;
	return (
		<span style={baseStyle}>
			{list.map((it, i) => {
				if (it.br) return <br key={i} />;
				const d = delay + k++ * step;
				const p = interpolate(local, [d, d + 0.45], [0, 1], {...clamp, easing: ease});
				const tr = pop ? `scale(${0.7 + 0.3 * p})` : `translateY(${(1 - p) * 60}%)`;
				return (
					<span key={i} style={{display: 'inline-block', overflow: pop ? 'visible' : 'hidden', verticalAlign: 'top', marginRight: '0.28em'}}>
						<span style={{display: 'inline-block', opacity: p, transform: tr, ...(it.acc ? accentStyle : {})}}>{it.w}</span>
					</span>
				);
			})}
		</span>
	);
};

const blockOf = (scene, type) => scene.blocks.find((b) => b.type === type);
const restOf = (scene) => scene.blocks.filter((b) => !['kicker', 'headline'].includes(b.type));

// Person photo and logo, kept inside the safe zone.
const BrandRow = ({style, light}) => (
	<>
		{style.photo && (
			<Img src={staticFile(style.photo)} style={{position: 'absolute', left: SAFE.side, bottom: SAFE.bottom - 10, width: 140, height: 140,
				borderRadius: '50%', objectFit: 'cover', border: `5px solid ${style.accent}`, background: '#fff'}} />
		)}
		{style.logo && (
			<Img src={staticFile(style.logo)} style={{position: 'absolute', right: SAFE.side, bottom: SAFE.bottom + 20, width: 120, objectFit: 'contain',
				filter: light ? 'none' : 'none'}} />
		)}
	</>
);

const grain = `url("data:image/svg+xml;utf8,${encodeURIComponent(
	'<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="1"/></svg>',
)}")`;

// ---------------- 1. editorial ----------------

const Editorial = ({style, scene, index, total}) => {
	const {active, local, inP, outP} = useScene(scene);
	if (!active) return null;
	const ink = style.background; // brand navy as ink on a light page
	const k = blockOf(scene, 'kicker');
	const h = blockOf(scene, 'headline');
	return (
		<AbsoluteFill style={{opacity: outP, padding: `${SAFE.top + 40}px ${SAFE.side + 20}px ${SAFE.bottom + 220}px`, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36, color: ink}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 24, fontFamily: family(style), fontWeight: 500, fontSize: 30, letterSpacing: 4, opacity: 0.7}}>
				<span>{pad2(index + 1)}</span>
				<div style={{height: 2, background: ink, width: interpolate(inP, [0, 1], [0, 520])}} />
				<span>{pad2(total)}</span>
			</div>
			{k && <div style={{fontSize: 42, fontWeight: 600, color: style.accent, letterSpacing: 2}}><Words text={k.text} local={local} step={0.05} /></div>}
			{h && (
				<div style={{fontSize: 118, fontWeight: 700, lineHeight: 1.12}}>
					<Words text={h.text} local={local} delay={0.1} accentStyle={{color: style.accent}} />
				</div>
			)}
			{restOf(scene).map((b, i) => b.type === 'text' && (
				<div key={i} style={{fontSize: 56, fontWeight: 400, lineHeight: 1.3, opacity: 0.85, borderLeft: `6px solid ${style.accent}`, paddingLeft: 28}}>
					<Words text={b.text} local={local} delay={0.35} step={0.05} accentStyle={{color: style.accent, fontWeight: 600}} />
				</div>
			))}
		</AbsoluteFill>
	);
};

// ---------------- 2. glass ----------------

const Glass = ({style, scene}) => {
	const {active, local, inP, outP} = useScene(scene);
	if (!active) return null;
	const k = blockOf(scene, 'kicker');
	const h = blockOf(scene, 'headline');
	return (
		<AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `${SAFE.top}px ${SAFE.side}px ${SAFE.bottom + 200}px`, opacity: outP}}>
			<div style={{width: '100%', padding: '80px 64px', borderRadius: 56, background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.20)',
				boxShadow: '0 40px 120px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)', backdropFilter: 'blur(28px)',
				transform: `translateY(${(1 - inP) * 50}px) scale(${0.96 + 0.04 * inP})`, opacity: inP, textAlign: 'center',
				display: 'flex', flexDirection: 'column', gap: 34}}>
				{k && <div style={{alignSelf: 'center', fontSize: 34, fontWeight: 600, padding: '12px 30px', borderRadius: 999, background: style.accent, color: style.background}}>{k.text.replace(/\*/g, '')}</div>}
				{h && <div style={{fontSize: 112, fontWeight: 700, lineHeight: 1.15}}><Words text={h.text} local={local} delay={0.15} step={0.06} accentStyle={{color: style.accent, textShadow: `0 0 40px ${style.accent}88`}} /></div>}
				{restOf(scene).map((b, i) => b.type === 'text' && (
					<div key={i} style={{fontSize: 56, fontWeight: 400, lineHeight: 1.35, opacity: 0.9}}><Words text={b.text} local={local} delay={0.4} step={0.05} accentStyle={{color: style.accent, fontWeight: 600}} /></div>
				))}
			</div>
		</AbsoluteFill>
	);
};

const GlassBg = ({style}) => {
	const frame = useCurrentFrame();
	const dx = Math.sin(frame / 90) * 60;
	const dy = Math.cos(frame / 110) * 50;
	return (
		<AbsoluteFill style={{background: `radial-gradient(120% 80% at 30% 20%, ${mix(style.background, '#ffffff', 0.12)} 0%, ${style.background} 45%, ${mix(style.background, '#000000', 0.55)} 100%)`}}>
			<div style={{position: 'absolute', width: 900, height: 900, borderRadius: '50%', left: 420 + dx, top: 180 + dy, background: style.accent, opacity: 0.45, filter: 'blur(160px)'}} />
			<div style={{position: 'absolute', width: 800, height: 800, borderRadius: '50%', left: -300 - dx, top: 1050 - dy, background: mix(style.background, '#4da3ff', 0.6), opacity: 0.35, filter: 'blur(170px)'}} />
		</AbsoluteFill>
	);
};

// ---------------- 3. kinetic ----------------

const Kinetic = ({style, scene, index}) => {
	const {active, local, inP, outP} = useScene(scene);
	if (!active) return null;
	const k = blockOf(scene, 'kicker');
	const h = blockOf(scene, 'headline');
	const pill = {background: style.accent, color: style.background, padding: '0 0.22em', borderRadius: '0.18em'};
	return (
		<AbsoluteFill style={{opacity: outP}}>
			<div style={{position: 'absolute', right: -40, top: 360, fontFamily: family(style), fontWeight: 700, fontSize: 760, lineHeight: 1,
				color: 'transparent', WebkitTextStroke: `4px ${style.accent}`, opacity: 0.16 * inP, transform: `translateX(${(1 - inP) * 120}px)`}}>{pad2(index + 1)}</div>
			<AbsoluteFill style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 30,
				padding: `${SAFE.top}px ${SAFE.side + 10}px ${SAFE.bottom + 220}px`}}>
				{k && <div style={{fontSize: 44, fontWeight: 600, color: style.accent}}><Words text={k.text} local={local} step={0.05} pop /></div>}
				{h && <div style={{fontSize: 132, fontWeight: 700, lineHeight: 1.18}}><Words text={h.text} local={local} delay={0.12} step={0.11} pop accentStyle={pill} /></div>}
				{restOf(scene).map((b, i) => b.type === 'text' && (
					<div key={i} style={{fontSize: 60, fontWeight: 500, lineHeight: 1.35}}><Words text={b.text} local={local} delay={0.5} step={0.08} pop accentStyle={{color: style.accent}} /></div>
				))}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// ---------------- 4. examcard ----------------

const ExamCard = ({style, scene, index, total}) => {
	const {active, local, inP, outP} = useScene(scene);
	if (!active) return null;
	const k = blockOf(scene, 'kicker');
	const h = blockOf(scene, 'headline');
	const ink = style.background;
	return (
		<AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `${SAFE.top}px ${SAFE.side}px ${SAFE.bottom + 200}px`, opacity: outP}}>
			<div style={{width: '100%', borderRadius: 36, background: style.text, color: ink, overflow: 'hidden',
				boxShadow: '0 50px 100px rgba(0,0,0,0.45)', opacity: inP,
				transform: `translateY(${(1 - inP) * 120}px) rotate(${(1 - inP) * -3}deg)`}}>
				<div style={{background: style.accent, color: ink, padding: '26px 48px', display: 'flex', justifyContent: 'space-between', fontSize: 36, fontWeight: 600}}>
					<span>{k ? k.text.replace(/\*/g, '') : 'IELTS'}</span>
					<span style={{opacity: 0.75}}>{pad2(index + 1)}/{pad2(total)}</span>
				</div>
				<div style={{padding: '64px 56px 72px', display: 'flex', flexDirection: 'column', gap: 34}}>
					{h && <div style={{fontSize: 104, fontWeight: 700, lineHeight: 1.15}}><Words text={h.text} local={local} delay={0.2} step={0.06} accentStyle={{color: style.accent}} /></div>}
					{restOf(scene).map((b, i) => b.type === 'text' && (
						<div key={i} style={{fontSize: 54, fontWeight: 500, lineHeight: 1.4, display: 'flex', gap: 22}}>
							<span style={{width: 10, borderRadius: 6, background: style.accent, flexShrink: 0}} />
							<span><Words text={b.text} local={local} delay={0.45} step={0.05} accentStyle={{color: style.accent, fontWeight: 700}} /></span>
						</div>
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};

const GridBg = ({style}) => (
	<AbsoluteFill style={{background: style.background,
		backgroundImage: `linear-gradient(${style.text}14 2px, transparent 2px), linear-gradient(90deg, ${style.text}14 2px, transparent 2px)`,
		backgroundSize: '72px 72px'}} />
);

// ---------------- 5. cinematic ----------------

const Cinematic = ({style, scene}) => {
	const {active, local, len, inP, outP} = useScene(scene);
	if (!active) return null;
	const k = blockOf(scene, 'kicker');
	const h = blockOf(scene, 'headline');
	const push = interpolate(local, [0, len], [1, 1.06]);
	const blur = interpolate(local, [0, 0.7], [14, 0], clamp);
	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 40,
			padding: `${SAFE.top}px ${SAFE.side + 20}px ${SAFE.bottom + 220}px`, opacity: Math.min(outP, inP), transform: `scale(${push})`, filter: `blur(${blur}px)`}}>
			{k && <div style={{fontSize: 36, fontWeight: 300, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.8}}>{k.text.replace(/\*/g, '')}</div>}
			{k && <div style={{width: interpolate(inP, [0, 1], [0, 160]), height: 3, background: style.accent}} />}
			{h && <div style={{fontSize: 124, fontWeight: 700, lineHeight: 1.15, textShadow: '0 10px 60px rgba(0,0,0,0.6)'}}><Words text={h.text} local={local} delay={0.1} step={0.08} accentStyle={{color: style.accent}} /></div>}
			{restOf(scene).map((b, i) => b.type === 'text' && (
				<div key={i} style={{fontSize: 54, fontWeight: 300, lineHeight: 1.4, opacity: 0.9}}><Words text={b.text} local={local} delay={0.4} step={0.06} accentStyle={{color: style.accent, fontWeight: 600}} /></div>
			))}
		</AbsoluteFill>
	);
};

const CinemaBg = ({style}) => (
	<AbsoluteFill style={{background: `radial-gradient(90% 60% at 50% 42%, ${mix(style.background, '#000000', 0.35)} 0%, ${mix(style.background, '#000000', 0.8)} 100%)`}}>
		<AbsoluteFill style={{backgroundImage: grain, opacity: 0.09, mixBlendMode: 'overlay'}} />
		<AbsoluteFill style={{boxShadow: 'inset 0 0 260px rgba(0,0,0,0.85)'}} />
	</AbsoluteFill>
);

// ---------------- reel ----------------

const THEMES = {
	editorial: {Scene: Editorial, Bg: ({style}) => <AbsoluteFill style={{background: style.text}} />, light: true},
	glass: {Scene: Glass, Bg: GlassBg},
	kinetic: {Scene: Kinetic, Bg: ({style}) => <AbsoluteFill style={{background: style.background}} />},
	examcard: {Scene: ExamCard, Bg: GridBg},
	cinematic: {Scene: Cinematic, Bg: CinemaBg},
};

export const ThemedReel = ({style, scenes}) => {
	useFonts(style);
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const theme = THEMES[style.theme] || THEMES.kinetic;
	const {Scene, Bg} = theme;
	const fg = theme.light ? style.background : style.text;
	return (
		<AbsoluteFill style={{fontFamily: family(style), color: fg}}>
			<Bg style={style} />
			{scenes.map((s, i) => <Scene key={i} style={style} scene={s} index={i} total={scenes.length} />)}
			<div style={{position: 'absolute', top: SAFE.top - 40, left: SAFE.side, right: SAFE.side, height: 6, borderRadius: 3, background: `${fg}22`}}>
				<div style={{height: '100%', borderRadius: 3, width: `${(frame / durationInFrames) * 100}%`, background: style.accent}} />
			</div>
			<BrandRow style={style} light={theme.light} />
		</AbsoluteFill>
	);
};

export const THEME_NAMES = Object.keys(THEMES);
