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

/**
 * JS mirrors of the `--duration-*` tokens in `src/styles/tokens.css`, in seconds
 * (motion/react takes seconds). All on the 40ms grid.
 */
export const durations = {
  instant: 0.12,
  fast: 0.2,
  base: 0.28,
  slow: 0.48,
  lazy: 0.72,
} as const;

/** JS mirrors of the `--ease-*` cubic-bezier tokens in `src/styles/tokens.css`. */
export const easings = {
  outSoft: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** Default stagger step in seconds (80ms, on the 40ms grid) */
export const stagger = 0.08;

/**
 * Cat hand timelines in seconds (LOAFFY-ANIMATION.md §5), all on the 40ms grid.
 * `hold` is how long a peeking hand stays before it leaves on its own.
 */
export const handTiming = {
  enter: 0.48,
  tap: 0.24,
  bat: 0.48,
  claws: 0.12,
  sketch: 1.6,
  exit: 0.28,
  hold: 1.6,
  /** Reduced motion: transitions become cross-fades ≤ 120ms (§2.10) */
  fade: 0.12,
} as const;
