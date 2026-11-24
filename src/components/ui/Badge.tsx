import type { ComponentPropsWithoutRef } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type BadgeProps = {
  label: string;
  tone?: Tone;
} & Omit<ComponentPropsWithoutRef<"span">, "children">;

/**
 * Generic status/label badge (AGENTS.md rule 16: no decorative dots).
 * Rounded pill with 2px pen border, pastel fill, ink text, and small sticker shadow.
 */
export function Badge({
  label,
  tone = "butter",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-pill border-2 border-line-strong px-3 font-body text-caption font-semibold shadow-sticker-sm",
        TONE_BG_CLASSES[tone],
        className,
      )}
      {...props}
    >
      <span>{label}</span>
    </span>
  );
}
