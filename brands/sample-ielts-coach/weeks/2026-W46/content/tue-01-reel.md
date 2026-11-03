# Post: tue-01-reel

- **Brand / week:** sample-ielts-coach, 2026-W46
- **Slot:** Tue 10 Nov, 1:30pm (Bangladesh time, Asia/Dhaka, UTC+6)
- **Channel:** Facebook profile + Instagram (Instagram copy by hand or skipped until Meta is set up; see plan "Needs the human" #9)
- **Format:** reel (silent, text on screen)
- **Pillar / day theme:** Authority / open
- **Persona and pain point:** P1 (final-year first-time test taker), no time between university mid-terms and IELTS prep
- **Made:** 3 Nov 2026 (test run, early by human request)
- **Review:** passed

## Hook

Mid-term চলছে, IELTS-ও সামনে? দিনে ২০ মিনিটে Speaking প্র্যাকটিস, চলো দেখি কীভাবে।

## Caption

Mid-term চলছে, IELTS-ও সামনে? দিনে ২০ মিনিটে Speaking প্র্যাকটিস, চলো দেখি কীভাবে।

জানি, class আর exam-এর চাপে সময়ই নেই।
চিন্তা করো না। প্রতিদিন শুধু ২০ মিনিট দাও।

১. প্রথম ৫ মিনিট: Part 1-এর কয়েকটা প্রশ্নের উত্তর জোরে জোরে বলো।

২. পরের ১০ মিনিট: Cambridge IELTS বই থেকে একটা Part 2 cue card নাও। ছোট করে plan করো। তারপর phone-এ record করে বলো।

৩. শেষ ৫ মিনিট: Recording-টা শোনো। যে একটা জিনিস ঠিক করবে, সেটা লিখে রাখো।

পরের দিন ওই একটা জিনিস মাথায় রেখে আবার শুরু।
অল্প অল্প করে, প্রতিদিন।

রবিবার রাতের Live-এ এই routine একসাথে করবো। Comment-এ 'Live' লেখো।

#IELTS #IELTSBangladesh #IELTSSpeaking #IELTSPreparation #StudentLife

## Call to action

রবিবার রাতের Live-এ এই routine একসাথে করবো। Comment-এ 'Live' লেখো।

## Hashtags

#IELTS #IELTSBangladesh #IELTSSpeaking #IELTSPreparation #StudentLife

## On-screen content

Silent reel: the text carries the whole message. 8 scenes, 28 seconds, each 3–4 seconds, at most
3 words per second.

| Scene | Time | On-screen text | Words / pace |
|-------|------|----------------|--------------|
| 1 (hook) | 0–3s | Mid-term চলছে? / **IELTS-ও সামনে?** | 4 words, 1.3/s |
| 2 | 3–6s | দিনে **২০ মিনিট** / Speaking প্র্যাকটিস। চলো দেখি। | 7 words, 2.3/s |
| 3 | 6–10s | প্রথম ৫ মিনিট / **Part 1** / প্রশ্নের উত্তর জোরে জোরে বলো | 10 words, 2.5/s |
| 4 | 10–13s | পরের ১০ মিনিট / **Part 2 cue card** | 7 words, 2.3/s |
| 5 | 13–16s | ছোট করে plan করো। / তারপর phone-এ **record** করে বলো। | 9 words, 3/s |
| 6 | 16–20s | শেষ ৫ মিনিট / **Recording শোনো** / একটা ভুল লিখে রাখো | 9 words, 2.3/s |
| 7 | 20–24s | ৫ + ১০ + ৫ = **২০ মিনিট** / চিন্তা করো না। | 4 numbers, 4 words, 2/s |
| 8 (CTA) | 24–28s | রবিবার রাতের Live / **এই routine একসাথে করবো** / Comment-এ **'Live'** লেখো | 10 words, 2.5/s |

The Cambridge IELTS book tip is in the caption only, to keep scene 4 readable.

## Voiceover script

none (silent reel)

## Visual brief

- **Size:** 1080 x 1920 (9:16), silent MP4 (no audio track), 30 fps, for Facebook and Instagram reels.
- **Style:** clean, bold text on navy `#1E3A5F`; text white; key words (the starred words in the
  Media spec) in orange `#F28C28`. Bangla text in Hind Siliguri, English words in Poppins (mixed
  lines switch fonts automatically).
- **Coach photo:** `assets/photo.png`, bottom-left corner, on every scene (brief: coach photo in the
  corner; real person only, no animated figures).
- **Logo:** `assets/logo.png`, small, bottom-right corner.
- **Motion:** each scene fades and slides in, then fades out (renderer default). Keep text in the
  upper two-thirds so it isn't covered by the Facebook/Instagram reel buttons and caption.
- **Audio:** none. The brief allows light, low-volume music and the plan mentions it, but reels are
  silent for now (Content Creator rules; media/README.md). Music can be added in the app when posting
  if the human wants it (light, low volume).
- **Different from the plan's idea:** the plan described "coach to camera, 30–45s". As a silent text
  reel it is 28 seconds, with the coach photo in the corner instead of a talking-head video.

## Media spec

```json
{
  "format": "reel",
  "style": {
    "background": "#1E3A5F", "text": "#FFFFFF", "accent": "#F28C28",
    "fontMain": "Hind Siliguri", "fontLatin": "Poppins", "theme": "glass",
    "logo": "logo.png", "logoPosition": "bottom-right",
    "photo": "photo.png", "photoPosition": "bottom-left"
  },
  "scenes": [
    {"start": 0, "end": 3, "blocks": [
      {"type": "kicker", "text": "Mid-term চলছে?"},
      {"type": "headline", "text": "IELTS-ও *সামনে?*"}
    ]},
    {"start": 3, "end": 6, "blocks": [
      {"type": "headline", "text": "দিনে *২০ মিনিট*"},
      {"type": "text", "text": "Speaking প্র্যাকটিস।\nচলো দেখি।", "size": "l"}
    ]},
    {"start": 6, "end": 10, "blocks": [
      {"type": "kicker", "text": "প্রথম ৫ মিনিট"},
      {"type": "headline", "text": "*Part 1*"},
      {"type": "text", "text": "প্রশ্নের উত্তর\nজোরে জোরে বলো", "size": "l"}
    ]},
    {"start": 10, "end": 13, "blocks": [
      {"type": "kicker", "text": "পরের ১০ মিনিট"},
      {"type": "headline", "text": "*Part 2* cue card", "size": "l"}
    ]},
    {"start": 13, "end": 16, "blocks": [
      {"type": "headline", "text": "ছোট করে plan করো।", "size": "l"},
      {"type": "text", "text": "তারপর phone-এ *record* করে বলো।", "size": "l"}
    ]},
    {"start": 16, "end": 20, "blocks": [
      {"type": "kicker", "text": "শেষ ৫ মিনিট"},
      {"type": "headline", "text": "Recording *শোনো*"},
      {"type": "text", "text": "একটা ভুল লিখে রাখো", "size": "l"}
    ]},
    {"start": 20, "end": 24, "blocks": [
      {"type": "headline", "text": "৫ + ১০ + ৫\n= *২০ মিনিট*"},
      {"type": "text", "text": "চিন্তা করো না।", "size": "l"}
    ]},
    {"start": 24, "end": 28, "blocks": [
      {"type": "kicker", "text": "রবিবার রাতের Live"},
      {"type": "headline", "text": "এই routine\n*একসাথে* করবো", "size": "l"},
      {"type": "text", "text": "Comment-এ *'Live'* লেখো", "size": "l"}
    ]}
  ]
}
```

## Reply guide

Rules: reply in **Bangla only** (Bangla script, no Banglish), even when the comment is in Banglish
or English (plan standing rule). Elder-brother voice, "তুমি", short sentences. No band promises,
never make fun of anyone's English, no other teacher or centre named.

- **"Live":** "দারুণ! রবিবার রাত ৯:৩০-এ Facebook Live-এ দেখা হচ্ছে। একটা cue card হাতে রেখো।"
- **"২০ মিনিটে কি হবে?":** "শুরু করার জন্য ২০ মিনিটই ভালো। আসল কথা হলো প্রতিদিন করা।"
- **Which book / where to find cue cards:** "যেকোনো Cambridge IELTS বইয়ের Speaking অংশ থেকে নিতে
  পারো। নতুনটা চাইলে Cambridge IELTS 21।"
- **Asks how long Part 2 prep and speaking time is:** "রবিবারের Live-এ Part 2 ধাপে ধাপে দেখাবো।"
  (Don't give minute figures in replies until they are checked on ielts.org; see Facts.)
- **Feels awkward hearing own recording:** "প্রথম প্রথম নিজের গলা শুনতে অদ্ভুত লাগে, এটা খুব
  স্বাভাবিক। চিন্তা করো না, কয়েক দিনেই অভ্যাস হয়ে যাবে।"
- **"Band 7 পাবো তো?" or asks for a guarantee:** "Band-এর guarantee আমি দিই না। তবে তোমার Speaking
  কোথায় আটকাচ্ছে, Live-এ শুনে বলবো।"
- **No partner to practise with:** "একাই করা যায়, phone-ই তোমার partner। Record করো, শোনো, একটা
  জিনিস ঠিক করো।"
- **Asks about course price or admission:** "Inbox-এ বিস্তারিত জানাচ্ছি।"
- **Mentions another teacher or centre:** thank them; don't comment on the other teacher.

## Facts and sources used

- University mid-terms squeezing IELTS prep time (hook and opening): research 2026-W46, Audience
  questions ("Sir klk mid tao apnar class kortesi") and Occasions (University mid-terms);
  personas.md P1; targeting hook 6.
- 20-minute routine (5 min Part 1 aloud, 10 min Part 2 cue card with a plan and a phone recording,
  5 min listen back and note one fix): plan 2026-W46, `tue-01-reel` Idea. This is the coach's
  practice routine, not a claim about the test.
- IELTS Speaking has a Part 1 and a Part 2 with a cue card: standard IELTS Speaking format
  (ielts.org test format, approved source). Only the part names are used.
- **Not used:** the Part 2 timings (1 minute to prepare, up to 2 minutes to speak). The plan marks
  them "check against ielts.org", and research could not open ielts.org (research: Gaps). The
  routine says "ছোট করে plan করো" instead of "১ মিনিট".
- Practice cue cards from Cambridge IELTS books: brief, Approved sources. No specific question is
  shown, so no book and test number is needed. Cambridge IELTS 21 is out (reply guide only):
  research 2026-W46, Niche news.
- Sunday night Live (CTA) and 9:30pm (reply guide): brief, Business product (free weekly speaking
  mock test on Facebook Live) and Posting times (Sun Live 9:30pm); plan "Needs the human" #3.
- No numbers, results, testimonials or band claims.

## Review notes

Round 1 (3 Nov 2026, early test at the human's request; the early timing is not counted as a fail).

1. Plan match: pass. Pillar Authority / open, P1 (mid-terms, no time), reel, Facebook profile +
   Instagram, hook and CTA word for word as in the plan's `tue-01-reel` row and Post details. The
   switch from "coach to camera, 30–45s" to a 28s silent text reel follows the silent-reel rule and
   is noted in the Visual brief.
2. Language: pass. Captions, hook, CTA, on-screen text and replies in Bangla; IELTS terms (Part 1,
   Part 2, cue card) stay in English. The English loanwords (class, exam, plan, record, routine) are
   normal for this audience and read naturally. No spelling mistakes found.
3. Voice: pass. Warm elder-brother tone, short sentences, uses "চিন্তা করো না" and "চলো দেখি", "তুমি"
   form; no shaming, no band promises.
4. No-go topics and promises: pass. No band or visa promise (the reply guide refuses a guarantee),
   no other teacher or centre named, no foreign-country, political, religious or "real exam" content.
5. Facts: pass. Every fact is listed with a source. The unconfirmed Part 2 timings (plan: "check
   against ielts.org") are left out of caption, scenes and replies ("ছোট করে plan করো" instead of
   "১ মিনিট"). Live on Sunday 9:30pm is in the brief's Posting times. Cambridge IELTS 21 being out
   is in research (Niche news).
6. No invented proof: pass. No results, reviews, testimonials, student numbers or band claims. The
   20-minute routine is the plan's own idea, framed as practice advice, not a claim about the test.
7. Approved sources: pass. Part names from the ielts.org test format; cue cards point to Cambridge
   IELTS books. No specific question is shown, so no book and test number is required.
8. Originality: pass. Hook is targeting hook 6 (our own). No line matches any competitor post or ad
   wording in research (checked against the Mentors', FutureEd, 10 Minute School and Edukraft items).
9. Completeness: pass. All template sections are filled; hook is the caption's first line; 5
   hashtags; one CTA (comment "Live"); visual brief uses navy `#1E3A5F`, orange `#F28C28`, white,
   Hind Siliguri / Poppins, logo small bottom-right, coach photo in a corner.
10. Media spec: pass. Valid JSON in the `media/README.md` shape (format, style, scenes, allowed block
    types). Style matches the brief. Scene text matches "On-screen content". 8 scenes of 3–4s, 28s
    in total (inside 15–30s). Busiest scene is scene 5 at 9 words in 3s (3/s, at the limit, not
    over). The message works with no sound. Optional, not a fail: the On-screen table bolds
    "IELTS-ও সামনে?" (scene 1) and "Part 2 cue card" (scene 4), but the spec colours only "সামনে?" and
    "Part 2". The spec is what gets rendered, so the table could be brought in line next time.

