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
- **No hardcoded brands:** the user adds every brand with `/setup-business`.
- **Week folders:** named by calendar week number (`weeks/2026-W45`), with the dates written
  inside `plan.md`. They always sort in order and give each week one unique name.
- **Plan status line:** `draft → approved → posted`. Each post also has `planned → ready → posted`. No content is created
  unless the status is `approved`.
- **File format:** Markdown for all brand files, so they're easy for the user to read and edit
  and git shows clear changes.
- **Brand command:** `/setup-business` (renamed from `/new-brand` in the blueprint, then from `/setup-brand`).
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
- **Competitors at setup:** `/setup-business` asks the user for 3–5 competitors. If the user says
  "find", the onboarding agent suggests some and the user confirms them.
- **Apify for Facebook data:** the Researcher uses Apify actors (`apify/facebook-posts-scraper`,
  `apify/facebook-comments-scraper`, `scraper_one/facebook-posts-search`,
  `clappi/facebook-posts-reels-scraper`). Public Pages, posts, reels and comments only. No private
  groups or profiles, nothing behind a login, and no logging in with our own accounts.
  **Budget: max $5 per brand per week** (test level). Fallbacks: web search, then the week's `inputs/` folder.
- **Weekly `inputs/` folder:** the user can drop competitor links or screenshots into
  `weeks/<week>/inputs/`. The Researcher uses them too.
- **Apify access route:** if the Apify MCP tools can't load (the proxy blocked them in the W46 test),
  the Researcher calls the Apify REST API with `APIFY_TOKEN`. Same actors, rules and budget.
- **Weekly content pack (changed 4 Nov 2026):** replaces the earlier "daily content" rule. As soon
  as the plan is approved, all the week's posts are made in one go (`/make-week`), then the human
  reviews the pack and approves it (or sends posts back). Plan status is
  `draft → approved → content-ready → content-approved → posted`; each post is
  `planned → ready → posted`. `/make-post` remakes a single post.
- **Media tool (merged 7 Nov 2026):** Remotion in `studio/` renders images, carousels and reels from
  each post's `<file>.render.json`, with the brand's look in `assets/theme.json`. It replaced the
  parallel `media/` project when the branches were merged. Free for individuals and companies of up
  to 3 people; a bigger company needs a Remotion company licence.
- **Reels (7 Nov 2026):** premium look with an ElevenLabs voiceover (eleven_v4, male voice, set in
  `theme.json`) and captions synced word by word to the voice. No empty space: every scene has
  footage, a screenshot or an animated SVG illustration. Rules in `docs/video-rules.md`.
  (The earlier "5 random reel themes" from `media/` are not in `studio/` yet; to be ported.)
- **Brand-site facts:** a post that describes the brand's own product uses facts from the brief
  or the brand's website, never general category knowledge (e.g. official exam timings).
- **Content pillars:** Authority, Personal story and Sell. Setup suggests Authority 60–70%,
  Personal story 15–20%, Sell 15–20%, and the user sets the mix for each brand in `brief.md`.
- **Posting frequency:** 2 posts a day (14 a week) by default. Set per brand in `brief.md`
  ("Posts per day"); `/setup-business` suggests 2.
- **Posting times:** fixed daily slots per brand, kept the same every week (research: a steady
  rhythm matters more than the exact hour). `/setup-business` recommends slots from the brand's
  audience, the user confirms or changes them, and they can be changed any time. To be tuned
  with Insights once Meta is connected.
- **Weekly day themes:** a brand can fix a theme for some days (e.g. Fri → personal story);
  other days are `open`. Set in `brief.md`.
- **Not now:** LinkedIn and YouTube channels, and the "Hit vs Auto" idea, are parked until the
  user brings them back.
- **Internal file language:** English for briefs, memory, personas and plans. Posts follow each
  brand's own language rules.

## 1. Foundation ✅ (waiting for user review)

- [x] Full `CLAUDE.md`: weekly flow, folder and naming rules, how agents hand off work
- [x] `.env.example` listing the API keys we'll need (no real values)
- [x] Empty `.claude/agents/` and `.claude/commands/` folders
- [x] Empty `brands/` folder
- [x] `templates/brand/`: `brief.md`, `memory.md`, `personas.md`, `competitors.md`, `weeks/README.md`
- [x] Name week folders by calendar week (`2026-W45`)
- [x] Add a status line to each plan: `draft → approved → posted` (`templates/week/plan.md`)

## 2. Adding brands ✅

- [x] `/setup-business` command: asks business or personal first, then that profile's questions one at a
  time, then the content rules, and creates the brand folder from the template
- [x] Onboarding agent (deep research and targeting, fills in the memory files)
- [x] Brief: channels table (personal profile, Page, Instagram) and person photo for personal profiles
- [x] Test run: sample brand `sample-ielts-coach` created and onboarded (fictional; deleted 4 Nov 2026, still in git history)
- [x] Setup flow redesign (from the user's diagram): renamed to `/setup-business`, Expertise as
  its own question, a content interview (customer results, personal stories, proof, unique
  points, objections), content pillars (mix set per brand) and weekly day themes
- [x] The user adds their first real brand and confirms the summary (`vasha-academy`, 2026-11-04;
  set up before the pillars/day-themes redesign, so its brief still needs those fields)

## 3. Research and targeting ✅

- [x] Researcher agent (instructions, good and bad examples, checklist), using Apify first
- [x] Targeting Strategist agent (personas with fears, goals, language, online times, hooks)
- [x] Week templates: `research.md`, `targeting.md`, `inputs/`
- [x] `/research-week <brand>` command (Researcher, then Targeting Strategist, then summary)
- [x] Test on the sample brand for 2026-W46 (Apify Facebook data, $1.31 of $5; commit `8222f4e`)
- [x] First real run: `vasha-academy` 2026-W46 (Apify via its API, $1.34 of $5)

## 4. Planning and content ← in progress

- [x] Planner agent (7-day calendar that follows the brand's content pillar mix and weekly day themes)
- [x] Approval step: `/plan-week <brand>` (the user approves the plan or sends it back with changes)
- [x] Test `/plan-week` on the sample brand for 2026-W46 (14 posts, approved 3 Nov 2026)
- [x] Content Creator agent (caption, script, on-screen text, spoken lines, hashtags, CTA, render spec)
- [x] Reviewer agent (checks every post against the brand brief and the language rules)
- [x] `/make-post <brand>` command: makes or remakes one post
- [x] Video tool confirmed: **Remotion** (`studio/`): image, carousel and reel templates
- [x] ElevenLabs voiceover (`studio/voiceover.mjs`; eleven_v4, male voice set per brand in `theme.json`)
- [x] Test that Bangla text renders correctly in videos and images (Hind Siliguri; conjuncts checked)
- [x] `/make-week <brand>` command: makes the whole week's content pack after plan approval, then asks the human to approve it
- [x] First full 7-day content pack: `vasha-academy` 2026-W46 (14 posts written, reviewed and rendered)
- [ ] Premium reels with animated SVG illustrations in every empty space (`docs/video-rules.md`)
- [ ] The user approves the `vasha-academy` 2026-W46 content pack
- [ ] Add content pillars, day themes and posting times to the `vasha-academy` brief (new setup fields)

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
- [ ] Weekly trigger for research and planning; `/make-week` right after the plan is approved; a reminder at each posting slot
- [ ] Approval reminder by email or WhatsApp
