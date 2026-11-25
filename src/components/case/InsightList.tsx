"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES, type HeadingTag } from "@/components/ui/Heading";
import { RuledList } from "@/components/ui/RuledList";

export interface InsightItem {
  title: string;
  body: ReactNode;
  aside?: ReactNode;
}

export interface InsightListProps {
  heading?: string;
  intro?: string;
  items: InsightItem[];
  itemAs?: HeadingTag;
  className?: string;
}

/**
 * InsightList: RuledList for research insights, product capabilities, or principles.
 * Zero cards — 2px top rule + hairline rows. No numerals: insights are parallel, not steps.
 */
export function InsightList({
  heading = "What we found",
  intro,
  items,
  itemAs = "h4",
  className,
}: InsightListProps) {
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
          id: `insight-${idx}`,
          title: item.title,
          body: item.body,
          aside: item.aside,
        }))}
      />
    </div>
  );
}
