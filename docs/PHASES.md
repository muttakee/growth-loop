# Phase Roadmap

This follows the blueprint's suggested build order. Each phase is planned in detail with the user
right before we start it, and none is built in one shot.

Status key: ⬜ not started · 🟨 in progress · ✅ done

| # | Phase | What we get | Status |
|---|-------|-------------|--------|
| 0 | **Initialize** | Project name, repo, blueprint saved, this roadmap | ✅ |
| 1 | **Foundation** | Folder structure, full `CLAUDE.md`, `brands/` layout, `templates/` brand template, `.gitignore`, `.env.example` | ⬜ |
| 2 | **Brand onboarding** | `/new-brand` command plus an onboarding subagent; IELTS and Islamic LMS brands onboarded | ⬜ |
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
- [ ] Remote repository connected (needs the user's GitHub repo)
