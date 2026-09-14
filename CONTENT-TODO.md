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

**The address on the site is a demo address**, a generic Dubai Healthcare City location (Clinic 203,
Level 2, Ibn Sina Building 27, Block B) chosen so Andreea’s real premises are not published while the
site is a demo. Carl holds the real address. Before launch:

- [ ] **Real address** into `src/site.config.ts` → `location` (`unit`, `building`, `community`, `area`),
      written in UAE order: unit and floor, building, community, city. No postcode exists in the UAE.
- [ ] **Makani number** for the building entrance (ten digits, on the blue plate by the door):
      `location.makani`. Shows in the footer, on the home page and on the contact page once set.
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

- [ ] **Three invented quotes are live on the site without a label** (`sample-01.md` to `sample-03.md`,
      initials and areas made up). Replace them with real quotes with written consent before launch,
      and delete the sample files. Check outcome wording against DHA testimonial rules.

## Photographs and video (`src/assets/photos/`, listed in `src/lib/photos.ts`; `public/video/`)

Eleven photographs are in place: four of Andreea and her room (bowl, tunic, clinic desk, performing
a facial treatment), five treatment and client images (sheet mask, red-light handpiece, forehead
handpiece, pink-glove consultation, face-mapping grid), and two still lifes (pink products, spa
collage). The home hero is a silent looping stock video (`public/video/hero.mp4` and `.webm`, 720p,
15 s, poster `hero-poster.jpg`). Still to do:

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
