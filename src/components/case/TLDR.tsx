"use client";

import { Chip } from "@/components/ui/Chip";
import { IndexColumns } from "@/components/ui/IndexColumns";
import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { stagger } from "@/lib/motion";
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
 * TLDR component per COMPONENTS.md §E & LAYOUT-STEPS.md Step 2:
 * Uses `IndexColumns` (3 columns) with pastel `Chip` labels (`butter`, `mint`, `sky`),
 * `body-lg` copy, and 80ms reveal stagger. No card or sticker boxes.
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

  const items = [
    {
      id: "problem",
      label: (
        <Chip tone="butter" size="sm">
          {problemLabel}
        </Chip>
      ),
      body: <p className="text-text">{resolvedProblem}</p>,
    },
    {
      id: "what-i-did",
      label: (
        <Chip tone="mint" size="sm">
          {resolvedWhatLabel}
        </Chip>
      ),
      body: <p className="text-text">{resolvedWhatIDid}</p>,
    },
    {
      id: "outcome",
      label: (
        <Chip tone="sky" size="sm">
          {resolvedOutcomeLabel}
        </Chip>
      ),
      body: <p className="text-text">{resolvedOutcome}</p>,
    },
  ];

  return (
    <section
      aria-label="Case study TL;DR summary"
      className={cn(
        "w-full bg-bg px-4 py-12 md:px-10 md:py-16 lg:px-20",
        className,
      )}
    >
      <div className="w-full">
        <IndexColumns
          columns={3}
          bodySize="body-lg"
          staggerSeconds={stagger}
          items={items}
        />
      </div>
    </section>
  );
}
