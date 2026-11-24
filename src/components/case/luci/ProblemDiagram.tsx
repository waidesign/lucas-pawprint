"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";

import { motion, useReducedMotion } from "motion/react";
import { Chip } from "@/components/ui/Chip";
import { springCalm, stagger } from "@/lib/motion";

function TooMuchScene() {
  return (
    <svg
      viewBox="0 0 120 72"
      aria-hidden="true"
      className="h-18 w-30 text-text"
    >
      {/* Tall overflowing document stack representing a whole-site design.md dump */}
      <rect
        x="24"
        y="8"
        width="72"
        height="56"
        rx="8"
        fill="var(--lp-bg)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="34"
        y1="20"
        x2="86"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="28"
        x2="78"
        y2="28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <line
        x1="34"
        y1="36"
        x2="84"
        y2="36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <line
        x1="34"
        y1="44"
        x2="72"
        y2="44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      <line
        x1="34"
        y1="52"
        x2="80"
        y2="52"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.2"
      />
    </svg>
  );
}

function GuessedScene() {
  return (
    <svg
      viewBox="0 0 120 72"
      aria-hidden="true"
      className="h-18 w-30 text-text"
    >
      {/* Picture frame with dashed uncertain button and question mark */}
      <rect
        x="20"
        y="10"
        width="80"
        height="52"
        rx="8"
        fill="var(--lp-bg)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="34"
        y="26"
        width="52"
        height="20"
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <text
        x="60"
        y="41"
        textAnchor="middle"
        fill="currentColor"
        fontSize="12"
        fontFamily="var(--font-mono)"
        fontWeight="700"
      >
        ?
      </text>
    </svg>
  );
}

function LostScene() {
  return (
    <svg
      viewBox="0 0 120 72"
      aria-hidden="true"
      className="h-18 w-30 text-text"
    >
      {/* Three mini page cards: one active, two faded/dropped */}
      <rect
        x="14"
        y="16"
        width="26"
        height="40"
        rx="6"
        fill="var(--lp-bg)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="27" cy="36" r="4" fill="currentColor" />

      <rect
        x="47"
        y="16"
        width="26"
        height="40"
        rx="6"
        fill="var(--lp-bg)"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 3"
        opacity="0.4"
      />
      <circle cx="60" cy="36" r="4" fill="currentColor" opacity="0.35" />

      <rect
        x="80"
        y="16"
        width="26"
        height="40"
        rx="6"
        fill="var(--lp-bg)"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 3"
        opacity="0.4"
      />
      <circle cx="93" cy="36" r="4" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

const PROBLEM_COLUMNS = [
  {
    title: "Too much",
    copy: "A whole site → a very long design.md → the agent skims",
    Scene: TooMuchScene,
  },
  {
    title: "Guessed",
    copy: 'A screenshot → the agent invents values ("probably 16px?")',
    Scene: GuessedScene,
  },
  {
    title: "Lost",
    copy: "Feedback on 3 pages → the agent follows 1",
    Scene: LostScene,
  },
] as const;

/**
 * ProblemDiagram (V2 in CASE-LUCI.md §4 §3):
 * - Three cards (Too much / Guessed / Lost), each with an inline SVG icon scene,
 *   one line of copy, and a blush "✕" chip.
 * - Full-width mint "✓ Luci: one component, measured values, one feedback session." bar beneath.
 */
export function ProblemDiagram() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div
      role="group"
      aria-label="Comparison of whole-site extractors, screenshots, and multi-page feedback versus Luci"
      className="my-8 space-y-8"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {PROBLEM_COLUMNS.map(({ title, copy, Scene }, index) => (
          <motion.div
            key={title}
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { ...springCalm, delay: index * stagger }
            }
            className="flex h-full flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h3
                className={cn(
                  "font-display text-text text-balance hyphens-auto break-words",
                  HEADING_SCALE_CLASSES.h3,
                )}
              >
                {title}
              </h3>
              <Chip tone="blush" size="sm">
                <span aria-hidden="true">✕</span>
                <span className="sr-only">Problem</span>
              </Chip>
            </div>

            <div className="flex items-center justify-center rounded-md border-2 border-line-strong bg-bg py-4">
              <Scene />
            </div>

            <p className="font-body text-body text-text-muted">{copy}</p>
          </motion.div>
        ))}
      </div>

      {/* Margin-note resolution */}
      <motion.aside
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { ...springCalm, delay: PROBLEM_COLUMNS.length * stagger }
        }
        className="flex flex-wrap items-center gap-3 border-l-2 border-line-strong pl-6"
      >
        <span
          aria-hidden="true"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong bg-mint font-mono text-body font-bold text-on-pastel"
        >
          ✓
        </span>
        <p className="font-body text-body-lg font-semibold text-text">
          Luci: one component, measured values, one feedback session.
        </p>
      </motion.aside>
    </div>
  );
}
