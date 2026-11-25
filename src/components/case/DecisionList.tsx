"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import { springCalm } from "@/lib/motion";
import { HEADING_SCALE_CLASSES, type HeadingTag } from "@/components/ui/Heading";

export interface DecisionItem {
  id?: string;
  title: string;
  problem: string;
  decision: string;
  why: string;
  /** Optional framed media or diagram paired beneath the decision row */
  media?: ReactNode;
  caption?: string;
}

export interface DecisionListProps {
  /** Optional section subheading above the list */
  heading?: string;
  /** Optional intro line */
  intro?: string;
  /** Heading tag for each decision title (default "h3" or "h4" when `heading` is set) */
  itemAs?: HeadingTag;
  items: DecisionItem[];
  className?: string;
}

/**
 * DecisionList: plain rows with three labelled parts (Problem → Decision → Why),
 * each optionally paired with framed media. Replaces DecisionCard with zero boxes (Rule 18).
 * No numerals: decisions are parallel, not steps.
 */
export function DecisionList({
  heading,
  intro,
  itemAs,
  items,
  className,
}: DecisionListProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const ItemTag: HeadingTag = itemAs ?? (heading ? "h4" : "h3");

  return (
    <div className={cn("my-10 space-y-6", className)}>
      {(heading || intro) && (
        <div className="max-w-[var(--prose-max)] space-y-3">
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

      <ul className="divide-y divide-line border-b border-t-2 border-b-line border-t-line-strong">
        {items.map((item, idx) => {
          const key = item.id ?? `${idx}-${item.title}`;

          const content = (
            <div className="space-y-6 py-8 md:py-10">
              <ItemTag
                className={cn(
                  "font-display text-text text-balance",
                  HEADING_SCALE_CLASSES[ItemTag],
                )}
              >
                {item.title}
              </ItemTag>

              <dl className="grid grid-cols-1 divide-y divide-line border-t border-line md:grid-cols-3 md:divide-x md:divide-y-0">
                <div className="py-4 md:py-6 md:pr-6">
                  <dt className="font-mono text-label uppercase tracking-wider text-text-muted">
                    Problem
                  </dt>
                  <dd className="mt-2 font-body text-body text-text">
                    {item.problem}
                  </dd>
                </div>

                <div className="py-4 md:px-6 md:py-6">
                  <dt className="font-mono text-label uppercase tracking-wider text-text-muted">
                    Decision
                  </dt>
                  <dd className="mt-2 font-body text-body text-text">
                    {item.decision}
                  </dd>
                </div>

                <div className="py-4 md:py-6 md:pl-6">
                  <dt className="font-mono text-label uppercase tracking-wider text-text-muted">
                    Why
                  </dt>
                  <dd className="mt-2 font-body text-body text-text">
                    {item.why}
                  </dd>
                </div>
              </dl>

              {item.media && (
                <figure className="space-y-3 pt-2">
                  {item.media}
                  {item.caption && (
                    <figcaption className="font-body text-caption text-text-muted">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          );

          if (prefersReduced) {
            return <li key={key}>{content}</li>;
          }

          return (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                ...springCalm,
                delay: Math.min(idx, 5) * 0.04,
              }}
            >
              {content}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
