# Andreea’s Lab website – project conventions

Marketing site for Andreea’s Lab, a one-practitioner Icoone studio in Dubai. Almost all traffic
arrives from Instagram on a phone. The site’s one job is to start a WhatsApp conversation.

## Stack

- Astro 5 (pinned per the brief; Astro 7 is current, upgrade is a separate task), static output
- Tailwind CSS v4 via `@tailwindcss/vite`, CSS-first config in `src/styles/global.css`
- TypeScript strict, path alias `@/` → `src/`
- Content collections (Astro content layer, `glob` loader) in `src/content/`
- Fonts self-hosted from `@fontsource-variable/*`, preloaded in `BaseLayout.astro`
- Netlify hosting (`netlify.toml`). No forms at the moment: the consultation and course forms came off on 19 Sep 2026
- No client framework, no CMS, no database. Two tiny inline scripts (sticky bar, click-to-load video)

## Commands

```bash
npm run dev          # dev server
npm run build        # production build to dist/
npm run preview      # serve dist/
npm run check        # astro check (types)
npm run placeholders # regenerate placeholder artwork and icons (scripts/generate-placeholders.mjs)
```

## Where things live

| What | Where |
|---|---|
| Brand, contact, WhatsApp message, hours, location, policies, analytics IDs, flags | `src/site.config.ts` |
| Treatments, FAQs, testimonials, before/after case studies (Markdown + typed frontmatter) | `src/content/treatments`, `faqs`, `testimonials`, `case-studies`; schemas in `src/content.config.ts` |
| Qualifications, additional training, continuing education, specialisations (title, paragraph) | `site.config.ts` → `practitioner`; rows rendered by `SpecialisationList.astro` as drop-downs, no links out |
| Design tokens (colours, type scale, radius, easing) | `src/styles/global.css` `@theme` block, documented in `DESIGN.md` |
| Page shell, fonts, metadata, JSON-LD, header, footer, sticky bar | `src/layouts/BaseLayout.astro` |
| Legal/prose pages | `src/layouts/ProsePage.astro` |
| Interface strings and locale helpers | `src/i18n/ui.ts` |
| Consultancy guidance copy (her three rows) and the FAQ / case-study groups | `src/lib/consultancy.ts`, `src/lib/faq-groups.ts`, `src/lib/case-groups.ts` |
| WhatsApp link builder | `src/lib/whatsapp.ts` |
| Collection queries and slug helpers | `src/lib/content.ts` |
| Structured data builders | `src/lib/seo.ts` |
| Photographs, with alt text and focal points | `src/assets/photos/`, registry in `src/lib/photos.ts` |
| Before-and-after images, one composite per case as Andreea publishes them; labelled stand-ins until hers arrive | `src/assets/results/`; stand-ins from `scripts/generate-placeholders.mjs`, which never overwrites an existing file |
| Content gaps to fill before launch | `CONTENT-TODO.md` |
| Non-developer guide for Andreea | `README.md` |

## Design rules (see DESIGN.md for the full plan)

- **Voice and facts.** Serif (`font-serif`, `.voice`) for what Andreea says: headlines, prose, quotes.
  Sans (`font-sans`, `.facts`) for what the lab records: lists, prices, hours, forms, buttons.
- **Blush, burgundy, ivory.** Tokens: `ivory` (ground), `linen`/`linen-deep` (hairlines, fields),
  `ink` (deep burgundy text), `muted` (secondary text), `wine`/`wine-deep` (the single action colour:
  buttons, links, focus, icons), `blush` (the pale band, `Section tone="blush"`, icon discs), `rose`
  (ornament shape, one orb). The logo is the only object outside this palette.
- **Only the palette.** The default Tailwind palette is removed in `@theme`. Do not add colours.
- **Logo assets** come from `scripts/brand-assets.mjs` (source `src/assets/brand/logo-source.jpg`):
  header lockup, footer stacked logo, favicons, share image. Replace the PNGs directly if a vector
  logo arrives.
- **Left aligned, one edge.** No centred text. Sections use `Section.astro` (5/7 split at `md`).
- **Rows, not cards.** Hairlines (`border-stone`, `divide-stone`) structure lists. No shadows and no
  `rounded-*` beyond `rounded-ui` on buttons and inputs and the discs behind icons and step numbers.
- **The arch is the signature shape.** `.arch` on 4:5 hero and portrait figures only. Galleries,
  thumbnails and the About room photo stay square. Photos come from `src/lib/photos.ts`, each with
  an `object-position` focal point; never crop a face out.
- **Ornament is small and repeats one language.** `Mark` above section titles, `LineIcon` in mist
  discs for the four “Why Andreea” facts, porcelain discs for step numbers, the `.quote-mark`, and the
  `.orb` gradients behind the hero and `CtaBand`. Do not add new decorative motifs; reuse these.
- **One `ImageBand` per site**, on the home page. Galleries are `Gallery` (squares) or `PhotoPair`
  (arch plus square).
- **Sentence case everywhere.** No all-caps labels, no eyebrows, no italic single words in headlines.
- **Numbering only for real sequences.** Currently only “How it works” on the treatments page.
- **One motion moment.** The hero `.reveal` / `.reveal-late`. Nothing else animates. Reduced motion respected.
- **Buttons say what happens.** “Message Andreea on WhatsApp”, “Send request”, “Load the map”.
- **Every WhatsApp button carries context.** Pass `treatment` on treatment pages; the layout
  forwards it to the header button and sticky bar via the `treatment` prop of `BaseLayout`.
- **Every page ends with `CtaBand`** except the contact page and the home page, whose Contact section is
  the closing call to action (Carl, 19 Sep 2026). Its secondary link emails Andreea unless a page
  passes `contactLinkLabel`/`contactLinkHref`.
- **Contact details are WhatsApp and email only.** The address is not published: the contact page and the home
  page say “Based in Dubai, UAE” (Carl, 19 Sep 2026). No request form, map or hours on the pages; the
  structured data carries city and country only. `SITE.location` still feeds `location.area` in copy.
- **Site structure (Andreea’s brief, 16 Sep 2026, Consultancy added 19 Sep):** About me,
  Specialisations & qualifications, Treatments with before/after case studies, Consultancy, FAQ,
  Contact. Home is the landing page and mirrors that order. `/results` redirects to `/case-studies`.
  Header nav labels: About me, Qualifications, Treatments, Consultancy, FAQ, Contact; the footer adds
  Before & after. `/consultancy` opens with Andreea’s book (`SITE.book`; “Get the book” opens WhatsApp
  until `book.url` is set), then three guidance rows in her words, then the closing band whose secondary link
  reads “Contact Andreea”. Its WhatsApp buttons carry the topic “consultancy”.
- **Case studies** use `CaseStudyCard` and sit in two groups on `/case-studies`, Facial treatments and
  Facial massage (`src/lib/case-groups.ts`, `group` field; an empty group says photographs will follow).
  Andreea publishes each case as one composite image, before left, after right, her notes written on it:
  `image` in `src/assets/results/`, shown in a square frame so a row lines up (three across), cropped to
  the case’s `imagePosition` focal point so labels and the treated area stay in view. `before`/`after`
  pairs are also supported. Under the image the card shows only the title; `period`, `treatmentSlug`, `concern`,
  `plan` and `summary` stay in the files for the record but are not shown (Carl, 19 Sep 2026). `consent` records that written consent is on file; `SITE.results.showBeforeAfters`
  hides every case at once if DHA approval is withdrawn. While `placeholderImages: true` the card says
  the photograph will follow and prefixes the alt text with “Placeholder for”.
- **Bands, not one long scroll.** Sections alternate between the ivory page and a tinted band:
  `Section tone="white"` is the quiet band, `tone="blush"` the accent band. Never two sections of the
  same tint in a row, at most one blush band per page. Bands carry spacing on both sides (`.band` in
  `global.css`); two bands in a row sit flush. Hand-built sections use `class="band bg-white"` the same way.
- **“Programme”, not “course”, for treatments.** A planned series of sessions is a programme
  (`recommendedProgramme`, “Programme and pricing”, “planned as a programme”). Nothing on the site is called
  a course any more (the courses section became the Podcast section on 19 Sep 2026); if teaching courses
  return, they alone take the word.
- **Copy leads with Andreea.** Icoone is named as her method, not as the brand. The site’s second, quieter
  jobs are her book and consultancy (`/consultancy`) and her podcast on YouTube (`SITE.podcast`, `SITE.youtube`;
  `VideoEmbed` shows a photograph until the reader presses play and embeds through youtube-nocookie once
  `youtube.featuredVideoId` is set). Secondary actions use `.btn-quiet` so WhatsApp stays the only solid
  burgundy button.

## Content rules

- Do not invent prices, credentials, medical claims, contraindications or testimonials.
  Sample values used for the layout review are marked (`PLACEHOLDER` comments in config,
  `placeholder: true` on testimonials, `contraindicationsConfirmed: false`, `needsConfirmation: true`,
  “Sample price” notes) and listed in `CONTENT-TODO.md`.
- `SITE.contentStatus` is `"live"` (the footer sample notice was switched off on 15 Sep 2026 at
  Carl’s request), so unconfirmed content is not labelled on the site. `CONTENT-TODO.md` is the
  record of what is still unverified; keep it current.
- The home hero is a background video (`HeroVideo.astro`, files in `public/video/`). The poster
  `<img>` is the LCP element; sources attach after `load`, never under reduced motion or Save-Data.
  Keep the files at 720p, silent, under ~3 MB each.
- Treatments are Andreea’s Signature Facials (19 Sep 2026): the content files carry only what she has
  given (name, one line, duration, price). Treatment rows on the home and treatments pages show the title
  only; the one line, duration and price appear on the treatment’s own page (Carl, 19 Sep 2026).
  A treatment page shows a section only when its field is filled:
  who it’s for, what a session is like, the recommended programme, contraindications and FAQs are optional.
  Do not draft those sections; ask for her facts. On the treatments page, Before and after precedes How it works.
- Never claim to treat or cure a condition. Describe what the treatment does and who it suits.
  Medical suitability is decided at the consultation.
- Before/after photos are live at Carl’s request (19 Sep 2026). `SITE.results.showBeforeAfters` hides them
  all at once if DHA approval is withdrawn; written consent per case is tracked in `CONTENT-TODO.md`.
- Placeholder images must stay clearly labelled. Alt text starts with “Placeholder for …”.

## URLs, SEO and structured data

- `trailingSlash: "never"`, `build.format: "file"`. Canonical URLs have no trailing slash; the home
  canonical is `SITE.url + "/"`. Netlify serves `/about` from `about.html`.
- `SEO.astro` sets title, description, canonical, Open Graph and Twitter tags. Titles get the
  `SITE.seo.titleSuffix` unless they already contain the brand name.
- `HealthAndBeautyBusiness` JSON-LD on every page (`BaseLayout`), `Service` on treatment pages,
  `FAQPage` on `/faq`. Builders in `src/lib/seo.ts`.
- The FAQ page has two groups, For clients and For beauty professionals (`src/lib/faq-groups.ts`, `group`
  field on each question); an empty group says questions will follow. Questions are Andreea’s words.
- `robots.txt` is generated from `SITE.url` (`src/pages/robots.txt.ts`). Sitemap via `@astrojs/sitemap`.
- `/404` is `noindex` and excluded from the sitemap.

## Adding a language (ru, ar)

1. Add the locale to `activeLocales` in `src/i18n/ui.ts` and fill in its strings.
2. Create pages under `src/pages/ru/` (or `ar/`) that import the same components and pass
   translated content. Arabic renders right-to-left automatically via `textDirection()`.
3. Translated Markdown content: add files under `src/content/<collection>/<locale>/` and filter
   by `entry.id.startsWith("<locale>/")` in `src/lib/content.ts`.
4. `SEO.astro` emits `hreflang` alternates automatically once more than one locale is active.

## Quality floor

- `npm run build` and `npm run check` must pass.
- Lighthouse mobile targets: Performance ≥ 95, Accessibility ≥ 95, SEO 100.
- Works at 360 px wide. Visible keyboard focus. WCAG AA contrast (tokens are pre-checked).
- No layout shift: images always have width/height; fonts are preloaded with `font-display: swap`.

## Git

Commit in logical steps with clear messages. Do not commit `dist/`, `.astro/` or `node_modules/`.
