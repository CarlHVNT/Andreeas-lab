import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { caseGroupIds } from "./lib/case-groups";

/**
 * Treatments – one Markdown file per treatment in src/content/treatments.
 * The file name is the URL slug unless `slug` is set in the frontmatter.
 * The Markdown body is optional extra detail shown under “What a session is like”.
 */
const treatments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/treatments" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Optional override of the URL slug (defaults to the file name) */
      slug: z.string().optional(),
      /** One line, the promise. Shown in lists and at the top of the page. */
      promise: z.string(),
      /** Who it suits. Optional: the section is hidden while empty. */
      forWhom: z.array(z.string()).default([]),
      /** What happens in a session, two to four sentences. Optional: hidden while empty. */
      whatHappens: z.string().optional(),
      /** e.g. "60 min" */
      duration: z.string(),
      /** The recommended programme of sessions, e.g. "8 to 12 sessions, one or two a week". Optional. */
      recommendedProgramme: z.string().optional(),
      /** Price in AED, or null for “on request” */
      priceFrom: z.number().nullable(),
      priceNote: z.string().optional(),
      /** Confirmed by Andreea. Rendered as a plain list. */
      contraindications: z.array(z.string()).default([]),
      /** Whether the contraindication list is still a sample */
      contraindicationsConfirmed: z.boolean().default(false),
      /** FAQ file names to show on this page */
      faqSlugs: z.array(z.string()).default([]),
      heroImage: image(),
      heroImageAlt: z.string(),
      /** Focal point when the photo is cropped, e.g. "center 30%" */
      heroImagePosition: z.string().optional(),
      /** Sort order in lists */
      order: z.number(),
      /** Featured treatments appear on the home page */
      featured: z.boolean().default(false),
      /** Name used inside the WhatsApp message, defaults to title */
      whatsappName: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

/**
 * FAQs – one Markdown file per question in src/content/faqs.
 * The question is in the frontmatter, the answer is the Markdown body.
 */
const faqs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
    category: z.enum(["treatment", "practical", "policy"]).default("practical"),
    /** True while the answer still needs Andreea’s confirmation */
    needsConfirmation: z.boolean().default(false),
  }),
});

/**
 * Testimonials – one Markdown file per quote in src/content/testimonials.
 * The quote is the Markdown body.
 */
const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    /** How the client wants to be named, e.g. "S. M." */
    name: z.string(),
    /** e.g. "Dubai Marina" */
    area: z.string().optional(),
    /** Treatment file name, links the quote to a treatment page */
    treatmentSlug: z.string().optional(),
    /** Month and year, e.g. "March 2026" */
    date: z.string().optional(),
    /** True for sample quotes. Shown as “Sample quote” on the site. */
    placeholder: z.boolean().default(false),
    /** Show on the home page */
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

/**
 * Case studies – one Markdown file per before-and-after case in src/content/case-studies.
 * Andreea publishes each case as one composite image (before on the left, after on the
 * right, her notes written on it): that is `image`. Two separate photographs (`before`,
 * `after`) are also supported. Every case belongs to a group on the Before & after page
 * (src/lib/case-groups.ts). Photographs need the client’s consent. The Markdown body holds
 * Andreea’s notes.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Group on the Before & after page */
      group: z.enum(caseGroupIds),
      /** Treatment file name this case belongs to, when one treatment fits */
      treatmentSlug: z.string().optional(),
      /** What the client came in with, one line */
      concern: z.string(),
      /** e.g. "April to October 2025". Optional. */
      period: z.string().optional(),
      sessions: z.number().optional(),
      /** What was done, one item per line, transcribed from Andreea’s notes */
      plan: z.array(z.string()).default([]),
      /** One composite before-and-after image, as Andreea publishes it */
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Or two separate photographs */
      before: image().optional(),
      beforeAlt: z.string().optional(),
      after: image().optional(),
      afterAlt: z.string().optional(),
      /** Two or three plain sentences. No guarantees, no medical claims. Optional. */
      summary: z.string().optional(),
      /** Written consent for publishing the photographs is on file */
      consent: z.boolean().default(false),
      /** True while the image is a stand-in: the card says so and prefixes the alt text */
      placeholderImages: z.boolean().default(false),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { treatments, faqs, testimonials, caseStudies };
