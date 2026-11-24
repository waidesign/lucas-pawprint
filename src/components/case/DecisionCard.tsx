import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import type { ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { DecisionHandPeek } from "./DecisionHandPeek";

export interface DecisionCardProps {
  title: string;
  problem: string;
  decision: string;
  why: string;
  tone?: Tone;
  children?: ReactNode;
  className?: string;
}

export function DecisionCard({
  title,
  problem,
  decision,
  why,
  tone = "sky",
  children,
  className,
}: DecisionCardProps) {
  return (
    <div className={cn("relative my-10", className)}>
      {/* The paw hangs over the 2px top rule behind Row 1 (z-0 under article's z-10) */}
      <DecisionHandPeek />

      <article className="relative z-10 border-b border-t-2 border-b-line border-t-line-strong pb-8">
        <div
          style={{ backgroundColor: "var(--chapter-bg, var(--lp-bg))" }}
          className="relative z-10 flex flex-wrap items-center justify-between gap-4 py-6"
        >
          <h3
            className={cn(
              "font-display text-current text-balance",
              HEADING_SCALE_CLASSES.h3,
            )}
          >
            {title}
          </h3>
          <span
            className={cn(
              "rounded-pill border border-on-pastel px-3 py-1 font-mono text-caption font-semibold",
              TONE_BG_CLASSES[tone],
            )}
          >
            Key decision
          </span>
        </div>

        <dl className="grid grid-cols-1 divide-y divide-line border-t border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="py-4 md:py-6 md:pr-6">
            <dt className="font-mono text-label uppercase tracking-wider text-current/75">
              Problem
            </dt>
            <dd className="mt-2 font-body text-body text-current">{problem}</dd>
          </div>

          <div className="py-4 md:px-6 md:py-6">
            <dt className="font-mono text-label uppercase tracking-wider text-current/75">
              Decision
            </dt>
            <dd className="mt-2 font-body text-body text-current">
              {decision}
            </dd>
          </div>

          <div className="py-4 md:py-6 md:pl-6">
            <dt className="font-mono text-label uppercase tracking-wider text-current/75">
              Why it worked
            </dt>
            <dd className="mt-2 font-body text-body text-current">{why}</dd>
          </div>
        </dl>

        {children && <div className="mt-6">{children}</div>}
      </article>
    </div>
  );
}
