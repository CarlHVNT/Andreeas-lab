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

  tagline: "Advanced facial treatments & body sculpting in Dubai",
  /** Carl’s meta description for the landing page (19 September 2026); also the business description in the structured data */
  description:
    "DHA-licensed Beauty Therapist in Dubai specialising in acne-prone skin, facial sculpting, lymphatic drainage, Icoone body treatments and post-SMAS recovery. Personalised treatment plans with realistic goals and long-term results.",

  practitioner: {
    firstName: "Andreea",
    /** PLACEHOLDER */
    fullName: "Andreea Popescu",
    /** From Andreea, 17 September 2026: “DHA Licensed Beauty Therapist” */
    title: "DHA-licensed beauty therapist",
    /**
     * Short list for the home page fact and page descriptions. The full record,
     * in Andreea’s words, is `qualifications` below.
     */
    credentials: [
      "ITEC Level 3 Diploma in Facial Electrical Treatments (UK)",
      "800 hours of beauty therapy training at The Nordic International Beauty & Training Centre, Dubai",
      "Icoone Laser MED practitioner training",
    ],
    /**
     * Specialisations, in Andreea’s words (19 September 2026). Each is a drop-down row
     * on the qualifications page and the home page; the About page lists the titles.
     */
    specialisations: [
      {
        title: "Acne & oily skin",
        text: "Acne is one of my main areas of specialisation — and something I understand personally as a former acne patient. I offer personalised care for different types of acne, oily and congested skin, combining professional treatments, technology and home-care routines.",
      },
      {
        title: "Advanced facial treatments",
        text: "Personalised facial protocols focused on skin quality, hydration, texture, ageing and overall skin health, selected according to the individual needs of each client.",
      },
      {
        title: "Facial sculpting & lymphatic drainage",
        text: "Facial massage, vacuum-assisted techniques and lymphatic drainage to reduce puffiness, improve definition and support recovery after facial procedures or SMAS surgery, with appropriate medical clearance.",
      },
      {
        title: "Facial EMS",
        text: "Electromuscular stimulation to support facial muscle tone, firmness and definition as part of a personalised treatment plan.",
      },
      {
        title: "Body lymphatic drainage & Icoone Medical",
        text: "Icoone Laser MED treatments focused on lymphatic drainage, fluid retention, tissue stimulation, body contouring and skin quality.",
      },
    ] as { title: string; text: string }[],
    languages: ["English", "Romanian", "Spanish"],
    /**
     * Qualifications & certifications, in Andreea’s words (19 September 2026), shown on
     * the Specialisations & qualifications page. Add years as she supplies them.
     */
    qualifications: [
      { title: "DHA Professional Licence", issuer: "Dubai Health Authority, UAE", year: "" },
      {
        title: "ITEC Level 3 Diploma in Facial Electrical Treatments — Merit",
        issuer: "ITEC / VTCT, United Kingdom · Ofqual Regulated",
        year: "",
      },
      {
        title: "Level 1–3 Beauty Therapy Training — 800 Hours",
        issuer: "The Nordic International Beauty & Training Centre, Dubai · KHDA Attested",
        year: "",
      },
      {
        title: "Sculptural Face Lifting™ Practising Licence",
        issuer: "International Sculptural Face Lifting Academy",
        year: "",
      },
      { title: "Icoone Laser MED Practitioner Training", issuer: "Specialised two-week practical training", year: "" },
    ],
    /** Additional training, from Andreea (19 September 2026). The last row of Qualifications & certifications. */
    additionalTraining: [
      "Hydrafacial Syndeo",
      "Facial skincare",
      "Chemical peels",
      "Microneedling (Morpheus)",
      "BBL/IPL training",
      "Alma Academy training",
    ],
    /** Continuing education, in Andreea’s words (19 September 2026): three paragraphs and three labelled rows */
    continuingEducation: {
      intro: [
        "In aesthetics, learning never really stops.",
        "New technologies, products and treatment protocols appear constantly, so staying updated is essential.",
        "I continue my education through industry events such as Dubai Derma, professional workshops, online courses and independent research. I also make sure to receive proper training whenever I work with a new device, product or protocol.",
      ],
      groups: [
        { label: "Industry events", items: ["Dubai Derma", "Aesthetic & dermatology conferences", "Professional exhibitions"] },
        { label: "Ongoing learning", items: ["Courses", "Workshops", "Product research", "New treatment protocols"] },
        { label: "Technology training", items: ["Manufacturer & distributor training for new devices"] },
      ],
    },
  },

  contact: {
    /** International format, no spaces */
    whatsappNumber: "+971561680342",
    /** How the number is displayed */
    whatsappDisplay: "+971 56 168 0342",
    /** Leave empty if the phone number is the same as WhatsApp */
    phone: "",
    email: "andreeaslab888@gmail.com",
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
   * The podcast, on Andreea’s YouTube channel. Name, description and button from
   * Carl, 19 September 2026; the section appears on the home and contact pages.
   */
  podcast: {
    /** Show the podcast section */
    showSection: true,
    /** The podcast’s name, in its own capitalisation */
    title: "Beyond Beauty: Skin, Wellness & Longevity",
    description:
      "Andreea’s Lab explores skin health, wellness, alternative medicine, innovative beauty treatments, prevention and anti-aging through conversations with doctors, practitioners and industry professionals. Practical information, new perspectives and a deeper look at modern approaches to looking and feeling well.",
    buttonLabel: "Watch the podcast",
  },

  /**
   * Andreea’s book, which opens the Consultancy page. Leave `url` empty until
   * the shop link exists: “Get the book” then opens WhatsApp asking about it.
   */
  book: {
    title: "How to Become a Beauty Therapist in Dubai",
    published: "June 2026",
    /** Amazon link from Carl, 19 September 2026 */
    url: "https://www.amazon.com/dp/B0G6MWNVDZ",
  },

  /**
   * YouTube. The channel link goes under the video and into the structured data.
   * Paste an episode’s 11-character ID into `featuredVideoId` and the podcast
   * section embeds it, loading nothing from YouTube until the reader presses play.
   */
  youtube: {
    channelUrl: "https://www.youtube.com/@AndreeasLab",
    /** The 11-character ID from a YouTube link, e.g. "dQw4w9WgXcQ". PLACEHOLDER: empty until Carl picks an episode */
    featuredVideoId: "",
    /** Caption under the video */
    caption: "The Andreea’s Lab podcast, on YouTube.",
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
    /** Show the address line under the logo. Off since 19 September 2026 at Carl’s request; the address stays on the contact page. */
    showAddress: false,
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
