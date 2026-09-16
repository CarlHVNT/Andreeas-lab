/**
 * Builds every logo asset from the supplied logotype.
 *
 *   node scripts/brand-assets.mjs
 *
 * Input:  src/assets/brand/logo-source.jpg  (the logotype on a white background)
 * Output: src/assets/brand/logo-stacked.png   full logotype, transparent, for the footer
 *         src/assets/brand/logo-mark.png      the face only, square, transparent
 *         src/assets/brand/logo-wordmark.png  the script “Andreea’s Lab”, transparent
 *         src/assets/brand/logo-lockup.png    face + wordmark side by side, for the header
 *         public/favicon.png, apple-touch-icon.png, icon-192.png, icon-512.png
 *         public/og-default.jpg               share image with the logotype
 *
 * The white background is removed with a colour-to-alpha pass (white as the
 * alpha colour), which keeps anti-aliased edges and the pastel shapes intact.
 * If Andreea supplies a vector logo later, replace the PNGs directly and stop
 * running this script.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "src/assets/brand/logo-source.jpg";
const OUT = "src/assets/brand";
const PUBLIC = "public";
const PORCELAIN = { r: 251, g: 247, b: 241 }; // the site’s ivory ground
await mkdir(OUT, { recursive: true });

// 1. Read pixels and remove the white background
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const rgba = Buffer.alloc(W * H * 4);
for (let p = 0; p < W * H; p++) {
  const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
  const d = Math.max(255 - r, 255 - g, 255 - b); // distance from white
  const a = d < 6 ? 0 : d / 255;
  const un = (c) => (a > 0 ? Math.max(0, Math.min(255, Math.round(255 - (255 - c) / a))) : 0);
  rgba[p * 4] = un(r);
  rgba[p * 4 + 1] = un(g);
  rgba[p * 4 + 2] = un(b);
  rgba[p * 4 + 3] = Math.round(a * 255);
}
const transparent = sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).png();
const transparentBuf = await transparent.toBuffer();

// 2. Find the three bands (face, wordmark, est. line) from non-white rows
const rows = new Array(H).fill(0);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    if (Math.max(255 - data[i], 255 - data[i + 1], 255 - data[i + 2]) >= 40) rows[y]++;
  }
const bands = [];
let start = null;
let gap = 0;
for (let y = 0; y < H; y++) {
  if (rows[y] > 0) {
    if (start === null) start = y;
    gap = 0;
  } else if (start !== null) {
    gap++;
    if (gap >= 6) {
      bands.push([start, y - gap]);
      start = null;
      gap = 0;
    }
  }
}
if (start !== null) bands.push([start, H - 1]);
const bbox = ([y0, y1]) => {
  let x0 = W, x1 = 0;
  for (let y = y0; y <= y1; y++)
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      if (Math.max(255 - data[i], 255 - data[i + 1], 255 - data[i + 2]) >= 40) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
      }
    }
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
};
const [face, wordmark, est] = bands.map(bbox);
console.log("bands", { face, wordmark, est });

const pad = (b, p) => ({
  left: Math.max(0, b.left - p),
  top: Math.max(0, b.top - p),
  width: Math.min(W - Math.max(0, b.left - p), b.width + 2 * p),
  height: Math.min(H - Math.max(0, b.top - p), b.height + 2 * p),
});
const crop = (b) => sharp(transparentBuf).extract(b);

// 3. Stacked logotype (face + wordmark + est.), trimmed
const all = {
  left: Math.min(face.left, wordmark.left, est.left),
  top: face.top,
  right: Math.max(face.left + face.width, wordmark.left + wordmark.width, est.left + est.width),
  bottom: est.top + est.height,
};
await crop(pad({ left: all.left, top: all.top, width: all.right - all.left, height: all.bottom - all.top }, 16))
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/logo-stacked.png`);

// 4. Mark: the face on a square canvas
const faceSize = Math.max(face.width, face.height) + 24;
const faceBuf = await crop(pad(face, 4)).toBuffer();
await sharp({ create: { width: faceSize, height: faceSize, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: faceBuf, gravity: "centre" }])
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/logo-mark.png`);

// 5. Wordmark alone
await crop(pad(wordmark, 6)).png({ compressionLevel: 9 }).toFile(`${OUT}/logo-wordmark.png`);

// 6. Horizontal lockup: mark 200 px tall, wordmark scaled so the script sits at ~46% of the mark height
const markH = 200;
const markLockup = await sharp(`${OUT}/logo-mark.png`).resize({ height: markH }).toBuffer();
const wordH = 92;
const wordLockup = await sharp(`${OUT}/logo-wordmark.png`).resize({ height: wordH }).toBuffer();
const wordMeta = await sharp(wordLockup).metadata();
const gapX = 34;
const lockupW = markH + gapX + wordMeta.width;
await sharp({ create: { width: lockupW, height: markH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: markLockup, left: 0, top: 0 },
    { input: wordLockup, left: markH + gapX, top: Math.round((markH - wordH) / 2) + 6 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/logo-lockup.png`);
console.log("lockup", lockupW + "x" + markH);

// 7. Icons: the mark on porcelain, with breathing room
async function icon(size, file, inset) {
  const inner = Math.round(size * (1 - inset * 2));
  const mark = await sharp(`${OUT}/logo-mark.png`).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: { ...PORCELAIN, alpha: 1 } } })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toFile(`${PUBLIC}/${file}`);
  console.log("wrote", file);
}
await icon(48, "favicon.png", 0.04);
await icon(180, "apple-touch-icon.png", 0.1);
await icon(192, "icon-192.png", 0.1);
await icon(512, "icon-512.png", 0.14);

// 8. Share image: logotype on porcelain with the tagline
const ogW = 1200, ogH = 630;
const stacked = await sharp(`${OUT}/logo-stacked.png`).resize({ height: 430 }).toBuffer();
const stackedMeta = await sharp(stacked).metadata();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ogW}" height="${ogH}">
  <text x="${stackedMeta.width + 140}" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="#3F1120">Icoone body and face</text>
  <text x="${stackedMeta.width + 140}" y="356" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="#3F1120">treatments in Dubai.</text>
  <text x="${stackedMeta.width + 142}" y="412" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#755760">One practitioner. Every session.</text>
</svg>`);
await sharp({ create: { width: ogW, height: ogH, channels: 3, background: PORCELAIN } })
  .composite([{ input: stacked, left: 80, top: Math.round((ogH - 430) / 2) }, { input: text, left: 0, top: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(`${PUBLIC}/og-default.jpg`);
console.log("wrote og-default.jpg");

// 9. Report the pastel tints too (lighter than the strong colours)
const bins = new Map();
for (let p = 0; p < W * H; p++) {
  const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
  const d = Math.max(255 - r, 255 - g, 255 - b);
  if (d < 25 || d >= 60) continue;
  const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
  const e = bins.get(key) || { n: 0, r: 0, g: 0, b: 0 };
  e.n++; e.r += r; e.g += g; e.b += b;
  bins.set(key, e);
}
const hex = (v) => Math.round(v).toString(16).padStart(2, "0");
for (const e of [...bins.values()].sort((a, b) => b.n - a.n).slice(0, 8))
  console.log("pastel", "#" + hex(e.r / e.n) + hex(e.g / e.n) + hex(e.b / e.n), e.n + " px");
