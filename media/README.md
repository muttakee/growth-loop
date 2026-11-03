# GrowthLoop media (Remotion)

Renders the media for a post from the `## Media spec` JSON block in its post file
(`brands/<slug>/weeks/<week>/content/<file>.md`). Run from the repo root:

```bash
node media/render.mjs brands/<slug>/weeks/<week>/content/<file>.md
```

First time: `cd media && npm ci`. In the cloud container, set `CHROME_PATH=/opt/pw-browsers/chromium`
so Remotion uses the installed browser instead of downloading one.

| `format` | Output (next to the post file) | Size |
|----------|-------------------------------|------|
| `image` | `<file>.png` | 1080 x 1350 (4:5), or 1080 x 1080 with `"size": "square"` |
| `carousel` | `<file>-1.png`, `<file>-2.png`, ... (page numbers on each card) | 1080 x 1350 |
| `reel` | `<file>.mp4`, **silent** (no audio track), 30 fps, H.264 | 1080 x 1920 |

Text and live posts have no media spec, and are skipped.

Remotion's licence is free for individuals and companies with up to 3 people. Larger companies
need a company licence (see remotion.dev/license).

## Media spec

```json
{
  "format": "image | carousel | reel",
  "style": {
    "background": "#hex", "text": "#hex", "accent": "#hex",
    "fontMain": "Google font for the brand's main language (e.g. Bangla)",
    "fontLatin": "Google font for English text",
    "logo": "logo.png", "logoPosition": "bottom-right",
    "photo": "photo.png", "photoPosition": "bottom-left"
  },
  "cards": [ { "blocks": [ ... ] } ],
  "scenes": [ { "start": 0, "end": 2.5, "blocks": [ ... ] } ]
}
```

- **`style`:** copied from the brand's `brief.md` (Visuals and audio, and Assets). Nothing
  brand-specific is hardcoded in the code. `logo` and `photo` are file names in
  `brands/<slug>/assets/`; leave `photo` out for business profiles without a person photo.
  Positions: `top-left`, `top-right`, `bottom-left`, `bottom-right`.
- **`cards`:** one card for `image`, 2–10 for `carousel`.
- **`scenes`:** for `reel`. Times in seconds; each scene fades and slides in, then fades out.
  Keep each scene 2–4 s and the reel 15–30 s. The video length is the last scene's `end`.

### Blocks

| `type` | Fields | Use |
|--------|--------|-----|
| `headline` | `text`, `size` (`xl` default, `l`, `m`) | the main line |
| `text` | `text`, `size` (`m` default, `l`, `s`) | a sub-line |
| `kicker` | `text` | a small accent label above a headline |
| `list` | `items`, `numbered` (true/false), `size` | steps or tips |
| `scale` | `items`, `labels` (two end labels) | a 1-to-10 style scale |
| `spacer` | `height` | extra space |
| `footer` | `text` | a line next to the person photo (cards only) |

In any `text`, wrap words in `*stars*` to colour them with the accent colour. Use `\n` for a
line break. Mixed-language lines work automatically: English words use `fontLatin`, and other
scripts (e.g. Bangla) use `fontMain`.
