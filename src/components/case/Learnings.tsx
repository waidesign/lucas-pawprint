"use client";

import { cn, type Tone } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { RuledList } from "@/components/ui/RuledList";
import { useCaseStudy } from "@/components/case/CaseStudyContext";

export type LearningEntry = string | { title?: string; body: string };

export interface LearningsProps {
  heading?: string;
  items: LearningEntry[];
  tone?: Tone;
  className?: string;
}

/**
 * Generic numbered Learnings list (RuledList with pastel bean markers, Rule 18 compliant).
 */
export function Learnings({
  heading = "What I learned",
  items,
  tone,
  className,
}: LearningsProps) {
  const ctx = useCaseStudy();
  const resolvedTone = tone ?? ctx?.metadata.tone ?? "butter";

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
        ordered
        as="h4"
        items={items.map((entry, idx) => {
          const item =
            typeof entry === "string" ? { title: undefined, body: entry } : entry;
          return {
            id: `learning-${idx}`,
            bean: idx + 1,
            beanTone: resolvedTone,
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
