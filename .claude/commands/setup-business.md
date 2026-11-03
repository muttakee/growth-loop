---
description: Add a new brand (business or personal profile). Asks one question at a time, creates the brand folder, then runs onboarding.
argument-hint: "[brand name] (optional)"
---

# /setup-business

You are adding a new brand to GrowthLoop. Follow these steps exactly.

## Rules for the interview

- Ask **one question at a time**. Wait for the answer before asking the next one.
- Keep each question short, with one example answer to help.
- The user may answer in English or Bangla. Write the brief in **English**, but keep exact
  wording (slogans, phrases, names) in the original language.
- The user can say **"skip"** for any question. Write `TBD` for that field and list it in the summary.
- If an answer is vague (e.g. "everyone" as target customer), ask **one** follow-up to sharpen it.
- Never invent answers. Only write what the user told you, or what you clearly marked as a suggestion.

## Step 1: Profile type

Ask: "Is this a **business** profile or a **personal** profile (a person, e.g. a teacher or founder)?"

## Step 2: Basics

Ask one at a time:

1. Brand name (if not given as `$ARGUMENTS`). Then suggest a slug (lowercase-kebab-case) and
   confirm it. If `brands/<slug>/` already exists, stop and tell the user.
2. Website (or "none").
3. Channels: which of these does the brand use, with links?
   Facebook personal profile, Facebook Page, Instagram.

## Step 3: Profile questions

Ask one at a time, in this order:

1. **Mission:** why does the brand exist, and what does it do for its customers?
2. **Vision:** where does it want to be in the long run?
3. **Next year goal:** the main goal for the next 12 months (a number if possible).
4. **USP:** what makes it different from competitors?
5. **Target customer:** who does it sell to?
6. **Customer persona:** describe the ideal customer in your own words.
7. **Business product:** what is sold, at what prices, and what is the main offer?
8. **Target customer geography:** which countries, cities or regions?

Personal profile only, also ask:

9. **Professional info:** profession, experience, qualifications, achievements.
10. **Expertise:** which topics are they an expert in, and can teach or speak about with authority?
11. **Personal info:** background, story, values and interests they're happy to share publicly.

## Step 3b: Content interview

The goal is to understand the business well enough to build real content from it. Ask one at a
time, and ask **one follow-up** whenever an answer is general, to get a concrete example
(who, what happened, what changed, a number if possible). The user can say "none yet" or "skip".

1. **Customer results:** tell me 1–3 real customer stories: their problem before, what you did,
   and the result after. Can we share them publicly (with the customer's consent)?
2. **Personal stories:** which stories from your own life or work explain why you do this?
   Which ones are fine to tell publicly?
3. **Proof:** what reviews, testimonials, numbers, awards or media mentions do you have, and
   where can they be seen?
4. **What makes the product different:** in your own words, what does a customer get from you
   that they don't get elsewhere?
5. **Questions and objections:** what do people ask before they buy, and why do some not buy?

Write the answers into the "Content interview" section of `brief.md`. Never invent stories,
results or reviews: if the user has none, write `None yet`.

## Step 4: Content rules

First, the content mix:

1. **Posts per day:** how many posts a day? (suggest **2**, i.e. 14 a week)
2. **Posting times:** recommend a time slot for each daily post, based on this brand's
   audience: the target geography and its time zone, its work week and weekend (e.g. Bangladesh
   works Sun–Thu), and the target customer's routine (students, office workers, parents, etc.).
   Show it as a small table (days → post 01 time, post 02 time) with one line on why. Keep slots
   the same every week, and put any recurring Live at a fixed day and time. The user confirms or
   changes it. Say it can be changed any time later.
3. **Content pillars:** suggest this mix and ask the user to confirm or change it (it must add up
   to 100%):
   - **Authority 60–70%:** expert teaching and tips, case studies, before/after results.
   - **Personal story 15–20%:** the owner's own stories, behind the scenes, values.
   - **Sell 15–20%:** reviews and proof, unique product points, clear call to action.
4. **Weekly themes:** does any day of the week have a fixed theme? (e.g. Fri → personal story,
   Sun → a core topic). Days without a theme are `open`.

Then ask one at a time:

1. **Language:** main language for captions, hooks and voiceovers? Is any content kept in another
   language (e.g. English learning material explained in Bangla)?
2. **Voice:** how should the brand sound? Any words or phrases to use or avoid?
3. **Colours and fonts:** brand colours (hex codes if known) and fonts.
4. **Music:** allowed in videos, or not?
5. **People and figures:** real people, animated figures, or none?
6. **Preferred visuals:** e.g. clean minimal, nature, calligraphy, bold text.
7. **Logo placement:** where on posts? (default: bottom-right, small)
8. **Approved sources:** does the brand quote sources (e.g. scripture, research, exam bodies)?
   If yes, list the only sources allowed.
9. **No-go topics:** anything we must never say, show or promise?

## Step 5: Competitors

Ask: "Name 3–5 competitors (Facebook/Instagram links if you have them), or say **find** and the
onboarding agent will suggest some for you to confirm."

## Step 6: Files

1. Ask for the **logo** (upload it, or give a file path). Personal profile: also ask for the
   **person's photo**, which is placed in a corner of every post.
2. The user may say "later". Then note it as `TBD` in the summary.

## Step 7: Summary and confirm

Show a short summary of every answer, grouped as Basics, Profile, Content interview, Content rules (with the pillar mix and weekly themes), Competitors,
Files, with all `TBD` fields listed at the end. Ask: "Is this correct? Reply **yes** or tell me
what to change." Apply changes and show the summary again until the user says yes.

## Step 8: Create the brand folder

Only after "yes":

1. Copy the template: `cp -r templates/brand brands/<slug>`
2. Fill in `brands/<slug>/brief.md` with the answers. Replace `{{Brand name}}` in every file.
   Remove the "personal profile only" sections for business profiles.
   Remove the "Approved sources" content if the brand quotes no sources (write "None").
3. Write the competitors the user named into `brands/<slug>/competitors.md`.
4. Copy the logo to `brands/<slug>/assets/logo.<ext>` and the photo to
   `brands/<slug>/assets/photo.<ext>`. Update the paths in `brief.md` if the extension isn't `.png`.

## Step 9: Onboarding

Hand off to the **onboarding** sub-agent with: the brand slug, and whether the user said **find**
for competitors. When it returns, show the user its summary and ask them to confirm or correct it.
Apply corrections to the brand files.

## Step 10: Finish

1. Commit: `Add brand: <name>`.
2. Tell the user the brand is ready for the weekly cycle, and list any `TBD` fields left to fill in.
