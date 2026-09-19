# Andreea’s Lab website – how to change things

This is your website. Every word, price, photo and opening hour lives in a small number of plain
text files, so you can change them yourself without touching any code. This guide shows you how.

If you get stuck, message Carl. Nothing you do in these files can break the site permanently:
every change is saved with a history and can be undone.

## The three places you will edit

1. **`src/site.config.ts`** – your details. Phone number, WhatsApp message, email, host clinic,
   address, opening hours, cancellation and payment wording, and the on/off switches for analytics
   and before/after photos.
2. **`src/content/`** – your words. One file per treatment, one file per FAQ, one file per
   testimonial. Each file starts with a block of labelled fields between two `---` lines, then the
   free text.
3. **`src/assets/photos/`** – your photos, listed with their descriptions in `src/lib/photos.ts`.

Files ending in `.md` are plain text. Files ending in `.ts` are also plain text but a little
stricter about punctuation: keep the quotes and commas as they are and only change what is
between the quotes.

## Change a price

1. Open `src/content/treatments/` and find the treatment, for example `face.md`.
2. Find the line `priceFrom: 400` and change the number. This is the price per session in AED.
3. To show “On request” instead of a price, write `priceFrom: null`.
4. The line `priceNote:` is the small text shown under the price table. Change or delete it.
5. Save. The change appears on the treatment page, and the price in the header of that page.

## Change a session length or programme

In the same file, change `duration: "60 min"`. If a treatment is planned as a programme, add a line
`recommendedProgramme: "6 to 8 sessions, one a week"`; leave it out and the row is hidden. Keep the quotes.

## Add a treatment

1. In `src/content/treatments/`, copy an existing file and rename it. The file name becomes the web
   address, so `scar-care.md` becomes `/treatments/scar-care`. Use lowercase and hyphens.
2. Fill in every field at the top. `title` and `promise` (one line) are what people see first.
   `forWhom` is a list of who it suits. `whatHappens` describes a session in two to four sentences.
   Both are optional: leave them out and their sections stay hidden until you fill them in.
3. `order` decides the position in lists (lower comes first). `featured: true` puts it on the home page.
4. `contraindications` is the “Who should not have it” list. When you have checked it, change
   `contraindicationsConfirmed: false` to `true` and the “sample list” note disappears.
5. `heroImage` points at a photo. Add your photo to `src/assets/photos/` and write its file
   name here, keeping the `../../assets/photos/` part.
6. `whatsappName` is how the treatment is named inside the WhatsApp message, for example
   “scar care”. `faqSlugs` lists the FAQ file names to show on the page.

To remove a treatment, delete its file.

## Swap a photo

Your photos live in `src/assets/photos/`. Every place a photo appears on the site takes it from the
list in `src/lib/photos.ts`, which gives each photo a name (for example `bowl`, `tunic`, `clinic`,
`device`), a description for screen readers, and a focal point so faces stay in frame when the photo is
cropped.

- **To replace a photo everywhere it appears:** save the new photo over the old file with the same name
  in `src/assets/photos/`. Done.
- **To add a new photo:** put the file in `src/assets/photos/`, add a line for it in `src/lib/photos.ts`
  following the pattern of the others, then use its name where you want it.
- **To change a treatment page’s main photo:** open the treatment file in `src/content/treatments/` and
  change `heroImage` to the file path, `heroImageAlt` to a short description, and `heroImagePosition`
  to where the face is, for example `"center 30%"` for a face near the top.

The site resizes and compresses photos automatically, so upload the largest version you have.
Portrait photos (taller than wide) work best for the arched hero shapes; square ones for galleries.

## Add a testimonial

Testimonials are not shown on the site at the moment (the “In their words” section came off the
Before & after page on 19 September 2026). The steps below apply if the section comes back.

1. In `src/content/testimonials/`, copy `sample-01.md` and rename it, for example `2026-10-maria.md`.
2. Change `name` (initials are fine), `area`, `treatmentSlug` (the treatment file name, without `.md`)
   and `date`.
3. Change `placeholder: true` to `placeholder: false`. This removes the “Sample quote” label.
4. Set `featured: true` to show it on the home page (the first three featured quotes are shown).
5. Write the quote under the second `---` line.

Only publish quotes you have written permission for, and check the wording against the DHA rules on
testimonials with the clinic’s licence holder.

## Change a question and answer

Each FAQ is one file in `src/content/faqs/`. The question is the `question:` field, the answer is the
text below the second `---`. `group` is `clients` or `professionals` and decides which of the two
sections on the FAQ page the question sits in. `order` decides the position within the section.
When you have checked an answer, change `needsConfirmation: true` to `false`.

## Change your number, hours, address or wording

Open `src/site.config.ts`.

- **WhatsApp number**: `whatsappNumber` must be in international format with no spaces, for example
  `"+971501234567"`. `whatsappDisplay` is how it looks on the page.
- **WhatsApp message**: `messageTemplate`. Keep `{treatment}` where you want the treatment name to appear.
- **Hours**: the `hours` list. Each row has a label, the days it covers, and opening and closing times.
- **Address, how to find the room, parking**: the `location` block. The address is stored the way
  addresses are written in the UAE: `unit` (for example “Clinic 203, Level 2”), `building`, `community`,
  then `area` and `city`. The demo site uses a generic Dubai Healthcare City address; put the real one
  here before launch. Add the building’s ten-digit Makani number to `makani` when you have it. If
  Andreea works under another clinic’s licence, put its name in `hostClinic` and the wording adjusts.
- **Cancellation and payment wording**: the `policies` block (also on the terms page).
- **Qualification, training, specialisations and languages**: the `practitioner` block. Each
  specialisation has a `title` and a `text` paragraph that opens when someone taps the row.

## Turn analytics on

In `src/site.config.ts`, the `analytics` block has three empty slots. Paste your ID between the
quotes and the tracking code loads automatically. Leave a slot empty and nothing loads.

- `plausibleDomain`: your domain, for example `"andreeaslab.ae"` (Plausible sets no cookies).
- `ga4MeasurementId`: a Google Analytics ID starting with `G-`.
- `metaPixelId`: the Meta Pixel ID for Instagram ads.

Google Analytics and the Meta Pixel set cookies. Check with the clinic whether a cookie notice is
needed before turning them on.

## Show before and after photos

Only once the clinic’s licence holder has confirmed they are allowed. In `src/site.config.ts` set
`showBeforeAfters: true` under `results`. The cases on the Before & after page, the home page and the
treatment pages then appear.

## Add a before-and-after case study

1. Save the before-and-after image Andreea made (before on the left, after on the right, her notes on
   it) in `src/assets/results/`, for example `jawline-2026.jpg`.
2. In `src/content/case-studies/`, copy an existing file and rename it, for example `jawline-2026.md`.
3. Fill in `title`, `group` (`facial-treatments` or `facial-massage`), `concern` (what the client came
   in with), `period` (for example `"March to June 2026"`) and `plan` (one line per thing that was done).
   Point `image` at the file from step 1 and describe it in `imageAlt`. Images show in a square; if
   yours is taller, `imagePosition: "center bottom"` (or `"center top"`) chooses which part stays. Optional: `treatmentSlug` (the
   treatment file name) adds an “About this treatment” link, and `summary` adds two plain sentences.
   Keep it factual: no promises, no medical claims. At the moment the site shows only the image and
   the title; `period`, `concern`, `plan` and `summary` are kept in the file for the record.
4. Set `consent: true` once the client’s written permission is on file, and `placeholderImages: false`
   so the “Photograph to follow” note disappears.
5. `featured: true` shows it on the home page (the first three) and the treatments page (the first two).

Two separate photographs work too: use `before`, `beforeAlt`, `after` and `afterAlt` instead of `image`.

Before/after photographs are regulated by the DHA. If ever asked to take them down, set
`showBeforeAfters: false` under `results` in `src/site.config.ts` and every case disappears at once.

## Add the link to the book

In `src/site.config.ts`, under `book`, the Amazon link sits between the quotes of `url`. Replace it if the
shop link changes; if it is ever emptied, “Get the book” on the Consultancy page opens WhatsApp instead.

## Change the logo

The logo files are built from `src/assets/brand/logo-source.jpg`. To update the logo, replace that
file with the new version on a white background and run:

```bash
node scripts/brand-assets.mjs
```

This rebuilds the header lockup, the footer logo, the browser icons and the share image. If you have
the logo as an SVG or a transparent PNG, a developer can drop those in directly instead.

## Change the hero video

The moving background on the home page is two video files and a still image in `public/video/`:
`hero.mp4`, `hero.webm` and `hero-poster.jpg`. To change it, replace those three files with new ones
of the same names. Keep the video short (10 to 15 seconds), silent, 1280 pixels wide and under about
3 MB per file so the page stays fast. The still image is what people see first and what visitors who
prefer less motion see instead of the video.

## The consultancy page

The words on `/consultancy` live in `src/pages/consultancy.astro`: the two opening paragraphs, the list
called `areas` (each has a title and one line of text) and the three `steps`. Change them there. Every
WhatsApp button on that page starts the message with “consultancy” so you know where the enquiry came from.

## Courses and videos

The home page has a section called “Courses and videos”. It does two things: it lets people leave
their email to hear first when your course dates are set, and it shows one video.

- **Where the emails go.** Every sign-up lands in Netlify under Forms → `course-interest`, with the
  person’s email and first name. Netlify can email you each one (Forms → Notifications) and you can
  download the whole list as a spreadsheet at any time. Nobody is emailed automatically; you write to
  them when you have news.
- **Put your YouTube video in.** In `src/site.config.ts`, under `youtube`, paste the video’s ID into
  `featuredVideoId`. The ID is the part after `v=` in a YouTube link, for example `dQw4w9WgXcQ`. Put
  your channel link in `channelUrl` and a “Watch on YouTube” link appears under the video. Until an
  ID is set, the slot plays the same stock clip as the top of the home page.
- **Change the caption** in `youtube.caption`.
- **Change the words** about the courses in `src/pages/index.astro`, in the “Courses and videos”
  section. They currently say you are preparing courses, with no dates, because none are confirmed.
- **Hide the whole section** by setting `showSection: false` under `courses` in `src/site.config.ts`.

## Going live

1. Set `url` in `src/site.config.ts` to your real domain, with `https://` and no trailing slash.
2. Work through `CONTENT-TODO.md` until every line is done. The sample labels are already switched
   off, so anything still unconfirmed reads as real content on the site.

## How changes reach the website

The files live on GitHub. When a change is saved there, Netlify rebuilds the site in about a
minute and publishes it. You can edit files directly on the GitHub website: open the file, click
the pencil, make the change, and click “Commit changes”.

For developers: `npm install`, then `npm run dev` for a local preview at `http://localhost:4321`,
`npm run build` to build, `npm run check` to type-check. See `CLAUDE.md` for conventions.
