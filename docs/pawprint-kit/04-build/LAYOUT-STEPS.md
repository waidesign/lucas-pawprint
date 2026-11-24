# Layouts without card overuse · step by step

> **Goal:** stop using cards as the default layout. Every page except Home gets a calmer layout built from type, spacing and hairlines; cards stay only where they earn it.
> **Scope:** `/work`, `/work/[slug]` (all 7 case studies), `/motion`, `/about`, `/contact`, `/colophon`, 404. **Home is out of scope: nothing on `/` may change** (see "Home guard").
> **Replaces** `PAGES-BUILD-STEPS.md` Steps 3–6: the page sessions below build the IA.md content *and* the new layout in one pass. PAGES-BUILD-STEPS Steps 1 (nav + transitions), 2 (home trailer, later) and 7 (SEO + QA) still apply.
> **Rhythm:** one prompt per agent session, check, commit. Step 1 first; after it, Steps 2–7 touch different files and can run in parallel; Step 8 last.

---

## Step 0 · Prepare (you, 5 min)

1. Commit or merge what's open (`feat-cathand-choreography` and the kit update).
2. ```powershell
   git checkout -b feat-no-card-layouts
   ```
3. Each session below ends with its own commit (message given). Run sessions in this branch.

---

## The rule (AGENTS.md rule 18, added in Step 1)

> **18. Cards are the exception, not the layout.** A card is a filled box with a 2px pen border and a sticker shadow. Use one only for **(a)** a thing you click as a whole (NextCase, a case cover), **(b)** a frame around media or a live demo (image, video, device, code, diagram, token specimen), or **(c)** the one standout moment of a section (ContactPanel, CaseCTA). Everything else sits plain on the page: type, spacing, 1px hairlines and labelled or numbered lists. Never cards inside cards, never a grid of text-only cards, at most one card group per section. Stickers, chips, pills and badges are not cards. Home keeps its current design until it is redesigned on purpose.

**Rule test, for every box you are about to draw:**
1. Is the whole box one clickable thing? → card OK.
2. Is it framing media or a live demo? → frame OK (`rounded-md`/`rounded-xl`, 2px pen border; sticker shadow only on the main media of a section).
3. Is it the single standout moment of this section? → one panel OK.
4. Otherwise → no box. Use a pattern from the layout kit below.

---

## The layout kit (built in Step 1, used everywhere)

Tokens only (AGENTS.md rules 2–3). Hairline = `border-line` (1px). Pen rule = `border-line-strong` (2px). On a full-pastel background use `border-on-pastel` at the same widths. Headings always via `<Heading as>` / `HEADING_SCALE_CLASSES` (rule 17). Reveals: rise 16px + fade, 40ms stagger, max 6 items, off under reduced motion.

| Pattern | Component | Looks like | Use for |
|---|---|---|---|
| **Ruled list** | `src/components/ui/RuledList.tsx` | A 2px pen rule on top, rows separated by hairlines, each row a 12-col grid: **marker** (md:col-span-2; mono label, years or a numbered bean) · **title** (md:col-span-4; heading via `as`, default `h4`) · **body** (md:col-span-6; `body-lg`, `text-muted`) · optional **aside** (caption, right-aligned). Rows `py-6 md:py-8`. Stacks to one column below md. `<ol>` when order matters, else `<ul>`. | Changelog, story chapters, principles, learnings, steps, findings, annotations, FAQ |
| **Index columns** | `src/components/ui/IndexColumns.tsx` | 2–4 plain columns (`gap-10`; 1 col → 2 at md → n at lg). Each column starts with a 2px pen rule, then an optional **label** (mono uppercase, or a pastel `Chip`), optional big **number** (`font-display` numeral, `aria-hidden`), **title** (heading via `as`), **body**, optional **actions**. No fill, no shadow. | TL;DR, "What I'm good at", contact "Three ways", audiences, How I animate, principles |
| **Spec row** | `MetaRow` restyled | A `<dl>` between a 2px pen rule (top) and a hairline (bottom), `py-6`, 2 → 3 → 5 columns. Mono labels, `body` values. | Case meta (role, team, timeline, platform, tools, live link) |
| **Pull quote** | `src/components/ui/PullQuote.tsx` | `<figure>`: `<blockquote>` in `font-display text-h3` (a quote, not a heading), max width `--prose-max`; `<figcaption>` with author (`text-h4` style on a `<p>`), role · company caption, relationship chip. Quotes separated by a hairline and `pt-10`. Optional disclosure slot ("Read the full note"). | Testimonials outside Home |
| **Margin note** | `Callout` restyled (same props) | `border-l-2 border-line-strong pl-6`, title as one pastel highlight (same style as the headline highlight, colour from `tone`), body below. No fill, no shadow. | Asides in case studies |
| **Section band** | existing `<Section tone="…" soft>` | Emphasis comes from tinting the whole section, not boxing its content. One pastel per section; neighbours differ; plain `bg` sections between bands. | Any section that needs weight |

**Allowed frames (keep as they are):** `CaseHero` cover, `VideoReel`, `Clip`, `ImageGallery`, `DeviceFrame`, code blocks, diagrams (`ProblemDiagram`, `ArchitectureDiagram`, `FeedbackBeforeAfter`, `ToolbarAnatomy`, `BrandBoard`, `LuciHero` illustration), token/component specimens in `/colophon`, `NextCase` (clickable whole), `ContactPanel` and `CaseCTA` (one panel each).

---

## Home guard (every session)

- Do **not** change how `/` renders. Home-only files are off limits: `src/app/page.tsx`, `Hero`, `ProofStrip`, `SelectedWork`, `ProcessStory`, `AboutChangelog`, `BuiltWith`, `MotionReel`, `SectionSeam`.
- Shared files (`CaseCard`, `KindWords`, `VideoReel`, `ContactPanel`, `Card`) may only get **new optional props whose default reproduces today's output exactly**.
- Before committing: build, then compare `out/index.html` from before and after your change (ignore hashed asset file names). It must be the same. Also check `/` at 1440 by eye.

---

## Step 1 · Rule, docs and the layout kit (session A, run first)

```
Task — Layouts step 1: add AGENTS.md rule 18 (no card overuse), update the docs, build the layout kit. Read AGENTS.md, CLAUDE.md, docs/pawprint-kit/04-build/LAYOUT-STEPS.md (whole file), DESIGN.md §3–§4, COMPONENTS.md.
1. Rules: add rule 18 to AGENTS.md and CLAUDE.md exactly as written in LAYOUT-STEPS.md "The rule". Add to §7 Definition of done: "- [ ] No card overuse (rule 18): every box passes the rule test in LAYOUT-STEPS.md." Write .luci/decisions/2026-11-24-no-card-overuse.md (template in .luci/decisions/README.md) and a proposal in .luci/memory/proposed/no-card-overuse.md (template in that folder's README) so rule 18 gets merged into .luci/rules.md. Do not edit .luci/rules.md yourself.
2. Docs (keep design.md and docs/pawprint-kit/02-design-system/DESIGN.md in sync): add "§3.1 Containers" to both with the rule, the rule test and the layout-kit table (short form). In COMPONENTS.md: Card = "use only per rule 18"; add RuledList, IndexColumns, PullQuote; update the specs of Callout (margin note), MetaRow (spec row), TLDR (index columns), DecisionCard (decision block) to match LAYOUT-STEPS.md Step 2. In IA.md §3: About "What I'm good at: 4 cards" → "4 index columns"; Contact "Three ways (3 cards)" → "3 index columns"; Work "client cases in a 2-column grid" → "client cases as cover tiles (only the cover is framed)". In PAGES-BUILD-STEPS.md: mark Steps 3–6 "Replaced by LAYOUT-STEPS.md". In docs/pawprint-kit/README.md add a row for 04-build/LAYOUT-STEPS.md.
3. Components: build src/components/ui/RuledList.tsx, IndexColumns.tsx, PullQuote.tsx to the layout-kit spec (typed props, semantic HTML: ol/ul + li, figure/blockquote/figcaption; heading level via `as`; reduced-motion safe reveals). Restyle src/components/case/Callout.tsx as the margin note (same props). Add a doc comment to src/components/ui/Card.tsx: "Rule 18: only for a clickable whole, a media/demo frame, or one standout panel per section."
4. /lab: show each new pattern with all props, in Light, Dark and Warm Dark, at 375 and 1440, plus a short "Card: when (not) to use" note with the rule test.
Home guard applies. Run lint, typecheck, build. Show me /lab and the docs diff.
```
**Check:** rule 18 in AGENTS.md + CLAUDE.md · three new components in /lab · Callout has no box · `/` unchanged.
Commit: `feat(ui): layout kit + rule 18 (no card overuse)`.

---

## Step 2 · Case study shell, all 7 cases (session B)

```
Task — Layouts step 2: case study shell without card overuse. Read AGENTS.md (rule 18), LAYOUT-STEPS.md (layout kit + Step 2), IA.md §3 Case study, COMPONENTS.md §E. MDX files must not need changes: keep every component's props.
1. MetaRow → spec row (layout kit). No fill, no shadow.
2. TLDR → IndexColumns, 3 columns: label as a pastel Chip (butter / mint / sky as today), text in body-lg. No sticker boxes. Keep the 80ms reveal stagger.
3. DecisionCard → decision block: a 2px pen rule on top; row 1 = h3 title + "Key decision" chip; row 2 = a <dl> in 3 columns (Problem · Decision · Why it worked) with mono labels, split by vertical hairlines at md+ and top hairlines below md; children (before/after media) below as allowed frames; a hairline at the bottom. No outer box, no inner boxes.
   Cat hand: DecisionHandPeek must still hide its lower half behind something solid. Make Chapter expose its background colour as a CSS variable (e.g. --chapter-bg, set from the same token it uses for its bg class) and give the decision block's title row that background, with the hand behind it peeking over the pen rule. Check it on every chapter tone used in the 7 MDX files; if any tone shows a visible box, remove DecisionHandPeek from DecisionCard and update .luci/decisions/2026-11-24-cat-hand-placements.md (placement 4 removed, and why).
4. Callout is already the margin note from Step 1; check every MDX use reads well.
5. Keep as frames: CaseHero cover, Clip, ImageGallery, NextCase (clickable whole).
6. Read every case MDX top to bottom at 375 and 1440 in Light and Warm Dark; nothing should look like a card except the allowed frames.
Home guard applies. Run lint, typecheck, build. Show me /work/classic-decoder and /work/vehicle-databases before/after.
```
**Check:** no boxed text in any case study · DecisionCard reads as a section, not a card · MDX untouched.
Commit: `refactor(case): card-free case study shell`.

---

## Step 3 · Luci case study components (session C)

```
Task — Layouts step 3: Luci case components without card overuse. Read AGENTS.md (rules 7, 18), LAYOUT-STEPS.md (layout kit), CASE-LUCI.md. Keep all public copy and LaunchOnly behaviour exactly as is; change layout only.
- AudienceCards → IndexColumns (3 audiences as h4 titles) + the job chips row as today.
- PrincipleCards → RuledList, numbered 01–05 (marker = numbered bean, title = principle, body = line).
- HowSteps → per step: text plain (numbered bean + h4 + copy, no Card) beside its illustration (allowed frame), alternating sides on lg.
- Learnings → RuledList, numbered.
- Outcome → no Card: mono label + the statement in font-display text-h3 on a <p>, under a 2px pen rule.
- AnnotatedExport → keep the code frame; the annotation list becomes a RuledList whose numbers match the code markers.
- A11yFindings → plain table: header row with a 2px pen rule below, body rows with hairlines, overflow-x-auto wrapper with no border or shadow. Keep table semantics (caption, th scope).
- BuildTimeline → remove the outer box; keep the timeline itself on a hairline axis.
- CaptureFlow → capture items that show an image stay framed (media); text-only items become IndexColumns (4 columns at lg); keep the flow pills; remove the outer box around the pills.
- ProblemDiagram → keep the diagram frame; any text-only Card or banner inside or after it becomes plain text or a margin note.
- Keep as is (frames/panels): LuciHero illustration, ToolbarAnatomy, BrandBoard, ArchitectureDiagram, FeedbackBeforeAfter, CaseCTA (the page's one panel).
Home guard applies. Run lint, typecheck, build. Show me /work/luci (teaser) at 375 and 1440, Light + Warm Dark.
```
Commit: `refactor(luci): card-free case components`.

---

## Step 4 · /work (session D)

```
Task — Layouts step 4: /work. Read AGENTS.md (rules 11, 14, 17, 18), LAYOUT-STEPS.md (layout kit + Step 4), IA.md §3 Work index.
Build /work from its own component (src/components/work/WorkIndex.tsx). Do not change SelectedWork (Home uses it).
1. Page hero (Section bg): mono eyebrow, h1 "Work." (display-xl), one line "Seven projects: one I founded, six I shipped for clients." (count from data), filter chips (All · Own product · Web · Apps · Design systems · E-commerce · AI workflow) synced to ?tag= with an aria-live result count. Loaffy in window form peeks from the hero's right edge (lg+). This is the page's only Loaffy: no per-card Loaffy peeks on /work.
2. Luci: the featured row using CaseCard (cover 7 cols / text 5 cols), with a new optional `peek` prop on CaseCard (default true = Home unchanged; /work passes false).
3. A hairline + mono label "Client work · {n}", then client cases as cover tiles in a 2-column grid (1 column below lg, gap-x 64px / gap-y 96px on the spacing scale): add CaseCard `variant="tile"` (default "row" = Home unchanged): cover on top (the only framed thing), then meta line, h3 title, summary, tags, and a "Read case study →" TextLink. No box around the text.
4. Empty filter state: plain line "Nothing here yet. Try another filter." + a "Show all" text button. No card.
5. ContactPanel at the end (the page's one panel).
Home guard applies. Run lint, typecheck, build. Show me /work at 375, 1024, 1440 and a filter with zero results.
```
Commit: `feat(work): card-free work index`.

---

## Step 5 · /about (session E)

```
Task — Layouts step 5: /about. Read AGENTS.md (rules 6, 11, 15, 17, 18), LAYOUT-STEPS.md (layout kit + Step 5), IA.md §3 About, CONTENT.md "About page" + Changelog + Kind words. Use the drafted copy exactly; [placeholders] render only in development, never in production builds.
Sections in order (bands alternate so neighbours never share a colour):
1. Hero (bg): mono eyebrow; h1 "Hi, I'm Lucas." on its own full-width row; below it a 12-col grid: portrait (5 cols, the page's one media frame: rounded-xl, 2px pen border, sticker shadow) + intro in body-lg, Resume button, and Loaffy in the chill-lean pose (7 cols). Remove the "Works across US, Canada, NZ and Singapore time zones" line (rule 15).
2. My story (butter-soft band): RuledList of 3 chapters, marker = years (mono), title = chapter name (h3), body = 2–3 sentences.
3. Changelog (bg): RuledList as a timeline table, newest first, Luci on top: marker = period, title = role (h4), body = company + summary, aside = location. Education is the last row (degree, school, graduated, [your line]).
4. How I work (mint-soft band): IndexColumns ×3 for the working principles (big numeral 01–03, principle as h4, [one line]), then a TextLink "See the process, step by step →" to /#process. Do not repeat Home's step-by-step process. Remove the current Shape card and its HandSketch.
5. What I'm good at (bg): IndexColumns ×4 (2 at md, 4 at xl): area as h4 + 3 TextLinks to the real case studies named in CONTENT.md.
6. Tools (bg, directly under 5 with a hairline): 3 columns Design · Motion · Build, each a mono label + chips.
7. Kind words (blush-soft band, id="kind-words"): add KindWords `variant="quotes"` (default "cards" = Home unchanged) rendering PullQuote ×2, both full notes behind a "Read the full note" disclosure.
8. Beyond work: render only if CONTENT.md has real text (not a placeholder).
9. ContactPanel.
Home guard applies. Run lint, typecheck, build. Show me /about at 375 and 1440, Light + Warm Dark.
```
**Check:** zero `<Card>` on /about · one media frame (portrait) and one panel (ContactPanel) only · no availability copy.
Commit: `feat(about): card-free about page`.

---

## Step 6 · /motion (session F)

```
Task — Layouts step 6: /motion. Read AGENTS.md (rules 6, 11, 18), LAYOUT-STEPS.md (layout kit + Step 6), IA.md §3 Motion, LOAFFY-ANIMATION.md §4.14 + §6.5, COMPONENTS.md VideoReel.
Build /motion from its own sections; do not use or change MotionReel (Home uses it).
1. src/content/motion.ts: typed clips (title, type: "product-ui" | "brand" | "explainer" | "video", year, role, tools[], poster, mp4, webm, captions). You may move in the two real clip descriptions from MotionReel's MOTION_CLIPS (copy them, don't edit MotionReel). Every other entry is a clearly marked placeholder: no invented titles or clients.
2. Hero (bg): mono eyebrow, h1 "Motion.", the IA intro line, and Loaffy (play form) on the right at lg+, switching to the vibing pose while the reel plays (LoaffyBus). That is the page's only Loaffy: add a VideoReel prop `loaffyButton` (default true = Home unchanged); /motion passes false so the play button shows a plain Play icon.
3. Showreel: VideoReel full width (allowed frame).
4. Work by type (bg): filter chips (All · Product UI · Brand & campaigns · Explainers · Video) + clip tiles in a 3/2/1-column grid. Each tile = the poster/preview in a rounded-md frame (the only framed thing; preview loops on hover/focus only) + plain text under it: title (h4), one line, role · tools in a mono caption. Clicking opens a dialog player (focus trap, Esc, captions).
5. How I animate (sky-soft band): IndexColumns ×4 with numerals: Storyboard → Animatic → Motion → Polish, one line each.
6. Tools: mono label + chips (After Effects, Premiere Pro, Figma, Rive, Lottie) under a hairline, then "More on Behance ↗" TextLink.
7. ContactPanel.
Videos lazy-load, nothing autoplays with sound, reduced motion shows posters until clicked. Home guard applies. Run lint, typecheck, build. Show me /motion at 375 and 1440.
```
Commit: `feat(motion): card-free motion page`.

---

## Step 7 · /contact (session G)

```
Task — Layouts step 7: /contact. Read AGENTS.md (rules 11, 15, 18), LAYOUT-STEPS.md (layout kit + Step 7), IA.md §3 Contact, CONTENT.md "Contact page". No availability copy anywhere (rule 15). No form.
1. Hero (bg): mono eyebrow (name · Phuket, Thailand · UTC+7), h1 "Let's talk.", sub "Email me, book a 30-minute chat, or find me on LinkedIn.", Loaffy in bubble form on the right at lg+ (the page's only Loaffy). No ContactPanel on this page: the page is the contact panel.
2. Three ways (lilac-soft band): IndexColumns ×3 — Email (label, CopyEmail lucas@pawprint.design, mailto TextLink) · Book a 30-min chat (secondary Button to cal.com, new tab) · LinkedIn (TextLink). No boxes.
3. Time zones (bg, client component): two large times side by side in font-display — "Phuket, now" and "Your time, now" (from the browser) — with mono labels, updating each minute; under them a 24-hour track (hairline axis, hour ticks every 3h) with two solid pastel bars (my working hours [confirm], the visitor's same hours) and the overlap marked in ink with a caption "Best time to meet: HH:MM–HH:MM your time". A diagram, not a card. Intl.DateTimeFormat only, no hard-coded offsets, no country list. The server render shows one static fallback line of the same height (no layout shift).
4. Two columns (bg): left = "What helps in a first message" as a short RuledList (role and team · your time zone · timeline · link to the job post); right = Quick answers as <details> rows separated by hairlines (only answers that aren't [placeholders] in production).
5. Elsewhere: mono label + TextLinks (Behance, GitHub, Medium, Resume) on one line under a hairline.
Home guard applies. Run lint, typecheck, build. Show me /contact at 375 and 1440, and the time-zone block with JS disabled.
```
Commit: `feat(contact): card-free contact page`.

---

## Step 8 · /colophon, 404 and the card audit (session H, run last)

```
Task — Layouts step 8: finish and audit rule 18. Read AGENTS.md (rule 18), LAYOUT-STEPS.md.
1. /colophon: the three text Cards (stack, credits, etc.) → IndexColumns. In DesignSystemFoundations keep every token/component specimen frame (demos); any text-only info box → plain text or a RuledList. Do not change how /lab looks beyond that.
2. 404: check it passes the rule test; fix if not.
3. Audit: list every remaining `<Card` and every element with both `border-2` and `shadow-sticker*` outside Home-only files and /lab. For each, name which rule-test case (a/b/c) allows it, or fix it. Put the list in your reply.
4. QA on /work, one case study, /motion, /about, /contact, /colophon: axe 0 violations in Light, Dark, Warm Dark; keyboard-only pass; reduced motion; 375, 768, 1024, 1440, 1920. Confirm `/` is unchanged (Home guard).
5. Update .luci/context.md (what's done, what's next).
Run lint, typecheck, build. Report the audit list and QA numbers.
```
Commit: `refactor(colophon): card-free colophon + rule 18 audit`. Then open a PR for `feat-no-card-layouts`.

---

## What you need to provide (any time)

| Item | For |
|---|---|
| One line for each working principle, your education line | /about (CONTENT.md drafts) |
| Your working hours (e.g. 09:00–18:00 Phuket) | /contact time-zone overlap |
| Reply-time answer | /contact Quick answers |
| Clips, posters, captions for /motion | `public/motion/` + `src/content/motion.ts` |
