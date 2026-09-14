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

  integrations: [
    sitemap({
      filter: (page) => !page.includes("/contact/thanks") && !page.includes("/404"),
    }),
  ],

  vite: {
    // The cast only reconciles Vite type versions between Astro 5 and @tailwindcss/vite; runtime is fine.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
