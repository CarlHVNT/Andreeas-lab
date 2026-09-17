# Design plan and tokens

Direction (revised 16 September 2026 to Andreea’s own brief): pale blush pink and deep burgundy
writing on a warm ivory ground, elegant editorial serif headings, clean modern text. Minimal,
luxurious, mobile-first, one clear WhatsApp action on every screen, and a strong visual focus on
treatment results. Her logotype leads the header and footer.

The original Pass 1 plan (porcelain, ink green, no logo yet) lives at
https://claude.ai/artifact/3UiweVtVsGjFnhkwo7vBgS for the record. This file records what is built now.

## Logo

The logotype supplied on 16 September 2026: a navy line drawing of a face with pastel shapes behind
it, a script wordmark “Andreea’s Lab” and “Est. 2021”. It arrived as a JPEG on white, so
`scripts/brand-assets.mjs` removes the white with a colour-to-alpha pass and builds every asset:

| Asset | Where it is used |
|---|---|
| `src/assets/brand/logo-lockup.png` | Header: the face and the script wordmark side by side, 40 px tall on phones, 48 px on desktop |
| `src/assets/brand/logo-stacked.png` | Footer, at about 180 px wide |
| `src/assets/brand/logo-mark.png` | Source for the icons |
| `public/favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Browser tab, iOS home screen, web manifest, all on ivory |
| `public/og-default.jpg` | Share image: stacked logotype on ivory with the tagline |

A vector version from Andreea would sharpen the header at large sizes; until then the PNGs are
built from the 1021 px source. The logo’s own colours (navy `#081339`, salmon `#FE99B3`, lemon
`#FBFE17`, orchid `#FAC8FE`, mint `#E6FEE4`) stay inside the logo. The site palette below is
derived from Andreea’s brief, not from the logo, so the logo reads as the one colourful object on
every page.

## Colour

Defined in `src/styles/global.css` (`@theme`). The default Tailwind palette is removed.

| Token | Hex | Role | Contrast on Ivory |
|---|---|---|---|
| `ivory` | `#FBF3F0` | Page ground, warm white with a hint of pink (nudged from `#FBF7F1` on 16 September at Carl’s request) | ground |
| `linen` | `#EADCD8` | Hairlines, list rules, image placeholders | decorative |
| `linen-deep` | `#DCC7C4` | Form field borders, the quotation mark | n/a |
| `ink` | `#3F1120` | All headings and body text: deep burgundy | 14.6 : 1 |
| `muted` | `#755760` | Secondary text: captions, durations, hours, footer | 5.8 : 1 (5.0 : 1 on Blush) |
| `wine` | `#6A1B36` | The single action colour: WhatsApp buttons, links, focus rings, the mark, icons | 10.5 : 1, white on it 11.5 : 1 |
| `wine-deep` | `#4E1428` | Button hover only | n/a |
| `blush` | `#F5DEE1` | Pale blush: the tinted band (“How it works”, the FAQ teaser), icon discs, quiet-button hover | ink on blush 12.5 : 1 |
| `rose` | `#EFC9CF` | Deeper blush: the ornament’s shape, the orb behind the closing call | decorative |
| `white` | `#FFFFFF` | Button text, form fields | n/a |

Why it holds together: burgundy is both the writing and the action, so the page has one voice and
one thing to press. Blush is a surface, never text. Ivory is warm enough to sit with the pink
photographs and the logo’s navy line.

## Type

Two families, two jobs. Self-hosted variable fonts, preloaded, `font-display: swap`.

- **Newsreader** (`font-serif`, “Newsreader Variable”, standard axes) is the editorial voice:
  headlines, the Icoone explanation, About, quotes, treatment promises.
- **Hanken Grotesk** (`font-sans`, “Hanken Grotesk Variable”) is the clean modern text: rows,
  prices, hours, contraindications, buttons, the form, footer.

| Utility | Role | Size, phone → desktop | Weight | Leading | Tracking |
|---|---|---|---|---|---|
| `text-display` | H1 on the home page | 40 → 64 px | 400 | 1.02 | −0.015em |
| `text-statement` | H1 on inner pages, H2 everywhere | 28 → 44 px | 400 | 1.10 | −0.01em |
| `text-title` | H3, treatment and FAQ titles | 22 → 24 px | 500 | 1.20 | −0.01em |
| `.voice` | Serif prose | 17 → 19 px | 400 | 1.55 | measure 62ch |
| `text-facts` / body | Sans lists, forms, body | 16 → 17 px | 400 | 1.50 | measure 68ch (`.facts`) |
| `text-meta` | Captions, hours, footer | 14 px | 400–500 | 1.40 | |
| buttons | `.btn-primary` etc. | 16 / 15 / 14.4 px | 500 | 1 | |

Rules: sentence case everywhere; no all-caps labels; no eyebrow labels; no single italic word in
a headline; italics for quotations only; `tabular-nums` wherever digits line up (prices, hours).

## Structure

Five pages, in the order Andreea asked for, plus the home page as the landing from Instagram:

| Page | Route | What it carries |
|---|---|---|
| Home | `/` | Video hero, About me teaser, Specialisations & qualifications teaser, Treatments, image band, Before and after (three featured cases), Questions (four FAQs), Contact, closing call |
| About me | `/about` | First person: who she is, where she trained (short, links to Qualifications), why Icoone, how she plans a course, Instagram grid |
| Specialisations & qualifications | `/qualifications` | Five specialisations with icons, qualifications and certifications from `site.config.ts`, continuing education, languages |
| Treatments | `/treatments`, `/treatments/[slug]` | Rows with thumbnails; how it works; featured cases. Each treatment page: promise, who it’s for, a session, course and pricing, contraindications, its own before-and-after cases, related questions |
| Before and after | `/case-studies` (`/results` redirects here) | Every case study, two photographs each, then testimonials |
| FAQ | `/faq` | Grouped questions as details rows |
| Contact | `/contact` | WhatsApp first, then the request form, address in UAE order, hours, directions, click-to-load map |

The header nav shows About me, Qualifications, Treatments, FAQ, Contact; the footer adds Before & after.

Two things from the 15 September session are kept: the copy leads with Andreea (“Body and face
treatments in Dubai, with Andreea.”) with Icoone named as her method, and a secondary “Courses and
videos” section on the home page (statement and Instagram link left; a click-to-load `VideoEmbed` and
the `CourseInterestForm` right) sits after the before-and-after cases. A planned series of treatment
sessions is always a “programme”; “course” is reserved for her teaching.

**Bands.** Sections alternate between the ivory page and a tinted band: `tone="white"` is the quiet
band, `tone="blush"` the accent band, never two of the same tint in a row and at most one blush band
per page. The home hero counts as a band (`.hero`): the white About me band sits flush beneath it, so
the video runs edge to edge with no strip of ivory in between. On desktop the hero fills the first
screen (viewport height minus the header, between 38 and 56 rem). Home: About me (white), Specialisations (ivory), Treatments (white), gallery and image band,
Before and after (ivory), Courses and videos (white), Questions (blush), Contact (ivory). Treatment
pages: white, blush, ivory, white, ivory, white. FAQ groups alternate white and ivory. Contact puts the
form on blush.

## Layout

Concept: one column of large serif statements, each followed by its evidence in small sans, with
one burgundy button never more than a thumb away.

- **One left edge.** Everything hangs from it, including the closing call to action and the footer.
- **Phone.** Single column, 20 px gutters (`px-5`). Photographs bleed to the edge where they are not arched.
- **Desktop.** Twelve columns, 1200 px maximum (`max-w-content`), 24 px gutters. `Section.astro`
  splits five / six-from-seven: statement left, evidence right. Prose alone sits in the left eight columns.
- **Rhythm.** 8 px base. Sections carry top spacing only: 72 px on phones, 128 px on desktop. The
  blush band has spacing on both sides. `main` carries the bottom spacing.
- **Rows, not cards.** Hairlines (`border-linen`, `divide-linen`) structure treatments, facts,
  FAQ, hours and pricing tables. No shadows, no gradients apart from the hero scrim and the map fade.
- **Radii.** `rounded-ui` (6 px) on buttons and inputs, discs behind icons and step numbers. Photographs
  are square-cornered, except the arch.
- **The arch.** The signature shape, borrowed from the arched mirror in her clinic: `.arch` gives a
  4:5 portrait a semicircular top. Hero photographs on inner pages, the About me portrait, the first
  image of a `PhotoPair`. Galleries, thumbnails and before/after pairs stay square.
- **Before and after.** `CaseStudyCard`: two 4:5 photographs side by side with “Before” and “After”
  labels on ivory chips, then treatment, sessions and period in tabular sans, the title in serif, a
  two-sentence summary. Three across on the home page, two across on the case-studies page, one per
  row on a treatment page. Photographs only with written consent (`consent: true`); until then the
  card says so.
- **Photographs.** All in `src/lib/photos.ts` with alt text and a focal point. Hero video poster,
  arched portraits 4:5, galleries 1:1, the image band 21:9 on desktop.

## Small graphic elements

- **The mark** (`Mark.astro`) above every section title: a rose shape behind one drawn line, the
  logo’s own composition of colour behind line.
- Line icons in blush discs for specialisations; step numbers in ivory discs on the blush band.
- A large serif quotation mark in linen-deep above each testimonial.
- One rose orb behind the closing call to action. The hero has no orbs; the video carries it.
- Treatment rows carry a 4:5 thumbnail.

## Motion and behaviour

- The home hero is a silent, looping background video behind an ivory scrim that runs left to right
  on desktop and top to bottom on phones. The footage is mirrored (`HeroVideo mirror`) so the client’s
  face sits on the right, clear of the scrim, and the phone crop is aimed at the face (`position`). The poster paints first and is the largest image on the
  page; the video attaches after load and never under `prefers-reduced-motion` or Save-Data.
- One text motion moment: the hero’s headline, subline and button rise 12 px and fade in over 600 ms,
  staggered 80 ms. Off under reduced motion. Hover states change colour only.
- Sticky WhatsApp bar, phones and tablets only, appearing once the hero button has scrolled away.
- Every WhatsApp link pre-fills a message naming the treatment where there is one.
- Focus: 2 px `wine` outline, 2 px offset. Skip link to `#main`.

## What makes it hers

- **Her logo is the only colourful object.** Everything else is ivory, blush and burgundy.
- **Writing and action in one colour.** Burgundy speaks and burgundy is what you press.
- **Results first.** Before-and-after cases sit on the home page, the treatments page and every
  treatment page, always with consent and without retouching.
- **Her, in her room.** Photographs are of Andreea at work and of the clinic, in an arch or a square.
- **Scale first, ornament sparingly.** One large statement per section; the mark, icons, discs and a
  single orb repeat one language.
