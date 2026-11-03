#!/usr/bin/env node
// Renders the media for one post from the "## Media spec" JSON block in its post file.
//
//   node media/render.mjs brands/<slug>/weeks/<week>/content/<file>.md
//
// image    -> <file>.png
// carousel -> <file>-1.png, <file>-2.png, ...
// reel     -> <file>.mp4 (silent: no audio track)
// text / live posts have no media spec and are skipped.
//
// Brand assets (logo, person photo) are read from brands/<slug>/assets/.
// Set CHROME_PATH to use an installed Chrome/Chromium instead of Remotion's own download.

import {readFileSync, writeFileSync, mkdtempSync, existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, basename, resolve, join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const postPath = process.argv[2];
if (!postPath) {
	console.error('Usage: node media/render.mjs <path to post .md>');
	process.exit(2);
}
const post = resolve(postPath);
const md = readFileSync(post, 'utf8');

const section = md.split(/^## Media spec\s*$/m)[1];
const json = section && section.match(/```json\s*([\s\S]*?)```/);
if (!json) {
	console.log(`No "## Media spec" JSON in ${postPath}: nothing to render (text or live post).`);
	process.exit(0);
}
const spec = JSON.parse(json[1]);

// brands/<slug>/weeks/<week>/content/<file>.md -> brands/<slug>/assets
const contentDir = dirname(post);
const assets = resolve(contentDir, '..', '..', '..', 'assets');
for (const key of ['logo', 'photo']) {
	if (spec.style[key] && !existsSync(join(assets, spec.style[key]))) {
		console.error(`Missing brand asset: ${join(assets, spec.style[key])}`);
		process.exit(1);
	}
}

// ----- reel theme rotation -----
// "theme": "random" picks one of the allowed themes at random, but not one used by the last two
// reels of the same week. The pick is written back into the post file, so re-renders keep it and
// the next reel can see what was used.
const ALL_THEMES = ['editorial', 'glass', 'kinetic', 'examcard', 'cinematic'];
if (spec.format === 'reel' && spec.style.theme === 'random') {
	const allowed = (spec.style.themes && spec.style.themes.length ? spec.style.themes : ALL_THEMES).filter((t) => ALL_THEMES.includes(t));
	const recent = readdirSync(contentDir)
		.filter((f) => f.endsWith('.md') && f !== basename(post))
		.map((f) => ({f, md: readFileSync(join(contentDir, f), 'utf8')}))
		.map(({f, md: m}) => {
			const sec = m.split(/^## Media spec\s*$/m)[1];
			const js = sec && sec.match(/```json\s*([\s\S]*?)```/);
			try { const sp = js && JSON.parse(js[1]); return sp && sp.format === 'reel' && ALL_THEMES.includes(sp.style.theme) ? {f, theme: sp.style.theme, mtime: statSync(join(contentDir, f)).mtimeMs} : null; } catch { return null; }
		})
		.filter(Boolean)
		.sort((a, b) => b.mtime - a.mtime)
		.slice(0, 2)
		.map((r) => r.theme);
	let pool = allowed.filter((t) => !recent.includes(t));
	if (!pool.length) pool = allowed.filter((t) => t !== recent[0]);
	if (!pool.length) pool = allowed;
	const pick = pool[Math.floor(Math.random() * pool.length)];
	spec.style.theme = pick;
	const updated = md.replace(/("theme"\s*:\s*)"random"/, `$1"${pick}"`);
	writeFileSync(post, updated);
	console.log(`Reel theme: ${pick} (picked at random from ${pool.join(', ')}; recent reels used: ${recent.join(', ') || 'none'})`);
}

const base = basename(post, '.md');
const tmp = mkdtempSync(join(tmpdir(), 'gl-media-'));
const outputs = [];

const remotion = (args, props) => {
	const propsFile = join(tmp, `props-${outputs.length}.json`);
	writeFileSync(propsFile, JSON.stringify(props));
	const browser = process.env.CHROME_PATH ? [`--browser-executable=${process.env.CHROME_PATH}`] : [];
	const r = spawnSync('npx', ['remotion', ...args, `--props=${propsFile}`, `--public-dir=${assets}`, ...browser, '--log=error'],
		{cwd: here, stdio: 'inherit'});
	if (r.status !== 0) process.exit(r.status || 1);
};

if (spec.format === 'image') {
	const out = join(contentDir, `${base}.png`);
	remotion(['still', 'src/index.jsx', 'Card', out], {style: spec.style, card: spec.cards[0], size: spec.size});
	outputs.push(out);
} else if (spec.format === 'carousel') {
	spec.cards.forEach((card, i) => {
		const out = join(contentDir, `${base}-${i + 1}.png`);
		const page = spec.pageNumbers === false ? undefined : `${i + 1}/${spec.cards.length}`;
		remotion(['still', 'src/index.jsx', 'Card', out], {style: spec.style, card: {...card, page}, size: spec.size});
		outputs.push(out);
	});
} else if (spec.format === 'reel') {
	const out = join(contentDir, `${base}.mp4`);
	remotion(['render', 'src/index.jsx', 'Reel', out, '--muted', '--codec=h264'], {style: spec.style, scenes: spec.scenes});
	outputs.push(out);
} else {
	console.error(`Unknown format "${spec.format}" (expected image, carousel or reel).`);
	process.exit(1);
}

console.log('Rendered:\n' + outputs.map((o) => '  ' + o).join('\n'));
