---
description: Make and review the next due post for one brand (on its day, about 2 hours before its slot), then mark it ready.
argument-hint: "<brand-slug> [post file, e.g. mon-01-image] [posted]"
---

# /make-post

Arguments: `$ARGUMENTS`. The first is the brand slug. The optional second is a post file name.
If the last word is `posted`, mark that post as posted instead (step 8).

## Steps

1. **Check the brand.** `brands/<slug>/brief.md` must exist. If not, list `brands/` and ask.
2. **Find the week.** Use the current ISO week in the brief's posting time zone. `plan.md` must
   have `Status: approved`. If not, stop: content is only made from an approved plan.
3. **Pick the post.** If a file name is given, use it. Otherwise pick the post with
   `Post status: planned` whose slot is the next one coming up (today first).
4. **Check the timing** (in the brief's time zone):
   - more than **2 hours** before the slot: say it is early and ask whether to make it now.
     (Making posts days ahead is against the daily-content rule; only do it if the human says so,
     e.g. for a test.)
   - less than **30 minutes** before the slot: warn that it will be late, and go ahead fast.
5. **Run the content-creator sub-agent** with slug, week and file. Wait for it.
6. **Run the reviewer sub-agent** on the same file. If it fails, run the content-creator again
   with the review notes, then the reviewer again. **At most 2 fix rounds.** If it still fails,
   stop, show the human the failed checks, and don't mark it ready.
7. **On pass:** set this post's `Post status` to `ready` in `plan.md`. Show the human:
   - posting time and channel
   - the hook, the caption (ready to copy) and the hashtags
   - the on-screen content or script, and anything under "Facts and sources" to check
   - for channels posted by hand (e.g. a personal profile): "Post this at <time>."
   Commit: `Post ready: <slug> <week> <file>`.
8. **After posting:** when the human says it is posted (or `/make-post <slug> <file> posted`),
   set its `Post status` to `posted`. When every post in the week is `posted`, set the plan's
   `Status: posted`. Commit: `Posted: <slug> <week> <file>`.

## Notes

- Media (video, images, voiceover) is added in a later part of section 4; until then the post
  file has the full text and a visual brief.
- For now this runs by hand. Section 8 adds a trigger that runs it about 2 hours before each slot.
