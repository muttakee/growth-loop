# CLAUDE.md: GrowthLoop

This file guides Claude Code when working in this repository. It gets expanded in the Foundation step.

## What this project is

GrowthLoop is a social media growth agent for Facebook and Instagram. The full spec is in
`docs/blueprint.pdf`. If this file and the blueprint disagree, ask before acting.

## How we build

- We build **one section of `todo.md` at a time**. Don't start work from a later section
  unless asked.
- Each section starts with a short plan that the user agrees to, and ends with a review and a commit.
- Tick items in `todo.md` as they are finished.

## Non-negotiable rules (from the blueprint)

- **Human approval:** nothing is created or published until a human approves the weekly 7-day plan.
- **No hardcoded brands:** brands exist only once the user adds them with `/new-brand`.
  Brand-specific rules (language, voice, music, visuals, approved sources, no-go topics) live in
  that brand's brief under `brands/<brand>/`, never in code or in this file.
- **Brand rules are binding:** every subagent reads the brand brief first and follows its rules.
  The reviewer subagent checks every post against them.
- **Competitors:** take inspiration from winning formats but never copy their content.
  Collect competitor data only within platform rules (public data only).
- **Sources:** research findings must note where they came from.
- **Secrets:** never commit API keys or tokens. Use `.env` (git-ignored).
