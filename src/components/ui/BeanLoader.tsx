"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export interface BeanLoaderProps {
  label?: string;
  showText?: boolean;
  className?: string;
}

const PAW_ARC_BEANS = [
  { id: 0, translateClass: "translate-y-2 -rotate-24" },
  { id: 1, translateClass: "-translate-y-1 -rotate-8" },
  { id: 2, translateClass: "-translate-y-1 rotate-8" },
  { id: 3, translateClass: "translate-y-2 rotate-24" },
] as const;

/**
 * Four small beans in the paw arc light up in turn (mint), 960ms loop (240ms per bean).
 * Reduced motion: static with "Loaffy's fetching it…" text.
 */
export function BeanLoader({
  label = "Loaffy's fetching it…",
  showText = false,
  className,
}: BeanLoaderProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 240);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  return (
    <div
      role="progressbar"
      aria-label={label}
      className={cn("inline-flex items-center gap-4", className)}
    >
      <div className="inline-flex h-12 items-center gap-2 px-2">
        {PAW_ARC_BEANS.map((bean, idx) => {
          const isLit = prefersReduced || activeIndex === idx;
          return (
            <span
              key={bean.id}
              aria-hidden="true"
              style={{
                transitionDuration: "var(--duration-fast)",
                transitionTimingFunction: "var(--ease-out-soft)",
              }}
              className={cn(
                "inline-block h-5 w-4 rounded-pill border-2 border-line-strong transition-colors",
                bean.translateClass,
                isLit ? "bg-mint" : "bg-surface"
              )}
            />
          );
        })}
      </div>

      {(prefersReduced || showText) && (
        <span className="font-body text-body text-text-muted">{label}</span>
      )}
    </div>
  );
}
