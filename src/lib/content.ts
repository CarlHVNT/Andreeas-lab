import { getCollection, type CollectionEntry } from "astro:content";
import { CASE_GROUPS } from "./case-groups";
import { FAQ_GROUPS } from "./faq-groups";

/** URL slug of a treatment: frontmatter `slug` if set, else the file name */
export function treatmentSlug(entry: CollectionEntry<"treatments">): string {
  return entry.data.slug ?? entry.id;
}

export function treatmentPath(entry: CollectionEntry<"treatments">): string {
  return `/treatments/${treatmentSlug(entry)}`;
}

/** All treatments in display order */
export async function getTreatments() {
  const all = await getCollection("treatments");
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Treatments shown on the home page */
export async function getFeaturedTreatments(limit = 6) {
  const all = await getTreatments();
  return all.filter((t) => t.data.featured).slice(0, limit);
}

/** All FAQs in display order */
export async function getFaqs() {
  const all = await getCollection("faqs");
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** FAQs in their groups, in FAQ_GROUPS order; empty groups included */
export async function getFaqsByGroup() {
  const all = await getFaqs();
  return FAQ_GROUPS.map((group) => ({ ...group, items: all.filter((f) => f.data.group === group.id) }));
}

/** FAQs by file name, keeping the requested order */
export async function getFaqsBySlugs(slugs: string[]) {
  const all = await getCollection("faqs");
  return slugs
    .map((s) => all.find((f) => f.id === s))
    .filter((f): f is CollectionEntry<"faqs"> => Boolean(f));
}

/** All testimonials in display order */
export async function getTestimonials() {
  const all = await getCollection("testimonials");
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedTestimonials(limit = 3) {
  const all = await getTestimonials();
  const featured = all.filter((t) => t.data.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

/** All case studies in display order */
export async function getCaseStudies() {
  const all = await getCollection("caseStudies");
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedCaseStudies(limit = 3) {
  const all = await getCaseStudies();
  const featured = all.filter((c) => c.data.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

/** Case studies for one treatment */
export async function getCaseStudiesFor(treatmentSlug: string) {
  const all = await getCaseStudies();
  return all.filter((c) => c.data.treatmentSlug === treatmentSlug);
}

/** Case studies in their Before & after groups, in CASE_GROUPS order; empty groups included */
export async function getCaseStudiesByGroup() {
  const all = await getCaseStudies();
  return CASE_GROUPS.map((group) => ({ ...group, items: all.filter((c) => c.data.group === group.id) }));
}
