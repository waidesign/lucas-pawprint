"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { ReactNode } from "react";
import { reveal, springCalm } from "@/lib/motion";

export interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  /** Delay in seconds (multiple of 0.04s / 40ms grid) */
  delay?: number;
  /** Y offset in px (multiple of 4px grid, defaults to 24 from reveal preset) */
  yOffset?: number;
}

export function FadeIn({
  children,
  delay = 0,
  yOffset = reveal.initial.y,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={reveal.viewport}
      transition={
        shouldReduceMotion
          ? { duration: 0.12, delay: 0 }
          : {
              ...springCalm,
              delay,
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
