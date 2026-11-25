"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { handTiming } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { CatHand } from "./CatHand";

/* Wireframe flow in a 160×96 board (the box stretches it; the stroke stays 2px). */
const VIEW_W = 160;
const VIEW_H = 96;
const FLOW: ReadonlyArray<readonly [number, number]> = [
  [16, 24],
  [64, 24],
  [64, 44],
  [104, 44],
  [104, 72],
  [144, 72],
];
const SEGMENTS = FLOW.slice(1).map((p, i) => {
  const a = FLOW[i] ?? p;
  return { a, b: p, len: Math.hypot(p[0] - a[0], p[1] - a[1]) };
});
const FLOW_LENGTH = SEGMENTS.reduce((sum, s) => sum + s.len, 0);

/** Claw tips sit this far down the hand's square frame (CatHand claw tips ≈ y 28/200). */
const CLAW_TIP = 0.14;

/* Local timeline (0..1) shared by scroll and timed playback. */
const ENTER_END = 0.24;
const DRAW_END = 0.88;
/* Timed playback: enter 480 · draw 720 · hold 480 · exit 280 = 1960ms (40ms grid). */
const TIMED_TOTAL = handTiming.enter + 0.72 + 0.48 + handTiming.exit;
const TIMED_TIMES = [
  0,
  handTiming.enter / TIMED_TOTAL,
  (handTiming.enter + 0.72) / TIMED_TOTAL,
  (handTiming.enter + 0.72 + 0.48) / TIMED_TOTAL,
  1,
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function drawAt(local: number) {
  return clamp01((local - ENTER_END) / (DRAW_END - ENTER_END));
}

function reachAt(local: number) {
  if (local <= 0 || local >= 1) return 0;
  if (local < ENTER_END) {
    const a = local / ENTER_END;
    return 1 - (1 - a) * (1 - a); // ease-out in
  }
  if (local <= DRAW_END) return 1;
  const b = (local - DRAW_END) / (1 - DRAW_END);
  return 1 - b * b; // ease-in out
}

/** Point `t` (0..1) along the flow, plus the drawn polyline up to it. */
function flowAt(t: number) {
  let remaining = clamp01(t) * FLOW_LENGTH;
  const first = FLOW[0] ?? [0, 0];
  const pts: Array<readonly [number, number]> = [first];
  let head: readonly [number, number] = first;
  for (const seg of SEGMENTS) {
    if (remaining <= 0) break;
    const k = Math.min(1, remaining / seg.len);
    head = [
      seg.a[0] + (seg.b[0] - seg.a[0]) * k,
      seg.a[1] + (seg.b[1] - seg.a[1]) * k,
    ];
    pts.push(head);
    remaining -= seg.len;
  }
  return { head, pts };
}

export interface HandSketchProps {
  /**
   * Scroll-driven timeline 0..1 (enter · draw · exit). While it is strictly between
   * 0 and 1 it owns the scene; at the ends it lets timed playback run.
   */
  scrub?: MotionValue<number>;
  /** Play the timed version once each time this turns true. */
  play?: boolean;
  /** Play the timed version once when the scene scrolls into view. */
  playInView?: boolean;
  /** Pixel size of the hand frame (8px grid); matches the box height. */
  handSize: number;
  className?: string;
}

/**
 * Process "Shape" scene (LOAFFY-ANIMATION.md §6.4): the cat hand rises from the bottom
 * edge, its claw tips draw the wireframe flow while it sketches, then it leaves the drawn
 * flow behind. Fills its parent (which must be `relative overflow-hidden`).
 * Reduced motion: one static frame, the flow drawn and the hand resting at its end.
 */
export function HandSketch({
  scrub,
  play = false,
  playInView = false,
  handSize,
  className,
}: HandSketchProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const inView = useInView(rootRef, { once: true, amount: 0.6 });
  const local = useMotionValue(prefersReduced ? DRAW_END : 0);
  const timedRef = useRef<AnimationPlaybackControls | null>(null);
  const [sketching, setSketching] = useState(false);

  const d = useTransform(local, (v) => {
    const { pts } = flowAt(drawAt(v));
    return pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  });
  const handLeft = useTransform(
    local,
    (v) => `${(flowAt(drawAt(v)).head[0] / VIEW_W) * 100}%`,
  );
  const handY = useTransform(local, (v) => {
    const tip = flowAt(drawAt(v)).head[1] / VIEW_H;
    const target = (tip - CLAW_TIP) * 100;
    return `${100 + (target - 100) * reachAt(v)}%`;
  });

  useMotionValueEvent(local, "change", (v) => {
    const draw = drawAt(v);
    const next = draw > 0 && draw < 1;
    setSketching((cur) => (cur === next ? cur : next));
  });

  // Reduced motion: static final frame
  useEffect(() => {
    if (prefersReduced) {
      timedRef.current?.stop();
      local.set(DRAW_END);
    }
  }, [prefersReduced, local]);

  // Scroll owns the scene while inside its window
  useMotionValueEvent(scrub ?? local, "change", (v) => {
    if (!scrub || prefersReduced) return;
    if (v > 0 && v < 1) {
      timedRef.current?.stop();
      timedRef.current = null;
      local.set(v);
    } else if (!timedRef.current) {
      local.set(v >= 1 ? 1 : 0);
    }
  });

  const shouldPlay = play || (playInView && inView);
  useEffect(() => {
    if (!shouldPlay || prefersReduced) return;
    const s = scrub?.get();
    if (s !== undefined && s > 0 && s < 1) {
      local.set(s); // scroll is driving: start from where the scrub already is
      return;
    }
    timedRef.current?.stop();
    timedRef.current = animate(local, [0, ENTER_END, DRAW_END, DRAW_END, 1], {
      duration: TIMED_TOTAL,
      times: TIMED_TIMES,
      ease: ["easeOut", "linear", "linear", "easeIn"],
    });
    return () => {
      timedRef.current?.stop();
      timedRef.current = null;
    };
  }, [shouldPlay, prefersReduced, scrub, local]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-70"
      >
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-on-pastel)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <motion.div
        className="absolute top-0 aspect-square h-full"
        style={{ left: handLeft, x: "-50%", y: handY }}
      >
        <CatHand
          side="fur"
          claws
          size={handSize}
          action={sketching && !prefersReduced ? "sketch" : "idle"}
          decorative
          className="block h-full w-full"
        />
      </motion.div>
    </div>
  );
}
