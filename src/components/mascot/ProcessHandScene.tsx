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
import { cn } from "@/lib/cn";
import { handTiming } from "@/lib/motion";
import { CatHand, type CatHandAction } from "./CatHand";
import { HandSketch } from "./HandSketch";
import type { ProcessIllustrationId } from "@/components/sections/ProcessIllustrations";

export interface ProcessHandSceneProps {
  kind: ProcessIllustrationId;
  /** Scroll-driven 0..1 progress when pinned on desktop. */
  scrub?: MotionValue<number>;
  /** Trigger timed playback when activated (hover, click, mobile). */
  play?: boolean;
  /** Pixel size of the CatHand frame on the 8px grid. */
  handSize: number;
  className?: string;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const ENTER_END = 0.2;
const WORK_END = 0.86;
/* Timed playback total (40ms grid): enter 480 + work 960 + hold 400 + exit 280 = 2120ms */
const TIMED_TOTAL = handTiming.enter + 0.96 + 0.4 + handTiming.exit;
const TIMED_TIMES = [
  0,
  handTiming.enter / TIMED_TOTAL,
  (handTiming.enter + 0.96) / TIMED_TOTAL,
  (handTiming.enter + 0.96 + 0.4) / TIMED_TOTAL,
  1,
];

function reachAt(v: number) {
  if (v <= 0 || v >= 1) return 0;
  if (v < ENTER_END) {
    const a = v / ENTER_END;
    return 1 - (1 - a) * (1 - a);
  }
  if (v <= WORK_END) return 1;
  const b = (v - WORK_END) / (1 - WORK_END);
  return 1 - b * b;
}

function workAt(v: number) {
  return clamp01((v - ENTER_END) / (WORK_END - ENTER_END));
}

function useSceneTimeline(
  scrub: MotionValue<number> | undefined,
  play: boolean,
  prefersReduced: boolean,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.5 });
  const local = useMotionValue(prefersReduced ? WORK_END : 0);
  const timedRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (prefersReduced) {
      timedRef.current?.stop();
      local.set(WORK_END);
    }
  }, [prefersReduced, local]);

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

  useEffect(() => {
    if (!play || prefersReduced) return;
    const s = scrub?.get();
    if (s !== undefined && s > 0 && s < 1) {
      local.set(s);
      return;
    }
    timedRef.current?.stop();
    timedRef.current = animate(local, [0, ENTER_END, WORK_END, WORK_END, 1], {
      duration: TIMED_TOTAL,
      times: TIMED_TIMES,
      ease: ["easeOut", "linear", "linear", "easeIn"],
    });
    return () => {
      timedRef.current?.stop();
      timedRef.current = null;
    };
  }, [play, inView, prefersReduced, scrub, local]);

  return { rootRef, local };
}

/* ── 01 · Understand: paw inspects & taps 3 research question notes ────────── */
const QUESTION_STOPS = [24, 50, 76] as const;

function HandUnderstand({
  scrub,
  play,
  handSize,
  className,
}: Omit<ProcessHandSceneProps, "kind">) {
  const prefersReduced = useReducedMotion() ?? false;
  const { rootRef, local } = useSceneTimeline(scrub, Boolean(play), prefersReduced);
  const [litCount, setLitCount] = useState(prefersReduced ? 3 : 0);
  const [tapKey, setTapKey] = useState(0);

  useMotionValueEvent(local, "change", (v) => {
    if (prefersReduced) return;
    const w = workAt(v);
    const next = w <= 0.05 ? 0 : w < 0.36 ? 1 : w < 0.68 ? 2 : 3;
    setLitCount((cur) => {
      if (next > cur) setTapKey((k) => k + 1);
      return cur === next ? cur : next;
    });
  });

  const handLeft = useTransform(local, (v) => {
    const w = workAt(v);
    const x =
      w < 0.5
        ? QUESTION_STOPS[0] + (QUESTION_STOPS[1] - QUESTION_STOPS[0]) * (w / 0.5)
        : QUESTION_STOPS[1] +
          (QUESTION_STOPS[2] - QUESTION_STOPS[1]) * ((w - 0.5) / 0.5);
    return `${x}%`;
  });

  const handY = useTransform(local, (v) => `${100 - 62 * reachAt(v)}%`);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {/* 3 research question cards illuminated as the paw inspects each one */}
      <div className="absolute inset-x-4 top-4 flex items-center justify-around gap-2">
        {["?", "?!", "✓"].map((glyph, i) => {
          const lit = i < litCount;
          return (
            <motion.span
              key={glyph}
              initial={false}
              animate={
                lit
                  ? { y: -3, scale: 1.06, opacity: 1 }
                  : { y: 0, scale: 0.94, opacity: 0.5 }
              }
              transition={{ duration: prefersReduced ? 0 : 0.2 }}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-sm border-2 border-on-pastel font-display text-body-lg font-extrabold text-on-pastel",
                lit ? "bg-surface shadow-sticker-sm" : "bg-bg/70",
              )}
            >
              {glyph}
            </motion.span>
          );
        })}
      </div>

      <motion.div
        className="absolute top-0 aspect-square h-full"
        style={{ left: handLeft, x: "-50%", y: handY }}
      >
        <CatHand
          side="beans"
          claws={false}
          size={handSize}
          action={litCount > 0 && !prefersReduced ? "tap" : "idle"}
          playKey={tapKey}
          decorative
          className="block h-full w-full"
        />
      </motion.div>
    </div>
  );
}

/* ── 03 · Design: paw snaps & aligns 3 UI system blocks onto a grid ────────── */
function HandDesign({
  scrub,
  play,
  handSize,
  className,
}: Omit<ProcessHandSceneProps, "kind">) {
  const prefersReduced = useReducedMotion() ?? false;
  const { rootRef, local } = useSceneTimeline(scrub, Boolean(play), prefersReduced);
  const [snapped, setSnapped] = useState(prefersReduced ? 3 : 0);
  const [tapKey, setTapKey] = useState(0);

  useMotionValueEvent(local, "change", (v) => {
    if (prefersReduced) return;
    const w = workAt(v);
    const next = w < 0.15 ? 0 : w < 0.45 ? 1 : w < 0.75 ? 2 : 3;
    setSnapped((cur) => {
      if (next > cur) setTapKey((k) => k + 1);
      return cur === next ? cur : next;
    });
  });

  const handLeft = useTransform(local, (v) => `${26 + workAt(v) * 48}%`);
  const handY = useTransform(local, (v) => `${100 - 58 * reachAt(v)}%`);

  const pieces = [
    { offX: -12, offY: -10, rot: -12, cls: "h-7 w-14 rounded-pill bg-butter" },
    { offX: 8, offY: 12, rot: 10, cls: "h-7 w-10 rounded-xs bg-mint" },
    { offX: 14, offY: -8, rot: -8, cls: "h-7 w-12 rounded-sm bg-surface" },
  ];

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {/* Subtle 4/8 grid snap guides */}
      <svg
        viewBox="0 0 160 96"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-35"
      >
        <line
          x1={16}
          y1={36}
          x2={144}
          y2={36}
          stroke="var(--color-on-pastel)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        <line
          x1={56}
          y1={12}
          x2={56}
          y2={64}
          stroke="var(--color-on-pastel)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        <line
          x1={104}
          y1={12}
          x2={104}
          y2={64}
          stroke="var(--color-on-pastel)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
      </svg>

      {/* Modular tokens snapping cleanly into line */}
      <div className="absolute inset-x-4 top-5 flex items-center justify-center gap-2">
        {pieces.map((p, i) => {
          const placed = i < snapped;
          return (
            <motion.span
              key={i}
              initial={false}
              animate={
                placed
                  ? { x: 0, y: 0, rotate: 0, opacity: 1 }
                  : { x: p.offX, y: p.offY, rotate: p.rot, opacity: 0.65 }
              }
              transition={{ duration: prefersReduced ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              className={cn("border-2 border-on-pastel shadow-sticker-sm", p.cls)}
            />
          );
        })}
      </div>

      <motion.div
        className="absolute top-0 aspect-square h-full"
        style={{ left: handLeft, x: "-50%", y: handY }}
      >
        <CatHand
          side="fur"
          claws={false}
          size={handSize}
          action={snapped > 0 && !prefersReduced ? "tap" : "idle"}
          playKey={tapKey}
          decorative
          className="block h-full w-full"
        />
      </motion.div>
    </div>
  );
}

/* ── 04 · Motion: paw bats a spring ball along an easing arc ───────────────── */
function HandMotion({
  scrub,
  play,
  handSize,
  className,
}: Omit<ProcessHandSceneProps, "kind">) {
  const prefersReduced = useReducedMotion() ?? false;
  const { rootRef, local } = useSceneTimeline(scrub, Boolean(play), prefersReduced);
  const [batted, setBatted] = useState(prefersReduced);
  const [batKey, setBatKey] = useState(0);

  useMotionValueEvent(local, "change", (v) => {
    if (prefersReduced) return;
    const hit = workAt(v) >= 0.22;
    setBatted((cur) => {
      if (hit && !cur) setBatKey((k) => k + 1);
      return cur === hit ? cur : hit;
    });
  });

  // Ball glides smoothly along a curved arc after the paw bats it
  const ballProgress = useTransform(local, (v) => {
    const w = clamp01((workAt(v) - 0.18) / 0.72);
    // Ease-out curve
    return 1 - Math.pow(1 - w, 3);
  });
  const ballLeft = useTransform(ballProgress, (t) => `${18 + t * 66}%`);
  const ballTop = useTransform(
    ballProgress,
    (t) => `${52 - Math.sin(t * Math.PI) * 32}%`,
  );
  const ghost1Left = useTransform(ballProgress, (t) => `${18 + Math.max(0, t - 0.14) * 66}%`);
  const ghost1Top = useTransform(
    ballProgress,
    (t) => `${52 - Math.sin(Math.max(0, t - 0.14) * Math.PI) * 32}%`,
  );
  const handY = useTransform(local, (v) => `${100 - 66 * reachAt(v)}%`);

  const handAction: CatHandAction =
    batted && !prefersReduced ? "bat" : "idle";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {/* Dashed easing arc */}
      <svg
        viewBox="0 0 160 96"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-55"
      >
        <path
          d="M28,56 Q80,14 134,56"
          fill="none"
          stroke="var(--color-on-pastel)"
          strokeWidth={2}
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
      </svg>

      {/* Trailing motion ghost + primary dot */}
      <motion.span
        style={{ left: ghost1Left, top: ghost1Top, x: "-50%", y: "-50%" }}
        className="absolute h-5 w-5 rounded-pill border-2 border-dashed border-on-pastel/55 bg-surface/50"
      />
      <motion.span
        style={{ left: ballLeft, top: ballTop, x: "-50%", y: "-50%" }}
        className="absolute h-7 w-7 rounded-pill border-2 border-on-pastel bg-surface shadow-sticker-sm"
      />

      {/* Cat hand rises on the left-bottom and bats the ball across the arc */}
      <motion.div
        className="absolute top-0 left-[26%] aspect-square h-full"
        style={{ x: "-50%", y: handY }}
      >
        <CatHand
          side="fur"
          angle={18}
          claws={false}
          size={handSize}
          action={handAction}
          playKey={batKey}
          decorative
          className="block h-full w-full"
        />
      </motion.div>
    </div>
  );
}

/* ── 05 · Ship: paw checks off a 2-step QA list ("check it twice") ─────────── */
function HandShip({
  scrub,
  play,
  handSize,
  className,
}: Omit<ProcessHandSceneProps, "kind">) {
  const prefersReduced = useReducedMotion() ?? false;
  const { rootRef, local } = useSceneTimeline(scrub, Boolean(play), prefersReduced);
  const [checks, setChecks] = useState(prefersReduced ? 2 : 0);
  const [tapKey, setTapKey] = useState(0);

  useMotionValueEvent(local, "change", (v) => {
    if (prefersReduced) return;
    const w = workAt(v);
    const next = w < 0.25 ? 0 : w < 0.62 ? 1 : 2;
    setChecks((cur) => {
      if (next > cur) setTapKey((k) => k + 1);
      return cur === next ? cur : next;
    });
  });

  const handLeft = useTransform(local, (v) => `${36 + workAt(v) * 28}%`);
  const handY = useTransform(local, (v) => `${100 - 60 * reachAt(v)}%`);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {/* Two-item QA checklist ("check it twice") */}
      <div className="absolute inset-x-5 top-4 flex flex-col gap-2">
        {["Build & a11y", "Shipped live"].map((label, i) => {
          const done = i < checks;
          return (
            <div
              key={label}
              className="flex items-center gap-2 rounded-sm border-2 border-on-pastel bg-surface px-3 py-1.5 shadow-sticker-sm"
            >
              <span
                className={cn(
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border-2 border-on-pastel font-mono text-caption font-bold text-on-pastel transition-colors",
                  done ? "bg-butter" : "bg-bg",
                )}
              >
                {done ? "✓" : ""}
              </span>
              <span className="truncate font-mono text-caption font-semibold text-on-pastel">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Beans-side paw stamps both checks */}
      <motion.div
        className="absolute top-0 aspect-square h-full"
        style={{ left: handLeft, x: "-50%", y: handY }}
      >
        <CatHand
          side="beans"
          claws={false}
          size={handSize}
          action={checks > 0 && !prefersReduced ? "tap" : "idle"}
          playKey={tapKey}
          decorative
          className="block h-full w-full"
        />
      </motion.div>
    </div>
  );
}

/**
 * ProcessHandScene ([P3-A1]): five distinct, title-meaningful Cat Hand animations
 * for the "How I think and ship." cards, sharing the exact scrub + timed architecture
 * as Card 2 (Shape / HandSketch).
 */
export function ProcessHandScene({
  kind,
  scrub,
  play = false,
  handSize,
  className,
}: ProcessHandSceneProps) {
  switch (kind) {
    case "understand":
      return (
        <HandUnderstand
          scrub={scrub}
          play={play}
          handSize={handSize}
          className={className}
        />
      );
    case "shape":
      return (
        <HandSketch
          scrub={scrub}
          play={play}
          handSize={handSize}
          className={className}
        />
      );
    case "design":
      return (
        <HandDesign
          scrub={scrub}
          play={play}
          handSize={handSize}
          className={className}
        />
      );
    case "motion":
      return (
        <HandMotion
          scrub={scrub}
          play={play}
          handSize={handSize}
          className={className}
        />
      );
    case "ship":
      return (
        <HandShip
          scrub={scrub}
          play={play}
          handSize={handSize}
          className={className}
        />
      );
  }
}
