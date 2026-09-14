/**
 * Andreea’s Lab – site configuration
 *
 * This is the one file to edit for brand, contact, hours, location, policies,
 * analytics and the WhatsApp message. No component code needs to change.
 *
 * Anything marked PLACEHOLDER is sample content for the layout review and must
 * be replaced before launch. The full list lives in CONTENT-TODO.md.
 */

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OpeningHours = {
  /** Human label shown on the site, e.g. "Tuesday to Saturday" */
  label: string;
  /** Days this row covers, used for the structured data search engines read */
  days: Day[];
  /** 24h times, e.g. "10:00". Leave out when closed. */
  opens?: string;
  closes?: string;
  closed?: boolean;
};

export const SITE = {
  name: "Andreea’s Lab",
  shortName: "Andreea’s Lab",

  /** PLACEHOLDER – the real domain, e.g. "https://andreeaslab.ae". No trailing slash. */
  url: "https://andreeaslab.example",

  /**
   * "sample" shows a one-line note in the footer that facts, prices and quotes
   * are placeholders. Set to "live" before launch.
   */
  contentStatus: "sample" as "sample" | "live",

  /** From the Instagram logo “Est. 2019” – confirm with Andreea */
  established: "2019",

  tagline: "Icoone body and face treatments in Dubai.",
  description:
    "Icoone lymphatic drainage, skin firming, body remodelling and post-surgery recovery in Dubai, planned as a course and performed by one licensed practitioner.",

  practitioner: {
    firstName: "Andreea",
    /** PLACEHOLDER */
    fullName: "Andreea Popescu",
    /** PLACEHOLDER – exact wording from her licence */
    title: "Licensed aesthetic practitioner",
    /** From the Instagram bio “10+ yrs in Dubai” – confirm */
    yearsInDubai: "10+",
    /**
     * From the Instagram bio “DHA & KHDA & MOH & UK certified”.
     * Confirm the exact wording and what each certificate covers before launch.
     */
    credentials: [
      "DHA certified",
      "KHDA certified",
      "MOH certified",
      "UK certified",
    ],
    languages: ["English", "Romanian"],
  },

  contact: {
    /** PLACEHOLDER – international format, no spaces, e.g. "+971501234567" */
    whatsappNumber: "+971500000000",
    /** PLACEHOLDER – how the number is displayed */
    whatsappDisplay: "+971 50 000 0000",
    /** Leave empty if the phone number is the same as WhatsApp */
    phone: "",
    /** PLACEHOLDER */
    email: "hello@andreeaslab.example",
    instagramHandle: "andreeaslab",
    instagramUrl: "https://www.instagram.com/andreeaslab/",
  },

  whatsapp: {
    /** {treatment} is replaced with the treatment name on treatment pages */
    messageTemplate:
      "Hi Andreea, I found you via the website and would like to ask about {treatment}.",
    /** Used when no treatment is named */
    defaultTopic: "Icoone treatments",
    buttonLabel: "Message Andreea on WhatsApp",
    buttonLabelShort: "WhatsApp",
  },

  location: {
    /** PLACEHOLDER – the licensed clinic Andreea rents her room in */
    hostClinic: "Sample Clinic",
    hostClinicUrl: "",
    /** PLACEHOLDER */
    roomName: "Treatment room 3",
    /** PLACEHOLDER */
    streetAddress: "Villa 000, Al Wasl Road",
    area: "Jumeirah 1",
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    /** PLACEHOLDER – the “Share” link from Google Maps */
    mapsUrl: "https://maps.google.com/?q=Jumeirah+1+Dubai",
    /** Used by the click-to-load map on the contact page */
    mapsEmbedQuery: "Jumeirah 1, Dubai",
    /** PLACEHOLDER – approximate Jumeirah 1 */
    geo: { latitude: 25.2285, longitude: 55.261 },
    /** PLACEHOLDER */
    howToFind:
      "Come to the clinic reception and ask for Andreea. Her room is on the first floor, at the end of the corridor on the left.",
    /** PLACEHOLDER */
    parking: "Free parking in front of the clinic and along the side street.",
  },

  hours: [
    {
      label: "Tuesday to Saturday",
      days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
    { label: "Sunday and Monday", days: ["Sunday", "Monday"], closed: true },
  ] as OpeningHours[],

  policies: {
    /** PLACEHOLDER */
    cancellation:
      "Please give 24 hours’ notice to move or cancel a session. Sessions cancelled with less notice are charged in full.",
    /** PLACEHOLDER */
    payment: "Card, cash and bank transfer. Courses are paid at the first session.",
  },

  results: {
    /** Keep false until Andreea and the host clinic confirm DHA approval */
    showBeforeAfters: false,
  },

  analytics: {
    /** e.g. "andreeaslab.ae" – leave empty to load nothing */
    plausibleDomain: "",
    /** e.g. "G-XXXXXXXXXX" – leave empty to load nothing */
    ga4MeasurementId: "",
    /** e.g. "123456789012345" – leave empty to load nothing */
    metaPixelId: "",
  },

  footer: {
    showHostClinic: true,
    /** Optional, e.g. "Treatments are provided under the licence of Sample Clinic, DHA licence no. 0000." */
    licenceLine: "",
  },

  seo: {
    titleSuffix: " · Andreea’s Lab",
    defaultOgImage: "/og-default.jpg",
    twitterHandle: "",
  },
};

export type SiteConfig = typeof SITE;
