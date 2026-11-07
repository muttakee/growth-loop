---
description: Approve a brand's weekly plan, or send it back to the Planner with changes.
argument-hint: "<brand-slug> [week] [approve | your changes]"
---

# /approve-plan

Arguments: `$ARGUMENTS`. The brand slug, then optionally the week, then either **approve** or the
changes the user wants. The user may also just reply "approve" or list changes after `/plan-week`.

## Steps

1. Find `brands/<slug>/weeks/<week>/plan.md` (if no week is given, the latest one with status `draft`).
   If its status isn't `draft`, say what it is and stop.
2. **If the user approves:** change the status line to `Status: approved` and add the date under it
   (`Approved: YYYY-MM-DD by the user`). Commit `Approve plan: <slug> <week>` and push. Say that
   content creation can start.
3. **If the user sends changes:** run the **planner** sub-agent with the slug, the week and the
   user's feedback, word for word. It keeps the status `draft` and adds a Changes note. Show the
   updated calendar, commit `Revise plan: <slug> <week>`, push, and ask again.

Only the user approves. Never set `approved` unless the user said so in this conversation.
