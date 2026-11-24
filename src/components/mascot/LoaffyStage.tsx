"use client";

import { AnimatePresence, motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { Loaffy } from "./Loaffy";
import type { Mood, Pose } from "./LoaffyBus";
import { springBouncy, springCalm } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type HeroStagePhase = "shaking" | "exploding" | "posing" | "settled";

export interface LoaffyStageProps {
  phase?: HeroStagePhase;
  poseBeat?: number;
  activePoseOverride?: Pose | null;
  onSelectPose?: (pose: Pose | null) => void;
  onReplay?: () => void;
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

const INTERACTIVE_POSES: readonly { label: string; pose: Pose }[] = [
  { label: "Loaf", pose: "loaf" },
  { label: "Shades", pose: "shades" },
  { label: "Wink", pose: "wink" },
  { label: "Vibing", pose: "vibing" },
  { label: "Jump", pose: "jump" },
];

const EXPLOSION_CONFETTI = [
  { id: 0, tx: -168, ty: -120, rot: -48, fill: "var(--color-lilac)", kind: "bean" },
  { id: 1, tx: -128, ty: -168, rot: 36, fill: "var(--color-mint)", kind: "star" },
  { id: 2, tx: -56, ty: -184, rot: -24, fill: "var(--color-butter)", kind: "bean" },
  { id: 3, tx: 56, ty: -184, rot: 28, fill: "var(--color-sky)", kind: "star" },
  { id: 4, tx: 136, ty: -160, rot: -40, fill: "var(--color-blush)", kind: "bean" },
  { id: 5, tx: 176, ty: -112, rot: 52, fill: "var(--color-pistachio)", kind: "star" },
  { id: 6, tx: -192, ty: -24, rot: -72, fill: "var(--color-sky)", kind: "flap" },
  { id: 7, tx: 192, ty: -24, rot: 72, fill: "var(--color-butter)", kind: "flap" },
  { id: 8, tx: -136, ty: 56, rot: -32, fill: "var(--color-blush)", kind: "bean" },
  { id: 9, tx: 136, ty: 56, rot: 32, fill: "var(--color-mint)", kind: "bean" },
] as const;

function HatchingMysteryBox() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 240"
      width={320}
      height={240}
      role="img"
      aria-label="A rumbling cardboard box about to burst open"
      style={{ color: "var(--lp-outline)" }}
      className="block h-auto w-64 sm:w-72"
    >
      {/* Ground shadow */}
      <ellipse
        cx={160}
        cy={220}
        rx={104}
        ry={8}
        fill="currentColor"
        opacity={0.16}
      />

      {/* Comic hatch vibration & energy lines around the shaking box */}
      <g stroke="currentColor" strokeWidth={3} strokeLinecap="round">
        <path d="M36,76 Q24,96 36,116" fill="none" />
        <path d="M24,84 Q12,96 24,108" fill="none" />
        <path d="M284,76 Q296,96 284,116" fill="none" />
        <path d="M296,84 Q308,96 296,108" fill="none" />
        <line x1={88} y1={24} x2={76} y2={8} />
        <line x1={160} y1={18} x2={160} y2={4} />
        <line x1={232} y1={24} x2={244} y2={8} />
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

      {/* Top closed lid (bulging upward from Loaffy inside!) */}
      <path
        d="M64,76 Q160,44 256,76 L236,104 Q160,84 84,104 Z"
        fill="var(--color-butter)"
        stroke="currentColor"
        strokeWidth={3.4}
        strokeLinejoin="round"
      />

      {/* Front-left box wall (slightly bulging) */}
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
        points="144,60 176,60 176,128 144,128"
        fill="var(--color-lilac)"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <polyline
        points="152,68 166,84 150,100 168,116"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tilted Blush "THINK OUTSIDE" sticker on the box front */}
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
 * Centered theatrical Loaffy Hero Stage ([P1-A2]):
 * 1. `shaking` (0–720ms): Closed cardboard box rumbles, bulges, and hatches.
 * 2. `exploding` (720–1120ms): Box bursts apart & disappears while Loaffy jumps out!
 * 3. `posing` (1120–2080ms): Loaffy strikes 3 quick poses (`shades` → `wink` → `vibing`).
 * 4. `settled` (2080ms+): Loaffy settles in `paw-3d` / `loaf` with interactive pose pills + Replay button.
 */
export function LoaffyStage({
  phase = "settled",
  poseBeat = 0,
  activePoseOverride = null,
  onSelectPose,
  onReplay,
  reducedMotion = false,
  className,
}: LoaffyStageProps) {
  const currentBeat = POSE_BEATS[poseBeat] ?? POSE_BEATS[0];

  const resolvedPose: Pose = (() => {
    if (activePoseOverride) return activePoseOverride;
    if (phase === "exploding") return "jump";
    if (phase === "posing") return currentBeat.pose;
    return "loaf";
  })();

  const resolvedMood: Mood = (() => {
    if (activePoseOverride === "jump" || activePoseOverride === "wink" || activePoseOverride === "shades") {
      return "happy";
    }
    if (activePoseOverride === "vibing") return "curious";
    if (phase === "exploding") return "happy";
    if (phase === "posing") return currentBeat.mood;
    return "calm";
  })();

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        className
      )}
    >
      {/* Stage Arena (fixed height so zero layout shift occurs when box explodes into Loaffy) */}
      <div className="relative flex h-64 w-full max-w-xl items-center justify-center sm:h-72">
        {/* Act 1: Shaking Mystery Box (vanishes completely on explosion!) */}
        <AnimatePresence>
          {phase === "shaking" && (
            <motion.div
              key="mystery-box"
              initial={{ scale: 0.88, opacity: 0, y: -24 }}
              animate={{
                opacity: 1,
                y: [0, -4, 2, -6, 2, -8, 0],
                rotate: [0, -3, 4, -6, 7, -9, 10, -8, 0],
                scaleX: [1, 1.06, 0.94, 1.08, 0.92, 1.12, 1],
                scaleY: [1, 0.94, 1.06, 0.92, 1.1, 0.88, 1.04],
              }}
              exit={{
                scale: 1.32,
                opacity: 0,
                transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{
                duration: 0.72,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <HatchingMysteryBox />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Act 2: Explosion Burst Ring + Flying Cardboard Flaps & Pastel Bean Confetti */}
        <AnimatePresence>
          {phase === "exploding" && !reducedMotion && (
            <div
              key="box-explosion-particles"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {/* Comic starburst ring */}
              <motion.div
                initial={{ scale: 0.4, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute h-36 w-36 rounded-pill border-4 border-dashed border-line-strong bg-butter/40"
              />

              {/* Flying flaps, stars, and toe-bean confetti */}
              {EXPLOSION_CONFETTI.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 16, scale: 0.6, rotate: 0, opacity: 1 }}
                  animate={{
                    x: p.tx,
                    y: p.ty,
                    scale: [1.15, 0.9, 0],
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
                      className="block h-8 w-14 rounded-xs border-2 border-line-strong shadow-sticker-sm"
                    />
                  ) : p.kind === "star" ? (
                    <svg
                      viewBox="0 0 32 32"
                      className="h-7 w-7 text-line-strong"
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
                      className="block h-5 w-7 rounded-pill border-2 border-line-strong"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Acts 2–4: Loaffy Jumps Out → Quick Poses → Interactive Settled Stage */}
        {phase !== "shaking" && (
          <motion.div
            key="loaffy-character"
            initial={
              reducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 56, scale: 0.56 }
            }
            animate={
              phase === "exploding" && !reducedMotion
                ? {
                    opacity: 1,
                    y: -36,
                    scale: 1.08,
                  }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
            }
            transition={reducedMotion ? { duration: 0 } : springBouncy}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Floating comic pose callout pill during the quick pose reel */}
            <AnimatePresence mode="wait">
              {phase === "posing" && !reducedMotion && (
                <motion.span
                  key={currentBeat.badge}
                  initial={{ opacity: 0, y: 12, scale: 0.84, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, y: -8, scale: 0.88 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "absolute -top-6 z-20 whitespace-nowrap rounded-pill border-2 border-line-strong px-4 py-1 font-display text-caption font-bold text-on-pastel shadow-sticker-sm",
                    currentBeat.toneClass
                  )}
                >
                  {currentBeat.badge}
                </motion.span>
              )}
            </AnimatePresence>

            <Loaffy
              form={phase === "settled" && !activePoseOverride ? "paw-3d" : "paw"}
              pose={resolvedPose}
              mood={resolvedMood}
              size={240}
              track={phase === "settled"}
              blink={phase === "settled"}
              showGroundShadow
              label="Loaffy the ginger cat pawprint mascot, fresh out of the box"
            />
          </motion.div>
        )}
      </div>

      {/* Interactive Quick-Pose Switcher + Replay Box Pop bar (appears when settled) */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={
          phase === "settled"
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={reducedMotion ? { duration: 0 } : springCalm}
        className={cn(
          "mt-2 flex flex-wrap items-center justify-center gap-2",
          phase !== "settled" && "pointer-events-none"
        )}
      >
        <div
          role="group"
          aria-label="Try Loaffy poses"
          className="inline-flex flex-wrap items-center justify-center gap-1 rounded-pill border-2 border-line-strong bg-surface p-1 shadow-sticker-sm"
        >
          {INTERACTIVE_POSES.map((item) => {
            const isSelected =
              (activePoseOverride ?? "loaf") === item.pose;
            return (
              <button
                key={item.pose}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  onSelectPose?.(item.pose === "loaf" ? null : item.pose)
                }
                className={cn(
                  "inline-flex min-h-12 items-center rounded-pill px-4 font-mono text-caption font-semibold transition-colors",
                  isSelected
                    ? "border border-line-strong bg-lilac text-on-pastel"
                    : "text-text hover:bg-surface-2"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {!reducedMotion && onReplay && (
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-line-strong bg-butter px-4 font-mono text-caption font-bold text-on-pastel lp-sticker-sm-interactive"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Replay box pop</span>
          </button>
        )}
      </motion.div>
    </div>
  );
}
