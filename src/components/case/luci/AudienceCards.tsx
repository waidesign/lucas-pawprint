"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";

import { motion, useReducedMotion } from "motion/react";
import { Chip } from "@/components/ui/Chip";
import { IndexColumns } from "@/components/ui/IndexColumns";
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
 * AudienceCards (§4 of CASE-LUCI.md & LAYOUT-STEPS.md Step 3):
 * - Who it's for: IndexColumns (3 audiences as h4 titles)
 * - Jobs: 3 chips row as before
 */
export function AudienceCards() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="my-8 space-y-8">
      <div className="space-y-4">
        <h3
          className={cn(
            "font-display text-text text-balance",
            HEADING_SCALE_CLASSES.h3,
          )}
        >
          Who it&apos;s for
        </h3>
        <IndexColumns
          columns={3}
          as="h4"
          staggerSeconds={stagger}
          items={AUDIENCES.map((audience, idx) => ({
            id: audience,
            label: `0${idx + 1}`,
            title: audience,
          }))}
        />
      </div>

      <div className="space-y-3">
        <h3
          className={cn(
            "font-display text-text text-balance",
            HEADING_SCALE_CLASSES.h3,
          )}
        >
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
