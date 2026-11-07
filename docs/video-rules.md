# Video rules (every Reel, every brand)

These rules apply to every video GrowthLoop makes. The Content Creator writes to them, the
Reviewer checks them, and the renderer (`studio/`) is built to follow them. Brand-specific choices
(colours, fonts, logo, voice, music allowed or not) come from the brand's `brief.md` and
`assets/theme.json`, never from this file.

## 1. No empty space, ever

- **Every scene has a visual** in its middle area. One of, in this order of preference:
  1. real footage the team supplied (instructor on camera, screen recording),
  2. a real screenshot of the brand's product or website (shown whole in a device frame),
  3. an **animated SVG illustration** from the library (`studio/src/components/Illustrations.tsx`).
- A scene with only text on a background is not allowed. If footage or a screenshot isn't
  available yet, the scene uses an illustration until it is.
- The illustration must match what is being said in that scene:

| When the scene talks about… | Illustration |
|---|---|
| time, timer, minutes, "সময়" | `timer` (clock with a moving hand and a countdown) |
| the exam/test screen, computer test | `screen` (computer with a test layout) |
| highlighting, marking text | `highlight` |
| typing an answer or essay | `typing` |
| moving between questions | `navigate` |
| submitting, results, band score | `score` |
| price, ৳, offer | `price` |
| criteria, breakdown, report | `criteria` |
| plan, steps, checklist | `checklist` |
| practise → fix → repeat | `loop` |
| a mistake, myth, "ভুল" | `mistake` |
| a question people ask, a conversation | `chat` |
| listening, audio | `headphones` |
| writing on paper, planning first | `paper` |
| checking, proofreading | `magnifier` |
| students, results day, HSC | `graduation` |
| money, exam fee (never with a figure unless the brief allows it) | `money` |
| anything else | `spark` (only as a last resort) |

- The Content Creator sets each scene's `illustration` in `<file>.render.json`. If it is missing,
  the renderer picks one from the scene's words, so a scene is never empty.

## 2. Voice and captions go together

- Every scene has a spoken line (`say`), voiced with the brand's voice (`theme.json` → `voice`).
- **Captions follow the voice word by word**: the word being spoken is highlighted at the moment
  it is said (timings come from ElevenLabs). Captions show 1–4 words at a time.
- The scene's headline is a short summary of what is being said, never different in meaning.
- A scene lasts at least as long as its spoken line plus a short breath; the voiceover tool
  lengthens scenes automatically.

## 3. Premium look

- Dark brand-colour backdrop with slow-moving glows; no flat single-colour screens.
- Text and visuals animate in (word-by-word headline, spring motion); nothing just pops on.
- Logo in the brand's position on every frame; a thin progress bar at the top.
- Keep text inside the safe area: nothing important in the top 200 px or bottom 250 px of a
  1080×1920 frame (platform buttons cover them).
- The last scene is a call to action with the link as a button.
- Bangla (or the brand's main language) must render with correct conjuncts; check frames.

## 4. Before a Reel is ready

Check a frame from every scene (`ffmpeg -ss <s> -i <mp4> -frames:v 1 <png>`):

- [ ] No scene is empty in the middle area
- [ ] Each illustration matches what is said
- [ ] Captions are in sync with the voice and highlight the spoken word
- [ ] No text is cut off or overlaps another element
- [ ] The MP4 has an audio track, and the voice is clear
