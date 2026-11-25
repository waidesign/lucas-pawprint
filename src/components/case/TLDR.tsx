"use client";

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
 * and TL;DR as 3-column IndexColumns titled by real h3 headings (Problem · What I did · Outcome),
 * not badges: they are the section's key titles. No numerals: the three parts are parallel, not steps.
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
      title: problemLabel,
      body: <p className="text-text">{resolvedProblem}</p>,
    },
    {
      id: "what-i-did",
      title: resolvedWhatLabel,
      body: <p className="text-text">{resolvedWhatIDid}</p>,
    },
    {
      id: "outcome",
      title: resolvedOutcomeLabel,
      body: <p className="text-text">{resolvedOutcome}</p>,
    },
  ];

  return (
    <section
      id="at-a-glance"
      aria-labelledby="at-a-glance-heading"
      className={cn(
        "w-full bg-bg px-4 py-12 md:px-10 md:py-20 lg:px-20",
        className,
      )}
    >
      <div className="w-full space-y-10 md:space-y-12">
        {/* Standalone (no case context, e.g. /colophon): a hidden h2 keeps the outline
            h1 → h2 → h3 for the Problem / What I did / Outcome headings below. */}
        {!renderFullOverview && (
          <h2 id="at-a-glance-heading" className="sr-only">
            At a glance
          </h2>
        )}
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
          as="h3"
          bodySize="body-lg"
          staggerSeconds={stagger}
          items={items}
        />
      </div>
    </section>
  );
}
