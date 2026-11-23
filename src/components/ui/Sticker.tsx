"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { springCalm } from "@/lib/motion";

export type StickerRotate = -4 | -3 | -2 | 0 | 2 | 3 | 4;
export type StickerSize = "sm" | "md" | "lg";

export interface StickerProps {
  tone: Tone;
  rotate?: StickerRotate;
  size?: StickerSize;
  children: ReactNode;
  className?: string;
}

const SIZE_CLASSES: Record<StickerSize, string> = {
  sm: "px-4 py-2 text-caption",
  md: "px-6 py-4 text-body",
  lg: "px-8 py-6 text-body-lg",
};

export function Sticker({
  tone,
  rotate = 0,
  size = "md",
  children,
  className,
}: StickerProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const hoverRotate = prefersReduced
    ? rotate
    : rotate >= 0
    ? rotate + 2
    : rotate - 2;

  return (
    <motion.div
      initial={false}
      animate={{ rotate: prefersReduced ? 0 : rotate }}
      whileHover={prefersReduced ? undefined : { rotate: hoverRotate }}
      transition={springCalm}
      className={cn(
        "inline-block rounded-lg border-2 border-line-strong font-body shadow-sticker-sm",
        TONE_BG_CLASSES[tone],
        SIZE_CLASSES[size],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
