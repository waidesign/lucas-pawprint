# Build Playbook · Step-by-step prompts for Lucas + coding agent

> Each phase: **You do** (human steps) → **Prompt** (paste into your agent: Claude Code, Cursor, Antigravity) → **Check** → **Done when**.
> One phase = one branch = one PR. Start every agent session with the **Session kickoff** (§0.2).
> Your project already has the foundation (Next.js 16, tokens pipeline, MDX, Motion, Rive, Luci), so Phase 1 is an **alignment** phase, not a scaffold.
> Lucas's own track (Rive animation) runs in parallel: see §R.

---

## 0. Before you start

### 0.1 You do — once (full detail in `../START-HERE.md`)
1. Connect the local project to GitHub (`waidesign/lucas-pawprint`) and push `main`.
2. Copy this kit to `docs/pawprint-kit/`. Copy `AGENTS.md` to the repo root and alias it as `CLAUDE.md`.
3. Copy `05-assets/loaffy/` → `public/loaffy/` and `05-assets/loaffy/cursors/` → `public/cursors/`.
4. Put your latest `resume.pdf` (≤ 1 MB) in `public/`.

### 0.2 Session kickoff (paste at the start of EVERY agent session)
```
You are building lucas.pawprint.design, the portfolio of Lucas (Wai Phyo Aung), Product & Motion Designer.
Read AGENTS.md at the repo root, then .luci/context.md, then the docs/pawprint-kit files AGENTS.md §3 lists for this task.
Follow AGENTS.md §4 hard rules exactly: no #000/#FFF, tokens only, the 4/8 grid, ginger only for Loaffy, no overlapping character shapes, never invent content, Luci beta privacy, static-export safe.
Today's task: <PHASE from docs/pawprint-kit/04-build/PROMPTS.md>.
First reply with (1) a short plan, (2) files you will create or change, (3) anything unclear. Wait for my "go".
At the end, update .luci/context.md.
```

### 0.3 Reusable prompts (optional — only when you need them)
These are **not** part of the start-up routine. Don't paste them after the kickoff. Use one in the middle of a phase when the situation matches:

| Use it when… | Prompt |
|---|---|
| The agent says a screen is done and you want a check before approving | Review |
| You've read the review table and want the issues fixed | Fix |
| It works, but you want the final detail pass before merging | Polish |
| The agent is going in circles or guessing | Stuck |
| You (or the agent) changed AGENTS.md rules | Sync rules |

Typical loop inside a phase: **Kickoff → Phase prompt → agent builds → Review → Fix → Polish → merge.**

**Review** — `Review <route> against design.md and COMPONENTS.md. Table: element · expected · actual · fix. Include any value off the 4/8 grid. Don't change code yet.`
**Fix** — `Apply fixes 1–N. Keep each minimal. Re-run lint, typecheck, build and axe; show results.`
**Polish (detail-obsessed pass)** — `Pixel-polish <route>: optical alignment, 4/8 spacing, balanced headline wraps, every hover/focus/active state, reduced motion, dark + warm-dark contrast. Report changes.`
**Stuck** — `Stop. Summarise what you tried and what failed, give the 2 best options with trade-offs, and ask me.`
**Sync rules** — `Merge AGENTS.md §4 hard rules into .luci/rules.md without duplicating anything already there. Show me the diff.`

---

## Phase 1 · Foundations alignment
**Goal:** the existing foundation matches the kit: new design.md, 3 themes, 4/8 tokens, fonts, theme switching, `/lab`.

**You do:** branch `phase-1-foundations`.

**Prompt**
```
Phase 1 — Foundations alignment. Read AGENTS.md, docs/pawprint-kit/02-design-system/DESIGN.md (all), the golden docs/pawprint-kit/02-design-system/tokens.css, and TECH-STACK.md §3.
1. Back up the current root design.md to docs/legacy/design.v0.md, then replace root design.md with docs/pawprint-kit/02-design-system/DESIGN.md.
2. Extend scripts/generate-tokens.mjs to read the new frontmatter (colors + themes.dark + themes.warm-dark, pastels, character, typography clamps, rounded, spacing, sizes, borders, shadows, motion, breakpoints, z) and emit src/styles/tokens.css that matches the golden file (ignore whitespace/comments).
   Add `npm run tokens:check` (diff vs golden) and a grid lint that fails on any value not a multiple of 4 (strokes 1px/2px allowed).
3. src/app/globals.css exactly as TECH-STACK.md §3.
4. Fonts with next/font/google: Bricolage Grotesque (variable, opsz + wght 600–800) and Inter (400/500/600) → --font-display / --font-body.
5. Theming per DESIGN.md §6: src/lib/theme.ts, inline <head> script (light | dark | warm-dark; "system" → light or warm-dark), ThemeProvider + useTheme(). No next-themes.
6. src/lib/motion.ts presets from DESIGN.md §5 (springCalm, springBouncy, reveal, stagger). Update FadeIn to use them and respect reduced motion.
7. Merge AGENTS.md §4 into .luci/rules.md (no duplicates).
8. src/app/lab/page.tsx (dev only; notFound() in production): every colour token in all 3 themes, type scale at 375 and 1440 widths, spacing scale, radius, shadows, durations demo.
Show me /lab.
```
**Check:** `/lab` matches DESIGN.md hex values in all 3 themes · no theme flash on reload · `tokens:check` passes · `bg-black` doesn't exist.
**Done when:** build passes, axe clean on `/lab`, `.luci/context.md` updated.

---

## Phase 2 · Loaffy (SVG first, Rive-ready), hand and cursor
**Goal:** the `<Loaffy>` facade renders the SVG version now and switches to Rive when `loaffy.riv` exists.

**Prompt**
```
Phase 2 — Loaffy. Read LOAFFY.md (all), LOAFFY-ANIMATION.md §2, §3.3, §7, and COMPONENTS.md §B. The SVGs in public/loaffy/ are the visual truth.
1. src/components/mascot/parts/: PenShape (under-copy + main stroke, currentColor), ShadedShape (3D inside one outline via clipPath, useId), Pad, Bean, Eyes, Mouth, Cheeks, Highlight, GroundShadow — exact geometry from LOAFFY.md §1.
2. LoaffySVG.tsx: every expression, pose and form (LOAFFY.md §4–6); pen wobble filter (off < 48px); outline colour var(--lp-outline).
3. SVG motion with motion/react following LOAFFY-ANIMATION.md §4 timelines for idle_breathe, blink, hop, land, morph (pivots from §3.2, halved), on the 40ms grid.
4. Loaffy.tsx facade: props { mood, pose, form, size, track, label, decorative, onClick }. Server-renders LoaffySVG; on the client, when in view + idle and not reduced motion, lazy-loads RiveMascot with /rive/loaffy.riv if present, cross-fades 120ms. Missing .riv = stay on SVG (no error).
5. Extend RiveMascot.tsx to the input contract in LOAFFY-ANIMATION.md §7.2 (state machine "Loaffy SM"); pause off-screen and on hidden tab; DPR ≤ 2.
6. useLoaffyMachine.ts (random blink 4–7s, idle 30s → sleepy, look tracking ≤ 3 units SVG / mapped to lookX/Y for Rive), LoaffyBus.ts + reactions.ts (LOAFFY-ANIMATION.md §6.5).
7. CatHand.tsx (fur/beans, claws, from-edge) and PawCursorProvider (LOAFFY.md §8; off on coarse pointer + reduced motion; localStorage).
8. Dev assertion: no bean ever closer than 4 units to the pad in any SVG animation frame.
9. /lab Loaffy gallery: every mood/pose/form/hand, all 3 themes, sizes 32/64/128/320, reference SVG beside each, and buttons that fire each reaction.
```
**Check:** compare each React version with its reference SVG and the canvas Animation kit board · no shapes touch · outlines turn light in dark themes · cursor clicks where the middle claw points.
**Done when:** gallery complete, axe clean, reduced motion verified, LCP unaffected.

---

## Phase 3 · Core components
**Prompt**
```
Phase 3 — Core components. Read COMPONENTS.md §A, §C, §F and BRAND.md §4.
Build with all variants/states and a /lab section each: Button, IconButton, TextLink, Heading (single highlight), Eyebrow, Chip (+ filter chip), Sticker, Card, Section, HoverNote, Toast (+ useToast), CopyEmail (lucas@pawprint.design), ThemeSwitch (segmented + compact), CursorToggle, BeanStepper, BeanLoader, DeviceFrame, VideoReel, BetaBadge.
Then SiteNav (pill nav, hide-on-scroll, compact ThemeSwitch, Resume → /resume.pdf), MobileMenu (full-screen sheet, focus trap, Esc), SiteFooter (BRAND.md copy).
Motion: sticker shadows only; press = translate(var(--press-shift)) + scale(var(--press-scale)); hover = translate(var(--lift-shift)) + next shadow size; durations/easings from tokens only; everything on the 4/8 grid.
After each component run lint, typecheck and axe on /lab.
```
**Check:** keyboard-only pass through `/lab` · every state visible · Toast announced by VoiceOver/NVDA.
**Done when:** COMPONENTS.md §F passes for every component.

---

## Phase 4 · Content (Luci first) + migration
**You do:** copy `src/data/*.ts`, `src/components/TestimonialsSection.tsx` and `src/assets/images/*` from the old repo into `docs/legacy/`. Add Luci screenshots you're happy to make public into `src/content/case-studies/luci/` (or none for now).

**Prompt**
```
Phase 4 — Content. Read IA.md §5, CONTENT.md (all), BRAND.md §4 and §9.
1. src/lib/schema.ts: zod schema for case-study metadata exactly as IA.md §5. Validate in getAllCaseStudies(); fail the build on invalid metadata.
2. src/content/site.ts from CONTENT.md (profile with lucas@pawprint.design, experience, testimonials, education).
3. Create src/content/case-studies/luci.mdx FIRST from CASE-LUCI.md §8 metadata (visibility: "teaser"); body sections come in Phase 6 with the CASE-LUCI.md §9 prompt.
4. Migrate the 6 client case studies from docs/legacy/projects.ts into MDX: keep facts; REMOVE every percentage, sales lift, baseline or invented metric; short plain sentences, first person; <Chapter step="understand|shape|design|ship">, <DecisionCard>, <Callout>; leave [placeholders] for unknowns.
5. scripts/optimize-images.mjs (sharp → AVIF + WebP) on prebuild; alt text per BRAND.md §9.
Output a table: slug · visibility · placeholders left · claims removed.
```
**Check:** read every MDX; fill placeholders; confirm nothing invented; confirm Luci shows only what you're comfortable sharing.
**Done when:** build validates all content.

---

## Phase 5 · Home page
**Prompt**
```
Phase 5 — Home. Read IA.md §3 (Home), USER-FLOWS.md §2 and §10, CONTENT.md (Home), COMPONENTS.md §D, LOAFFY-ANIMATION.md §6.1–6.3 and §6.5.
Build src/components/sections/: Hero (LoaffyStage: Loaffy in the loaf pose sitting OUTSIDE an open box with a visible gap; "Think outside the box with Lucas & Loaffy." with "box" highlighted lilac; blush smash Sticker; mint availability Sticker; 2 CTAs; hero intro choreography §6.1 once per session), ProofStrip ("Founder of Luci" + shipped-for list), SelectedWork (Luci as the featured first card with BetaBadge; then the 6 client cases; per-case tone + Loaffy form peek), MotionReel, AboutChangelog (short), KindWords, ContactPanel. ProcessStory = static 5-step placeholder (Phase 7).
Section colours per DESIGN.md §1.4. Reveal on scroll (once, 80ms stagger). Analytics events from TECH-STACK.md §5.
```
**Check:** first screen at 375×667 and 1440×900 shows title, availability and Resume · Flow A works end to end · Luci card is the first thing in Work.
**Done when:** Lighthouse mobile ≥ 95 performance, 100 accessibility.

---

## Phase 6 · Case study template + Work index
**Prompt**
```
Phase 6 — Case studies. Read IA.md §3–§4, COMPONENTS.md §E, USER-FLOWS.md §3.
1. /work: display-xl "Work.", filter chips synced to ?tag=, aria-live result count, CaseCard grid (Luci first, featured).
2. /work/[slug]: CaseHero, MetaRow (<dl>), TLDR stickers, sticky BeanStepper tied to <Chapter> (IntersectionObserver), DecisionCard, Callout, ImageGallery (dialog, focus trap), Clip, NextCase, compact ContactPanel. generateStaticParams for all slugs.
3. Luci: build /work/luci exactly as docs/pawprint-kit/03-ux/CASE-LUCI.md (use its §9 prompt as a separate session after the template works).
4. SEO per IA.md §4: metadata, canonical, JSON-LD (CreativeWork; SoftwareApplication for Luci), OG image with Loaffy in the case's form on its pastel (build-time).
```
**Check:** open a case from a shared link (Flow B) · back button keeps scroll position · OG preview correct.
**Done when:** all 7 case studies render from MDX.

---

## Phase 7 · Signature Process story + scroll choreography
**Prompt**
```
Phase 7 — Process story. Read USER-FLOWS.md §5, LOAFFY-ANIMATION.md §5 and §6.2–6.4.
1. ProcessStory with GSAP ScrollTrigger (dynamic import, home only): pin ~300vh on ≥ lg; scrub the 5 scenes; drive Loaffy and the hand through LoaffyBus / Rive inputs exactly as §6.4.
2. Copy lines are real DOM text, announced politely.
3. < lg: no pin, five stacked steps animating once. Reduced motion: five static frames with Previous/Next buttons.
4. Hero → Work scroll morph (§6.2).
5. Report added KB; stay within TECH-STACK.md §4.
```
**Check:** scroll slowly and fast; resize mid-scroll; reduced motion; INP.
**Done when:** smooth at 60fps on a mid-range phone, budgets met.

---

## Phase 8 · Motion, About, Contact, Colophon, 404
**Prompt**
```
Phase 8 — Remaining pages. Read IA.md §3 for /motion, /about, /contact, /colophon and USER-FLOWS.md §8.
Use existing components only. /colophon renders the live design system (tokens in 3 themes, type scale, motion demos, the Loaffy gallery and animation reactions, components, accessibility statement, stack, Luci + Pawprint credits) — treat it as a case study of this site. not-found.tsx uses Loaffy Lost with BRAND.md 404 copy.
```
**Done when:** every route in IA.md §1 exists and passes the DoD.

---

## Phase 9 · QA, Cloudflare deploy, domain, email, launch
**You do:** follow `DEPLOY-CLOUDFLARE.md` §3–§6 in the Cloudflare dashboard, Gmail and the old Vercel repo.

**Prompt**
```
Phase 9 — Launch. Read TECH-STACK.md §4–5, DEPLOY-CLOUDFLARE.md §2, AGENTS.md §7.
1. Do DEPLOY-CLOUDFLARE.md §2 (static export, images, OG, wrangler.jsonc, scripts, public/_headers). Verify with `npm run cf:preview`.
2. Playwright e2e for Flows A, B, D, E, F, G (USER-FLOWS.md) + @axe-core/playwright on every route in all 3 themes.
3. Lighthouse CI with TECH-STACK.md §4 budgets (fail on regressions).
4. Verify sitemap, robots, canonical/OG on every route, JSON-LD validity, 404, rel=noopener, resume.pdf size, no /lab in production.
5. Launch report: scores per route, open issues, anything unverified.
```
**Done when:** production on `https://lucas.pawprint.design`, all checks green, email forwarding works, old domain redirects.

---

## §R · Lucas's Rive track (in parallel with Phases 2–7)

| Step | You do in Rive | Reference |
|---|---|---|
| R1 | Import the SVGs from `05-assets/loaffy/` into a `Loaffy` artboard (400×400); rebuild the hierarchy and pivots | LOAFFY-ANIMATION.md §3.1–3.2 |
| R2 | Pen outline: under-copy + main stroke; 3 boil variants per line | §2.9, §3.2 |
| R3 | Timelines on the 40ms grid (author at 50fps, even frames) | §4 |
| R4 | State machine `Loaffy SM` with the exact input names | §3.3 |
| R5 | `Hand` artboard + its timelines | §5 |
| R6 | Export `loaffy.riv` (≤ 150 KB) and `hand.riv` (≤ 80 KB) to `public/rive/` | §8 |
| R7 | Ask the agent: `Wire public/rive/loaffy.riv into the Loaffy facade; verify every input and the §9 QA checklist in /lab.` | §7, §9 |
| R8 | Export social cuts (MP4/WebM/GIF) for LinkedIn and Behance | §8 |

## After launch (optional)
- `/loaffy` playground page (easter egg; great for social posts).
- Full Luci case study when Luci leaves beta.
- Short captioned clips per key decision in each case study.
