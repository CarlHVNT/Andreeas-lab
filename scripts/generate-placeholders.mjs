/**
 * Generates clearly-labelled placeholder photographs for the before-and-after
 * case studies, until real photographs with client consent are available.
 *
 *   npm run placeholders
 *
 * Each image is a soft abstract composition in the site palette with a
 * “Placeholder · before photograph” or “… after photograph” caption baked in.
 * Replace src/assets/placeholders/case-NN-before.jpg and -after.jpg with real
 * photographs of the same names, then set `placeholderImages: false` in the
 * matching src/content/case-studies file.
 *
 * Logo, favicon and share image are built by scripts/brand-assets.mjs.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const ASSETS = "src/assets/placeholders";
await mkdir(ASSETS, { recursive: true });

const C = {
  ivory: "#FBF7F1",
  blush: "#F5DEE1",
  rose: "#EFC9CF",
  linen: "#EADCD8",
  muted: "#755760",
  skin: "#EBD6C9",
  sand: "#E9DCD0",
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
  const fills = [C.skin, C.rose, C.sand, C.blush, C.linen];
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
  const fs = Math.round(Math.min(w, h) * 0.03);
  const pad = Math.round(Math.min(w, h) * 0.05);
  const caption = `Placeholder · ${label}`;
  const boxW = Math.min(w - pad * 2, Math.round(fs * 0.56 * caption.length + fs * 1.6));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.blush}"/></linearGradient>${defs.join("")}</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>${shapes.join("")}
<rect x="${pad}" y="${h - pad - Math.round(fs * 2.2)}" width="${boxW}" height="${Math.round(fs * 2.2)}" rx="${Math.round(fs * 0.3)}" fill="${C.ivory}" fill-opacity="0.9"/>
<text x="${pad + Math.round(fs * 0.8)}" y="${h - pad - Math.round(fs * 0.75)}" font-family="Georgia, 'Times New Roman', serif" font-size="${fs}" fill="${C.muted}">${caption}</text>
</svg>`;
}

const jobs = [];
for (const n of [1, 2, 3]) {
  const id = String(n).padStart(2, "0");
  jobs.push({ file: `${ASSETS}/case-${id}-before.jpg`, w: 960, h: 1200, label: "before photograph", seed: 500 + n * 11 });
  jobs.push({ file: `${ASSETS}/case-${id}-after.jpg`, w: 960, h: 1200, label: "after photograph", seed: 600 + n * 13 });
}
for (const job of jobs) {
  await sharp(Buffer.from(art(job))).jpeg({ quality: 78, mozjpeg: true }).toFile(job.file);
  console.log("wrote", job.file);
}
