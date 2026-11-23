import type { ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

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
    <article
      className={cn(
        "my-6 rounded-lg border-2 border-line-strong bg-bg p-6 shadow-sticker-sm",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
        <h3 className="font-display text-h4 text-text">{title}</h3>
        <span
          className={cn(
            "rounded-pill border border-line-strong px-3 py-0.5 font-mono text-caption font-semibold",
            TONE_BG_CLASSES[tone]
          )}
        >
          Key decision
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-sm border border-line bg-surface p-4">
          <dt className="font-body text-label uppercase text-text-muted">
            Problem
          </dt>
          <dd className="mt-2 font-body text-body text-text">{problem}</dd>
        </div>

        <div className="rounded-sm border border-line bg-surface p-4">
          <dt className="font-body text-label uppercase text-text-muted">
            Decision
          </dt>
          <dd className="mt-2 font-body text-body text-text">{decision}</dd>
        </div>

        <div className="rounded-sm border border-line bg-surface p-4">
          <dt className="font-body text-label uppercase text-text-muted">
            Why it worked
          </dt>
          <dd className="mt-2 font-body text-body text-text">{why}</dd>
        </div>
      </dl>

      {children && <div className="mt-4">{children}</div>}
    </article>
  );
}
