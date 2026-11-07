// Render a brand's posts to media with Remotion.
//   node render.mjs <brand-slug> <week> [post-id ...]
// Reads   brands/<slug>/assets/theme.json, brands/<slug>/assets/logo.*
//         brands/<slug>/weeks/<week>/content/<id>.render.json
//         brands/<slug>/weeks/<week>/content/media-inputs/<id>/  (screenshots, recordings, audio)
// Writes  brands/<slug>/weeks/<week>/content/media/<id>/slide-NN.png  or  <id>.mp4
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const [slug, week, ...only] = process.argv.slice(2);
if (!slug || !week) {
  console.error("Usage: node render.mjs <brand-slug> <week> [post-id ...]");
  process.exit(1);
}

const brandDir = path.join(repo, "brands", slug);
const contentDir = path.join(brandDir, "weeks", week, "content");
const theme = JSON.parse(fs.readFileSync(path.join(brandDir, "assets", "theme.json"), "utf8"));

// Everything the page loads goes through Remotion's public/ folder (git-ignored).
const pub = path.join(here, "public");
const job = path.join(pub, "_job", slug);
fs.rmSync(job, { recursive: true, force: true });
fs.mkdirSync(job, { recursive: true });

const logoFile = fs.readdirSync(path.join(brandDir, "assets")).find((f) => /^logo\.(png|jpe?g|svg|webp)$/i.test(f));
let logo = null;
if (logoFile) {
  fs.copyFileSync(path.join(brandDir, "assets", logoFile), path.join(job, logoFile));
  logo = `_job/${slug}/${logoFile}`;
}

const specs = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".render.json"))
  .map((f) => f.replace(/\.render\.json$/, ""))
  .filter((id) => only.length === 0 || only.includes(id))
  .sort();
if (specs.length === 0) {
  console.error("No matching <id>.render.json files in", contentDir);
  process.exit(1);
}

const browserExecutable = process.env.REMOTION_CHROME || (fs.existsSync("/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell") ? "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell" : null);

// Copy this post's inputs; drop references to files the team hasn't supplied yet (rendered as text-only).
const prepareInputs = (id, spec, missing) => {
  const src = path.join(contentDir, "media-inputs", id);
  const dst = path.join(job, id);
  fs.mkdirSync(dst, { recursive: true });
  if (fs.existsSync(src)) fs.cpSync(src, dst, { recursive: true });
  const has = (f) => f && fs.existsSync(path.join(dst, f));
  const check = (obj, key) => {
    if (obj[key] && !has(obj[key])) {
      missing.push(obj[key]);
      delete obj[key];
    }
  };
  (spec.slides || []).forEach((s) => check(s, "image"));
  (spec.scenes || []).forEach((s) => check(s, "background"));
  check(spec, "music");
  check(spec, "voiceover");
  return `_job/${slug}/${id}`;
};

// Copy every post's inputs first: the bundle snapshots public/ when it is built.
const jobs = specs.map((id) => {
  const spec = JSON.parse(fs.readFileSync(path.join(contentDir, `${id}.render.json`), "utf8"));
  const missing = [];
  const mediaDir = prepareInputs(id, spec, missing);
  return { id, spec, missing, mediaDir };
});

console.log("Bundling…");
const serveUrl = await bundle({ entryPoint: path.join(here, "src", "index.ts"), publicDir: pub });

for (const { id, spec, missing, mediaDir } of jobs) {
  const out = path.join(contentDir, "media", id);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  const base = { theme, logo, mediaDir };

  if (spec.format === "reel") {
    const inputProps = { ...base, scenes: spec.scenes, music: spec.music, voiceover: spec.voiceover };
    const composition = await selectComposition({ serveUrl, id: "Reel", inputProps, browserExecutable });
    const file = path.join(out, `${id}.mp4`);
    await renderMedia({ serveUrl, composition, codec: "h264", outputLocation: file, inputProps, browserExecutable });
    console.log(`✓ ${id}: ${path.relative(repo, file)}`);
  } else {
    const slides = spec.slides;
    for (let i = 0; i < slides.length; i++) {
      const inputProps = { ...base, slide: slides[i], index: i, total: slides.length };
      const composition = await selectComposition({ serveUrl, id: "Slide", inputProps, browserExecutable });
      const file = path.join(out, `slide-${String(i + 1).padStart(2, "0")}.png`);
      await renderStill({ serveUrl, composition, output: file, inputProps, browserExecutable });
    }
    console.log(`✓ ${id}: ${slides.length} image(s) in ${path.relative(repo, out)}`);
  }
  if (missing.length) console.log(`  ! not supplied yet (rendered without): ${missing.join(", ")}`);
}
