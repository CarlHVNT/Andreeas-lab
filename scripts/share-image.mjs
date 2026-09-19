/**
 * Renders the share image used for Open Graph and Twitter cards
 * (public/og-default.jpg, 1200×630) with the site’s own fonts, colours,
 * logo and portrait, through headless Chromium.
 *
 *   npm run share-image
 *
 * Needs a Chromium binary: set CHROMIUM_PATH, or run `npx playwright install chromium`.
 * The headline is the site tagline from src/site.config.ts. Logo, favicons and
 * icons are built by scripts/brand-assets.mjs.
 */
import { chromium } from "playwright-core";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = (p) => pathToFileURL(path.join(root, p)).href;

const config = await readFile(path.join(root, "src/site.config.ts"), "utf8");
const tagline = config.match(/tagline:\s*"([^"]+)"/)?.[1] ?? "Advanced facial treatments & body sculpting in Dubai";
const title = config.match(/practitioner:[\s\S]*?title:\s*"([^"]+)"/)?.[1] ?? "DHA-licensed beauty therapist";

const C = { ivory: "#fbf3f0", blush: "#f5dee1", rose: "#efc9cf", ink: "#3f1120", muted: "#755760", wine: "#6a1b36" };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Newsreader"; src: url("${url("node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2")}") format("woff2"); font-weight: 200 800; }
@font-face { font-family: "Hanken"; src: url("${url("node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2")}") format("woff2"); font-weight: 100 900; }
html, body { margin: 0; }
body { position: relative; width: 1200px; height: 630px; overflow: hidden; background: ${C.ivory}; color: ${C.ink}; font-family: Hanken, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
.orb { position: absolute; right: -160px; bottom: -300px; width: 680px; height: 680px; border-radius: 50%; background: radial-gradient(circle at center, ${C.blush} 0%, rgba(245, 222, 225, 0) 70%); }
.logo { position: absolute; left: 80px; top: 60px; height: 84px; }
.mark { position: absolute; left: 82px; top: 192px; }
.h1 { position: absolute; left: 80px; top: 240px; width: 610px; font-family: Newsreader, Georgia, serif; font-weight: 400; font-size: 60px; line-height: 1.06; letter-spacing: -0.012em; }
.sub { position: absolute; left: 80px; top: 478px; width: 600px; font-size: 22px; line-height: 1.4; color: ${C.muted}; }
.photo { position: absolute; left: 768px; top: 64px; width: 352px; height: 502px; border-radius: 176px 176px 0 0; object-fit: cover; object-position: center 22%; background: ${C.blush}; }
</style></head><body>
<div class="orb"></div>
<img class="logo" src="${url("src/assets/brand/logo-lockup.png")}" alt="">
<svg class="mark" width="26" height="20" viewBox="0 0 18 14" aria-hidden="true"><circle cx="11" cy="7" r="6" fill="${C.rose}"/><path d="M1 12.5C5.5 11 9.5 6.5 17 1.5" fill="none" stroke="${C.wine}" stroke-width="1.5" stroke-linecap="round"/></svg>
<div class="h1">${esc(tagline)}</div>
<div class="sub">${esc(title)}. Personalised treatment plans, every session with Andreea.</div>
<img class="photo" src="${url("src/assets/photos/andreea-tunic.jpeg")}" alt="">
</body></html>`;

const tmpDir = path.join(root, "node_modules/.cache/share-image");
await mkdir(tmpDir, { recursive: true });
const tmpHtml = path.join(tmpDir, "og.html");
await writeFile(tmpHtml, html);

const candidates = [process.env.CHROMIUM_PATH, "/opt/pw-browsers/chromium"].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
const browser = await chromium.launch(executablePath ? { executablePath, args: ["--no-sandbox"] } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(tmpHtml).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const out = path.join(root, "public/og-default.jpg");
await page.screenshot({ path: out, type: "jpeg", quality: 88 });
await browser.close();
console.log("wrote", path.relative(root, out), `(“${tagline}”)`);
