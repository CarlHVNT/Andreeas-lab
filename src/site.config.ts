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
  contentStatus: "live" as "sample" | "live",

  /** From the logotype, “Est. 2021” */
  established: "2021",

  tagline: "Body and face treatments in Dubai, with Andreea.",
  description:
    "Andreea’s Lab, Dubai: lymphatic drainage, skin firming, body remodelling and post-surgery recovery with Icoone. One licensed practitioner, every session with Andreea.",

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
    /**
     * Shown on the Specialisations & qualifications page.
     * Confirm every line with Andreea; add certificates, issuers and years as she supplies them.
     */
    qualifications: [
      { title: "Dubai Health Authority (DHA) certification", issuer: "Dubai Health Authority", year: "" },
      { title: "KHDA certified training", issuer: "Knowledge and Human Development Authority, Dubai", year: "" },
      { title: "Ministry of Health (MOH) certification", issuer: "UAE Ministry of Health and Prevention", year: "" },
      { title: "Certified aesthetic and body therapies training", issuer: "United Kingdom", year: "" },
      { title: "Icoone practitioner training", issuer: "Icoone, Italy", year: "" },
    ],
    /** Confirm with Andreea */
    continuingEducation: [
      "Dubai Derma, the dermatology and laser conference, attended each year",
      "Ongoing training in lymphatic and post-surgical care",
    ],
  },

  contact: {
    /** International format, no spaces */
    whatsappNumber: "+971561680342",
    /** How the number is displayed */
    whatsappDisplay: "+971 56 168 0342",
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
    defaultTopic: "a treatment",
    buttonLabel: "Message Andreea on WhatsApp",
    buttonLabelShort: "WhatsApp",
  },

  /**
   * Address, written the way addresses are given in the UAE: unit and floor
   * first, then the building, then the community, then the city and country.
   * There are no postcodes in the UAE. Dubai buildings have a ten-digit Makani
   * number on a blue plate at the entrance; add it when known, taxis and
   * deliveries use it.
   *
   * DEMO ADDRESS. This is a generic Dubai Healthcare City address used for the
   * demo so Andreea’s real location is not published. Replace before launch.
   */
  location: {
    /**
     * The licensed clinic or business the room belongs to, if any.
     * Leave empty if Andreea works from her own premises.
     */
    hostClinic: "",
    hostClinicUrl: "",
    /** Unit and floor, as written on the door */
    unit: "Clinic 203, Level 2",
    building: "Ibn Sina Building 27, Block B",
    /** Community or street */
    community: "Dubai Healthcare City, Oud Metha",
    /** District, used in headings and local search phrases */
    area: "Dubai Healthcare City",
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    /** Ten-digit Dubai Municipality Makani number for the building entrance. Optional. */
    makani: "",
    /** The “Share” link from Google Maps */
    mapsUrl: "https://maps.google.com/?q=Ibn+Sina+Building+27,+Dubai+Healthcare+City,+Dubai",
    /** Used by the click-to-load map on the contact page */
    mapsEmbedQuery: "Ibn Sina Building 27, Dubai Healthcare City, Dubai",
    /** Approximate centre of Dubai Healthcare City. Replace with the exact pin from Google Maps. */
    geo: { latitude: 25.2318, longitude: 55.3201 },
    howToFind:
      "Dubai Healthcare City sits between Oud Metha and Dubai Creek, a short walk from Dubai Healthcare City Metro Station. Ibn Sina Building 27 is in the centre of the district. Take the lift to Level 2 and ask for Andreea at Clinic 203.",
    /** Confirm with Andreea */
    parking: "Andreea will send you parking directions and the easiest entrance when you book.",
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
    payment: "Card, cash and bank transfer. Programmes are paid at the first session.",
  },

  results: {
    /**
     * Before-and-after case studies are shown when true. DHA advertising rules
     * apply to before/after photographs: publish only with written client
     * consent and, where required, approval. Set false to hide them all.
     */
    showBeforeAfters: true,
  },

  /**
   * Courses. Andreea plans to teach how she works, in Dubai. Until dates exist
   * the home page collects email addresses from people who want to hear first
   * (Netlify form “course-interest”) and points them to Instagram.
   */
  courses: {
    /** Show the “Courses and videos” section on the home page */
    showSection: true,
  },

  /**
   * YouTube. Leave `featuredVideoId` empty and the video slot plays the
   * stand-in clip below; paste an ID and it embeds that video instead, loading
   * nothing from YouTube until the reader presses play.
   */
  youtube: {
    /** e.g. "https://www.youtube.com/@andreeaslab" – leave empty until the channel exists */
    channelUrl: "",
    /** The 11-character ID from a YouTube link, e.g. "dQw4w9WgXcQ" */
    featuredVideoId: "",
    /** Caption under the video */
    caption: "Videos: treatments explained and questions answered. Channel coming soon.",
    /** PLACEHOLDER – generic stock clip shown until a YouTube video is set */
    placeholder: { mp4: "/video/hero.mp4", webm: "/video/hero.webm" },
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
    /** Show the address line under the wordmark */
    showAddress: true,
    /** Optional, e.g. "Treatments are provided under the licence of …, DHA licence no. 0000." */
    licenceLine: "",
  },

  seo: {
    titleSuffix: " · Andreea’s Lab",
    defaultOgImage: "/og-default.jpg",
    twitterHandle: "",
  },
};

export type SiteConfig = typeof SITE;
