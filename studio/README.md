# Studio: rendering posts with Remotion

Turns each post's `<id>.render.json` into ready-to-post media, using the brand's `assets/theme.json`
and logo. No brand is hardcoded: everything brand-specific comes from the brand folder.

```bash
cd studio
npm install                      # once
node render.mjs <brand-slug> <week> [post-id ...]   # e.g. node render.mjs vasha-academy 2026-W46
npm run studio                   # optional: live preview in the browser
```

Chromium: uses `REMOTION_CHROME` if set, else the pre-installed headless shell in cloud sessions,
else Remotion's own download.

## Files

| File | Who writes it | What |
|------|---------------|------|
| `brands/<slug>/assets/theme.json` | `/setup-brand` (from the brief's Visuals and audio) | colours, fonts, logo position and size, handle |
| `content/<id>.render.json` | Content Creator | what goes on each slide or scene (schema below) |
| `content/media-inputs/<id>/` | the team | screenshots, screen recordings, voiceover, music |
| `content/media/<id>/` | `render.mjs` | `slide-NN.png` (1080×1350) or `<id>.mp4` (1080×1920, 30 fps) |

If a file named in `render.json` isn't in `media-inputs/` yet, the post still renders without it
(text on brand colour) and the script lists what's missing. Re-run once the files are there.

## `theme.json`

```json
{
  "colors": { "primary": "#hex", "primaryDark": "#hex", "accent": "#hex", "background": "#hex", "text": "#hex" },
  "fonts": { "latin": "Plus Jakarta Sans", "main": "Hind Siliguri" },
  "logo": { "position": "top-left", "size": 84 },
  "handle": "example.com"
}
```

Fonts must be registered in `src/fonts.ts` (install the `@fontsource/...` package and add its files).
The Latin family comes first in the font stack; text in the main language falls through to `main`.

## `<id>.render.json`

**Image or carousel** (`"format": "image"` or `"carousel"`): one entry per slide.

```json
{
  "format": "carousel",
  "slides": [
    { "variant": "cover", "kicker": "small pill", "headline": "Hook", "body": "Sub-line" },
    { "kicker": "Step 1", "headline": "…", "body": "…", "bullets": ["…"], "image": "screen.png" },
    { "headline": "Prices", "table": [{ "title": "…", "rows": [{ "label": "…", "value": "৳২০", "old": "৳৫০" }] }],
      "note": "highlighted line" },
    { "variant": "cta", "headline": "…", "button": "example.com/offer" }
  ]
}
```

- `variant`: `cover` and `cta` use the brand-colour background; `content` (default after slide 1) is light.
- Optional fields: `kicker`, `body`, `bullets`, `table`, `note`, `image` (file in `media-inputs/<id>/`), `button`.

**Reel** (`"format": "reel"`): scenes in order.

```json
{
  "format": "reel",
  "scenes": [
    { "seconds": 2, "variant": "hook", "text": "On-screen hook", "background": "01-clip.mp4" },
    { "seconds": 5, "text": "On-screen text", "sub": "smaller line", "background": "screen.png" },
    { "seconds": 4, "variant": "cta", "text": "Offer", "sub": "example.com/offer" }
  ],
  "voiceover": "voiceover.mp3",
  "music": "music.mp3"
}
```

- `background`: an image or video in `media-inputs/<id>/`; without one the scene is brand colour.
- On-camera Reels: put the recorded clip as each scene's `background`; the text sits on a white card.
- Music plays quietly under the voiceover. Use only royalty-free music, and only if the brief allows it.
