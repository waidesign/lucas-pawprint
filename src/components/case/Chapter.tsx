"use client";

import type { ReactNode } from "react";
import { cn, type Tone } from "@/lib/cn";
import { Heading } from "@/components/ui/Heading";
import { SectionSeam } from "@/components/ui/SectionSeam";
import { useCaseStudy } from "@/components/case/CaseStudyContext";

export type ChapterStep = "understand" | "shape" | "design" | "ship";

export type ChapterTone = "bg" | "surface" | Tone | `${Tone}-soft`;

export interface ChapterProps {
  step: ChapterStep;
  title?: string;
  /** Optional single word inside `title` to highlight with a pastel pill */
  highlight?: string;
  highlightTone?: Tone;
  /** Optional one-line intro rendered in body-lg below the chapter heading */
  intro?: string;
  /** Override band tone; inside a case study, defaults to alternating `<caseTone>-soft` and `bg` */
  tone?: ChapterTone;
  /** Override the upper tone for the wavy SectionSeam above this band, or `false` to omit the seam */
  seamFrom?: Tone | "bg" | false;
  /** Seed for the deterministic wavy seam */
  seamSeed?: number;
  children: ReactNode;
  className?: string;
}

const STEP_META: Record<
  ChapterStep,
  { label: string; defaultSoft: boolean; seed: number }
> = {
  understand: { label: "Understand", defaultSoft: true, seed: 11 },
  shape: { label: "Shape", defaultSoft: false, seed: 23 },
  design: { label: "Design", defaultSoft: true, seed: 37 },
  ship: { label: "Ship", defaultSoft: false, seed: 47 },
};

const CHAPTER_BG_VARS: Record<ChapterTone, string> = {
  bg: "var(--lp-bg)",
  surface: "var(--lp-surface)",
  lilac: "var(--color-lilac)",
  mint: "var(--color-mint)",
  butter: "var(--color-butter)",
  sky: "var(--color-sky)",
  blush: "var(--color-blush)",
  pistachio: "var(--color-pistachio)",
  "lilac-soft": "var(--lp-lilac-soft)",
  "mint-soft": "var(--lp-mint-soft)",
  "butter-soft": "var(--lp-butter-soft)",
  "sky-soft": "var(--lp-sky-soft)",
  "blush-soft": "var(--lp-blush-soft)",
  "pistachio-soft": "var(--lp-pistachio-soft)",
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

function toSeamTone(tone: ChapterTone): Tone | "bg" | null {
  if (tone === "bg") return "bg";
  if (tone === "surface") return null;
  if (tone.endsWith("-soft")) {
    return tone.replace("-soft", "") as Tone;
  }
  return tone as Tone;
}

/**
 * Chapter (Phase 1.C):
 * - Full-width alternating band (`bg` and `<caseTone>-soft`) joined to the previous band
 *   by a Home-style wavy `<SectionSeam>`.
 * - Header: quiet mono step label (no numeral: the CaseStepper already numbers the
 *   chapters), `h2` at `h1` token (64px) with optional single highlighted word,
 *   and an optional `intro` line in `body-lg`.
 * - Preserves `data-chapter-step` and `aria-labelledby`.
 */
export function Chapter({
  step,
  title,
  highlight,
  highlightTone,
  intro,
  tone,
  seamFrom,
  seamSeed,
  children,
  className,
}: ChapterProps) {
  const ctx = useCaseStudy();
  const caseTone: Tone = ctx?.metadata.tone ?? "lilac";
  const meta = STEP_META[step];

  const resolvedTone: ChapterTone =
    tone ?? (ctx ? (meta.defaultSoft ? `${caseTone}-soft` : "bg") : "bg");

  const resolvedSeamTo = toSeamTone(resolvedTone);
  const defaultSeamFrom: Tone | "bg" | false =
    ctx && resolvedSeamTo
      ? resolvedSeamTo === "bg"
        ? caseTone
        : "bg"
      : false;
  const resolvedSeamFrom = seamFrom !== undefined ? seamFrom : defaultSeamFrom;
  const showSeam =
    resolvedSeamFrom !== false &&
    resolvedSeamTo !== null &&
    resolvedSeamFrom !== resolvedSeamTo;

  const suffix = title ? `${step}-${slugifyHeading(title)}` : step;
  const sectionId = `chapter-${suffix}`;
  const headingId = `${sectionId}-title`;

  return (
    <>
      {showSeam && (
        <SectionSeam
          from={resolvedSeamFrom}
          to={resolvedSeamTo}
          seed={seamSeed ?? meta.seed}
        />
      )}

      <section
        id={sectionId}
        data-chapter-step={step}
        aria-labelledby={headingId}
        style={{ ["--chapter-bg" as string]: CHAPTER_BG_VARS[resolvedTone] }}
        className={cn(
          "w-full scroll-mt-24 px-4 py-[var(--space-section)] md:px-10 lg:px-20",
          !showSeam && "border-t border-line",
          CHAPTER_BG_CLASSES[resolvedTone],
          className,
        )}
      >
        <div className="w-full space-y-10 md:space-y-12">
          <div className="max-w-4xl space-y-4">
            <p className="font-mono text-label uppercase tracking-wider text-text-muted">
              {meta.label}
            </p>

            {title ? (
              <Heading
                id={headingId}
                as="h2"
                highlight={highlight}
                highlightTone={highlightTone ?? caseTone}
                className="text-current"
              >
                {title}
              </Heading>
            ) : (
              <h2 id={headingId} className="sr-only">
                {meta.label}
              </h2>
            )}

            {intro && (
              <p className="max-w-2xl font-body text-body-lg text-text-muted">
                {intro}
              </p>
            )}
          </div>

          <div className="space-y-8 font-body text-body text-current [&>p]:max-w-[var(--prose-max)] [&>p]:text-body-lg [&>p]:text-text-muted [&>ul]:max-w-[var(--prose-max)] [&>ol]:max-w-[var(--prose-max)] [&>blockquote]:max-w-[var(--prose-max)]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
