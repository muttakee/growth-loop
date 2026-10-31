# CLAUDE.md: GrowthLoop

This file guides Claude Code when working in this repository. It gets expanded in Phase 1.

## What this project is

GrowthLoop is a social media growth agent for Facebook and Instagram. The full spec is in
`docs/blueprint.pdf`. If this file and the blueprint disagree, ask before acting.

## How we build

- We build **one phase at a time** (see `docs/PHASES.md`). Don't start work from a later phase
  unless asked.
- Each phase starts with a short plan that the user agrees to, and ends with a review and a commit.
- Update the checklist in `docs/PHASES.md` when a phase is finished.

## Non-negotiable rules (from the blueprint)

- **Human approval:** nothing is created or published until a human approves the weekly 7-day plan.
- **Language:** all audience-facing content is in natural Bangla (not machine-translated).
  IELTS learning material (sample answers, vocabulary, example sentences, test questions)
  stays in English and is explained in Bangla.
- **Islamic courses brand:** no background music, no animated human figures. Use voice-only audio,
  calligraphy and nature visuals. Verses and hadith may only be quoted from the approved source list.
- **Competitors:** take inspiration from winning formats but never copy their content.
  Collect competitor data only within platform rules (public data only).
- **Sources:** research findings must note where they came from.
- **Secrets:** never commit API keys or tokens. Use `.env` (git-ignored).
