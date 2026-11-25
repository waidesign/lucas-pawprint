"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { RuledList } from "@/components/ui/RuledList";

const PRINCIPLES = [
  {
    id: "measured",
    title: "Measured, never guessed.",
    body: "Every value comes from the live page. Nothing is invented.",
  },
  {
    id: "scoped",
    title: "Scoped.",
    body: "A component, a section or one token system — not the whole site.",
  },
  {
    id: "agent-ready",
    title: "Agent-ready.",
    body: "It extends Google's DESIGN.md format, which agents already read.",
  },
  {
    id: "where-you-work",
    title: "Lives where you work.",
    body: "On any website, or inside your own project.",
  },
  {
    id: "accessible",
    title: "Accessible by default.",
    body: "Every export includes WCAG checks in plain words.",
  },
] as const;

/**
 * PrincipleCards (V3 in CASE-LUCI.md §4 & LAYOUT-STEPS.md Step 3):
 * - Plain RuledList with h4 titles and verbatim body copy.
 * - No numerals: principles are parallel, not steps.
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
        as="h4"
        items={PRINCIPLES.map((item) => ({
          id: item.id,
          title: item.title,
          body: <span className="text-text-muted">{item.body}</span>,
        }))}
      />
    </div>
  );
}
