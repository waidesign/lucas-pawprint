"use client";

import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { KOFI_DESIGN_MD_EXCERPT } from "@/content/case-studies/luci/proof";
import { springCalm, stagger } from "@/lib/motion";

const CALLOUTS = [
  {
    marker: "①",
    text: "Says where every value came from",
  },
  {
    marker: "②",
    text: "Colours named by role, not just hex",
  },
  {
    marker: "③",
    text: "Type roles measured from the page",
  },
  {
    marker: "④",
    text: "Components point to tokens, so agents reuse them.",
  },
] as const;

/**
 * AnnotatedExport (V6 in CASE-LUCI.md §4 §6):
 * - Code panel (`bg-surface`, `rounded-lg`, `font-mono text-body` 16/24) with the
 *   exact ko-fi.com excerpt from the spec, numbered ①–④ markers, and 4 callout cards beside it.
 * - Never renders the captured site's colours as swatches (text only).
 */
export function AnnotatedExport() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="my-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      {/* Left 7 columns: Annotated design.md code block (surface, rounded-lg, mono 16/24) */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={prefersReduced ? { duration: 0 } : springCalm}
        className="overflow-x-auto rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm lg:col-span-7"
      >
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
          <span className="font-mono text-caption font-semibold text-text">
            ko-fi.design.md (excerpt)
          </span>
          <span className="rounded-pill border border-line-strong bg-bg px-3 py-1 font-mono text-caption text-text-muted">
            YAML · measured
          </span>
        </div>

        <ol
          aria-label="Annotated design.md excerpt from ko-fi.com"
          className="space-y-1 font-mono text-body text-text"
        >
          {KOFI_DESIGN_MD_EXCERPT.map(({ line, callout }, idx) => (
            <li
              key={`${idx}-${line}`}
              className="flex items-start justify-between gap-4"
            >
              <pre className="overflow-x-auto whitespace-pre font-mono text-body text-text">
                <code>{line}</code>
              </pre>
              {callout && (
                <span
                  aria-label={`Callout ${callout}`}
                  className="inline-flex h-6 shrink-0 items-center rounded-pill border border-line-strong bg-lilac px-2 font-mono text-caption font-bold text-on-pastel"
                >
                  {callout}
                </span>
              )}
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Right 5 columns: 4 numbered callout cards */}
      <ol
        aria-label="Design.md export annotations"
        className="space-y-4 lg:col-span-5"
      >
        {CALLOUTS.map((item, index) => (
          <motion.li
            key={item.marker}
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { ...springCalm, delay: (index + 1) * stagger }
            }
          >
            <Card
              tone="surface"
              className="flex items-center gap-4 bg-bg"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong bg-lilac font-mono text-body font-bold text-on-pastel shadow-sticker-sm"
              >
                {item.marker}
              </span>
              <p className="font-body text-body font-medium text-text">
                {item.text}
              </p>
            </Card>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
