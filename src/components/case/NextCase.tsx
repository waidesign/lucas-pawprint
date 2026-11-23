"use client";

import Link from "next/link";
import { Loaffy } from "@/components/mascot/Loaffy";
import type { Form } from "@/components/mascot/LoaffyBus";
import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export interface NextCaseProps {
  slug?: string;
  title?: string;
  summary?: string;
  tone?: Tone;
  form?: Form;
  className?: string;
}

/**
 * NextCase component per COMPONENTS.md §E:
 * Big link to the next case study with its pastel tone and Loaffy form.
 * Reads `nextCase` from `CaseStudyContext` when explicit props are omitted.
 */
export function NextCase({
  slug,
  title,
  summary,
  tone,
  form,
  className,
}: NextCaseProps) {
  const ctx = useCaseStudy();
  const next = ctx?.nextCase;

  const resolvedSlug = slug ?? next?.slug;
  const resolvedTitle = title ?? next?.title;
  const resolvedSummary = summary ?? next?.summary;
  const resolvedTone: Tone = tone ?? next?.tone ?? "sky";
  const resolvedForm: Form = form ?? next?.form ?? "window";

  if (!resolvedSlug || !resolvedTitle) {
    return null;
  }

  return (
    <nav
      aria-label="Next case study"
      className={cn("mx-auto w-full max-w-[var(--container-max)] px-[var(--space-gutter)] py-12", className)}
    >
      <Link
        href={`/work/${resolvedSlug}`}
        className={cn(
          "group flex flex-col items-start justify-between gap-6 rounded-xl border-2 border-line-strong p-6 lp-sticker-interactive md:flex-row md:items-center md:p-8",
          TONE_BG_CLASSES[resolvedTone]
        )}
      >
        <div className="space-y-2">
          <span className="font-mono text-label uppercase tracking-wider text-on-pastel/80">
            Next case study →
          </span>
          <h3 className="font-display text-h2 text-on-pastel">
            {resolvedTitle}
          </h3>
          {resolvedSummary && (
            <p className="max-w-[var(--prose-max)] font-body text-body text-on-pastel/90">
              {resolvedSummary}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4 self-end md:self-center">
          <Loaffy
            form={resolvedForm}
            mood="curious"
            size={64}
            track={false}
            blink={false}
            listenToBus={false}
            decorative
          />
          <span className="inline-flex min-h-12 items-center rounded-pill border-2 border-line-strong bg-bg px-5 font-body text-button font-semibold text-text shadow-sticker-sm">
            Read next →
          </span>
        </div>
      </Link>
    </nav>
  );
}
