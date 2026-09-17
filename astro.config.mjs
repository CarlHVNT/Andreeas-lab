// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/site.config";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  output: "static",

  // Clean URLs without a trailing slash: /about, /treatments/face
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "auto",
  },

  // English ships now. Russian and Arabic are scaffolded, see src/i18n/ui.ts.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru", "ar"],
    routing: { prefixDefaultLocale: false },
  },

  // The results page became /case-studies
  redirects: {
    "/results": "/case-studies",
  },

  integrations: [
    sitemap({
      filter: (page) => !["/contact/thanks", "/courses/thanks", "/404", "/results"].some((p) => page.includes(p)),
    }),
  ],

  vite: {
    // The cast only reconciles Vite type versions between Astro 5 and @tailwindcss/vite; runtime is fine.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
