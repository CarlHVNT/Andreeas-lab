import { SITE } from "@/site.config";

const BUSINESS_ID = `${SITE.url}/#business`;

/** The business, on every page */
export function businessJsonLd() {
  const { location, contact, practitioner } = SITE;
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": BUSINESS_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    image: `${SITE.url}${SITE.seo.defaultOgImage}`,
    logo: `${SITE.url}/icon-512.png`,
    telephone: contact.phone || contact.whatsappNumber,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${location.hostClinic}, ${location.streetAddress}`,
      addressLocality: location.city,
      addressRegion: location.area,
      addressCountry: location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    },
    areaServed: { "@type": "City", name: "Dubai" },
    sameAs: [contact.instagramUrl],
    openingHoursSpecification: SITE.hours
      .filter((h) => !h.closed && h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
        opens: h.opens,
        closes: h.closes,
      })),
    priceRange: "AED",
    currenciesAccepted: "AED",
    founder: {
      "@type": "Person",
      name: practitioner.fullName,
      jobTitle: practitioner.title,
    },
    knowsLanguage: practitioner.languages,
    ...(SITE.established ? { foundingDate: SITE.established } : {}),
  };
}

/** One treatment page */
export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  price?: number | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    serviceType: "Icoone treatment",
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Dubai" },
    ...(input.price != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: input.price,
            url: input.url,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

/** The FAQ page */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

/** Rough Markdown to plain text, good enough for structured data */
export function markdownToText(md: string | undefined): string {
  return (md ?? "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
