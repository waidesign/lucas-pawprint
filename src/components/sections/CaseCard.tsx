"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { springCalm } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { Loaffy } from "@/components/mascot/Loaffy";
import type { Form } from "@/components/mascot/LoaffyBus";
import { BetaBadge } from "@/components/ui/BetaBadge";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/TextLink";

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
  /** Put the thumbnail on the right on large screens (rows alternate). */
  reverse?: boolean;
  className?: string;
}

/* Title words rise out of a mask one by one (40ms beat). */
const WORD_STAGGER = 0.04;

/**
 * Case study row ([P1-A1], layout inspired by slush.app "Your shortcut to DeFi"):
 * - The cover image itself is the only card: 16:10, 2px pen border, `rounded-xl`,
 *   `shadow-sticker`, lift + slow zoom on hover (pastel `tone` shows while loading).
 *   Loaffy in the case's `form` peeks from behind its top edge on hover.
 * - Everything else sits plain on the canvas: meta line, a huge sentence-case title that
 *   reveals word by word, the summary, tags and a pill CTA (+ optional live-site link).
 * - Rows alternate thumbnail left / right on large screens; stacked on mobile.
 * - Links: the CTA is the accessible link; the thumbnail repeats it for pointer users
 *   (`tabIndex={-1}`, `aria-hidden`) so keyboard users meet one link per case.
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
  reverse = false,
  className,
}: CaseCardProps) {
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion() ?? false;
  const baseCover = cover.replace(/\.(webp|avif|png|jpe?g)$/i, "");
  const coverWebp = `${baseCover}.webp`;
  const coverAvif = `${baseCover}.avif`;
  const href = `/work/${slug}`;
  const titleWords = title.split(" ");

  const handleOpen = () => {
    trackEvent("case_open", { slug, featured });
    if (slug === "luci") {
      trackEvent("luci_click", { location: "case_card" });
    }
  };

  return (
    <article
      className={cn(
        "grid grid-cols-1 items-center gap-6 md:gap-10 lg:grid-cols-12 lg:gap-16",
        className,
      )}
    >
      {/* Thumbnail card (the only card in the row). Hovering it brings Loaffy's peek. */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative pt-8 md:pt-12 lg:col-span-6",
          reverse && "lg:order-2",
        )}
      >
        {/* Loaffy form peek, behind the card's top-right edge */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            prefersReduced
              ? { y: 0, opacity: hovered ? 1 : 0 }
              : { y: hovered ? -8 : 40, opacity: hovered ? 1 : 0 }
          }
          transition={springCalm}
          className="pointer-events-none absolute right-8 top-0 z-0"
        >
          <Loaffy
            form={form}
            mood="curious"
            size={64}
            track={false}
            blink={false}
            listenToBus={false}
            onStage={hovered}
            decorative
          />
        </motion.div>

        {/* The image itself is the card: pen border, rounded-xl, sticker shadow, lift on hover.
            The case's pastel shows only while the image loads. */}
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          onClick={handleOpen}
          className={cn(
            "group relative z-10 block w-full overflow-hidden rounded-xl border-2 border-line-strong lp-sticker-interactive",
            TONE_BG_CLASSES[tone],
          )}
        >
          <picture>
            <source srcSet={coverAvif} type="image/avif" />
            <source srcSet={coverWebp} type="image/webp" />
            <img
              src={coverWebp}
              alt=""
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              style={{
                transitionDuration: "var(--duration-slow)",
                transitionTimingFunction: "var(--ease-out-soft)",
              }}
              className="block aspect-16/10 h-auto w-full object-cover transition-transform group-hover:scale-105"
            />
          </picture>
        </Link>
        {/* The cover's description stays available to screen readers once. */}
        <span className="sr-only">{coverAlt}</span>
      </div>

      {/* Plain-on-canvas text column */}
      <div
        className={cn(
          "flex flex-col items-start gap-5 md:gap-6 lg:col-span-6 lg:gap-8",
          reverse && "lg:order-1",
        )}
      >
        {(badge || year || role) && (
          <div className="flex flex-wrap items-center gap-3">
            {badge && <BetaBadge label={badge} />}
            {year && (
              <span className="font-mono text-label uppercase tracking-wider text-text-muted">
                {year}
              </span>
            )}
            {role && (
              <span className="font-body text-caption font-medium text-text-muted">
                {role}
              </span>
            )}
          </div>
        )}

        <h3
          aria-label={title}
          className={cn(
            "font-display text-text text-balance",
            HEADING_SCALE_CLASSES.h3,
          )}
        >
          {titleWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              aria-hidden="true"
              className="inline-block overflow-hidden pb-1 align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={prefersReduced ? false : { y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ ...springCalm, delay: i * WORD_STAGGER }}
              >
                {word}
              </motion.span>
              {i < titleWords.length - 1 && " "}
            </span>
          ))}
        </h3>

        <p className="max-w-xl font-body text-body-lg font-medium text-text">
          {summary}
        </p>

        <ul aria-label={`${title} tags`} className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-pill border border-line-strong px-3 py-1 font-body text-caption font-medium text-text"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={href}
            onClick={handleOpen}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-pill border-2 border-transparent bg-inverse-bg px-6 font-body text-button font-semibold text-inverse-text lp-btn-primary"
          >
            <span>Read case study</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">: {title}</span>
          </Link>

          {liveUrl && (
            <TextLink
              href={liveUrl}
              external
              tone={tone}
              onClick={() => {
                if (slug === "luci") {
                  trackEvent("luci_click", { location: "case_card_live" });
                }
              }}
              className="mx-0 min-h-12 items-center gap-1.5 rounded-pill px-4 font-body text-button font-semibold decoration-2"
            >
              Live site<span className="sr-only"> for {title}</span>
            </TextLink>
          )}
        </div>
      </div>
    </article>
  );
}
