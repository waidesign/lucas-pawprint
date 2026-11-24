"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { RuledList } from "@/components/ui/RuledList";

const LEARNINGS = [
  {
    number: 1,
    body: "Narrow beats complete. One accurate component is worth more than a whole-site dump.",
  },
  {
    number: 2,
    body: "Agents need structure, not more words. Format design is product design.",
  },
  {
    number: 3,
    body: "Building my own tool made me a better designer for developers.",
  },
] as const;

/**
 * Learnings (§11 of CASE-LUCI.md & LAYOUT-STEPS.md Step 3):
 * - Numbered RuledList rows with butter bean markers and verbatim learning lines.
 */
export function Learnings() {
  return (
    <div className="my-8 space-y-4">
      <h3
        className={cn(
          "font-display text-text text-balance",
          HEADING_SCALE_CLASSES.h3,
        )}
      >
        Learnings
      </h3>

      <RuledList
        ordered
        items={LEARNINGS.map((item) => ({
          id: String(item.number),
          bean: item.number,
          beanTone: "butter",
          body: <span className="font-medium text-text">{item.body}</span>,
        }))}
      />
    </div>
  );
}
