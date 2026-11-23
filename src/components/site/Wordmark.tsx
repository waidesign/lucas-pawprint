"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";

export interface WordmarkProps {
  href?: string;
  className?: string;
}

/**
 * Wordmark per BRAND.md §5:
 * - `lucas` set in Bricolage Grotesque 800, tracking -0.02em, followed by a ginger toe bean
 * - The bean is an ellipse (rx 8, ry 11 in a 20×26 box), ginger #F4A878, 2.5px ink outline
 * - Emits `logo-hover` (10s throttled wink) on mouse enter
 */
export function Wordmark({ href = "/", className }: WordmarkProps) {
  return (
    <Link
      href={href}
      aria-label="Lucas — Home"
      onMouseEnter={() => emitLoaffyEvent("logo-hover")}
      className={cn(
        "inline-flex min-h-12 items-center gap-1 rounded-xs px-2 font-display text-h3 font-extrabold text-text select-none",
        className
      )}
    >
      <span>lucas</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 26"
        width={12}
        height={16}
        aria-hidden="true"
        className="inline-block shrink-0 translate-y-0.5"
        style={{ color: "var(--lp-outline)" }}
      >
        <ellipse
          cx={10}
          cy={13}
          rx={8}
          ry={11}
          fill="var(--color-ginger)"
          stroke="currentColor"
          strokeWidth={2.5}
        />
      </svg>
    </Link>
  );
}
