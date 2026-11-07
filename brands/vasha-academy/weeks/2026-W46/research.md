# Research: Vasha Academy, 2026-W46

- **Dates:** Mon 9 Nov to Sun 15 Nov 2026 (research run on Wed 4 Nov 2026)
- **Sources used:** Apify (Facebook posts, page search, keyword post search, comments, Meta Ad Library via
  `apify/facebook-ads-scraper`), web search, IDP Bangladesh website (curl). `inputs/` was empty.
- **Apify cost this week:** $1.34 of $5.00 (13 runs; per-run costs in `raw/*.json`)
- **Data window:** competitor posts from 21 Oct to 4 Nov 2026. With a 20-post cap, the busy pages only
  reach back 6 to 10 days (dates are given per page below).

## Top 3 findings

1. **HSC 2026 results (31 Oct) set off an "HSC graduate to IELTS" rush.** Results came out on 31 Oct
   with a 52.12% pass rate [https://en.prothomalo.com/youth/education/hdjdl19opa]. FutureEd is running a
   paid HSC-only offer: 50% off all IELTS/English courses and up to ৳4,500 off IELTS registration
   (ad started 1 Nov) [https://www.facebook.com/ads/library/?id=2151950825356808]. Banglay IELTS offers
   30% off for GPA-5.00 HSC students [https://www.facebook.com/reel/961700186623610/]. Banglay IELTS
   Dhaka's HSC meme reel was the standout of the fortnight: 36,331 reactions and 1,499,343 views, about
   886x the page's median of 41 reactions [https://www.facebook.com/reel/2466899444071263/].
   HSC graduates are a new, time-sensitive audience for a free first test (Listening 01–02) and the
   free IELTS 101 class (inferred).
2. **The mock-test market has become a price and AI war.** Per-test and bundle prices seen in active
   ads: FutureEd Dhanmondi charges ৳1,500 for one centre mock, or ৳8,000 for 10
   [https://www.facebook.com/ads/library/?id=949686690910739]. Arif Academy sells one month of
   unlimited mocks for ৳350 [https://www.facebook.com/ads/library/?id=1120607073637749]. **IELTSly**, a
   new AI platform not in `competitors.md`, sells unlimited mocks with instant results for ৳990
   [https://www.facebook.com/ads/library/?id=28793465407008455]. British Council / Take IELTS advertise a
   free mock with feedback on all four skills [https://www.facebook.com/ads/library/?id=960666116830200].
   Banglay IELTS bundles "5 AI Mock Tests – Completely Free" into its course
   [https://www.facebook.com/ads/library/?id=1102281196124095]. Vasha's ৳20 per test is still the
   lowest per-test price seen. "AI marking" is no longer unique; a realistic CD interface plus
   results in minutes is the sharper angle (inferred).
3. **The official fee is now BDT 31,100, and computer-delivered (CD) nerves are an ad theme.** IDP
   Bangladesh lists BDT 31,100 for the standard and CD IELTS
   [https://ielts.idp.com/bangladesh/about/which-test-do-i-take/computer-based-ielts]. FutureEd runs
   ads built around the fee ("৳4,000 instant discount") [https://www.facebook.com/ads/library/?id=2152109335396825].
   FutureEd and British Council both advertise on nerves about the CD interface and typing
   [https://www.facebook.com/ads/library/?id=1433183992073593],
   [https://www.facebook.com/ads/library/?id=1072603158685673]. This fits Vasha's USP and memory
   experiment 1. Note that the user chose not to quote a fee figure in posts (`memory.md`).

## Competitor standouts

Follower counts were not returned by the actor, so "vs usual" compares each post with the median
reactions of the same page's last 20 posts.

**Verified Facebook pages (found this run):**
- Banglay IELTS: the old page `facebook.com/BanglayIELTS` is "not available". Banglay IELTS announced
  `https://www.facebook.com/BanglayIELTSDhaka` as its new official page (post of 23 Sep 2026)
  [https://www.facebook.com/rashed.banglayielts/posts/pfbid02qaW5XhTJXmsb6ES6MotVESqnbS683vQWdsSi7nJXmTxeR8PWySbpqe9YNKmQmhBUl].
  Branch pages: `facebook.com/BanglayIELTS.CTG` and `facebook.com/BanglayIELTSSylhet`.
- FutureEd: `https://www.facebook.com/futureed.ieltsbritishcouncilbd` (page name "FutureEd English Language
  Institute"; promotes the Banani venue and its masterclass) [raw/apify-facebook-posts-scraper-page-identity-check.json].
- OnMock: `https://www.facebook.com/onmock` (posts promote onmock.com and use #IELTSBangladesh) [same file].
- Bandscore9: `https://www.facebook.com/bandscores9` (with an "s"; posts mention Bandscore9's AI and a
  +880 phone number). `facebook.com/bandscore9` is an unrelated Persian page [same file].

### Banglay IELTS Dhaka (20 posts, 29 Oct to 4 Nov; median 41 reactions, 2 comments, 8 shares; median reel views 8,617)

1. **HSC meme reel, 30 Oct**, hook (caption): tag your HSC-candidate friends. **36,331 reactions, 447 comments,
   1,039 shares, 1,499,343 views** (about 886x median reactions) [https://www.facebook.com/reel/2466899444071263/].
   *Why it likely worked:* it was posted the night before HSC results, used a relatable comedy clip, and
   asked people to tag friends. Of the 50 comments collected, most tag friends by name, so the tags
   spread it (seen in `raw/`, names not stored). The pinned brand comment links to a free post-HSC
   career-counselling form. It's a reach play, not an IELTS lesson.
2. **Trend-jacking image post, 29 Oct**, "বহুত হইসে পঞ্চগড় থেকে কাঞ্চনজঙ্ঘা, এবার কাঞ্চনজঙ্ঘা থেকে Banglay IELTS দেখেন!":
   375 reactions, 9 comments, 9 shares (about 9x median) [https://www.facebook.com/BanglayIELTSDhaka/posts/pfbid02XYVF2Ybvc8LBzxXmuNkFEaCHxp4rnXjKMtWTsmkm5xG9eWsBVzWQwhpGRTbz9UTUl].
   *Why:* it rides a seasonal trending topic (Kanchenjunga views from Panchagarh) with a joke (inferred).
3. **HSC congratulation reel, 31 Oct**: 302 reactions, 26 shares, 11,830 views (about 7x)
   [https://www.facebook.com/reel/1411322800984146/]. *Why:* timely and empathetic ("একটা পরীক্ষাই জীবনের সবকিছু নয়").
4. **Teaching reel, "Writing Task 1-এ কি আছে আসলে?", 30 Oct**: 118 reactions, 8 shares, 7,067 views (about 2.9x)
   [https://www.facebook.com/reel/2296620691203644/]. This is the only pure IELTS-skill post that beat the median.
   *Why:* a simple curiosity question that suits beginners (inferred).

### FutureEd (20 posts, 26 Oct to 4 Nov; median 7 reactions, 0 comments, 1 share; median reel views 10,632)

1. **HSC offer reel, 31 Oct**: 130 reactions, 268,494 views (about 19x median reactions)
   [https://www.facebook.com/reel/1494715342707846/]. The same copy runs as a paid ad from 1 Nov
   [https://www.facebook.com/ads/library/?id=2151950825356808], so the views are probably mostly paid (inferred).
2. **"Shortcut IELTS" image post, 28 Oct**, hook "মাত্র ১ মাসেই IELTS-এ 7+ Band Score-এর Perfect প্রস্তুতি!":
   114 reactions, 7 shares (about 16x)
   [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid0YFsxaaYftii3eYbNgzyK23Vs2jnQHtaVqTjtcZ3thxwGQ1R7a45FSUDELCaPNMLBl].
   *Why:* a time-pressure promise (1 month) plus a band number. **Vasha cannot use this hook:** it implies
   a band outcome (brief no-go).
3. **HSC offer image post, 1 Nov**: 61 reactions (about 9x) [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid02sreSivgbrfMTsSpbpMexoGTduwhqgDPMmAZSay5kadNT9HAaMrkhQ19CbmNwPNX8l].
4. **Relatable meme, 29 Oct**, "জ্বি, বুঝতে পারছি। মাসের শেষ 🥲": 36 reactions (about 5x)
   [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid02urQgVkhhvz7BkxgFZpygLA4MMrttJvcoim8gt5n7zpLZRuGmwyFreydJvo5HKnwyl].
   *Why:* a low-effort, relatable money joke gets more reactions on this page than course ads (inferred).
- For reference: FutureEd's **mock-test photo post** ("পরিবেশটা চেনা থাকলে, নিজের Confidence ও বাড়ে"), 2 Nov:
  11 reactions (1.6x) [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid02H2ofkarsfVRpAsHdsMYMo7gz8wFtPa1L9UR4PBS3SK4jYmisLeHtKXHPs6Q7QTTyl].

### Banglay IELTS Chattogram (median 5.5 reactions) and Sylhet (median 6)

- CTG reel promoting a "৩-৩.৫ মাসের স্পেশাল IELTS Focus Course", 2 Nov: 58 reactions, 7 shares, 3,699 views (about 10.5x)
  [https://www.facebook.com/reel/1844605020064820/].
- Sylhet band-6.5 student result post, 2 Nov: 49 reactions, 10 comments, 11 shares (about 8x)
  [https://www.facebook.com/BanglayIELTSSylhet/posts/pfbid02X2TLkp3uJhXhCuuxABkEgVbfhoPZfK1ZWcERWZMNWmQN6Up2HuYjFGNr2TbR9Jfol].
  Real student results get above-median engagement here. Vasha may only use real, consented results (brief no-go).
- All three branches cross-post the same items. Many are study-abroad, university and visa posts. **Not for
  Vasha** (no visa or immigration advice).

### 10 Minute School (main page; 20 posts, 28 Oct to 3 Nov; median 325.5 reactions; reels' median views 76,091)

- **No IELTS posts** in the last 20. The page is focused on class 5–9 annual exams and HSC 27/28
  [raw/apify-facebook-posts-scraper-competitor-pages.json]. Its top reel is a skit with a presenter (30 Oct): 8,894 reactions,
  580,685 views [https://www.facebook.com/reel/1146393961100137/]. It's school content, so it isn't directly
  comparable. The format lesson is a question hook plus a familiar presenter (inferred).
- A 10 Minute School IELTS ad (started 10 Jun 2026, still active) pushes mock-test volume: "যত বেশি মক টেস্ট তত বেশি IELTS Success"
  [https://www.facebook.com/ads/library/?id=980002841602435].

### OnMock and Bandscore9

- **OnMock:** no posts between 21 Oct and 4 Nov. The latest is from 18 Oct (7 reactions)
  [https://www.facebook.com/onmock]. On 12 Oct it published a "Grand Mock" Reading top-10 leaderboard (7 reactions,
  1 comment). It's a gamified community event; inspiration only (raw file, names redacted). On 22 Sep it posted about
  doubts that AI marking "flatters" users (9 reactions); see audience language below.
- **Bandscore9:** appears dormant. The last post is from 3 Aug 2025, with 0 reactions [https://www.facebook.com/bandscores9].
- Neither page has active ads in Bangladesh (Ad Library total 0) [raw/apify-facebook-ads-scraper-competitor-pages-BD-active.json].

## Active ads

From the Meta Ad Library (country BD, active), read through `apify/facebook-ads-scraper` (public data).
Each ad links to `https://www.facebook.com/ads/library/?id=<id>`.

**FutureEd** (31 ads captured; the run hit its cost cap, so the list may be incomplete):
- Registration-fee hook: "IELTS Registration Fee এখন ৩১,১০০ টাকা … ৪,০০০ টাকা instant Discount", with a free mock
  test and feedback session included (image, WhatsApp CTA, started 30 Oct) [id=2152109335396825]. An earlier fee-rise
  warning ad is still active [id=2861827494216422].
- HSC graduates: 50% off courses and up to ৳4,500 off registration (video, started 1 Nov) [id=2151950825356808].
- Short-time courses: "Jhotpot IELTS" (7 days) [id=2484806748596102] and "Shortcut IELTS" (1 month, "Band 7+") [id=2209154719663471].
- Lead magnet: a free IELTS Writing module aimed at people "stuck at 5–5.5" (video, "Download" CTA) [id=978762005074055].
- CD reassurance: "CD IELTS মানেই কি অনেক ভয়ের কিছু?" (instructor video) [id=1433183992073593]. The free CD mock
  is advertised with student reviews of the CD lab [id=972272235910114].
- FutureEd Dhanmondi (a separate page) offers centre mock packages at ৳1,500 for one test, up to ৳8,000 for 10 [id=949686690910739].

**Banglay IELTS Dhaka** (19 ads captured):
- Online private batch with Rashed Bhai, starting 19 Nov: 30+ live classes, an app and "5 AI Mock Tests – Completely Free"
  (image, WhatsApp CTA, started 25 Oct) [id=1102281196124095]. A video version opens with student fears ("Listening ধরতে পারি না",
  "Speaking বলতে গেলে মাথা ব্ল্যাংক", "Writing-এ বারবার একই ভুল") [id=1821926445664149].
- Crash course for people who are short on time (1.5 months, 31 classes) [id=1403776357971631].
- Working professionals and spoken English [id=1932922271216316], [id=1116368951145478].
- Format: almost all use a WhatsApp CTA, with Bangla problem-first copy.

**Others advertising on "IELTS mock test" in BD** [raw/apify-facebook-ads-scraper-keyword-IELTS-mock-test-BD-active.json]:
- **IELTSly** (an AI platform, not in `competitors.md`): "Unlimited Mock Test সাথে Instant Result এখন মাত্র ৯৯০ টাকায়" [id=28793465407008455];
  "52টি Cambridge IELTS Full-Length Mock Test … FREE full-length mock test দিন — এবং জেনে নিন আপনার আসল band score" [id=1083304344668822].
  It is a direct match for Vasha's offer. **Consider adding it as a competitor (user decision).**
- **Arif Academy:** unlimited mock tests at ৳350 for one month or ৳650 for two months, all four modules [id=1120607073637749].
- **British Council Bangladesh:** a CD IELTS prep course whose ad promises a minimum band of 6.5 ("6.5* ব্যান্ড স্কোর গ্যারান্টি")
  [id=1072603158685673]. Vasha must never make a similar claim. British Council / Take IELTS also advertise a **free mock
  test** with feedback on all four skills [id=960666116830200], [id=2093745058196018].
- **Penston Academy (Chattogram):** premium mock tests at the main exam venue [id=891473933928002].

## Audience questions and language

Comments were collected on the 3 most-engaged recent competitor posts that had comments (all on Banglay IELTS Dhaka),
59 comments in total. Text only; no names kept [raw/apify-facebook-comments-scraper-banglayielts-dhaka-top3.json].
Other competitor posts had 0–1 comments, so very little IELTS-specific audience language was available this week.

- **Price is the first question** (5 of 9 comments on the two course posts):
  "কোর্স ফি কত", "কোর্স ফি?", "Course fee koto?"
  [https://www.facebook.com/BanglayIELTSDhaka/posts/pfbid0ZxPPsPKPHEKSrtRz3McsaAj1jpEkfR2JXNtPq19hzjGMPq7EHbY7Xd1ogMxxPcpfl],
  [https://www.facebook.com/BanglayIELTSDhaka/posts/pfbid02dSCuphAjUYqz3pt5N4cdUoyiQbe5obDc12EgP2ttxujAntwTm9j2MYizj5AzVtQcl].
- **Start date and details:** "ডিটেলস টা জানান+ কবে থেকে শুরু" [same HSC offer post].
- **The HSC 2026 crowd (reel comments):** "Ami nijei HSC-2026...peray asi...😅", "4.33 এ যাত্রায় বেঁচে গেছি", "কে কে পাস করছেন হাত তোলেন🙂"
  [https://www.facebook.com/reel/2466899444071263/]. The tone is playful and Banglish (Bangla written in Latin script).
- **Doubt about AI marking:** OnMock quotes a user's doubt: "আমি ভেবেছিলাম ফ্ল্যাটার করছে ইউজারকে খুশি করতে..." (22 Sep, outside
  the 14-day window) [https://www.facebook.com/onmock]. This supports the "practice estimate" honesty framing in the brief.
- **Pain phrases used in competitors' ads.** These are advertiser copy that reflects audience fears, not audience comments (inferred):
  "Writing-এ … score কি এখনও 5–5.5-এ আটকে আছে?" [id=978762005074055]; "Speaking বলতে গেলে মাথা ব্ল্যাংক" [id=1821926445664149];
  "অনেকেই টাইপিং বা ইন্টারফেস নিয়ে দ্বিধায় থাকেন" [id=1433183992073593]; "সময় কম, এখন কী করবো?" [id=1403776357971631].

## Niche news and trends

- **HSC 2026 results were published on 31 Oct.** The pass rate was 52.12% (down from 58.83%), and 40,084 students got GPA-5
  [https://en.prothomalo.com/youth/education/hdjdl19opa], [https://bdnews24.com/education/wyevx1rrka].
  Every IELTS competitor pivoted to HSC-graduate offers and content (see above).
- **The IELTS fee is BDT 31,100** (standard and CD). UKVI is BDT 34,850, and transfer and refund fees are BDT 3,000
  [https://ielts.idp.com/bangladesh/about/which-test-do-i-take/computer-based-ielts]. FutureEd's ads date the rise to
  4 Sep 2026 [https://www.facebook.com/ads/library/?id=2861827494216422]. The user chose not to quote fee figures in posts
  (`memory.md`, experiment 1).
- **Computer-delivered only:** paper-based IELTS ended in Bangladesh in early 2026
  [https://ielts.idp.com/bangladesh/about/which-test-do-i-take/computer-based-ielts]. FutureEd's ad says the shift
  started "from February 2026" [https://www.facebook.com/ads/library/?id=972272235910114]. CD anxiety is an active ad theme
  for both FutureEd and British Council.
- **New AI entrant, IELTSly** (ads since 17 Sep): unlimited mocks for ৳990, an AI speaking partner and an AI coach
  [https://www.facebook.com/ads/library/?id=1083304344668822]. Unlimited-mock bundles (৳350–990) reset value expectations (inferred).
- **"Mid-Nov IELTS prediction" posts are circulating:** a Writing Task 1 comparative-maps prediction
  [https://www.facebook.com/IELTSListeningOfficial/posts/pfbid025MbNyqkQqoz1uetK4c7aWcyMNG8zQyv82NrB3h5pXB9T2XHA9WNkxuDCKuivDoFel].
  Prediction content signals that test-takers are active in mid-November (inferred). Vasha must not imply any inside knowledge of the exam.

## Occasions this week

- **No public holidays from 9 to 15 Nov** in Bangladesh's 2026 government calendar
  [https://tbsgraduates.net/?p=24548], [https://en.prothomalo.com/bangladesh/9qm1mewsjl].
- **Post-HSC decision window** (week 2 after the 31 Oct results): graduates are choosing their next step, and competitor
  HSC offers are running now [ads above].
- **Competitor events this week** (expect the audience to compare options):
  - FutureEd Free IELTS Masterclass, **Thu 12 Nov**, Banani [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid0XTuGRFoZ3dnncw5xjEcvZVnRLtnukD94WgsZj9rskiVXWAV4DYTzoJe2T5819GXTl].
  - HEXA's Majortila (Sylhet) Friday mock tests on **13 Nov** and 27 Nov
    [https://www.facebook.com/HexasHeadOffice/posts/pfbid02NjGv7rgtuf239bzCTbYKuMbKJ7NakL749brtDw9vPhTRdsrAXkVjYy6NQAS3mr24l].
  - New course batches start just after the week: FutureEd IELTS Regular on 16 Nov
    [https://www.facebook.com/futureed.ieltsbritishcouncilbd/posts/pfbid0c1rzf6zpv2L4qxyG4UBaWyZxSdKagyqApC8QmcVP2zoAsXxWfsER7i7e9guubuHFl]
    and the Banglay IELTS online private batch on 19 Nov [https://www.facebook.com/ads/library/?id=1102281196124095].
- **School annual exams (classes 5–9)** are running in November [https://www.facebook.com/10minuteschool/posts/pfbid0KiDFWy7EKh3RKh2MGiAhxXX88C2g9TpoXevBNLHkabitCNcMi7ncCSmsQX48T6cUl].
  They aren't Vasha's audience, but they crowd the education feed (inferred).

## Gaps

- **Meta Ad Library direct access:** HTTP 403 from this session. It was read instead through Apify `facebook-ads-scraper`.
  The FutureEd and Banglay IELTS run hit its $0.30 cap and stopped after 52 ads, so their ad lists may be incomplete.
  **10 Minute School's page ads were not scraped**; only one of its IELTS ads appeared through keyword search.
- **Banglay IELTS old page** (`facebook.com/BanglayIELTS`): the actor returned "not available". The new official page
  (`BanglayIELTSDhaka`) and the branch pages were used instead.
- **10 Minute School IELTS / Munzereen Shahid:** the main page had no IELTS posts in its last 20. The official Munzereen Shahid
  page was not found: page search returned fan or unverified pages, and `facebook.com/mscourses19` is a 10MS affiliate
  reseller whose last post is from Jan 2024.
- **OnMock:** no posts in the last 14 days, so it has no standouts. **Bandscore9:** dormant since Aug 2025.
- **Follower counts:** not returned by `apify/facebook-posts-scraper` for any page. Standouts are compared with each page's
  median of its own last 20 posts instead.
- **Audience comments:** competitor posts have very few comments (0–11). Only 9 IELTS-relevant comments were collected.
  Most of the 50 comments on the top reel were friend tags (names not stored).
- **Instagram:** not researched (the brand has no Instagram for now, per brief.md).
- **Reel actor (`clappi/facebook-posts-reels-scraper`):** not run. Reel views came from the posts scraper.
- **Competitor websites** (banglayielts.com, futureed.org, onmock.com, bandscore9 domains): blocked by the session proxy
  (CONNECT 403). Not needed this week.
- **Keyword search results** included posts in Facebook groups. These were **excluded** (privacy and public-only rule), as were
  posts from personal profiles.
- **Official IELTS test dates for 9–15 Nov:** not verified (the IDP test-dates page returned 404).
