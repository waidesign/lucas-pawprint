"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { cn, type Tone } from "@/lib/cn";

export interface NextCaseProps {
  slug?: string;
  title?: string;
  summary?: string;
  tone?: Tone;
  /** When true, omits outer nav padding so the primary button fills its grid cell cleanly. */
  embedded?: boolean;
  className?: string;
}

/**
 * NextCase component per COMPONENTS.md §E:
 * Huge primary-styled button linking to the next case study, sized to sit side-by-side
 * with CaseCTA in a 2-column closing band.
 * Reads `nextCase` from `CaseStudyContext` when explicit props are omitted.
 */
export function NextCase({
  slug,
  title,
  summary,
  embedded = false,
  className,
}: NextCaseProps) {
  const ctx = useCaseStudy();
  const next = ctx?.nextCase;

  const resolvedSlug = slug ?? next?.slug;
  const resolvedTitle = title ?? next?.title;
  const resolvedSummary = summary ?? next?.summary;

  if (!resolvedSlug || !resolvedTitle) {
    return null;
  }

  return (
    <nav
      aria-label="Next case study"
      className={cn(
        embedded ? "h-full w-full" : "w-full px-4 py-12 md:px-10 lg:px-20",
        className,
      )}
    >
      <Link
        href={`/work/${resolvedSlug}`}
        className={cn(
          "group flex h-full w-full flex-col justify-between gap-8 rounded-2xl border-2 border-transparent bg-inverse-bg p-6 text-inverse-text select-none lp-btn-primary-lg md:p-10",
        )}
      >
        <div className="space-y-4">
          <span className="block font-mono text-label uppercase tracking-wider text-inverse-text/75">
            Next case study
          </span>

          <h2
            className={cn(
              "font-display text-inverse-text text-balance",
              HEADING_SCALE_CLASSES.h2,
            )}
          >
            {resolvedTitle}
          </h2>

          {resolvedSummary && (
            <p className="max-w-2xl font-body text-body-lg text-inverse-text/80">
              {resolvedSummary}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2 font-body text-button font-semibold text-inverse-text">
          <span>Read next case</span>
          <ArrowRight
            className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </Link>
    </nav>
  );
}
