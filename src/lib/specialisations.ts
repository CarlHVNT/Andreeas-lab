/**
 * Icon and, where one exists on this site, the link for each of Andreea’s
 * specialisations (`SITE.practitioner.specialisations`), matched by name.
 * A specialisation not listed here gets the leaf icon and no link.
 */
export type LineIconName = "person" | "shield" | "clipboard" | "heart" | "chat" | "calendar" | "refresh" | "leaf";

export type SpecialisationMeta = {
  icon: LineIconName;
  /** Treatment file name, resolved to its page by the caller */
  treatmentSlug?: string;
  /** A fixed link, used when the specialisation spans several treatments */
  href?: string;
};

const meta: Record<string, SpecialisationMeta> = {
  "Advanced facials": { icon: "person" },
  "Acne treatments": { icon: "shield" },
  "Facial massage and sculpting": { icon: "heart" },
  "Lymphatic therapies": { icon: "leaf", treatmentSlug: "lymphatic-drainage" },
  "Icoone Medical": { icon: "refresh", href: "/treatments" },
};

export function specialisationMeta(name: string): SpecialisationMeta {
  return meta[name] ?? { icon: "leaf" };
}
