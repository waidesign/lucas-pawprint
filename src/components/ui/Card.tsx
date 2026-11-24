import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type CardProps = {
  tone?: Tone | "surface";
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

/**
 * Rule 18: only for a clickable whole, a media/demo frame, or one standout panel per section.
 */
export function Card({
  tone = "surface",
  className,
  children,
  ...props
}: CardProps) {
  const toneClasses =
    tone === "surface"
      ? "bg-surface text-text"
      : TONE_BG_CLASSES[tone];

  return (
    <div
      className={cn(
        "rounded-lg border-2 border-line-strong p-6 shadow-sticker-sm md:p-8",
        toneClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
