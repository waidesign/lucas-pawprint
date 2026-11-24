"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

export interface HeaderMenuButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
  ariaControls?: string;
}

/**
 * Intuitive, playful Header Menu Toggle Button inspired by dontboardme.com:
 * - Positioned dead-center in the header navigation.
 * - Tactile 48×48px pill button with 2px pen border and crisp sticker shadow.
 * - Smooth spring physics: two horizontal parallel bars (`=`) morph into a balanced `X` when open.
 * - Full WCAG 2.2 AA accessibility: aria-expanded, aria-controls, focus-visible outline.
 */
export function HeaderMenuButton({
  open,
  onClick,
  className,
  ariaControls,
}: HeaderMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      aria-controls={ariaControls}
      onClick={onClick}
      className={cn(
        "group relative flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text shadow-sticker-sm transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-line-strong focus-visible:outline-offset-2",
        open && "bg-surface-2",
        className
      )}
    >
      <span className="sr-only">
        {open ? "Close navigation menu" : "Open navigation menu"}
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 28 28"
        className="h-6 w-6 overflow-visible text-line-strong"
      >
        {/* Top bar: horizontal at y=10 when closed, rotates to diagonal \ at y=6..22 when open */}
        <motion.line
          stroke="currentColor"
          strokeWidth={2.75}
          strokeLinecap="round"
          initial={false}
          animate={
            open
              ? { x1: 6, y1: 6, x2: 22, y2: 22 }
              : { x1: 4, y1: 10, x2: 24, y2: 10 }
          }
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 22,
          }}
        />

        {/* Bottom bar: horizontal at y=18 when closed, rotates to diagonal / at y=22..6 when open */}
        <motion.line
          stroke="currentColor"
          strokeWidth={2.75}
          strokeLinecap="round"
          initial={false}
          animate={
            open
              ? { x1: 6, y1: 22, x2: 22, y2: 6 }
              : { x1: 4, y1: 18, x2: 24, y2: 18 }
          }
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 22,
          }}
        />
      </svg>
    </button>
  );
}
