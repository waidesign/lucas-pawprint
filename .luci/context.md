# Project Context: lucas.pawprint.design

_Sections marked (confirmed) have been verified and aligned with `docs/pawprint-kit/`._

## Project Goal (confirmed)
Portfolio Website for **Lucas (Wai Phyo Aung), Product & Motion Designer**, at `https://lucas.pawprint.design` (part of the Pawprint umbrella, next to `luci.pawprint.design`). Calm page, lively character (**Loaffy**). **Luci** is the lead case study.

## Stack (confirmed)
- Framework: Next.js 16 App Router, React 19, TypeScript (`src/` directory)
- Package manager: npm
- Styling & Tokens: Tailwind CSS v4 (`@theme` + `@theme inline`), generated from `design.md` via `scripts/generate-tokens.mjs` into `src/styles/tokens.css`
- Fonts: `next/font/google` — Bricolage Grotesque (variable `opsz`, weights 600–800) and Inter (400, 500, 600)
- Content: `@next/mdx` case studies in `src/content/case-studies/*.mdx`
- Motion & Mascot: `motion` (`motion/react`) presets in `src/lib/motion.ts`; `<Loaffy>` SVG-first facade + `@rive-app/react-canvas` upgrade, `<CatHand>`, and `<PawCursorProvider>`
- Hosting target: Cloudflare Workers static assets (static export)

## Commands (confirmed)
- Tokens generate: `npm run tokens` (auto-runs on `predev` and `prebuild`)
- Tokens golden & 4/8 grid check: `npm run tokens:check`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run typecheck`

## Folder Map (confirmed)
- `docs/pawprint-kit/`: Brand, design system, UX, build playbook, and reference Loaffy SVGs (read-only for agents)
- `docs/legacy/`: Backed-up `design.v0.md` and legacy migration source files
- `public/loaffy/` & `public/cursors/`: Loaffy SVG expressions, forms, poses, hand, and paw cursors
- `public/rive/`: Rive `.riv` animation files
- `public/resume.pdf`: Lucas's resume (≤ 1 MB)
- `scripts/generate-tokens.mjs`: Compiles `design.md` frontmatter to `src/styles/tokens.css` with 4/8 grid lint and golden diff check
- `src/app/`: App Router routes (`/`, `/lab` dev-only)
- `src/components/mascot/`:
  - `parts/index.tsx`: `PenShape`, `ShadedShape`, `Pad`, `Bean`, `Eyes`, `Mouth`, `Cheeks`, `Highlight`, `GroundShadow`, and pose/form props
  - `parts/clearance.ts`: Dev assertion verifying bean-to-pad clearance ≥ 9.5u static and ≥ 4.0u across all animation keyframes
  - `LoaffySVG.tsx`: Full SVG renderer (6 expressions, 9 poses, 8 forms, pen wobble filter, 40ms-grid `motion/react` timelines)
  - `Loaffy.tsx`: Public facade (server-renders `LoaffySVG`, lazy-upgrades to `RiveMascot` with 120ms cross-fade when `/rive/loaffy.riv` exists)
  - `RiveMascot.tsx`: `Loaffy SM` state machine contract (`mood`, `form`, `pose`, `lookX`, `lookY`, `hover`, `reduced`, and triggers), off-screen/hidden-tab pause, DPR ≤ 2
  - `useLoaffyMachine.ts`, `LoaffyBus.ts`, `reactions.ts`: Random blink (4–7s), 30s idle → sleepy, pointer look tracking, and site event reaction table
  - `CatHand.tsx` & `PawCursorProvider.tsx`: Fur/bean hand with claws and edge entry; paw cursor toggle persisted in `localStorage["paw-cursor"]`
- `src/components/motion/`: `FadeIn`
- `src/lib/`: `theme.ts` (3-theme provider + head script), `motion.ts` (spring presets), `case-studies.ts`
- `src/styles/tokens.css`: Generated Tailwind v4 tokens

## Phase Status (confirmed)
- **Done — Phase 1 (Foundations alignment) on `phase-1-foundations` (`704f995`):**
  - Aligned `design.md`, 3-theme tokens (`light`, `dark`, `warm-dark`), 4/8 grid lint, `tokens:check`, fonts, `ThemeProvider`, motion presets, and `/lab`.
- **Done — Phase 2 (Loaffy SVG first, Rive-ready, hand and cursor) on `phase-2-loaffy`:**
  - Built `src/components/mascot/parts/` (`PenShape`, `ShadedShape`, anatomy primitives, and dev bean-to-pad clearance assertion ≥ 4u).
  - Built `LoaffySVG.tsx` with every expression, pose, and form, pen wobble filter (auto-off < 48px), `var(--lp-outline)` outlines, and 40ms-grid `motion/react` timelines.
  - Built `Loaffy.tsx` facade, extended `RiveMascot.tsx` to `LOAFFY-ANIMATION.md §7.2`, and implemented `useLoaffyMachine.ts`, `LoaffyBus.ts`, and `reactions.ts`.
  - Built `CatHand.tsx` and `PawCursorProvider.tsx` (+ cursor CSS in `src/app/globals.css`).
  - Added the `/lab` Loaffy gallery (`src/app/lab/LoaffyLabSection.tsx`) comparing every expression, pose, form, and hand side beside its reference SVG across all 3 themes and sizes 32/64/128/320, with interactive reaction triggers.
- **Next — Phase 3 (`phase-3-components`):**
  - Build core UI primitives (`Button`, `IconButton`, `TextLink`, `Heading`, `Eyebrow`, `Chip`, `Sticker`, `Card`, `Section`, `HoverNote`, `Toast`, `CopyEmail`, `ThemeSwitch`, `CursorToggle`, `BeanStepper`, `BeanLoader`, `DeviceFrame`, `VideoReel`, `BetaBadge`) and site chrome (`SiteNav`, `MobileMenu`, `SiteFooter`).
- **Open Questions:** None.
