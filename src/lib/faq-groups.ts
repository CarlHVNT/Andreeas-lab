/**
 * The two groups on the FAQ page (Carl, 19 September 2026). Each question names
 * one of them in its `group` field (schema in src/content.config.ts). Order here
 * is the order on the page; an empty group still shows its heading and says
 * questions will follow.
 */
export const FAQ_GROUPS = [
  {
    id: "clients",
    label: "For clients",
    text: "What treatments can and cannot do, how programmes are planned, and how to start.",
  },
  {
    id: "professionals",
    label: "For beauty professionals",
    text: "Questions about Andreea’s consultancy and her book.",
  },
] as const;

export type FaqGroupId = (typeof FAQ_GROUPS)[number]["id"];

/** The ids as a tuple, for `z.enum` in the content schema */
export const faqGroupIds = FAQ_GROUPS.map((g) => g.id) as unknown as [FaqGroupId, ...FaqGroupId[]];
