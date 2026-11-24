"use client";

import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { IndexColumns } from "@/components/ui/IndexColumns";
import { LUCI_CAPTURES } from "@/content/case-studies/luci/proof";
import { stagger } from "@/lib/motion";

const CANDY_DOTS = [
  "bg-lilac",
  "bg-mint",
  "bg-butter",
  "bg-sky",
  "bg-blush",
  "bg-pistachio",
] as const;

/**
 * CaptureFlow (V12 in CASE-LUCI.md §4 §10 & LAYOUT-STEPS.md Step 3):
 * - 8 text-only captures rendered via IndexColumns (4 columns at lg) + unboxed flow pills.
 */
export function CaptureFlow() {
  return (
    <div className="my-8 space-y-10">
      <IndexColumns
        columns={4}
        ordered
        staggerSeconds={stagger}
        items={LUCI_CAPTURES.map((capture) => {
          const sectionsText =
            typeof capture.sections === "number"
              ? `${capture.sections} sections`
              : capture.sections;

          return {
            id: capture.site,
            label: (
              <Chip tone="sky" size="sm">
                design.md
              </Chip>
            ),
            body: (
              <div className="space-y-1">
                <p className="font-display text-h4 text-text">{capture.site}</p>
                <p className="font-mono text-caption text-text-muted">
                  {sectionsText} · {capture.componentKinds} component kinds
                </p>
              </div>
            ),
          };
        })}
      />

      {/* Flow pills: 8 Luci captures → Moodboard → Loaffy Candy tokens → This page */}
      <div
        role="group"
        aria-label="From 8 Luci captures to this page"
        className="flex flex-wrap items-center gap-3 pt-2"
      >
        <div className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-line-strong bg-surface px-4 font-body text-body font-semibold text-text">
          <span>8 Luci captures</span>
        </div>

        <ArrowRight
          className="h-5 w-5 shrink-0 text-text-muted"
          aria-hidden="true"
        />

        <div className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-line-strong bg-butter px-4 font-body text-body font-semibold text-on-pastel">
          <span>Moodboard</span>
        </div>

        <ArrowRight
          className="h-5 w-5 shrink-0 text-text-muted"
          aria-hidden="true"
        />

        <div className="inline-flex min-h-12 items-center gap-3 rounded-pill border-2 border-line-strong bg-surface px-4 font-body text-body font-semibold text-text">
          <span className="flex items-center gap-1" aria-hidden="true">
            {CANDY_DOTS.map((bgClass) => (
              <span
                key={bgClass}
                className={`h-3 w-3 rounded-pill border border-line-strong ${bgClass}`}
              />
            ))}
          </span>
          <span>Loaffy Candy tokens</span>
        </div>

        <ArrowRight
          className="h-5 w-5 shrink-0 text-text-muted"
          aria-hidden="true"
        />

        <div className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-line-strong bg-mint px-4 font-body text-body font-semibold text-on-pastel shadow-sticker-sm">
          <span>This page</span>
        </div>
      </div>
    </div>
  );
}
