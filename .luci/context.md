# Project Context: lucas.pawprint.design

_Sections marked (confirmed) have been verified and aligned with `docs/pawprint-kit/`._

## Project Goal (confirmed)
Portfolio Website for **Lucas (Wai Phyo Aung), Product & Motion Designer**, at `https://lucas.pawprint.design` (part of the Pawprint umbrella, next to `luci.pawprint.design`). Calm page, lively character (**Loaffy**). **Luci** is the lead case study.

## Stack (confirmed)
- Framework: Next.js 16 App Router, React 19, TypeScript (`src/` directory)
- Package manager: npm
- Styling & Tokens: Tailwind CSS v4 (`@theme` + `@theme inline`), generated from `design.md` via `scripts/generate-tokens.mjs` into `src/styles/tokens.css`
- Fonts: `next/font/google` — Bricolage Grotesque (variable `opsz`, weights 600–800) and Inter (400, 500, 600)
- Icons & Class Utilities: `lucide-react`, `clsx`, `tailwind-merge` (`src/lib/cn.ts`)
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
- `src/components/ui/`: Core design system primitives (`Button`, `IconButton`, `TextLink`, `Heading`, `Eyebrow`, `Chip`, `Sticker`, `Card`, `Section`, `HoverNote`, `Toast`, `CopyEmail`, `ThemeSwitch`, `CursorToggle`, `BeanStepper`, `BeanLoader`, `DeviceFrame`, `VideoReel`, `BetaBadge`)
- `src/components/site/`: Site chrome (`Wordmark`, `SkipLink`, `SiteNav`, `MobileMenu`, `SiteFooter`)
- `src/components/case/`: Case study components (`BetaBadge`)
- `src/components/mascot/`: `parts/`, `LoaffySVG.tsx`, `Loaffy.tsx`, `RiveMascot.tsx`, `useLoaffyMachine.ts`, `LoaffyBus.ts`, `reactions.ts`, `CatHand.tsx`, `PawCursorProvider.tsx`
- `src/components/motion/`: `FadeIn`
- `src/lib/`: `cn.ts`, `theme.ts`, `motion.ts`, `case-studies.ts`
- `src/styles/tokens.css`: Generated Tailwind v4 tokens

## Phase Status (confirmed)
- **Done — Phase 1 (Foundations alignment) on `phase-1-foundations` (`704f995`):**
  - Aligned `design.md`, 3-theme tokens (`light`, `dark`, `warm-dark`), 4/8 grid lint, `tokens:check`, fonts, `ThemeProvider`, motion presets, and `/lab`.
- **Done — Phase 2 (Loaffy SVG first, Rive-ready, hand and cursor) on `phase-2-loaffy` (`65c61f8`):**
  - Built `src/components/mascot/` (`parts/`, `LoaffySVG.tsx`, `Loaffy.tsx`, `RiveMascot.tsx`, `useLoaffyMachine.ts`, `LoaffyBus.ts`, `reactions.ts`, `CatHand.tsx`, `PawCursorProvider.tsx`) and `/lab` Loaffy gallery.
- **Done — Phase 3 (Core components & site chrome) on `phase-3-components`:**
  - Built all 19 core UI primitives in `src/components/ui/` (+ `src/components/case/BetaBadge.tsx`): `Button`, `IconButton`, `TextLink`, `Heading` (single highlight guard), `Eyebrow`, `Chip` (+ filter chip), `Sticker`, `Card`, `Section`, `HoverNote`, `Toast` (+ `ToastProvider`, `useToast`), `CopyEmail` (`lucas@pawprint.design`), `ThemeSwitch` (`segmented` + `compact`), `CursorToggle`, `BeanStepper`, `BeanLoader`, `DeviceFrame`, `VideoReel`, `BetaBadge`.
  - Built site chrome in `src/components/site/`: `Wordmark` (ginger toe bean + 10s wink), `SkipLink`, `SiteNav` (pill nav, hide-on-scroll, compact `ThemeSwitch`, `Resume` → `/resume.pdf`), `MobileMenu` (full-screen sheet, focus trap, `Esc` close, scroll lock), and `SiteFooter` (`BRAND.md` copy in `pistachio-soft`).
  - Added Section `09 · Phase 3 — Core Components & Site Chrome` to `/lab` (`src/app/lab/ComponentsLabSection.tsx`).
- **Next — Phase 4 (`phase-4-content`):**
  - Build `src/lib/schema.ts` (zod case-study metadata validation), `src/content/site.ts`, create `src/content/case-studies/luci.mdx` first (teaser visibility, private beta), migrate the 6 client case studies from `docs/legacy/` (removing all unverified percentages/metrics), and add `scripts/optimize-images.mjs`.
- **Open Questions:** None.
