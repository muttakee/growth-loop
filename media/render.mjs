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

import {readFileSync, writeFileSync, mkdtempSync, existsSync} from 'node:fs';
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
