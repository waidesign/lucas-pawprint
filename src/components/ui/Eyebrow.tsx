import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn, type Tone } from "@/lib/cn";

export type EyebrowProps = {
  tone?: Tone;
  /** Deprecated per AGENTS.md §4.16 (no decorative dots in badges/eyebrows) */
  beanDot?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<"p">;

export function Eyebrow({
  className,
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tone,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beanDot,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center font-body text-label uppercase text-text-muted",
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </p>
  );
}
