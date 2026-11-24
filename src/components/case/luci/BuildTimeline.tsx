"use client";

import { BeanStepper } from "@/components/ui/BeanStepper";

const TIMELINE_STEPS = [
  "Research",
  "Product spec",
  "Design",
  "Build",
  "Private beta · Nov 2026",
  "Public launch · [date]",
];

/**
 * BuildTimeline (V11 in CASE-LUCI.md §4 §9):
 * - Horizontal BeanStepper-style timeline strip:
 *   Research → Product spec → Design → Build → Private beta · Nov 2026 → Public launch · [date].
 */
export function BuildTimeline() {
  return (
    <div className="my-8 overflow-x-auto border-y border-line py-6">
      <BeanStepper
        steps={TIMELINE_STEPS}
        current={4}
        orientation="horizontal"
      />
    </div>
  );
}
