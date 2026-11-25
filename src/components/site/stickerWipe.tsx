"use client";

import { motion, type MotionValue } from "motion/react";

/**
 * The site's "sticker cut" wipe, shared by the header menu and page transitions so both
 * always move the same way: a lilac lead layer sweeps in from the top-right corner (where
 * the menu toggle lives), the paper sheet follows a beat later, and both edges carry a 2px
 * pen outline. Covering plays lead → sheet; uncovering plays sheet → lead.
 */

/* Motion (DESIGN.md easings on the 40ms grid). */
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/* ease-in-out (not ease-out) so the shape visibly emerges from the corner and sweeps
   across, instead of covering the screen in the first few frames. */
export const LEAD_OPEN = { duration: 0.8, ease: EASE_IN_OUT } as const;
export const SHEET_OPEN = { duration: 0.8, ease: EASE_IN_OUT, delay: 0.16 } as const;
export const SHEET_CLOSE = { duration: 0.64, ease: EASE_IN_OUT, delay: 0.12 } as const;
export const LEAD_CLOSE = { duration: 0.64, ease: EASE_IN_OUT, delay: 0.28 } as const;

/* Page transitions: the same wipe at about twice the speed, so the cover is brief and the
   new page's hero animations are seen. Covered at 480ms, uncovered 480ms after landing. */
export const PAGE_LEAD_OPEN = { duration: 0.4, ease: EASE_IN_OUT } as const;
export const PAGE_SHEET_OPEN = { duration: 0.4, ease: EASE_IN_OUT, delay: 0.08 } as const;
export const PAGE_SHEET_CLOSE = { duration: 0.4, ease: EASE_IN_OUT } as const;
export const PAGE_LEAD_CLOSE = { duration: 0.4, ease: EASE_IN_OUT, delay: 0.08 } as const;

/* Wavy, hand-cut edge: 12 big lobes + a 7-lobe ripple for irregularity. The lobes slide
   along the edge as it grows (phase follows progress), so it morphs rather than zooms. */
const BLOB_POINTS = 48;
const BLOB_LOBES = 12;
const BLOB_RIPPLE_LOBES = 7;
const BLOB_AMPLITUDE = 0.08;
const BLOB_RIPPLE = 0.04;
/* Max radius in bounding-box units: the deepest dip (1 − 0.12) still clears the far
   bottom-left corner (distance √2 ≈ 1.41 from the top-right). */
const BLOB_MAX_RADIUS = 1.75;
const BLOB_PHASE_TRAVEL = Math.PI * 1.5;

/** Phase offset for the lead layer, so the two outlined edges never line up. */
export const LEAD_PHASE_OFFSET = Math.PI / 2;

/** Smooth closed wavy path (Catmull-Rom → cubic Bézier) in 0–1 box units. */
export function blobPath(progress: number, phaseOffset = 0) {
  const radius = progress * BLOB_MAX_RADIUS;
  const phase = progress * BLOB_PHASE_TRAVEL + phaseOffset;
  const n = BLOB_POINTS;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const r =
      radius *
      (1 +
        BLOB_AMPLITUDE * Math.sin(BLOB_LOBES * a + phase) +
        BLOB_RIPPLE * Math.sin(BLOB_RIPPLE_LOBES * a - phase * 1.3));
    return [1 + Math.cos(a) * r, Math.sin(a) * r] as const;
  });
  const at = (i: number) => pts[(i + n) % n] as readonly [number, number];
  const f = (v: number) => v.toFixed(4);
  let d = `M${f(at(0)[0])},${f(at(0)[1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
  }
  return `${d} Z`;
}

/** Full-viewport SVG that strokes a 0–1 box path with a constant 2px pen line. */
export function WipeOutline({
  d,
  zIndex,
}: {
  d: MotionValue<string>;
  zIndex: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      style={{ zIndex }}
      className="pointer-events-none fixed inset-0 h-full w-full"
    >
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
