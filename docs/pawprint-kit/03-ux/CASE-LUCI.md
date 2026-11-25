# Case Study Spec · Luci (top featured)

> Route: `/work/luci` · File: `src/content/case-studies/luci.mdx` · Tone: **lilac** · Loaffy form: **window**
> **Status update (2026-11-25):** Luci is public and open source (MIT) at `https://luci.pawprint.design`. The two-mode **Teaser / Private beta** split (`LaunchOnly`, `visibility: "teaser"`, "Request beta access") is **obsolete** and removed from code. `/work/luci` now uses the unified Home-style case study template (`CaseHero` with no Loaffy per Rule 11 → `At a glance.` → 4 alternating wavy-seam chapters → `CaseCTA` + `NextCase`). Never mention version numbers, release dates, or GitHub star counts (AGENTS.md rule 7).

## Current Outline (Home-style case template, live)

- **Hero (`bg`)**: Badge `"Open source"`, year `2026`, `h1` `"Luci"`, live hero summary, primary `"Try Luci"` (`luci.pawprint.design`) + secondary `"GitHub"`, full-width cover stage built from real Devtool/Core/Extension captures (no Loaffy on Luci Hero, Rule 11).
- **At a glance (`bg`)**: `MetaRow` (Role, Team, Timeline `2026`, Platforms `CLI + Dev toolbar + Chrome extension + MCP server`, Tools, Live) + 3-column `IndexColumns` TL;DR labelled by pastel `Chip`s (no numerals).
- **01 Understand (`lilac-soft`)**: `"Agents are fast. They also guess."` — 4-up plain `LuciProblems` row with captured problem scene frames + Lucas's `"I needed one button, not the whole website."` `PullQuote`.
- **02 Shape (`bg`)**: `"One loop, four steps."` — `LuciWorkflow` (Show · Direct · Check · Remember in ProcessStory numeral style) + `PrincipleCards` (five verified principles).
- **03 Design (`lilac-soft`)**: `"Built for how agents work."` — 3 alternating `FeatureRow`s with live `LoopVideo` recordings (Devtool, Core, Extension), `"A real export."` (`AnnotatedExport` + `A11yFindings`), `DecisionList` (7 decisions verified in `luci-by-pawprint.design` source), and `"A tool with a little personality."` (`BrandBoard` with real logo + 6 animated mascot SVGs; no Loaffy).
- **04 Ship (`bg`)**: `"Luci built this portfolio."` — `CaptureFlow` (8 measured reference sites), `"Everything stays on your machine."` (`InsightList`, 4 local-first trust points), `Outcome`, and `Learnings`.
- **Closing (`bg`)**: `CaseCTA` (`"Want to try Luci?"` → Try Luci + Book a chat) + `NextCase` → Classic Decoder.

---

> _Historical v1 spec preserved below for reference only; teaser mode is obsolete._

---

## 1. Goal of this page

| Visitor | What they should leave believing |
|---|---|
| Hiring manager | "He finds a real problem, scopes it and ships a whole product." |
| Design lead | "His product thinking and visual craft hold up in the details." |
| Engineering lead | "He designs for how agents and developers actually work." |
| Recruiter | "Founder + designer + builder. Senior." (from the hero and TL;DR alone) |

**One-sentence story:** *Design extractors gave me the whole website when I needed one button, so I designed and built Luci: a toolbar that turns any part of any site into a design.md an AI agent can build from.*

---

## 2. Two modes: Teaser (now) and Launch (on launch day)

Set in the MDX metadata: `visibility: "teaser" | "full"`. Every section below has a **mode**. `both` = always shown; `launch` = hidden until `visibility: "full"`.
Beta testers were asked to keep Luci quiet, so teaser mode shows the *why* and the *principles* plus real outputs from public websites, but **no screenshots of the product UI**. Flip one value on launch day.

| | Teaser (now) | Launch |
|---|---|---|
| Badge | Private beta | Live · or Launching [date] |
| Primary CTA | Request beta access → `mailto:lucas@pawprint.design?subject=Luci%20beta` | Try Luci → `https://luci.pawprint.design` |
| Product visuals | Stylised illustrations (not real UI) | Real UI screenshots + screen recordings |
| Sections | 1–4, 6, 10, 11, 12 | All 12 |

---

## 3. Page outline

| # | Section | Visitor question it answers | Mode | Background | Key visual |
|---|---|---|---|---|---|
| 1 | Hero | What is this, and what was Lucas's role? | both | lilac-soft | V1 hero composition |
| 2 | TL;DR | The whole story in 20 seconds | both | bg | 3 stickers |
| 3 | The problem | Was this a real problem? | both | bg | V2 problem diagram |
| 4 | Who it's for + principles | Does he think before he designs? | both | mint-soft | V3 principle cards |
| 5 | How Luci works | What does it actually do? | launch | bg | V4 toolbar anatomy + V5 tool loops |
| 6 | A real export | Is the output good? | both | butter-soft | V6 annotated design.md + V7 accessibility findings |
| 7 | Key decisions | How does he make trade-offs? | launch | bg | V8 architecture + V9 feedback before/after |
| 8 | Brand | Can he give a product personality? | launch | blush-soft | V10 brand board |
| 9 | How it was built | Can he ship? | launch | bg | V11 timeline strip |
| 10 | Proof: Luci built this portfolio | Does it work in real life? | both | sky-soft | V12 capture flow |
| 11 | Outcome + learnings | Where is it now, what did he learn? | both | bg | — |
| 12 | CTA + next case | What now? | both | lilac panel | Loaffy bubble form |

Chapter mapping for the sticky **BeanStepper**: Understand = §3–4 · Shape = §4–5 · Design = §6–8 · Ship = §9–11.

---

## 4. Sections: layout, copy, visuals

> Copy is a draft in Lucas's voice (BRAND.md §4). `[brackets]` = Lucas fills in. Never add numbers that aren't in §6 "Real proof data".

### §1 Hero (both)
**Layout:** 12-col. Left 5 cols: eyebrow, title, sub, meta, CTAs. Right 7 cols: V1 on a lilac stage (`rounded-2xl`), Loaffy (window form, 128px) peeking from the stage's top-right corner, outside the visual.
- Eyebrow: `CASE STUDY · MY OWN PRODUCT · 2026`
- Title (display): **Luci** — BetaBadge next to it.
- Sub (body-lg): *A toolbar that turns any part of any website into a design.md your AI coding agent can actually build from.*
- MetaRow: Role — Founder, product designer, builder · Timeline — 2026 · Platform — Browser extension + npm toolbar · Status — Private beta · *(launch)* Licence — MIT
- CTAs: **Request beta access** (primary) · Visit luci.pawprint.design ↗ (ghost) — *launch:* **Try Luci** · Read the docs ↗

**V1 — Hero composition (illustration in teaser, real UI at launch).** A browser frame showing a simple sample landing page (invented, neutral). One button on it has a dashed selection outline and a label chip "Button · 4 states · can export ✓". Docked at the bottom of the frame: Luci's toolbar (pill, 7 icons). On the right, a side panel shows the first lines of a design.md. Built as an SVG/HTML illustration in Luci's own colours (Muzzle White `#F5EFEA`, Ink, ginger accents) inside the lilac stage.
**Motion:** on load, the outline draws around the button (480ms), the chip pops (280ms, spring), the design.md lines type in (40ms per line, max 8 lines). Reduced motion: final frame.

### §2 TL;DR (both)
Three Stickers in a row (butter, mint, sky), each with a label and 1–2 lines:
- **Problem** — Design extractors give you the whole website. I needed one button, one section, one colour system, with real values.
- **What I built** — An on-page toolbar that captures components, sections and tokens as design.md, checks accessibility, and gives AI agents clean feedback.
- **Where it is** — In private beta with invited designers and developers. Public launch next.

### §3 The problem — "One button. Not the whole website." (both · Understand)
**Copy:**
When I design with AI coding agents, I collect references all day. The design.md extractors I tried could only describe a whole site: thousands of lines my agent had to dig through, and it still guessed. Screenshots were worse, because an agent reading a picture invents the values. And when I gave feedback on more than one page, my agent sometimes missed half of it.

**V2 — Problem diagram (3 columns, illustration):**
| Too much | Guessed | Lost |
|---|---|---|
| A whole site → a very long design.md → the agent skims | A screenshot → the agent invents values ("probably 16px?") | Feedback on 3 pages → the agent follows 1 |
Each column: small icon scene, one line of copy, a blush "✕" chip. Under them, a mint "✓" bar: **Luci: one component, measured values, one feedback session.**

**Pull quote (Callout, lilac):** "I needed one button, not the whole website."

### §4 Who it's for + principles — "Five rules before any pixels" (both · Understand → Shape)
**Who it's for** (3 small cards): Designers who hand work to AI agents · Developers who need exact tokens · Anyone building with agents.
**Jobs** (chips): "Grab this button's exact styles" · "Get this site's colour system" · "Tell my agent what's wrong on these three pages".

**V3 — Five principles** (plain `RuledList`, no numerals: principles are parallel, not steps):
1. **Measured, never guessed.** Every value comes from the live page. Nothing is invented.
2. **Scoped.** A component, a section or one token system — not the whole site.
3. **Agent-ready.** It extends Google's DESIGN.md format, which agents already read.
4. **Lives where you work.** On any website, or inside your own project.
5. **Accessible by default.** Every export includes WCAG checks in plain words.

### §5 How Luci works (launch · Shape → Design)
**V4 — Toolbar anatomy:** the toolbar large and centred, each tool labelled with a leader line: Capture · Text · Colour · Spacing · Basket · Feedback · Settings.
Then five steps, each a row (copy left, visual right; alternate sides):
1. **Pick** — Hover any component or section. Luci tells you if it can become a design.md. Images are blocked; real elements and SVG are fine. *(V5a: hover outline + "can export ✓" / image + "can't export: it's a picture" chip)*
2. **Measure** — Text, Colour and Spacing tools. Grab one value, or the whole type, colour or spacing system. *(V5b: three looping mini demos)*
3. **Collect** — Captures go into a basket, so you can gather from many sites before you export. *(V5c: basket filling with 3 capture cards)*
4. **Export** — A design.md with tokens, roles, components, states and accessibility checks, in px or rem, and hex, oklch or hsl. *(V5d: settings toggles → output updates)*
5. **Tell your agent** — Leave feedback right on the page, written so agents follow it across pages. *(V5e: pins on two pages → one grouped session)*
Each V5 is a 6–8s loop (MP4/WebM + poster), recorded by Lucas from the real product at launch.

### §6 A real export (both · Design)
**Copy:** This is part of a real export Luci made from a public website (ko-fi.com) while I was building this portfolio.

**V6 — Annotated design.md.** A code panel (`rounded-lg`, surface, mono 16/24) showing this real excerpt, with 4 numbered callouts in the margin:
```yaml
description: "Exported by Luci from 1 capture of ko-fi.com/; values measured from live pages."
colors:
  primary: "#fd5913"
  surface-variant: "#202020"
typography:
  heading-1:
    fontFamily: bogue-black
    fontSize: 4.5rem
components:
  button:
    backgroundColor: "{colors.surface-variant}"
    rounded: "{rounded.r-9999}"
    padding: "1.25rem 1.75rem"
```
Callouts: ① Says where every value came from · ② Colours named by role, not just hex · ③ Type roles measured from the page · ④ Components point to tokens, so agents reuse them.
Note: these are the captured site's colours, shown as text only. Don't render them as swatches (our page stays pastel).

**V7 — Accessibility findings** (real checks from Luci exports of sites used for this portfolio; anonymised on purpose, it's not a call-out):
| Finding | Measured | Verdict |
|---|---|---|
| Footer text on a fintech homepage | 1.71:1 contrast | Fails AA |
| Primary button on an AI builder homepage | 4.26:1 contrast | Fails AA |
| Card label on a developer-platform homepage | 2.12:1 contrast | Fails AA |
| Carousel dots on a wallet homepage | 10.66 × 10.66px target | Fails AA (needs 24 × 24) |
| Navigation on a kids' games homepage | 18.98:1 contrast | AAA |
Caption: *Luci flags small misses even on sites I admire — so the agent doesn't copy them.*

### §7 Key decisions (launch · Design)
Five DecisionCards (problem → decision → why), each with a small diagram:
1. **Toolbar, not just an extension.** Extensions only live in the browser; dev work lives in the project. → One shared core with two thin shells: an extension for any site, an npm package inside your own project. *(V8 architecture: one core box, two shells, arrows to "any website" and "your project")*
2. **Extend a standard, don't invent one.** Agents already understand Google's DESIGN.md. → Luci extends it with component and section scope, states and accessibility.
3. **Block images.** A picture can't give reliable tokens. → Only real elements and SVG can be selected, and Luci says why when it refuses.
4. **One header per feedback session.** Feedback tools often repeat a page header for every page, and agents read each as a separate task and drop some. → Luci writes one session header and groups pages under it. *(V9 before/after: three stacked headers vs one grouped session)*
5. **Match the team's code.** Units (px/rem) and colour formats (hex, oklch, hsl) are settings, so exports drop straight into a codebase.

### §8 Brand (launch · Design)
**Copy:** Luci is named after my ginger cat. *(optional — keep or cut)* The brand is calm and warm: Muzzle White, ink and a ginger family, with an outlined cat mascot.
**V10 — Brand board** (Lucas supplies Luci's real assets): logo, mascot in 3 poses, palette (Muzzle White `#F5EFEA`, Ink `#2B2B2B`, ginger family), type, toolbar icon set. Shown inside a frame; Luci's own colours are allowed here. Loaffy is hidden in this section (one character at a time).

### §9 How it was built (launch · Ship)
**Copy:** I designed Luci in Figma and built it with AI coding agents, reviewing every change myself. It's MIT-licensed. The private beta opened in November 2026.
**V11 — Timeline strip** (BeanStepper style, horizontal): Research → Product spec → Design → Build → Private beta (Nov 2026) → Public launch ([date]).

### §10 Proof: Luci built this portfolio (both · Ship)
**Copy:** Every reference for this portfolio was captured with Luci. Eight sites, measured, then turned into my moodboard and design system — the one you're looking at.
**V12 — Capture flow:** 8 small capture cards (real data, §6) → arrow → mini moodboard thumbnail → arrow → token swatches (Loaffy Candy) → arrow → "this page". Cards reveal one by one (80ms stagger).

### §11 Outcome + learnings (both · Ship)
- **Outcome:** In private beta with invited designers and developers. *(launch: "Launched [date] on luci.pawprint.design.")*
- **Learnings** (3 short cards):
  1. Narrow beats complete. One accurate component is worth more than a whole-site dump.
  2. Agents need structure, not more words. Format design is product design.
  3. Building my own tool made me a better designer for developers.

### §12 CTA + next case (both)
Lilac ContactPanel (compact): "Want to try Luci?" → Request beta access (teaser) / Try Luci (launch) · "Or let's talk about your product" → Book a chat. Loaffy in bubble form. **NextCase:** Classic Decoder.

---

## 5. Visual production list

| ID | Visual | Owner | Teaser format | Launch format |
|---|---|---|---|---|
| V1 | Hero composition | Agent (SVG/HTML) | Illustration | Real UI screenshot or 8s loop |
| V2 | Problem diagram | Agent (SVG) | Illustration | same |
| V3 | Principle cards | Agent (components) | — | — |
| V4 | Toolbar anatomy | Lucas (export from Figma/Luci) | hidden | SVG/PNG with labels |
| V5a–e | Tool loops | Lucas (screen recordings) | hidden | MP4 + WebM, 1280×800, 6–8s, ≤ 2 MB each, poster PNG |
| V6 | Annotated design.md | Agent (code block + callouts) | real excerpt | same |
| V7 | Accessibility findings | Agent (table) | real data | same |
| V8 | Architecture diagram | Agent (SVG) | hidden | SVG |
| V9 | Feedback before/after | Agent (SVG) | hidden | SVG |
| V10 | Brand board | Lucas (Luci assets) | hidden | PNG/SVG |
| V11 | Timeline strip | Agent (BeanStepper) | hidden | — |
| V12 | Capture flow | Agent (components) | real data | same |
| OG | Share image | Agent (build-time) | Loaffy window form on lilac + "Luci · private beta" | "Luci · live" |

All visuals: `rounded-md`–`rounded-2xl`, 2px pen borders, sticker shadows, 4/8 grid, alt text per BRAND.md §9.

## 6. Real proof data (the only numbers allowed on this page)

From Luci exports Lucas made on 2026-11-23 (files in `docs/pawprint-kit/06-references/*.design.md`). On the page, V12 capture cards show **site name, sections and component kinds only**; the "Notable check" column appears only in V7, anonymised.

| Site | Sections found | Component kinds | Notable check |
|---|---|---|---|
| family.co | 16 | 5 | Footer text 1.71:1 — fails AA |
| tocaboca.com | 12 | 4 | Navigation 18.98:1 — AAA |
| atoms.dev | 3 | 7 | Brand button label 4.26:1 — fails AA |
| deno.com | 4 | 8 | Card label 2.12:1 — fails AA |
| dice.fm | 9 | 5 | Footer label 3.97:1 — fails AA |
| slush.app | 9 | 5 | Dot buttons 10.66 × 10.66px — fails target size |
| ko-fi.com | 1 capture | 7 | Form text 2.53:1 — flagged in Do's and Don'ts |
| mindmarket.com | 1 capture | 6 | — |

## 7. Never say on this page

- Competitor names. Say "the extractors I tried" / "feedback tools".
- Roadmap specifics, pricing or business model.
- Internal stack details, earlier internal tools, or "% complete".
- User counts, tester names or any number not in §6.
- Real UI screenshots while `visibility: "teaser"`.

## 8. MDX skeleton

```tsx
export const metadata = {
  title: "Luci", slug: "luci", order: 1, featured: true, status: "published",
  visibility: "teaser", badge: "Private beta",
  client: "Own product (Pawprint)",
  summary: "A toolbar that turns any part of any website into a design.md your AI coding agent can build from.",
  year: "2026", role: "Founder · Product designer · Builder", team: "Me, with AI coding agents",
  timeline: "2026 → private beta (Nov 2026)", platforms: ["Browser extension", "npm toolbar"],
  industry: "Design tools · AI", tags: ["Own product", "AI workflow", "Design systems"],
  tools: ["Figma", "AI coding agents"], tone: "lilac", form: "window",
  cover: "/case-studies/luci/hero", coverAlt: "Illustration of Luci's toolbar selecting a button on a web page and showing its design.md.",
  liveUrl: "https://luci.pawprint.design",
  cta: { teaser: { label: "Request beta access", href: "mailto:lucas@pawprint.design?subject=Luci%20beta" },
         full:   { label: "Try Luci", href: "https://luci.pawprint.design" } },
  tldr: { problem: "…", whatIDid: "…", outcome: "In private beta with invited designers and developers." },
  seo: { title: "Luci · Lucas (Wai Phyo Aung)", description: "How I designed and built Luci, a toolbar that turns any part of any website into a design.md for AI coding agents." },
};

<LuciHero />
<TLDR />
<Chapter step="understand" title="One button. Not the whole website."> … <ProblemDiagram /> <Callout tone="lilac">…</Callout></Chapter>
<Chapter step="shape" title="Five rules before any pixels"> <AudienceCards /> <PrincipleCards /> </Chapter>
<LaunchOnly><Chapter step="shape" title="How Luci works"> <ToolbarAnatomy /> <HowSteps /> </Chapter></LaunchOnly>
<Chapter step="design" title="A real export"> <AnnotatedExport /> <A11yFindings /> </Chapter>
<LaunchOnly><Chapter step="design" title="Key decisions"> <DecisionCard … /> ×5 </Chapter></LaunchOnly>
<LaunchOnly><Chapter step="design" title="A tool with a little personality"> <BrandBoard /> </Chapter></LaunchOnly>
<LaunchOnly><Chapter step="ship" title="How it was built"> <BuildTimeline /> </Chapter></LaunchOnly>
<Chapter step="ship" title="Luci built this portfolio"> <CaptureFlow /> </Chapter>
<Chapter step="ship" title="Where it is now"> <Outcome /> <Learnings /> </Chapter>
<CaseCTA />
```

## 9. Agent prompt (paste after the Session kickoff, in Phase 6)

```
Task — Build the Luci case study (/work/luci), the top featured case study.
Read: AGENTS.md, docs/pawprint-kit/03-ux/CASE-LUCI.md (all — it is the spec), IA.md §3–5, COMPONENTS.md §E, DESIGN.md, LOAFFY-ANIMATION.md §6.3, BRAND.md §4 and §11.
The real Luci exports are in docs/pawprint-kit/06-references/.

1. Content: create src/content/case-studies/luci.mdx from CASE-LUCI.md §8 (metadata) and the §4 copy. Validate with the zod schema (add visibility, badge and the two-mode cta to the schema).
2. Mode switch: <LaunchOnly> renders children only when metadata.visibility === "full". CTA, badge and OG text switch with the same value. Teaser mode must not ship launch-only content in the HTML at all (filter at build time, not CSS).
3. Components in src/components/case/luci/: LuciHero (V1 illustration as inline SVG/HTML with the load animation in §4 §1), ProblemDiagram (V2), AudienceCards + PrincipleCards (V3), ToolbarAnatomy (V4, launch), HowSteps (V5 rows with <Clip> placeholders, launch), AnnotatedExport (V6 — real excerpt, numbered margin callouts, no colour swatches), A11yFindings (V7 table from §6, anonymised labels), ArchitectureDiagram + FeedbackBeforeAfter (V8/V9, launch), BrandBoard (V10 slots for Lucas's assets, launch), BuildTimeline (V11, launch), CaptureFlow (V12 from §6 data), Outcome, Learnings, CaseCTA.
   Reuse existing primitives (Sticker, Card, Callout, DecisionCard, BeanStepper, BetaBadge, DeviceFrame, Clip, Heading). Section backgrounds per CASE-LUCI.md §3.
4. Luci's own colours (Muzzle White #F5EFEA, ink, ginger family) are allowed ONLY inside V1, V4, V5 and V10 frames — add them as scoped CSS variables in luci/ (e.g. --luci-surface), not to the global design system. Everything around them stays Loaffy Candy.
5. Loaffy: window form, 128px, peeking from the hero stage's top-right corner (outside the visual, no overlap with text); hidden in §8. Bubble form in §12.
6. Data: the §6 table lives in src/content/case-studies/luci/proof.ts; the page reads it. No other numbers anywhere.
7. Motion per §4 (outline draw, chip pop, line typing, staggered reveals) using src/lib/motion.ts presets; all on the 40ms grid; reduced motion = final frames.
8. SEO: metadata from §8, JSON-LD SoftwareApplication (name Luci, url, applicationCategory DesignApplication, author Person Lucas) + CreativeWork; build-time OG image per mode.
9. Make Luci the featured first CaseCard on Home and /work with the BetaBadge.
Check against CASE-LUCI.md §7 (never say) before you finish. Show me /work/luci in teaser mode, then temporarily in full mode, and list every placeholder left for me.
```

## 10. Acceptance

- [ ] Hero + TL;DR tell the whole story without scrolling at 1440×900; on mobile within two screens.
- [ ] Teaser build contains no launch-only content in the HTML (view source check).
- [ ] Only §6 numbers appear; nothing from §7 appears.
- [ ] Luci colours appear only inside V1/V4/V5/V10 frames.
- [ ] One character on screen at a time; Loaffy never overlaps text.
- [ ] Lighthouse: performance ≥ 95, accessibility 100; videos lazy-load with posters.
- [ ] Flipping `visibility` to `"full"` switches badge, CTA, OG text and reveals §5, §7, §8, §9.
