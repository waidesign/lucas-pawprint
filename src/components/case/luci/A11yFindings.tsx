"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Chip } from "@/components/ui/Chip";
import { LUCI_A11Y_FINDINGS } from "@/content/case-studies/luci/proof";
import { springCalm } from "@/lib/motion";

type Finding = (typeof LUCI_A11Y_FINDINGS)[number];

function VerdictChip({ row }: { row: Finding }) {
  const isPass = row.verdict === "AAA";
  return (
    <Chip tone={isPass ? "mint" : "blush"} size="sm">
      <span aria-hidden="true">{isPass ? "✓ " : "✕ "}</span>
      <span>{row.verdict}</span>
    </Chip>
  );
}

/**
 * A11yFindings (V7 in CASE-LUCI.md §4 §6 & §6):
 * - Findings from `proof.ts` (anonymised labels — no site is named next to a failing check).
 * - Verdict chips: `blush` = fails, `mint` = AAA, always with the word + icon, not colour alone.
 * - md+: a 3-column table. Below md: a stacked hairline list (finding, then measured value
 *   and verdict), so the chips never get squeezed into a narrow table cell.
 * - Caption from the spec.
 */
export function A11yFindings() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <motion.figure
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={prefersReduced ? { duration: 0 } : springCalm}
      className="my-10 space-y-3"
    >
      {/* Below md: stacked list */}
      <ul
        aria-label="Accessibility findings measured by Luci"
        className="divide-y divide-line border-t-2 border-line-strong md:hidden"
      >
        {LUCI_A11Y_FINDINGS.map((row) => (
          <li key={row.label} className="space-y-3 py-4">
            <p className="font-body text-body font-medium text-text">
              {row.label}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-caption text-text-muted">
                {row.measured}
              </span>
              <VerdictChip row={row} />
            </div>
          </li>
        ))}
      </ul>

      {/* md+: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left font-body text-body text-text">
          <caption className="sr-only">
            Accessibility findings measured by Luci
          </caption>
          <thead>
            <tr className="border-b-2 border-line-strong">
              <th
                scope="col"
                className="px-4 py-4 font-mono text-label uppercase tracking-wider text-text-muted"
              >
                Finding
              </th>
              <th
                scope="col"
                className="px-4 py-4 font-mono text-label uppercase tracking-wider text-text-muted"
              >
                Measured
              </th>
              <th
                scope="col"
                className="px-4 py-4 font-mono text-label uppercase tracking-wider text-text-muted"
              >
                Verdict
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {LUCI_A11Y_FINDINGS.map((row) => (
              <tr key={row.label} className="hover:bg-surface/40">
                <td className="px-4 py-4 font-medium text-text">
                  {row.label}
                </td>
                <td className="px-4 py-4 font-mono text-body text-text">
                  {row.measured}
                </td>
                <td className="px-4 py-4">
                  <VerdictChip row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="font-body text-body italic text-text-muted">
        Luci flags small misses even on sites I admire — so the agent
        doesn&apos;t copy them.
      </figcaption>
    </motion.figure>
  );
}
