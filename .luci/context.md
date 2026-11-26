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
- Visual & a11y QA (Playwright + axe): `npm run qa` (`scripts/qa.mjs`)

## Folder Map (confirmed)
- `docs/pawprint-kit/`: Brand, design system, UX (`CASE-LUCI.md`), build playbook (`LUCI-BUILD-STEPS.md`), 8 real Luci reference exports (`06-references/`), and reference Loaffy SVGs (read-only for agents)
- `docs/legacy/`: Backed-up `design.v0.md` and legacy migration source files
- `public/case-studies/<slug>/`, `public/images/`, & `public/og/`: Optimized `.webp` and `.avif` covers, case screenshots, Lucas's portrait, and build-time OG share images
- `public/loaffy/` & `public/cursors/`: Loaffy SVG expressions, paw styles (`forms/paw-3d.svg`, `forms/lost.svg`), poses, hand, and paw cursors
- `public/rive/`: Rive `.riv` animation files
- `public/resume.pdf`: Lucas's resume (≤ 1 MB)
- `scripts/generate-tokens.mjs`, `scripts/optimize-images.mjs`, & `scripts/qa.mjs`: Token, image, and Playwright + axe QA scripts
- Deploy: `wrangler.jsonc` (Worker `lucas-pawprint`, assets from `out/`), `public/_headers`, `scripts/postbuild-export.mjs`; `npm run cf:preview` / `cf:deploy`
- `src/app/`: App Router routes (`/`, `/work`, `/work/[slug]`, `/about`, `/contact`, `/colophon`, `/lab` dev-only, `not-found.tsx`); `_motion/` = parked `/motion` page (private folder, not routed)
- `src/components/sections/`: Home & shared sections (`Hero`, `ProofStrip`, `SelectedWork`, `CaseCard`, `ProcessStory`, `MotionCraft`, `AboutChangelog`, `KindWords`, `ContactPanel`)
- `src/components/ui/`: Core design system primitives (including card-free layout kit: `RuledList`, `IndexColumns`, `PullQuote`)
- `src/components/work/`, `src/components/motion/`, `src/components/contact/`, `src/components/colophon/`: Page-specific interactive sections (`WorkIndex`, `MotionCatalog` (parked), `MotionPrincipleDemos`, `TimezoneOverlap`, `BookChatButton`, `DesignSystemFoundations`)
- `src/components/site/`: Site chrome (`Wordmark`, `SkipLink`, `SiteNav`, `HeaderMenu`, `SiteFooter`)
- `src/components/case/`: Generic case study shell & MDX components (`CaseLayout`, `CaseHero`, `CaseStudyContext`, `CaseStepper`, `MetaRow`, `TLDR`, `Chapter`, `FeatureRow`, `DecisionList`, `DecisionCard`, `DecisionHandPeek`, `Showcase`, `BrowserFrame`, `LoopVideo`, `PainList`, `InsightList`, `Callout`, `Outcome`, `Learnings`, `CaseCTA`, `NextCase`, `ImageGallery`, `Clip`) + `src/components/case/luci/` (`LuciProblems`, `LuciWorkflow`, `PrincipleCards`, `AnnotatedExport`, `A11yFindings`, `BrandBoard`, `CaptureFlow`, `luci.css`)
- `src/components/mascot/` & `src/components/motion/`: `Loaffy`, `LoaffyStage`, `LoaffySVG`, `RiveMascot`, `CatHand`, `PawCursorProvider`, `FadeIn`
- `src/content/`: `site.ts` (including `profile.workingHours`), `motion.ts` (`MOTION_PRINCIPLES`, `HOW_I_ANIMATE`, `MOTION_IN_PRODUCT` for Home #motion; `MOTION_CLIPS`, `getVisibleMotionClips` for the parked page), `case-studies/*.mdx` (7 case studies, `luci` first), and `case-studies/luci/proof.ts`
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
- **Done — Phase 6 Client Case Shell, Focus Trap & Build-Time OG Images (in progress review, Classic Decoder inspected):**
  - Extracted generic `CaseHero.tsx`, added `ImageGallery` Tab/Shift+Tab focus trap + scroll lock + focus restore, fixed `DecisionCard` 4/8 grid pill & solid sticky bar in `CaseLayout.tsx`.
  - Updated `scripts/optimize-images.mjs` to generate build-time `1200×630` OG PNGs in `public/og/` for every published case with Loaffy in each case's `form` on its pastel, wired to `metadata` + `CreativeWork` JSON-LD in `src/app/work/[slug]/page.tsx`.
- **Done — Phase 7 (`ProcessStory` GSAP ScrollTrigger & Hero→Work Scroll Morph):**
  - Installed `gsap` (`AGENTS.md §4.9`) and added targeted `lookX`/`lookY` + `targetId` filtering to `LoaffyBus.ts`, `useLoaffyMachine.ts`, and `Loaffy.tsx`.
  - Rewrote `ProcessStory.tsx` to dynamically import `gsap` + `gsap/ScrollTrigger` on Home (`≥ lg`: ~300vh pin + scrub across all 5 scenes driving `Loaffy`/`CatHand` via `LoaffyBus`, wireframe `strokeDashoffset` in Shape, thinking paw in Design (was a squashed `window` before 2026-11-25), `vibing` in Motion, `jump` + `"Shipped"` stamp in Ship). Added polite `aria-live="polite"` copy status, `< lg` unpinned one-time viewport reveals, and `prefers-reduced-motion` static frames with **Previous / Next** controls.
  - Wired `Hero.tsx` → `#work` scroll morph (`LOAFFY-ANIMATION.md §6.2`) over 400px via dynamic `ScrollTrigger` (downward gaze + land; the `paw` → `window` morph was removed on 2026-11-25).
- **Done — Phase 8 (Remaining pages: `/motion`, `/about`, `/contact`, `/colophon`, `not-found.tsx`):**
  - Built `/motion`, `/about` (portrait + bio, full changelog + education, 5-step process + capabilities/tools, expanded `KindWords`, `Person` JSON-LD, Resume CTA), `/contact` (without availability/remote-region badge per AGENTS.md §4.15), `/colophon` (case-study layout wrapping shared `<DesignSystemFoundations />`, `<LoaffyLabSection />`, `<ComponentsLabSection />`, Accessibility statement, stack, Luci + Pawprint credits), and `not-found.tsx` (`Loaffy` `lost` form + `BRAND.md` copy + `NotFoundTracker`).
  - Extracted shared `src/components/colophon/DesignSystemFoundations.tsx` from `LabClient.tsx` and pointed `HeaderMenu.tsx` to `/work`, `/motion`, `/about`, `/contact`.
- **Done — Cat hand choreography (`feat-cathand-choreography`, fast-forwarded into local `main` at `34ea357`):**
  - `CatHand` gained `exit` (280ms), full-frame `enter`, claws flicking out at 120ms in `bat`, `playKey` (replay) and `onActionComplete`; timings in `handTiming` (`src/lib/motion.ts`).
  - New `stage.ts` (one-character check: visible Loaffys register; `<Loaffy onStage>`), `PeekingHand`, `HandSketch`, `case/DecisionHandPeek`.
  - Placements: Process Shape (scroll-scrubbed), About changelog board pats (xl), case-row CTA bat, first DecisionCard per page. Case-row Loaffy peek triggers on cover hover only. See `.luci/decisions/2026-11-24-cat-hand-placements.md`.
  - Kit docs to update when Lucas approves: COMPONENTS.md CatHand props (`action` incl. `exit`, `playKey`, `onActionComplete`), LOAFFY-ANIMATION.md §6.3 (peek on cover hover).
- **Done — Kit update for the pages split (2026-11-24):** copied `README.md`, `03-ux/IA.md`, `03-ux/CONTENT.md`, `04-build/PROMPTS.md`, `04-build/PAGES-BUILD-STEPS.md`, and `04-build/LAYOUT-STEPS.md`; adjusted for rule 15 (no availability copy), the full-page Header Menu, and /about not repeating Home's process. See `.luci/decisions/2026-11-24-pages-split-kit-update.md`.
- **Done — Layouts without card overuse (`feat-no-card-layouts`, Steps 1–8):**
  - **Step 1 (`b43090f`):** Added Rule 18 to `AGENTS.md`/`CLAUDE.md` and built card-free layout primitives (`RuledList`, `IndexColumns`, `PullQuote`, margin-note `Callout`, `/lab` section 09).
  - **Step 2 (`75b4537`):** Refactored case study shell (`MetaRow` spec row, `TLDR` `IndexColumns`, `Chapter` `--chapter-bg`, `DecisionCard` decision block with `DecisionHandPeek`).
  - **Step 3 (`3848ec0`):** Refactored all 10 Luci case components without cards, fixed mobile `CaseStepper` single-row layout and `AnnotatedExport` left-gutter digit markers, added Playwright + `@axe-core/playwright` (`41a3792`) and `scripts/qa.mjs` (`npm run qa`, hardened in `f455fa3`).
  - **Step 4 (`ffb6107`):** Rebuilt `/work` (`WorkIndex.tsx`) with cover-only client tiles (hover/focus-only shadow), 7/5 featured Luci row, hero window Loaffy, and `?tag=` URL sync with unknown-tag fallback.
  - **Step 5 (`19b184a`):** Rebuilt `/about` without cards (portrait frame, `My story`, `Changelog` + Education, `How I work` principles, `What I'm good at` + `Tools`, `KindWords variant="quotes"`, removed availability line and `HandSketch`).
  - **Step 6 (`fb0d0cb`):** Rebuilt `/motion` without cards (`src/content/motion.ts` with prod-hidden placeholders, `MotionCatalog` still/playable tiles + dialog player, `VideoReel` `loaffyButton` + `staticWhenEmpty`, play-form Loaffy in hero).
  - **Step 7 (`6a6af97`):** Rebuilt `/contact` without cards (`Three ways` `IndexColumns`, live `Intl.DateTimeFormat` `TimezoneOverlap` reading `profile.workingHours` with same-TZ view and zero-CLS no-JS fallback, `RuledList` first-message tips, hairline `<details>` Quick answers, `Elsewhere`).
  - **Step 8 (in review):** Replaced `/colophon` Ship text cards with `IndexColumns`, verified `404` (`not-found.tsx`), completed Rule 18 audit and full multi-theme/multi-width/keyboard/reduced-motion QA with Home (`/`) unchanged.
- **Done — Home-style Case Study Template & Real Media (`feat-case-template`, Phases 1–4):**
  - **Phase 1 (`aec08cf`):** Rebuilt `src/components/case/` onto a Home-matching template (`CaseHero` with inline breadcrumb & tilted cover stage, `"At a glance."` `TLDR` + `MetaRow`, wavy-seam alternating `Chapter` bands with ProcessStory numerals, floating `lg+` `CaseStepper` pill, `FeatureRow`, `DecisionList`, `Showcase`, `BrowserFrame`, `LoopVideo`, `PainList`, `InsightList`, generic `Outcome`, `Learnings`, `CaseCTA`), replaced `BetaBadge` with generic `Badge`, fixed `CaseCard` row title word-spacing bug, updated `/lab` and `_template.mdx`.
  - **Phase 2 (`63cbe5c`, `d0a1308`):** Rebuilt `/work/luci` as the open-source reference case using verified facts from `luci-by-pawprint.design`, `luci-site-by-pawprint-design`, and `luci.pawprint.design`, with 4 problem scene frames, 3 live `LoopVideo` demos (Devtool, Core, Extension), 7 source-verified decisions, real Luci logo + 6 animated mascot SVGs in `BrandBoard` (zero Loaffy in Hero/BrandBoard per Rule 11), new Devtool cover (`scripts/build-covers.mjs`), and removed all private-beta references (`LaunchOnly`, `BuildTimeline`, teaser OG).
  - **Phase 3 (`277a81c`..`b3fb38d`):** Captured real desktop/mobile screenshots and WebM interaction loops across all 6 client cases (`classic-decoder`, `classic-decoder-app`, `vehicle-databases` covering both Part A public website redesign + Part B member dashboard pricing/checkout, `detailed-vehicle-history`, `fierce-fight-gear`, `sarayah-phuket-villas`), rebuilt 5 covers via `scripts/build-covers.mjs` (keeping `classic-decoder-app`), merged old portfolio detail minus every unverified metric in `BRAND.md` voice, and committed one case per commit.
  - **Phase 4:** Verified lint, typecheck, static export build, Playwright + axe QA across all 7 case studies (Light/Dark/Warm Dark, 375–1920px, reduced motion, keyboard), synced approved kit docs (`docs/pawprint-kit/`), and logged `.luci/decisions/2026-11-25-case-template.md`.
- **Done — Motion page parked, Home #motion redesigned (2026-11-25):** `/motion` hidden site-wide (route moved to `src/app/_motion/`, removed from nav, header menu, footer, About and `qa.mjs`). Home `MotionReel` (reel + 2 cards) replaced by `MotionCraft`: six live principle demos on real tokens (`MotionPrincipleDemos`), "How I make it" + "Where it works", one primary Behance link. See `.luci/decisions/2026-11-25-hide-motion-page.md`.
- **Done — Loaffy is paw-only (2026-11-25):** removed the object forms (`window`, `phone`, `cube`, `play`, `bubble`) from code, content, OG images, `/lab` and `public/loaffy/forms/`; case `form` frontmatter field dropped. Kept `paw`, `paw-3d`, `lost`. See `.luci/decisions/2026-11-25-loaffy-paw-only.md` (kit docs listed there still describe the old forms).
- **Done — Phase 9 code side (2026-11-25):** static export for Cloudflare Workers static assets (`wrangler.jsonc`, `public/_headers`, `scripts/postbuild-export.mjs`, sitemap/robots, site OG image, QA on `wrangler dev`). See `.luci/decisions/2026-11-25-cloudflare-static-export.md`. Remaining Phase 9 steps are Lucas's in the Cloudflare dashboard (connect repo, custom domain, Web Analytics, Email Routing, old-site redirect).
- **Live — 2026-11-25:** `https://lucas.pawprint.design` (Worker `lucas-pawprint`, Workers Builds from GitHub `main`, preview builds on, `NODE_VERSION=24`; also `lucas-pawprint.waiphyoaung-design.workers.dev`). Verified live: all routes, 404s, headers, OG, sitemap/robots, http→https 301 (zone "Always Use HTTPS"). Email: Porkbun forwarding via Cloudflare DNS MX (NOT Cloudflare Email Routing; `lucas@` forward exists in Porkbun); SPF `include:_spf.porkbun.com include:_spf.google.com`; DMARC `p=none` added. Still open (Lucas): Web Analytics, phone/LinkedIn/PageSpeed check, Search Console sitemap, old Vercel site redirect + profile links.
- **Done — Numerals, feedback round, transitions (2026-11-25, `fix-meaningful-numerals` → `main`):**
  - Rule 19 added ("Numerals only for steps"); numbers removed from parallel lists across case studies, About, Contact and the Home FAQ. See `.luci/decisions/2026-11-25-meaningful-numerals.md`.
  - TL;DR parts are `h3` headings, not badges. Chips never wrap; A11y findings stack on mobile. The NextCase shadow matches the CaseCTA card's 8px offset. The location line was removed from BuiltWith and the menu. The Process panels are scoped to `data-theme="light"`, so the hand scenes stay visible in Dark and Warm Dark.
  - No mid-word breaks: the MetaRow URL breaks only at `.`/`/`, and the Process step names no longer hyphenate.
  - Page transitions reuse the menu wipe, same-page `#hash` links glide, and the reduced-motion hydration mismatch (#418) is fixed site-wide. See `.luci/decisions/2026-11-25-page-transitions-and-scroll.md`.
- **Done — Feedback round 4 (2026-11-26, `fix-feedback-round-4`):** Home: name/title tagline removed; body copy in `text-muted`; tighter CaseCard text spacing; new Anticipation demo (chat message sends) and Reduced-motion demo (this site's page wipe → 120ms fade); expanded testimonials sit straight; hero sticker left-aligned on mobile; "Book a chat" → "Off the grid" (→ `/colophon`). /work: eyebrows and the Luci "Open source" pill removed (also from the `/work/luci` hero; MetaRow keeps "Status: Open source"). /contact: hero eyebrow and working-hours line removed. /work/luci: "YAML · measured" pill never wraps.
- **Done — Colophon redesign (2026-11-26, `feat-colophon-redesign`, on top of round 4):** Colophon in the header menu; `/colophon` rebuilt in the Home/About style with live specimens. See `.luci/decisions/2026-11-26-colophon-redesign.md`.
- **Next:** Lucas reviews and merges `fix-feedback-round-4` and `feat-colophon-redesign`; approve the kit-doc updates listed in the colophon decision; fill the remaining content items when ready (`/about` working principle lines & education line; `/contact` reply-time answer).
- **Open Questions:** Content still needed from Lucas: (1) one line per working principle & civil-engineering education line for `/about`; (2) reply-time answer for `/contact` Quick answers; (3) showreel + motion clips, posters & captions in `public/motion/` + `src/content/motion.ts`. Pre-existing findings (deferred while Home guard is active): (1) Home (`/`) transient `color-contrast` hit during scroll/intro opacity fade-in (`0` violations once animations settle at `375px` & `1440px` in Light and Warm Dark), (2) ~~Home `aria-prohibited-attr` on the intro box~~ (fixed: `role="img"`), and (3) ~~React hydration warning `#418` under reduced motion~~ (fixed 2026-11-25 with `src/lib/useReducedMotion.ts`). Open: header menu links use Tailwind default sizes (`text-4xl md:text-6xl lg:text-7xl`) instead of tokens.
