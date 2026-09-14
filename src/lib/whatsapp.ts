import { SITE } from "@/site.config";

/**
 * Build a wa.me link with the pre-filled message.
 * Pass the treatment name on treatment pages so the message names it.
 */
export function whatsappLink(treatmentName?: string): string {
  const digits = SITE.contact.whatsappNumber.replace(/\D/g, "");
  const topic = treatmentName?.trim() || SITE.whatsapp.defaultTopic;
  const text = SITE.whatsapp.messageTemplate.replace("{treatment}", topic);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** True when the configured number is still the placeholder */
export function whatsappIsPlaceholder(): boolean {
  return /^\+?9715?0{7,}$/.test(SITE.contact.whatsappNumber.replace(/\s/g, ""));
}
