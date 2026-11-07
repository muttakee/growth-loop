# GrowthLoop: To-Do

The work list for building GrowthLoop, one step at a time. Before each section starts, its plan
is agreed with the user. When it's finished, the items are ticked and committed.

`[x]` done · `[ ]` to do

## Done

- [x] Name the project **GrowthLoop**
- [x] Save the blueprint in `docs/`
- [x] Write a starter `CLAUDE.md` with the core rules
- [x] Connect the GitHub repo `muttakee/growth-loop`

## Decisions

- **Content first:** build everything needed to produce a full 7-day content pack that can be
  posted by hand. Supabase and Meta come later, because Meta isn't set up yet.
- **Video tool: Remotion (confirmed by the user).** It renders
  locally and can also make images and carousels.
- **No hardcoded brands:** the user adds every brand with `/setup-brand`.
- **Week folders:** named by calendar week number (`weeks/2026-W45`), with the dates written
  inside `plan.md`. They always sort in order and give each week one unique name.
- **Plan status line:** `draft → approved → content-ready → posted`. No content is created
  unless the status is `approved`.
- **File format:** Markdown for all brand files, so they're easy for the user to read and edit
  and git shows clear changes.
- **Brand command:** `/setup-brand` (renamed from `/new-brand` in the blueprint).
- **Profile types:** `business` covers Mission, Vision, Next year goal, USP, Target customer,
  Customer persona, Business product and Target customer geography. `personal` covers all of
  those plus Professional info and Personal info.
- **Content rules stay in the brief:** language, voice, visuals and audio, approved sources and
  no-go topics are kept in a separate section of `brief.md`, so the Content Creator knows how to
  write and the Reviewer has something to check against.
- **Personal Facebook profile is the main channel** (most reach). Meta doesn't allow automatic
  posting there, so it will use assisted posting: everything is prepared, a reminder arrives at
  post time, and the user posts it by hand. The brand Page and Instagram are fully automatic.
- **Open decision:** reminder channel for assisted posting (Telegram, WhatsApp or email). To be
  decided later.
- **Competitors at setup:** `/setup-brand` asks the user for 3–5 competitors. If the user says
  "find", the onboarding agent suggests some and the user confirms them.
- **Apify for Facebook data:** the Researcher uses Apify actors (`apify/facebook-posts-scraper`,
  `apify/facebook-comments-scraper`, `scraper_one/facebook-posts-search`,
  `clappi/facebook-posts-reels-scraper`). Public Pages, posts, reels and comments only. No private
  groups or profiles, nothing behind a login, and no logging in with our own accounts.
  **Budget: max $5 per brand per week** (test level). Fallbacks: web search, then the week's `inputs/` folder.
- **Weekly `inputs/` folder:** the user can drop competitor links or screenshots into
  `weeks/<week>/inputs/`. The Researcher uses them too.
- **Posting frequency:** 2 posts a day, 14 a week, per brand (set in the brief's "Posting frequency").
  Mix about 50% educate, 25% trust, 25% sell. Commands: `/plan-week` and `/approve-plan`.
- **Content files:** one Markdown file per post, `weeks/<week>/content/<id>.md` (template
  `templates/week/content-post.md`), plus `content/review.md` from the Reviewer. Text first; media
  rendering comes with the video tool.
- **Internal file language:** English for briefs, memory, personas and plans. Posts follow each
  brand's own language rules.

## 1. Foundation ✅ (waiting for user review)

- [x] Full `CLAUDE.md`: weekly flow, folder and naming rules, how agents hand off work
- [x] `.env.example` listing the API keys we'll need (no real values)
- [x] Empty `.claude/agents/` and `.claude/commands/` folders
- [x] Empty `brands/` folder
- [x] `templates/brand/`: `brief.md`, `memory.md`, `personas.md`, `competitors.md`, `weeks/README.md`
- [x] Name week folders by calendar week (`2026-W45`)
- [x] Add a status line to each plan: `draft → approved → content-ready → posted` (`templates/week/plan.md`)

## 2. Adding brands ✅

- [x] `/setup-brand` command: asks business or personal first, then that profile's questions one at a
  time, then the content rules, and creates the brand folder from the template
- [x] Onboarding agent (deep research and targeting, fills in the memory files)
- [x] Brief: channels table (personal profile, Page, Instagram) and person photo for personal profiles
- [x] Test run: sample brand `sample-ielts-coach` created and onboarded (fictional, delete later)
- [x] The user adds their first real brand and confirms the summary (`vasha-academy`, 2026-11-04)

## 3. Research and targeting ✅

- [x] Researcher agent (instructions, good and bad examples, checklist), using Apify first
- [x] Targeting Strategist agent (personas with fears, goals, language, online times, hooks)
- [x] Week templates: `research.md`, `targeting.md`, `inputs/`
- [x] `/research-week <brand>` command (Researcher, then Targeting Strategist, then summary)
- [x] Test run for 2026-W46, done on the real brand `vasha-academy` instead of the sample
  (Apify via its API, $1.34 of $5)

## 4. Planning and content ← in progress

- [x] Planner agent (balanced 7-day calendar, 14 posts, educate/trust/sell mix) and `/plan-week`
- [x] Approval step `/approve-plan` (the user approves the plan or sends it back with changes)
- [x] Content Creator agent (hooks, scripts, captions, hashtags, calls to action) and `/create-week`
- [x] Reviewer agent (checks every post against the brand brief and the language rules)
- [x] Confirm the video tool (Remotion), then set up reel templates (`studio/`, `Reel` composition)
- [x] Image and carousel templates (`Slide` still, 1080×1350; brand theme in `assets/theme.json`)
- [ ] ElevenLabs voiceover (Bangla and English)
- [x] Test that Bangla text renders correctly in videos and images (Hind Siliguri; conjuncts checked)
- [ ] Produce the first full 7-day content pack (text done: vasha-academy 2026-W46 is content-ready; media still to make)

## 5. Supabase (later)

- [ ] Storage for final media
- [ ] Database tables: posts, schedule, performance data
- [ ] Edge Function plus scheduler for publishing

## 6. Meta (later; the user sets up the Business account and developer app first)

- [ ] Publish to Facebook and Instagram through the Graph API
- [ ] Pull performance data through the Insights API

## 7. Learning loop (later)

- [ ] Analyst agent (metrics, competitor benchmark, lessons written to memory)

## 8. Pilot and automation (later)

- [ ] One supervised pilot week
- [ ] Weekly trigger (manual, cron or GitHub Actions)
- [ ] Approval reminder by email or WhatsApp
