"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { springCalm } from "@/lib/motion";
import { HEADING_SCALE_CLASSES, type HeadingTag } from "@/components/ui/Heading";

export interface IndexColumnItem {
  id?: string;
  /** Optional uppercase mono label string OR a pastel `<Chip>` node */
  label?: ReactNode;
  /** Optional decorative numeral (`font-display`, `aria-hidden="true"`) */
  number?: string;
  title: ReactNode;
  body: ReactNode;
  actions?: ReactNode;
}

export interface IndexColumnsProps {
  items: IndexColumnItem[];
  /** Number of columns at lg+ (default derives from item count, clamped 2–4) */
  columns?: 2 | 3 | 4;
  /** Heading tag for each column title (default "h4", size via Rule 17 scale) */
  as?: HeadingTag;
  /** Body text token size (default "body") */
  bodySize?: "body" | "body-lg";
  /** Render `<ol>` when column order matters, otherwise `<ul>` */
  ordered?: boolean;
  /** Use on-pastel border & text tokens when sitting directly on a full-pastel section */
  onPastel?: boolean;
  /** Enable 16px rise + fade reveal (40ms stagger, max 6 items; disabled under reduced motion) */
  reveal?: boolean;
  className?: string;
}

const COLUMN_GRID_CLASSES: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function IndexColumns({
  items,
  columns,
  as: Tag = "h4",
  bodySize = "body",
  ordered = false,
  onPastel = false,
  reveal = true,
  className,
}: IndexColumnsProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const resolvedColumns: 2 | 3 | 4 =
    columns ?? (items.length >= 4 ? 4 : items.length === 3 ? 3 : 2);
  const ListTag = ordered ? "ol" : "ul";
  const topBorderClass = onPastel ? "border-on-pastel" : "border-line-strong";
  const textClass = onPastel ? "text-on-pastel" : "text-text";
  const mutedClass = onPastel ? "text-on-pastel/80" : "text-text-muted";
  const bodySizeClass = bodySize === "body-lg" ? "text-body-lg" : "text-body";

  return (
    <ListTag
      className={cn(
        "grid gap-10",
        COLUMN_GRID_CLASSES[resolvedColumns],
        className,
      )}
    >
      {items.map((item, idx) => {
        const key = item.id ?? `index-col-${idx}`;

        const inner = (
          <div className="space-y-4">
            {item.label &&
              (typeof item.label === "string" ? (
                <p
                  className={cn(
                    "font-mono text-label uppercase tracking-wider",
                    mutedClass,
                  )}
                >
                  {item.label}
                </p>
              ) : (
                <div>{item.label}</div>
              ))}

            {item.number && (
              <span
                aria-hidden="true"
                className={cn("block font-display text-display", textClass)}
              >
                {item.number}
              </span>
            )}

            <Tag
              className={cn(
                "font-display text-balance",
                HEADING_SCALE_CLASSES[Tag],
                textClass,
              )}
            >
              {item.title}
            </Tag>

            <div className={cn("font-body", bodySizeClass, mutedClass)}>
              {item.body}
            </div>

            {item.actions && <div className="pt-2">{item.actions}</div>}
          </div>
        );

        const itemClass = cn("border-t-2 pt-6", topBorderClass);

        if (!reveal || prefersReduced) {
          return (
            <li key={key} className={itemClass}>
              {inner}
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
            className={itemClass}
          >
            {inner}
          </motion.li>
        );
      })}
    </ListTag>
  );
}
