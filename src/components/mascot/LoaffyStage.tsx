"use client";

import { AnimatePresence, motion } from "motion/react";
import { FastForward } from "lucide-react";
import { Loaffy } from "./Loaffy";
import type { Form, Mood, Pose } from "./LoaffyBus";
import { cn } from "@/lib/cn";

export type HeroStagePhase =
  | "drop"
  | "tremor"
  | "swell"
  | "exploding"
  | "posing"
  | "settled";

export interface LoaffyStageProps {
  phase?: HeroStagePhase;
  poseBeat?: number;
  onSkip?: () => void;
  reducedMotion?: boolean;
}

export const LOAFFY_SHOWCASE_BEATS: readonly {
  form: Form;
  pose: Pose;
  mood: Mood;
  badge: string;
  toneClass: string;
}[] = [
  {
    form: "paw",
    pose: "shades",
    mood: "happy",
    badge: "Out of the box!",
    toneClass: "bg-butter",
  },
  {
    form: "paw",
    pose: "wink",
    mood: "happy",
    badge: "Curious by nature",
    toneClass: "bg-blush",
  },
  {
    form: "paw",
    pose: "vibing",
    mood: "curious",
    badge: "Motion with a job",
    toneClass: "bg-mint",
  },
  {
    form: "window",
    pose: "none",
    mood: "curious",
    badge: "Web & products",
    toneClass: "bg-sky",
  },
  {
    form: "cube",
    pose: "none",
    mood: "happy",
    badge: "Design systems",
    toneClass: "bg-pistachio",
  },
  {
    form: "paw-3d",
    pose: "jump",
    mood: "happy",
    badge: "Let's build!",
    toneClass: "bg-lilac",
  },
];

const EXPLOSION_CONFETTI = [
  { id: 0, tx: -280, ty: -200, rot: -64, fill: "var(--color-lilac)", kind: "bean" },
  { id: 1, tx: -208, ty: -272, rot: 48, fill: "var(--color-mint)", kind: "star" },
  { id: 2, tx: -88, ty: -304, rot: -32, fill: "var(--color-butter)", kind: "bean" },
  { id: 3, tx: 88, ty: -304, rot: 36, fill: "var(--color-sky)", kind: "star" },
  { id: 4, tx: 216, ty: -264, rot: -52, fill: "var(--color-blush)", kind: "bean" },
  { id: 5, tx: 288, ty: -192, rot: 64, fill: "var(--color-pistachio)", kind: "star" },
  { id: 6, tx: -320, ty: -48, rot: -84, fill: "var(--color-sky)", kind: "star" },
  { id: 7, tx: 320, ty: -48, rot: 84, fill: "var(--color-lilac)", kind: "star" },
  { id: 8, tx: -248, ty: 104, rot: -44, fill: "var(--color-blush)", kind: "bean" },
  { id: 9, tx: 248, ty: 104, rot: 44, fill: "var(--color-mint)", kind: "bean" },
  { id: 10, tx: -136, ty: 168, rot: -28, fill: "var(--color-pistachio)", kind: "bean" },
  { id: 11, tx: 136, ty: 168, rot: 28, fill: "var(--color-butter)", kind: "bean" },
] as const;

/* Custom motion-design speed graphs (cubic-bezier) */
const EASE_GRAVITY_IN = [0.55, 0, 1, 0.45] as const;
const EASE_EXPLOSIVE_OUT = [0.12, 1, 0.24, 1] as const;
const EASE_PRESSURE_BUILD = [0.68, 0, 0.88, 0.12] as const;
const EASE_SETTLE = [0.22, 1, 0.36, 1] as const;

/**
 * Standalone Full-Viewport Landing Intro Stage:
 * - Uses a true 3D Z-layered coordinate system (`absolute` layers sharing one `(0,0)` center)
 *   so Loaffy sits physically INSIDE the cardboard box (between the `z-10` dark inner cavity
 *   and the `z-30` front box walls/flaps) and erupts straight UP out of the box mouth as the
 *   4 box flaps/walls blast outward along realistic ballistic curves!
 * - Renders `null` once `phase === "settled"` ([P1-A1]: zero Loaffy in the settled Hero section).
 */
export function LoaffyStage({
  phase = "settled",
  poseBeat = 0,
  onSkip,
  reducedMotion = false,
}: LoaffyStageProps) {
  const showCurtain = phase !== "settled" && !reducedMotion;
  const currentBeat = LOAFFY_SHOWCASE_BEATS[poseBeat] ?? LOAFFY_SHOWCASE_BEATS[0];
  const isBoxIntact =
    phase === "drop" || phase === "tremor" || phase === "swell";
  const isExploding = phase === "exploding";
  const isPosing = phase === "posing";

  // Whole-box rig keyframes across drop -> tremor -> pressure swell
  const boxRigAnimate = (() => {
    if (phase === "drop") {
      return {
        y: [-160, 0, 0],
        scaleX: [0.92, 1.16, 1],
        scaleY: [1.08, 0.84, 1],
        rotate: 0,
      };
    }
    if (phase === "tremor") {
      return {
        y: [0, -10, 0, -6, 0],
        scaleX: [1, 0.96, 1.05, 0.98, 1],
        scaleY: [1, 1.05, 0.96, 1.02, 1],
        rotate: [0, -4, 4, -3, 0],
      };
    }
    // `swell`: exponential pressure build crouching down & bulging wide before detonation!
    return {
      y: [0, 4, 8, 14, 20],
      scaleX: [1, 1.04, 1.1, 1.16, 1.24],
      scaleY: [1, 0.96, 0.92, 0.86, 0.8],
      rotate: [0, -2, 3, -5, 6, -8, 10, -12, 12, -10, 0],
    };
  })();

  const boxRigTransition = (() => {
    if (phase === "drop") {
      return {
        duration: 0.36,
        times: [0, 0.72, 1],
        ease: [EASE_GRAVITY_IN, EASE_SETTLE] as unknown as [number, number, number, number],
      };
    }
    if (phase === "tremor") {
      return {
        duration: 0.48,
        ease: "easeInOut" as const,
      };
    }
    return {
      duration: 0.64,
      ease: EASE_PRESSURE_BUILD,
    };
  })();

  return (
    <AnimatePresence>
      {showCurtain && (
        <motion.div
          key="full-viewport-loaffy-intro"
          style={{ zIndex: "var(--z-modal)" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.32, ease: EASE_SETTLE },
          }}
          className="fixed inset-0 flex h-dvh w-screen items-center justify-center overflow-hidden bg-bg"
        >
        {/* Subtle Skip button in top-right corner */}
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="absolute right-6 top-6 z-50 inline-flex min-h-12 items-center gap-2 rounded-pill border border-line bg-surface px-4 font-mono text-caption font-semibold text-text-muted hover:bg-surface-2 hover:text-text"
          >
            <span>Skip</span>
            <FastForward className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        {/* Single shared-origin 3D Arena (every layer is `absolute` around center `(0,0)`) */}
        <div className="relative flex h-112 w-112 items-center justify-center">
          {/* =========================================================
              Z-05: Explosive Radial Shockwave & Confetti Burst (at detonation)
             ========================================================= */}
          {isExploding && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            >
              {/* Fast shockwave flash ring */}
              <motion.div
                initial={{ scale: 0.24, opacity: 1 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 0.56, ease: EASE_EXPLOSIVE_OUT }}
                className="absolute h-48 w-48 rounded-pill border-4 border-line-strong bg-butter/50"
              />
              <motion.div
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.48, ease: EASE_EXPLOSIVE_OUT }}
                className="absolute h-40 w-40 rounded-pill border-2 border-dashed border-line-strong bg-lilac/40"
              />

              {/* Radial confetti beans & stars */}
              {EXPLOSION_CONFETTI.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 24, scale: 0.4, rotate: 0, opacity: 1 }}
                  animate={{
                    x: p.tx,
                    y: [24, p.ty, p.ty + 48],
                    scale: [0.6, 1.25, 0],
                    rotate: p.rot,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 0.64,
                    times: [0, 0.65, 1],
                    ease: EASE_EXPLOSIVE_OUT,
                  }}
                  className="absolute"
                >
                  {p.kind === "star" ? (
                    <svg viewBox="0 0 32 32" className="h-10 w-10 text-line-strong">
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
                      className="block h-6 w-10 rounded-pill border-2 border-line-strong"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* =========================================================
              Z-10 (BACK LAYER): Box Dark Inner Cavity (BEHIND Loaffy!)
             ========================================================= */}
          {(isBoxIntact || isExploding) && (
            <motion.div
              aria-hidden="true"
              animate={
                isExploding
                  ? {
                      y: 96,
                      scale: 0.72,
                      opacity: 0,
                      transition: { duration: 0.36, ease: EASE_EXPLOSIVE_OUT },
                    }
                  : boxRigAnimate
              }
              transition={isExploding ? undefined : boxRigTransition}
              style={{ color: "var(--lp-outline)", transformOrigin: "50% 85%" }}
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            >
              <svg
                viewBox="0 0 360 300"
                className="h-auto w-96 overflow-visible sm:w-108"
              >
                {/* Ground shadow */}
                <ellipse
                  cx={180}
                  cy={264}
                  rx={116}
                  ry={12}
                  fill="currentColor"
                  opacity={0.16}
                />
                {/* Dark interior cavity of the box so Loaffy sits visibly INSIDE it */}
                <polygon
                  points="76,108 284,108 268,236 92,236"
                  fill="var(--color-on-pastel)"
                  stroke="currentColor"
                  strokeWidth={3.5}
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}

          {/* =========================================================
              Z-20 (MIDDLE LAYER): LOAFFY PHYSICALLY INSIDE THE BOX!
              Erupts straight UP from y:+64 inside the dark box cavity
              while the z-30 front box walls split apart in front of it!
             ========================================================= */}
          {(phase === "swell" || isExploding || isPosing) && (
            <motion.div
              key="center-stage-loaffy"
              initial={{ opacity: 1, y: 72, scaleX: 0.64, scaleY: 0.64 }}
              animate={
                phase === "swell"
                  ? {
                      // Tucked inside the box, pushing upward against the bulging lid!
                      opacity: 1,
                      y: 56,
                      scaleX: 0.72,
                      scaleY: 0.68,
                    }
                  : isExploding
                  ? {
                      // Ballistic launch straight UP out of the box mouth -> apex -> squishy land at center!
                      opacity: 1,
                      y: [64, -108, 8, 0],
                      scaleX: [0.76, 0.86, 1.16, 1],
                      scaleY: [0.72, 1.18, 0.84, 1],
                    }
                  : {
                      opacity: 1,
                      y: 0,
                      scaleX: 1,
                      scaleY: 1,
                    }
              }
              transition={
                phase === "swell"
                  ? { duration: 0.4, ease: EASE_PRESSURE_BUILD }
                  : isExploding
                  ? {
                      duration: 0.64,
                      times: [0, 0.44, 0.82, 1],
                      ease: [EASE_EXPLOSIVE_OUT, EASE_GRAVITY_IN, EASE_SETTLE],
                    }
                  : { duration: 0.28, ease: EASE_SETTLE }
              }
              className="absolute z-20 flex flex-col items-center justify-center"
            >
              {/* Floating comic callout pill during the 6-act pose & morph showcase */}
              <AnimatePresence mode="wait">
                {isPosing && (
                  <motion.span
                    key={currentBeat.badge}
                    initial={{ opacity: 0, y: 12, scale: 0.84, rotate: -4 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
                    exit={{ opacity: 0, y: -8, scale: 0.88 }}
                    transition={{ duration: 0.16, ease: EASE_SETTLE }}
                    className={cn(
                      "mb-4 whitespace-nowrap rounded-pill border-2 border-line-strong px-6 py-2 font-display text-h4 font-bold text-on-pastel shadow-sticker-sm",
                      currentBeat.toneClass
                    )}
                  >
                    {currentBeat.badge}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Subtle beat bounce on every pose change */}
              <motion.div
                key={isPosing ? `beat-${poseBeat}` : "launch"}
                initial={
                  isPosing
                    ? { scaleX: 1.1, scaleY: 0.9, y: 8 }
                    : false
                }
                animate={{ scaleX: 1, scaleY: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 18,
                }}
              >
                <Loaffy
                  form={isPosing ? currentBeat.form : "paw"}
                  pose={isExploding ? "jump" : isPosing ? currentBeat.pose : "loaf"}
                  mood={isExploding ? "happy" : isPosing ? currentBeat.mood : "surprised"}
                  size={320}
                  track={false}
                  blink={false}
                  showGroundShadow={!isExploding}
                  label="Loaffy erupting out of the cardboard box"
                />
              </motion.div>
            </motion.div>
          )}

          {/* =========================================================
              Z-30 (FRONT LAYER): 4-Piece Splittable Cardboard Box Shell
              Occludes Loaffy while intact, then rips apart into 4 flying
              cardboard pieces (Left Lid, Right Lid, Left Wall, Right Wall)
              when `phase === "exploding"`!
             ========================================================= */}
          {(isBoxIntact || isExploding) && (
            <motion.div
              aria-label={isBoxIntact ? "A rumbling mystery box hatching open" : undefined}
              animate={isExploding ? { y: 0, scaleX: 1, scaleY: 1, rotate: 0 } : boxRigAnimate}
              transition={isExploding ? { duration: 0 } : boxRigTransition}
              style={{ color: "var(--lp-outline)", transformOrigin: "50% 85%" }}
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
            >
              <svg
                viewBox="0 0 360 300"
                className="h-auto w-96 overflow-visible sm:w-108"
              >
                {/* Comic vibration & pressure lines during swell */}
                {phase === "swell" && (
                  <g stroke="currentColor" strokeWidth={3.2} strokeLinecap="round">
                    <path d="M44,116 Q24,148 44,180" fill="none" />
                    <path d="M28,128 Q12,148 28,168" fill="none" />
                    <path d="M316,116 Q336,148 316,180" fill="none" />
                    <path d="M332,128 Q348,148 332,168" fill="none" />
                    <line x1={108} y1={52} x2={92} y2={24} />
                    <line x1={180} y1={44} x2={180} y2={14} />
                    <line x1={252} y1={52} x2={268} y2={24} />
                  </g>
                )}

                {/* Piece 1: Left Top Lid Flap (hinges wide open & blasts upper-left!) */}
                <motion.g
                  animate={
                    isExploding
                      ? {
                          x: -220,
                          y: -176,
                          rotate: -108,
                          opacity: 0,
                        }
                      : phase === "swell"
                      ? { y: -8, rotate: -6 }
                      : { x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={
                    isExploding
                      ? { duration: 0.52, ease: EASE_EXPLOSIVE_OUT }
                      : { duration: 0.4, ease: EASE_PRESSURE_BUILD }
                  }
                  style={{ transformOrigin: "76px 108px" }}
                >
                  <path
                    d="M76,108 Q128,76 180,82 L180,124 L76,108 Z"
                    fill="var(--color-butter)"
                    stroke="currentColor"
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                  />
                </motion.g>

                {/* Piece 2: Right Top Lid Flap (hinges wide open & blasts upper-right!) */}
                <motion.g
                  animate={
                    isExploding
                      ? {
                          x: 220,
                          y: -176,
                          rotate: 108,
                          opacity: 0,
                        }
                      : phase === "swell"
                      ? { y: -8, rotate: 6 }
                      : { x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={
                    isExploding
                      ? { duration: 0.52, ease: EASE_EXPLOSIVE_OUT }
                      : { duration: 0.4, ease: EASE_PRESSURE_BUILD }
                  }
                  style={{ transformOrigin: "284px 108px" }}
                >
                  <path
                    d="M284,108 Q232,76 180,82 L180,124 L284,108 Z"
                    fill="var(--lp-butter-soft)"
                    stroke="currentColor"
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                  />
                </motion.g>

                {/* Piece 3: Front-Left Box Wall (splits & tumbles outward-left!) */}
                <motion.g
                  animate={
                    isExploding
                      ? {
                          x: -208,
                          y: [0, -24, 180],
                          rotate: -48,
                          opacity: [1, 1, 0],
                        }
                      : { x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={
                    isExploding
                      ? {
                          duration: 0.56,
                          times: [0, 0.35, 1],
                          ease: EASE_EXPLOSIVE_OUT,
                        }
                      : { duration: 0.2 }
                  }
                  style={{ transformOrigin: "128px 180px" }}
                >
                  <path
                    d="M76,108 L180,124 L180,256 L84,236 Q68,172 76,108 Z"
                    fill="var(--color-butter)"
                    stroke="currentColor"
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                  />
                  {/* Tilted Blush sticker on front-left wall */}
                  <g transform="translate(128, 184) rotate(-6)">
                    <rect
                      x={-40}
                      y={-16}
                      width={80}
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
                      FRAGILE!
                    </text>
                  </g>
                </motion.g>

                {/* Piece 4: Front-Right Box Wall (splits & tumbles outward-right!) */}
                <motion.g
                  animate={
                    isExploding
                      ? {
                          x: 208,
                          y: [0, -24, 180],
                          rotate: 48,
                          opacity: [1, 1, 0],
                        }
                      : { x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={
                    isExploding
                      ? {
                          duration: 0.56,
                          times: [0, 0.35, 1],
                          ease: EASE_EXPLOSIVE_OUT,
                        }
                      : { duration: 0.2 }
                  }
                  style={{ transformOrigin: "232px 180px" }}
                >
                  <path
                    d="M180,124 L284,108 Q292,172 276,236 L180,256 Z"
                    fill="var(--lp-butter-soft)"
                    stroke="currentColor"
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                  />
                </motion.g>

                {/* Piece 5: Lilac Packing Tape (stretches & snaps upward!) */}
                <motion.g
                  animate={
                    isExploding
                      ? {
                          y: -220,
                          rotate: 28,
                          scaleY: 0.5,
                          opacity: 0,
                        }
                      : { y: 0, rotate: 0, scaleY: 1, opacity: 1 }
                  }
                  transition={
                    isExploding
                      ? { duration: 0.44, ease: EASE_EXPLOSIVE_OUT }
                      : { duration: 0.2 }
                  }
                  style={{ transformOrigin: "180px 116px" }}
                >
                  <polygon
                    points="164,80 196,80 196,164 164,164"
                    fill="var(--color-lilac)"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                  />
                  {phase === "swell" && (
                    <polyline
                      points="172,88 188,108 170,128 188,152"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </motion.g>
              </svg>
            </motion.div>
          )}
        </div>

        {/* Minimal progress bean dots at bottom of intro stage */}
        {isPosing && (
          <div
            aria-hidden="true"
            className="absolute bottom-10 flex items-center gap-2"
          >
            {LOAFFY_SHOWCASE_BEATS.map((beat, idx) => (
              <span
                key={beat.badge}
                className={cn(
                  "h-3 rounded-pill border border-line-strong transition-all duration-200",
                  idx === poseBeat ? "w-8 bg-lilac" : "w-3 bg-surface"
                )}
              />
            ))}
          </div>
        )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
