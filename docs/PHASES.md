# Phase Roadmap

This follows the blueprint's suggested build order. Each phase is planned in detail with the user
right before we start it, and none is built in one shot.

Status key: ⬜ not started · 🟨 in progress · ✅ done

| # | Phase | What we get | Status |
|---|-------|-------------|--------|
| 0 | **Initialize** | Project name, repo, blueprint saved, this roadmap | ✅ |
| 1 | **Foundation** | Folder structure, full `CLAUDE.md`, `brands/` layout, `templates/` brand template, `.gitignore`, `.env.example` | ⬜ |
| 2 | **Brand onboarding** | `/new-brand` command plus an onboarding subagent; the user then adds their own brands with it | ⬜ |
| 3 | **Research and targeting** | Researcher and Targeting Strategist subagents (instructions, good/bad examples, checklists) | ⬜ |
| 4 | **Planning and content** | Planner, Content Creator and Reviewer subagents; video, image and carousel pipeline; ElevenLabs voiceover | ⬜ |
| 5 | **Supabase backend** | Storage buckets, DB tables (posts, schedule, metrics), publishing Edge Function plus scheduler | ⬜ |
| 6 | **Meta integration** | Graph API publishing (FB and IG) and the Insights API | ⬜ |
| 7 | **Learning loop** | Analyst subagent, metrics, competitor benchmark, memory updates | ⬜ |
| 8 | **Pilot and automation** | Supervised pilot week, weekly trigger (cron/GitHub Actions), approval notifications | ⬜ |

## Phase 0: Initialize ✅

- [x] Project named **GrowthLoop**
- [x] Git repo initialized
- [x] Blueprint saved to `docs/`
- [x] Starter `CLAUDE.md` with the non-negotiable rules
- [x] Phase roadmap (this file)
- [x] Remote repository connected: `muttakee/growth-loop`

## Decisions so far

- **Order:** content first. Phases 1–4 produce a full 7-day content pack (plans, captions,
  reels, images, carousels) that can be posted by hand. Meta isn't set up yet, so Supabase and
  Meta (Phases 5–6) come after.
- **Video tool:** Remotion is recommended (to be confirmed at the start of Phase 4). It renders
  locally from code and can also make the still images and carousels.
