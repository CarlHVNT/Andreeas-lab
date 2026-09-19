/**
 * Interface strings and locale helpers.
 *
 * The site ships in English. Russian (ru) and Arabic (ar, right-to-left) are
 * scaffolded here so they can be added without restructuring:
 *  1. add the locale to `activeLocales`
 *  2. fill in its strings below
 *  3. add translated content in src/content/<collection>/<locale>/ (see CLAUDE.md)
 *  4. add pages under src/pages/<locale>/
 */

export const locales = ["en", "ru", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Only these locales get pages, hreflang tags and sitemap entries */
export const activeLocales: readonly Locale[] = ["en"];

export const rtlLocales: readonly Locale[] = ["ar"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  ar: "العربية",
};

const en = {
  "nav.home": "Home",
  "nav.about": "About me",
  "nav.qualifications": "Qualifications",
  "nav.treatments": "Treatments",
  "nav.consultancy": "Consultancy",
  "nav.caseStudies": "Before & after",
  "nav.results": "Before & after",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.skip": "Skip to content",
  "cta.whatsapp": "Message Andreea on WhatsApp",
  "cta.whatsappShort": "WhatsApp",
  "cta.seeTreatments": "See treatments",
  "cta.allTreatments": "All treatments",
  "cta.readMore": "Read more",
  "cta.loadMap": "Load the map",
  "cta.openMaps": "Open in Google Maps",
  "cta.playVideo": "Play the video",
  "cta.watchYoutube": "Watch on YouTube",
  "cta.subscribeYoutube": "Subscribe on YouTube",
  "cta.followInstagram": "Follow Andreea on Instagram",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.instagram": "Instagram",
  "footer.inside": "Inside",
  "footer.sampleNotice":
    "Sample content for layout review. Facts, prices, quotes and photographs are placeholders.",
  "label.duration": "Session",
  "label.programme": "Recommended programme",
  "label.price": "Price",
  "label.priceOnRequest": "On request",
  "label.priceFrom": "from",
  "label.sampleQuote": "Sample quote",
  "label.toConfirm": "Sample list, to be confirmed by Andreea",
  "label.hours": "Hours",
  "label.closed": "Closed",
} as const;

export type UIKey = keyof typeof en;

/** Add translations here. Missing keys fall back to English. */
export const ui: Record<Locale, Partial<Record<UIKey, string>>> = {
  en,
  ru: {},
  ar: {},
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Reads the locale from the first URL segment, defaulting to English */
export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split("/");
  if (first && isLocale(first) && activeLocales.includes(first)) return first;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
  };
}

/** Prefix a path with the locale segment for non-default locales */
export function localizePath(path: string, locale: Locale = defaultLocale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function textDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
