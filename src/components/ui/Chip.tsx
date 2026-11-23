import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type ChipProps = {
  tone?: Tone | "surface";
  size?: "sm" | "md";
  selected?: boolean;
  as?: "span" | "button";
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Chip({
  tone = "surface",
  size = "md",
  selected = false,
  as = "span",
  className,
  children,
  ...props
}: ChipProps) {
  const toneClasses = selected
    ? "bg-inverse-bg text-inverse-text border-line-strong"
    : tone === "surface"
    ? "bg-surface text-text border-line hover:bg-surface-2"
    : cn(TONE_BG_CLASSES[tone], "border-line-strong");

  const sizeClasses =
    size === "sm" ? "h-8 px-3 text-caption" : "h-8 px-3 text-body";

  if (as === "button") {
    return (
      <button
        type="button"
        aria-pressed={selected}
        className={cn(
          "group inline-flex min-h-12 items-center justify-center rounded-pill px-1 select-none",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-pill border-2 font-body font-medium transition-colors",
            sizeClasses,
            toneClasses
          )}
        >
          {children}
        </span>
      </button>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-pill border font-body font-medium",
        sizeClasses,
        toneClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
