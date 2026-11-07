---
description: Plan a brand's week (Planner), then show the 7-day calendar for approval.
argument-hint: "<brand-slug> [week, e.g. 2026-W46]"
---

# /plan-week

Arguments: `$ARGUMENTS`. The first is the brand slug, and the optional second is the week.

## Steps

1. **Check the brand.** `brands/<slug>/brief.md` must exist. If not, list the folders in `brands/`
   and ask which brand.
2. **Pick the week.** If none is given, use the latest week folder that has `targeting.md` but no
   approved plan. Don't ask the user to confirm it; just say which week it is.
3. **Check inputs.** `weeks/<week>/targeting.md` must exist; if not, tell the user to run
   `/research-week <slug>` first.
4. If `plan.md` already exists with status `approved` or later, stop and say so. If it's `draft`,
   redo it.
5. **Run the planner sub-agent** with the slug and week. Wait for it to finish.
6. **Show the user the calendar** (the table from `plan.md`) and the Planner's short summary.
7. **Commit:** `Plan: <slug> <week> (draft)`, and push.
8. Ask for approval: reply **approve**, or send changes (they'll be applied with `/approve-plan`).
