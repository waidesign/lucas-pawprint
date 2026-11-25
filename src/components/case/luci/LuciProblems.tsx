"use client";

import { motion, useReducedMotion } from "motion/react";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { springCalm } from "@/lib/motion";
import { cn } from "@/lib/cn";

const LUCI_PROBLEMS = [
  {
    title: "They forget.",
    description: "Rules and decisions get repeated every session.",
    image: "/case-studies/luci/screens/problem-forget",
    alt: "Illustration of an AI agent losing project rules between sessions.",
  },
  {
    title: "They guess the design.",
    description: "A screenshot gives estimates, not values.",
    image: "/case-studies/luci/screens/problem-guess",
    alt: "Illustration of an AI agent estimating CSS values from a screenshot.",
  },
  {
    title: "They misread feedback.",
    description: '"Make the button bigger" could mean any button.',
    image: "/case-studies/luci/screens/problem-misread",
    alt: "Illustration of ambiguous UI feedback pointing to the wrong button.",
  },
  {
    title: "They drift.",
    description: "Nobody checks the result against the design.",
    image: "/case-studies/luci/screens/problem-drift",
    alt: "Illustration of built UI drifting away from the original design spec.",
  },
] as const;

/**
 * 4-up plain row for Luci's Understand chapter ("Agents are fast. They also guess.").
 * Zero text cards (Rule 18): only each problem scene illustration wears a 2px pen frame.
 * No numerals: the four problems are parallel, not steps.
 */
export function LuciProblems() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="my-10">
      <h3 className="sr-only">Four ways AI coding agents go off track</h3>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {LUCI_PROBLEMS.map((item, idx) => {
        const inner = (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border-2 border-line-strong bg-bg">
              <picture>
                <source srcSet={`${item.image}.avif`} type="image/avif" />
                <source srcSet={`${item.image}.webp`} type="image/webp" />
                <img
                  src={`${item.image}.webp`}
                  alt={item.alt}
                  width={480}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-4/3 h-auto w-full object-cover"
                />
              </picture>
            </div>

            <div className="space-y-2 border-t-2 border-line-strong pt-4">
              <h4
                className={cn(
                  "font-display text-text text-balance",
                  HEADING_SCALE_CLASSES.h4,
                )}
              >
                {item.title}
              </h4>
              <p className="font-body text-body text-text-muted">
                {item.description}
              </p>
            </div>
          </div>
        );

        if (prefersReduced) {
          return <li key={item.title}>{inner}</li>;
        }

        return (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ ...springCalm, delay: idx * 0.04 }}
          >
            {inner}
          </motion.li>
        );
      })}
      </ul>
    </div>
  );
}
