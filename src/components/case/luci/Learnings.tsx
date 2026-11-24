"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";

import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { springCalm, stagger } from "@/lib/motion";

const LEARNINGS = [
  {
    number: 1,
    body: "Narrow beats complete. One accurate component is worth more than a whole-site dump.",
  },
  {
    number: 2,
    body: "Agents need structure, not more words. Format design is product design.",
  },
  {
    number: 3,
    body: "Building my own tool made me a better designer for developers.",
  },
] as const;

/**
 * Learnings (§11 of CASE-LUCI.md):
 * - 3 short learning cards with numbered beans and 80ms scroll reveal stagger.
 */
export function Learnings() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="my-8 space-y-3">
      <h3
        className={cn(
          "font-display text-text text-balance",
          HEADING_SCALE_CLASSES.h3,
        )}
      >
        Learnings
      </h3>

      <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {LEARNINGS.map((item, index) => (
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
          >
            <Card
              tone="surface"
              className="flex h-full flex-col justify-between gap-4"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-7 items-center justify-center rounded-pill border-2 border-line-strong bg-butter font-mono text-caption font-bold text-on-pastel shadow-sticker-sm"
              >
                {item.number}
              </span>
              <p className="font-body text-body font-medium text-text">
                {item.body}
              </p>
            </Card>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
