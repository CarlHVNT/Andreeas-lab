# Content to confirm before launch

Everything below is sample content used for the design and layout review. Nothing here has been
confirmed by Andreea. Each item says where to change it. When the list is empty, set
`contentStatus` to `"live"` in `src/site.config.ts`.

**Before launch, the licence holder at the host clinic should review all copy** for compliance
with DHA advertising rules: testimonials about outcomes, any before/after photographs, promotional
pricing, and any wording that could read as a medical claim.

## Blockers (the site does not work without these)

- [ ] **WhatsApp number.** `src/site.config.ts` → `contact.whatsappNumber` (international format, no
      spaces) and `contact.whatsappDisplay`. Currently a dummy `+971500000000`. Every button uses it.
- [ ] **Domain.** `src/site.config.ts` → `url`. Currently `https://andreeaslab.example`. Drives canonical
      URLs, the sitemap, robots.txt and share images.
- [ ] **Host clinic name.** `location.hostClinic` (currently “Sample Clinic”), `location.hostClinicUrl`.
      Also appears in the footer, the privacy policy and the terms.

## Andreea and credentials

- [ ] Full name: `practitioner.fullName` (currently “Andreea Popescu”, invented).
- [ ] Exact professional title as it appears on her licence: `practitioner.title`.
- [ ] Certifications and what each covers: `practitioner.credentials`. The Instagram bio says
      “DHA & KHDA & MOH & UK certified”; confirm wording and whether any are licences rather than certificates.
- [ ] Years in Dubai: `practitioner.yearsInDubai` (bio says “10+”).
- [ ] Year established: `established` (logo says “Est. 2019”).
- [ ] Languages: `practitioner.languages` (English, Romanian assumed; add Russian/Arabic if relevant).
- [ ] About page (`src/pages/about.astro`): “trained in the United Kingdom and Romania”, “I go to the
      dermatology and aesthetics conferences in Dubai”, “thirty-minute consultation”, “measure again every
      few sessions”, “I do not offer injectables”. All sample first-person copy to be rewritten with her facts.
- [ ] Optional licence line for the footer: `footer.licenceLine`, e.g. “Treatments are provided under
      the licence of … , DHA licence no. …”. Confirm with the clinic whether it is required.

## Location and hours

- [ ] Street address and area: `location.streetAddress` (currently “Villa 000, Al Wasl Road”), `location.area`
      (“Jumeirah 1” assumed from the brief’s example). The area also appears in SEO titles for body remodelling.
- [ ] Room name and how to find it: `location.roomName`, `location.howToFind`.
- [ ] Parking: `location.parking` and `src/content/faqs/parking.md`.
- [ ] Google Maps share link: `location.mapsUrl`. Map search query: `location.mapsEmbedQuery`.
- [ ] Coordinates for structured data: `location.geo` (approximate Jumeirah 1 at the moment).
- [ ] Opening hours: `hours` (currently Tuesday to Saturday 10:00 to 19:00, Sunday and Monday closed).
- [ ] `src/content/faqs/where-are-you.md` repeats the address in prose; update together.

## Treatments (`src/content/treatments/*.md`)

For each of the seven files, confirm or replace:

- [ ] `priceFrom` (all sample: 450 / 500 / 550 / 450 / 450 / 400 / 150 AED) and `priceNote`.
      Remove the words “Sample price for the layout review” once real.
- [ ] `duration` and `recommendedCourse` (all sample).
- [ ] `contraindications` lists (all sample, generic). Replace with Andreea’s own list and set
      `contraindicationsConfirmed: true`. Also `src/content/faqs/who-should-not.md`.
- [ ] `whatHappens`, `forWhom` and the Markdown body (“Good to know”) are draft copy in her voice; check facts
      such as “disposable set provided”, “measured every few sessions”.
- [ ] The set of treatments itself. Instagram highlights show Lasers and Gut health: are other services
      part of this site, or is it Icoone only?
- [ ] Consultation: is it charged, and is it deducted from the first course? (`consultation.md`)

## FAQs (`src/content/faqs/*.md`)

Files marked `needsConfirmation: true` show a “to be confirmed” note on the site:

- [ ] `who-should-not.md`, `after-surgery-when.md` (medical wording, needs Andreea and ideally the clinic)
- [ ] `cancellation-policy.md` and `payment-methods.md` (also `policies` in `site.config.ts` and the terms page)
- [ ] `where-are-you.md`, `parking.md`

## Testimonials (`src/content/testimonials/*.md`)

- [ ] Three sample quotes with invented initials and areas. Replace with real quotes, with written consent,
      and set `placeholder: false`. Delete the samples. Check outcome wording against DHA testimonial rules.

## Photographs (`src/assets/placeholders/`)

All images are generated abstract placeholders with a “Placeholder” caption baked in. Replace and
update each alt text (search the code for “Placeholder for”):

- [ ] `hero.jpg` (4:5) – the most characteristic image: her hands at work, skin, the rollers
- [ ] `portrait.jpg` (3:4) – one good portrait of Andreea
- [ ] `room.jpg` (4:3) – the treatment room
- [ ] `treatment-*.jpg` (4:5) – one per treatment, seven files
- [ ] `instagram-1.jpg` to `instagram-6.jpg` (1:1) – six curated posts for the static grid on the About page
- [ ] `public/og-default.jpg` (1200×630) – the image shown when the site is shared

## Logo and icons

- [ ] Her real mark and script wordmark as SVG. Replace the inline mark in `src/components/Logo.astro`,
      `public/favicon.svg`, then regenerate `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
      (or run `npm run placeholders` after editing the favicon) and rebuild `og-default.jpg`.
- [ ] Decide whether the header shows the script wordmark or the typeset name (typeset is recommended
      for legibility at small sizes; the mark can sit beside it).

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
      `consultation` form (email or WhatsApp-compatible integration), and turn on spam filtering.
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
