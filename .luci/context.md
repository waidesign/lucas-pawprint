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
- Content & Validation: `@next/mdx` case studies in `src/content/case-studies/*.mdx`, validated at build time with `zod` (`src/lib/schema.ts`, `src/lib/case-studies.ts`); site profile/experience/testimonials in `src/content/site.ts`; Luci proof data in `src/content/case-studies/luci/proof.ts`
- Images: `scripts/optimize-images.mjs` (`sharp` → AVIF + WebP + build-time OG PNGs on `prebuild`)
- Motion & Mascot: `motion` (`motion/react`) presets in `src/lib/motion.ts`; `<Loaffy>` SVG-first facade + `@rive-app/react-canvas` upgrade, `<LoaffyStage>`, `<CatHand>`, and `<PawCursorProvider>`
- Analytics: Cookieless event dispatcher in `src/lib/analytics.ts` (`resume_download`, `email_copy`, `book_chat_click`, `case_open`, `luci_click`, `theme_change`, `cursor_toggle`)
- Hosting target: Cloudflare Workers static assets (static export)

## Commands (confirmed)
- Tokens generate: `npm run tokens` (auto-runs on `predev` and `prebuild`)
- Tokens golden & 4/8 grid check: `npm run tokens:check`
- Images optimize (AVIF + WebP + OG): `npm run images` (auto-runs on `prebuild`)
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run typecheck`

## Folder Map (confirmed)
- `docs/pawprint-kit/`: Brand, design system, UX (`CASE-LUCI.md`), build playbook (`LUCI-BUILD-STEPS.md`), 8 real Luci reference exports (`06-references/`), and reference Loaffy SVGs (read-only for agents)
- `docs/legacy/`: Backed-up `design.v0.md` and legacy migration source files
- `public/case-studies/<slug>/`, `public/images/`, & `public/og/`: Optimized `.webp` and `.avif` covers, case screenshots, Lucas's portrait, and build-time OG share images
- `public/loaffy/` & `public/cursors/`: Loaffy SVG expressions, forms, poses, hand, and paw cursors
- `public/rive/`: Rive `.riv` animation files
- `public/resume.pdf`: Lucas's resume (≤ 1 MB)
- `scripts/generate-tokens.mjs` & `scripts/optimize-images.mjs`: Token and image build scripts
- `src/app/`: App Router routes (`/`, `/work`, `/work/[slug]`, `/lab` dev-only)
- `src/components/sections/`: Home sections (`Hero`, `ProofStrip`, `SelectedWork`, `CaseCard`, `ProcessStory`, `MotionReel`, `AboutChangelog`, `KindWords`, `ContactPanel`)
- `src/components/ui/`: Core design system primitives
- `src/components/site/`: Site chrome (`Wordmark`, `SkipLink`, `SiteNav`, `MobileMenu`, `SiteFooter`)
- `src/components/case/`: Generic case study shell & MDX components (`CaseLayout`, `CaseStudyContext`, `CaseStepper`, `MetaRow`, `TLDR`, `NextCase`, `LaunchOnly`, `BetaBadge`, `Chapter`, `DecisionCard`, `Callout`, `ImageGallery`, `Clip`) + `src/components/case/luci/` (`LuciHero`, `ProblemDiagram`, `AudienceCards`, `PrincipleCards`, `ToolbarAnatomy`, `HowSteps`, `AnnotatedExport`, `A11yFindings`, `ArchitectureDiagram`, `FeedbackBeforeAfter`, `BrandBoard`, `BuildTimeline`, `CaptureFlow`, `Outcome`, `Learnings`, `CaseCTA`, `luci.css`)
- `src/components/mascot/` & `src/components/motion/`: `Loaffy`, `LoaffyStage`, `LoaffySVG`, `RiveMascot`, `CatHand`, `PawCursorProvider`, `FadeIn`
- `src/content/`: `site.ts`, `case-studies/*.mdx` (7 case studies, `luci` first), and `case-studies/luci/proof.ts`
- `src/lib/`: `analytics.ts`, `schema.ts`, `case-studies.ts`, `cn.ts`, `theme.ts`, `motion.ts`
- `src/styles/tokens.css`: Generated Tailwind v4 tokens

## Phase Status (confirmed)
- **Done — Phase 1 (Foundations alignment) on `phase-1-foundations` (`704f995`)**
- **Done — Phase 2 (Loaffy SVG first, Rive-ready, hand and cursor) on `phase-2-loaffy` (`65c61f8`)**
- **Done — Phase 3 (Core components & site chrome) on `phase-3-components` (`b1b2aca`)**
- **Done — Phase 4 (Content — Luci first + migration) on `phase-4-content` (`133e2bc`)**
- **Done — Phase 5 (Home page) on `phase-5-home` (`f345f9d`)**
- **Done — Luci Case Study & Case Shell (`feat-luci-case-study`, Steps 2–9):**
  - Built two-mode architecture (`visibility: "teaser" | "full"`) with server-time `<LaunchOnly>` filtering so teaser HTML ships zero launch-only markup.
  - Built generic `/work/[slug]` shell (`CaseLayout`, sticky `CaseStepper` with `IntersectionObserver`, `MetaRow`, `TLDR`, `NextCase`, `Chapter`) and `/work` index with URL-synced filter chips.
  - Built all 12 Luci case study sections (`LuciHero` V1 illustration + load choreography, `TLDR`, `ProblemDiagram` V2, `AudienceCards`, `PrincipleCards` V3, `ToolbarAnatomy` V4, `HowSteps` V5a–e, `AnnotatedExport` V6, `A11yFindings` V7, `ArchitectureDiagram` V8, `FeedbackBeforeAfter` V9, `BrandBoard` V10, `BuildTimeline` V11, `CaptureFlow` V12, `Outcome`, `Learnings`, `CaseCTA`) backed by `src/content/case-studies/luci/proof.ts`.
  - Enforced full-width layout without container `max-width` and `80px` desktop horizontal padding (`px-4 md:px-10 lg:px-20`).
  - Added JSON-LD (`CreativeWork` + `SoftwareApplication`) and mode-aware build-time OG share images (`public/og/luci-{teaser,full}.png`).
- **Next — Remaining Phase 6 client case study polish or Phase 7 (`phase-7-process-and-pages`: GSAP ProcessStory + `/motion`, `/about`, `/contact`, `/colophon`, `404`).**
- **Open Questions:** None.
