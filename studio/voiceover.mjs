// Make Reel voiceovers with ElevenLabs.
//   node voiceover.mjs <brand-slug> <week> [post-id ...]
// For every reel spec with "say" lines on its scenes, it speaks each line with the brand's voice
// (theme.json "voice"), lengthens a scene if its line runs longer than the scripted time, and writes
// content/media-inputs/<id>/voiceover.mp3 with each line starting at its scene. Updates the scene
// "seconds" in <id>.render.json. The API key comes from ELEVENLABS_API_KEY, or the session's
// network secret (the proxy injects it).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const [slug, week, ...only] = process.argv.slice(2);
if (!slug || !week) {
  console.error("Usage: node voiceover.mjs <brand-slug> <week> [post-id ...]");
  process.exit(1);
}
const brandDir = path.join(repo, "brands", slug);
const contentDir = path.join(brandDir, "weeks", week, "content");
const theme = JSON.parse(fs.readFileSync(path.join(brandDir, "assets", "theme.json"), "utf8"));
const voice = theme.voice;
if (!voice || voice.provider !== "elevenlabs") {
  console.error('theme.json has no "voice" with provider "elevenlabs"');
  process.exit(1);
}
const key = process.env.ELEVENLABS_API_KEY || "proxy-injected";
const PAD = 0.35; // seconds of air after each line

const duration = (f) =>
  Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());

// curl honours the HTTPS proxy settings (Node's fetch does not).
const speak = async (text, file) => {
  const body = JSON.stringify({ text, model_id: voice.model, language_code: voice.language });
  const code = execFileSync("curl", [
    "-sS", "-o", file, "-w", "%{http_code}", "-X", "POST",
    "-H", `xi-api-key: ${key}`, "-H", "Content-Type: application/json",
    "--data-binary", body,
    `https://api.elevenlabs.io/v1/text-to-speech/${voice.voiceId}?output_format=mp3_44100_128`,
  ]).toString();
  if (code !== "200") throw new Error(`ElevenLabs ${code}: ${fs.readFileSync(file, "utf8").slice(0, 300)}`);
};

const ids = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".render.json"))
  .map((f) => f.replace(/\.render\.json$/, ""))
  .filter((id) => only.length === 0 || only.includes(id))
  .sort();

for (const id of ids) {
  const specPath = path.join(contentDir, `${id}.render.json`);
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
  if (spec.format !== "reel" || !spec.scenes.some((s) => s.say)) continue;
  const dir = path.join(contentDir, "media-inputs", id);
  const tmp = path.join(dir, ".vo");
  fs.mkdirSync(tmp, { recursive: true });

  const parts = [];
  for (let i = 0; i < spec.scenes.length; i++) {
    const s = spec.scenes[i];
    if (!s.say) {
      parts.push(null);
      continue;
    }
    const f = path.join(tmp, `scene-${String(i + 1).padStart(2, "0")}.mp3`);
    await speak(s.say, f);
    const d = duration(f);
    if (d + PAD > s.seconds) s.seconds = Math.ceil((d + PAD) * 10) / 10;
    parts.push(f);
  }

  // Place each line at the start of its scene.
  let t = 0;
  const inputs = [];
  const filters = [];
  spec.scenes.forEach((s, i) => {
    if (parts[i]) {
      const n = inputs.length / 2;
      inputs.push("-i", parts[i]);
      const ms = Math.round(t * 1000);
      filters.push(`[${n}:a]adelay=${ms}|${ms}[a${n}]`);
    }
    t += s.seconds;
  });
  const n = inputs.length / 2;
  const mix = `${filters.join(";")};${Array.from({ length: n }, (_, k) => `[a${k}]`).join("")}amix=inputs=${n}:normalize=0,apad,atrim=0:${t}[out]`;
  const out = path.join(dir, spec.voiceover || "voiceover.mp3");
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", ...inputs, "-filter_complex", mix, "-map", "[out]", "-b:a", "160k", out]);
  fs.rmSync(tmp, { recursive: true, force: true });

  spec.voiceover = path.basename(out);
  fs.writeFileSync(specPath, JSON.stringify(spec, null, 2) + "\n");
  console.log(`✓ ${id}: ${path.relative(repo, out)} (${t.toFixed(1)} s, ${voice.name}, ${voice.model})`);
}
