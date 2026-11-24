"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { springCalm } from "@/lib/motion";
import { HEADING_SCALE_CLASSES, type HeadingTag } from "@/components/ui/Heading";

export interface RuledListItem {
  id?: string;
  /** Left marker slot (mono label, years, or custom node) */
  marker?: ReactNode;
  /** Built-in numbered bean marker (e.g. 1 or "01") when `marker` is omitted */
  bean?: number | string;
  /** Tone for the numbered bean marker */
  beanTone?: Tone | "surface";
  title: ReactNode;
  body: ReactNode;
  /** Optional right-aligned caption/meta note */
  aside?: ReactNode;
}

export interface RuledListProps {
  items: RuledListItem[];
  /** Render `<ol>` when item order matters, otherwise `<ul>` */
  ordered?: boolean;
  /** Heading tag for each row title (default "h4", size via Rule 17 scale) */
  as?: HeadingTag;
  /** Use on-pastel ink border & text tokens when sitting directly on a full-pastel section */
  onPastel?: boolean;
  /** Enable 16px rise + fade reveal (40ms stagger, max 6 items; disabled under reduced motion) */
  reveal?: boolean;
  className?: string;
}

export function RuledList({
  items,
  ordered = false,
  as: Tag = "h4",
  onPastel = false,
  reveal = true,
  className,
}: RuledListProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const ListTag = ordered ? "ol" : "ul";
  const topBorderClass = onPastel ? "border-on-pastel" : "border-line-strong";
  const rowDividerClass = onPastel ? "border-on-pastel/25" : "border-line";
  const textClass = onPastel ? "text-on-pastel" : "text-text";
  const mutedClass = onPastel ? "text-on-pastel/80" : "text-text-muted";

  return (
    <ListTag
      className={cn("border-t-2", topBorderClass, className)}
    >
      {items.map((item, idx) => {
        const key = item.id ?? `ruled-item-${idx}`;
        const beanLabel =
          item.bean !== undefined
            ? typeof item.bean === "number" && item.bean < 10
              ? `0${item.bean}`
              : String(item.bean)
            : null;
        const beanBg =
          item.beanTone && item.beanTone !== "surface"
            ? TONE_BG_CLASSES[item.beanTone]
            : "bg-surface text-text";

        const markerNode =
          item.marker ??
          (beanLabel ? (
            <span
              aria-hidden={ordered ? "true" : undefined}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-pill border-2 font-mono text-caption font-semibold",
                onPastel ? "border-on-pastel" : "border-line-strong",
                beanBg,
              )}
            >
              {beanLabel}
            </span>
          ) : null);

        const rowContent = (
          <div className="grid grid-cols-1 items-baseline gap-4 py-6 md:grid-cols-12 md:gap-8 md:py-8">
            <div className={cn("font-mono text-label uppercase tracking-wider md:col-span-2", mutedClass)}>
              {markerNode}
            </div>

            <div className="md:col-span-4">
              <Tag
                className={cn(
                  "font-display text-balance",
                  HEADING_SCALE_CLASSES[Tag],
                  textClass,
                )}
              >
                {item.title}
              </Tag>
            </div>

            {item.aside ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:col-span-6">
                <div className={cn("max-w-[var(--prose-max)] flex-1 font-body text-body-lg", mutedClass)}>
                  {item.body}
                </div>
                <div className={cn("shrink-0 font-mono text-caption sm:text-right", mutedClass)}>
                  {item.aside}
                </div>
              </div>
            ) : (
              <div className={cn("max-w-[var(--prose-max)] font-body text-body-lg md:col-span-6", mutedClass)}>
                {item.body}
              </div>
            )}
          </div>
        );

        if (!reveal || prefersReduced) {
          return (
            <li
              key={key}
              className={cn("border-b", rowDividerClass)}
            >
              {rowContent}
            </li>
          );
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
            className={cn("border-b", rowDividerClass)}
          >
            {rowContent}
          </motion.li>
        );
      })}
    </ListTag>
  );
}
