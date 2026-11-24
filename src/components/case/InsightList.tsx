"use client";

import type { ReactNode } from "react";
import { cn, type Tone } from "@/lib/cn";
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
  tone?: Tone | "surface";
  itemAs?: HeadingTag;
  className?: string;
}

/**
 * InsightList: numbered RuledList for research insights, product capabilities, or principles.
 * Zero cards — 2px top rule + hairline rows with pastel numbered bean markers.
 */
export function InsightList({
  heading = "What we found",
  intro,
  items,
  tone = "mint",
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
        ordered
        as={itemAs}
        items={items.map((item, idx) => ({
          id: `insight-${idx}`,
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
