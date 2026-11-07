---
description: Write all posts for a brand's approved weekly plan (Content Creator), then review them (Reviewer).
argument-hint: "<brand-slug> [week, e.g. 2026-W46]"
---

# /create-week

Arguments: `$ARGUMENTS`. The first is the brand slug, and the optional second is the week.

## Steps

1. **Check the plan.** Find `brands/<slug>/weeks/<week>/plan.md` (if no week is given, the latest one
   with status `approved`). If its status isn't `approved`, stop: content needs an approved plan.
2. **Run the content-creator sub-agent** with the slug and week. For a 14-post week it may be
   split into two runs (Mon–Wed+Thu and Thu–Sun) that run in parallel, by passing the post IDs.
3. **Run the reviewer sub-agent** with the slug and week.
4. If any post is `needs-changes`, run the content-creator again with only those post IDs, then the
   reviewer again. At most 2 rounds; after that, show the user what's still failing.
5. **Render media:** `cd studio && node render.mjs <slug> <week>` (run `npm install` first if
   `node_modules` is missing). Note which inputs are still missing.
6. **Show the user:** the review table, what they must supply (recordings, screenshots), and where
   the files are.
7. **Commit:** `Content: <slug> <week>` and push.
