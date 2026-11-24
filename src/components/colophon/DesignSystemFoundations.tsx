"use client";

import { useEffect, useRef, useState } from "react";
import { type ResolvedTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { FadeIn } from "@/components/motion/FadeIn";
import { stagger } from "@/lib/motion";

const RESOLVED_THEMES: { id: ResolvedTheme; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "warm-dark", label: "Warm Dark" },
];

interface ThemeRoleSpec {
  role: string;
  cssVar: string;
  bgClass: string;
  use: string;
}

const THEME_ROLES: ThemeRoleSpec[] = [
  { role: "bg", cssVar: "--lp-bg", bgClass: "bg-bg", use: "Page canvas" },
  {
    role: "surface",
    cssVar: "--lp-surface",
    bgClass: "bg-surface",
    use: "Quiet sections, inputs, chips",
  },
  {
    role: "surface-2",
    cssVar: "--lp-surface-2",
    bgClass: "bg-surface-2",
    use: "Hover on surface, stripes",
  },
  {
    role: "line",
    cssVar: "--lp-line",
    bgClass: "bg-line",
    use: "Hairlines, dividers",
  },
  {
    role: "line-strong",
    cssVar: "--lp-line-strong",
    bgClass: "bg-line-strong",
    use: "Pen borders (2px)",
  },
  {
    role: "text",
    cssVar: "--lp-text",
    bgClass: "bg-text",
    use: "Body and headings",
  },
  {
    role: "text-muted",
    cssVar: "--lp-text-muted",
    bgClass: "bg-text-muted",
    use: "Secondary copy",
  },
  {
    role: "text-subtle",
    cssVar: "--lp-text-subtle",
    bgClass: "bg-text-subtle",
    use: "Meta and captions",
  },
  {
    role: "inverse-bg",
    cssVar: "--lp-inverse-bg",
    bgClass: "bg-inverse-bg",
    use: "Primary button fill",
  },
  {
    role: "inverse-text",
    cssVar: "--lp-inverse-text",
    bgClass: "bg-inverse-text",
    use: "Primary button text",
  },
  {
    role: "shadow",
    cssVar: "--lp-shadow",
    bgClass: "bg-shadow",
    use: "Sticker shadows",
  },
  {
    role: "focus",
    cssVar: "--lp-focus",
    bgClass: "bg-focus",
    use: "Focus ring",
  },
  {
    role: "outline",
    cssVar: "--lp-outline",
    bgClass: "bg-outline",
    use: "Loaffy outlines",
  },
  {
    role: "lilac-soft",
    cssVar: "--lp-lilac-soft",
    bgClass: "bg-lilac-soft",
    use: "Section tint (Lilac)",
  },
  {
    role: "mint-soft",
    cssVar: "--lp-mint-soft",
    bgClass: "bg-mint-soft",
    use: "Section tint (Mint)",
  },
  {
    role: "butter-soft",
    cssVar: "--lp-butter-soft",
    bgClass: "bg-butter-soft",
    use: "Section tint (Butter)",
  },
  {
    role: "sky-soft",
    cssVar: "--lp-sky-soft",
    bgClass: "bg-sky-soft",
    use: "Section tint (Sky)",
  },
  {
    role: "blush-soft",
    cssVar: "--lp-blush-soft",
    bgClass: "bg-blush-soft",
    use: "Section tint (Blush)",
  },
  {
    role: "pistachio-soft",
    cssVar: "--lp-pistachio-soft",
    bgClass: "bg-pistachio-soft",
    use: "Section tint (Pistachio)",
  },
];

const PASTEL_TOKENS = [
  {
    name: "lilac",
    cssVar: "--color-lilac",
    bgClass: "bg-lilac",
    role: "Section & card colour; headline highlight",
  },
  {
    name: "mint",
    cssVar: "--color-mint",
    bgClass: "bg-mint",
    role: "Section & card colour; success",
  },
  {
    name: "butter",
    cssVar: "--color-butter",
    bgClass: "bg-butter",
    role: "Section & card colour; warning",
  },
  {
    name: "sky",
    cssVar: "--color-sky",
    bgClass: "bg-sky",
    role: "Section & card colour; info; primary button shadow",
  },
  {
    name: "blush",
    cssVar: "--color-blush",
    bgClass: "bg-blush",
    role: "Section & card colour; danger",
  },
  {
    name: "pistachio",
    cssVar: "--color-pistachio",
    bgClass: "bg-pistachio",
    role: "Section & card colour; footer",
  },
  {
    name: "on-pastel",
    cssVar: "--color-on-pastel",
    bgClass: "bg-on-pastel",
    role: "Text on any pastel in all themes",
  },
];

const CHARACTER_TOKENS = [
  {
    name: "ginger",
    cssVar: "--color-ginger",
    bgClass: "bg-ginger",
    role: "Loaffy base coat & wordmark bean ONLY",
  },
  {
    name: "ginger-deep",
    cssVar: "--color-ginger-deep",
    bgClass: "bg-ginger-deep",
    role: "Loaffy inner shading ONLY",
  },
  {
    name: "ginger-light",
    cssVar: "--color-ginger-light",
    bgClass: "bg-ginger-light",
    role: "Loaffy highlight ONLY",
  },
  {
    name: "cheek",
    cssVar: "--color-cheek",
    bgClass: "bg-cheek",
    role: "Loaffy cheeks ONLY",
  },
  {
    name: "claw",
    cssVar: "--color-claw",
    bgClass: "bg-claw",
    role: "Cat hand claws ONLY",
  },
];

interface TypeScaleSpec {
  role: string;
  fontClass: string;
  textClass: string;
  fontLabel: string;
  rangeLabel: string;
  lineHeightLabel: string;
  trackingLabel: string;
  minSizeRem: string;
  minLineRem: string;
  maxSizeRem: string;
  maxLineRem: string;
  weight: string;
  sample: string;
  uppercase?: boolean;
}

const TYPE_SCALE: TypeScaleSpec[] = [
  {
    role: "display-xl",
    fontClass: "font-display",
    textClass: "text-display-xl",
    fontLabel: "Bricolage Grotesque 800",
    rangeLabel: "64 → 160",
    lineHeightLabel: "64 → 144",
    trackingLabel: "-0.05em",
    minSizeRem: "4rem",
    minLineRem: "4rem",
    maxSizeRem: "10rem",
    maxLineRem: "9rem",
    weight: "800",
    sample: "Work.",
  },
  {
    role: "display",
    fontClass: "font-display",
    textClass: "text-display",
    fontLabel: "Bricolage Grotesque 800",
    rangeLabel: "48 → 96",
    lineHeightLabel: "48 → 88",
    trackingLabel: "-0.045em",
    minSizeRem: "3rem",
    minLineRem: "3rem",
    maxSizeRem: "6rem",
    maxLineRem: "5.5rem",
    weight: "800",
    sample: "Think outside the box.",
  },
  {
    role: "h1",
    fontClass: "font-display",
    textClass: "text-h1",
    fontLabel: "Bricolage Grotesque 700",
    rangeLabel: "40 → 64",
    lineHeightLabel: "44 → 64",
    trackingLabel: "-0.035em",
    minSizeRem: "2.5rem",
    minLineRem: "2.75rem",
    maxSizeRem: "4rem",
    maxLineRem: "4rem",
    weight: "700",
    sample: "Curious by nature, careful by habit.",
  },
  {
    role: "h2",
    fontClass: "font-display",
    textClass: "text-h2",
    fontLabel: "Bricolage Grotesque 700",
    rangeLabel: "32 → 48",
    lineHeightLabel: "36 → 52",
    trackingLabel: "-0.03em",
    minSizeRem: "2rem",
    minLineRem: "2.25rem",
    maxSizeRem: "3rem",
    maxLineRem: "3.25rem",
    weight: "700",
    sample: "Selected product & motion work",
  },
  {
    role: "h3",
    fontClass: "font-display",
    textClass: "text-h3",
    fontLabel: "Bricolage Grotesque 700",
    rangeLabel: "24 → 32",
    lineHeightLabel: "28 → 36",
    trackingLabel: "-0.02em",
    minSizeRem: "1.5rem",
    minLineRem: "1.75rem",
    maxSizeRem: "2rem",
    maxLineRem: "2.25rem",
    weight: "700",
    sample: "Luci — Design governance for coding agents",
  },
  {
    role: "h4",
    fontClass: "font-display",
    textClass: "text-h4",
    fontLabel: "Bricolage Grotesque 700",
    rangeLabel: "20 → 24",
    lineHeightLabel: "28 → 32",
    trackingLabel: "-0.01em",
    minSizeRem: "1.25rem",
    minLineRem: "1.75rem",
    maxSizeRem: "1.5rem",
    maxLineRem: "2rem",
    weight: "700",
    sample: "Calm page, lively character",
  },
  {
    role: "body-lg",
    fontClass: "font-body",
    textClass: "text-body-lg",
    fontLabel: "Inter 400",
    rangeLabel: "20 → 20",
    lineHeightLabel: "32 → 32",
    trackingLabel: "-0.01em",
    minSizeRem: "1.25rem",
    minLineRem: "2rem",
    maxSizeRem: "1.25rem",
    maxLineRem: "2rem",
    weight: "400",
    sample:
      "I design web products, apps and motion for SaaS, e-commerce and data-heavy platforms.",
  },
  {
    role: "body",
    fontClass: "font-body",
    textClass: "text-body",
    fontLabel: "Inter 400",
    rangeLabel: "16 → 16",
    lineHeightLabel: "24 → 24",
    trackingLabel: "-0.005em",
    minSizeRem: "1rem",
    minLineRem: "1.5rem",
    maxSizeRem: "1rem",
    maxLineRem: "1.5rem",
    weight: "400",
    sample:
      "Every detail (tokens, states, accessibility, motion) is deliberate and visible.",
  },
  {
    role: "label",
    fontClass: "font-body",
    textClass: "text-label uppercase",
    fontLabel: "Inter 600",
    rangeLabel: "12 → 12",
    lineHeightLabel: "16 → 16",
    trackingLabel: "0.08em",
    minSizeRem: "0.75rem",
    minLineRem: "1rem",
    maxSizeRem: "0.75rem",
    maxLineRem: "1rem",
    weight: "600",
    sample: "Lucas (Wai Phyo Aung) · Product & Motion Designer",
    uppercase: true,
  },
  {
    role: "caption",
    fontClass: "font-body",
    textClass: "text-caption",
    fontLabel: "Inter 500",
    rangeLabel: "12 → 12",
    lineHeightLabel: "16 → 16",
    trackingLabel: "0",
    minSizeRem: "0.75rem",
    minLineRem: "1rem",
    maxSizeRem: "0.75rem",
    maxLineRem: "1rem",
    weight: "500",
    sample: "Phuket, Thailand · UTC+7 · Curious by nature, careful by habit.",
  },
  {
    role: "button",
    fontClass: "font-body",
    textClass: "text-button",
    fontLabel: "Inter 600",
    rangeLabel: "16 → 16",
    lineHeightLabel: "16 → 16",
    trackingLabel: "-0.005em",
    minSizeRem: "1rem",
    minLineRem: "1rem",
    maxSizeRem: "1rem",
    maxLineRem: "1rem",
    weight: "600",
    sample: "See selected work",
  },
];

const SPACING_STEPS = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 160,
] as const;

const RADIUS_TOKENS = [
  { name: "rounded-xs", className: "rounded-xs", size: "8", paw: "—" },
  { name: "rounded-sm", className: "rounded-sm", size: "12", paw: "Toe" },
  { name: "rounded-md", className: "rounded-md", size: "16", paw: "—" },
  { name: "rounded-lg", className: "rounded-lg", size: "32", paw: "Main pad" },
  { name: "rounded-xl", className: "rounded-xl", size: "40", paw: "—" },
  { name: "rounded-2xl", className: "rounded-2xl", size: "56", paw: "—" },
  {
    name: "rounded-pill",
    className: "rounded-pill",
    size: "9999",
    paw: "Toe bean",
  },
];

const SHADOW_TOKENS = [
  {
    name: "shadow-sticker-sm",
    className: "shadow-sticker-sm",
    offset: "4 / 4",
    use: "Small stickers, secondary buttons, resting cards",
  },
  {
    name: "shadow-sticker",
    className: "shadow-sticker",
    offset: "8 / 8",
    use: "Case study cards, elevated containers",
  },
  {
    name: "shadow-sticker-lg",
    className: "shadow-sticker-lg",
    offset: "12 / 12",
    use: "Hovered case study cards, floating panels",
  },
];

const DURATION_TOKENS = [
  {
    name: "--duration-instant",
    ms: "120ms",
    gridSteps: "3 × 40ms",
    use: "Colour/opacity on press",
  },
  {
    name: "--duration-fast",
    ms: "200ms",
    gridSteps: "5 × 40ms",
    use: "Hover, small toggles",
  },
  {
    name: "--duration-base",
    ms: "280ms",
    gridSteps: "7 × 40ms",
    use: "Most UI transitions",
  },
  {
    name: "--duration-slow",
    ms: "480ms",
    gridSteps: "12 × 40ms",
    use: "Section reveals, sheets, View Transition",
  },
  {
    name: "--duration-lazy",
    ms: "720ms",
    gridSteps: "18 × 40ms",
    use: "Loaffy morphs, page transitions",
  },
];

const EASING_TOKENS = [
  {
    name: "ease-out-soft",
    cssVar: "--ease-out-soft",
    use: "Default UI entrance & feedback",
  },
  {
    name: "ease-in-out",
    cssVar: "--ease-in-out",
    use: "Scroll-linked & layout transitions",
  },
  {
    name: "ease-spring-calm",
    cssVar: "--ease-spring-calm",
    use: "UI spring (≈4% overshoot)",
  },
  {
    name: "ease-spring-bouncy",
    cssVar: "--ease-spring-bouncy",
    use: "Loaffy character spring ONLY (≈12% overshoot)",
  },
];

export interface DesignSystemFoundationsProps {
  /** Use h3 section headings when nested inside /colophon <Chapter> (which owns h2). */
  nestedInChapter?: boolean;
}

/**
 * Live design system foundations shared between `/lab` and `/colophon`
 * (tokens across 3 themes, Loaffy Candy & character palettes, type scale,
 * spacing, radii, sticker shadows, and 40ms motion demos).
 */
export function DesignSystemFoundations({
  nestedInChapter = false,
}: DesignSystemFoundationsProps) {
  const [typeMode, setTypeMode] = useState<"fluid" | "375" | "1440" | "split">(
    "split",
  );
  const [motionPlay, setMotionPlay] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const themeRefs = useRef<Record<ResolvedTheme, HTMLDivElement | null>>({
    light: null,
    dark: null,
    "warm-dark": null,
  });

  const [resolvedHexes, setResolvedHexes] = useState<
    Record<ResolvedTheme, Record<string, string>>
  >({
    light: {},
    dark: {},
    "warm-dark": {},
  });

  const [staticHexes, setStaticHexes] = useState<Record<string, string>>({});

  useEffect(() => {
    const nextMap: Record<ResolvedTheme, Record<string, string>> = {
      light: {},
      dark: {},
      "warm-dark": {},
    };

    for (const t of RESOLVED_THEMES) {
      const el = themeRefs.current[t.id];
      if (!el) continue;
      const styles = window.getComputedStyle(el);
      for (const spec of THEME_ROLES) {
        nextMap[t.id][spec.cssVar] = styles
          .getPropertyValue(spec.cssVar)
          .trim();
      }
    }

    const rootStyles = window.getComputedStyle(document.documentElement);
    const nextStatic: Record<string, string> = {};
    for (const p of [...PASTEL_TOKENS, ...CHARACTER_TOKENS]) {
      nextStatic[p.cssVar] = rootStyles.getPropertyValue(p.cssVar).trim();
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResolvedHexes(nextMap);
    setStaticHexes(nextStatic);
  }, []);

  const SectionTag = nestedInChapter ? "h3" : "h2";
  const SubTag = nestedInChapter ? "h4" : "h3";
  const sectionClass = cn(
    "mt-2 font-display text-text",
    nestedInChapter ? HEADING_SCALE_CLASSES.h3 : HEADING_SCALE_CLASSES.h2,
  );
  const subClass = cn(
    "font-display text-text",
    nestedInChapter ? HEADING_SCALE_CLASSES.h4 : HEADING_SCALE_CLASSES.h3,
  );

  return (
    <div className="space-y-16">
      {/* 1. Theme Role Colours across all 3 themes */}
      <section aria-labelledby="lab-colors-heading" className="space-y-6">
        <div>
          <p className="font-body text-label uppercase text-text-muted">
            01 · Colour Roles (19 Tokens × 3 Themes)
          </p>
          <SectionTag id="lab-colors-heading" className={sectionClass}>
            Theme tokens in Light, Dark &amp; Warm Dark
          </SectionTag>
          <p className="mt-2 font-body text-body text-text-muted">
            Each column below is scoped with its own{" "}
            <code className="rounded-xs bg-surface-2 px-2 py-1 font-mono text-caption">
              data-theme
            </code>{" "}
            attribute so all three themes can be inspected simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {RESOLVED_THEMES.map((t) => (
            <div
              key={t.id}
              ref={(el) => {
                themeRefs.current[t.id] = el;
              }}
              data-theme={t.id}
              className="rounded-lg border-2 border-line-strong bg-bg p-6 text-text shadow-sticker-sm"
            >
              <div className="flex items-center justify-between border-b border-line pb-4">
                <SubTag className={subClass}>{t.label}</SubTag>
                <code className="rounded-xs bg-surface px-2 py-1 font-mono text-caption text-text-muted">
                  data-theme=&quot;{t.id}&quot;
                </code>
              </div>

              <ul className="mt-4 space-y-3">
                {THEME_ROLES.map((spec) => {
                  const hexVal = resolvedHexes[t.id]?.[spec.cssVar] || "…";
                  return (
                    <li
                      key={spec.role}
                      className="flex items-center justify-between gap-3 rounded-sm border border-line bg-surface p-2"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-10 w-10 shrink-0 rounded-xs border-2 border-line-strong ${spec.bgClass}`}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-body text-body font-medium text-text">
                            {spec.role}
                          </p>
                          <p className="font-body text-caption text-text-muted">
                            {spec.use}
                          </p>
                        </div>
                      </div>
                      <code className="rounded-xs bg-surface-2 px-2 py-1 font-mono text-caption text-text">
                        {hexVal}
                      </code>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Loaffy Candy Pastels & Character Tokens */}
      <section aria-labelledby="lab-pastels-heading" className="space-y-6">
        <div>
          <p className="font-body text-label uppercase text-text-muted">
            02 · Static Palettes
          </p>
          <SectionTag id="lab-pastels-heading" className={sectionClass}>
            Loaffy Candy pastels &amp; character-only tokens
          </SectionTag>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PASTEL_TOKENS.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker-sm"
            >
              <div
                data-theme={item.name === "on-pastel" ? "light" : undefined}
                className={`flex h-20 items-end justify-between rounded-sm border-2 border-line-strong p-3 ${item.bgClass} ${item.name === "on-pastel"
                    ? "text-bg"
                    : "text-on-pastel"
                  }`}
              >
                <span className="font-display text-h4">{item.name}</span>
                <code className="font-mono text-caption">
                  {staticHexes[item.cssVar] || "…"}
                </code>
              </div>
              <p className="mt-3 font-body text-caption text-text-muted">
                {item.role}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
          <SubTag className={subClass}>
            Character Palette (Loaffy &amp; Wordmark Bean Only — Never for UI)
          </SubTag>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CHARACTER_TOKENS.map((item) => (
              <div
                key={item.name}
                className="rounded-sm border border-line bg-bg p-3"
              >
                <div
                  className={`h-12 w-full rounded-xs border-2 border-line-strong ${item.bgClass}`}
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-body text-body font-medium text-text">
                    {item.name}
                  </span>
                  <code className="font-mono text-caption text-text-muted">
                    {staticHexes[item.cssVar] || "…"}
                  </code>
                </div>
                <p className="mt-1 font-body text-caption text-text-muted">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Typography Scale (Fluid + 375 and 1440 comparison) */}
      <section aria-labelledby="lab-type-heading" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-body text-label uppercase text-text-muted">
              03 · Typography Scale (4/8 Grid Endpoints)
            </p>
            <SectionTag id="lab-type-heading" className={sectionClass}>
              Bricolage Grotesque &amp; Inter at 375 and 1440 widths
            </SectionTag>
          </div>

          <div
            role="group"
            aria-label="Typography preview mode"
            className="flex flex-wrap gap-1 rounded-pill border-2 border-line-strong bg-surface p-1 shadow-sticker-sm"
          >
            {(
              [
                { id: "split", label: "375 vs 1440 Split" },
                { id: "fluid", label: "Live Fluid Clamp" },
                { id: "375", label: "375 Mobile Fixed" },
                { id: "1440", label: "1440 Desktop Fixed" },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={typeMode === m.id}
                onClick={() => setTypeMode(m.id)}
                className={`min-h-12 rounded-pill px-4 font-body text-button transition-colors duration-200 ${typeMode === m.id
                    ? "bg-inverse-bg text-inverse-text"
                    : "bg-transparent text-text hover:bg-surface-2"
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {TYPE_SCALE.map((spec) => (
            <div
              key={spec.role}
              className="overflow-hidden rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                <div className="flex items-center gap-3">
                  <code className="rounded-xs bg-lilac px-2 py-1 font-mono text-caption text-on-pastel">
                    text-{spec.role}
                  </code>
                  <span className="font-body text-caption text-text-muted">
                    {spec.fontLabel}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 font-mono text-caption text-text-muted">
                  <span>Size: {spec.rangeLabel}</span>
                  <span>Line: {spec.lineHeightLabel}</span>
                  <span>Track: {spec.trackingLabel}</span>
                </div>
              </div>

              {typeMode === "fluid" && (
                <div tabIndex={0} className="mt-4 overflow-x-auto">
                  <p className={`${spec.fontClass} ${spec.textClass} text-text`}>
                    {spec.sample}
                  </p>
                </div>
              )}

              {typeMode === "375" && (
                <div tabIndex={0} className="mt-4 overflow-x-auto">
                  <p
                    className={`${spec.fontClass} text-text ${spec.uppercase ? "uppercase" : ""
                      }`}
                    style={{
                      fontSize: spec.minSizeRem,
                      lineHeight: spec.minLineRem,
                      letterSpacing: spec.trackingLabel,
                      fontWeight: spec.weight,
                    }}
                  >
                    {spec.sample}
                  </p>
                </div>
              )}

              {typeMode === "1440" && (
                <div tabIndex={0} className="mt-4 overflow-x-auto">
                  <p
                    className={`${spec.fontClass} text-text ${spec.uppercase ? "uppercase" : ""
                      }`}
                    style={{
                      fontSize: spec.maxSizeRem,
                      lineHeight: spec.maxLineRem,
                      letterSpacing: spec.trackingLabel,
                      fontWeight: spec.weight,
                    }}
                  >
                    {spec.sample}
                  </p>
                </div>
              )}

              {typeMode === "split" && (
                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div
                    tabIndex={0}
                    className="overflow-x-auto rounded-sm border border-line bg-bg p-4"
                  >
                    <p className="mb-2 font-mono text-caption text-text-muted">
                      @ 375 viewport ({spec.minSizeRem} / {spec.minLineRem})
                    </p>
                    <p
                      className={`${spec.fontClass} text-text ${spec.uppercase ? "uppercase" : ""
                        }`}
                      style={{
                        fontSize: spec.minSizeRem,
                        lineHeight: spec.minLineRem,
                        letterSpacing: spec.trackingLabel,
                        fontWeight: spec.weight,
                      }}
                    >
                      {spec.sample}
                    </p>
                  </div>
                  <div
                    tabIndex={0}
                    className="overflow-x-auto rounded-sm border border-line bg-bg p-4"
                  >
                    <p className="mb-2 font-mono text-caption text-text-muted">
                      @ 1440 viewport ({spec.maxSizeRem} / {spec.maxLineRem})
                    </p>
                    <p
                      className={`${spec.fontClass} text-text ${spec.uppercase ? "uppercase" : ""
                        }`}
                      style={{
                        fontSize: spec.maxSizeRem,
                        lineHeight: spec.maxLineRem,
                        letterSpacing: spec.trackingLabel,
                        fontWeight: spec.weight,
                      }}
                    >
                      {spec.sample}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Spacing Scale (4/8 grid) */}
      <section aria-labelledby="lab-spacing-heading" className="space-y-6">
        <div>
          <p className="font-body text-label uppercase text-text-muted">
            04 · Spacing Scale (4/8 Grid)
          </p>
          <SectionTag id="lab-spacing-heading" className={sectionClass}>
            16 steps from 0 to 160
          </SectionTag>
        </div>

        <div className="rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
          <div className="space-y-3">
            {SPACING_STEPS.map((step) => (
              <div
                key={step}
                className="flex items-center gap-4 border-b border-line pb-2 last:border-b-0"
              >
                <code className="w-28 shrink-0 font-mono text-caption text-text">
                  --space-{step}
                </code>
                <span className="w-20 shrink-0 font-mono text-caption text-text-muted">
                  {step / 16}rem
                </span>
                <div tabIndex={0} className="flex-1 overflow-x-auto">
                  <div
                    className="h-6 rounded-xs border-2 border-line-strong bg-mint"
                    style={{ width: `var(--space-${step})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Shape & Border Radius */}
      <section aria-labelledby="lab-radius-heading" className="space-y-6">
        <div>
          <p className="font-body text-label uppercase text-text-muted">
            05 · Shape &amp; Radii
          </p>
          <SectionTag id="lab-radius-heading" className={sectionClass}>
            Paw-derived corner radii
          </SectionTag>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RADIUS_TOKENS.map((r) => (
            <div
              key={r.name}
              className="flex flex-col justify-between rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm"
            >
              <div
                className={`flex h-24 w-full items-center justify-center border-2 border-line-strong bg-butter text-on-pastel ${r.className}`}
              >
                <span className="font-display text-h4">{r.name}</span>
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-caption text-text-muted">
                <span>Radius: {r.size}</span>
                <span>Origin: {r.paw}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Sticker Shadows & Press / Lift Interaction */}
      <section aria-labelledby="lab-shadows-heading" className="space-y-6">
        <div>
          <p className="font-body text-label uppercase text-text-muted">
            06 · Elevation &amp; Sticker Physics
          </p>
          <SectionTag id="lab-shadows-heading" className={sectionClass}>
            Solid offset sticker shadows (zero blur)
          </SectionTag>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SHADOW_TOKENS.map((s) => (
            <button
              key={s.name}
              type="button"
              className={`group rounded-lg border-2 border-line-strong bg-sky p-6 text-left text-on-pastel transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:scale-95 active:shadow-none ${s.className}`}
            >
              <code className="rounded-xs bg-bg px-2 py-1 font-mono text-caption text-text">
                {s.name}
              </code>
              <p className="mt-4 font-display text-h3 text-on-pastel">
                Offset {s.offset}
              </p>
              <p className="mt-2 font-body text-body text-on-pastel">{s.use}</p>
              <p className="mt-4 font-body text-caption text-on-pastel">
                Hover to lift (−4, −4) · Click/hold to press (+4, +4, scale
                0.96)
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 7. Motion Durations (40ms grid), Easings & FadeIn Stagger Demo */}
      <section aria-labelledby="lab-motion-heading" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-body text-label uppercase text-text-muted">
              07 · Motion &amp; 40ms Grid
            </p>
            <SectionTag id="lab-motion-heading" className={sectionClass}>
              Durations, spring curves &amp; FadeIn presets
            </SectionTag>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setMotionPlay((prev) => !prev)}
              className="min-h-12 rounded-pill border-2 border-line-strong bg-lilac px-6 font-body text-button text-on-pastel shadow-sticker-sm transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              {motionPlay ? "Reset duration bars" : "Run duration race"}
            </button>
            <button
              type="button"
              onClick={() => setFadeKey((k) => k + 1)}
              className="min-h-12 rounded-pill border-2 border-line-strong bg-mint px-6 font-body text-button text-on-pastel shadow-sticker-sm transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Replay FadeIn stagger (80ms)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
            <SubTag className={subClass}>
              Duration Ladder (40ms Multiples)
            </SubTag>
            <div className="mt-4 space-y-4">
              {DURATION_TOKENS.map((d) => (
                <div key={d.name} className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-caption">
                    <span className="text-text">{d.name}</span>
                    <span className="text-text-muted">
                      {d.ms} ({d.gridSteps}) · {d.use}
                    </span>
                  </div>
                  <div className="h-8 w-full overflow-hidden rounded-pill border border-line bg-bg p-1">
                    <div
                      className="h-full w-12 rounded-pill border-2 border-line-strong bg-pistachio"
                      style={{
                        transform: motionPlay
                          ? "translateX(200%)"
                          : "translateX(0%)",
                        transitionProperty: "transform",
                        transitionDuration: `var(${d.name})`,
                        transitionTimingFunction: "var(--ease-out-soft)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
            <SubTag className={subClass}>
              Easing &amp; Spring Curves (480ms duration)
            </SubTag>
            <div className="mt-4 space-y-4">
              {EASING_TOKENS.map((e) => (
                <div key={e.name} className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-caption">
                    <span className="text-text">{e.name}</span>
                    <span className="text-text-muted">{e.use}</span>
                  </div>
                  <div className="h-8 w-full overflow-hidden rounded-pill border border-line bg-bg p-1">
                    <div
                      className="h-full w-12 rounded-pill border-2 border-line-strong bg-blush"
                      style={{
                        transform: motionPlay
                          ? "translateX(200%)"
                          : "translateX(0%)",
                        transitionProperty: "transform",
                        transitionDuration: "var(--duration-slow)",
                        transitionTimingFunction: `var(${e.cssVar})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          key={fadeKey}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {(["lilac", "mint", "butter", "sky"] as const).map((tone, idx) => {
            const toneClass =
              tone === "lilac"
                ? "bg-lilac"
                : tone === "mint"
                  ? "bg-mint"
                  : tone === "butter"
                    ? "bg-butter"
                    : "bg-sky";
            return (
              <FadeIn
                key={tone}
                delay={idx * stagger}
                className={`rounded-lg border-2 border-line-strong p-6 text-on-pastel shadow-sticker-sm ${toneClass}`}
              >
                <p className="font-mono text-caption">
                  delay: {Math.round(idx * stagger * 1000)}ms
                </p>
                <p className="mt-2 font-display text-h4">FadeIn + springCalm</p>
                <p className="mt-1 font-body text-caption">
                  24 rise · 80ms stagger · reduced-motion aware
                </p>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </div>
  );
}
