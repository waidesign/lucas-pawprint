# Tech Stack, Structure & Budgets

## 1. Stack (as built + what we add)

| Layer | Choice | Status |
|---|---|---|
| Framework | **Next.js 16** App Router, React 19, TypeScript strict, `src/` dir, **npm** | ✅ in place |
| Tokens | **`design.md` → `scripts/generate-tokens.mjs` → `src/styles/tokens.css`** (`npm run tokens`, on predev/prebuild) | ✅ in place → extend for 3 themes + 4/8 scale (Phase 1) |
| Styling | **Tailwind CSS v4** (`@theme` + `@theme inline`, default palette removed) | ✅ in place |
| Content | **`@next/mdx`**, `src/content/case-studies/*.mdx`, metadata via `export const metadata` validated with **zod** | ✅ pipeline · add schema (Phase 4) |
| UI motion | **Motion** (`motion/react`), presets in `src/lib/motion.ts` | ✅ FadeIn · add presets |
| Scroll story | **GSAP + ScrollTrigger** (dynamic import, home only) | Phase 7 |
| Mascot | **Rive** (`@rive-app/react-canvas`) with **SVG fallback** first paint | ✅ RiveMascot · facade in Phase 2 |
| Fonts | `next/font/google`: Bricolage Grotesque, Inter (JetBrains Mono on /colophon only) | Phase 1 |
| Icons | `lucide-react` | Phase 3 |
| Theming | Custom provider + inline head script (`data-theme`) | Phase 1 |
| Images | Pre-optimised AVIF/WebP at build (sharp script); `images.unoptimized` (static export) | Phase 4/9 |
| Hosting | **Cloudflare Workers static assets** (static export `out/`), Workers Builds for preview URLs, custom domain `lucas.pawprint.design` | Phase 9 — see DEPLOY-CLOUDFLARE.md |
| Analytics | **Cloudflare Web Analytics** (cookieless) | Phase 9 |
| Governance | **Luci** (`.luci/rules.md`, `.luci/context.md`) + `AGENTS.md` | ✅ in place |
| Quality | ESLint, Prettier, TypeScript, Playwright + `@axe-core/playwright`, Lighthouse CI | Phase 9 |

**Do not add** without asking: UI kits (shadcn, MUI, Chakra), CSS-in-JS, smooth-scroll hijacking (Lenis), Three.js, cookie-based analytics, server-only features (API routes, middleware, runtime image optimisation).

## 2. Folder structure (target)

```
lucas.pawprint.design/
├── AGENTS.md  (+ CLAUDE.md alias)
├── design.md                          ← live copy of docs/pawprint-kit/02-design-system/DESIGN.md
├── docs/pawprint-kit/                 ← this kit (read-only for agents)
├── .luci/ rules.md · context.md · local/
├── scripts/generate-tokens.mjs        ← design.md → src/styles/tokens.css
├── scripts/optimize-images.mjs        ← AVIF/WebP at build (Phase 4)
├── wrangler.jsonc                     ← Phase 9
├── public/
│   ├── rive/ loaffy.riv · hand.riv
│   ├── loaffy/  (SVG fallbacks from the kit)   cursors/ (3 SVGs)
│   ├── resume.pdf · favicon.svg · og/ · _headers
└── src/
    ├── app/
    │   ├── layout.tsx · globals.css · page.tsx (Home)
    │   ├── work/page.tsx · work/[slug]/page.tsx
    │   ├── motion/ · about/ · contact/ · colophon/ (page.tsx each)
    │   ├── lab/page.tsx (dev only) · not-found.tsx
    │   └── sitemap.ts · robots.ts · opengraph-image.tsx
    ├── components/
    │   ├── ui/        Button, IconButton, TextLink, Heading, Eyebrow, Chip, Sticker, Card, Section, HoverNote, Toast, CopyEmail, ThemeSwitch, CursorToggle, BeanStepper, BeanLoader, DeviceFrame, VideoReel
    │   ├── mascot/    Loaffy.tsx (facade), LoaffySVG.tsx, RiveMascot.tsx, useLoaffyMachine.ts, LoaffyBus.ts, reactions.ts, parts/, CatHand.tsx, LoaffyStage.tsx, PawCursorProvider.tsx
    │   ├── motion/    FadeIn.tsx (+ Reveal, Stagger)
    │   ├── site/      SiteNav, MobileMenu, SiteFooter, SkipLink
    │   ├── sections/  Hero, ProofStrip, SelectedWork, ProcessStory, MotionReel, AboutChangelog, KindWords, ContactPanel
    │   └── case/      CaseHero, MetaRow, TLDR, Chapter, DecisionCard, Callout, ImageGallery, Clip, NextCase, BetaBadge
    ├── content/
    │   ├── site.ts                    profile, experience, testimonials, education
    │   └── case-studies/<slug>.mdx    + <slug>/ images
    ├── lib/  case-studies.ts · schema.ts (zod) · motion.ts · theme.ts · seo.ts · cn.ts · analytics.ts
    ├── mdx-components.tsx
    └── styles/tokens.css              ← generated, never hand-edited
```

## 3. Tokens pipeline (what Phase 1 must achieve)

1. Replace root `design.md` with the kit's `02-design-system/DESIGN.md` (back up the old one to `docs/legacy/design.v0.md`).
2. Extend `scripts/generate-tokens.mjs` to read the new frontmatter: `colors` (light), `themes.dark`, `themes.warm-dark`, `pastels`, `character`, `typography` (fluid clamp strings), `rounded`, `spacing`, `sizes`, `borders`, `shadows`, `motion`, `breakpoints`, `z`.
3. Output must match the golden `docs/pawprint-kit/02-design-system/tokens.css` (ignoring whitespace/comments). Add `npm run tokens:check` that diffs them and fails CI on mismatch.
4. Add a **grid lint** to the generator: fail if any size/space/radius/shadow/duration is not a multiple of 4 (strokes 1px/2px allowed).

`src/app/globals.css`:
```css
@import "tailwindcss";
@import "../styles/tokens.css";
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *, [data-theme="warm-dark"], [data-theme="warm-dark"] *));
@layer base {
  html { background: var(--lp-bg); color: var(--lp-text); font-family: var(--font-body); }
  :focus-visible { outline: var(--focus-width) solid var(--lp-focus); outline-offset: var(--focus-offset); }
  ::selection { background: var(--color-lilac); color: var(--color-on-pastel); }
}
```
Utilities to verify in `/lab`: `bg-bg`, `bg-surface`, `bg-lilac`, `bg-lilac-soft`, `text-text-muted`, `text-on-pastel`, `text-h2`, `font-display`, `rounded-xl`, `rounded-pill`, `shadow-sticker`, `ease-spring-calm`. `bg-black`/`text-white` must not exist.

## 4. Budgets (fail the PR if broken)

| Metric | Budget |
|---|---|
| Lighthouse Performance (mobile) | ≥ 95 |
| Lighthouse Accessibility / SEO / Best Practices | 100 / 100 / 100 |
| LCP (4G mobile) | < 2.0s (Loaffy SVG paints first; Rive loads after) |
| CLS | < 0.04 |
| INP | < 160ms |
| First-load JS (home) | < 176 KB gzip (Rive + GSAP lazy) |
| `loaffy.riv` | ≤ 150 KB |
| Images above the fold | AVIF/WebP ≤ 200 KB each |
| Fonts | 2 families preloaded, `swap`, latin subset |

## 5. SEO and launch

- Canonical, OG, Twitter → `https://lucas.pawprint.design` (the old site pointed at the Framer domain; never again).
- OG image per page with Loaffy (build-time PNGs if export mode needs it).
- JSON-LD `Person` (name "Wai Phyo Aung", alternateName "Lucas", jobTitle "Product & Motion Designer", email `lucas@pawprint.design`, sameAs socials, `founder` of Luci) + `CreativeWork` per case study + `SoftwareApplication` for Luci.
- `sitemap.xml`, `robots.txt`; `/lab` is `noindex` and 404s in production.
- `resume.pdf` in `public/` (≤ 1 MB).
- Analytics events (Cloudflare Web Analytics custom events or simple beacons): `resume_download`, `email_copy`, `book_chat_click`, `case_open`, `luci_click`, `theme_change`, `cursor_toggle`.
- Deploy, domain, email and old-domain redirect: `DEPLOY-CLOUDFLARE.md`.
