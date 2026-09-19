/**
 * The site’s photographs, in one place.
 *
 * To swap a photo, replace the file in src/assets/photos (same name) or change
 * the import here. `position` is the focal point used when a photo is cropped
 * (CSS object-position), so faces stay in frame.
 */
import type { ImageMetadata } from "astro";
import bowl from "@/assets/photos/andreea-bowl.jpg";
import tunic from "@/assets/photos/andreea-tunic.jpeg";
import clinic from "@/assets/photos/andreea-clinic.jpg";
import device from "@/assets/photos/treatment-device.jpg";
import mask from "@/assets/photos/face-sheet-mask.jpg";
import products from "@/assets/photos/products-pink.jpg";
import collage from "@/assets/photos/spa-collage.jpg";
import redlight from "@/assets/photos/treatment-redlight.jpg";
import forehead from "@/assets/photos/treatment-forehead.jpg";
import consultation from "@/assets/photos/consultation-markings.jpg";
import faceMapping from "@/assets/photos/face-mapping.jpg";
import bookCover from "@/assets/photos/book-cover.webp";
import certificates from "@/assets/photos/certificates.jpg";

export type Photo = {
  src: ImageMetadata;
  alt: string;
  /** CSS object-position, e.g. "center 30%" */
  position?: string;
};

export const photos = {
  // Andreea’s certificates, laid out for a photograph (Carl, 19 September 2026). Shown whole on the
  // qualifications page. Until his upload lands, the file is a copy of the clinic photo.
  certificates: {
    src: certificates,
    alt: "Andreea’s certificates laid out on a white table between pink roses: ITEC diplomas, Dubai training certificates, chemical peel, microneedling and dermaplaning certificates, and her beauty therapy diploma",
  },
  // Andreea’s book (Carl, 19 September 2026): a 3D cover mock-up on a transparent ground, shown whole
  bookCover: {
    src: bookCover,
    alt: "Cover of How to Become a Beauty Therapist in Dubai by Andreea Cristina Enciu: Andreea in a white tunic on a pink cover, with the Dubai skyline",
  },
  // Andreea and her room
  bowl: {
    src: bowl,
    alt: "Andreea in the treatment room, smiling, holding a bowl and brush",
    position: "center 35%",
  },
  tunic: {
    src: tunic,
    alt: "Andreea in a white tunic, smiling",
    position: "center 22%",
  },
  clinic: {
    src: clinic,
    alt: "Andreea at the desk in the clinic, with the treatment chair behind her",
    position: "center 28%",
  },
  device: {
    src: device,
    alt: "Andreea performing a facial treatment with a handpiece",
    position: "center 32%",
  },
  // Treatments and clients
  mask: {
    src: mask,
    alt: "A client wearing a sheet mask during a face treatment",
    position: "center 40%",
  },
  redlight: {
    src: redlight,
    alt: "A client with closed eyes while a handpiece moves over her cheek",
    position: "40% center",
  },
  forehead: {
    src: forehead,
    alt: "Gloved hands guiding a handpiece over a client’s forehead",
    position: "55% 60%",
  },
  consultation: {
    src: consultation,
    alt: "A practitioner in pink gloves checking a client’s face before a treatment",
    position: "72% center",
  },
  faceMapping: {
    src: faceMapping,
    alt: "A woman touching her jaw, a fine measuring grid drawn over her face and neck",
    position: "38% center",
  },
  // Still life
  products: {
    src: products,
    alt: "Skincare products on a marble counter",
    position: "center",
  },
  collage: {
    src: collage,
    alt: "Face masks, creams and candles in the treatment room",
    position: "center",
  },
} satisfies Record<string, Photo>;

/** The six tiles of the static Instagram grid on the About page */
export const instagramPhotos: Photo[] = [
  photos.bowl,
  photos.redlight,
  photos.mask,
  photos.tunic,
  photos.forehead,
  photos.consultation,
];

/**
 * Three photos for a treatment page gallery, never repeating that page’s hero.
 * `seed` (the treatment’s order) rotates the pool so pages get different sets.
 */
export function galleryFor(hero: ImageMetadata | undefined, seed = 0, count = 3): Photo[] {
  const pool = [
    photos.device,
    photos.redlight,
    photos.forehead,
    photos.consultation,
    photos.bowl,
    photos.clinic,
    photos.mask,
    photos.faceMapping,
    photos.collage,
  ].filter((p) => p.src.src !== hero?.src);
  const offset = ((seed % pool.length) + pool.length) % pool.length;
  return [...pool.slice(offset), ...pool.slice(0, offset)].slice(0, count);
}
