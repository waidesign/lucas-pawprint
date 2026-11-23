"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { springCalm } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { Loaffy } from "@/components/mascot/Loaffy";
import type { Form } from "@/components/mascot/LoaffyBus";
import { BetaBadge } from "@/components/ui/BetaBadge";

export interface CaseCardProps {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  tone: Tone;
  cover: string;
  coverAlt: string;
  form: Form;
  liveUrl?: string;
  featured?: boolean;
  badge?: string;
  year?: string;
  role?: string;
  className?: string;
}

/**
 * CaseCard per COMPONENTS.md §D & LOAFFY-ANIMATION.md §6.3:
 * - Pastel bg (`tone`), 2px pen border, `rounded-xl`, `shadow-sticker`, padding 24 mobile / 32 desktop.
 * - Whole card is one link (`<Link>` overlay), with `liveUrl` rendered as a separate,
 *   non-nested sibling `<a>` at higher z-index.
 * - Hover: card lifts, cover image wipes/scales gently, and Loaffy in the case's `form`
 *   peeks up 24px from behind the cover's top-right corner with `mood="curious"` (no text overlap).
 * - Featured = 7/5 split layout; others = stacked.
 */
export function CaseCard({
  slug,
  title,
  summary,
  tags,
  tone,
  cover,
  coverAlt,
  form,
  liveUrl,
  featured = false,
  badge,
  year,
  role,
  className,
}: CaseCardProps) {
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion() ?? false;
  const baseCover = cover.replace(/\.(webp|avif|png|jpe?g)$/i, "");
  const coverWebp = `${baseCover}.webp`;
  const coverAvif = `${baseCover}.avif`;

  const handleCardClick = () => {
    trackEvent("case_open", { slug, featured });
    if (slug === "luci") {
      trackEvent("luci_click", { location: "case_card" });
    }
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative rounded-xl border-2 border-line-strong p-6 lp-sticker-interactive md:p-8",
        TONE_BG_CLASSES[tone],
        featured
          ? "grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
          : "flex h-full flex-col justify-between gap-6",
        className
      )}
    >
      {/* Main stretch link covering the card (no nested anchors inside) */}
      <Link
        href={`/work/${slug}`}
        aria-label={`Read case study: ${title}`}
        onClick={handleCardClick}
        className="absolute inset-0 z-10 rounded-xl"
      />

      {/* Cover column with Loaffy form peeking from behind top-right corner */}
      <div
        className={cn(
          "relative pt-6",
          featured ? "lg:col-span-7" : "w-full"
        )}
      >
        {/* Loaffy form peek (sits behind the cover's top-right edge, slides up 24px on hover) */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            prefersReduced
              ? { y: 0, opacity: hovered ? 1 : 0 }
              : {
                  y: hovered ? -20 : 12,
                  opacity: hovered ? 1 : 0,
                }
          }
          transition={springCalm}
          className="pointer-events-none absolute right-4 top-0 z-0"
        >
          <Loaffy
            form={form}
            mood="curious"
            size={64}
            track={false}
            blink={false}
            listenToBus={false}
            decorative
          />
        </motion.div>

        {/* Quiet device frame sitting above the peeking Loaffy bottom edge */}
        <div className="relative z-10 overflow-hidden rounded-md border-2 border-line-strong bg-bg shadow-sticker-sm">
          <div className="flex h-8 items-center gap-2 border-b-2 border-line-strong bg-surface px-3">
            <span className="h-2.5 w-2.5 rounded-pill border border-line-strong bg-blush" />
            <span className="h-2.5 w-2.5 rounded-pill border border-line-strong bg-butter" />
            <span className="h-2.5 w-2.5 rounded-pill border border-line-strong bg-mint" />
            <span className="ml-2 truncate font-mono text-caption text-text-muted">
              {title}
            </span>
          </div>

          <div className="relative aspect-16/10 w-full overflow-hidden bg-surface">
            <picture>
              <source srcSet={coverAvif} type="image/avif" />
              <source srcSet={coverWebp} type="image/webp" />
              <img
                src={coverWebp}
                alt={coverAlt}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                style={{
                  transitionDuration: "var(--duration-base)",
                  transitionTimingFunction: "var(--ease-out-soft)",
                }}
                className="block h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Text & action column */}
      <div
        className={cn(
          "flex flex-col justify-between gap-4",
          featured ? "lg:col-span-5" : "flex-1"
        )}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {badge && <BetaBadge label={badge} />}
            {year && (
              <span className="rounded-pill border border-line-strong bg-bg px-3 py-0.5 font-mono text-caption text-text">
                {year}
              </span>
            )}
            {role && (
              <span className="font-body text-caption font-medium text-on-pastel/80">
                {role}
              </span>
            )}
          </div>

          <h3 className="font-display text-h2 text-on-pastel">{title}</h3>

          <p className="font-body text-body text-on-pastel/90">{summary}</p>

          <ul
            aria-label={`${title} tags`}
            className="flex flex-wrap gap-2 pt-2"
          >
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-pill border border-line-strong bg-bg px-3 py-1 font-body text-caption font-medium text-text"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer links row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-strong/20 pt-4">
          <span className="inline-flex min-h-12 items-center font-body text-button font-semibold text-on-pastel underline decoration-2 underline-offset-4">
            Read case study →
          </span>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (slug === "luci") {
                  trackEvent("luci_click", { location: "case_card_live" });
                }
              }}
              className="relative z-20 inline-flex min-h-12 items-center gap-1 rounded-pill border-2 border-line-strong bg-bg px-4 font-body text-caption font-semibold text-text lp-sticker-sm-interactive"
            >
              <span>Live site</span>
              <span aria-hidden="true">↗</span>
              <span className="sr-only">
                {" "}
                for {title} (opens in new tab)
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
