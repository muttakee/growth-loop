# CLAUDE.md: GrowthLoop

This file guides Claude Code when working in this repository.

## What this project is

GrowthLoop is an AI agent system that grows engagement and reach for our brands on Facebook and
Instagram. It runs a weekly cycle and learns from results each week. The full spec is in
`docs/blueprint.pdf` (text copy: `docs/blueprint.txt`). If this file and the blueprint disagree,
ask before acting.

## How we build

- We build **one section of `todo.md` at a time**. Don't start work from a later section
  unless asked.
- Each section starts with a short plan that the user agrees to, and ends with a review and a commit.
- Tick items in `todo.md` as they are finished, and record decisions under "Decisions".

## Non-negotiable rules

- **Human approval:** nothing is created or published until a human approves the weekly 7-day
  plan. Content work only starts when the plan's status is `approved`.
- **No hardcoded brands:** brands exist only once the user adds them with `/setup-business`.
  Brand-specific rules (content pillars, weekly themes, language, voice, music, visuals, approved
  sources, no-go topics) live in
  the "Content rules" section of that brand's `brief.md`, never in code or in this file.
- **Two profile types:** `business` (Mission, Vision, Next year goal, USP, Target customer,
  Customer persona, Business product, Target customer geography) and `personal` (all of those plus
  Professional info, Expertise and Personal info). The type is set in `brief.md` under Basics.
- **Content interview:** `/setup-business` interviews the owner for real stories, results, proof
  and objections, saved in the "Content interview" section of `brief.md`. Agents build from these
  and never invent stories, results or reviews.
- **Content pillars:** every weekly plan follows the brand's pillar mix (Authority, Personal story,
  Sell) and weekly day themes from `brief.md`.
- **Brand rules are binding:** every agent reads the brand's `brief.md` first and follows it.
  The Reviewer checks every post against it. If the brief is unclear, ask; don't guess.
- **Competitors:** take inspiration from winning formats but never copy their content.
  Collect competitor data only within platform rules (public data only).
- **Sources:** every research finding notes where it came from (URL, post link, Ad Library entry).
- **Secrets:** never commit API keys or tokens. Real values go in `.env` (git-ignored);
  `.env.example` lists the names only.

## The weekly cycle

| Step | Who | Reads | Writes |
|------|-----|-------|--------|
| 1. Research | Researcher | `brief.md`, `competitors.md`, `memory.md` | `weeks/<week>/research.md` |
| 2. Targeting | Targeting Strategist | `brief.md`, research | `personas.md` (updates), `weeks/<week>/targeting.md` |
| 3. Plan | Planner | brief, personas, `memory.md`, targeting | `weeks/<week>/plan.md` (status `draft`) |
| 4. Approve | **Human** | `plan.md` | status → `approved`, or feedback for changes |
| 5. Create | Content Creator plus Reviewer | approved `plan.md`, brief | `weeks/<week>/content/` (status → `content-ready`) |
| 6. Publish | Scheduler (Supabase, later) | `content/` | status → `posted` |
| 7. Learn | Analyst | performance data, competitor posts | `memory.md`, `weeks/<week>/report.md` |

Around day 5 of the current week, the next week is researched and planned, then sent for approval.
That way the content is ready before the current week ends and posting never has a gap.

## Agent handoffs

- Each agent's definition lives in `.claude/agents/<agent>.md`, with instructions, examples of
  good and bad output, and a quality checklist.
- An agent only works from files. It reads its inputs from the brand folder and writes its output
  to the paths in the table above, so the next agent (and the user) can see exactly what was passed on.
- Before handing off, an agent checks its own output against its checklist.
- Slash commands live in `.claude/commands/`: `/setup-business` (add a brand) and
  `/research-week <brand>` (Researcher, then Targeting Strategist).
- **Apify:** the Researcher uses it for public Facebook/Instagram data only, with a budget of
  **$5 per brand per week**. No private groups or profiles, no logins, no commenter names stored.

## Folders and naming

```
brands/<brand-slug>/          one folder per brand; slug is lowercase-kebab-case (e.g. my-brand)
  brief.md                    profile, content interview, content rules (pillars, day themes, language, voice, visuals, sources, no-go)
  memory.md                   what worked, what didn't, lessons learned (updated weekly by the Analyst)
  personas.md                 audience personas
  competitors.md              competitor list and notes
  assets/                     logo.png, and photo.png for personal profiles
  weeks/<YYYY>-W<WW>/         one folder per week, ISO week number (e.g. 2026-W45)
    inputs/                   links or screenshots the user drops in for the Researcher
    raw/                      short summaries of Apify results (no personal data)
    research.md
    targeting.md
    plan.md                   7-day plan with a status line
    content/                  final captions, scripts and media for each post
    report.md                 the week's performance and lessons
templates/brand/              blank brand folder, copied by /setup-business
templates/week/               blank week files (research.md, targeting.md, plan.md)
```

- **Weeks** use ISO week numbers (Monday start), for example `2026-W45`. The real dates are written
  at the top of `plan.md`.
- **Content files** are named `<day>-<nn>-<format>`, for example `mon-01-reel`, `tue-01-carousel`.
- **All internal files are Markdown, written in English.** Audience-facing text (captions,
  hooks, voiceovers) follows the brand's language rules in `brief.md`.

## Plan status

Every `plan.md` has one status line near the top:

```
Status: draft | approved | content-ready | posted
```

- `draft`: written by the Planner. The human reviews it.
- `approved`: set only by the human (or by Claude when the human says to approve it).
  Content creation may start.
- `content-ready`: all posts created and passed by the Reviewer.
- `posted`: all posts published.

If the human sends a plan back, the Planner revises it, keeps the status `draft`, and adds a short
"Changes" note.
