"use client";

import { motion, useReducedMotion } from "motion/react";
import { RuledList } from "@/components/ui/RuledList";
import { KOFI_DESIGN_MD_EXCERPT } from "@/content/case-studies/luci/proof";
import { springCalm } from "@/lib/motion";

const CALLOUTS = [
  {
    marker: "1",
    text: "Says where every value came from",
  },
  {
    marker: "2",
    text: "Colours named by role, not just hex",
  },
  {
    marker: "3",
    text: "Type roles measured from the page",
  },
  {
    marker: "4",
    text: "Components point to tokens, so agents reuse them.",
  },
] as const;

function MarkerBean({ digit, label }: { digit: string; label?: string }) {
  return (
    <span
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong bg-lilac font-mono text-caption font-bold text-on-pastel"
    >
      {digit}
    </span>
  );
}

/**
 * AnnotatedExport (V6 in CASE-LUCI.md §4 §6 & LAYOUT-STEPS.md Step 3):
 * - Code panel (`bg-surface`, `rounded-lg`, `font-mono text-body` 16/24) with a left gutter
 *   of 32px lilac digit beans (1–4) so markers are never clipped by long lines.
 * - Right side: ordered `RuledList` using the same 32px digit beans (1–4).
 * - Never renders the captured site's colours as swatches (text only).
 */
export function AnnotatedExport() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="my-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      {/* Left 7 columns: Annotated design.md code block with left marker gutter */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={prefersReduced ? { duration: 0 } : springCalm}
        className="rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm lg:col-span-7"
      >
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-line pb-3">
          <span className="font-mono text-caption font-semibold text-text">
            ko-fi.design.md (excerpt)
          </span>
          <span className="rounded-pill border border-line-strong bg-bg px-3 py-1 font-mono text-caption text-text-muted">
            YAML · measured
          </span>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="Annotated design.md excerpt from ko-fi.com"
          className="overflow-x-auto"
        >
          <ol
            aria-label="Annotated design.md excerpt lines"
            className="min-w-max space-y-2 font-mono text-body text-text"
          >
            {KOFI_DESIGN_MD_EXCERPT.map(({ line, callout }, idx) => (
              <li
                key={`${idx}-${line}`}
                className="flex items-start gap-4"
              >
                <span className="flex w-8 shrink-0 justify-center">
                  {callout ? (
                    <MarkerBean digit={callout} label={`Annotation ${callout}`} />
                  ) : (
                    <span aria-hidden="true" className="h-6 w-8" />
                  )}
                </span>
                <pre
                  className={
                    callout
                      ? "whitespace-pre pt-1 font-mono text-body text-text"
                      : "whitespace-pre font-mono text-body text-text"
                  }
                >
                  <code>{line}</code>
                </pre>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>

      {/* Right 5 columns: RuledList annotations whose markers match 1–4 in code */}
      <div className="lg:col-span-5">
        <RuledList
          ordered
          compact
          items={CALLOUTS.map((item) => ({
            id: item.marker,
            marker: <MarkerBean digit={item.marker} />,
            body: (
              <span className="font-body text-body font-medium text-text">
                {item.text}
              </span>
            ),
          }))}
        />
      </div>
    </div>
  );
}
