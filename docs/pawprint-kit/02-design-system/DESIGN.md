---
version: 2.0
name: Lucas Pawprint
description: "Design system for lucas.pawprint.design — Lucas (Wai Phyo Aung), Product & Motion Designer. Calm page, lively character (Loaffy). 4/8 grid."
grid: { base: 4, rule: "Every size, space, radius, shadow offset and duration is a multiple of 4 (prefer 8). Strokes 1px/2px are the only exception." }
colors:                       # light theme (default)
  bg: "#F6F6F3"
  surface: "#ECECE6"
  surface-2: "#E2E2DA"
  line: "#D6D6CC"
  line-strong: "#2B2B2B"
  text: "#2B2B2B"
  text-muted: "#55524D"
  text-subtle: "#64615B"
  inverse-bg: "#2B2B2B"
  inverse-text: "#F6F6F3"
  shadow: "#2B2B2B"
  focus: "#2B2B2B"
  outline: "#2B2B2B"
  lilac-soft: "#ECE4F9"
  mint-soft: "#D2EFE0"
  butter-soft: "#FAEEC2"
  sky-soft: "#D2E6F9"
  blush-soft: "#FAE0E4"
  pistachio-soft: "#E6F2CC"
themes:                       # extension: theme overrides of the same keys
  dark:
    bg: "#2B2B2B"
    surface: "#363636"
    surface-2: "#404040"
    line: "#4D4D4D"
    line-strong: "#F6F6F3"
    text: "#F6F6F3"
    text-muted: "#CFCCC6"
    text-subtle: "#B2AEA8"
    inverse-bg: "#F6F6F3"
    inverse-text: "#2B2B2B"
    shadow: "#1C1C1C"
    focus: "#F6F6F3"
    outline: "#F6F6F3"
    lilac-soft: "#48464D"
    mint-soft: "#404945"
    butter-soft: "#4D493B"
    sky-soft: "#40464D"
    blush-soft: "#4D4446"
    pistachio-soft: "#474A3F"
  warm-dark:
    bg: "#2D2926"
    surface: "#3A3430"
    surface-2: "#453E39"
    line: "#564D47"
    line-strong: "#F6EFE6"
    text: "#F6EFE6"
    text-muted: "#D3C8BC"
    text-subtle: "#B8AC9E"
    inverse-bg: "#F6EFE6"
    inverse-text: "#2D2926"
    shadow: "#1E1A17"
    focus: "#F6EFE6"
    outline: "#F6EFE6"
    lilac-soft: "#4A4449"
    mint-soft: "#424841"
    butter-soft: "#4F4737"
    sky-soft: "#424549"
    blush-soft: "#4F4342"
    pistachio-soft: "#48493A"
pastels:                      # same in every theme; text on them is always on-pastel
  lilac: "#E2D3FF"
  mint: "#AEE8CC"
  butter: "#FFE591"
  sky: "#AED6FF"
  blush: "#FFC9D5"
  pistachio: "#D7EEA6"
  on-pastel: "#2B2B2B"
character:                    # Loaffy ONLY (+ the wordmark bean)
  ginger: "#F4A878"
  ginger-deep: "#CD8D65"
  ginger-light: "#F8CAAA"
  cheek: "#F2B8B0"
  claw: "#F7F0E2"
typography:
  display-xl: { fontFamily: "Bricolage Grotesque", fontWeight: "800", fontSize: "clamp(4rem, 1.8873rem + 9.0141vw, 10rem)", lineHeight: "clamp(4rem, 2.2394rem + 7.5117vw, 9rem)", letterSpacing: "-0.05em" }
  display: { fontFamily: "Bricolage Grotesque", fontWeight: "800", fontSize: "clamp(3rem, 1.9437rem + 4.5070vw, 6rem)", lineHeight: "clamp(3rem, 2.1197rem + 3.7559vw, 5.5rem)", letterSpacing: "-0.045em" }
  h1: { fontFamily: "Bricolage Grotesque", fontWeight: "700", fontSize: "clamp(2.5rem, 1.9718rem + 2.2535vw, 4rem)", lineHeight: "clamp(2.75rem, 2.3099rem + 1.8779vw, 4rem)", letterSpacing: "-0.035em" }
  h2: { fontFamily: "Bricolage Grotesque", fontWeight: "700", fontSize: "clamp(2rem, 1.6479rem + 1.5023vw, 3rem)", lineHeight: "clamp(2.25rem, 1.8979rem + 1.5023vw, 3.25rem)", letterSpacing: "-0.03em" }
  h3: { fontFamily: "Bricolage Grotesque", fontWeight: "700", fontSize: "clamp(1.5rem, 1.3239rem + 0.7512vw, 2rem)", lineHeight: "clamp(1.75rem, 1.5739rem + 0.7512vw, 2.25rem)", letterSpacing: "-0.02em" }
  h4: { fontFamily: "Bricolage Grotesque", fontWeight: "700", fontSize: "clamp(1.25rem, 1.1620rem + 0.3756vw, 1.5rem)", lineHeight: "clamp(1.75rem, 1.6620rem + 0.3756vw, 2rem)", letterSpacing: "-0.01em" }
  body-lg: { fontFamily: "Inter", fontWeight: "400", fontSize: "1.25rem", lineHeight: "2rem", letterSpacing: "-0.01em" }
  body: { fontFamily: "Inter", fontWeight: "400", fontSize: "1rem", lineHeight: "1.5rem", letterSpacing: "-0.005em" }
  label: { fontFamily: "Inter", fontWeight: "600", fontSize: "0.75rem", lineHeight: "1rem", letterSpacing: "0.08em" }
  caption: { fontFamily: "Inter", fontWeight: "500", fontSize: "0.75rem", lineHeight: "1rem", letterSpacing: "0" }
  button: { fontFamily: "Inter", fontWeight: "600", fontSize: "1rem", lineHeight: "1rem", letterSpacing: "-0.005em" }
fonts: { display: "Bricolage Grotesque", body: "Inter", mono: "JetBrains Mono" }
rounded: { xs: 8px, sm: 12px, md: 16px, lg: 32px, xl: 40px, 2xl: 56px, pill: 9999px }
spacing: { unit: 4px, scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 160], section: "80→160px", gutter: "16→64px", container: 1312px, prose: 720px }
sizes: { control-sm: 40px, control-md: 48px, control-lg: 56px, icon-sm: 16px, icon-md: 20px, icon-lg: 24px, icon-xl: 32px, target-min: 48px }
borders: { hairline: 1px, pen: 2px, focus-width: 2px, focus-offset: 4px }
shadows: { sticker-sm: "4px 4px 0 0 shadow", sticker: "8px 8px 0 0 shadow", sticker-lg: "12px 12px 0 0 shadow" }
motion:
  duration: { instant: 120ms, fast: 200ms, base: 280ms, slow: 480ms, lazy: 720ms }
  easing: { out-soft: "cubic-bezier(0.22, 1, 0.36, 1)", in-out: "cubic-bezier(0.65, 0, 0.35, 1)", spring-calm: "stiffness 260, damping 24 (≈4% overshoot)", spring-bouncy: "stiffness 380, damping 18 (≈12% overshoot, Loaffy only)" }
  press: { scale: 0.96, shift: 4px }
  lift: { shift: -4px }
breakpoints: { sm: 480px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px }
z: { base: 0, sticker: 8, nav: 48, overlay: 80, modal: 88, toast: 96, cursor: 104 }
components:
  button-primary:   { background: "{colors.inverse-bg}", text: "{colors.inverse-text}", rounded: "{rounded.pill}", height: "{sizes.control-lg}", padding-x: 24px, shadow: "4px 4px 0 0 {pastels.sky}" }
  button-secondary: { background: "{pastels.lilac}", text: "{pastels.on-pastel}", border: "2px solid {colors.line-strong}", rounded: "{rounded.pill}", height: "{sizes.control-lg}", padding-x: 24px, shadow: "{shadows.sticker-sm}" }
  card-case:        { background: "<one pastel>", text: "{pastels.on-pastel}", border: "2px solid {colors.line-strong}", rounded: "{rounded.xl}", padding: 32px, shadow: "{shadows.sticker}" }
  chip:             { background: "{colors.surface}", text: "{colors.text}", rounded: "{rounded.pill}", height: 32px, padding-x: 12px, typography: "{typography.body}" }
  sticker:          { background: "<one pastel>", border: "2px solid {colors.line-strong}", rounded: "{rounded.lg}", padding: "16px 24px", shadow: "{shadows.sticker-sm}", rotate: "-4deg..4deg" }
---

# Lucas Pawprint · Design System & Foundations

> **This file is the project's `design.md`** — the single source of truth read by `scripts/generate-tokens.mjs`.
> The expected generator output is `tokens.css` in this folder (the "golden file"). After regenerating, the app's `src/styles/tokens.css` must match it (ignoring whitespace and comments).
> `tokens.json` is the same data in W3C Design Tokens format for other tools (Figma Tokens, Luci).

## 0. Principles

1. **Calm page, lively character.** The page is quiet and ordered; Loaffy carries the energy.
2. **Tokens only.** No raw hex, px, ms or easing in components.
3. **The 4/8 grid.** Every size, space, radius, shadow offset, line-height and duration is a multiple of 4 (prefer 8). Strokes (1px hairline, 2px pen) are the only exception. Loaffy's SVG geometry follows its own 200-unit grid.
4. **One idea per section.** One headline, one supporting line, one action.
5. **Sticker, not glass.** 2px ink borders and solid offset shadows. No blur, no gradients, no glow.
6. **Pastel, never pure.** No `#000000`, no `#FFFFFF`. Ink `#2B2B2B` and Cloud `#F6F6F3` are the extremes.
7. **Accessible by default.** WCAG 2.2 AA everywhere; AAA for body text where possible.
8. **Motion has a job.** Every animation explains, confirms or delights once. Only Loaffy's blink and breathing loop.

## 1. Colour

### 1.1 Theme roles
Raw variables are `--lp-<role>` (switch with `data-theme`); Tailwind exposes them as `bg-<role>`, `text-<role>`, `border-<role>`.

| Role | Light | Dark | Warm Dark | Use |
|---|---|---|---|---|
| `bg` | #F6F6F3 | #2B2B2B | #2D2926 | Page |
| `surface` | #ECECE6 | #363636 | #3A3430 | Quiet sections, inputs, chips |
| `surface-2` | #E2E2DA | #404040 | #453E39 | Hover on surface, stripes |
| `line` | #D6D6CC | #4D4D4D | #564D47 | Hairlines, dividers |
| `line-strong` | #2B2B2B | #F6F6F3 | #F6EFE6 | Pen borders (2px) |
| `text` | #2B2B2B | #F6F6F3 | #F6EFE6 | Body + headings |
| `text-muted` | #55524D | #CFCCC6 | #D3C8BC | Secondary copy |
| `text-subtle` | #64615B | #B2AEA8 | #B8AC9E | Meta, captions (never long text) |
| `inverse-bg` | #2B2B2B | #F6F6F3 | #F6EFE6 | Primary button fill |
| `inverse-text` | #F6F6F3 | #2B2B2B | #2D2926 | Primary button text |
| `shadow` | #2B2B2B | #1C1C1C | #1E1A17 | Sticker shadows |
| `focus` | #2B2B2B | #F6F6F3 | #F6EFE6 | Focus ring |
| `outline` | #2B2B2B | #F6F6F3 | #F6EFE6 | Loaffy outlines (currentColor) |
| `lilac-soft` | #ECE4F9 | #48464D | #4A4449 | |
| `mint-soft` | #D2EFE0 | #404945 | #424841 | |
| `butter-soft` | #FAEEC2 | #4D493B | #4F4737 | |
| `sky-soft` | #D2E6F9 | #40464D | #424549 | |
| `blush-soft` | #FAE0E4 | #4D4446 | #4F4342 | |
| `pistachio-soft` | #E6F2CC | #474A3F | #48493A | |

`<pastel>-soft` roles are theme-aware tints for whole-section backgrounds (light: pastel 50% into Cloud; dark themes: background + 16% pastel). Use full pastels for cards and stickers.

### 1.2 Pastels — "Loaffy Candy" (same in every theme)
Lilac `#E2D3FF` · Mint `#AEE8CC` · Butter `#FFE591` · Sky `#AED6FF` · Blush `#FFC9D5` · Pistachio `#D7EEA6`.
Text on any pastel = `on-pastel` (#2B2B2B), in every theme. Status: success = mint, warning = butter, danger = blush, info = sky — always with an icon and words, never colour alone.

### 1.3 Character colours (Loaffy only)
Ginger `#F4A878` · Ginger-deep `#CD8D65` · Ginger-light `#F8CAAA` · Cheek `#F2B8B0` · Claw `#F7F0E2`. Never used for UI. The one exception is the ginger bean in the `lucas` wordmark (it *is* Loaffy's bean).

### 1.4 Section rhythm
One pastel per section; neighbours never share. Home: Hero (bg) → Proof (surface) → Work (cards: Luci lilac, Classic Decoder sky, CD App mint, Vehicle Databases butter, Detailed Vehicle History pistachio, Fierce Fight Gear blush, Sarayah lilac) → Process (mint-soft) → Motion (sky-soft) → About (butter-soft) → Kind words (blush-soft) → Contact (lilac panel) → Footer (pistachio-soft).

### 1.5 Contrast (computed)

| Theme | Text token | On | Ratio | WCAG |
|---|---|---|---|---|
| light | text | bg | 13.1:1 | AAA |
| light | text | surface | 11.9:1 | AAA |
| light | text | surface-2 | 10.9:1 | AAA |
| light | text-muted | bg | 7.2:1 | AAA |
| light | text-muted | surface | 6.6:1 | AA |
| light | text-muted | surface-2 | 6.0:1 | AA |
| light | text-subtle | bg | 5.7:1 | AA |
| light | text-subtle | surface | 5.2:1 | AA |
| light | text-subtle | surface-2 | 4.7:1 | AA |
| light | text | lilac-soft | 11.5:1 | AAA |
| dark | text | bg | 13.1:1 | AAA |
| dark | text | surface | 11.2:1 | AAA |
| dark | text | surface-2 | 9.6:1 | AAA |
| dark | text-muted | bg | 8.8:1 | AAA |
| dark | text-muted | surface | 7.5:1 | AAA |
| dark | text-muted | surface-2 | 6.5:1 | AA |
| dark | text-subtle | bg | 6.4:1 | AA |
| dark | text-subtle | surface | 5.5:1 | AA |
| dark | text-subtle | surface-2 | 4.7:1 | AA |
| dark | text | lilac-soft | 8.6:1 | AAA |
| warm-dark | text | bg | 12.6:1 | AAA |
| warm-dark | text | surface | 10.7:1 | AAA |
| warm-dark | text | surface-2 | 9.2:1 | AAA |
| warm-dark | text-muted | bg | 8.8:1 | AAA |
| warm-dark | text-muted | surface | 7.4:1 | AAA |
| warm-dark | text-muted | surface-2 | 6.4:1 | AA |
| warm-dark | text-subtle | bg | 6.5:1 | AA |
| warm-dark | text-subtle | surface | 5.5:1 | AA |
| warm-dark | text-subtle | surface-2 | 4.7:1 | AA |
| warm-dark | text | lilac-soft | 8.3:1 | AAA |
| all | on-pastel (#2B2B2B) | lilac | 10.1:1 | AAA |
| all | on-pastel (#2B2B2B) | mint | 10.3:1 | AAA |
| all | on-pastel (#2B2B2B) | butter | 11.4:1 | AAA |
| all | on-pastel (#2B2B2B) | sky | 9.3:1 | AAA |
| all | on-pastel (#2B2B2B) | blush | 9.8:1 | AAA |
| all | on-pastel (#2B2B2B) | pistachio | 11.2:1 | AAA |

## 2. Typography (4/8 grid)

Bricolage Grotesque (variable `opsz` 12–96, `wght` 600–800) for display; Inter (400/500/600) for everything else; JetBrains Mono only on `/colophon`.
Fluid sizes interpolate between a mobile value at 375px and a desktop value at 1440px. **Both ends are on the 4px grid**, for size and line-height.

| Role | Font | Size (375→1440) | Line height | Tracking | Use |
|---|---|---|---|---|---|
| display-xl | Bricolage Grotesque 800 | 64→160px | 64→144px | -0.05em | **`<h1>`**: every page title (Hero, `/work`, case studies) |
| display | Bricolage Grotesque 800 | 48→96px | 48→88px | -0.045em | Not used for headings (decorative display text only) |
| h1 | Bricolage Grotesque 700 | 40→64px | 44→64px | -0.035em | **`<h2>`**: every section / chapter title |
| h2 | Bricolage Grotesque 700 | 32→48px | 36→52px | -0.03em | **`<h3>`**: card, case, step and sub-section titles |
| h3 | Bricolage Grotesque 700 | 24→32px | 28→36px | -0.02em | **`<h4>`**: small headings (e.g. changelog roles) |
| h4 | Bricolage Grotesque 700 | 20→24px | 28→32px | -0.01em | Not used for headings (UI text such as nav labels) |

**Heading scale (one size per level, every page; decision 2026-11-24):** `h1` → display-xl (160px) · `h2` → h1 token (64px) · `h3` → h2 token (48px) · `h4` → h3 token (32px). Pick the semantic tag; the size follows. In code use `<Heading as="…">` or `HEADING_SCALE_CLASSES` from `src/components/ui/Heading.tsx`; never set a heading size by hand.
| body-lg | Inter 400 | 20→20px | 32→32px | -0.01em | Reading prose, intros, TL;DR |
| body | Inter 400 | 16→16px | 24→24px | -0.005em | UI text, chips, meta values |
| label | Inter 600 | 12→12px | 16→16px | 0.08em | Eyebrows (uppercase) |
| caption | Inter 500 | 12→12px | 16→16px | 0 | Captions, footnotes |
| button | Inter 600 | 16→16px | 16→16px | -0.005em | Buttons |

Rules: max line length 68ch (`--prose-max` 720px). Headlines `text-wrap: balance`; paragraphs `text-wrap: pretty`. Labels are uppercase. One highlighted word per headline max (pastel pill, `border-radius: 0.24em`, `padding-inline: 0.16em`, `box-decoration-break: clone`). There is no 14px or 18px text anywhere.

## 3. Space, layout and grid

- **Scale (px):** 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 160. Tailwind `p-1`=4 … use only steps that land on this scale.
- **Section padding:** 80px (mobile) → 160px (desktop) top and bottom (`--space-section`).
- **Page gutter:** 16px → 64px (`--space-gutter`).
- **Container:** 1312px max content · prose column 720px.
- **Grid:** 12 columns, 24px gutter from `md`; 4 columns, 16px gutter below `md`.
- **Sizes:** controls 40 / 48 / 56px tall · icons 16 / 20 / 24 / 32px · minimum hit target **48×48**.
- **Breakpoints:** sm 480 · md 768 · lg 1024 · xl 1280 · 2xl 1536. Check at 375, 768, 1024, 1440, 1920.

## 4. Shape

| Token | Value | From the paw | Use |
|---|---|---|---|
| `rounded-xs` | 8px | — | Tooltips, small images |
| `rounded-sm` | 12px | Toe | Inputs, small cards, chips (non-pill) |
| `rounded-md` | 16px | — | Image frames, screenshots |
| `rounded-lg` | 32px | Main pad | Cards, stickers |
| `rounded-xl` | 40px | — | Case cards, section panels |
| `rounded-2xl` | 56px | — | Contact panel, hero stage |
| `rounded-pill` | 9999px | Toe bean | Buttons, nav pill, tags |

**Strokes:** hairline 1px `line` · pen 2px `line-strong` · focus 2px `focus` with 4px offset.

**Elevation = sticker shadows (no blur):** `shadow-sticker-sm` 4/4 · `shadow-sticker` 8/8 · `shadow-sticker-lg` 12/12, all in `--lp-shadow`.
Hover: translate(−4px, −4px) and step the shadow up one size. Press: translate(4px, 4px), shadow none, scale 0.96.

## 5. Motion

| Token | Value | Use |
|---|---|---|
| `duration-instant` | 120ms | Colour/opacity on press |
| `duration-fast` | 200ms | Hover, small toggles |
| `duration-base` | 280ms | Most UI transitions |
| `duration-slow` | 480ms | Section reveals, sheets |
| `duration-lazy` | 720ms | Loaffy morphs, page transitions |
| `ease-out-soft` | cubic-bezier(0.22, 1, 0.36, 1) | Default |
| `ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Scroll-linked |
| `ease-spring-calm` | linear(…) ≈ 4% overshoot | UI springs |
| `ease-spring-bouncy` | linear(…) ≈ 12% overshoot | Loaffy only |

All durations and delays are multiples of 40ms (stagger 40 or 80ms). Motion presets (`src/lib/motion.ts`):
```ts
export const springCalm   = { type: "spring", stiffness: 260, damping: 24, mass: 1 };
export const springBouncy = { type: "spring", stiffness: 380, damping: 18, mass: 0.9 }; // Loaffy only
export const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10% 0px" }, transition: springCalm };
export const stagger = 0.08; // seconds
```
Patterns: reveal once (24px rise, 80ms stagger, max 6 items) · underline grows left→right · cover wipe on case-card hover · press squish · sticker wobble ±2° · Loaffy morphs. Full character motion lives in `../01-brand/LOAFFY-ANIMATION.md`.
**Reduced motion:** no transforms, parallax or scrub; fades ≤ 120ms; Loaffy static Calm; the process story becomes stepped. Tokens collapse durations to 1ms and press/lift shifts to 0.

## 6. Themes

Light · Dark · Warm Dark · System. Stored in `localStorage.theme` (`light | dark | warm-dark | system`, default `system`) and applied as `data-theme` on `<html>` by an inline head script before paint. **System → Light when the OS is light, Warm Dark when the OS is dark.** Theme switch uses a View Transition circle reveal (480ms); instant under reduced motion.

## 7. Icons and imagery

Lucide, stroke 2, round caps, sizes 16/20/24/32, `currentColor`; icon-only buttons have `aria-label` and a 48×48 hit area. Case covers: real screens in thin device frames on one pastel; screenshots `rounded-md`; AVIF/WebP pre-optimised at build (static export), explicit width/height. No stock photos, no AI-generated people.

## 8. Accessibility (non-negotiable)

WCAG 2.2 AA (see §1.5) · visible `:focus-visible` ring on every interactive element · 48×48 targets · one `<h1>` per page, landmarks, skip link · `prefers-reduced-motion` everywhere · nothing flashes > 3×/s · paw cursor optional and off on touch · every Loaffy labelled or `aria-hidden` · form errors in text + icon.

## 9. Do / Don't

| Do | Don't |
|---|---|
| Multiples of 4/8 | 14px, 18px, 15px, 3px offsets, 250ms |
| Ink text on pastel | Ginger in UI |
| Solid offset shadows | Blur, glow, gradients |
| One pastel per section | Neighbours in the same colour |
| One highlighted word per headline | Highlighting a sentence |
| Tokens for every value | Raw hex/px/ms in components |
