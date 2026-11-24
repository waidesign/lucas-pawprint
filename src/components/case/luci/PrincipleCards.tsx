"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";

import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { springCalm, stagger } from "@/lib/motion";

const PRINCIPLES = [
  {
    number: 1,
    title: "Measured, never guessed.",
    body: "Every value comes from the live page. Nothing is invented.",
  },
  {
    number: 2,
    title: "Scoped.",
    body: "A component, a section or one token system — not the whole site.",
  },
  {
    number: 3,
    title: "Agent-ready.",
    body: "It extends Google's DESIGN.md format, which agents already read.",
  },
  {
    number: 4,
    title: "Lives where you work.",
    body: "On any website, or inside your own project.",
  },
  {
    number: 5,
    title: "Accessible by default.",
    body: "Every export includes WCAG checks in plain words.",
  },
] as const;

/**
 * PrincipleCards (V3 in CASE-LUCI.md §4 §4):
 * - Five principle cards with numbered mint beans (1–5) and exact spec copy.
 * - Scroll reveal with 80ms stagger.
 */
export function PrincipleCards() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="my-8 space-y-3">
      <h3
        className={cn(
          "font-display text-text text-balance",
          HEADING_SCALE_CLASSES.h3,
        )}
      >
        Five principles
      </h3>

      <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {PRINCIPLES.map((item, index) => (
          <motion.li
            key={item.number}
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { ...springCalm, delay: index * stagger }
            }
            className="h-full"
          >
            <Card
              tone="surface"
              className="flex h-full flex-col justify-between gap-4 bg-bg"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-7 items-center justify-center rounded-pill border-2 border-line-strong bg-mint font-mono text-caption font-bold text-on-pastel shadow-sticker-sm"
              >
                {item.number}
              </span>

              <div className="space-y-2">
                <h4
                  className={cn(
                    "font-display text-text text-balance hyphens-auto break-words",
                    HEADING_SCALE_CLASSES.h4,
                  )}
                >
                  {item.title}
                </h4>
                <p className="font-body text-body text-text-muted">
                  {item.body}
                </p>
              </div>
            </Card>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
