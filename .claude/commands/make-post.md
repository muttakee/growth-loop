---
description: Make or remake ONE post of an approved week (text, review and media), e.g. after the human asks for a change. For the whole week use /make-week.
argument-hint: "<brand-slug> <post file, e.g. mon-01-image> [posted]"
---

# /make-post

Arguments: `$ARGUMENTS`. The first is the brand slug, the second a post file name.
If the last word is `posted`, mark that post as posted instead (step 6).

## Steps

1. **Check the brand.** `brands/<slug>/brief.md` must exist. If not, list `brands/` and ask.
2. **Find the week** that has this post in its plan (the current or next ISO week). `plan.md` must
   be `approved`, `content-ready` or `content-approved`. If it is `draft`, stop.
3. **Make the post:** run the **content-creator** sub-agent (with the human's feedback, if any),
   then the **reviewer**. At most 2 fix rounds; if it still fails, stop and show the failed checks.
4. **Render the media** (image, carousel, reel): `node media/render.mjs <post file>` (in the cloud
   container set `CHROME_PATH=/opt/pw-browsers/chromium`) and check it as in `/make-week` step 4.
5. **Set the post `ready`** in `plan.md` and show it to the human (caption, hashtags, media).
   If the week was `content-approved`, set it back to `content-ready` and ask the human to approve
   this changed post. Commit: `Content: <slug> <week> <file>`.
6. **After posting:** when the human says a post is posted (or `/make-post <slug> <file> posted`),
   set its `Post status` to `posted`. When every post in the week is `posted`, set the plan's
   `Status: posted`. Commit: `Posted: <slug> <week> <file>`.
