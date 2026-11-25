"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { springBouncy, springCalm, stagger } from "@/lib/motion";

export type HeroRevealVariant = "eyebrow" | "heading" | "body" | "media" | "mascot";

export interface HeroRevealProps {
  children: ReactNode;
  /** Stagger step index (each step = 80ms on the 40ms motion grid, matching Home Hero). */
  step?: number;
  /** Motion feel matching Home Hero elements. */
  variant?: HeroRevealVariant;
  className?: string;
}

const INITIAL_BY_VARIANT = {
  eyebrow: { opacity: 0, y: 16 },
  heading: { opacity: 0, y: 24, scale: 0.96 },
  body: { opacity: 0, y: 24 },
  media: { opacity: 0, y: 24, scale: 0.96 },
  mascot: { opacity: 0, y: 16, scale: 0.88, rotate: -6 },
} as const;

const ANIMATE_BY_VARIANT = {
  eyebrow: { opacity: 1, y: 0 },
  heading: { opacity: 1, y: 0, scale: 1 },
  body: { opacity: 1, y: 0 },
  media: { opacity: 1, y: 0, scale: 1 },
  mascot: { opacity: 1, y: 0, scale: 1, rotate: 0 },
} as const;

/**
 * Mount-triggered hero cascade shared across sub-page heroes (/work, /about, /contact)
 * so page transitions land with the same springCalm + 80ms stagger rhythm as the Home Hero.
 */
export function HeroReveal({
  children,
  step = 0,
  variant = "body",
  className,
}: HeroRevealProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const baseTransition = variant === "mascot" ? springBouncy : springCalm;

  return (
    <motion.div
      initial={prefersReduced ? false : INITIAL_BY_VARIANT[variant]}
      animate={ANIMATE_BY_VARIANT[variant]}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { ...baseTransition, delay: step * stagger }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
