# Design plan and tokens

Approved direction (Pass 1, 15 September 2026): a quiet porcelain ground, one deep green action,
large serif statements, small sans facts. Closer to a considered skincare brand than to a clinic
or a spa. Boldness is spent on the hero type and nowhere else.

The visual plan that was approved lives at https://claude.ai/artifact/3UiweVtVsGjFnhkwo7vBgS.
This file records what was actually built.

## Colour

Defined in `src/styles/global.css` (`@theme`). The default Tailwind palette is removed.

| Token | Hex | Role | Contrast on Porcelain |
|---|---|---|---|
| `porcelain` | `#F6F4F0` | Page ground | ground |
| `stone` | `#E5E0D8` | Hairlines, list rules, image placeholders, map placeholder | decorative |
| `stone-deep` | `#D8D0C4` | Form field borders (3 : 1 against white fields) | n/a |
| `ink` | `#1E2321` | All primary text | 14.3 : 1 |
| `graphite` | `#5B655F` | Secondary text: captions, durations, hours, footer | 5.4 : 1 |
| `lab` | `#1B4D3E` | The single accent: WhatsApp buttons, links, focus rings, step numbers | 8.8 : 1, white on it 9.6 : 1 |
| `lab-deep` | `#143A2F` | Button hover only | n/a |
| `mist` | `#E4ECE7` | One tinted band per page (“How it works”), quiet-button hover | ink on mist 13.1 : 1 |
| `white` | `#FFFFFF` | Button text, form fields | n/a |

Why green: the lab is glass, not marble. Deep bottle green reads calm, precise and non-invasive,
sits apart from the clinical blue of large clinics and the rose gold of spa templates, and next to
WhatsApp’s colour association without borrowing its bright green. Her existing mark is multicolour,
so the site stays neutral and lets the mark, the photographs and one accent carry colour.
Fallback if her grid turns out warm: swap `lab` for bronze `#6B4A2B` (7.2 : 1) and nothing else.

## Type

Two families, two jobs. Self-hosted variable fonts, preloaded, `font-display: swap`.

- **Newsreader** (`font-serif`, “Newsreader Variable”, standard axes) carries Andreea’s voice:
  headlines, the Icoone explanation, About, quotes, treatment promises.
- **Hanken Grotesk** (`font-sans`, “Hanken Grotesk Variable”) carries what the lab records:
  treatment rows, prices, hours, contraindications, buttons, the form, footer.

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

## Layout

Concept: one column of large serif statements, each followed by its evidence in small sans, with
one green button never more than a thumb away.

- **One left edge.** Everything hangs from it, including the closing call to action and the footer.
- **Phone.** Single column, 20 px gutters (`px-5`). Photographs bleed to the edge (`-mx-5`), text never does.
- **Desktop.** Twelve columns, 1200 px maximum (`max-w-content`), 24 px gutters (`gap-6`, `px-6`).
  `Section.astro` splits five / six-from-seven: statement left, evidence right. Prose alone sits in
  the left eight columns (`ProsePage.astro`).
- **Rhythm.** 8 px base. Sections carry top spacing only: 72 px on phones (`pt-18`), 128 px on
  desktop (`pt-32`), so the gap between sections is exactly one unit. The mist band has spacing on
  both sides. `main` carries the bottom spacing.
- **Rows, not cards.** Hairlines (`border-stone`, `divide-stone`) structure treatments, facts,
  FAQ, hours and pricing tables. No shadows, no gradients, no icon set beyond the WhatsApp glyph,
  an arrow and the Instagram mark.
- **Radii.** `rounded-ui` (6 px) on buttons and inputs. None on photographs.
- **Images.** Hero and treatment photos 4:5, portrait 3:4, room 4:3, Instagram tiles 1:1.
  Astro `<Image>` with explicit `widths` and `sizes`; hero `loading="eager" fetchpriority="high"`,
  everything else lazy.

## Components

`BaseLayout`, `ProsePage`, `Header` (details-based phone menu, no JS), `Footer`, `Logo`
(placeholder mark), `WhatsAppButton` (primary / quiet / small / bar), `StickyWhatsAppBar`,
`CtaBand`, `Section`, `TreatmentRows`, `Steps`, `Quote`, `FaqList` (details rows), `MapEmbed`
(click to load), `ConsultationForm` (Netlify), `InstagramGrid` (static), `SEO`, `JsonLd`,
`Analytics` (off until IDs exist), icons.

## Motion and behaviour

- One motion moment: the hero’s headline, subline and button rise 12 px and fade in over 600 ms,
  staggered 80 ms, the photograph 200 ms later. Off entirely under `prefers-reduced-motion`.
  Hover states change colour only.
- Sticky WhatsApp bar, phones only. On pages with a `#hero-cta` it appears once that button has
  scrolled away, so the first screen never shows two green buttons. On other pages it is always shown.
- Every WhatsApp link pre-fills “Hi Andreea, I found you via the website and would like to ask
  about {treatment}.” Treatment pages pass their own name, including through the header and bar.
- Focus: 2 px `lab` outline, 2 px offset, on everything interactive. Skip link to `#main`.

## What makes it hers

- **Voice and facts.** Serif for what Andreea says, sans for what the lab records.
- **One green thing per screen.** Green is the action, never decoration.
- **Scale, not ornament.** One large statement per section, structured by space and hairlines.
- **Skin, not spa.** Photographs should be close, matte and real: skin, her hands, the rollers, the
  room. No petals, candles, stones or stock models. The generated placeholders are abstract and labelled.
- **Boldness in one place.** The hero’s type. Everything around it stays quiet.

## Self-critique after the first build

Reviewed the built pages at 375 px and desktop against this plan. Two things were not earning
their place and were removed:

- **The WhatsApp text link in the phone header.** It made three green items on the first screen
  (header link, hero button, “See treatments”) and duplicated the sticky bar. The phone header is now
  the wordmark and the menu only. The desktop header keeps its button because desktop has no bar.
- **The hover translate on treatment-row arrows.** The plan says nothing animates except the hero.

Kept after questioning: the Instagram grid (the brief asks for a static grid instead of an embed;
it lives on the About page only, since visitors arrive from Instagram and do not need sending back
from the home page), and the small state transitions on the menu and FAQ toggles (they show a
state change, they are not hover decoration).
