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

**The address is not published** (Carl, 19 September 2026). The contact page and the home page give WhatsApp
and email and say “Based in Dubai, UAE”; the request form, the map, the hours and the “Where to find me”
section are gone, and the structured data carries city and country only. `SITE.location` still holds the
demo Dubai Healthcare City address from the layout review, which now only feeds `location.area` in copy
(the treatments page description, the About page room caption, the privacy page) and `hours` feeds the
opening-hours structured data.

- [x] The demo building and area no longer appear in copy: the treatments page description, the About page room
      caption and the privacy page now say Dubai only (19 September 2026). `location.area` is unused in copy.
- [ ] Opening hours: `hours` (currently Tuesday to Saturday 10:00 to 19:00, Sunday and Monday closed) are
      now only in the structured data. Confirm them or remove them from `businessJsonLd`.
- [ ] Google Business Profile: the site no longer shows an address, so match the profile to what Andreea
      wants public.

## Treatments (`src/content/treatments/*.md`)

Replaced on 19 September 2026 with Andreea’s seven Signature Facials, in her words: name, one line,
duration and price for each (Christina BioPhyto Acne Starter Facial; BioRePeel — Face, Neck & Hands;
Microneedling Skin Renewal; Post-SMAS Lymphatic Facial; Facial Sculpting & Lift Massage; Facial
Sculpting + EMS; EMS Express + Premium Serum). The seven sample Icoone entries, including the
consultation with its sample price, are gone; “Book a consultation” on the treatments page opens
WhatsApp.

- [ ] Per treatment, still to come from Andreea: who it is for, what a session is like, any programme
      guidance, contraindications and related FAQs. Each section appears only once its field is filled.
- [x] **Photographs.** Carl uploaded a photo for each of the seven treatments on 19 September 2026
      (`src/assets/photos/christina-biophyto.jpg` and the others named after their treatment); the black bars
      were trimmed off the BioPhyto image. Alt text and focal points are set for each (the thumbnail and the page hero crop to 4:5); if Andreea
      sends better or her own photos later, upload over the same file name.
- [ ] Body treatments: “Body lymphatic drainage & Icoone Medical” is a specialisation, but no body treatment
      is listed. Ask whether a body list follows, with the same facts.
- [x] The hero, the site description, the treatments page description and the FAQ no longer describe Icoone
      body programmes (19 September 2026); the home page mirrors the treatments, consultancy, FAQ and contact pages.
- [ ] Prices are shown per treatment in AED as given; confirm the VAT position.
- [ ] “How it works” on the treatments page is Andreea’s copy (19 September 2026) except step 4, Follow-up,
      which is drafted in her voice: confirm the wording with her. In step 3 her “a course of sessions” is set
      as “a series of sessions”, because “course” means a teaching course on this site.

## FAQs (`src/content/faqs/*.md`, groups in `src/lib/faq-groups.ts`)

Rebuilt on 19 September 2026 at Carl’s request into two groups: “For clients” and “For beauty professionals”
(titles suggested by Claude, easy to change in `faq-groups.ts`). The twelve draft questions about Icoone,
the visit and the policies are gone; Andreea’s five questions for clients are in, verbatim. The home page
shows the first four.

- [x] **For beauty professionals**: Andreea’s four questions (institutes, products, steam or gel, buying
      devices for a salon) are in, verbatim, 19 September 2026.
- [ ] The practical answers that were on the FAQ page (where the studio is, parking, what to wear, cancellation,
      payment) are no longer anywhere but the contact and terms pages. Decide whether any should return, in
      Andreea’s words.

## Testimonials (`src/content/testimonials/*.md`)

Not shown anywhere since 19 September 2026: Carl asked for the “In their words” section to come off the
Before & after page, and no other page uses the collection. The three sample files stay in the collection
(`placeholder: true`) and `Quote.astro` stays, ready if real testimonials are wanted later.

- [ ] Decide whether client testimonials return (which page, and real quotes with permission). If not,
      delete `src/content/testimonials/`, `Quote.astro` and `getTestimonials` in `src/lib/content.ts`.

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
- [ ] `scripts/generate-placeholders.mjs` now only makes the labelled stand-ins in `src/assets/results/`
      for cases whose photograph has not arrived. Delete it once every case has a real photograph.

## Podcast (`src/components/PodcastSection.astro`, `src/site.config.ts` → `podcast`, `youtube`)

The “Courses and videos” section became the podcast section on 19 September 2026 at Carl’s request, and later
that day took its name, description, button and artwork from him: “Beyond Beauty: Skin, Wellness & Longevity”,
on https://www.youtube.com/@AndreeasLab. The same section sits on the home page and the contact page. The course
interest form and its thank-you page are gone.

- [ ] **Featured episode.** `youtube.featuredVideoId` is empty, so the play button on the artwork opens the
      channel. Paste an episode ID and that episode plays in place instead.
- [ ] **Email interest** for courses is no longer collected anywhere. If Andreea still wants a list, decide where and how.

## Consultancy (`src/pages/consultancy.astro`, `src/site.config.ts` → `book`)

Restructured on 19 September 2026 to Andreea’s copy via Carl: her book “How to Become a Beauty Therapist in
Dubai” (June 2026) opens the page, then “Need more personal guidance?” with three rows in her words (Starting
your career, Already working in beauty, Starting a beauty business), then the closing band “Every situation is
different.” whose secondary link reads “Contact Andreea” and goes to the contact page.

- [x] **Book link.** `book.url` is the Amazon link Carl confirmed on 19 September (`/dp/B0G6MWNVDZ`).
- [x] The book cover (Carl, 19 September) replaces the clinic photograph in the page header
      (`src/assets/photos/book-cover.webp`, `photos.bookCover`).

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
- [x] `additionalTraining`: Andreea’s list of 19 September 2026, now the last row of “Qualifications &
      certifications”: Hydrafacial Syndeo · Facial skincare · Chemical peels · Microneedling (Morpheus) ·
      BBL/IPL training · Alma Academy training. Her text read “BBL/IPL trading”, set as “training”; confirm.
- [x] `continuingEducation`: Andreea’s own copy of 19 September 2026, three paragraphs and three rows
      (industry events including Dubai Derma, ongoing learning, technology training). Replaces the earlier
      placeholder lines and confirms the Dubai Derma attendance that had been removed as unverified.
- [x] Specialisations (19 September 2026): five drop-down rows in Andreea’s words, each with her
      paragraph, from `practitioner.specialisations`: acne & oily skin, advanced facial treatments, facial
      sculpting & lymphatic drainage, facial EMS, body lymphatic drainage & Icoone Medical. No links out of
      the list; each row carries a tick.
- [ ] Acne & oily skin, advanced facial treatments, facial sculpting and facial EMS have no treatment page
      yet. Ask Andreea whether they are bookable services to add to Treatments, with duration and price.

## Qualifications page photo (`src/assets/photos/certificates.jpg`)

- [ ] **Upload the certificates photo** (the flat lay with the roses) over `src/assets/photos/certificates.jpg`
      on GitHub; until then the qualifications header shows a copy of the clinic photo under the certificates’
      alt text (Carl sent the picture inline on 19 September 2026, so it did not arrive as a file).

## Before-and-after case studies (`src/content/case-studies/*.md`)

Rebuilt on 19 September 2026 at Carl’s request into two groups, Facial treatments and Facial massage
(`src/lib/case-groups.ts`). The three sample Icoone cases are gone. Every case is one composite image as
Andreea published it (before and after within the one image), in `src/assets/results/`.

Facial treatments, photographs in place, titled as Andreea named them (19 September): Melasma; Comedonal
acne (April to October 2025); Acne vulgaris (July to November 2025, linked to the BioRePeel treatment). Dates
are kept in the files but not shown. The plans are transcribed from her
notes on the images; spelling on the images (“Chimical”, “suppliments”) is corrected in the transcription.

Facial massage, photographs in place: Around the eyes (`massage-eyes.jpg`), Full face (`massage-face.jpg`),
Face and neck (`massage-face-neck.jpg`).

- [x] The three facial-massage images are in (Carl, 19 September 2026); the stand-ins are gone.
- [ ] **Massage cases have no facts yet.** For the record, ask Andreea for each: the dates, the treatment,
      what the client came in with and the number of sessions. Only the title shows on the site. Confirm which photograph is before and which is after on the two
      unlabelled images (the alt text assumes before above, or on the left).
- [ ] **Consent.** Andreea published these cases on Instagram, so they are live at Carl’s request, but
      `consent: false` records that written consent is not yet confirmed on file. Confirm each and set
      `consent: true`. DHA advertising rules apply to before/after photographs; `results.showBeforeAfters`
      in `site.config.ts` hides every case at once if needed.
- [ ] **Melasma case:** the treatments, number of sessions and dates are not on the image. Ask Andreea.
- [ ] The composite images carry Andreea’s Instagram styling (handwritten notes on two, red “After”
      lettering on the face-and-neck image; the melasma title bar is cropped away by the square frame).
      Separate before and after photographs would sit better in the site’s palette; the card supports
      `before`/`after` pairs.
- [ ] When the massage photographs arrive, check the square crops (`imagePosition`: eyes centre, full face
      top, face and neck bottom) keep the eyes, the faces and the labels in view.

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

- [ ] Netlify: connect the GitHub repo and set the custom domain. No forms are in use.
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
