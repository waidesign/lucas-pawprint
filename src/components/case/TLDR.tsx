"use client";

import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { IndexColumns } from "@/components/ui/IndexColumns";
import { MetaRow } from "@/components/case/MetaRow";
import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { stagger } from "@/lib/motion";
import { cn, type Tone } from "@/lib/cn";

export interface TLDRProps {
  problem?: string;
  whatIDid?: string;
  outcome?: string;
  problemLabel?: string;
  whatIDidLabel?: string;
  outcomeLabel?: string;
  /** Render the "At a glance." heading + MetaRow above the 3-column TL;DR (default true inside CaseStudyContext) */
  showAtAGlance?: boolean;
  tone?: Tone;
  className?: string;
}

/**
 * "At a glance." overview band (Phase 1.B):
 * Plain, zero cards: Heading ("At a glance."), MetaRow (Role · Team · Timeline · Platform · Tools · Live link),
 * and TL;DR as 3-column IndexColumns labelled by pastel Chips (no numerals: the three parts are parallel, not steps).
 */
export function TLDR({
  problem,
  whatIDid,
  outcome,
  problemLabel = "Problem",
  whatIDidLabel,
  outcomeLabel,
  showAtAGlance,
  tone,
  className,
}: TLDRProps) {
  const ctx = useCaseStudy();
  const meta = ctx?.metadata;
  const isLuci = meta?.slug === "luci";
  const resolvedTone: Tone = tone ?? meta?.tone ?? "lilac";
  const renderFullOverview = showAtAGlance ?? Boolean(meta);

  const resolvedProblem = problem ?? meta?.tldr.problem ?? "";
  const resolvedWhatIDid = whatIDid ?? meta?.tldr.whatIDid ?? "";
  const resolvedOutcome = outcome ?? meta?.tldr.outcome ?? "";

  const resolvedWhatLabel =
    whatIDidLabel ?? (isLuci ? "What I built" : "What I did");
  const resolvedOutcomeLabel = outcomeLabel ?? "Outcome";

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
      id="at-a-glance"
      aria-labelledby={renderFullOverview ? "at-a-glance-heading" : undefined}
      aria-label={renderFullOverview ? undefined : "Case study TL;DR summary"}
      className={cn(
        "w-full bg-bg px-4 py-12 md:px-10 md:py-20 lg:px-20",
        className,
      )}
    >
      <div className="w-full space-y-10 md:space-y-12">
        {renderFullOverview && (
          <>
            <Heading
              id="at-a-glance-heading"
              as="h2"
              highlight="glance"
              highlightTone={resolvedTone}
            >
              At a glance.
            </Heading>

            <MetaRow />
          </>
        )}

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
