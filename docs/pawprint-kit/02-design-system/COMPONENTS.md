# Core Components · Structure & API

> Every component uses tokens from `tokens.css` only. Every interactive component has hover, focus-visible, active, disabled (where relevant) and reduced-motion behaviour.
> Everything on the 4/8 grid (DESIGN.md §0.3). Folder layout is in `../04-build/TECH-STACK.md`. Build order is in `../04-build/PROMPTS.md`.

**Conventions**
- React Server Components by default; add `"use client"` only for state, effects or motion.
- Props are typed in TypeScript; variants via a small `cva`-style map, not ad-hoc classNames.
- `className` is accepted on every component and merged last (`cn()` helper).
- Polymorphic links: when a Button navigates, it renders `next/link`; when it acts, it renders `<button>`.
- Tone = which pastel a component sits on or uses: `type Tone = "lilac" | "mint" | "butter" | "sky" | "blush" | "pistachio"`.

---

## A. Primitives (`src/components/ui/`)

### Button
```ts
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";   // default "primary"
  size?: "md" | "lg";                            // md = 48px, lg = 56px tall
  href?: string;                                 // renders <Link> when set
  external?: boolean;                            // adds ↗, target=_blank, rel=noopener
  iconStart?: ReactNode; iconEnd?: ReactNode;
  tone?: Tone;                                   // secondary only; default "lilac"
} & ComponentPropsWithoutRef<"button">;
```
- **primary:** bg `inverse-bg`, text `inverse-text`, pill, shadow `4px 4px 0 var(--color-sky)`.
- **secondary:** bg pastel `tone`, `on-pastel` text, 2px pen border, `shadow-sticker-sm`.
- **ghost:** text only, underline grows on hover.
- States: hover = translate(`--lift-shift`) + next shadow size · active = translate(`--press-shift`) + no shadow + scale(`--press-scale`) · focus ring · disabled 48% opacity, no shadow, `aria-disabled`.
- Padding-x 24px; icon gap 8px; min target 48×48.

### IconButton
Same as Button but square/circle, requires `aria-label`. 48px circle, 2px pen border.

### TextLink
Inline link. Ink text, 2px underline offset 4px. Hover: underline goes 1px → 2px and a pastel highlight slides in behind (`background-size` 0 → 100%, `--duration-base`). External links add ↗ with `aria-label` "(opens in new tab)".

### Heading
```ts
type HeadingProps = { as?: "h1"|"h2"|"h3"|"h4"; size?: "display-xl"|"display"|"h1"|"h2"|"h3"|"h4"; highlight?: string; highlightTone?: Tone; children: string };
```
Renders the text and wraps the first match of `highlight` in a pastel pill. Only one highlight allowed (throw in dev if more). `text-wrap: balance`.

### Eyebrow
Label style (12/16, uppercase, +0.08em), `text-muted`. Optional leading bean dot (8×12 ellipse in a pastel).

### Chip / Tag
```ts
type ChipProps = { tone?: Tone | "surface"; size?: "sm" | "md"; selected?: boolean; as?: "span" | "button" };
```
Pill, 32px tall, padding-x 12px, `surface` by default. As `button` it becomes a filter chip: `aria-pressed`, selected = ink bg + cloud text.

### Sticker
```ts
type StickerProps = { tone: Tone; rotate?: -4|-3|-2|0|2|3|4; size?: "sm"|"md"|"lg"; children: ReactNode };
```
Pastel fill, 2px pen border, `rounded-lg`, padding 16/24, `shadow-sticker-sm`, slight rotation. Hover: wobble ±2° with spring. Used for the hero smash line, availability, callouts.

### Card
Base surface. `rounded-lg`, 2px pen border, `shadow-sticker-sm`, padding 24 (mobile) / 32 (desktop). Tone optional.

### Container / Section
```ts
type SectionProps = { id: string; tone?: Tone | "bg" | "surface"; soft?: boolean; bleed?: boolean; labelledBy: string; children: ReactNode };
```
`<section aria-labelledby>` with `--space-section` vertical padding, gutter padding, max-width container. `soft` uses `--color-<tone>-soft`.

### HoverNote ("why" note)
Small ⓘ trigger next to a design detail; on hover/focus shows a sticker tooltip with one sentence explaining the decision (the "Curious" trait). Uses Radix Tooltip or native popover; keyboard and touch accessible (tap to toggle).

### Toast
Bottom-center sticker, `--z-toast`, auto-dismiss 4000ms, `role="status"` `aria-live="polite"`. Optional Loaffy 48px (simplified) at left. One toast at a time.

### CopyEmail
```ts
type CopyEmailProps = { email: string };
```
Shows `lucas@pawprint.design` in a surface pill + "Copy email" button. On copy: `navigator.clipboard.writeText`, toast "Copied. Loaffy's waiting by the inbox.", Loaffy → Happy. Fallback on failure: select the text and show the failure copy. Also a `mailto:` link.

### ThemeSwitch
Segmented control (`role="radiogroup"`) with 4 options: Light, Dark, Warm Dark, System. Icons: sun, moon, moon-with-cup (warm), monitor. Writes `localStorage.theme`, updates `data-theme`, View Transition circle reveal. Compact variant in nav: one IconButton that opens a 4-option popover.

### CursorToggle
Switch "Paw cursor: On / Off" (`role="switch"`, `aria-checked`). Sets `data-paw-cursor` on `<html>` + `localStorage`. Hidden on touch devices.

### BeanStepper
```ts
type BeanStepperProps = { steps: string[]; current: number; orientation?: "horizontal"|"vertical" };
```
Four (or n) bean shapes joined by a 2px line; done = mint fill, current = mint fill + 4px ring (outline 2px + 2px gap), upcoming = surface fill. `aria-current="step"`. Used on case studies (Problem → Process → Solution → Result) and the process story.

### BeanLoader
Four small beans in the paw arc light up in turn (mint), 960ms loop (240ms per bean). `role="progressbar"` with `aria-label` "Loading". Reduced motion: static with "Loading…" text.

### ImageFrame / DeviceFrame
```ts
type DeviceFrameProps = { device: "laptop"|"phone"|"browser"|"none"; src: StaticImageData|string; alt: string; tone?: Tone; priority?: boolean };
```
Thin quiet frame, 2px pen border, screen radius `rounded-md` (16px), sits on a pastel panel. Uses `next/image` with `sizes`.

### VideoReel
Lazy-loaded `<video>` (muted, playsInline, poster), custom play button (Loaffy "play" form, 96px), captions track, pause on leave viewport. Reduced motion: no autoplay.

---

## B. Characters (`src/components/mascot/`)

### Loaffy
```ts
type Mood = "calm" | "curious" | "thinking" | "happy" | "sleepy" | "surprised";
type Pose = "none" | "loaf" | "shades" | "chill-lean" | "jump" | "landing" | "wink" | "side-eye" | "vibing" | "mid-flip";
type Form = "paw" | "paw-3d" | "window" | "phone" | "cube" | "play" | "bubble" | "lost";
type LoaffyProps = {
  mood?: Mood; pose?: Pose; form?: Form;
  size?: 32 | 48 | 64 | 128 | 240 | 320 | 480;   // px on the 8px grid, default 240
  track?: boolean;            // eyes follow pointer (default true when size ≥ 120)
  blink?: boolean;            // default true
  wobble?: boolean;           // pen wobble filter; auto-off below 48px
  decorative?: boolean;       // aria-hidden when true
  label?: string;             // aria-label when not decorative
  onClick?: () => void;       // happy hop
};
```
- Built from parts in `parts.tsx` (Pad, Bean, Eyes, Mouth, Cheeks, Highlight, Shadow) using the exact geometry in `LOAFFY.md`.
- Pen outline helper `<PenShape>` renders under-copy + main shape. 3D helper `<ShadedShape>` renders clip-path shading inside one outline.
- Outline uses `currentColor`; the component sets `color: var(--lp-outline)`.
- Facade: server-renders `LoaffySVG`; upgrades to `RiveMascot` (`/rive/loaffy.riv`) on the client when in view and idle (LOAFFY-ANIMATION.md §7).
- Morphs, hops, blinks: timelines in LOAFFY-ANIMATION.md §4 (SVG via Motion; Rive via the state machine).
- **No shapes may overlap** (bean ↔ pad gap ≥ 9.5 units). Add a dev-only assertion.

### LoaffyStage
Hero composition: Loaffy (loaf pose) sitting **outside** an open cardboard box with a small gap, ground shadow, optional sticker slots. Handles scroll-out morph into the first case study's form.

### CatHand
```ts
type CatHandProps = { side?: "fur" | "beans"; from?: "bottom"|"top"|"left"|"right"; angle?: number; size?: number; claws?: boolean; decorative?: boolean };
```
Enters from a frame edge (the leg is clipped by the section edge). Never on screen at the same time as Loaffy (except the cursor).

### PawCursorProvider
Reads `localStorage["paw-cursor"]`, sets `data-paw-cursor` on `<html>`, disables on `(pointer: coarse)` and reduced motion. CSS in `LOAFFY.md §8`. SVGs in `/public/cursors/`.

---

## C. Site chrome (`src/components/site/`)

### SiteNav
- Left: wordmark `lucas` + ginger bean (the ONE ginger UI exception: it is part of the logo, i.e. Loaffy's bean).
- Center: pill nav (surface bg) — Work · Motion · About · Contact. Active item: ink bg.
- Right: ThemeSwitch (compact) + Resume (secondary button, opens `/resume.pdf`).
- Sticky; hides on scroll down, shows on scroll up (after 120px). `backdrop-filter` not allowed (no glass): solid `bg` at 100%.
- Mobile (< md): wordmark + menu IconButton → full-screen sheet with big display-size links, ThemeSwitch, Resume, socials. Focus trapped, Esc closes, body scroll locked.
- Skip link "Skip to content" is the first focusable element.

### SiteFooter
Pistachio-soft section: wordmark, nav links, socials (LinkedIn, Behance, GitHub, Medium), ThemeSwitch (full), CursorToggle, "Made with care in Phuket, Thailand.", "Part of Pawprint · pawprint.design", "© 2026 Lucas (Wai Phyo Aung)", link to `/colophon`.

---

## D. Home sections (`src/components/sections/`)

| Component | Content | Notes |
|---|---|---|
| `Hero` | Eyebrow, headline with "box" highlight, LoaffyStage, smash Sticker (blush), availability Sticker (mint), 2 CTAs | Loaffy ≈ 60% visual weight. Eyes track. Scroll cue at bottom. |
| `ProofStrip` | "Founder of Luci · 10 years in design · Now: Senior UI/UX & Motion Designer at Empire Pixel" + "Shipped for: …" | Surface pill row; Luci links to its case study. |
| `SelectedWork` | display-xl word "Work." + filter chips + CaseCards | **Luci first (featured, BetaBadge)**, then 6 client cases; each card its own pastel; Loaffy peeks on hover (Curious). |
| `ProcessStory` | The signature scroll story (see `03-ux/USER-FLOWS.md §5`) | GSAP ScrollTrigger; stepped fallback. |
| `MotionReel` | display-xl "Motion." + VideoReel + 2 clips + Behance link | Loaffy Vibing pose when playing. |
| `AboutChangelog` | Portrait, short bio, changelog list, education, resume link | Chill-lean pose. |
| `KindWords` | 2 testimonial Quotes (pull quote + "Read the full note" disclosure) | Real quotes only. |
| `ContactPanel` | Lilac panel: headline, CopyEmail, Book a chat, socials, time-zone line | Loaffy bubble form. |

### CaseCard
```ts
type CaseCardProps = { slug: string; title: string; summary: string; tags: string[]; tone: Tone; cover: Image; form: Form; liveUrl?: string; featured?: boolean; badge?: string };
```
Whole card is one link (`<a>` wrapping, with the live-site link as a separate, non-nested link outside the card's main anchor). Pastel bg, 2px pen border, `rounded-xl`, `shadow-sticker`, padding 32. Hover: lift + cover wipe + Loaffy (form) peeks from the top-right corner (outside the cover, no overlap with text). Featured = 7/5 split layout; others = stacked.

---

## E. Case study (`src/components/case/`)

| Component | Purpose |
|---|---|
| `CaseHero` | Title (h1), one-line summary, DeviceFrame cover on the case's pastel, Loaffy form peeking |
| `MetaRow` | Role · Team · Timeline · Platform · Tools (definition list `<dl>`) |
| `TLDR` | Three stickers: Problem · What I did · Outcome (qualitative; no invented numbers) |
| `BeanStepper` | Sticky progress through Understand → Shape → Design → Ship |
| `DecisionCard` | Problem → Decision → Why, with before/after images |
| `Callout` | Pastel sticker for a key insight or quote |
| `ImageGallery` | 1–3 images, captions, zoom (dialog with focus trap) |
| `NextCase` | Big link to the next case with its Loaffy form |
| `BetaBadge` | "Private beta" pill (butter, 2px border) for Luci; also used on the Luci CaseCard |

---

## F. Definition of done (every component)

- [ ] Uses tokens only (grep for `#` and `px` in the component = none except SVG geometry); every value on the 4/8 grid.
- [ ] Works in Light, Dark, Warm Dark.
- [ ] Keyboard: reachable, visible focus, logical order; Esc closes overlays.
- [ ] Screen reader: correct role/name/state (checked with axe + manual VoiceOver pass).
- [ ] Reduced motion handled.
- [ ] Responsive from 320px to 1920px.
- [ ] Shown in `/lab` (and later `/colophon`) with all variants and states.
