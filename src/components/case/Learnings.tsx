"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { RuledList } from "@/components/ui/RuledList";

export type LearningEntry = string | { title?: string; body: string };

export interface LearningsProps {
  heading?: string;
  items: LearningEntry[];
  className?: string;
}

/**
 * Generic Learnings list (plain RuledList, Rule 18 compliant).
 * No numerals: lessons are parallel, not steps.
 */
export function Learnings({
  heading = "What I learned",
  items,
  className,
}: LearningsProps) {
  return (
    <div className={cn("my-10 space-y-6", className)}>
      <h3
        className={cn(
          "font-display text-text text-balance",
          HEADING_SCALE_CLASSES.h3,
        )}
      >
        {heading}
      </h3>

      <RuledList
        as="h4"
        items={items.map((entry, idx) => {
          const item =
            typeof entry === "string" ? { title: undefined, body: entry } : entry;
          return {
            id: `learning-${idx}`,
            title: item.title,
            body: (
              <span className={item.title ? "text-text-muted" : "font-medium text-text"}>
                {item.body}
              </span>
            ),
          };
        })}
      />
    </div>
  );
}
