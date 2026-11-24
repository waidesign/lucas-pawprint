"use client";

import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";

import "./luci.css";
import { Clip } from "@/components/case/Clip";
import { cn } from "@/lib/cn";

const HOW_STEPS = [
  {
    number: 1,
    title: "Pick",
    copy: "Hover any component or section. Luci tells you if it can become a design.md. Images are blocked; real elements and SVG are fine.",
    clipId: "V5a",
    caption:
      'V5a · Hover outline + "can export ✓" / image + "can\'t export: it\'s a picture" chip',
    posterSlot: "[Poster slot: /case-studies/luci/v5a-pick-poster.webp]",
  },
  {
    number: 2,
    title: "Measure",
    copy: "Text, Colour and Spacing tools. Grab one value, or the whole type, colour or spacing system.",
    clipId: "V5b",
    caption: "V5b · Three looping mini demos for Text, Colour and Spacing",
    posterSlot: "[Poster slot: /case-studies/luci/v5b-measure-poster.webp]",
  },
  {
    number: 3,
    title: "Collect",
    copy: "Captures go into a basket, so you can gather from many sites before you export.",
    clipId: "V5c",
    caption: "V5c · Basket filling with 3 capture cards",
    posterSlot: "[Poster slot: /case-studies/luci/v5c-collect-poster.webp]",
  },
  {
    number: 4,
    title: "Export",
    copy: "A design.md with tokens, roles, components, states and accessibility checks, in px or rem, and hex, oklch or hsl.",
    clipId: "V5d",
    caption: "V5d · Settings toggles → design.md output updates",
    posterSlot: "[Poster slot: /case-studies/luci/v5d-export-poster.webp]",
  },
  {
    number: 5,
    title: "Tell your agent",
    copy: "Leave feedback right on the page, written so agents follow it across pages.",
    clipId: "V5e",
    caption: "V5e · Pins on two pages → one grouped session",
    posterSlot: "[Poster slot: /case-studies/luci/v5e-feedback-poster.webp]",
  },
] as const;

/**
 * HowSteps (V5a–e in CASE-LUCI.md §4 §5):
 * - Five alternating rows: copy card on one side + `<Clip>` placeholder with poster slot
 *   on the other side (clips load lazily, muted, playsInline, with captions).
 */
export function HowSteps() {
  return (
    <ol aria-label="How Luci works in five steps" className="my-10 space-y-10">
      {HOW_STEPS.map((step, index) => {
        const isReversed = index % 2 === 1;

        return (
          <li
            key={step.number}
            className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12"
          >
            <div
              className={cn(
                "space-y-4 lg:col-span-5",
                isReversed ? "lg:order-2" : "lg:order-1",
              )}
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong bg-lilac font-mono text-caption font-bold text-on-pastel"
                >
                  {step.number}
                </span>
                <h4
                  className={cn(
                    "font-display text-text text-balance",
                    HEADING_SCALE_CLASSES.h4,
                  )}
                >
                  {step.title}
                </h4>
              </div>
              <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                {step.copy}
              </p>
            </div>

            <div
              className={cn(
                "luci-brand-frame lg:col-span-7",
                isReversed ? "lg:order-1" : "lg:order-2",
              )}
            >
              <Clip
                caption={`${step.caption} · ${step.posterSlot}`}
                className="my-0"
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
