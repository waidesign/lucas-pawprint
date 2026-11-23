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
- Motion & Mascot: `motion` (`motion/react`) presets in `src/lib/motion.ts`; `<Loaffy>` SVG-first facade + `@rive-app/react-canvas` upgrade, `<LoaffyStage>`, `<CatHand>`, and `<PawCursorProvider>`
- Analytics: Cookieless event dispatcher in `src/lib/analytics.ts` (`resume_download`, `email_copy`, `book_chat_click`, `case_open`, `luci_click`, `theme_change`, `cursor_toggle`)
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
- `docs/legacy/`: Backed-up `design.v0.md` and legacy migration source files
- `public/case-studies/<slug>/` & `public/images/`: Optimized `.webp` and `.avif` covers, case screenshots, and Lucas's portrait
- `public/loaffy/` & `public/cursors/`: Loaffy SVG expressions, forms, poses, hand, and paw cursors
- `public/rive/`: Rive `.riv` animation files
- `public/resume.pdf`: Lucas's resume (≤ 1 MB)
- `scripts/generate-tokens.mjs` & `scripts/optimize-images.mjs`: Token and image build scripts
- `src/app/`: App Router routes (`/` full Home page, `/lab` dev-only)
- `src/components/sections/`: Home sections (`Hero`, `ProofStrip`, `SelectedWork`, `CaseCard`, `ProcessStory`, `MotionReel`, `AboutChangelog`, `KindWords`, `ContactPanel`)
- `src/components/ui/`: Core design system primitives
- `src/components/site/`: Site chrome (`Wordmark`, `SkipLink`, `SiteNav`, `MobileMenu`, `SiteFooter`)
- `src/components/case/`: Case study MDX components (`BetaBadge`, `Chapter`, `DecisionCard`, `Callout`, `ImageGallery`, `Clip`)
- `src/components/mascot/` & `src/components/motion/`: `Loaffy`, `LoaffyStage`, `LoaffySVG`, `RiveMascot`, `CatHand`, `PawCursorProvider`, `FadeIn`
- `src/content/`: `site.ts` and `case-studies/*.mdx` (7 case studies, `luci` first)
- `src/lib/`: `analytics.ts`, `schema.ts`, `case-studies.ts`, `cn.ts`, `theme.ts`, `motion.ts`
- `src/styles/tokens.css`: Generated Tailwind v4 tokens

## Phase Status (confirmed)
- **Done — Phase 1 (Foundations alignment) on `phase-1-foundations` (`704f995`)**
- **Done — Phase 2 (Loaffy SVG first, Rive-ready, hand and cursor) on `phase-2-loaffy` (`65c61f8`)**
- **Done — Phase 3 (Core components & site chrome) on `phase-3-components` (`b1b2aca`)**
- **Done — Phase 4 (Content — Luci first + migration) on `phase-4-content` (`133e2bc`)**
- **Done — Phase 5 (Home page) on `phase-5-home`:**
  - Built `src/lib/analytics.ts` for all 7 events in `TECH-STACK.md §5`.
  - Built `LoaffyStage.tsx` (Loaffy in `loaf` pose outside an open cardboard box with visible 16px gap + 1200ms session-once intro choreography §6.1).
  - Built `src/components/sections/`: `Hero`, `ProofStrip`, `CaseCard` (non-nested links + Loaffy form peek on hover), `SelectedWork` (Luci featured first with `BetaBadge` + 6 client cases + filter chips), `ProcessStory` (static 5-step placeholder with `Loaffy` / `CatHand` one-character-at-a-time rule), `MotionReel`, `AboutChangelog`, `KindWords`, and `ContactPanel`.
  - Assembled `src/app/page.tsx` following the section color rhythm in `DESIGN.md §1.4` and 80ms scroll reveal stagger.
- **Next — Phase 6 (`phase-6-case-studies`):**
  - Build `/work` index (filter chips synced to `?tag=`, `aria-live` result count, `CaseCard` grid) and `/work/[slug]` template (`CaseHero`, `MetaRow`, `TLDR`, sticky `BeanStepper` tied to `<Chapter>` via `IntersectionObserver`, Luci beta variant, NextCase, SEO metadata/JSON-LD/OG image, `generateStaticParams`).
- **Open Questions:** None.
