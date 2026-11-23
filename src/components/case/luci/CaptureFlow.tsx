"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LUCI_CAPTURES } from "@/content/case-studies/luci/proof";
import { springCalm, stagger } from "@/lib/motion";

const CANDY_DOTS = [
  "bg-lilac",
  "bg-mint",
  "bg-butter",
  "bg-sky",
  "bg-blush",
  "bg-pistachio",
] as const;

/**
 * CaptureFlow (V12 in CASE-LUCI.md §4 §10 & §6):
 * - 8 capture cards from `proof.ts` (site, sections, component kinds — no checks here),
 *   revealing with 80ms stagger.
 * - Then the flow pills: 8 Luci captures → Moodboard → Loaffy Candy tokens → This page.
 */
export function CaptureFlow() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="my-8 space-y-8">
      {/* 8 capture cards */}
      <ol
        aria-label="Eight reference sites captured with Luci"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {LUCI_CAPTURES.map((capture, index) => {
          const sectionsText =
            typeof capture.sections === "number"
              ? `${capture.sections} sections`
              : capture.sections;

          return (
            <motion.li
              key={capture.site}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { ...springCalm, delay: index * stagger }
              }
            >
              <Card
                tone="surface"
                className="flex h-full flex-col justify-between gap-3 bg-bg"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-h4 text-text">
                    {capture.site}
                  </span>
                  <span className="rounded-pill border border-line-strong bg-sky px-2.5 py-0.5 font-mono text-caption font-semibold text-on-pastel">
                    design.md
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-caption text-text-muted">
                  <span>{sectionsText}</span>
                  <span aria-hidden="true">·</span>
                  <span>{capture.componentKinds} component kinds</span>
                </div>
              </Card>
            </motion.li>
          );
        })}
      </ol>

      {/* Flow pills: 8 Luci captures → Moodboard → Loaffy Candy tokens → This page */}
      <div
        role="group"
        aria-label="From 8 Luci captures to this page"
        className="flex flex-wrap items-center gap-3 rounded-xl border-2 border-line-strong bg-bg p-6 shadow-sticker-sm"
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
