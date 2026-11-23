"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  LOAFFY_COLORS,
  MAIN_PAD_PATH,
  PenShape,
  ShadedShape,
} from "./parts";

export type CatHandSide = "fur" | "beans";
export type CatHandEdge = "bottom" | "top" | "left" | "right";
export type CatHandAction = "idle" | "enter" | "tap" | "bat" | "sketch";

export interface CatHandProps {
  side?: CatHandSide;
  from?: CatHandEdge;
  angle?: number;
  size?: number;
  claws?: boolean;
  wobble?: boolean;
  action?: CatHandAction;
  decorative?: boolean;
  label?: string;
  className?: string;
}

const HAND_SILHOUETTE_PATH =
  "M51,200 L49,96 C48,86 49,78 52,73 C50,57 64,47 76,52 C79,40 97,36 100,46 C103,36 121,40 124,52 C136,47 150,57 148,73 C151,78 152,86 151,96 L149,200 Z";

const CLAW_PATH =
  "M-4.2,2 C-4,-6 -1.4,-13 2.4,-18 C3.2,-12 4.4,-5 4.2,2 Z";

const CLAW_TRANSFORMS = [
  "translate(60.8 56.8) rotate(-42) scale(1 1)",
  "translate(88.5 43.8) rotate(-10) scale(1 1)",
  "translate(111.5 43.8) rotate(10) scale(-1 1)",
  "translate(139.2 56.8) rotate(42) scale(-1 1)",
] as const;

const BEAN_SIDE_TOE_BEANS = [
  { cx: 64, cy: 67, rx: 7, ry: 9, rotate: -35 },
  { cx: 88, cy: 55, rx: 7.5, ry: 9, rotate: -12 },
  { cx: 112, cy: 55, rx: 7.5, ry: 9, rotate: 12 },
  { cx: 136, cy: 67, rx: 7, ry: 9, rotate: 35 },
] as const;

function getEdgeRotation(from: CatHandEdge, customAngle?: number): number {
  if (customAngle !== undefined) return customAngle;
  switch (from) {
    case "top":
      return 180;
    case "left":
      return 90;
    case "right":
      return -90;
    case "bottom":
    default:
      return 0;
  }
}

export function CatHand({
  side = "fur",
  from = "bottom",
  angle,
  size = 240,
  claws = true,
  wobble = true,
  action = "idle",
  decorative = false,
  label,
  className,
}: CatHandProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const rawFilterId = useId().replace(/:/g, "");
  const filterId = `lp-hand-pen-${rawFilterId}`;

  const enableWobble = wobble && size >= 48 && !prefersReduced;
  const rotation = getEdgeRotation(from, angle);
  const ariaLabel = label ?? `Loaffy's paw, ${side} side`;

  const actionAnimate = (() => {
    if (prefersReduced) return { x: 0, y: 0, rotate: 0, scaleY: 1 };
    switch (action) {
      case "enter":
        // §5 enter_<edge> 480ms: slides in from edge with 4% overshoot and 4deg settle
        return {
          y: [48, -4, 0],
          rotate: [-4, 2, 0],
          x: 0,
          scaleY: 1,
        };
      case "tap":
        // §5 tap 240ms: 0 -> 120 press moves 8 toward target, toes squash 6% -> 240 return
        return {
          y: [0, -8, 0],
          scaleY: [1, 0.94, 1],
          x: 0,
          rotate: 0,
        };
      case "bat":
        // §5 bat 480ms: quick swipe 16deg toward target and back
        return {
          rotate: [0, -16, 6, 0],
          x: [0, -12, 4, 0],
          y: 0,
          scaleY: 1,
        };
      case "sketch":
        // §5 sketch loop 1600ms: small circular writing motion
        return {
          x: [0, 6, 0, -6, 0],
          y: [0, -4, -8, -4, 0],
          rotate: [0, 3, 0, -3, 0],
          scaleY: 1,
        };
      case "idle":
      default:
        return { x: 0, y: 0, rotate: 0, scaleY: 1 };
    }
  })();

  const actionTransition = (() => {
    if (prefersReduced) return { duration: 0 };
    switch (action) {
      case "enter":
      case "bat":
        return { duration: 0.48, ease: "easeOut" as const };
      case "tap":
        return { duration: 0.24, ease: "easeInOut" as const };
      case "sketch":
        return {
          duration: 1.6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut" as const,
        };
      case "idle":
      default:
        return { duration: 0.28 };
    }
  })();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : ariaLabel}
      aria-hidden={decorative ? true : undefined}
      className={className}
      style={{ color: "var(--lp-outline)" }}
    >
      {enableWobble && (
        <defs>
          <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves={2}
              seed={35}
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale={2.4}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      )}

      <g
        filter={enableWobble ? `url(#${filterId})` : undefined}
        transform={rotation !== 0 ? `rotate(${rotation} 100 100)` : undefined}
      >
        <motion.g
          style={{ transformOrigin: "100px 200px" }}
          animate={actionAnimate}
          transition={actionTransition}
        >
          {/* 1. Four claws growing out of each toe tip (LOAFFY.md §7) */}
          <motion.g
            style={{ transformOrigin: "100px 56px" }}
            initial={false}
            animate={{
              scale: claws ? 1 : 0,
              opacity: claws ? 1 : 0,
            }}
            transition={{
              duration: prefersReduced ? 0 : 0.12,
              ease: "easeOut",
            }}
          >
            {CLAW_TRANSFORMS.map((transformStr, idx) => (
              <PenShape
                key={idx}
                geometry={{
                  kind: "path",
                  d: CLAW_PATH,
                  transform: transformStr,
                }}
                fill={LOAFFY_COLORS.claw}
                strokeWidth={2.4}
              />
            ))}
          </motion.g>

          {/* 2. Fur side vs Bean side */}
          {side === "fur" ? (
            <>
              <ShadedShape
                geometry={{ kind: "path", d: HAND_SILHOUETTE_PATH }}
                fill={LOAFFY_COLORS.ginger}
                shadeFill={LOAFFY_COLORS.gingerDeep}
                strokeWidth={3.4}
                shift={{ x: -4, y: -5 }}
              />
              {/* Toe creases */}
              <path
                d="M76,53 q3,5 3,10"
                stroke="currentColor"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M100,47 v10"
                stroke="currentColor"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M124,53 q-3,5 -3,10"
                stroke="currentColor"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
              {/* Tabby stripes in Ginger-deep */}
              <path
                d="M66,136 q34,-10 68,0"
                stroke={LOAFFY_COLORS.gingerDeep}
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M64,160 q36,-10 72,0"
                stroke={LOAFFY_COLORS.gingerDeep}
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M64,184 q36,-10 72,0"
                stroke={LOAFFY_COLORS.gingerDeep}
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
              />
              {/* Fur highlight */}
              <path
                d="M58,180 L57,96 Q56,78 66,66"
                stroke={LOAFFY_COLORS.glint}
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
              />
            </>
          ) : (
            <>
              <PenShape
                geometry={{ kind: "path", d: HAND_SILHOUETTE_PATH }}
                fill={LOAFFY_COLORS.gingerLight}
                strokeWidth={3.4}
              />
              {/* Palm pad (tiny Loaffy pad) */}
              <g transform="translate(100 100) scale(0.36) translate(-100 -137)">
                <PenShape
                  geometry={{ kind: "path", d: MAIN_PAD_PATH }}
                  fill={LOAFFY_COLORS.ginger}
                  strokeWidth={7}
                />
              </g>
              {/* Four toe beans */}
              {BEAN_SIDE_TOE_BEANS.map((b, idx) => (
                <PenShape
                  key={idx}
                  geometry={{
                    kind: "ellipse",
                    cx: b.cx,
                    cy: b.cy,
                    rx: b.rx,
                    ry: b.ry,
                    transform: `rotate(${b.rotate} ${b.cx} ${b.cy})`,
                  }}
                  fill={LOAFFY_COLORS.ginger}
                  strokeWidth={2.6}
                />
              ))}
              {/* Wrist stripes */}
              <path
                d="M66,148 q34,-10 68,0"
                stroke={LOAFFY_COLORS.ginger}
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
              />
              <path
                d="M64,172 q36,-10 72,0"
                stroke={LOAFFY_COLORS.ginger}
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
              />
            </>
          )}
        </motion.g>
      </g>
    </svg>
  );
}
