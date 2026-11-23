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
- Content & Validation: `@next/mdx` case studies in `src/content/case-studies/*.mdx`, validated at build time with `zod` (`src/lib/schema.ts`, `src/lib/case-studies.ts`); site profile/experience/testimonials in `src/content/site.ts`
- Images: `scripts/optimize-images.mjs` (`sharp` → AVIF + WebP on `prebuild`)
- Motion & Mascot: `motion` (`motion/react`) presets in `src/lib/motion.ts`; `<Loaffy>` SVG-first facade + `@rive-app/react-canvas` upgrade, `<CatHand>`, and `<PawCursorProvider>`
- Hosting target: Cloudflare Workers static assets (static export)

## Commands (confirmed)
- Tokens generate: `npm run tokens` (auto-runs on `predev` and `prebuild`)
- Tokens golden & 4/8 grid check: `npm run tokens:check`
- Images optimize (AVIF + WebP): `npm run images` (auto-runs on `prebuild`)
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run typecheck`

## Folder Map (confirmed)
- `docs/pawprint-kit/`: Brand, design system, UX, build playbook, and reference Loaffy SVGs (read-only for agents)
- `docs/legacy/`: Backed-up `design.v0.md` and legacy migration source files (`projects.ts`, `TestimonialsSection.tsx`, `experience.ts`, legacy images)
- `public/case-studies/<slug>/` & `public/images/`: Optimized `.webp` and `.avif` covers, case screenshots, and Lucas's portrait
- `public/loaffy/` & `public/cursors/`: Loaffy SVG expressions, forms, poses, hand, and paw cursors
- `public/rive/`: Rive `.riv` animation files
- `public/resume.pdf`: Lucas's resume (≤ 1 MB)
- `scripts/generate-tokens.mjs` & `scripts/optimize-images.mjs`: Token and image build scripts
- `src/app/`: App Router routes (`/`, `/lab` dev-only)
- `src/components/ui/`: Core design system primitives
- `src/components/site/`: Site chrome (`Wordmark`, `SkipLink`, `SiteNav`, `MobileMenu`, `SiteFooter`)
- `src/components/case/`: Case study MDX components (`BetaBadge`, `Chapter`, `DecisionCard`, `Callout`, `ImageGallery`, `Clip`)
- `src/components/mascot/` & `src/components/motion/`: Loaffy, CatHand, PawCursor, FadeIn
- `src/content/`: `site.ts` and `case-studies/*.mdx` (`luci`, `classic-decoder`, `classic-decoder-app`, `vehicle-databases`, `detailed-vehicle-history`, `fierce-fight-gear`, `sarayah-phuket-villas`)
- `src/lib/`: `schema.ts`, `case-studies.ts`, `cn.ts`, `theme.ts`, `motion.ts`
- `src/styles/tokens.css`: Generated Tailwind v4 tokens

## Phase Status (confirmed)
- **Done — Phase 1 (Foundations alignment) on `phase-1-foundations` (`704f995`):**
  - Aligned `design.md`, 3-theme tokens, 4/8 grid lint, `tokens:check`, fonts, `ThemeProvider`, motion presets, and `/lab`.
- **Done — Phase 2 (Loaffy SVG first, Rive-ready, hand and cursor) on `phase-2-loaffy` (`65c61f8`):**
  - Built `src/components/mascot/` (`parts/`, `LoaffySVG.tsx`, `Loaffy.tsx`, `RiveMascot.tsx`, `useLoaffyMachine.ts`, `LoaffyBus.ts`, `reactions.ts`, `CatHand.tsx`, `PawCursorProvider.tsx`) and `/lab` Loaffy gallery.
- **Done — Phase 3 (Core components & site chrome) on `phase-3-components` (`b1b2aca`):**
  - Built all 19 UI primitives, site chrome (`Wordmark`, `SkipLink`, `SiteNav`, `MobileMenu`, `SiteFooter`), and `/lab` component gallery.
- **Done — Phase 4 (Content — Luci first + migration) on `phase-4-content`:**
  - Built `src/lib/schema.ts` (Zod schema per `IA.md §5` + banned percentage claim guard) and wired validation into `getAllCaseStudies()` in `src/lib/case-studies.ts`.
  - Created `src/content/site.ts` (`lucas@pawprint.design`, 5 changelog roles, 2 real manager testimonials from Hafsa A. and Fahad Qaiser, education).
  - Created `src/content/case-studies/luci.mdx` first (`order: 1`, `status: "beta"`, `visibility: "teaser"`).
  - Migrated the 6 client case studies into `src/content/case-studies/*.mdx` in first-person voice using `<Chapter>`, `<DecisionCard>`, `<Callout>`, and `<ImageGallery>`, removing all unverified sales percentages/metrics.
  - Added `scripts/optimize-images.mjs` (`sharp` → AVIF + WebP on `prebuild`).
- **Next — Phase 5 (`phase-5-home`):**
  - Build `src/components/sections/` (`Hero` with `LoaffyStage`, `ProofStrip`, `SelectedWork` with `CaseCard`, `ProcessStory` static 5-step placeholder, `MotionReel`, `AboutChangelog`, `KindWords`, `ContactPanel`) and assemble `src/app/page.tsx`.
- **Open Questions:**
  - Confirm if `[placeholder: confirm if year should stay 2025 or 2024–2025 for initial launch + AI rebuild]` in `sarayah-phuket-villas.mdx` should remain `2025`.
