"use client";

import Image from "next/image";
import "./luci.css";

const BRAND_SWATCHES = [
  { name: "Muzzle White", varName: "var(--luci-surface)", role: "Canvas" },
  { name: "Ink", varName: "var(--luci-ink)", role: "Text & outlines" },
  { name: "Ginger", varName: "var(--luci-accent)", role: "Primary accent" },
  { name: "Ginger Deep", varName: "var(--luci-accent-deep)", role: "Links & shade" },
  { name: "Collar Lime", varName: "var(--luci-collar-lime)", role: "Basket & highlights" },
] as const;

const MASCOT_POSES = [
  {
    name: "Asleep",
    src: "/case-studies/luci/brand/luci-sleep-animated.svg",
    alt: "Luci ginger cat mascot curled up asleep",
  },
  {
    name: "Sitting tall",
    src: "/case-studies/luci/brand/luci-sit-animated.svg",
    alt: "Luci ginger cat mascot sitting tall",
  },
  {
    name: "Measuring",
    src: "/case-studies/luci/brand/luci-measure-animated.svg",
    alt: "Luci ginger cat mascot measuring layout spacing",
  },
  {
    name: "Pinning a note",
    src: "/case-studies/luci/brand/luci-note-animated.svg",
    alt: "Luci ginger cat mascot pinning a feedback note",
  },
  {
    name: "Comparing",
    src: "/case-studies/luci/brand/luci-compare-animated.svg",
    alt: "Luci ginger cat mascot comparing built UI with a design",
  },
  {
    name: "Sampling colour",
    src: "/case-studies/luci/brand/luci-swatch-animated.svg",
    alt: "Luci ginger cat mascot inspecting a colour swatch",
  },
] as const;

/**
 * BrandBoard: framed Luci identity showcase inside `.luci-brand-frame`.
 * Displays the real Luci horizontal logo, mark tile, 6 animated mascot SVGs
 * copied from luci-site-by-pawprint-design/public/brand/, and real palette swatches.
 * Rule 11: Loaffy is never rendered in this section.
 */
export function BrandBoard() {
  return (
    <div
      role="region"
      aria-label="Luci brand identity and animated mascot poses"
      className="luci-brand-frame my-10 space-y-8 rounded-2xl border-2 border-line-strong p-6 shadow-sticker md:p-10"
      style={{
        backgroundColor: "var(--luci-surface)",
        color: "var(--luci-ink)",
      }}
    >
      {/* Top row: Real horizontal logo + mark tile */}
      <div className="grid grid-cols-1 gap-6 border-b border-on-pastel/20 pb-8 md:grid-cols-12 md:items-center">
        <div className="space-y-3 md:col-span-7">
          <span className="block font-mono text-label uppercase tracking-wider opacity-75">
            Logo &amp; Wordmark
          </span>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Image
              src="/case-studies/luci/brand/luci-logo-horizontal.svg"
              alt="Luci horizontal logo and wordmark"
              width={220}
              height={64}
              unoptimized
              className="h-14 w-auto"
            />
            <Image
              src="/case-studies/luci/brand/luci-mark-tile.svg"
              alt="Luci app icon tile"
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 rounded-lg border-2 border-on-pastel"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-5">
          <span className="block font-mono text-label uppercase tracking-wider opacity-75">
            Named after Lucifer
          </span>
          <p className="font-body text-body opacity-85">
            Luci is named after my ginger tabby. Inside Luci&apos;s own product and
            site, warm ginger sits on Muzzle White — separate from this portfolio&apos;s
            Loaffy Candy UI.
          </p>
        </div>
      </div>

      {/* Middle row: 6 real animated mascot poses */}
      <div className="space-y-4">
        <span className="block font-mono text-label uppercase tracking-wider opacity-75">
          Animated cat mascot · 6 poses
        </span>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {MASCOT_POSES.map((pose) => (
            <figure
              key={pose.name}
              className="flex flex-col items-center gap-3 rounded-lg border-2 border-on-pastel/20 p-4 text-center"
              style={{ backgroundColor: "var(--luci-surface-alt)" }}
            >
              <Image
                src={pose.src}
                alt={pose.alt}
                width={96}
                height={96}
                unoptimized
                className="h-24 w-24 object-contain"
              />
              <figcaption className="font-mono text-caption font-semibold">
                {pose.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Bottom row: Real Luci palette swatches (scoped inside .luci-brand-frame) */}
      <div className="space-y-4 border-t border-on-pastel/20 pt-8">
        <span className="block font-mono text-label uppercase tracking-wider opacity-75">
          Luci palette (scoped to Luci visuals only)
        </span>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {BRAND_SWATCHES.map((swatch) => (
            <div
              key={swatch.name}
              className="overflow-hidden rounded-md border-2 border-on-pastel"
              style={{ backgroundColor: "var(--luci-surface)" }}
            >
              <div
                className="h-16 w-full border-b-2 border-on-pastel"
                style={{ backgroundColor: swatch.varName }}
              />
              <div className="p-3">
                <p className="font-display text-caption font-bold">
                  {swatch.name}
                </p>
                <p className="font-mono text-caption opacity-75">
                  {swatch.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
