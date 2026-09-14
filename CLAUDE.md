# Andreea’s Lab website – project conventions

Marketing site for Andreea’s Lab, a one-practitioner Icoone studio in Dubai. Almost all traffic
arrives from Instagram on a phone. The site’s one job is to start a WhatsApp conversation.

## Stack

- Astro 5 (pinned per the brief; Astro 7 is current, upgrade is a separate task), static output
- Tailwind CSS v4 via `@tailwindcss/vite`, CSS-first config in `src/styles/global.css`
- TypeScript strict, path alias `@/` → `src/`
- Content collections (Astro content layer, `glob` loader) in `src/content/`
- Fonts self-hosted from `@fontsource-variable/*`, preloaded in `BaseLayout.astro`
- Netlify hosting, Netlify Forms for the consultation form (`netlify.toml`)
- No client framework, no CMS, no database. Two tiny inline scripts (sticky bar, click-to-load map)

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
| Treatments, FAQs, testimonials (Markdown + typed frontmatter) | `src/content/treatments`, `faqs`, `testimonials`; schemas in `src/content.config.ts` |
| Design tokens (colours, type scale, radius, easing) | `src/styles/global.css` `@theme` block, documented in `DESIGN.md` |
| Page shell, fonts, metadata, JSON-LD, header, footer, sticky bar | `src/layouts/BaseLayout.astro` |
| Legal/prose pages | `src/layouts/ProsePage.astro` |
| Interface strings and locale helpers | `src/i18n/ui.ts` |
| WhatsApp link builder | `src/lib/whatsapp.ts` |
| Collection queries and slug helpers | `src/lib/content.ts` |
| Structured data builders | `src/lib/seo.ts` |
| Photographs, with alt text and focal points | `src/assets/photos/`, registry in `src/lib/photos.ts` |
| Generated placeholders (now only share image and icons) | `src/assets/placeholders/`, `scripts/generate-placeholders.mjs` |
| Content gaps to fill before launch | `CONTENT-TODO.md` |
| Non-developer guide for Andreea | `README.md` |

## Design rules (see DESIGN.md for the full plan)

- **Voice and facts.** Serif (`font-serif`, `.voice`) for what Andreea says: headlines, prose, quotes.
  Sans (`font-sans`, `.facts`) for what the lab records: lists, prices, hours, forms, buttons.
- **One green thing per screen.** `lab` green is for the WhatsApp action, links and focus only.
  Never a decorative background. `mist` is allowed for one band per page (`Section tone="mist"`).
- **Only the palette.** The default Tailwind palette is removed in `@theme`. Do not add colours.
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
- **Numbering only for real sequences.** Currently only “How it works”.
- **One motion moment.** The hero `.reveal` / `.reveal-late`. Nothing else animates. Reduced motion respected.
- **Buttons say what happens.** “Message Andreea on WhatsApp”, “Send request”, “Load the map”.
- **Every WhatsApp button carries context.** Pass `treatment` on treatment pages; the layout
  forwards it to the header button and sticky bar via the `treatment` prop of `BaseLayout`.
- **Every page ends with `CtaBand`** except the contact page.

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
- Never claim to treat or cure a condition. Describe what the treatment does and who it suits.
  Medical suitability is decided at the consultation.
- Before/after photos stay behind `SITE.results.showBeforeAfters` until DHA approval is confirmed.
- Placeholder images must stay clearly labelled. Alt text starts with “Placeholder for …”.

## URLs, SEO and structured data

- `trailingSlash: "never"`, `build.format: "file"`. Canonical URLs have no trailing slash; the home
  canonical is `SITE.url + "/"`. Netlify serves `/about` from `about.html`.
- `SEO.astro` sets title, description, canonical, Open Graph and Twitter tags. Titles get the
  `SITE.seo.titleSuffix` unless they already contain the brand name.
- `HealthAndBeautyBusiness` JSON-LD on every page (`BaseLayout`), `Service` on treatment pages,
  `FAQPage` on `/faq`. Builders in `src/lib/seo.ts`.
- `robots.txt` is generated from `SITE.url` (`src/pages/robots.txt.ts`). Sitemap via `@astrojs/sitemap`.
- `/contact/thanks` and `/404` are `noindex` and excluded from the sitemap.

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
