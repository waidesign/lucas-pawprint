"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Transition } from "motion/react";
import { Send } from "lucide-react";
import {
  MOTION_PRINCIPLES,
  type MotionPrinciple,
  type MotionPrincipleId,
} from "@/content/motion";
import { cn, TONE_BG_CLASSES } from "@/lib/cn";
import { durations, easings, springCalm, stagger } from "@/lib/motion";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";

/**
 * How a demo renders:
 * - "start": resting at its first pose (motion OK, waiting to scroll into view).
 * - "end":   resting at its final pose (reduced motion, until someone presses Play).
 * - "play":  animating first → final pose. Re-keyed on every replay.
 */
type DemoState = "start" | "end" | "play";

interface DemoProps {
  state: DemoState;
}

/* Demo geometry (px, on the 4/8 grid). Loaffy-style exception: demo shapes only. */
const WIND_UP_X = -8;
const WIND_UP_Y = 4;
const FLY_X = 96;
const FLY_Y = -48;
const LIFT_IN_Y = 12;
const LINE_LAG_X = -48;

/** Initial pose for the current state: `false` skips straight to the final pose. */
function from<T>(state: DemoState, start: T): T | false {
  return state === "end" ? false : start;
}

/** Target pose: hold the first pose until the demo plays. */
function to<T>(state: DemoState, start: T, end: T): T {
  return state === "start" ? start : end;
}

const INK_DOT = "block size-6 rounded-pill bg-on-pastel";
const MONO_LABEL = "font-mono text-caption font-semibold text-on-pastel";
const MINI_SCREEN =
  "relative overflow-hidden rounded-md border-2 border-on-pastel bg-surface";

/* 1 · Easing: linear vs ease-out, same distance, same duration. */
function EasingDemo({ state }: DemoProps) {
  const rows = [
    { label: "Linear", ease: "linear" as const },
    { label: "Ease-out", ease: easings.outSoft },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-6 px-6">
      {rows.map((row) => (
        <div key={row.label} className="space-y-2">
          <p className={MONO_LABEL}>{row.label}</p>
          <div className="relative h-6">
            <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-on-pastel/40" />
            {/* The wrapper is exactly the travel distance wide, so x: 100% = full track. */}
            <motion.div
              className="absolute inset-y-0 left-0 right-6"
              initial={from(state, { x: "0%" })}
              animate={to(state, { x: "0%" }, { x: "100%" })}
              transition={{ duration: durations.lazy, ease: row.ease }}
            >
              <span className={INK_DOT} />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 2 · Timing: a small toggle (fast) next to a big sheet (slow). */
function TimingDemo({ state }: DemoProps) {
  const fast: Transition = { duration: durations.fast, ease: easings.outSoft };
  const slow: Transition = { duration: durations.slow, ease: easings.outSoft };
  return (
    <div className="flex h-full items-center justify-center gap-10 px-6">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-8 w-16 rounded-pill border-2 border-on-pastel bg-surface">
          <motion.div
            className="absolute inset-y-0.5 left-0.5 w-8"
            initial={from(state, { x: "0%" })}
            animate={to(state, { x: "0%" }, { x: "100%" })}
            transition={fast}
          >
            <span className={INK_DOT} />
          </motion.div>
        </div>
        <p className={MONO_LABEL}>200ms</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className={cn(MINI_SCREEN, "h-28 w-24")}>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-20 rounded-t-sm border-t-2 border-on-pastel bg-mint"
            initial={from(state, { y: "104%" })}
            animate={to(state, { y: "104%" }, { y: "0%" })}
            transition={slow}
          >
            <span className="mx-auto mt-2 block h-1 w-8 rounded-pill bg-on-pastel" />
          </motion.div>
        </div>
        <p className={MONO_LABEL}>480ms</p>
      </div>
    </div>
  );
}

/* 3 · Anticipation: the plane pulls back (120ms), then flies (280ms). */
function AnticipationDemo({ state }: DemoProps) {
  const total = durations.instant + durations.base;
  const windUpAt = durations.instant / total;
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="relative inline-flex h-12 items-center gap-3 rounded-pill border-2 border-on-pastel bg-surface pl-6 pr-4 text-text">
        <span className="relative font-body text-button font-semibold">
          <motion.span
            className="block"
            initial={from(state, { opacity: 1 })}
            animate={to(state, { opacity: 1 }, { opacity: 0 })}
            transition={{ duration: durations.instant, delay: total }}
          >
            Send
          </motion.span>
          <motion.span
            className="absolute inset-0"
            initial={from(state, { opacity: 0 })}
            animate={to(state, { opacity: 0 }, { opacity: 1 })}
            transition={{ duration: durations.instant, delay: total }}
          >
            Sent
          </motion.span>
        </span>
        <motion.span
          className="inline-flex"
          initial={from(state, { x: 0, y: 0, opacity: 1 })}
          animate={to(
            state,
            { x: 0, y: 0, opacity: 1 },
            {
              x: [0, WIND_UP_X, FLY_X],
              y: [0, WIND_UP_Y, FLY_Y],
              opacity: [1, 1, 0],
            },
          )}
          transition={{
            duration: total,
            times: [0, windUpAt, 1],
            ease: [easings.inOut, easings.outSoft],
          }}
        >
          <Send className="h-5 w-5" />
        </motion.span>
      </div>
    </div>
  );
}

/* 4 · Follow-through & overlap: the card lands, its lines catch up a beat later. */
function FollowThroughDemo({ state }: DemoProps) {
  const lines = ["w-full", "w-3/4", "w-1/2"];
  return (
    <div className="flex h-full items-center justify-center px-6">
      <motion.div
        className={cn(MINI_SCREEN, "w-40 space-y-3 p-4")}
        initial={from(state, { x: "-160%" })}
        animate={to(state, { x: "-160%" }, { x: "0%" })}
        transition={springCalm}
      >
        <span className="block size-6 rounded-pill border-2 border-on-pastel bg-blush" />
        {lines.map((width, i) => (
          <motion.span
            key={width}
            className={cn("block h-2 rounded-pill bg-line-strong", width)}
            initial={from(state, { x: LINE_LAG_X })}
            animate={to(state, { x: LINE_LAG_X }, { x: 0 })}
            transition={{ ...springCalm, delay: 0.04 * (i + 1) }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* 5 · Staging: a list reveals in order, 80ms apart. */
function StagingDemo({ state }: DemoProps) {
  const rows = ["w-24", "w-20", "w-28", "w-16"];
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className={cn(MINI_SCREEN, "w-44 space-y-2 p-4")}>
        {rows.map((width, i) => (
          <motion.div
            key={width}
            className="flex items-center gap-2"
            initial={from(state, { opacity: 0, y: LIFT_IN_Y })}
            animate={to(
              state,
              { opacity: 0, y: LIFT_IN_Y },
              { opacity: 1, y: 0 },
            )}
            transition={{
              duration: durations.base,
              ease: easings.outSoft,
              delay: i * stagger,
            }}
          >
            <span className="block size-4 shrink-0 rounded-pill border-2 border-on-pastel bg-lilac" />
            <span className={cn("block h-2 rounded-pill bg-line-strong", width)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 6 · Reduced motion: the same panel, as a slide and as a short fade. */
function ReducedMotionDemo({ state }: DemoProps) {
  const panel =
    "absolute inset-x-2 bottom-2 h-12 rounded-sm border-2 border-on-pastel bg-pistachio";
  return (
    <div className="flex h-full items-center justify-center gap-10 px-6">
      <div className="flex flex-col items-center gap-3">
        <div className={cn(MINI_SCREEN, "h-28 w-24")}>
          <motion.span
            className={panel}
            initial={from(state, { y: "160%" })}
            animate={to(state, { y: "160%" }, { y: "0%" })}
            transition={{ duration: durations.base, ease: easings.outSoft }}
          />
        </div>
        <p className={MONO_LABEL}>Full</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className={cn(MINI_SCREEN, "h-28 w-24")}>
          <motion.span
            className={panel}
            initial={from(state, { opacity: 0 })}
            animate={to(state, { opacity: 0 }, { opacity: 1 })}
            transition={{ duration: durations.instant, ease: "linear" }}
          />
        </div>
        <p className={MONO_LABEL}>Reduced</p>
      </div>
    </div>
  );
}

const DEMOS: Record<MotionPrincipleId, (props: DemoProps) => ReactNode> = {
  easing: EasingDemo,
  timing: TimingDemo,
  anticipation: AnticipationDemo,
  "follow-through": FollowThroughDemo,
  staging: StagingDemo,
  "reduced-motion": ReducedMotionDemo,
};

/* Cards on the same row start one beat apart when they scroll in together, then loop after a 1.6s pause (40ms grid). */
const AUTOPLAY_STEP_MS = 160;
const AUTOPLAY_COLUMNS = 3;
const LOOP_PAUSE_MS = 1600;

const DEMO_DURATION_MS: Record<MotionPrincipleId, number> = {
  easing: 720,
  timing: 480,
  anticipation: 520,
  "follow-through": 560,
  staging: 520,
  "reduced-motion": 280,
};

/* Subtle organic resting tilt angles (degrees) per card; straightens cleanly on hover. */
const PRINCIPLE_TILTS = [-2.1, 1.5, -1.4, 1.8, -1.7, 1.3] as const;

function PrincipleCard({
  principle,
  index,
}: {
  principle: MotionPrinciple;
  index: number;
}) {
  const prefersReduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const [run, setRun] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Loop automatically while in view with a 1.6s rest between cycles (never under reduced motion).
  useEffect(() => {
    if (!inView || prefersReduced) return;

    const cycleMs = DEMO_DURATION_MS[principle.id] + LOOP_PAUSE_MS;
    const initialDelay = (index % AUTOPLAY_COLUMNS) * AUTOPLAY_STEP_MS;
    let intervalId: number | undefined;

    const startTimer = window.setTimeout(() => {
      setRun((r) => r + 1);
      intervalId = window.setInterval(() => {
        setRun((r) => r + 1);
      }, cycleMs);
    }, initialDelay);

    return () => {
      window.clearTimeout(startTimer);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [inView, prefersReduced, index, principle.id]);

  const state: DemoState = prefersReduced ? "end" : run > 0 ? "play" : "start";
  const Demo = DEMOS[principle.id];
  const tilt = PRINCIPLE_TILTS[index % PRINCIPLE_TILTS.length] ?? 0;

  return (
    <li
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        !prefersReduced
          ? {
              transform: hovered ? "rotate(0deg)" : `rotate(${tilt}deg)`,
              transitionDuration: "var(--duration-base)",
              transitionTimingFunction: "var(--ease-out-soft)",
            }
          : undefined
      }
      className="flex flex-col overflow-hidden rounded-lg border-2 border-line-strong bg-surface shadow-sticker transition-transform"
    >
      {/* Live demo stage (decorative: the text below says what it shows). It sits on a
          pastel, so it always uses the light theme: its paper/ink pieces stay visible
          in Dark and Warm Dark instead of turning near-black. */}
      <div
        aria-hidden="true"
        data-theme="light"
        className={cn(
          "relative h-48 overflow-hidden border-b-2 border-line-strong",
          TONE_BG_CLASSES[principle.tone],
        )}
      >
        <Demo key={run} state={state} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-caption text-text-muted">
          {principle.spec}
        </p>
        <h4
          className={cn(
            "font-display text-balance text-text",
            HEADING_SCALE_CLASSES.h4,
          )}
        >
          {principle.name}
        </h4>
        <p className="font-body text-body font-semibold text-text">
          {principle.rule}
        </p>
        <p className="font-body text-body text-text-muted">{principle.body}</p>
      </div>
    </li>
  );
}

/**
 * MotionPrincipleDemos (Home #motion): six principles, each framed around a live demo
 * that runs on the site's real duration/easing tokens.
 * - Motion OK: each demo loops automatically while in view with a 1.6s pause between runs.
 * - Reduced motion: demos rest calmly at their final pose.
 * - Rule 18: these are frames around live demos, the section's only card group.
 */
export function MotionPrincipleDemos({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {MOTION_PRINCIPLES.map((principle, i) => (
        <PrincipleCard key={principle.id} principle={principle} index={i} />
      ))}
    </ul>
  );
}
