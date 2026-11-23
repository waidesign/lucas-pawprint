"use client";

import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { springCalm, stagger } from "@/lib/motion";

const AUDIENCES = [
  "Designers who hand work to AI agents",
  "Developers who need exact tokens",
  "Anyone building with agents",
] as const;

const JOBS = [
  '"Grab this button\'s exact styles"',
  '"Get this site\'s colour system"',
  '"Tell my agent what\'s wrong on these three pages"',
] as const;

/**
 * AudienceCards (§4 of CASE-LUCI.md):
 * - Who it's for: 3 small cards
 * - Jobs: 3 chips
 * - Scroll reveal with 80ms stagger.
 */
export function AudienceCards() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="my-8 space-y-6">
      <div className="space-y-3">
        <h3 className="font-mono text-label uppercase tracking-wider text-text-subtle">
          Who it&apos;s for
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {AUDIENCES.map((audience, index) => (
            <motion.div
              key={audience}
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
                className="flex h-full items-center bg-bg"
              >
                <p className="font-display text-h4 text-text">{audience}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-mono text-label uppercase tracking-wider text-text-subtle">
          Jobs
        </h3>
        <ul
          aria-label="Jobs Luci is hired for"
          className="flex flex-wrap gap-3"
        >
          {JOBS.map((job, index) => (
            <motion.li
              key={job}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      ...springCalm,
                      delay: (AUDIENCES.length + index) * stagger,
                    }
              }
            >
              <Chip tone="butter" size="md">
                {job}
              </Chip>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
