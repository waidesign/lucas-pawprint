"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { RuledList } from "@/components/ui/RuledList";

const PRINCIPLES = [
  {
    number: 1,
    title: "Measured, never guessed.",
    body: "Every value comes from the live page. Nothing is invented.",
  },
  {
    number: 2,
    title: "Scoped.",
    body: "A component, a section or one token system — not the whole site.",
  },
  {
    number: 3,
    title: "Agent-ready.",
    body: "It extends Google's DESIGN.md format, which agents already read.",
  },
  {
    number: 4,
    title: "Lives where you work.",
    body: "On any website, or inside your own project.",
  },
  {
    number: 5,
    title: "Accessible by default.",
    body: "Every export includes WCAG checks in plain words.",
  },
] as const;

/**
 * PrincipleCards (V3 in CASE-LUCI.md §4 §4 & LAYOUT-STEPS.md Step 3):
 * - RuledList numbered 01–05 with mint bean markers, h4 titles, and verbatim body copy.
 */
export function PrincipleCards() {
  return (
    <div className="my-8 space-y-4">
      <h3
        className={cn(
          "font-display text-text text-balance",
          HEADING_SCALE_CLASSES.h3,
        )}
      >
        Five principles
      </h3>

      <RuledList
        ordered
        as="h4"
        items={PRINCIPLES.map((item) => ({
          id: String(item.number),
          bean: item.number,
          beanTone: "mint",
          title: item.title,
          body: <span className="text-text-muted">{item.body}</span>,
        }))}
      />
    </div>
  );
}
