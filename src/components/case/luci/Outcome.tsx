"use client";

import { useCaseStudy } from "@/components/case/CaseStudyContext";

/**
 * Outcome (§11 of CASE-LUCI.md & LAYOUT-STEPS.md Step 3):
 * - Mono label + statement in font-display text-h3 under a 2px pen rule (no Card).
 */
export function Outcome() {
  const ctx = useCaseStudy();
  const mode = ctx?.metadata.visibility ?? "teaser";

  const copy =
    mode === "full"
      ? "Launched [date] on luci.pawprint.design."
      : "In private beta with invited designers and developers.";

  return (
    <div className="my-8 space-y-3 border-t-2 border-line-strong pt-6">
      <span className="block font-mono text-label uppercase tracking-wider text-text-muted">
        Outcome
      </span>
      <p className="max-w-[var(--prose-max)] font-display text-h3 text-text">
        {copy}
      </p>
    </div>
  );
}
