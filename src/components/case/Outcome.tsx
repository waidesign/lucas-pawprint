"use client";

import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { cn, type Tone } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

export interface OutcomeProps {
  /** Large qualitative outcome statement (rendered as a <p> at h3 token size, Rule 17) */
  statement?: string;
  /** Plain "What shipped" checklist */
  shipped?: string[];
  /** Optional explicit live URL (defaults to metadata.liveUrl) */
  liveUrl?: string;
  /** Optional explicit live CTA label */
  liveLabel?: string;
  /** Optional secondary link (e.g. GitHub repo) */
  secondaryHref?: string;
  secondaryLabel?: string;
  tone?: Tone;
  className?: string;
}

/**
 * Case study Outcome block:
 * - One large qualitative statement (`font-display text-h3` on a `<p>`, not a heading size violation)
 * - Plain "What shipped" list separated by 1px hairlines (zero cards, Rule 18)
 * - Live site button + optional secondary link.
 */
export function Outcome({
  statement,
  shipped,
  liveUrl,
  liveLabel,
  secondaryHref,
  secondaryLabel,
  tone,
  className,
}: OutcomeProps) {
  const ctx = useCaseStudy();
  const meta = ctx?.metadata;
  const resolvedStatement = statement ?? meta?.tldr.outcome ?? "";
  const resolvedLiveUrl = liveUrl ?? meta?.liveUrl;
  const resolvedTone = tone ?? meta?.tone ?? "lilac";
  const resolvedLiveLabel =
    liveLabel ?? (meta?.slug === "luci" ? "Try Luci" : "Visit live site");
  const resolvedSecondaryHref = secondaryHref ?? meta?.secondaryCta?.href;
  const resolvedSecondaryLabel = secondaryLabel ?? meta?.secondaryCta?.label;

  return (
    <div
      className={cn(
        "my-10 space-y-8 border-t-2 border-line-strong pt-8",
        className,
      )}
    >
      <div className="space-y-3">
        <span className="block font-mono text-label uppercase tracking-wider text-text-muted">
          Outcome
        </span>
        {resolvedStatement && (
          <p className="max-w-3xl font-display text-h3 text-text text-pretty">
            {resolvedStatement}
          </p>
        )}
      </div>

      {shipped && shipped.length > 0 && (
        <div className="space-y-4">
          <span className="block font-mono text-label uppercase tracking-wider text-text-muted">
            What shipped
          </span>
          <ul className="divide-y divide-line border-y border-line">
            {shipped.map((item) => (
              <li
                key={item}
                className="py-4 font-body text-body-lg text-text"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(resolvedLiveUrl || resolvedSecondaryHref) && (
        <div className="flex flex-wrap items-center gap-6 pt-2">
          {resolvedLiveUrl && (
            <Button
              variant="primary"
              size="lg"
              href={resolvedLiveUrl}
              external
              onClick={() => {
                if (meta?.slug === "luci") {
                  trackEvent("luci_click", { location: "case_outcome" });
                }
              }}
            >
              {resolvedLiveLabel}
            </Button>
          )}
          {resolvedSecondaryHref && resolvedSecondaryLabel && (
            <TextLink
              href={resolvedSecondaryHref}
              external={resolvedSecondaryHref.startsWith("http")}
              tone={resolvedTone}
              className="min-h-12 items-center font-body text-button font-semibold decoration-2"
            >
              {resolvedSecondaryLabel}
            </TextLink>
          )}
        </div>
      )}
    </div>
  );
}
