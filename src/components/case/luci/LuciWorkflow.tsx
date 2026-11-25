"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { springCalm } from "@/lib/motion";
import { cn } from "@/lib/cn";

const WORKFLOW_STEPS = [
  {
    number: "01.",
    step: "Show.",
    heading: "Capture exactly what you pick.",
    lead: "Pick a component, text style, colour or spacing value on any page. Luci writes a design file with measured values, including hover and focus states.",
    facts: [
      { label: "Four tools", text: "Component, Text, Colour and Spacing." },
      { label: "Every state", text: "Hover, focus, active and disabled." },
      { label: "One basket", text: "Collect picks across pages, export one file." },
      { label: "Your tokens", text: "Rewrite a capture onto your own tokens." },
    ],
  },
  {
    number: "02.",
    step: "Direct.",
    heading: "Point at it. Luci writes the prompt.",
    lead: "Pin a note on the exact element, or drag the layout into place. Luci turns it into one prompt, with the source file for each item.",
    facts: [
      { label: "Source lookup", text: "Component and file in React, Vue and Svelte." },
      { label: "One prompt", text: "Notes from several pages, each with an ID." },
      { label: "Layout mode", text: "Resize, move and insert parts, or sketch a page." },
      { label: "You decide", text: "Only you mark a note done." },
    ],
  },
  {
    number: "03.",
    step: "Check.",
    heading: "Check what the agent built.",
    lead: "Luci captures the built component the same way and compares it with the design, part by part.",
    facts: [
      { label: "Part by part", text: "Styles, states, anatomy, motion and accessibility." },
      { label: "One sentence each", text: "Every difference can become a feedback note." },
      { label: "Auto re-check", text: "Runs again when the page changes." },
    ],
  },
  {
    number: "04.",
    step: "Remember.",
    heading: "Agents that start informed.",
    lead: "Rules, decisions and the current task live in a .luci/ folder. Every agent reads them at the start of a session.",
    facts: [
      { label: "Conflicts flagged", text: "Contradicting rules, with file and line." },
      { label: "Right skills", text: "Only what the task needs, within a token budget." },
      { label: "Built for UI", text: "A skill library for UI, UX and front-end work." },
    ],
  },
] as const;

/**
 * LuciWorkflow: "One loop, four steps." (Show · Direct · Check · Remember).
 * Copy sourced directly from luci-site-by-pawprint-design/src/components/WorkflowSection.tsx.
 * Uses Home's ProcessStory display numerals in a plain hairline-separated layout (Rule 18).
 */
export function LuciWorkflow() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <ol className="my-10 divide-y divide-line border-b border-t-2 border-b-line border-t-line-strong">
      {WORKFLOW_STEPS.map((item, idx) => {
        const inner = (
          <div className="grid grid-cols-1 gap-6 py-8 md:py-12 lg:grid-cols-12 lg:gap-12">
            {/* Left 4 columns: ProcessStory-style numeral + step word */}
            <div className="space-y-2 lg:col-span-4">
              <span
                aria-hidden="true"
                className="block font-display text-h1 font-extrabold leading-none text-text"
              >
                {item.number}
              </span>
              <h3
                className={cn(
                  "font-display text-text text-balance",
                  HEADING_SCALE_CLASSES.h3,
                )}
              >
                {item.step}
              </h3>
            </div>

            {/* Right 8 columns: lead + 2-column facts */}
            <div className="space-y-6 lg:col-span-8">
              <div className="space-y-2">
                <p className="font-display text-h4 text-text">{item.heading}</p>
                <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                  {item.lead}
                </p>
              </div>

              <dl className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-2">
                {item.facts.map((fact) => (
                  <div key={fact.label} className="space-y-1">
                    <dt className="font-mono text-label uppercase tracking-wider text-text">
                      {fact.label}
                    </dt>
                    <dd className="font-body text-body text-text-muted">
                      {fact.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        );

        if (prefersReduced) {
          return <li key={item.step}>{inner}</li>;
        }

        return (
          <motion.li
            key={item.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ ...springCalm, delay: idx * 0.04 }}
          >
            {inner}
          </motion.li>
        );
      })}
    </ol>
  );
}
