"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
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
  itemAs?: HeadingTag;
  className?: string;
}

/**
 * PainList: RuledList for user pain points and friction discovered in Understand.
 * Zero cards — 2px top rule + hairline rows. No numerals: pain points are parallel, not steps.
 */
export function PainList({
  heading = "What got in the way",
  intro,
  items,
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
        as={itemAs}
        items={items.map((item, idx) => ({
          id: `pain-${idx}`,
          title: item.title,
          body: item.body,
          aside: item.aside,
        }))}
      />
    </div>
  );
}
