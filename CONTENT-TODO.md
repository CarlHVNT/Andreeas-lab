# Content to confirm before launch

Everything below started as sample content for the design review and has not yet been confirmed by
Andreea. **On 15 September 2026 the visible “sample” notices were switched off at Carl’s request**
(`contentStatus` is `"live"`, testimonials no longer carry a “Sample quote” label, price and
contraindication notes no longer say “sample”, the legal pages no longer open with a review
warning). That means unconfirmed items now read as real content on the site, so this list is the
only record of what still needs checking. Work through it before the site goes public.

**Before launch, the licence holder at the host clinic should review all copy** for compliance
with DHA advertising rules: testimonials about outcomes, any before/after photographs, promotional
pricing, and any wording that could read as a medical claim.

## Blockers (the site does not work without these)

- [x] **WhatsApp number.** Set to +971 56 168 0342 on 15 September 2026 (`contact.whatsappNumber`,
      `contact.whatsappDisplay`). Every button uses it. Send one test message from the live site.
- [ ] **Domain.** `src/site.config.ts` → `url`. Currently `https://andreeaslab.example`. Drives canonical
      URLs, the sitemap, robots.txt and share images.
- [ ] **Licence holder.** `location.hostClinic` is now empty because the real address is a residential
      tower, not a clinic. If Andreea works under another business’s licence, add its name here and
      in `footer.licenceLine`; the footer, home page, privacy policy and terms switch wording automatically.

## Andreea and credentials

- [ ] Full name: `practitioner.fullName` (currently “Andreea Popescu”, invented).
- [x] Professional title: “DHA Licensed Beauty Therapist”, from Andreea on 17 September 2026, set as
      “DHA-licensed beauty therapist” in `practitioner.title` (home “Licensed and certified” fact, About
      “Qualification” row, structured data).
- [x] Training and qualifications, from Andreea on 17 September 2026: ITEC Level 3 (UK) and professional
      beauty therapy training at The Nordic International Beauty & Training Centre, UAE
      (`practitioner.credentials`), plus her specialisations (`practitioner.specialisations`).
- [ ] The Instagram bio also says “KHDA & MOH certified”. Andreea’s copy does not name them, so they are
      no longer shown. Ask whether to add them, and with what exact wording.
- [ ] Her specialisation texts (19 September 2026) mention acne care as a former acne patient, recovery
      after facial procedures or SMAS surgery “with appropriate medical clearance”, and Icoone Laser MED.
      Ask the licence holder to confirm the wording sits within the no-medical-claims rule before launch.
- [x] Years in the UAE: the “In the UAE, 10+ years” fact row was removed from the About and Qualifications
      pages on 19 September 2026 at Carl’s request, and the config field with it. Her own sentence “more than
      ten years” stays in her About copy.
- [ ] Year established: `established` (logo says “Est. 2019”).
- [x] Languages: English, Romanian and Spanish (`practitioner.languages`; Spanish added 19 September 2026
      at Carl’s request). Add Russian or Arabic if relevant.
- [x] About page intro (`src/pages/about.astro`): Andreea’s own copy, set exactly as she wrote it on
      19 September 2026 at Carl’s request, including the title-case subtitle “The Professional Behind
      Andreea’s Lab” (the one agreed exception to the sentence-case rule) and her dash. The same approach
      paragraph appears in the home “About me” band.
- [x] About “Where I trained”: Andreea’s own copy, 17 September 2026, with a facts list built from the
      `practitioner` block and a link to the qualifications page.
- [x] Home page (17 September 2026): the hero names her as a DHA-licensed beauty therapist and lists her
      specialisms in her words; the “About me” band carries her intro and approach paragraphs; the meta
      description follows. The unconfirmed “opened Andreea’s Lab in 2019” line is gone from the home page;
      `established` still shows in the footer.
- [x] About “Why choose Andreea” (was “Why Icoone”): Andreea’s own paragraph, set as written on
      19 September 2026. The sample “I chose Icoone because…” and “I do not offer injectables” copy is gone.
- [x] About “The Andreea’s Lab Method” (was “How I plan a programme”): Andreea’s own two paragraphs, set as
      written on 19 September 2026, with “Results with a plan.” as the statement line. The last sample copy
      on the About page is gone.
- [ ] Optional licence line for the footer: `footer.licenceLine`, e.g. “Treatments are provided under
      the licence of … , DHA licence no. …”. Confirm with the clinic whether it is required.

## Location and hours

**The address on the site is a demo address**, a generic Dubai Healthcare City location (Clinic 203,
Level 2, Ibn Sina Building 27, Block B) chosen so Andreea’s real premises are not published while the
site is a demo. Carl holds the real address. Before launch:

- [ ] **Real address** into `src/site.config.ts` → `location` (`unit`, `building`, `community`, `area`),
      written in UAE order: unit and floor, building, community, city. No postcode exists in the UAE.
- [ ] **Makani number** for the building entrance (ten digits, on the blue plate by the door):
      `location.makani`. Shows on the home page and the contact page once set (the footer address line is switched off).
- [ ] **Map pin and share link**: `location.geo` and `location.mapsUrl`, `location.mapsEmbedQuery`.
- [ ] **How to find the room**: `location.howToFind` (which entrance, lift, whether to call ahead).
- [ ] **Parking**: `location.parking` and `src/content/faqs/parking.md` currently say Andreea sends
      directions when you book. Replace with the real arrangement.
- [ ] Opening hours: `hours` (currently Tuesday to Saturday 10:00 to 19:00, Sunday and Monday closed).
- [ ] `src/content/faqs/where-are-you.md` repeats the address in prose; update it together.
- [ ] SEO phrases use `location.area` (“Dubai Healthcare City” in the demo); the body remodelling and
      lymphatic drainage files also name the area in their `seoTitle`/`seoDescription`.

## Treatments (`src/content/treatments/*.md`)

For each of the seven files, confirm or replace:

- [ ] `priceFrom` (all sample: 450 / 500 / 550 / 450 / 450 / 400 / 150 AED) and `priceNote`.
      Remove the words “Sample price for the layout review” once real.
- [ ] `duration` and `recommendedProgramme` (all sample).
- [ ] `contraindications` lists (all sample, generic). Replace with Andreea’s own list and set
      `contraindicationsConfirmed: true`. Also `src/content/faqs/who-should-not.md`.
- [ ] `whatHappens`, `forWhom` and the Markdown body (“Good to know”) are draft copy in her voice; check facts
      such as “disposable set provided”, “measured every few sessions”.
- [ ] The set of treatments itself. Instagram highlights show Lasers and Gut health: are other services
      part of this site, or is it Icoone only?
- [ ] Consultation: is it charged, and is it deducted from the first programme? (`consultation.md`)

## FAQs (`src/content/faqs/*.md`)

Files marked `needsConfirmation: true` show a “to be confirmed” note on the site:

- [ ] `who-should-not.md`, `after-surgery-when.md` (medical wording, needs Andreea and ideally the clinic)
- [ ] `cancellation-policy.md` and `payment-methods.md` (also `policies` in `site.config.ts` and the terms page)
- [ ] `where-are-you.md`, `parking.md`

## Testimonials (`src/content/testimonials/*.md`)

- [ ] **Three invented quotes are live on the site without a label** (`sample-01.md` to `sample-03.md`,
      initials and areas made up). Replace them with real quotes with written consent before launch,
      and delete the sample files. Check outcome wording against DHA testimonial rules.

## Photographs and video (`src/assets/photos/`, listed in `src/lib/photos.ts`; `public/video/`)

Eleven photographs are in place: four of Andreea and her room (bowl, tunic, clinic desk, performing
a facial treatment), five treatment and client images (sheet mask, red-light handpiece, forehead
handpiece, pink-glove consultation, face-mapping grid), and two still lifes (pink products, spa
collage). The home hero is a silent looping stock video (`public/video/hero.mp4` and `.webm`, 720p,
15 s, poster `hero-poster.jpg`). Still to do:

- [x] **New portrait.** Andreea’s white-tunic portrait, uploaded by Carl on 19 September 2026 as
      `src/assets/photos/andreea-tunic.jpeg`, fronts the About page, the contact page, the home “About me”
      band, the cellulite treatment page and one Instagram tile. To replace it again, upload a file with the
      same name and extension.
- [ ] **Licences.** The four newest photos and the hero video are Adobe Stock files, and the product
      still life and spa collage look like stock too. Keep the licence records, and check the Adobe
      Stock licence covers a commercial website for a client business.
- [ ] **Client consent.** Andreea’s own photos that show clients (the sheet mask, the client under
      the handpiece) need written consent for use on the website.
- [ ] **Icoone-specific photos.** None of the treatment images show the Icoone device, and the body
      treatment pages use facial or portrait photos. Real photos of Icoone body sessions would be
      better: set `heroImage` and `heroImagePosition` in each `src/content/treatments/*.md`, and
      consider replacing the hero video with footage of Andreea at work.
- [ ] `public/og-default.jpg` (1200×630) is still generated. Replace with a real share image
      (a crop of one of the photographs with the wordmark).
- [ ] Instagram grid tiles reuse the site photos. Swap for six actual posts when convenient
      (`instagramPhotos` in `src/lib/photos.ts`).
- [ ] The generator in `scripts/generate-placeholders.mjs` and `src/assets/placeholders/` are now
      only used for the share image and app icons. Delete once those are real.

## Courses and videos (`src/pages/index.astro`, `src/site.config.ts` → `courses`, `youtube`)

Added on 15 September 2026 at Andreea’s request: a section high on the home page that collects
email interest for her courses and holds one video. The WhatsApp group idea is parked for now.

- [ ] **Course wording.** The section says Andreea is “preparing short courses in Dubai on how she
      works … for anyone who wants to learn to do what she does”. Confirm what she will teach, for whom,
      roughly when, and whether to name a price or format. Nothing is promised on the page yet.
- [ ] **YouTube channel and video.** `youtube.channelUrl` and `youtube.featuredVideoId` are empty. Until
      an ID is set the slot plays the stand-in stock clip (the hero footage) behind a photo of Andreea.
      Replace with her channel and a real video, and rewrite `youtube.caption`.
- [ ] **Form notifications.** In Netlify, turn on email notifications for the `course-interest` form and
      decide who receives them. The form stores email and first name only.
- [ ] **Privacy wording.** The privacy policy now describes the course interest form. Have the adviser
      check the sentence on removal (“reply to the email”) once Andreea knows how she will send updates.
- [ ] **Later, if the list grows:** move to a proper mailing tool. Netlify Forms stores the list; it does
      not send campaigns.

## Consultancy (`/consultancy`, copy in `src/pages/consultancy.astro`)

Added on 19 September 2026 at Carl’s request, without copy from Andreea. Everything on the page is a
draft in her voice built from facts already confirmed (her specialisations, her method, her studio, her
years in the UAE). Before launch, Andreea should confirm or rewrite:

- [ ] **Who it is for.** The draft says professionals and businesses in beauty and aesthetics: people
      starting out, salons and clinics adding treatments or technology, and anyone wanting a second opinion.
- [ ] **What it covers.** Five draft areas: treatment planning and programmes; facial and body technique;
      working with technology such as Icoone; talking to clients; starting out in Dubai. Remove any she does
      not offer. “Starting out in Dubai” must stay practical, not licensing or legal advice.
- [ ] **Format and pricing.** The draft promises a written proposal covering scope, duration, place and
      cost, and says nothing about rates or whether sessions are in person or online. Confirm.
- [ ] **The three steps** (message, first conversation, written proposal) and the link to the courses
      section on the home page.
- [ ] **Photograph.** The header uses the clinic desk photo. Replace if she prefers another.

## Logo and icons

- [x] The real logotype is in place (16 September 2026): header lockup, footer, favicons and share image,
      all built by `scripts/brand-assets.mjs` from `src/assets/brand/logo-source.jpg`.
- [ ] Ask Andreea for the logo as a vector (SVG, AI or PDF) or a large transparent PNG. The current
      source is a 1021 px JPEG, which is fine for the header but soft if the logo is ever shown large.

## Specialisations & qualifications (`/qualifications`, data in `site.config.ts` → `practitioner`)

- [x] Qualifications page introduction: Andreea’s own two paragraphs, set as written on 19 September 2026,
      in place of the draft “I do a small number of things…”.
- [x] `qualifications`: Andreea’s full list, in her words (19 September 2026): DHA Professional Licence;
      ITEC Level 3 Diploma in Facial Electrical Treatments (Merit, ITEC / VTCT, Ofqual regulated); Level 1–3
      Beauty Therapy Training, 800 hours (The Nordic International Beauty & Training Centre, KHDA attested);
      Sculptural Face Lifting™ Practising Licence; Icoone Laser MED Practitioner Training. Years still to add.
- [ ] Still not mentioned by Andreea: the Instagram bio’s “MOH certified”. Ask before adding it.
- [ ] The qualifications page no longer says “Certificates are available to see in the room”. Ask whether
      that is true and wanted.
- [x] `additionalTraining` (was `continuingEducation`): Andreea’s list of 19 September 2026, shown as one
      line: Hydrafacial Syndeo · Facial skincare · Chemical peels · Microneedling (Morpheus) · BBL/IPL
      training · Alma Academy training. Her text read “BBL/IPL trading”, set as “training”; confirm.
- [x] Specialisations (19 September 2026): five drop-down rows in Andreea’s words, each with her
      paragraph, from `practitioner.specialisations`: acne & oily skin, advanced facial treatments, facial
      sculpting & lymphatic drainage, facial EMS, body lymphatic drainage & Icoone Medical. No links out of
      the list; each row carries a tick.
- [ ] Acne & oily skin, advanced facial treatments, facial sculpting and facial EMS have no treatment page
      yet. Ask Andreea whether they are bookable services to add to Treatments, with duration and price.

## Before-and-after case studies (`src/content/case-studies/*.md`)

- [ ] **Three sample cases with placeholder photographs.** The text describes a plausible plan and
      says notes will follow; the images are labelled placeholders and each card says “Photographs to
      follow with the client’s consent.” Replace with real cases: real photographs, `consent: true`,
      `placeholderImages: false`, and Andreea’s own notes in the Markdown body.
- [ ] **DHA.** Before/after photographs in healthcare advertising need the client’s written consent and
      may need approval. Confirm with the licence holder before any real photograph goes live.
      `results.showBeforeAfters` in `site.config.ts` hides every case if needed.

## Legal (`src/pages/privacy.astro`, `src/pages/terms.astro`)

- [ ] Both pages are drafts and say so in their first paragraph. Review by a UAE-qualified adviser and
      the clinic’s licence holder, then remove the “Sample text for review” paragraphs.
- [ ] Confirm the data retention statements, whether Netlify Forms is acceptable for the clinic,
      and the contact email.
- [ ] Confirm the VAT position on displayed prices (the terms currently say prices are indicative).

## Compliance decisions

- [ ] Before/after photographs: keep `results.showBeforeAfters` false until DHA approval is confirmed.
- [ ] Sample notice: set `contentStatus` to `"live"` only when this list is done.

## Setup (Carl)

- [ ] Netlify: connect the GitHub repo, set the custom domain, enable form notifications for the
      `consultation` and `course-interest` forms (email or WhatsApp-compatible integration), and turn on
      spam filtering.
- [ ] Analytics IDs when she is ready: `analytics.plausibleDomain`, `ga4MeasurementId`, `metaPixelId`.
      GA4 and Meta Pixel set cookies; decide on a consent notice first.
- [ ] Google Business Profile with the same name, address and hours as `site.config.ts`.
- [ ] Framework note: the brief pinned Astro 5. Astro 7 is current; plan an upgrade after launch.

## Removed after the first build (self-critique)

- **The WhatsApp text link in the phone header.** On the first screen it made three green items
  (header link, hero button, “See treatments” link) against a plan of one green action per screen,
  and it duplicated the sticky bar, which already keeps WhatsApp one tap away on every page. The phone
  header is now just the wordmark and the menu. Desktop keeps its header button because there is no bar.
- The hover translate on treatment-row arrows. Nothing animates except the hero, and the movement
  added nothing the colour change did not already say.
