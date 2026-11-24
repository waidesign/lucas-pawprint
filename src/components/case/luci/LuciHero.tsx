"use client";

import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";

import "./luci.css";
import { motion, useReducedMotion } from "motion/react";
import {
  Crosshair,
  Type,
  Palette,
  Ruler,
  ShoppingBasket,
  MessageSquarePlus,
  SlidersHorizontal,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { resolveCaseCta } from "@/lib/schema";
import { MetaRow, type MetaItem } from "@/components/case/MetaRow";
import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { Loaffy } from "@/components/mascot/Loaffy";
import { springCalm } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";

const DESIGN_MD_LINES = [
  "component: button.get-started",
  "scope: single-element",
  "states: [default, hover, focus, active]",
  'backgroundColor: "{colors.surface-variant}"',
  'color: "{colors.surface}"',
  'rounded: "{rounded.r-9999}"',
  'padding: "1.25rem 1.75rem"',
  'wcag: "AAA · passes contrast"',
] as const;

const TOOLBAR_TOOLS = [
  { label: "Capture", Icon: Crosshair, active: true },
  { label: "Text", Icon: Type, active: false },
  { label: "Colour", Icon: Palette, active: false },
  { label: "Spacing", Icon: Ruler, active: false },
  { label: "Basket", Icon: ShoppingBasket, active: false },
  { label: "Feedback", Icon: MessageSquarePlus, active: false },
  { label: "Settings", Icon: SlidersHorizontal, active: false },
] as const;

/**
 * LuciHero (§1 of CASE-LUCI.md):
 * - 12-col grid on `bg-lilac-soft`: left 5 cols (eyebrow, "Luci" display title + BetaBadge,
 *   body-lg sub, MetaRow, mode-aware CTAs), right 7 cols V1 illustration on a lilac stage
 *   (`rounded-2xl`, 2px pen border).
 * - Loaffy (`form="window"`, `size={128}`, decorative) peeking from the top-right corner
 *   of the stage outside the visual, never over text.
 * - Motion on load (40ms grid): outline draws 480ms → chip pops 280ms (`springCalm`) →
 *   8 design.md lines type in at 40ms per line. Reduced motion: final frame immediately.
 */
export function LuciHero() {
  const ctx = useCaseStudy();
  const meta = ctx?.metadata;
  const prefersReduced = useReducedMotion() ?? false;

  const mode = meta?.visibility ?? "teaser";
  const isFull = mode === "full";

  const badgeLabel = isFull ? "Live" : (meta?.badge ?? "Private beta");

  const primaryCta = resolveCaseCta(meta?.cta, mode) ?? {
    label: "Try Luci",
    href: "https://luci.pawprint.design",
  };

  const secondaryCta = isFull
    ? {
        label: "Read the docs",
        href: "https://luci.pawprint.design",
      }
    : {
        label: "Visit luci.pawprint.design",
        href: meta?.liveUrl ?? "https://luci.pawprint.design",
      };

  const heroMetaItems: MetaItem[] = [
    { label: "Role", value: "Founder, product designer, builder" },
    { label: "Timeline", value: "2026" },
    { label: "Platform", value: "Browser extension + npm toolbar" },
    { label: "Status", value: isFull ? "Live" : "Private beta" },
    ...(isFull ? [{ label: "Licence", value: "MIT" }] : []),
  ];

  return (
    <header
      aria-labelledby="luci-hero-title"
      className="w-full border-b border-line bg-lilac-soft px-4 py-12 md:px-10 md:py-16 lg:px-20"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left 5 columns: Eyebrow, Title + BetaBadge, Sub, Meta, CTAs */}
          <div className="space-y-6 lg:col-span-5">
            <Eyebrow>CASE STUDY · MY OWN PRODUCT · 2026</Eyebrow>

            <div className="flex flex-wrap items-center gap-3">
              <h1
                id="luci-hero-title"
                className={cn(
                  "font-display text-text",
                  HEADING_SCALE_CLASSES.h1,
                )}
              >
                {meta?.title ?? "Luci"}
              </h1>
              <Badge label={badgeLabel} />
            </div>

            <p className="font-body text-body-lg text-text">
              A toolbar that turns any part of any website into a design.md your
              AI coding agent can actually build from.
            </p>

            <MetaRow
              items={heroMetaItems}
              className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                href={primaryCta.href}
                onClick={() =>
                  trackEvent("luci_click", {
                    location: "case_hero_primary",
                    mode,
                  })
                }
              >
                {primaryCta.label}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                href={secondaryCta.href}
                external
                onClick={() =>
                  trackEvent("luci_click", {
                    location: "case_hero_secondary",
                    mode,
                  })
                }
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* Right 7 columns: V1 Hero Composition on a lilac stage + Loaffy window peek */}
          <div className="relative pt-16 lg:col-span-7">
            {/* Decorative Loaffy in window form (128px) peeking from top-right corner outside V1 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-0 z-0"
            >
              <Loaffy
                form="window"
                mood="curious"
                size={128}
                track={false}
                blink
                listenToBus={false}
                decorative
              />
            </div>

            {/* Lilac stage */}
            <div className="relative z-10 rounded-2xl border-2 border-line-strong bg-lilac p-4 shadow-sticker md:p-6">
              {/* V1 inline SVG/HTML illustration scoped to Luci's brand palette */}
              <figure
                role="img"
                aria-label="Illustration of Luci's toolbar selecting a Get started button on a sample landing page and generating its design.md."
                className="luci-brand-frame overflow-hidden rounded-md border-2 border-line-strong shadow-sticker-sm"
                style={{
                  backgroundColor: "var(--luci-surface)",
                  color: "var(--luci-ink)",
                }}
              >
                {/* Browser chrome header */}
                <div
                  className="flex h-10 items-center justify-between border-b-2 border-line-strong px-4"
                  style={{
                    backgroundColor: "var(--luci-surface)",
                    color: "var(--luci-ink)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-pill border border-line-strong bg-blush" />
                    <span className="h-3 w-3 rounded-pill border border-line-strong bg-butter" />
                    <span className="h-3 w-3 rounded-pill border border-line-strong bg-mint" />
                  </div>
                  <div
                    className="rounded-pill border border-line-strong px-3 py-1 font-mono text-caption"
                    style={{
                      backgroundColor: "var(--luci-surface)",
                      color: "var(--luci-ink)",
                    }}
                  >
                    acme-studio.example
                  </div>
                  <span className="font-mono text-caption opacity-70">
                    Luci active
                  </span>
                </div>

                {/* Main viewport: Sample landing page (left) + design.md inspector side panel (right) */}
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Invented neutral landing page canvas */}
                  <div className="relative flex flex-col justify-between gap-6 p-6 md:col-span-7">
                    {/* Sample site top bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-4 w-4 rounded-xs border border-line-strong"
                          style={{ backgroundColor: "var(--luci-accent)" }}
                        />
                        <span className="font-display text-caption font-bold">
                          Acme Studio
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-body text-caption opacity-70">
                        <span>Features</span>
                        <span>Docs</span>
                      </div>
                    </div>

                    {/* Sample site hero copy + selected "Get started" button */}
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <div
                          className="h-3 w-24 rounded-pill opacity-30"
                          style={{ backgroundColor: "var(--luci-ink)" }}
                        />
                        <p className="font-display text-h4 font-bold">
                          Ship calm interfaces faster.
                        </p>
                        <div
                          className="h-3 w-48 max-w-full rounded-pill opacity-25"
                          style={{ backgroundColor: "var(--luci-ink)" }}
                        />
                      </div>

                      {/* Target button with animated dashed selection outline + popping status chip */}
                      <div className="relative inline-block pt-6">
                        {/* Selection chip: pops at 480ms (duration 280ms via springCalm) */}
                        <motion.div
                          initial={
                            prefersReduced
                              ? { opacity: 1, scale: 1, y: 0 }
                              : { opacity: 0, scale: 0.84, y: 8 }
                          }
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={
                            prefersReduced
                              ? { duration: 0 }
                              : { ...springCalm, delay: 0.48 }
                          }
                          className="mb-2 inline-flex items-center gap-2 rounded-pill border-2 border-line-strong px-3 py-1 font-mono text-caption font-semibold shadow-sticker-sm"
                          style={{
                            backgroundColor: "var(--luci-accent)",
                            color: "var(--luci-ink)",
                          }}
                        >
                          <span>Button · 4 states · can export ✓</span>
                        </motion.div>

                        <div className="relative inline-flex items-center">
                          <span
                            className="inline-flex h-10 items-center rounded-pill px-5 font-body text-caption font-semibold"
                            style={{
                              backgroundColor: "var(--luci-ink)",
                              color: "var(--luci-surface)",
                            }}
                          >
                            Get started
                          </span>

                          {/* Animated dashed selection outline (draws over 480ms) */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-2"
                          >
                            <svg
                              viewBox="0 0 144 56"
                              className="h-full w-full overflow-visible"
                            >
                              <motion.rect
                                x="2"
                                y="2"
                                width="140"
                                height="52"
                                rx="24"
                                fill="none"
                                stroke="var(--luci-accent-deep)"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                initial={
                                  prefersReduced
                                    ? { pathLength: 1, opacity: 1 }
                                    : { pathLength: 0, opacity: 1 }
                                }
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={
                                  prefersReduced
                                    ? { duration: 0 }
                                    : {
                                        duration: 0.48,
                                        ease: [0.22, 1, 0.36, 1],
                                      }
                                }
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Spacer above docked toolbar */}
                    <div className="h-2" />
                  </div>

                  {/* Right side panel: first 8 lines of design.md (mono 12/20) */}
                  <div
                    className="border-t-2 border-line-strong p-4 md:col-span-5 md:border-l-2 md:border-t-0"
                    style={{
                      backgroundColor: "var(--luci-ink)",
                      color: "var(--luci-surface)",
                    }}
                  >
                    <div className="mb-3 flex items-center justify-between border-b border-line pb-2">
                      <span className="font-mono text-caption font-semibold">
                        design.md
                      </span>
                      <span
                        className="rounded-pill px-2 py-1 font-mono text-caption font-semibold"
                        style={{
                          backgroundColor: "var(--luci-accent)",
                          color: "var(--luci-ink)",
                        }}
                      >
                        measured
                      </span>
                    </div>

                    <ol
                      aria-label="First 8 lines of exported design.md"
                      className="space-y-1 font-mono text-caption leading-5"
                    >
                      {DESIGN_MD_LINES.map((line, index) => (
                        <motion.li
                          key={line}
                          initial={
                            prefersReduced
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -4 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={
                            prefersReduced
                              ? { duration: 0 }
                              : {
                                  duration: 0.12,
                                  delay: 0.76 + index * 0.04,
                                }
                          }
                          className="flex items-baseline gap-2 truncate"
                        >
                          <span className="select-none opacity-50">
                            {index + 1}
                          </span>
                          <span className="truncate">{line}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Bottom docked Luci toolbar pill (7 tools) */}
                <div
                  className="flex items-center justify-center border-t-2 border-line-strong px-3 py-3"
                  style={{ backgroundColor: "var(--luci-surface)" }}
                >
                  <div
                    role="toolbar"
                    aria-label="Illustrated Luci toolbar with 7 tools"
                    className="inline-flex flex-wrap items-center justify-center gap-2 rounded-pill border-2 border-line-strong px-3 py-2 shadow-sticker-sm"
                    style={{
                      backgroundColor: "var(--luci-ink)",
                      color: "var(--luci-surface)",
                    }}
                  >
                    {TOOLBAR_TOOLS.map(({ label, Icon, active }) => (
                      <div
                        key={label}
                        className="inline-flex items-center gap-1 rounded-pill px-3 py-1 font-mono text-caption font-medium"
                        style={
                          active
                            ? {
                                backgroundColor: "var(--luci-accent)",
                                color: "var(--luci-ink)",
                              }
                            : undefined
                        }
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="hidden sm:inline">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
