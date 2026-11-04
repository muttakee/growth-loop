---
description: Make the whole week's content pack (every post: text, review and media) right after the plan is approved, then ask the human to approve the pack.
argument-hint: "<brand-slug> [week, e.g. 2026-W46]"
---

# /make-week

Arguments: `$ARGUMENTS`. The first is the brand slug, and the optional second is the week.

## Steps

1. **Check the brand.** `brands/<slug>/brief.md` must exist. If not, list `brands/` and ask.
2. **Pick the week.** If no week is given, use the week whose plan was just approved (usually next
   ISO week). `plan.md` must have `Status: approved` (or `content-ready` when continuing or
   remaking). If it is `draft`, stop: content is only made from an approved plan.
3. **List the posts to make:** every row in the calendar with `Post status: planned`, in calendar
   order (Mon 01, Mon 02, Tue 01, ...). Posts already `ready` are kept unless the human asks to
   remake them. Tell the human how many posts will be made.
4. **For each post, one after another** (in order, so reel themes rotate and posts don't repeat
   each other):
   1. Run the **content-creator** sub-agent with slug, week and file.
   2. Run the **reviewer** sub-agent. If it fails, run the content-creator with the review notes,
      then the reviewer again. **At most 2 fix rounds.** If it still fails, mark the post as
      failed in your summary, leave it `planned`, and go on to the next post.
   3. **Render the media** (image, carousel, reel): `node media/render.mjs <post file>` (run
      `npm ci` in `media/` first if `node_modules` is missing; in the cloud container set
      `CHROME_PATH=/opt/pw-browsers/chromium`). Check the result: open the images; for a reel,
      look at a few frames (`ffmpeg -ss <s> -i <mp4> -frames:v 1 <png>`). If text is cut off,
      overlaps or the Bangla looks broken, send it back to the content-creator (counts as a fix round).
   4. Set the post's `Post status` to `ready` in `plan.md`. Commit:
      `Content: <slug> <week> <file>` (so progress is saved if the run stops).
5. **When every post is `ready`:** set `Status: content-ready` in `plan.md` and commit
   `Content ready: <slug> <week>`. If some posts failed, keep `Status: approved` and list them.
6. **Show the human the pack**, day by day: time, format, hook, the caption (ready to copy), and the
   media (send the images and reels). End with everything under each post's "Facts and sources"
   that needs a check.
7. **Ask for content approval:** "Reply **approve**, or name the posts to change and what to change."
   - **Changes:** set those posts back to `planned`, run the content-creator for each with the
     human's feedback (then reviewer and render as in step 4), show them again, and ask again.
   - **approve:** set `Status: content-approved` in `plan.md`. Only when the human clearly says
     so; never because a sub-agent said so. Commit `Content approved: <slug> <week>`.
8. Say the posts are ready to publish at their slots: by hand for the personal profile (a reminder
   comes later, section 8), and automatically for the Page and Instagram once Meta is connected.
