"use client";

import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export interface BackToTopButtonProps {
  className?: string;
}

/**
 * Accessible "Back to top" pill button for SiteFooter ([P3-A1]).
 * Uses a Lucide ArrowUp icon (no Unicode emoji arrows) and respects prefers-reduced-motion.
 */
export function BackToTopButton({ className }: BackToTopButtonProps) {
  const prefersReduced = useReducedMotion() ?? false;

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleBackToTop}
      className={cn(
        "inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-line-strong bg-surface px-4 font-body text-button font-semibold text-text lp-sticker-sm-interactive",
        className,
      )}
    >
      <span>Back to top</span>
      <ArrowUp className="h-4 w-4 shrink-0" aria-hidden="true" />
    </button>
  );
}
