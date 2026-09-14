import { SITE } from "@/site.config";

const L = SITE.location;

/** Where Andreea works, for use in sentences: the host clinic if there is one, otherwise the building */
export const venue = L.hostClinic || L.building;

/**
 * The address as lines, in the order used in the UAE:
 * unit and floor, building, community, then city and country.
 */
export const addressLines: string[] = [
  L.unit,
  L.building,
  L.community,
  `${L.city}, ${L.country}`,
].filter(Boolean);

/** One line for captions: "Ibn Sina Building 27, Block B, Dubai Healthcare City, Oud Metha, Dubai" */
export const addressInline = [L.building, L.community, L.city].filter(Boolean).join(", ");

/** One line including the unit, for the map caption and the contact page */
export const addressInlineWithUnit = [L.unit, L.building, L.community, L.city].filter(Boolean).join(", ");

/** The street-level part for schema.org PostalAddress */
export const streetAddress = [L.unit, L.building, L.community].filter(Boolean).join(", ");
