import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import type { ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type ChapterStep = "understand" | "shape" | "design" | "ship";

export type ChapterTone = "bg" | "surface" | Tone | `${Tone}-soft`;

export interface ChapterProps {
  step: ChapterStep;
  title?: string;
  tone?: ChapterTone;
  children: ReactNode;
  className?: string;
}

const STEP_META: Record<
  ChapterStep,
  { number: string; label: string; badgeTone: Tone }
> = {
  understand: { number: "01", label: "Understand", badgeTone: "lilac" },
  shape: { number: "02", label: "Shape", badgeTone: "sky" },
  design: { number: "03", label: "Design", badgeTone: "butter" },
  ship: { number: "04", label: "Ship", badgeTone: "mint" },
};

const CHAPTER_BG_CLASSES: Record<ChapterTone, string> = {
  bg: "bg-bg text-text",
  surface: "bg-surface text-text",
  lilac: "bg-lilac text-on-pastel",
  mint: "bg-mint text-on-pastel",
  butter: "bg-butter text-on-pastel",
  sky: "bg-sky text-on-pastel",
  blush: "bg-blush text-on-pastel",
  pistachio: "bg-pistachio text-on-pastel",
  "lilac-soft": "bg-lilac-soft text-text",
  "mint-soft": "bg-mint-soft text-text",
  "butter-soft": "bg-butter-soft text-text",
  "sky-soft": "bg-sky-soft text-text",
  "blush-soft": "bg-blush-soft text-text",
  "pistachio-soft": "bg-pistachio-soft text-text",
};

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Chapter component per IA.md §3, COMPONENTS.md §E, and LUCI-BUILD-STEPS.md Step 3:
 * - Props: `step` ("understand" | "shape" | "design" | "ship"), `title`, `tone` for background.
 * - Renders `<section aria-labelledby>` with an `<h2>` and `data-chapter-step={step}`
 *   so the sticky BeanStepper tracks scroll progress across chapters.
 */
export function Chapter({
  step,
  title,
  tone = "bg",
  children,
  className,
}: ChapterProps) {
  const meta = STEP_META[step];
  const suffix = title ? `${step}-${slugifyHeading(title)}` : step;
  const sectionId = `chapter-${suffix}`;
  const headingId = `${sectionId}-title`;

  return (
    <section
      id={sectionId}
      data-chapter-step={step}
      aria-labelledby={headingId}
      className={cn(
        "w-full scroll-mt-28 border-t border-line px-4 py-[var(--space-section)] md:px-10 lg:px-20",
        CHAPTER_BG_CLASSES[tone],
        className,
      )}
    >
      <div className="w-full">
        <div className="max-w-[var(--prose-max)]">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "inline-flex h-8 items-center rounded-pill border-2 border-line-strong px-3 font-mono text-caption font-semibold",
                TONE_BG_CLASSES[meta.badgeTone],
              )}
            >
              {meta.number} · {meta.label}
            </span>
          </div>

          {title ? (
            <h2
              id={headingId}
              className={cn(
                "mt-4 font-display text-current text-balance",
                HEADING_SCALE_CLASSES.h2,
              )}
            >
              {title}
            </h2>
          ) : (
            <h2 id={headingId} className="sr-only">
              {meta.label}
            </h2>
          )}
        </div>

        <div className="mt-6 space-y-6 font-body text-body text-current [&>p]:max-w-[var(--prose-max)] [&>ul]:max-w-[var(--prose-max)] [&>ol]:max-w-[var(--prose-max)] [&>blockquote]:max-w-[var(--prose-max)]">
          {children}
        </div>
      </div>
    </section>
  );
}
