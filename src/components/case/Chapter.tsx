import type { ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type ChapterStep = "understand" | "shape" | "design" | "ship";

export interface ChapterProps {
  step: ChapterStep;
  title?: string;
  children: ReactNode;
  className?: string;
}

const STEP_META: Record<
  ChapterStep,
  { number: string; label: string; tone: Tone }
> = {
  understand: { number: "01", label: "Understand", tone: "lilac" },
  shape: { number: "02", label: "Shape", tone: "sky" },
  design: { number: "03", label: "Design", tone: "butter" },
  ship: { number: "04", label: "Ship", tone: "mint" },
};

export function Chapter({ step, title, children, className }: ChapterProps) {
  const meta = STEP_META[step];
  const headingId = `chapter-${step}`;

  return (
    <section
      id={headingId}
      data-chapter-step={step}
      aria-labelledby={`${headingId}-title`}
      className={cn(
        "my-12 scroll-mt-28 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm md:p-8",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "inline-flex h-8 items-center rounded-pill border-2 border-line-strong px-3 font-mono text-caption font-semibold",
            TONE_BG_CLASSES[meta.tone]
          )}
        >
          {meta.number} · {meta.label}
        </span>
        {title && (
          <h2
            id={`${headingId}-title`}
            className="font-display text-h3 text-text"
          >
            {title}
          </h2>
        )}
        {!title && (
          <h2 id={`${headingId}-title`} className="sr-only">
            {meta.label}
          </h2>
        )}
      </div>

      <div className="mt-4 space-y-4 font-body text-body text-text">
        {children}
      </div>
    </section>
  );
}
