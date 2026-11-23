"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Loaffy } from "./Loaffy";
import { emitLoaffyTrigger } from "./LoaffyBus";
import { Sticker } from "@/components/ui/Sticker";
import { springCalm } from "@/lib/motion";

const HERO_INTRO_STORAGE_KEY = "lp-hero-intro-seen";

export interface LoaffyStageProps {
  className?: string;
}

/**
 * Hero composition per COMPONENTS.md §B & LOAFFY-ANIMATION.md §6.1:
 * - Loaffy in the `loaf` pose sitting OUTSIDE an open cardboard box with a visible gap.
 * - First visit in session plays the 1200ms hero intro choreography (0-320 box drop,
 *   240-720 Loaffy land above box, 880 blink, 880-1200 stickers stamp in).
 * - Return visits in the same session or reduced motion render the final frame immediately.
 */
export function LoaffyStage({ className }: LoaffyStageProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const [playIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const seen = window.sessionStorage.getItem(HERO_INTRO_STORAGE_KEY);
      return !seen;
    } catch {
      return false;
    }
  });

  const shouldAnimateIntro = playIntro && !prefersReduced;

  useEffect(() => {
    if (!shouldAnimateIntro) return;
    try {
      window.sessionStorage.setItem(HERO_INTRO_STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors
    }

    const landTimer = window.setTimeout(() => {
      emitLoaffyTrigger("land");
    }, 240);

    const blinkTimer = window.setTimeout(() => {
      emitLoaffyTrigger("blink");
    }, 880);

    return () => {
      window.clearTimeout(landTimer);
      window.clearTimeout(blinkTimer);
    };
  }, [shouldAnimateIntro]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${
        className ?? ""
      }`}
    >
      {/* 1. Loaffy sitting OUTSIDE (above) the open box with a visible 16px (gap-4) space */}
      <motion.div
        initial={
          shouldAnimateIntro ? { opacity: 0, y: -32 } : { opacity: 1, y: 0 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldAnimateIntro
            ? {
                duration: 0.48,
                delay: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }
            : { duration: 0 }
        }
        className="relative z-10 flex flex-col items-center"
      >
        <Loaffy
          pose="loaf"
          size={240}
          track
          blink
          showGroundShadow
          label="Loaffy sitting calmly in a loaf pose outside an open box"
        />
      </motion.div>

      {/* Visible 16px gap between Loaffy and the open box below */}
      <div className="h-4 w-full shrink-0" aria-hidden="true" />

      {/* 2. Open Cardboard Box (separate below Loaffy so they never touch or overlap) */}
      <motion.div
        initial={
          shouldAnimateIntro
            ? { opacity: 0, y: -40, scaleX: 0.96, scaleY: 1.04 }
            : { opacity: 1, y: 0, scaleX: 1, scaleY: 1 }
        }
        animate={{
          opacity: 1,
          y: 0,
          scaleX: shouldAnimateIntro ? [0.96, 1.04, 1] : 1,
          scaleY: shouldAnimateIntro ? [1.04, 0.96, 1] : 1,
        }}
        transition={
          shouldAnimateIntro
            ? {
                duration: 0.32,
                times: [0, 0.75, 1],
                ease: [0.22, 1, 0.36, 1],
              }
            : { duration: 0 }
        }
        className="relative flex flex-col items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 280 128"
          width={280}
          height={128}
          role="img"
          aria-label="An open cardboard box sitting empty below Loaffy"
          style={{ color: "var(--lp-outline)" }}
          className="block h-auto w-64 sm:w-72"
        >
          {/* Ground shadow under the box */}
          <ellipse
            cx={140}
            cy={120}
            rx={108}
            ry={6}
            fill="currentColor"
            opacity={0.14}
          />

          {/* Back inside wall of the open box */}
          <polygon
            points="64,36 216,36 204,76 76,76"
            fill="var(--lp-surface-2)"
            stroke="currentColor"
            strokeWidth={3.4}
            strokeLinejoin="round"
          />

          {/* Left open flap */}
          <polygon
            points="64,36 24,16 36,52 76,56"
            fill="var(--color-butter)"
            stroke="currentColor"
            strokeWidth={3.4}
            strokeLinejoin="round"
          />

          {/* Right open flap */}
          <polygon
            points="216,36 256,16 244,52 204,56"
            fill="var(--color-butter)"
            stroke="currentColor"
            strokeWidth={3.4}
            strokeLinejoin="round"
          />

          {/* Front-left box wall */}
          <polygon
            points="64,36 140,52 140,112 64,96"
            fill="var(--color-butter)"
            stroke="currentColor"
            strokeWidth={3.4}
            strokeLinejoin="round"
          />

          {/* Front-right box wall (shaded) */}
          <polygon
            points="140,52 216,36 216,96 140,112"
            fill="var(--lp-butter-soft)"
            stroke="currentColor"
            strokeWidth={3.4}
            strokeLinejoin="round"
          />

          {/* Front open flap folded down */}
          <polygon
            points="64,36 140,52 128,76 52,60"
            fill="var(--lp-surface)"
            stroke="currentColor"
            strokeWidth={3.4}
            strokeLinejoin="round"
          />
          <polygon
            points="140,52 216,36 228,60 152,76"
            fill="var(--lp-surface)"
            stroke="currentColor"
            strokeWidth={3.4}
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* 3. Smash Sticker (stamps in at 880ms during intro choreography §6.1) */}
      <motion.div
        initial={
          shouldAnimateIntro
            ? { opacity: 0, scale: 1.2, rotate: 0 }
            : { opacity: 1, scale: 1, rotate: 0 }
        }
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={
          shouldAnimateIntro
            ? {
                ...springCalm,
                delay: 0.88,
              }
            : { duration: 0 }
        }
        className="mt-6"
      >
        <Sticker tone="blush" rotate={-2} size="md">
          Everyone designs with AI now. It all looks like slop.{" "}
          <span className="inline-block rounded-xs border border-line-strong bg-butter px-2 py-0.5 font-display font-bold text-on-pastel">
            Except mine.
          </span>
        </Sticker>
      </motion.div>
    </div>
  );
}
