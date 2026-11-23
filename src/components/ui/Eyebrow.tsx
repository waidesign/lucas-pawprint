import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type EyebrowProps = {
  /** Optional leading bean dot in the given pastel tone */
  tone?: Tone;
  beanDot?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<"p">;

export function Eyebrow({
  tone = "lilac",
  beanDot = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-body text-label uppercase text-text-muted",
        className
      )}
      {...props}
    >
      {beanDot && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-3 w-2 shrink-0 rounded-pill border border-line-strong",
            TONE_BG_CLASSES[tone]
          )}
        />
      )}
      <span>{children}</span>
    </p>
  );
}
