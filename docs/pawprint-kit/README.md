# Pawprint Kit · lucas.pawprint.design (v2)

Everything Lucas and his coding agents need to design, build, animate and launch the new portfolio.

**Lucas (Wai Phyo Aung) · Product & Motion Designer · 10 years in design · founder of Luci · mascot: Loaffy**
Visual canvas (mascot, poses, hand, palette, heroes, moodboard, live animation kit): https://claude.ai/artifact/RPWddP3RqrRrfh72Zayjns

👉 **Start with `START-HERE.md`.**

## What's inside

| File | For | What it covers |
|---|---|---|
| `START-HERE.md` | **You** | Step-by-step: connect GitHub, add the kit, build phase by phase, Rive track, launch |
| `AGENTS.md` | Agent (repo root, alias `CLAUDE.md`, merged into `.luci/rules.md`) | Project facts, hard rules, read order, workflow, definition of done |
| `01-brand/BRAND.md` | Both | Audience, brand idea, personality, voice, copy bank, logo, colour rules, imagery, Luci inside the portfolio |
| `01-brand/LOAFFY.md` | Both | Mascot anatomy, construction rules, sizes, expressions, poses, shape-shift, cat hand, paw cursor |
| `01-brand/LOAFFY-ANIMATION.md` | You (Rive) + agent | **Animation kit:** motion principles, Rive rig, state machine, every timeline on the 40ms grid, hand, site choreography, integration, exports, QA |
| `01-brand/MOODBOARD.md` | You | References, what we take, links to canvas boards |
| `02-design-system/DESIGN.md` | Agent | **Drop-in `design.md`** for your generator: 3 themes, pastels, 4/8 type scale, space, shape, shadows, motion, a11y, computed contrast |
| `02-design-system/tokens.css` | Agent | **Golden output** your `generate-tokens.mjs` must produce (`@theme` + `@theme inline` + `--lp-*`) |
| `02-design-system/tokens.json` | Tools | Same tokens in W3C Design Tokens format (Figma, Luci) |
| `02-design-system/COMPONENTS.md` | Agent | Component anatomy, props, states, a11y, DoD |
| `03-ux/IA.md` | Both | Sitemap (Luci first), navigation, templates, SEO, MDX metadata model |
| `03-ux/USER-FLOWS.md` | Both | Personas, flows (Mermaid), the signature Process story, micro-interactions |
| `03-ux/CASE-LUCI.md` | Both | **Luci case study spec:** outline, copy, 12 visuals, teaser/launch modes, real proof data, agent prompt |
| `03-ux/CONTENT.md` | Both | Profile, copy deck, changelog, testimonials, all 7 case studies (Luci teaser + 6 clients), no unverified metrics |
| `04-build/TECH-STACK.md` | Agent | Stack as built + additions, folder structure, tokens pipeline, budgets, SEO |
| `04-build/PROMPTS.md` | **You** | 9 phases: what you do, the prompt to paste, what to check, when it's done + your Rive track |
| `04-build/LUCI-BUILD-STEPS.md` | **You** | Luci case study in 9 small agent sessions + your assets + launch-day switch |
| `04-build/PAGES-BUILD-STEPS.md` | **You** | Separate Work, Motion, About, Contact pages + trailer home + page transitions, in 7 sessions |
| `04-build/LAYOUT-STEPS.md` | **You** | Rule 18 layout kit and card-free refactor across `/work`, `/work/[slug]`, `/about`, `/motion`, `/contact`, `/colophon`, 404 (replaces Pages-Build Steps 3–6) |
| `04-build/DEPLOY-CLOUDFLARE.md` | Both | Static export on Cloudflare Workers, preview URLs, custom domain, Email Routing, old-site redirect |
| `06-references/` | Agent | The 8 real Luci exports used for the moodboard (proof data for the Luci case study) |
| `05-assets/loaffy/` | Agent | 27 SVGs: expressions, poses, forms, hand, cursors (outlines use `currentColor`) |

## Decisions locked

- **Identity:** Lucas (Wai Phyo Aung) · Product & Motion Designer · 10 years · `lucas@pawprint.design` · `lucas.pawprint.design` (Pawprint umbrella)
- **Lead work:** Luci (own product, private beta → teaser case study), then 6 client case studies
- **Mascot:** Loaffy (floating beans; flat by default, 3D when shape-shifting; calm and curious; no limbs; no overlapping shapes; pen strokes) + the cat hand + paw cursor; animated in Rive with an SVG fallback
- **Palette:** Loaffy Candy (Lilac, Mint, Butter, Sky, Blush, Pistachio on Cloud; Ink text); ginger only for Loaffy; no #000/#FFF
- **Grid:** everything on multiples of 4/8; durations on 40ms steps
- **Type:** Bricolage Grotesque + Inter · **Themes:** Light, Dark, Warm Dark, System
- **Hero:** *Think outside the box with Lucas & Loaffy.* · *Everyone designs with AI now. It all looks like slop. Except mine.*
- **Stack:** Next.js 16 + Tailwind v4 + design.md token pipeline + @next/mdx + Motion + GSAP + Rive + Luci governance; npm
- **Hosting:** Cloudflare (static export on Workers static assets), next to luci.pawprint.design
- **Audience:** remote roles in US, Canada, NZ, Singapore · **No unverified numbers anywhere**

## Still open (small)

- Confirm the *(confirm)* items in `03-ux/CONTENT.md` (Sarayah year, Luci start date) and edit the drafted bio if you like.
- Choose which Luci screenshots (if any) are public during the beta.
- Record a fresh 60–90s showreel for `/motion` (later, with Claude + Claude Code).
