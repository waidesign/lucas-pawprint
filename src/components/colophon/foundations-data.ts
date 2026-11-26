/**
 * Design-system foundation data shared by `/lab` (DesignSystemFoundations) and the
 * `/colophon` specimens. Values mirror `design.md` / `src/styles/tokens.css`.
 */
import type { ResolvedTheme } from "@/lib/theme";

export const RESOLVED_THEMES: { id: ResolvedTheme; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "warm-dark", label: "Warm Dark" },
];

export interface ThemeRoleSpec {
  role: string;
  cssVar: string;
  bgClass: string;
  use: string;
}

export const THEME_ROLES: ThemeRoleSpec[] = [
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

export const PASTEL_TOKENS = [
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

export const CHARACTER_TOKENS = [
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

export interface TypeScaleSpec {
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

export const TYPE_SCALE: TypeScaleSpec[] = [
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
    sample: "Luci: design control for AI coding agents",
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

export const SPACING_STEPS = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 160,
] as const;

export const RADIUS_TOKENS = [
  { name: "rounded-xs", className: "rounded-xs", size: "4", paw: "—" },
  { name: "rounded-sm", className: "rounded-sm", size: "8", paw: "Toe" },
  { name: "rounded-md", className: "rounded-md", size: "12", paw: "—" },
  { name: "rounded-lg", className: "rounded-lg", size: "16", paw: "Main pad" },
  { name: "rounded-xl", className: "rounded-xl", size: "20", paw: "—" },
  { name: "rounded-2xl", className: "rounded-2xl", size: "24", paw: "—" },
  {
    name: "rounded-pill",
    className: "rounded-pill",
    size: "9999",
    paw: "Toe bean",
  },
];

export const SHADOW_TOKENS = [
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

export const DURATION_TOKENS = [
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

export const EASING_TOKENS = [
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
