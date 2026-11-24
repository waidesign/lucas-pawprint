import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type BetaBadgeProps = {
  label?: string;
} & ComponentPropsWithoutRef<"span">;

export function BetaBadge({
  label = "Private beta",
  className,
  ...props
}: BetaBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-pill border-2 border-line-strong bg-butter px-3 font-body text-caption font-semibold text-on-pastel shadow-sticker-sm",
        className,
      )}
      {...props}
    >
      <span>{label}</span>
    </span>
  );
}
