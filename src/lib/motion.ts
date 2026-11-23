import type { Transition } from "motion/react";

export const springCalm: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 1,
};

/** Loaffy character motion only */
export const springBouncy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 18,
  mass: 0.9,
};

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: springCalm,
} as const;

/** Default stagger step in seconds (80ms, on the 40ms grid) */
export const stagger = 0.08;
