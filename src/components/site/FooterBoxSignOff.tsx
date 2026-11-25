"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE_BURST = [0.16, 1, 0.3, 1] as const;
const EASE_PRESSURE = [0.68, 0, 0.88, 0.12] as const;

/* Four subtle pastel burst sparks radiating softly when the box pops open (all tokens, zero raw hex). */
const BOX_SPARKS = [
  { id: "s1", tx: -46, ty: -42, rot: -28, fill: "var(--color-lilac)", kind: "bean" },
  { id: "s2", tx: -20, ty: -58, rot: 18, fill: "var(--color-mint)", kind: "star" },
  { id: "s3", tx: 22, ty: -56, rot: -16, fill: "var(--color-butter)", kind: "star" },
  { id: "s4", tx: 46, ty: -40, rot: 26, fill: "var(--color-blush)", kind: "bean" },
] as const;

type BoxPhase = "closed" | "tremor" | "swell" | "popped";

/**
 * FooterBoxSignOff ([P3-A2] & [P1-A1]):
 * Monumental "Think Outside the [Box]" sign-off echoing the Landing Page box-hatch:
 * 1. Starts as a completely sealed, closed cardboard box — "Box" text is NOT rendered/visible yet.
 * 2. When scrolled into view: trembles (280ms) -> swells with pressure (280ms), still sealed.
 * 3. Pops open (`popped`): flaps burst outward, subtle shockwave + 4 pastel sparks fire,
 *    and the tilted "Box" word springs UP out of the open box mouth (true z-layering between
 *    back cavity and front wall).
 * 4. Hovering/tapping replays cleanly by snapping shut to `tremor` synchronously first.
 */
export function FooterBoxSignOff() {
  const prefersReduced = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.55 });
  const [phase, setPhase] = useState<BoxPhase>(prefersReduced ? "popped" : "closed");
  const [replayKey, setReplayKey] = useState(0);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  useEffect(() => {
    clearTimers();
    if (prefersReduced) {
      const id = window.setTimeout(() => setPhase("popped"), 0);
      timersRef.current = [id];
      return clearTimers;
    }
    if (!inView && replayKey === 0) return;

    // 0ms: sealed tremor -> 280ms: pressure swell -> 560ms: burst open & pop "Box" out (all 40ms grid)
    const tTremor = window.setTimeout(() => setPhase("tremor"), 0);
    const tSwell = window.setTimeout(() => setPhase("swell"), 280);
    const tPop = window.setTimeout(() => setPhase("popped"), 560);
    timersRef.current = [tTremor, tSwell, tPop];
    return clearTimers;
  }, [inView, prefersReduced, replayKey]);

  const isPopped = prefersReduced || phase === "popped";
  const isTremor = !prefersReduced && phase === "tremor";
  const isSwell = !prefersReduced && phase === "swell";

  const triggerReplay = () => {
    if (prefersReduced || phase === "tremor" || phase === "swell") return;
    // Synchronously hide "Box" & close the box BEFORE replaying so "Box" never shows pre-explosion
    clearTimers();
    setPhase("tremor");
    setReplayKey((k) => k + 1);
  };

  const rigAnimate = isTremor
    ? {
        scaleX: [1, 1.06, 0.96, 1.08, 1],
        scaleY: [1, 0.94, 1.04, 0.92, 1],
        rotate: [0, -3, 3, -4, 0],
        y: [0, -2, 0, -2, 0],
      }
    : isSwell
      ? {
          scaleX: [1, 1.08, 1.16, 1.2],
          scaleY: [1, 0.92, 0.86, 0.82],
          rotate: [0, -4, 5, -6, 5, 0],
          y: [0, 2, 4, 6],
        }
      : isPopped && !prefersReduced
        ? {
            scaleX: [1.14, 0.94, 1],
            scaleY: [0.88, 1.08, 1],
            rotate: 0,
            y: 0,
          }
        : { scaleX: 1, scaleY: 1, rotate: 0, y: 0 };

  const rigTransition = prefersReduced
    ? { duration: 0 }
    : isSwell
      ? { duration: 0.28, ease: EASE_PRESSURE }
      : { duration: isTremor ? 0.28 : 0.4, ease: EASE_BURST };

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative -mx-4 mt-4 select-none overflow-hidden px-1 pt-12 md:-mx-10 md:px-2 md:pt-20 lg:-mx-20 lg:px-4 lg:pt-24"
    >
      <p className="relative translate-y-[30%] whitespace-nowrap text-center font-display text-[clamp(2rem,9.4vw,13.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-text">
        Think Outside the{" "}
        <span
          onMouseEnter={triggerReplay}
          onClick={triggerReplay}
          className="relative ml-[0.04em] inline-flex cursor-pointer flex-col items-center align-baseline"
        >
          {/* Subtle pastel shockwave + sparks — ONLY mounted once exploded */}
          {!prefersReduced && isPopped && (
            <span
              key={`sparks-${replayKey}`}
              className="pointer-events-none absolute -top-[0.16em] left-1/2 z-30"
            >
              <motion.span
                initial={{ scale: 0.2, opacity: 0.85 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.48, ease: EASE_BURST }}
                className="absolute -left-[0.28em] -top-[0.28em] block h-[0.56em] w-[0.56em] rounded-pill border-2 border-line-strong bg-butter/40"
              />
              {BOX_SPARKS.map((s) => (
                <motion.span
                  key={s.id}
                  initial={{ x: 0, y: 0, scale: 0.4, opacity: 0.95, rotate: 0 }}
                  animate={{
                    x: `${s.tx}%`,
                    y: `${s.ty}%`,
                    scale: [0.5, 1.05, 0],
                    opacity: [0.95, 0.9, 0],
                    rotate: s.rot,
                  }}
                  transition={{ duration: 0.64, ease: EASE_BURST }}
                  className="absolute -left-2 -top-2 block h-[0.14em] w-[0.14em]"
                >
                  {s.kind === "star" ? (
                    <svg viewBox="0 0 24 24" className="h-full w-full">
                      <path
                        d="M12,2 L15,9 L22,12 L15,15 L12,22 L9,15 L2,12 L9,9 Z"
                        fill={s.fill}
                        stroke="var(--color-line-strong)"
                        strokeWidth={2}
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span
                      style={{ backgroundColor: s.fill }}
                      className="block h-full w-full rounded-pill border-2 border-line-strong"
                    />
                  )}
                </motion.span>
              ))}
            </span>
          )}

          {/* Tilted "Box" word — STRICTLY hidden/unmounted until the box actually bursts open */}
          {isPopped && (
            <motion.span
              key={`box-word-${replayKey}`}
              initial={
                prefersReduced
                  ? false
                  : { y: "72%", scale: 0.32, opacity: 0, rotate: 6 }
              }
              animate={
                prefersReduced
                  ? { y: "0%", scale: 1, opacity: 1, rotate: -10 }
                  : {
                      y: ["72%", "-14%", "0%"],
                      scale: [0.32, 1.1, 1],
                      opacity: [0, 1, 1],
                      rotate: [6, -13, -10],
                    }
              }
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      duration: 0.56,
                      times: [0, 0.58, 1],
                      ease: EASE_BURST,
                    }
              }
              className="pointer-events-none absolute -top-[0.62em] left-1/2 z-20 -translate-x-1/2 text-[0.68em] leading-none"
            >
              Box
            </motion.span>
          )}

          {/* Animated cardboard box rig: completely sealed until `popped`, then flaps burst open */}
          <motion.svg
            viewBox="0 0 120 104"
            aria-hidden="true"
            initial={false}
            animate={rigAnimate}
            transition={rigTransition}
            style={{ transformOrigin: "50% 85%" }}
            className="relative z-10 block h-[0.86em] w-[1.02em] overflow-visible"
          >
            {isPopped ? (
              <>
                {/* OPEN STATE: Inner cavity + open back flap + open front wall & bursting wing flaps */}
                <polygon
                  points="24,38 96,38 90,88 30,88"
                  fill="var(--color-on-pastel)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={4}
                  strokeLinejoin="round"
                />
                <motion.polygon
                  points="24,38 36,16 84,16 96,38"
                  fill="var(--color-butter-soft)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={4}
                  strokeLinejoin="round"
                  initial={prefersReduced ? false : { y: 18, scaleY: 0.15, opacity: 0 }}
                  animate={{ y: 0, scaleY: 1, opacity: 1 }}
                  transition={{ duration: prefersReduced ? 0 : 0.36, ease: EASE_BURST }}
                  style={{ transformOrigin: "60px 38px" }}
                />
                <polygon
                  points="24,42 96,42 90,94 30,94"
                  fill="var(--color-butter)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={4}
                  strokeLinejoin="round"
                />
                <motion.polygon
                  points="24,42 6,28 16,12 34,26"
                  fill="var(--color-butter-soft)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={4}
                  strokeLinejoin="round"
                  initial={prefersReduced ? false : { rotate: 52, scale: 0.7 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: prefersReduced ? 0 : 0.4, ease: EASE_BURST }}
                  style={{ transformOrigin: "24px 42px" }}
                />
                <motion.polygon
                  points="96,42 114,28 104,12 86,26"
                  fill="var(--color-butter-soft)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={4}
                  strokeLinejoin="round"
                  initial={prefersReduced ? false : { rotate: -52, scale: 0.7 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: prefersReduced ? 0 : 0.4, ease: EASE_BURST }}
                  style={{ transformOrigin: "96px 42px" }}
                />
                {/* Torn front tape stub */}
                <rect
                  x={54}
                  y={42}
                  width={12}
                  height={22}
                  rx={2}
                  fill="var(--color-lilac)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={3.5}
                />
              </>
            ) : (
              <>
                {/* SEALED / CLOSED STATE: Flat closed top lid, sealed seam tape, zero open flaps */}
                <polygon
                  points="24,42 96,42 90,94 30,94"
                  fill="var(--color-butter)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={4}
                  strokeLinejoin="round"
                />
                {/* Closed top lid bevel */}
                <polygon
                  points="24,42 32,30 88,30 96,42"
                  fill="var(--color-butter-soft)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={4}
                  strokeLinejoin="round"
                />
                {/* Center seam line across closed top */}
                <line
                  x1={60}
                  y1={30}
                  x2={60}
                  y2={42}
                  stroke="var(--color-line-strong)"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Intact lilac packing tape sealing the closed lid down onto the front wall */}
                <polygon
                  points="54,30 66,30 66,64 54,64"
                  fill="var(--color-lilac)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={3.5}
                  strokeLinejoin="round"
                />
              </>
            )}
          </motion.svg>
        </span>
      </p>
    </div>
  );
}
