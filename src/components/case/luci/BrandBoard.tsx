"use client";

import "./luci.css";
import {
  Crosshair,
  Type,
  Palette,
  Ruler,
  ShoppingBasket,
  MessageSquarePlus,
  SlidersHorizontal,
} from "lucide-react";

const BRAND_SWATCHES = [
  { name: "Muzzle White", varName: "var(--luci-surface)", role: "Surface" },
  { name: "Ink", varName: "var(--luci-ink)", role: "Text & outlines" },
  { name: "Ginger", varName: "var(--luci-accent)", role: "Primary accent" },
  {
    name: "Ginger Deep",
    varName: "var(--luci-accent-deep)",
    role: "Shade & stripes",
  },
  {
    name: "Ginger Soft",
    varName: "var(--luci-accent-soft)",
    role: "Highlights",
  },
] as const;

const MASCOT_POSES = [
  "[Luci mascot slot · Pose 1: Curious inspect]",
  "[Luci mascot slot · Pose 2: Measuring]",
  "[Luci mascot slot · Pose 3: Export ready]",
] as const;

const TOOLBAR_ICONS = [
  { label: "Capture", Icon: Crosshair },
  { label: "Text", Icon: Type },
  { label: "Colour", Icon: Palette },
  { label: "Spacing", Icon: Ruler },
  { label: "Basket", Icon: ShoppingBasket },
  { label: "Feedback", Icon: MessageSquarePlus },
  { label: "Settings", Icon: SlidersHorizontal },
] as const;

/**
 * BrandBoard (V10 in CASE-LUCI.md §4 §8):
 * - Framed brand board inside `.luci-brand-frame` (Luci colours allowed inside this frame only).
 * - Slots for Luci's logo, outlined cat mascot in 3 poses, palette swatches
 *   (Muzzle White, Ink, ginger family), type, and toolbar icon set.
 * - Loaffy is NOT rendered in this section (one character on screen at a time).
 */
export function BrandBoard() {
  return (
    <div
      role="region"
      aria-label="Luci brand board"
      className="luci-brand-frame my-8 space-y-6 rounded-2xl border-2 border-line-strong p-6 shadow-sticker md:p-10"
      style={{
        backgroundColor: "var(--luci-surface)",
        color: "var(--luci-ink)",
      }}
    >
      {/* Top row: Logo slot + Typography */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div
          className="flex flex-col justify-between gap-4 rounded-lg border-2 border-line-strong p-6 md:col-span-6"
          style={{ backgroundColor: "var(--luci-surface)" }}
        >
          <span className="font-mono text-caption uppercase opacity-75">
            Logo & Wordmark
          </span>
          <div className="flex min-h-24 items-center justify-center rounded-md border border-dashed border-line-strong p-4 text-center font-mono text-caption">
            [Luci logo & horizontal wordmark slot ·
            /case-studies/luci/brand-logo.svg]
          </div>
        </div>

        <div
          className="flex flex-col justify-between gap-4 rounded-lg border-2 border-line-strong p-6 md:col-span-6"
          style={{ backgroundColor: "var(--luci-surface)" }}
        >
          <span className="font-mono text-caption uppercase opacity-75">
            Typography
          </span>
          <div className="space-y-2">
            <p className="font-display text-h3 font-bold">
              Warm display headlines · crisp mono tokens
            </p>
            <p className="font-mono text-caption opacity-80">
              design.md · tokens · roles · accessibility checks
            </p>
          </div>
        </div>
      </div>

      {/* Middle row: Outlined cat mascot in 3 poses (empty slots for Lucas's assets) */}
      <div className="space-y-3">
        <span className="font-mono text-caption uppercase opacity-75">
          Outlined cat mascot · 3 poses
        </span>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {MASCOT_POSES.map((slot) => (
            <div
              key={slot}
              className="flex min-h-32 items-center justify-center rounded-lg border-2 border-dashed border-line-strong p-6 text-center font-mono text-caption"
            >
              {slot}
            </div>
          ))}
        </div>
      </div>

      {/* Palette row: Muzzle White, Ink, and Ginger family (scoped to .luci-brand-frame) */}
      <div className="space-y-3">
        <span className="font-mono text-caption uppercase opacity-75">
          Palette (Muzzle White · Ink · Ginger family)
        </span>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {BRAND_SWATCHES.map((swatch) => (
            <div
              key={swatch.name}
              className="overflow-hidden rounded-md border-2 border-line-strong"
            >
              <div
                className="h-16 w-full border-b-2 border-line-strong"
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

      {/* Bottom row: 7-icon toolbar set */}
      <div className="space-y-3">
        <span className="font-mono text-caption uppercase opacity-75">
          Toolbar icon set
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {TOOLBAR_ICONS.map(({ label, Icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-pill border-2 border-line-strong px-4 py-2 font-mono text-caption font-semibold"
              style={{
                backgroundColor: "var(--luci-ink)",
                color: "var(--luci-surface)",
              }}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
