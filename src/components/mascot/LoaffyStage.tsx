"use client";

import { AnimatePresence, motion } from "motion/react";
import { FastForward } from "lucide-react";
import { Loaffy } from "./Loaffy";
import type { Mood, Pose } from "./LoaffyBus";
import { springBouncy } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type HeroStagePhase = "shaking" | "exploding" | "posing" | "settled";

export interface LoaffyStageProps {
  phase?: HeroStagePhase;
  poseBeat?: number;
  onSkip?: () => void;
  reducedMotion?: boolean;
  className?: string;
}

const POSE_BEATS: readonly {
  pose: Pose;
  mood: Mood;
  badge: string;
  toneClass: string;
}[] = [
  {
    pose: "shades",
    mood: "happy",
    badge: "Out of the box!",
    toneClass: "bg-butter",
  },
  {
    pose: "wink",
    mood: "happy",
    badge: "Sharp craft & motion!",
    toneClass: "bg-mint",
  },
  {
    pose: "vibing",
    mood: "curious",
    badge: "Let's build!",
    toneClass: "bg-lilac",
  },
];

const EXPLOSION_CONFETTI = [
  { id: 0, tx: -240, ty: -176, rot: -52, fill: "var(--color-lilac)", kind: "bean" },
  { id: 1, tx: -184, ty: -240, rot: 40, fill: "var(--color-mint)", kind: "star" },
  { id: 2, tx: -72, ty: -264, rot: -28, fill: "var(--color-butter)", kind: "bean" },
  { id: 3, tx: 72, ty: -264, rot: 32, fill: "var(--color-sky)", kind: "star" },
  { id: 4, tx: 192, ty: -232, rot: -44, fill: "var(--color-blush)", kind: "bean" },
  { id: 5, tx: 248, ty: -168, rot: 56, fill: "var(--color-pistachio)", kind: "star" },
  { id: 6, tx: -272, ty: -32, rot: -76, fill: "var(--color-sky)", kind: "flap" },
  { id: 7, tx: 272, ty: -32, rot: 76, fill: "var(--color-butter)", kind: "flap" },
  { id: 8, tx: -200, ty: 88, rot: -36, fill: "var(--color-blush)", kind: "bean" },
  { id: 9, tx: 200, ty: 88, rot: 36, fill: "var(--color-mint)", kind: "bean" },
] as const;

function BigHatchingMysteryBox() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 240"
      width={448}
      height={336}
      role="img"
      aria-label="A large rumbling cardboard box hatching open in the center of the screen"
      style={{ color: "var(--lp-outline)" }}
      className="block h-auto w-80 sm:w-104 md:w-120"
    >
      {/* Ground shadow */}
      <ellipse
        cx={160}
        cy={220}
        rx={108}
        ry={8}
        fill="currentColor"
        opacity={0.16}
      />

      {/* Comic hatch vibration & energy lines around the shaking box */}
      <g stroke="currentColor" strokeWidth={3} strokeLinecap="round">
        <path d="M36,76 Q20,96 36,116" fill="none" />
        <path d="M20,84 Q8,96 20,108" fill="none" />
        <path d="M284,76 Q300,96 284,116" fill="none" />
        <path d="M300,84 Q312,96 300,108" fill="none" />
        <line x1={88} y1={24} x2={72} y2={4} />
        <line x1={160} y1={18} x2={160} y2={2} />
        <line x1={232} y1={24} x2={248} y2={4} />
      </g>

      {/* Pastel sparks popping at the seams */}
      <circle
        cx={60}
        cy={40}
        r={8}
        fill="var(--color-lilac)"
        stroke="currentColor"
        strokeWidth={2}
      />
      <circle
        cx={260}
        cy={36}
        r={8}
        fill="var(--color-mint)"
        stroke="currentColor"
        strokeWidth={2}
      />
      <circle
        cx={160}
        cy={28}
        r={6}
        fill="var(--color-blush)"
        stroke="currentColor"
        strokeWidth={2}
      />

      {/* Top closed lid (bulging upward from Loaffy inside) */}
      <path
        d="M64,76 Q160,40 256,76 L236,104 Q160,84 84,104 Z"
        fill="var(--color-butter)"
        stroke="currentColor"
        strokeWidth={3.4}
        strokeLinejoin="round"
      />

      {/* Front-left box wall */}
      <path
        d="M64,76 L160,96 L160,208 L68,188 Q56,132 64,76 Z"
        fill="var(--color-butter)"
        stroke="currentColor"
        strokeWidth={3.4}
        strokeLinejoin="round"
      />

      {/* Front-right box wall (shaded) */}
      <path
        d="M160,96 L256,76 Q264,132 252,188 L160,208 Z"
        fill="var(--lp-butter-soft)"
        stroke="currentColor"
        strokeWidth={3.4}
        strokeLinejoin="round"
      />

      {/* Lilac packing tape straining across the top seam + hatch crack */}
      <polygon
        points="144,58 176,58 176,128 144,128"
        fill="var(--color-lilac)"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <polyline
        points="152,66 166,82 150,98 168,116"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tilted Blush sticker on the box front */}
      <g transform="translate(108, 148) rotate(-6)">
        <rect
          x={-44}
          y={-16}
          width={88}
          height={32}
          rx={8}
          fill="var(--color-blush)"
          stroke="currentColor"
          strokeWidth={2.5}
        />
        <text
          x={0}
          y={4}
          textAnchor="middle"
          fill="var(--color-on-pastel)"
          fontSize={12}
          fontWeight={800}
          fontFamily="var(--font-mono)"
        >
          HATCHING!
        </text>
      </g>
    </svg>
  );
}

/**
 * Full-Viewport Centered Intro Stage + Compact Hero Mascot:
 * - While `phase !== "settled"`: Renders a full-screen (`fixed inset-0`, `z-modal`)
 *   curtain hiding the header and all Hero texts so the BIG centered Mystery Box
 *   and BIG Loaffy (`size={320}`) pose reel play completely alone in the center of the viewport.
 * - Once `phase === "settled"`: The full-screen curtain exits and a compact, non-intrusive
 *   Loaffy (`size={128}`) sits in the Hero without pose buttons ([P1-A1]).
 */
export function LoaffyStage({
  phase = "settled",
  poseBeat = 0,
  onSkip,
  reducedMotion = false,
  className,
}: LoaffyStageProps) {
  const currentBeat = POSE_BEATS[poseBeat] ?? POSE_BEATS[0];
  const isPlayingIntro = phase !== "settled" && !reducedMotion;

  const introPose: Pose =
    phase === "exploding" ? "jump" : currentBeat.pose;
  const introMood: Mood =
    phase === "exploding" ? "happy" : currentBeat.mood;

  return (
    <>
      {/* 1. Full-Viewport Standalone Landing Intro Curtain (hides Header & Hero texts while playing) */}
      <AnimatePresence>
        {isPlayingIntro && (
          <motion.div
            key="full-viewport-loaffy-intro"
            style={{ zIndex: "var(--z-modal)" }}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 flex h-dvh w-screen items-center justify-center overflow-hidden bg-bg"
          >
            {/* Optional subtle Skip button in corner */}
            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="absolute right-6 top-6 inline-flex min-h-12 items-center gap-2 rounded-pill border border-line bg-surface px-4 font-mono text-caption font-semibold text-text-muted hover:bg-surface-2 hover:text-text"
              >
                <span>Skip</span>
                <FastForward className="h-4 w-4" aria-hidden="true" />
              </button>
            )}

            {/* Dead-center viewport arena */}
            <div className="relative flex items-center justify-center">
              {/* Act 1: Big Shaking Mystery Box */}
              <AnimatePresence>
                {phase === "shaking" && (
                  <motion.div
                    key="big-mystery-box"
                    initial={{ scale: 0.84, opacity: 0, y: -24 }}
                    animate={{
                      opacity: 1,
                      y: [0, -8, 4, -12, 4, -16, 0],
                      rotate: [0, -4, 5, -7, 8, -10, 12, -9, 0],
                      scaleX: [1, 1.07, 0.93, 1.1, 0.91, 1.14, 1],
                      scaleY: [1, 0.93, 1.07, 0.9, 1.12, 0.86, 1.04],
                    }}
                    exit={{
                      scale: 1.4,
                      opacity: 0,
                      transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
                    }}
                    transition={{
                      duration: 0.88,
                      ease: "easeInOut",
                    }}
                    className="flex items-center justify-center"
                  >
                    <BigHatchingMysteryBox />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Act 2: Explosion Burst Ring + Flying Flaps & Pastel Confetti */}
              <AnimatePresence>
                {phase === "exploding" && (
                  <div
                    key="big-box-explosion"
                    aria-hidden="true"
                    className="pointer-events-none absolute flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.4, opacity: 1 }}
                      animate={{ scale: 2.8, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute h-56 w-56 rounded-pill border-4 border-dashed border-line-strong bg-butter/40"
                    />

                    {EXPLOSION_CONFETTI.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ x: 0, y: 16, scale: 0.72, rotate: 0, opacity: 1 }}
                        animate={{
                          x: p.tx,
                          y: p.ty,
                          scale: [1.25, 1, 0],
                          rotate: p.rot,
                          opacity: [1, 1, 0],
                        }}
                        transition={{
                          duration: 0.48,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute"
                      >
                        {p.kind === "flap" ? (
                          <span
                            style={{ backgroundColor: p.fill }}
                            className="block h-10 w-20 rounded-xs border-2 border-line-strong shadow-sticker-sm"
                          />
                        ) : p.kind === "star" ? (
                          <svg
                            viewBox="0 0 32 32"
                            className="h-10 w-10 text-line-strong"
                          >
                            <path
                              d="M16,2 L20,12 L30,16 L20,20 L16,30 L12,20 L2,16 L12,12 Z"
                              fill={p.fill}
                              stroke="currentColor"
                              strokeWidth={2.5}
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <span
                            style={{ backgroundColor: p.fill }}
                            className="block h-7 w-10 rounded-pill border-2 border-line-strong"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Acts 2 & 3: BIG Loaffy (320px) Jumping Out & Hitting Quick Poses */}
              {phase !== "shaking" && (
                <motion.div
                  key="big-intro-loaffy"
                  initial={{ opacity: 0, y: 80, scale: 0.56 }}
                  animate={
                    phase === "exploding"
                      ? { opacity: 1, y: -56, scale: 1.12 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  transition={springBouncy}
                  className="relative z-10 flex flex-col items-center"
                >
                  <AnimatePresence mode="wait">
                    {phase === "posing" && (
                      <motion.span
                        key={currentBeat.badge}
                        initial={{ opacity: 0, y: 12, scale: 0.84, rotate: -4 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: -3 }}
                        exit={{ opacity: 0, y: -8, scale: 0.88 }}
                        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "mb-4 whitespace-nowrap rounded-pill border-2 border-line-strong px-6 py-2 font-display text-h4 font-bold text-on-pastel shadow-sticker-sm",
                          currentBeat.toneClass
                        )}
                      >
                        {currentBeat.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <Loaffy
                    form="paw"
                    pose={introPose}
                    mood={introMood}
                    size={320}
                    track={false}
                    blink={false}
                    showGroundShadow
                    label="Loaffy jumping out of the hatching box"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Compact Settled Mascot in the Hero Section (size 128 — rendered only once settled) */}
      {!isPlayingIntro && (
        <div className={cn("flex items-center justify-center", className)}>
          <Loaffy
            form="paw-3d"
            pose="loaf"
            mood="calm"
            size={128}
            track
            blink
            showGroundShadow
            label="Loaffy the ginger cat pawprint mascot"
          />
        </div>
      )}
    </>
  );
}
