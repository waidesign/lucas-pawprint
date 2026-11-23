import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  cn,
  TONE_BG_CLASSES,
  TONE_SOFT_BG_CLASSES,
  type Tone,
} from "@/lib/cn";

export type SectionProps = {
  id: string;
  tone?: Tone | "bg" | "surface";
  soft?: boolean;
  bleed?: boolean;
  labelledBy: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "id">;

export function Section({
  id,
  tone = "bg",
  soft = false,
  bleed = false,
  labelledBy,
  className,
  children,
  ...props
}: SectionProps) {
  const toneClasses = (() => {
    if (tone === "bg") return "bg-bg text-text";
    if (tone === "surface") return "bg-surface text-text";
    return soft ? TONE_SOFT_BG_CLASSES[tone] : TONE_BG_CLASSES[tone];
  })();

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
      className={cn(
        "w-full",
        !bleed && "px-4 md:px-10 lg:px-20",
        toneClasses,
        className
      )}
      {...props}
    >
      <div className="w-full">{children}</div>
    </section>
  );
}
