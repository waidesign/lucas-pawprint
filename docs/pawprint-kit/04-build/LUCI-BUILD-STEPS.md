# Building the Luci case study · step by step

> For Lucas, mid-way through Phase 5 (Home). The spec is `docs/pawprint-kit/03-ux/CASE-LUCI.md`; this file breaks it into **small agent sessions** you can review one at a time.
> Each step: **You do** → **Prompt** (paste after the Session kickoff) → **Check** → commit.
> Never paste two step prompts in one session. Small steps keep the agent accurate.

---

## Step 0 · Don't interrupt Phase 5

1. Let your agent finish the home section it's working on. Commit and push.
2. In the Phase 5 Selected Work section, a **placeholder Luci card** is fine for now (title, one line, BetaBadge, link to `/work/luci`). Step 8 finalises it.
3. Finish Phase 5's checks, merge `phase-5-home` into `main`.

## Step 1 · Bring the new spec into the repo (you, 5 min)

1. Unzip the latest `pawprint-kit.zip` somewhere temporary.
2. Copy into your repo's `docs/pawprint-kit/` (overwrite):
   - `03-ux/CASE-LUCI.md` (new)
   - `03-ux/CONTENT.md`, `03-ux/IA.md`, `04-build/PROMPTS.md`, `README.md` (updated)
   - the whole `06-references/` folder (the 8 real Luci exports)
   - this file, `04-build/LUCI-BUILD-STEPS.md`
3. Create the branch and commit:
   ```powershell
   git checkout main ; git pull
   git checkout -b feat-luci-case-study
   git add docs/pawprint-kit ; git commit -m "docs: Luci case study spec + references" ; git push -u origin feat-luci-case-study
   ```

---

## Step 2 · Data, modes and clean-up (session A)

**Prompt**
```
Task — Luci case study, step 2: data and modes. Read AGENTS.md and docs/pawprint-kit/03-ux/CASE-LUCI.md §2, §6, §7, §8.
1. Extend the zod schema in src/lib/schema.ts with: visibility ("teaser" | "full"), badge (optional string), cta (object with teaser and full, each { label, href }). Keep existing fields.
2. Replace the metadata in src/content/case-studies/luci.mdx with CASE-LUCI.md §8 exactly. Remove any old body text in luci.mdx (it was written before the spec) — especially anything about earlier internal tools. Leave the body empty except a comment "// sections come in steps 4–7".
3. Create src/content/case-studies/luci/proof.ts with the §6 table as typed data: site, sections (number | "1 capture"), componentKinds, and a separate anonymised findings list (label, measured, verdict) for V7. No other numbers.
4. Create src/components/case/LaunchOnly.tsx: renders children only when the case's metadata.visibility === "full". It must filter at render/build time (server component), so teaser HTML never contains launch-only content. Also a helper useCaseMode() or getCaseMode(slug).
5. Show me: the final luci.mdx metadata, proof.ts, and LaunchOnly. Run lint, typecheck, build.
```
**Check:** `npm run build` passes · `luci.mdx` mentions nothing from CASE-LUCI.md §7 · `proof.ts` numbers match §6 exactly.
Commit: `feat(luci): case data, two modes, proof data`.

## Step 3 · Case page shell (session B) — skip if Phase 6 is already done

**Prompt**
```
Task — Luci case study, step 3: the case page shell (minimum needed before Phase 6). Read IA.md §3 (Case study), COMPONENTS.md §E, DESIGN.md §1.4 and §4.
1. src/app/work/[slug]/page.tsx with generateStaticParams from getCaseStudySlugs(); render the MDX body inside a CaseLayout.
2. src/components/case/: CaseLayout (prose width rules, section spacing var(--space-section)), Chapter (props: step "understand|shape|design|ship", title, tone for background; renders <section aria-labelledby> with an h2), BeanStepper sticky on ≥ lg (IntersectionObserver over Chapters; aria-current="step"), MetaRow (<dl>), TLDR (3 Stickers), NextCase, BetaBadge if missing.
3. Register these in src/mdx-components.tsx so MDX can use them.
4. Generic and reusable for all 7 cases — nothing Luci-specific here.
Show me /work/luci (empty body is fine) with the stepper working on a test MDX.
```
**Check:** `/work/luci` loads as a real page · back button works · stepper highlights as you scroll.
Commit: `feat(case): case page shell`.

## Step 4 · Hero (session C)

**Prompt**
```
Task — Luci case study, step 4: the hero (§1). Read CASE-LUCI.md §1 under §4, LOAFFY.md §3, LOAFFY-ANIMATION.md §6.3, BRAND.md §11.
Build src/components/case/luci/LuciHero.tsx:
- Layout: 12-col grid, left 5 cols (eyebrow, "Luci" display title + BetaBadge, body-lg sub, MetaRow, CTAs from metadata.cta per mode), right 7 cols the V1 visual on a lilac stage (rounded-2xl, 2px pen border). Section background lilac-soft.
- V1 is an inline SVG/HTML illustration, NOT a screenshot: a browser frame with an invented neutral landing page; one "Get started" button with a dashed selection outline and a chip "Button · 4 states · can export ✓"; Luci's toolbar docked at the bottom (pill with 7 icons: Capture, Text, Colour, Spacing, Basket, Feedback, Settings — lucide icons); a side panel with the first 8 lines of a design.md (mono 12/20).
- Luci colours only inside V1, as scoped variables in src/components/case/luci/luci.css: --luci-surface #F5EFEA, --luci-ink #2B2B2B, --luci-accent #F4A878. Nothing global.
- Loaffy: window form, size 128, peeking from the stage's top-right corner, outside the visual, never over text; decorative.
- Motion (once, on load): outline draws 480ms → chip pops 280ms (springCalm) → design.md lines type in, 40ms per line. Reduced motion: final frame. All on the 40ms grid.
Add <LuciHero /> at the top of luci.mdx. Show me /work/luci at 375 and 1440.
```
**Check:** whole story visible at 1440×900 · no Luci colours outside V1 · Loaffy doesn't touch text · reduced motion shows the final frame.
Commit: `feat(luci): hero`.

## Step 5 · Story sections: TL;DR, problem, principles (session D)

**Prompt**
```
Task — Luci case study, step 5: §2 TL;DR, §3 Problem, §4 Who it's for + principles. Read CASE-LUCI.md §4 (§2, §3, §4 parts) for exact copy.
1. TL;DR: three Stickers (butter, mint, sky) with the §2 copy, from metadata.tldr.
2. <Chapter step="understand" title="One button. Not the whole website."> with the §3 paragraph, ProblemDiagram (V2: three cards Too much / Guessed / Lost, each a small SVG scene, one line, a blush "✕" chip; then a full-width mint "✓ Luci: one component, measured values, one feedback session." bar), and a lilac Callout with the pull quote.
3. <Chapter step="shape" title="Five rules before any pixels" tone="mint-soft"> with AudienceCards (3 cards), job chips (3), and PrincipleCards (5 principles as a plain RuledList, no numerals, copy from §4).
4. Use only existing primitives + these new components in src/components/case/luci/. Copy exactly as the spec (BRAND voice). Reveal on scroll with the reveal preset, 80ms stagger.
Show me the page.
```
**Check:** copy matches the spec word for word · each section has one idea · keyboard order is logical.
Commit: `feat(luci): story sections`.

## Step 6 · Proof sections: real export, capture flow, outcome, CTA (session E)

**Prompt**
```
Task — Luci case study, step 6: §6 A real export, §10 Luci built this portfolio, §11 Outcome + learnings, §12 CTA. Read CASE-LUCI.md §4 (§6, §10–§12), §6 data, §7.
1. AnnotatedExport (V6): code panel (surface, rounded-lg, mono 16/24) with the exact ko-fi excerpt from the spec, numbered ①–④ markers, and 4 callout cards beside it. Never render the captured site's colours as swatches.
2. A11yFindings (V7): table from proof.ts findings (anonymised labels), verdict chips (blush = fails, mint = AAA, always with the word, not colour alone). Caption from the spec.
3. CaptureFlow (V12): 8 capture cards from proof.ts (site, sections, component kinds — no checks here), then the flow pills: 8 Luci captures → Moodboard → Loaffy Candy tokens → This page. Cards reveal with 80ms stagger.
4. Outcome (mint card, mode-aware copy) + 3 Learnings cards.
5. CaseCTA: lilac panel, "Want to try Luci?", primary CTA from metadata.cta[mode], secondary "Book a chat", Loaffy bubble form (decorative), NextCase → Classic Decoder.
Section backgrounds per CASE-LUCI.md §3. Show me the full teaser page.
```
**Check:** every number on the page appears in `proof.ts` · no site is named next to a failing check · the CTA goes to `mailto:lucas@pawprint.design?subject=Luci%20beta`.
Commit: `feat(luci): proof sections + CTA`.

## Step 7 · Launch-only sections, hidden (session F)

**Prompt**
```
Task — Luci case study, step 7: launch-only sections §5, §7, §8, §9, wrapped in <LaunchOnly>. Read CASE-LUCI.md §4 (§5, §7–§9) and §5 visuals list.
1. §5 ToolbarAnatomy (large toolbar, 7 labelled tools with leader lines) + HowSteps (5 alternating rows: copy card + <Clip> placeholder with poster slot; clips load lazily, muted, playsInline, captions).
2. §7 five DecisionCards (problem → decision), with ArchitectureDiagram (one core, two shells → "any website" / "your project") and FeedbackBeforeAfter (three repeated headers vs one grouped session) as SVGs.
3. §8 BrandBoard with empty slots for Luci's logo, mascot (3 poses), palette swatches (Muzzle White, ink, ginger family — Luci colours allowed inside this frame only), icon set. Loaffy hidden in this section.
4. §9 BuildTimeline (BeanStepper style, horizontal): Research → Product spec → Design → Build → Private beta · Nov 2026 → Public launch · [date].
5. Prove teaser safety: build with visibility "teaser", then search the generated HTML for "How Luci works", "Key decisions", "A tool with a little personality", "How it was built" — all must be absent. Then temporarily set "full" locally, show me the full page, and set it back to "teaser" before committing.
```
**Check:** teaser HTML has none of those headings · full mode looks complete with placeholders where your assets go.
Commit: `feat(luci): launch-only sections (hidden)`.

## Step 8 · Home, /work, SEO (session G)

**Prompt**
```
Task — Luci case study, step 8: integration. Read CASE-LUCI.md §8–§10, IA.md §4, TECH-STACK.md §5.
1. Home Selected Work and /work: Luci is the first, featured CaseCard (7/5 split layout, lilac, BetaBadge, Loaffy window-form peek on hover). Replace any Phase 5 placeholder.
2. ProofStrip: "Founder of Luci" links to /work/luci.
3. SEO for /work/luci: metadata from luci.mdx seo, canonical, JSON-LD CreativeWork + SoftwareApplication (name Luci, url https://luci.pawprint.design, applicationCategory DesignApplication, author Person Lucas), build-time OG image (Loaffy window form on lilac, "Luci · private beta"; "Luci · live" when full).
4. Analytics event luci_click on the card and CTAs.
```
**Check:** Luci is the first thing in Work on home and `/work` · share preview looks right.
Commit: `feat(luci): home + work + SEO`.

## Step 9 · QA (session H)

**Prompt**
```
Task — Luci case study, step 9: QA. Read AGENTS.md §7 and CASE-LUCI.md §7 and §10.
1. Run the Review prompt on /work/luci (design.md + COMPONENTS.md + 4/8 grid), then fix, then the Polish prompt.
2. Grep src/ and the built HTML for: Hoverify, Sitepeel, Agentation, GAW, Graphify, orchestrat, pricing, "% complete". Report any hit.
3. axe on /work/luci in Light, Dark, Warm Dark; Lighthouse mobile (performance ≥ 95, accessibility 100); keyboard-only pass.
4. List every [placeholder] left for me.
```
**Check:** zero grep hits · scores met · you've read the page top to bottom as a hiring manager would.
Open a PR → merge into `main`.

---

## Step 10 · Your assets before launch (you, any time)

| Asset | Spec | Where it goes |
|---|---|---|
| V4 toolbar anatomy | SVG/PNG export of the real toolbar, 2× | `public/case-studies/luci/toolbar.svg` |
| V5a–e loops | 5 screen recordings (Pick, Measure, Collect, Export, Tell your agent), 1280×800, 6–8s, MP4 + WebM, ≤ 2 MB each, + poster PNG | `public/case-studies/luci/clips/` |
| V10 brand | Luci logo (SVG), mascot in 3 poses, icon set | `public/case-studies/luci/brand/` |
| Launch date | e.g. "[Month] 2026" | luci.mdx + §9 timeline |
| Cat line | Keep or cut "Luci is named after my ginger cat." | luci.mdx §8 |

Then prompt: `Wire the Luci assets in public/case-studies/luci/ into ToolbarAnatomy, HowSteps clips and BrandBoard. Keep visibility "teaser".`

## Launch day (2 minutes)

1. In `luci.mdx`: `visibility: "full"`, `badge: "Live"`, add the launch date.
2. `npm run build` → check `/work/luci` → commit `feat(luci): launch` → push. Cloudflare deploys it.
