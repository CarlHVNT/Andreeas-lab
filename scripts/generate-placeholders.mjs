/**
 * Generates clearly-labelled placeholder artwork and app icons.
 *
 *   npm run placeholders
 *
 * Every image is a soft abstract composition in the site palette with a
 * “Placeholder · …” caption baked in, so nobody mistakes it for a real photo.
 * Replace the files in src/assets/placeholders with real photographs of the
 * same name (or update the imports) and delete this script when done.
 */
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";

const ASSETS = "src/assets/placeholders";
const PUBLIC = "public";
await mkdir(ASSETS, { recursive: true });

const C = {
  porcelain: "#F6F4F0",
  stone: "#E5E0D8",
  stoneDeep: "#D8D0C4",
  mist: "#E4ECE7",
  lab: "#1B4D3E",
  graphite: "#5B655F",
  skinLight: "#EBDCCF",
  skinMid: "#DDC6B4",
  sage: "#CFDBD3",
};

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function art({ w, h, label, seed }) {
  const r = rng(seed);
  const fills = [C.skinLight, C.skinMid, C.sage, C.stoneDeep, C.mist];
  const defs = [];
  const shapes = [];
  for (let i = 0; i < 5; i++) {
    const color = fills[i % fills.length];
    defs.push(
      `<radialGradient id="g${i}"><stop offset="0" stop-color="${color}" stop-opacity="0.95"/><stop offset="0.6" stop-color="${color}" stop-opacity="0.55"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`,
    );
    const cx = (w * (0.15 + r() * 0.7)).toFixed(0);
    const cy = (h * (0.15 + r() * 0.7)).toFixed(0);
    const rx = (w * (0.28 + r() * 0.32)).toFixed(0);
    const ry = (h * (0.22 + r() * 0.32)).toFixed(0);
    const rot = Math.round(r() * 180);
    shapes.push(
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#g${i})" transform="rotate(${rot} ${cx} ${cy})"/>`,
    );
  }
  const fs = Math.round(Math.min(w, h) * 0.026);
  const pad = Math.round(Math.min(w, h) * 0.05);
  const caption = `Placeholder \u00b7 ${label}`;
  const boxW = Math.min(w - pad * 2, Math.round(fs * 0.56 * caption.length + fs * 1.6));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.porcelain}"/><stop offset="1" stop-color="${C.stone}"/></linearGradient>${defs.join("")}</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>${shapes.join("")}
<rect x="${pad}" y="${h - pad - Math.round(fs * 2.2)}" width="${boxW}" height="${Math.round(fs * 2.2)}" rx="${Math.round(fs * 0.3)}" fill="${C.porcelain}" fill-opacity="0.88"/>
<text x="${pad + Math.round(fs * 0.8)}" y="${h - pad - Math.round(fs * 0.75)}" font-family="Georgia, 'Times New Roman', serif" font-size="${fs}" fill="${C.graphite}">${caption}</text>
</svg>`;
}

function ogArt({ w, h }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.porcelain}"/><stop offset="1" stop-color="${C.stone}"/></linearGradient>
<radialGradient id="g0"><stop offset="0" stop-color="${C.skinLight}" stop-opacity="0.9"/><stop offset="1" stop-color="${C.skinLight}" stop-opacity="0"/></radialGradient>
<radialGradient id="g1"><stop offset="0" stop-color="${C.sage}" stop-opacity="0.9"/><stop offset="1" stop-color="${C.sage}" stop-opacity="0"/></radialGradient></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<ellipse cx="${w * 0.78}" cy="${h * 0.3}" rx="${w * 0.36}" ry="${h * 0.7}" fill="url(#g0)"/>
<ellipse cx="${w * 0.7}" cy="${h * 0.9}" rx="${w * 0.3}" ry="${h * 0.5}" fill="url(#g1)"/>
<rect x="80" y="80" width="64" height="64" rx="14" fill="${C.lab}"/>
<circle cx="112" cy="112" r="15" fill="none" stroke="${C.porcelain}" stroke-width="3.5"/>
<circle cx="112" cy="112" r="5" fill="${C.porcelain}"/>
<text x="80" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="84" fill="${C.lab}">Andreea\u2019s Lab</text>
<text x="82" y="400" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="${C.ink ?? "#1E2321"}">Icoone body and face treatments in Dubai.</text>
<text x="82" y="560" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="${C.graphite}">Placeholder share image</text>
</svg>`;
}

const treatments = [
  "lymphatic-drainage",
  "cellulite-skin-firming",
  "body-remodelling",
  "post-surgery-recovery",
  "post-natal",
  "face",
  "consultation",
];

const jobs = [
  { file: `${ASSETS}/hero.jpg`, w: 1600, h: 2000, label: "hero photograph, Andreea\u2019s hands during a session", seed: 11 },
  { file: `${ASSETS}/portrait.jpg`, w: 1200, h: 1600, label: "portrait of Andreea", seed: 23 },
  { file: `${ASSETS}/room.jpg`, w: 1600, h: 1200, label: "the treatment room", seed: 37 },
  ...treatments.map((slug, i) => ({
    file: `${ASSETS}/treatment-${slug}.jpg`,
    w: 1600,
    h: 2000,
    label: `${slug.replace(/-/g, " ")} photograph`,
    seed: 100 + i * 7,
  })),
  ...[1, 2, 3, 4, 5, 6].map((i) => ({
    file: `${ASSETS}/instagram-${i}.jpg`,
    w: 1080,
    h: 1080,
    label: `Instagram post ${i}`,
    seed: 200 + i * 13,
  })),
];

for (const job of jobs) {
  await sharp(Buffer.from(art(job))).jpeg({ quality: 78, mozjpeg: true }).toFile(job.file);
  console.log("wrote", job.file);
}

await sharp(Buffer.from(ogArt({ w: 1200, h: 630 }))).jpeg({ quality: 82, mozjpeg: true }).toFile(`${PUBLIC}/og-default.jpg`);
console.log("wrote", `${PUBLIC}/og-default.jpg`);

const favicon = await readFile(`${PUBLIC}/favicon.svg`);
for (const [name, size] of [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
]) {
  await sharp(favicon, { density: 400 }).resize(size, size).png().toFile(`${PUBLIC}/${name}`);
  console.log("wrote", `${PUBLIC}/${name}`);
}
