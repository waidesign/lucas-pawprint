"use client";

import { Card } from "@/components/ui/Card";
import { useCaseStudy } from "@/components/case/CaseStudyContext";

/**
 * Outcome (§11 of CASE-LUCI.md):
 * - Mint card with mode-aware outcome copy:
 *   Teaser: "In private beta with invited designers and developers."
 *   Launch: "Launched [date] on luci.pawprint.design."
 */
export function Outcome() {
  const ctx = useCaseStudy();
  const mode = ctx?.metadata.visibility ?? "teaser";

  const copy =
    mode === "full"
      ? "Launched [date] on luci.pawprint.design."
      : "In private beta with invited designers and developers.";

  return (
    <div className="my-6">
      <Card tone="mint" className="space-y-2">
        <span className="font-mono text-label uppercase tracking-wider text-on-pastel/80">
          Outcome
        </span>
        <p className="font-display text-h3 text-on-pastel">{copy}</p>
      </Card>
    </div>
  );
}
