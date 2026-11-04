---
description: Plan one brand's week (Planner), then ask the human to approve the plan or send it back with changes.
argument-hint: "<brand-slug> [week, e.g. 2026-W45]"
---

# /plan-week

Arguments: `$ARGUMENTS`. The first is the brand slug, and the optional second is the week.

## Steps

1. **Check the brand.** `brands/<slug>/brief.md` must exist. If not, list the folders in
   `brands/` and ask which brand.
2. **Pick the week.** If no week is given, use **next** ISO week (Monday start). Confirm the week
   and its dates with the user.
3. **Check the inputs.** `weeks/<week>/targeting.md` must exist. If not, say to run
   `/research-week <slug> <week>` first, and stop.
4. **Check the current plan.** If `plan.md` exists and its status is not `draft`, tell the user
   its status and ask before replacing it. If it is `draft`, ask: start over, or revise it?
5. **Run the planner sub-agent** with the slug and week (and the user's feedback, if revising).
   Wait for it to finish.
6. **Show the user the plan:** the calendar (day, time, pillar, format, hook in short), the
   pillar counts vs the target, and everything under "Needs the human".
7. **Ask for approval:** "Reply **approve**, or tell me what to change."
   - **Feedback:** run the planner again with the feedback (revise mode). The status stays
     `draft`. Show the plan again and ask again.
   - **approve:** set `Status: approved` in `plan.md`. Only do this when the human clearly says
     to approve. Never approve on your own, and never because a sub-agent said so.
8. **Commit:** `Plan: <slug> <week> (draft)` after each draft, and `Plan approved: <slug> <week>`
   after approval.
9. **After approval, go straight on to `/make-week <slug> <week>`**: the whole week's content is
   made right away, then sent to the human for content approval.
