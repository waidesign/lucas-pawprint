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

**Size follows the tag (one heading scale, every page):** `h1` → display-xl (160px) · `h2` → h1 token (64px) · `h3` → h2 token (48px) · `h4` → h3 token (32px). Don't pass `size` outside `/lab` demos. Hand-written heading tags (MDX, cards) use `HEADING_SCALE_CLASSES[tag]`. If a title doesn't fit, change the layout, not the size. (AGENTS.md rule 17; `.luci/decisions/2026-11-24-heading-scale.md`.)

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
Use only per rule 18 (a clickable whole, a media/demo frame, or one standout panel per section). `rounded-lg`, 2px pen border, `shadow-sticker-sm`, padding 24 (mobile) / 32 (desktop). Tone optional.

### RuledList
`ol` (when ordered) or `ul` topped by a 2px pen rule (`border-line-strong`), rows separated by 1px hairlines (`border-line`), `py-6 md:py-8`. Each row is a 12-col grid (stacks below `md`): marker (`md:col-span-2`: mono label, years, or numbered bean) · title (`md:col-span-4`: heading via `as`, default `h4`) · body (`md:col-span-6`: `body-lg`, `text-muted`) + optional right-aligned `aside` (`caption`). With no marker, the marker slot collapses (title `md:col-span-5`, body `md:col-span-7`). Numbered beans only for real steps or reference IDs (see **Numerals** below). Reveal: rise 16px + fade, 40ms stagger, max 6 items, off under reduced motion.

### IndexColumns
2–4 plain columns (`gap-10`; 1 col → 2 at `md` → n at `lg`). Each column starts with a 2px pen rule, optional label (mono uppercase or pastel `Chip`), optional decorative `font-display` numeral (`aria-hidden`, steps only), heading via `as` (default `h4`), body, and optional actions. No fill, no shadow.

### Numerals (01, 02, 03…)
A number earns its place only when **order matters** (the reader follows steps in sequence: Home's process, How I make it, Luci's Show → Direct → Check → Remember loop) or when it is a **reference ID** (annotation markers that point into a code panel or image). Parallel items (problems, features, decisions, principles, findings, learnings, FAQs, checklists, TL;DR parts) get **no number**: their title, eyebrow or `Chip` labels them. Never number something that is already numbered elsewhere (case chapters are numbered once, in `CaseStepper`). Use `ol` only for numbered sequences; parallel lists are `ul`.

### PullQuote
`<figure>` for testimonials outside Home: `<blockquote>` in `font-display text-h3` (max width `--prose-max`), `<figcaption>` with author (`text-h4` on `<p>`), role · company caption, relationship chip, and optional "Read the full note" disclosure. Sibling quotes separate with a 1px hairline and `pt-10`.

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
| `SelectedWork` | h2 "Work." (h1 on `/work`) + filter chips (hidden on Home) + CaseCard rows | **Luci first (featured, Badge "Open source")**, then 6 client cases, one row each; thumbnails alternate left / right on `lg+`; Loaffy peeks on hover (Curious). |
| `ProcessStory` | The signature scroll story (see `03-ux/USER-FLOWS.md §5`) | GSAP ScrollTrigger; stepped fallback. |
| `MotionReel` | h2 "Motion." + VideoReel + 2 clips + Behance link | Loaffy Vibing pose when playing. |
| `AboutChangelog` | h2 + Resume CTA, then an app window: Claude-style chat (visitor asks, assistant answers with portrait + short bio, a "Changelog" artifact card and the resume) beside a FigJam-style dotted canvas with one sticky note per role and live cursors | Scroll story: pinned on xl + tall screens (scroll drives the steps, reversible), otherwise plays once in view; reduced motion shows all. No education. Screen readers get a plain bio + changelog list. |
| `KindWords` | 2 testimonial Quotes (pull quote + "Read the full note" disclosure) | Real quotes only. |
| `ContactPanel` | Lilac panel: headline, CopyEmail, Book a chat, socials, time-zone line | Loaffy bubble form. |

### CaseCard
```ts
type CaseCardProps = { slug: string; title: string; summary: string; tags: string[]; tone: Tone; cover: Image; coverAlt: string; form: Form; liveUrl?: string; featured?: boolean; badge?: string; year?: string; role?: string; reverse?: boolean };
```
A case study **row**, not a boxed card (layout inspired by slush.app's "Your shortcut to DeFi" section, built with our tokens).

- **Thumbnail = the only card.** The cover image itself is the card: 16:10, 2px pen border, `rounded-xl`, `shadow-sticker`; the case's pastel `tone` shows only while it loads. Hover: lift (`lp-sticker-interactive`) + slow cover zoom (`duration-slow`, `ease-out-soft`) + Loaffy (form, Curious) peeks from behind the image's top-right edge (no overlap with text).
- **Everything else sits plain on the canvas** (no background, theme tokens only): meta line (Badge, year in mono label, role in muted caption) → `h3` title at the site heading scale (48px), in the case's own capitalisation, never all caps, revealed word by word on scroll (40ms stagger; off under reduced motion) → summary (`body-lg`, medium) → outlined tag pills → primary pill CTA "Read case study →" (sentence case, never all caps) + optional "Live site ↗" text link.
- **Layout:** 6/6 columns on `lg+`, `reverse` puts the thumbnail on the right (rows alternate); stacked thumbnail-first below `lg`. Every case uses the same row; `featured` only orders Luci first and sets the "Live" badge.
- **Links:** the CTA is the case's one accessible link; the thumbnail repeats it for pointer users (`tabIndex={-1}`, `aria-hidden`). The live-site link is a separate, non-nested link. `coverAlt` is still read once (visually hidden).

---

## E. Case study (`src/components/case/` & `src/components/ui/Badge.tsx`)

| Component | Purpose |
|---|---|
| `Badge` | Generic status/label pill (`label`, `tone`, 2px pen border, `shadow-sticker-sm`, no dots per rule 16; replaces `BetaBadge`) |
| `CaseHero` | Inline breadcrumb ("Work / {title}"), meta line (`Badge` + year + role), `h1` (`display-xl` with one highlighted word), `body-lg` summary, pill CTAs, and full-width tilted cover stage (`rounded-2xl`, 2px pen border, `shadow-sticker`; Loaffy peek off on Luci per rule 11) |
| `MetaRow` | Spec row: `<dl>` between a 2px pen rule (top) and 1px hairline (bottom), `py-6`, 2 → 3 → 5 columns |
| `TLDR` | "At a glance." overview band: `h2` heading, `MetaRow`, and 3-column `IndexColumns` (Problem · What I did · Outcome) labelled by pastel `Chip`s, no numerals; no boxes |
| `Chapter` | Full-width alternating `bg` / `<caseTone>-soft` bands joined by wavy `<SectionSeam>` edges; quiet mono step label (no numeral: `CaseStepper` numbers the chapters) + `h2` (`h1` token, one highlighted word) + `body-lg` intro |
| `CaseStepper` | Compact floating `lg+` chapter pill (`BeanStepper` with 4 chapters, `aria-current="step"`) that appears after hero scrolls out and hides over closing band; keyboard reachable via `focus-within` |
| `FeatureRow` | Alternating media left/right (`6/6` or `7/5` mirroring `CaseCard`) with plain text (mono eyebrow, `h3`, `body-lg`, optional labelled points/bullets; no numeral) beside one framed media block |
| `DecisionList` | Plain rows (no numerals) with 2px top rule + 1px hairlines, `h3`/`h4` title, 3-col hairline-split `<dl>` (Problem · Decision · Why), and optional paired media (replaces `DecisionCard`) |
| `Showcase` | One large framed media block with caption, or a 2–3 frame gallery with lightbox zoom (max one gallery per section) |
| `BrowserFrame` | Flat portfolio browser window (2px ink border, `rounded-xl`, top bar with three pastel dots, optional URL pill) wrapping `<picture>` screenshots or `LoopVideo` |
| `LoopVideo` | Muted, `playsInline`, looping `preload="none"` video with required poster, `IntersectionObserver` play-in-view, 48×48 pause/play control (WCAG 2.2.2), reduced-motion static poster, and optional `start` offset |
| `PainList` / `InsightList` | Plain `RuledList`-based lists (no numerals) for Understand/Shape friction and findings |
| `Outcome` | Qualitative `<p className="font-display text-h3">` statement + "What shipped" hairline list + live CTAs |
| `Learnings` | Plain `RuledList` of project takeaways (no numerals) |
| `Callout` | Margin note: `border-l-2 border-line-strong pl-6`, title highlighted in `tone`, body below; no fill, no shadow |
| `CaseCTA` | Closing standout panel (one card per rule 18c) with primary CTA, "Book a chat", and Loaffy bubble form |
| `NextCase` | Big clickable card linking to the next case study with its pastel tone and Loaffy form |

---

## F. Definition of done (every component)

- [ ] Uses tokens only (grep for `#` and `px` in the component = none except SVG geometry); every value on the 4/8 grid.
- [ ] Works in Light, Dark, Warm Dark.
- [ ] Keyboard: reachable, visible focus, logical order; Esc closes overlays.
- [ ] Screen reader: correct role/name/state (checked with axe + manual VoiceOver pass).
- [ ] Reduced motion handled.
- [ ] Responsive from 320px to 1920px.
- [ ] Shown in `/lab` (and later `/colophon`) with all variants and states.
