/**
 * The two groups on the Before & after page (Carl, 19 September 2026). Each case
 * study names one of them in its `group` field (schema in src/content.config.ts).
 * Order here is the order on the page; an empty group still shows its heading
 * and says photographs will follow.
 */
export const CASE_GROUPS = [
  {
    id: "facial-treatments",
    label: "Facial treatments",
    text: "Facials, peels and technology, planned over months and paired with changes at home.",
  },
  {
    id: "facial-massage",
    label: "Facial massage",
    text: "Sculpting, lifting and lymphatic massage.",
  },
] as const;

export type CaseGroupId = (typeof CASE_GROUPS)[number]["id"];

/** The ids as a tuple, for `z.enum` in the content schema */
export const caseGroupIds = CASE_GROUPS.map((g) => g.id) as unknown as [CaseGroupId, ...CaseGroupId[]];

export const caseGroupLabel = (id: CaseGroupId): string => CASE_GROUPS.find((g) => g.id === id)?.label ?? id;
