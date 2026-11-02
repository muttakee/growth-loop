# Research: Sample IELTS Coach, 2026-W46

- **Dates:** Mon 9 Nov to Sun 15 Nov 2026 (research run: Mon 2 Nov 2026; redo of the earlier
  web-snippet-only version)
- **Sources used:** Apify (public Facebook Pages, posts, comments, Meta Ad Library), direct page
  fetches (ielts.idp.com, mentors.com.bd), web search snippets. inputs/: empty.
- **Apify cost this week:** $1.31 of $5.00 (11 runs; per-run costs below and in `raw/`)
- **Data window:** competitor posts from 19 Oct to 2 Nov 2026; ads active on 2 Nov 2026.
- **Reaction counts** = total reactions (likes + love + others) as returned by the scraper.

> **Test brand.** The brand is fictional, but the competitors are real public Pages. All competitor
> data is public Page data only. No groups, no logins, no commenter names stored.

## Top 3 findings

1. **The fee question is settled: IELTS on Computer costs BDT 31,100 in Bangladesh. One Skill
   Retake costs BDT 18,600.** IDP's own Bangladesh fee page (fetched directly on 2 Nov) lists:
   IELTS on Computer BDT 31,100 (same in every city), IELTS for UKVI BDT 34,850, One Skill Retake
   BDT 18,600, UKVI One Skill Retake BDT 20,900, cancellation or transfer fee BDT 3,000 (computer),
   Enquiry on Results BDT 10,500 [https://ielts.idp.com/bangladesh/about/ielts-exam-fee].
   FutureEd's 26 Oct post agrees: "২৮,১০০ টাকা (৩,০০০ টাকা ডিসকাউন্ট)", which implies BDT 31,100
   before the discount
   [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid0JhtkEGoNu1kFCLkhQEZBzRcmRo6yGKntxq2Km4t43QPxsJVuJxcXBiFeShH6AgrVl]
   (the arithmetic is inferred). This replaces last version's "disputed fee" finding. The lower
   figures (BDT 25,600 to 28,100) are **centre discount offers**, not the official fee (see Active ads).
   Memory experiment 3 ("retake costs BDT 31,100") can now run, citing IDP. The retake fee
   (BDT 18,600) gives a second, softer angle (inferred): "একটা module এর জন্য পুরো test আবার?"
   Still: no band or visa promises.
2. **Competitors' free Facebook Lives are their best organic posts, so our weekly free speaking
   Live is up against direct competition.** Mentors' IELTS Reading Live (28 Oct) got 198
   reactions, 194 comments, 20 shares and 20,713 views. That is about 8x Mentors' median of 25
   reactions across their last 20 posts, and about 2x their median video views (10,046)
   [https://www.facebook.com/Mentorsbd/videos/1506376434660062/]. The announcement post the day
   before got 92 reactions, 20 comments and 14 shares, about 3.7x the median
   [https://www.facebook.com/Mentorsbd/posts/pfbid0VEGWiz1mZ9FFyVPnUbPscstJaQWev26TRrew9wsWvotQxBhmwYjHNo1vvtK8Yc5Nl].
   10 Minute School's Lives pull very large comment counts too, e.g. 4,180 comments on an HSC Live
   on 1 Nov [https://www.facebook.com/10minuteschool/videos/1117938741126840/]. Why it likely
   worked: a named trainer people already follow, a fixed time announced the day before, and live
   practice questions people answer in the comments (viewers posted answers such as "1.B 2.D 3.E")
   (inferred from the comments in `raw/`). Our edge has to be **Speaking with personal feedback**
   (Mentors' Live was Reading) and a "আগের দিন announcement + live answer in comments" routine
   (inferred).
3. **Rivals hook on "stuck at a band" and "retaking wastes money", and the HSC discount season is on.**
   - Mentors' active IELTS ad, running since 6 Sep: "IELTS পরীক্ষা বারবার দিচ্ছেন, কিন্তু desired
     Band Score আসছে না? … সময় ও টাকা দুটোই নষ্ট হতে পারে"
     [https://www.facebook.com/ads/library/?id=2018018152186517].
   - FutureEd's active lead-magnet ad: "IELTS Writing-এ … score কি এখনও 5–5.5-এ আটকে আছে?" and a
     free downloadable Writing module [https://www.facebook.com/ads/library/?id=978762005074055].
   - 10 Minute School's active IELTS ad (started 15 Oct): free first class
     [https://www.facebook.com/ads/library/?id=1785264842746350].
   - After the HSC results (competitors posted congratulations on 31 Oct), FutureEd offers HSC
     passers up to 50% off courses and up to BDT 4,500 off IELTS registration
     [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid02sYqvTRP8rVsnAEMyfM3LKwYgRYZSavFhkqCdvLCEF8bFmBwmE6SUKJDfSxNL436Ll].

   The "retake = wasted money" angle is now crowded in paid ads. Ours should be the honest version:
   a free speaking check before you pay BDT 31,100, with no score promise (inferred). The
   "stuck at 5.5 or 6" pain is the most repeated hook in the niche this fortnight (inferred: seen
   in the FutureEd ad above and in a niche Page post
   [https://www.facebook.com/Mostakim.IELTS/posts/pfbid0SGvB6zqNwhCiX2RiKyRgipxaFYqTCYBuRBDie4HUfScBmf6dqQKL6rUR8VHwkaVbl]).

## Competitor standouts

Baselines are from each Page's last 20 posts, collected with Apify on 2 Nov
[`raw/apify-facebook-posts-scraper-*.json`]. Followers are from the Page scraper on 2 Nov
[`raw/apify-facebook-pages-scraper-competitors.json`].

| Page | Followers | Posts in window | Median reactions | Median video views |
|------|-----------|-----------------|------------------|--------------------|
| Mentors' (facebook.com/Mentorsbd) | 531,000 | 20 (24 Oct to 2 Nov) | 25 (mean 49.5) | 10,046 (10 videos) |
| FutureEd (facebook.com/futureed.ieltsbritishcouncilbd) | 870,165 | 20 (24 Oct to 1 Nov) | 8.5 (mean 20.2) | 4,138 (5 videos) |
| 10 Minute School (facebook.com/10minuteschool) | 4,980,680 | 20 (27 Oct to 1 Nov) | 296 (mean 1,161) | 59,795 (17 videos) |
| Munzereen Shahid (facebook.com/munzereenshahid) | 338,109 | 1 (19 Oct) | n/a | n/a |

**Mentors'**
- **IELTS Reading Facebook Live, 28 Oct** (video, "Classification Questions"): 198 reactions,
  194 comments, 20 shares, 20,713 views. About 8x median reactions and 2x median views
  [https://www.facebook.com/Mentorsbd/videos/1506376434660062/]. Why: see Top finding 2.
- **Student band-score results, 24 Oct** (photo album, "Big scores, bigger dreams!"): 288 reactions,
  6 comments, 6 shares, about 11.5x median
  [https://www.facebook.com/Mentorsbd/posts/pfbid0jt2pKwc9CMGopMsJQEeZ65MFcwmnYYZCuWW8v3UfCLctHGsEKgqfLthLdmH9UxpRl].
  Why: social proof with real faces and scores is easy to react to (inferred). For us: only with
  student consent and with no promise that others will get the same score (brief no-go).
- **"IELTS 21 HAS DROPPED!" reel, 29 Oct:** 93 reactions, 4 comments, 3 shares, 12,240 views
  (about 3.7x median reactions) [https://www.facebook.com/reel/2336742077126563/]. Why: news of
  a new resource is useful and timely. **Cambridge IELTS 21 is out**, and Cambridge books are an
  approved source in our brief (inferred: usable for practice posts, citing book and test number).
- Mentors' feed is mostly not IELTS (BBA, PTE, SAT, GED, kids' English, abacus). The IELTS posts
  are the ones that stand out [same raw file].

**FutureEd**
- **"মাত্র ১ মাসেই IELTS-এ 7+ Band Score" (Shortcut IELTS), 28 Oct** (photo): 94 reactions,
  0 comments, 6 shares, about 11x median
  [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid0Xx5SK5FCtKjKoPBzhVQt71bUxJKUMFL9MfdKejESZK3r1wmcyUW2T2NsPLN93GQTl].
  Why: "short on time" pain plus a speed promise; it may also be boosted (inferred). **Do not
  imitate:** it reads as a band promise, which our brief bans. The usable part is the "সময় কম"
  pain.
- **HSC offer reel, 31 Oct:** 165,329 views (about 40x their median video views) but only
  78 reactions, 1 comment, 2 shares [https://www.facebook.com/reel/1494715342707846/].
  **UK January 2027 intake "FINAL CALL" reel, 29 Oct:** 222,277 views, 78 reactions, 3 shares
  [https://www.facebook.com/reel/1157260903499103/]. Very high views with very few interactions
  point to paid reach rather than organic interest (inferred).
- **Month-end meme "জ্বি, বুঝতে পারছি। মাসের শেষ 🥲", 29 Oct** (photo): 36 reactions, 1 comment,
  2 shares, about 4x median
  [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid02uYcAEFQEvbZT2SWsXuScjcDPX9rbK2TFWHKTHLUTiTR9bzoVjSeruybLhr4rByAAl].
  Why: relatable money humour, no sales pitch (inferred). A light, friendly post like this fits our
  "elder brother" voice.
- New "Basic + IELTS" batch starts 8 Nov (3 months, Sun/Tue/Thu, online and offline). It targets
  people who feel their basic English is weak
  [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid0psYmaT3n9HEene5MA9wrdhHreTPxsstSSHEdP6tyU8XRkoe1rB4fYKva8u4LMGL7l].

**10 Minute School / Munzereen Shahid**
- 10 Minute School's main Page posted no IELTS content in the window. All 20 posts were about
  school or HSC exams and entertainment reels. Its IELTS marketing runs through ads (see Active ads)
  [`raw/apify-facebook-posts-scraper-mentors-10ms-munzereen.json`].
- Munzereen Shahid posted once in 14 days, a personal birthday post (19 Oct, 1,238 reactions,
  8 comments, 1 share), with no IELTS content. Her Page intro promotes a Spoken English course, not
  IELTS. She has no active ads
  [https://www.facebook.com/munzereen.shahid/posts/pfbid02HH14eThNfrWorWs9a1RXJXvKA3jg1yu4RZQUA3HxXQLpi36mJiPMFP8Qab6uua4vl;
  `raw/apify-facebook-ads-scraper-competitors-ielts-keyword.json`]. She is a weaker IELTS
  competitor on Facebook right now than `competitors.md` suggests (inferred).

**Other niche Pages (not on our competitor list; from Apify keyword search)**
- **Edukraft, "Summary with Clues" study note, 27 Oct:** 105 reactions, 2 comments, 105 shares
  (as many shares as reactions)
  [https://www.facebook.com/edukraftbd/posts/pfbid0QE6acVgasrFcxmKZgFSnbQxjX6XkEEY2DScDrEVGHUUCDqDYmrpH9FnzMi6HRwRPl].
  Why: a complete A-to-Z reference note on one hard question type is something people save and
  share (inferred). This fits our "exam-style cards" carousel format.
- **Avoid:** the same Page's "গতকালের আইইএলটিএস পরীক্ষায় আসা রিডিং প্যাসেজ" posts (30 Oct: 718
  reactions, 39 comments, 206 shares; 21 Oct: 407, 27, 162)
  [https://www.facebook.com/edukraftbd/posts/pfbid02EsYJoeuB9CKddCHMRaWHGe47EhdnN47T9Pq7ewHuRti4Wo9N6bfmgSksbia5fW8vl;
  https://www.facebook.com/edukraftbd/posts/pfbid02KzNbqGdWcXWXe2XoPDKid4M81XrBw83LyGYcb1k2sNoCGjzx1dz3ooKwhVBoGuDtl].
  These are "real exam" questions, a **brief no-go**. The demand behind them ("what's coming up
  now?") can be met with Cambridge IELTS 21 practice instead (inferred).

## Active ads

Meta Ad Library via Apify, active ads only, as of 2 Nov 2026; up to 10 ads per Page or search
[`raw/apify-facebook-ads-scraper-competitors-ielts-keyword.json`]. The scraper did not return the
ad format (image or video) or a CTA.

| Advertiser | Ad (Ad Library) | Running since | What and how |
|------------|-----------------|---------------|--------------|
| FutureEd | [id=2034984017136270](https://www.facebook.com/ads/library/?id=2034984017136270), [id=1002446032817800](https://www.facebook.com/ads/library/?id=1002446032817800) | 9 Sep | "মাত্র ২৫,৬০০ টাকায় IELTS রেজিস্ট্রেশন", with "Limited seats" and a time-limited discount. Runs on FB, IG, Messenger, WhatsApp and Audience Network. Price-led registration. |
| FutureEd | [id=978762005074055](https://www.facebook.com/ads/library/?id=978762005074055), [id=1329245535915213](https://www.facebook.com/ads/library/?id=1329245535915213) | 21 May / 17 Feb | Pain hook "score কি এখনও 5–5.5-এ আটকে আছে?" leading to a **free downloadable Writing module** (lead magnet). Long-running, so likely profitable for them (inferred). |
| FutureEd | [id=28550739707888712](https://www.facebook.com/ads/library/?id=28550739707888712), [id=896962716692463](https://www.facebook.com/ads/library/?id=896962716692463) | 20 Sep / 25 Apr | "Shortcut IELTS": 4 weeks, 16 sessions, "smarter way to a Band 7+". Speed and band-target framing (we must not promise bands). |
| FutureEd | [id=1789513812296809](https://www.facebook.com/ads/library/?id=1789513812296809), [id=2545510622589703](https://www.facebook.com/ads/library/?id=2545510622589703) | 18 Oct | Study Abroad Fair 2026 recap, with crowd and testimonial content. |
| Mentors' | [id=2018018152186517](https://www.facebook.com/ads/library/?id=2018018152186517) | 6 Sep | Retaker pain ("বারবার দিচ্ছেন … সময় ও টাকা দুটোই নষ্ট"), then a choice of Basic / Regular / Crash / Executive courses. CTA is WhatsApp. |
| Mentors' | [id=1036454885595511](https://www.facebook.com/ads/library/?id=1036454885595511) | 18 Jul | Speaking fear: "Speaking-এর সহজ প্রশ্নের উত্তর দিতেও আত্মবিশ্বাস পাচ্ছেন না?" leading to expert feedback and practice. Runs on WhatsApp and Threads too. |
| Mentors' | [id=4455036178148293](https://www.facebook.com/ads/library/?id=4455036178148293) | 18 Jul | "IELTS-এ 7+ Band Score অর্জন করতে প্রয়োজন সঠিক strategy …": course promo. |
| 10 Minute School | [id=1785264842746350](https://www.facebook.com/ads/library/?id=1785264842746350) | 15 Oct | IELTS free first class, with student names as social proof. "কমেন্টে আপনার লোকেশন জানান" drives comments to find the nearest centre. |
| 10 Minute School | [id=980002841602435](https://www.facebook.com/ads/library/?id=980002841602435) | 10 Jun | "যত বেশি মক টেস্ট তত বেশি IELTS Success": Live batch with 2 full mocks, 16 timed L/R mocks and personal mentorship. Mock tests are the selling point. |
| British Council (IELTS - British Council Bangladesh) | [id=952257847885161](https://www.facebook.com/ads/library/?id=952257847885161) and 5 catalogue-style ads | 1 May to 17 Aug | "trusted globally, expert examiners and fast results". The official test brand is advertising the test itself. |
| Munzereen Shahid | none | n/a | 0 active ads. |

Pattern (inferred): every rival funnel starts with something free (Writing module, first class,
mock tests, Live), then moves to WhatsApp or phone. Nobody advertises a **free live speaking check
with personal feedback**, which is our main offer. That is the gap to own.

## Audience questions and language

Source: 72 public top-level comments on Mentors' three best IELTS posts (Live 28 Oct, Live
announcement 27 Oct, results post 24 Oct). Comment text only; no names stored
[`raw/apify-facebook-comments-scraper-mentors-top3.json`]. Small sample, one competitor.

- **Most comments are not in Bangla script:** 63 of 72 use Latin letters only (English or Banglish,
  i.e. Bangla typed in Roman letters), 4 use Bangla script, and 5 are emoji or empty.
  Banglish replies may feel natural in comments, even though captions stay in Bangla per the brief
  (inferred).
- **Reading confidence:** "Vaiya Reading part er class sesh kore felci tobuo confidence pacci nah";
  "Sir how to improve my reading?"
- **Strategy for a question type:** "Can u briefly explain your strategy for picking the best
  keywords to solve most of the classification questions?" (posted twice).
- **Little time / juggling studies:** "Sir klk mid tao apnar class kortesi". This matches our
  persona: final-year student, little time.
- **Live production feedback:** "স্কিনের সামনে এভাবে দাড়িয়ে থাকলে keyword খুজবো কেমনে?". The
  presenter blocked the shared screen. Lesson for our Live: keep the question visible (inferred).
- **Value of free live classes:** "Bro is giving out free classes, and the viewers don't even
  realize how lucky they are!"
- **Live participation:** viewers post answers in the comments ("1.B 2.D 3.E").
- **Loyalty to a named teacher:** many comments are greetings ("Assalamualaikum Vaiya",
  "Big fan bhai", "Best instructor of mentor's"). People follow the person, not the centre, which
  supports our personal-profile model (inferred).

Competitor ad wording (marketer phrases, **not** audience quotes, but they show which pains are
being targeted):
"score কি এখনও 5–5.5-এ আটকে আছে?" [FutureEd ad 978762005074055]; "IELTS পরীক্ষা বারবার দিচ্ছেন,
কিন্তু desired Band Score আসছে না?" [Mentors' ad 2018018152186517]; "Speaking-এর সহজ প্রশ্নের
উত্তর দিতেও আত্মবিশ্বাস পাচ্ছেন না?" [Mentors' ad 1036454885595511]; "ইংরেজির বেসিক দুর্বল বলে
IELTS শুরু করতে Tension হচ্ছে?" [FutureEd post, link in Competitor standouts].

## Niche news and trends

- **Official fees confirmed** (Top finding 1) [https://ielts.idp.com/bangladesh/about/ielts-exam-fee].
  Registration discounts are everywhere: FutureEd's BDT 25,600 ad, BDT 27,100 to 28,100 packages
  by test month, and HSC-only discounts of up to BDT 4,500 (links above). Students are likely to
  shop around on price (inferred). Safe content: "fee কত, কোথায় দেখে নেবে", citing IDP. Do not
  compare centres by name (brief no-go).
- **One Skill Retake fee in Bangladesh: BDT 18,600 (UKVI: BDT 20,900)** [IDP page above]. Last
  version could not find this. Rules (retake one section within 60 days, computer-delivered only)
  are from the previous version's sources (search snippets, not re-verified this run)
  [https://takeielts.britishcouncil.org/ielts-recognising-organisations/one-skill-retake;
  https://www.dhakatribune.com/bangladesh/326390/british-council-ielts-launches-one-skill-retake-in].
  Check the rules on ielts.org before posting.
- **Correction on paper tests:** last version said computer delivery is now the main format
  because IDP ended paper tests after 31 Jan 2026 (search snippet). But FutureEd, a British
  Council test centre, posted Nov 2026 to Jan 2027 dates for an IELTS test "on Paper" on 25 Oct
  [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid04WELYzEEyLNJ7HD95NQxhvdQgWrNygh1YUfDNAuqis1zQ1TfF8fh4XDSeZ5zWbAVl].
  So **don't say "paper test is gone" in general.** It may only apply to IDP (inferred). IDP's
  fee page lists only computer-based tests [IDP page above].
- **Cambridge IELTS 21 is out** (Mentors' reel, 29 Oct, link above). It is a new approved-source
  practice book for the brand.
- **UK January 2027 intake:** FutureEd's own posts said the application deadline was "THIS OCTOBER"
  [https://www.facebook.com/reel/1157260903499103/]. By 9 Nov, most January deadlines have probably
  passed. A "plan for September 2027, book your IELTS early" angle fits better (inferred). UK visa
  needs IELTS for UKVI (BDT 34,850) (agent pages via search snippet, from the last version:
  https://ardentoverseas.com/january-intake-in-uk/).
- **UK work/settlement English level (for Persona 2):** English requirement for Skilled Worker,
  Scale-up and HPI rose from B1 to B2 from 8 Jan 2026 (search snippets from the last version, not
  re-verified)
  [https://latitudelaw.com/news/new-english-language-threshold-for-many-uk-work-visas;
  https://www.gov.uk/government/news/migrants-will-be-required-to-pass-a-level-standard-of-english].
  Talk about the English level only. **No visa promises.**
- **Canada:** a Page post on "spouse নিয়ে কানাডা" got 1,501 reactions, 89 comments and 26 shares
  on 1 Nov [https://www.facebook.com/ieltsschoolbd/posts/pfbid0MuYrzorF8Fdi68ENwWintHvAV9zp1oqCc2mS91ZmDAw8qGwg6VhECBArkLrHuid4l].
  Migration topics pull attention in IELTS Pages (inferred). Background: Canada's 2026
  study-permit cap is 155,000 (search snippets, last version) [https://monitor.icef.com/?p=46376].
  Use only as context, never as a visa claim.
- **Avoid, political (brief no-go):** a low-cost IELTS course launched by a political student
  organisation went viral around 20 to 22 Oct (e.g. 4,662 reactions on the organisation's own
  post; 5,538 on a news Page's repost) [`raw/scraper_one-facebook-posts-search-keywords.json`].
  Do not reference, compare with or react to it.

## Occasions this week

| Date | Occasion | Use for content? |
|------|----------|------------------|
| Sat 31 Oct (past) | HSC 2026 results out. Mentors' and FutureEd posted congratulations on 31 Oct ([Mentors'](https://www.facebook.com/Mentorsbd/posts/pfbid0GfBV7yQMkx8eRT56qN16xBNKdtd5gqLsKfL4Z3P5DaDpnudv6kykUbi2qkJPFocfl), [FutureEd](https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid0KjQsrj8YrfpedDZ9DeHXUPQ12VSpdSpm1stqzQHWHUdiWchGzwo22kU8i3CEG3RBl)); release date per [Prothom Alo](https://en.prothomalo.com/youth/education/0cq3sdu446) | Side audience only (HSC leavers are under our 19 to 30 target). Competitors are already discounting heavily here. |
| Sat 7 Nov (just before the week) | National Revolution and Solidarity Day [https://truecalendar.com/public-holidays/bangladesh/2026/11] (last version, snippet) | **No.** Political (brief no-go). |
| Sun 8 Nov | Shyama (Kali) Puja [https://calendarific.com/holidays/2026/bd] (last version, snippet) | **No.** Religious (brief no-go). A light posting day is fine. |
| Sun 8 Nov | FutureEd "Basic + IELTS" new batch starts (link above) | No. Competitor event; note only. |
| Wed 11 Nov | DU 2026–27 undergraduate applications open 12:00pm, close 25 Nov. Re-checked: Daily Star, UNB, Financial Express, BSS and Dhaka Tribune all agree (search snippets) [https://www.thedailystar.net/campus/news/dhaka-university-admission-applications-open-nov-11-2026-27-session-4238521; https://unb.com.bd/category/Bangladesh/application-for-du-undergraduate-admission-begins-from-nov-11/192181] | Optional, side audience only. |
| 12 Nov / 15 Nov | RU applications 12 to 27 Nov / CU applications 15 Nov to 10 Dec (last version, snippets; not re-verified) | Optional, side audience only. |
| All week | Students booking Nov/Dec test dates. FutureEd is advertising Nov 2026 to Jan 2027 computer dates [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid025hMpQ45RCW2aeHj6kQoH9kf5h8RCV7o7gJvvfVi42oudhh2P9TJhg8E2kNSxU6WYl] | **Yes.** "Test এর আগের ৭ দিন" checklist; free speaking check before paying BDT 31,100. |
| All week | University mid-terms (the comment "klk mid", above) | **Yes.** Short, time-saving formats for busy students (inferred). |

## Gaps

- **Apify MCP tools did not load** in this session (console-backend.apify.com blocked by the
  proxy). The Apify REST API with APIFY_TOKEN worked, so all runs used that instead.
- **Apify spend: $1.31 of $5.00.** Runs: keyword search "IELTS Bangladesh" latest $0.080; Page
  probe $0.071; posts (Mentors/10MS/Munzereen) $0.288; searches "FutureEd IELTS" and "OneIELTS"
  $0.040 each; posts (FutureEd/10minuteielts) $0.148; Page details $0.060; Ad Library $0.238;
  comments $0.181; searches "IELTS Bangladesh" top and "আইইএলটিএস" $0.080 each. This matches the
  account's monthly usage change ($0.012 to $1.319). Note: error rows (pages not found) are billed
  as posts.
- **Competitor Pages not found:** OneIELTS (facebook.com/oneielts returned no items, and the
  keyword search found no Page) and Saifur's (not searched on Facebook this run; still unconfirmed).
  The "10minute IELTS" Page (3,327 followers) returned no posts in the window, and its link to
  10 Minute School is unconfirmed.
- **Comments:** only Mentors' posts had enough comments. FutureEd's posts had 0 to 1 comments.
  10MS had no IELTS posts. So audience language comes from one competitor (72 comments).
- **Group posts not used:** the keyword search returned mostly Facebook group posts (18 of
  20 in the "latest" search, 35 of 100 across all five searches). I couldn't confirm the groups are public, so none were stored or used.
- **Instagram:** not collected (no competitor Instagram handles are verified, and the listed
  actors are Facebook-only). The `clappi/facebook-posts-reels-scraper` was not needed because
  reel views came from the posts scraper.
- **Ad Library:** capped at 10 active ads per Page or search, so some active ads are likely
  missing. Ad format (image or video), spend and reach were not returned.
- **Not re-verified this run (still from last version's search snippets):** One Skill Retake rules,
  UK B2 rule, Canada cap, holiday dates (7 and 8 Nov), RU/CU dates, IDP paper-test end date.
  Direct fetches were blocked for ielts.org, idp.com, britishcouncil.org.bd, 10minuteschool.com,
  futureed.org and oneielts.com. ielts.idp.com and mentors.com.bd did load (the Mentors fee page
  is JavaScript-rendered, so its figure could not be read; the IDP page supersedes it).
- **No previous week** (`report.md`, `research.md` for 2026-W45 do not exist). inputs/ was empty.
- **Avoided on purpose:** "yesterday's exam" passages (no-go: real exam questions), a political
  organisation's IELTS course (no-go: political), and band-promise copy such as "১ মাসেই 7+"
  (no-go: guaranteed scores).
