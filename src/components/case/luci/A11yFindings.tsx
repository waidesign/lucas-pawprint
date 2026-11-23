"use client";

import { motion, useReducedMotion } from "motion/react";
import { Chip } from "@/components/ui/Chip";
import { LUCI_A11Y_FINDINGS } from "@/content/case-studies/luci/proof";
import { springCalm } from "@/lib/motion";

/**
 * A11yFindings (V7 in CASE-LUCI.md §4 §6 & §6):
 * - Table from `proof.ts` findings (anonymised labels — no site is named next to a failing check).
 * - Verdict chips: `blush` = fails, `mint` = AAA, always with the word + icon, not colour alone.
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
      <div className="overflow-x-auto rounded-lg border-2 border-line-strong bg-bg shadow-sticker-sm">
        <table className="w-full border-collapse text-left font-body text-body text-text">
          <thead>
            <tr className="border-b-2 border-line-strong bg-surface">
              <th
                scope="col"
                className="px-6 py-4 font-mono text-label uppercase tracking-wider text-text-subtle"
              >
                Finding
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-mono text-label uppercase tracking-wider text-text-subtle"
              >
                Measured
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-mono text-label uppercase tracking-wider text-text-subtle"
              >
                Verdict
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {LUCI_A11Y_FINDINGS.map((row) => {
              const isPass = row.verdict === "AAA";
              return (
                <tr key={row.label} className="hover:bg-surface/50">
                  <td className="px-6 py-4 font-medium text-text">
                    {row.label}
                  </td>
                  <td className="px-6 py-4 font-mono text-body text-text">
                    {row.measured}
                  </td>
                  <td className="px-6 py-4">
                    <Chip
                      tone={isPass ? "mint" : "blush"}
                      size="sm"
                    >
                      <span aria-hidden="true">
                        {isPass ? "✓ " : "✕ "}
                      </span>
                      <span>{row.verdict}</span>
                    </Chip>
                  </td>
                </tr>
              );
            })}
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
