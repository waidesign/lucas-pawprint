"use client";

import { Sticker } from "@/components/ui/Sticker";
import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { cn } from "@/lib/cn";

export interface TLDRProps {
  problem?: string;
  whatIDid?: string;
  outcome?: string;
  problemLabel?: string;
  whatIDidLabel?: string;
  outcomeLabel?: string;
  className?: string;
}

/**
 * TLDR component per COMPONENTS.md §E & CASE-LUCI.md §4 §2:
 * Three Stickers in a row (`butter`, `mint`, `sky`), each with a label and 1–2 lines.
 * Automatically reads `metadata.tldr` from `CaseStudyContext` when props are omitted.
 */
export function TLDR({
  problem,
  whatIDid,
  outcome,
  problemLabel = "Problem",
  whatIDidLabel,
  outcomeLabel,
  className,
}: TLDRProps) {
  const ctx = useCaseStudy();
  const meta = ctx?.metadata;
  const isLuci = meta?.slug === "luci";

  const resolvedProblem = problem ?? meta?.tldr.problem ?? "";
  const resolvedWhatIDid = whatIDid ?? meta?.tldr.whatIDid ?? "";
  const resolvedOutcome = outcome ?? meta?.tldr.outcome ?? "";

  const resolvedWhatLabel =
    whatIDidLabel ?? (isLuci ? "What I built" : "What I did");
  const resolvedOutcomeLabel =
    outcomeLabel ?? (isLuci ? "Where it is" : "Outcome");

  const cards = [
    {
      label: problemLabel,
      body: resolvedProblem,
      tone: "butter" as const,
      rotate: 0 as const,
    },
    {
      label: resolvedWhatLabel,
      body: resolvedWhatIDid,
      tone: "mint" as const,
      rotate: 0 as const,
    },
    {
      label: resolvedOutcomeLabel,
      body: resolvedOutcome,
      tone: "sky" as const,
      rotate: 0 as const,
    },
  ];

  return (
    <section
      aria-label="Case study TL;DR summary"
      className={cn("w-full bg-bg px-4 py-12 md:px-10 md:py-16 lg:px-20", className)}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <Sticker
              key={card.label}
              tone={card.tone}
              rotate={card.rotate}
              className="flex h-full flex-col justify-between gap-3 rounded-lg p-6"
            >
              <span className="font-mono text-label uppercase tracking-wider text-on-pastel/80">
                {card.label}
              </span>
              <p className="font-body text-body font-medium text-on-pastel">
                {card.body}
              </p>
            </Sticker>
          ))}
        </div>
      </div>
    </section>
  );
}
