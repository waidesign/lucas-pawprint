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
- Motion & Mascot: `motion` (`motion/react`) presets in `src/lib/motion.ts`; `@rive-app/react-canvas` + SVG fallback in `public/loaffy/`
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
- `src/components/mascot/` & `src/components/motion/`: `RiveMascot` and `FadeIn`
- `src/lib/`: `theme.ts` (3-theme provider + head script), `motion.ts` (spring presets), `case-studies.ts`
- `src/styles/tokens.css`: Generated Tailwind v4 tokens

## Phase Status (confirmed)
- **Done — Phase 1 (Foundations alignment) on `phase-1-foundations`:**
  - Replaced root `design.md` with `docs/pawprint-kit/02-design-system/DESIGN.md` (backed up `docs/legacy/design.v0.md`).
  - Extended `scripts/generate-tokens.mjs` with YAML frontmatter compilation, 4/8 grid + 40ms duration lint, and `npm run tokens:check` against golden `docs/pawprint-kit/02-design-system/tokens.css`.
  - Configured `src/app/globals.css`, `Bricolage_Grotesque` + `Inter` fonts, 3-theme system (`light` | `dark` | `warm-dark` | `system` → light/warm-dark) in `src/lib/theme.ts`, and motion presets in `src/lib/motion.ts`.
  - Synced `AGENTS.md §4` hard rules into `.luci/rules.md`.
  - Built dev-only `/lab` showcase (`src/app/lab/page.tsx`, `src/app/lab/LabClient.tsx`).
- **Next — Phase 2 (`phase-2-loaffy`):**
  - Build `<Loaffy>` SVG parts (`PenShape`, `ShadedShape`, `Pad`, `Bean`, `Eyes`, `Mouth`, `Cheeks`, `Highlight`, `GroundShadow`), `LoaffySVG.tsx`, SVG motion timelines, `Loaffy.tsx` facade with Rive upgrade, `useLoaffyMachine.ts`, `LoaffyBus.ts`, `CatHand.tsx`, `PawCursorProvider.tsx`, and the `/lab` Loaffy gallery.
- **Open Questions:** None.
