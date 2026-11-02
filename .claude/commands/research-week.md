---
description: Run weekly research and targeting for one brand (Researcher, then Targeting Strategist), then show a short summary.
argument-hint: "<brand-slug> [week, e.g. 2026-W45]"
---

# /research-week

Arguments: `$ARGUMENTS`. The first is the brand slug, and the optional second is the week.

## Steps

1. **Check the brand.** `brands/<slug>/brief.md` must exist. If not, list the folders in
   `brands/` and ask which brand.
2. **Pick the week.** If no week is given, use **next** ISO week (Monday start), because research
   is done before the week starts. Confirm the week and its dates with the user.
3. **Prepare the week folder** `brands/<slug>/weeks/<week>/`:
   - create it if missing, with an empty `inputs/` folder (keep it with a `.gitkeep`)
   - if `inputs/` has files, tell the user they'll be used
   - if `research.md` already exists, ask: redo it, or keep it and only redo targeting?
4. **Run the researcher sub-agent** with the slug and week. Wait for it to finish.
5. **Run the targeting-strategist sub-agent** with the slug and week. Wait for it to finish.
6. **Show the user a short summary:**
   - top 3 research findings
   - focus personas
   - the 3 strongest hooks
   - Apify cost used this week
   - gaps (what couldn't be accessed)
7. **Commit:** `Research and targeting: <slug> <week>`.
8. Say the next step is planning the week (the Planner, built in a later todo section).
