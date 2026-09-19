/**
 * Generates clearly-labelled stand-in images for the before-and-after case
 * studies, until Andreea’s photographs are in src/assets/results.
 *
 *   npm run placeholders             # writes only the files that do not exist yet
 *   npm run placeholders -- --force  # overwrites; never run this over real photographs
 *
 * Each stand-in has the shape of Andreea’s composites: before on the left, after on
 * the right, a white gap between them, and a “Placeholder” caption baked in. Upload
 * her image over the file of the same name in src/assets/results, then set
 * `placeholderImages: false` in the matching src/content/case-studies file.
 *
 * Logo, favicon and share image are built by scripts/brand-assets.mjs.
 */
import sharp from "sharp";
import { access, mkdir } from "node:fs/promises";

const OUT = "src/assets/results";
const force = process.argv.includes("--force");
await mkdir(OUT, { recursive: true });

// Site palette (src/styles/global.css) plus two skin-like tints for the abstract shapes
const C = {
  ivory: "#fbf3f0",
  blush: "#f5dee1",
  rose: "#efc9cf",
  linen: "#eadcd8",
  muted: "#755760",
  white: "#ffffff",
  skin: "#ebd6c9",
  sand: "#e9dcd0",
};

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Soft ellipses inside one panel (x .. x + w), as gradient defs and shapes */
function panel(x, w, h, seed, prefix) {
  const r = rng(seed);
  const fills = [C.skin, C.rose, C.sand, C.blush, C.linen];
  const defs = [];
  const shapes = [];
  for (let i = 0; i < 5; i++) {
    const color = fills[i % fills.length];
    const id = `${prefix}${i}`;
    defs.push(
      `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="0.95"/><stop offset="0.6" stop-color="${color}" stop-opacity="0.55"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`,
    );
    const cx = Math.round(x + w * (0.15 + r() * 0.7));
    const cy = Math.round(h * (0.15 + r() * 0.7));
    const rx = Math.round(w * (0.3 + r() * 0.35));
    const ry = Math.round(h * (0.2 + r() * 0.3));
    const rot = Math.round(r() * 180);
    shapes.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})" transform="rotate(${rot} ${cx} ${cy})"/>`);
  }
  return { defs: defs.join(""), shapes: shapes.join("") };
}

function composite({ w, h, seed }) {
  const gap = Math.round(w * 0.02);
  const half = Math.round((w - gap) / 2);
  const left = panel(0, half, h, seed, "l");
  const right = panel(half + gap, half, h, seed + 7, "r");
  const fs = Math.round(Math.min(w, h) * 0.03);
  const pad = Math.round(Math.min(w, h) * 0.05);
  const boxH = Math.round(fs * 2.2);
  const label = (x, y, text) => {
    const boxW = Math.round(fs * 0.56 * text.length + fs * 1.6);
    return (
      `<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="${Math.round(fs * 0.3)}" fill="${C.ivory}" fill-opacity="0.92"/>` +
      `<text x="${x + Math.round(fs * 0.8)}" y="${y + Math.round(fs * 1.45)}" font-family="Georgia, 'Times New Roman', serif" font-size="${fs}" fill="${C.muted}">${text}</text>`
    );
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.blush}"/></linearGradient>${left.defs}${right.defs}
<clipPath id="cl"><rect x="0" y="0" width="${half}" height="${h}"/></clipPath><clipPath id="cr"><rect x="${half + gap}" y="0" width="${half}" height="${h}"/></clipPath></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<g clip-path="url(#cl)">${left.shapes}</g><g clip-path="url(#cr)">${right.shapes}</g>
<rect x="${half}" y="0" width="${gap}" height="${h}" fill="${C.white}"/>
${label(pad, pad, "Placeholder · Andreea’s photograph to follow")}
${label(pad, h - pad - boxH, "Before")}
${label(half + gap + pad, h - pad - boxH, "After")}
</svg>`;
}

// One stand-in per case in src/content/case-studies, at roughly the shape of Andreea’s image
const jobs = [
  { file: `${OUT}/melasma.jpg`, w: 1152, h: 1600, seed: 11 },
  { file: `${OUT}/comedonal-acne.jpg`, w: 1200, h: 1200, seed: 23 },
  { file: `${OUT}/acne-vulgaris.jpg`, w: 1200, h: 1200, seed: 37 },
  { file: `${OUT}/massage-eyes.jpg`, w: 1080, h: 1350, seed: 41 },
  { file: `${OUT}/massage-face.jpg`, w: 1080, h: 1350, seed: 53 },
  { file: `${OUT}/massage-face-neck.jpg`, w: 1080, h: 1350, seed: 67 },
];

for (const job of jobs) {
  const exists = await access(job.file).then(() => true, () => false);
  if (exists && !force) {
    console.log("kept ", job.file, "(exists; pass --force to overwrite)");
    continue;
  }
  await sharp(Buffer.from(composite(job))).jpeg({ quality: 78, mozjpeg: true }).toFile(job.file);
  console.log("wrote", job.file);
}
