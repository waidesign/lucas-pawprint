"use client";

import type { ReactNode } from "react";
import { cn, type Tone } from "@/lib/cn";
import { HEADING_SCALE_CLASSES, type HeadingTag } from "@/components/ui/Heading";
import { RuledList } from "@/components/ui/RuledList";

export interface CaseListItem {
  title: string;
  body: ReactNode;
  aside?: ReactNode;
}

export interface PainListProps {
  heading?: string;
  intro?: string;
  items: CaseListItem[];
  tone?: Tone | "surface";
  itemAs?: HeadingTag;
  className?: string;
}

/**
 * PainList: numbered RuledList for user pain points and friction discovered in Understand.
 * Zero cards — uses 2px top rule + hairline rows with pastel numbered bean markers.
 */
export function PainList({
  heading = "What got in the way",
  intro,
  items,
  tone = "blush",
  itemAs = "h4",
  className,
}: PainListProps) {
  return (
    <div className={cn("my-10 space-y-6", className)}>
      {(heading || intro) && (
        <div className="max-w-[var(--prose-max)] space-y-2">
          {heading && (
            <h3
              className={cn(
                "font-display text-text text-balance",
                HEADING_SCALE_CLASSES.h3,
              )}
            >
              {heading}
            </h3>
          )}
          {intro && (
            <p className="font-body text-body-lg text-text-muted">{intro}</p>
          )}
        </div>
      )}

      <RuledList
        ordered
        as={itemAs}
        items={items.map((item, idx) => ({
          id: `pain-${idx}`,
          bean: idx + 1,
          beanTone: tone,
          title: item.title,
          body: item.body,
          aside: item.aside,
        }))}
      />
    </div>
  );
}
