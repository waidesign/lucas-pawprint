"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { CaseStudyMetadata } from "@/lib/schema";
import { resolveCaseCta } from "@/lib/schema";
import { cn, TONE_BG_CLASSES } from "@/lib/cn";
import { springCalm } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/TextLink";
import { Loaffy } from "@/components/mascot/Loaffy";
import { LoopVideo } from "@/components/case/LoopVideo";

export interface CaseHeroProps {
  metadata: CaseStudyMetadata;
  /** Disable hero Loaffy peek (always disabled for Luci per AGENTS.md rule 11) */
  showLoaffy?: boolean;
  className?: string;
}

/** Pick a sensible default single word to highlight in the h1 if metadata.titleHighlight is omitted. */
function defaultTitleHighlight(title: string): string {
  const words = title.trim().split(/\s+/);
  return words[words.length - 1] ?? title;
}

/**
 * Home-style CaseHero (Phase 1.A):
 * - Small inline breadcrumb ("Work / {title}") inside the hero (no sticky bar)
 * - Meta line like CaseCard (optional Badge, year in mono label, role)
 * - h1 at display-xl (Rule 17) with ONE highlighted word via <Heading highlight>
 * - Summary in body-lg + Home-style pill CTAs (primary Button + secondary TextLink)
 * - Full-width cover stage below: the one sticker-shadow media card on the case's tone pastel,
 *   rounded-2xl, 2px pen border, gentle resting tilt straightening on hover (off under reduced motion).
 * - Loaffy peeks from the stage edge (never on Luci, Rule 11).
 */
export function CaseHero({
  metadata,
  showLoaffy = true,
  className,
}: CaseHeroProps) {
  const [stageHovered, setStageHovered] = useState(false);
  const prefersReduced = useReducedMotion() ?? false;

  const baseCover = metadata.cover.replace(/\.(webp|avif|png|jpe?g)$/i, "");
  const coverWebp = `${baseCover}.webp`;
  const coverAvif = `${baseCover}.avif`;

  const resolvedCta = resolveCaseCta(metadata.cta, metadata.visibility);
  const primaryHref = resolvedCta?.href ?? metadata.liveUrl;
  const primaryLabel =
    resolvedCta?.label ?? (metadata.liveUrl ? "Visit live site" : undefined);
  const primaryExternal = Boolean(primaryHref?.startsWith("http"));

  const secondaryHref = metadata.secondaryCta?.href ?? "/work";
  const secondaryLabel = (metadata.secondaryCta?.label ?? "All work").replace(
    /\s*[→↗]\s*$/,
    "",
  );
  const secondaryExternal = secondaryHref.startsWith("http");

  const highlightWord =
    metadata.titleHighlight ?? defaultTitleHighlight(metadata.title);
  const shouldShowLoaffy = showLoaffy && metadata.slug !== "luci";

  return (
    <header
      data-case-hero="true"
      className={cn(
        "w-full bg-bg px-4 pt-8 pb-12 md:px-10 md:pt-12 md:pb-20 lg:px-20",
        className,
      )}
    >
      <div className="space-y-8 md:space-y-12">
        {/* Inline breadcrumb inside the hero */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-caption text-text-muted">
            <li>
              <Link
                href="/work"
                className="inline-flex min-h-12 items-center px-1 font-medium text-text underline decoration-2 underline-offset-4 hover:text-text-muted"
              >
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-text">
              {metadata.title}
            </li>
          </ol>
        </nav>

        {/* Meta line + display-xl h1 with one highlighted word */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {metadata.badge && (
              <Badge label={metadata.badge} tone={metadata.tone} />
            )}
            <span className="font-mono text-label uppercase tracking-wider text-text-muted">
              {metadata.year}
            </span>
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
            <span className="font-body text-caption font-medium text-text-muted">
              {metadata.role}
            </span>
          </div>

          <Heading
            as="h1"
            highlight={highlightWord}
            highlightTone={metadata.tone}
          >
            {metadata.title}
          </Heading>

          <p className="max-w-3xl font-body text-body-lg text-text-muted">
            {metadata.summary}
          </p>

          {/* Pill CTAs styled like Home */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {primaryHref && primaryLabel && (
              <Button
                variant="primary"
                size="lg"
                href={primaryHref}
                external={primaryExternal}
                onClick={() => {
                  if (metadata.slug === "luci") {
                    trackEvent("luci_click", { location: "case_hero" });
                  }
                }}
              >
                {primaryLabel}
              </Button>
            )}

            <TextLink
              href={secondaryHref}
              external={secondaryExternal}
              tone={metadata.tone}
              iconEnd={
                !secondaryExternal ? (
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                ) : undefined
              }
              className="min-h-12 items-center font-body text-button font-semibold decoration-2"
            >
              {secondaryLabel}
            </TextLink>
          </div>
        </div>

        {/* Full-width cover stage: the hero's one sticker-shadow media card */}
        <div
          onMouseEnter={() => setStageHovered(true)}
          onMouseLeave={() => setStageHovered(false)}
          className={cn("relative", shouldShowLoaffy && "pt-8 md:pt-12")}
        >
          {shouldShowLoaffy && (
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={
                prefersReduced
                  ? { y: 0 }
                  : { y: stageHovered ? -8 : 0 }
              }
              transition={springCalm}
              className="pointer-events-none absolute right-6 top-0 z-0 md:right-12"
            >
              <Loaffy
                mood="curious"
                size={128}
                track={false}
                blink
                listenToBus={false}
                decorative
              />
            </motion.div>
          )}

          <div
            style={
              prefersReduced
                ? undefined
                : {
                    transform: stageHovered ? "rotate(0deg)" : "rotate(-1deg)",
                    transitionDuration: "var(--duration-base)",
                    transitionTimingFunction: "var(--ease-out-soft)",
                  }
            }
            className={cn(
              "relative z-10 overflow-hidden rounded-2xl border-2 border-line-strong shadow-sticker transition-transform",
              TONE_BG_CLASSES[metadata.tone],
            )}
          >
            {metadata.coverVideo ? (
              <LoopVideo
                webm={metadata.coverVideo.webm}
                mp4={metadata.coverVideo.mp4}
                poster={metadata.coverVideo.poster ?? coverWebp}
                alt={metadata.coverAlt}
                start={metadata.coverVideo.start}
                aspectClassName="aspect-16/10"
              />
            ) : (
              <picture>
                <source srcSet={coverAvif} type="image/avif" />
                <source srcSet={coverWebp} type="image/webp" />
                <img
                  src={coverWebp}
                  alt={metadata.coverAlt}
                  width={1200}
                  height={750}
                  loading="eager"
                  decoding="async"
                  className="block aspect-16/10 h-auto w-full object-cover"
                />
              </picture>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
