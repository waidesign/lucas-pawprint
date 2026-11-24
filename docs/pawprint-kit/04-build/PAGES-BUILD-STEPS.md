# Separate pages · step by step (before Phase 9)

> Goal: **Work, Motion, About and Contact** are full pages with animated navigation; the home page becomes a trailer that shows 3 featured cases, a motion preview, a short About and a contact panel, each with a "See all …" link.
> Spec: `docs/pawprint-kit/03-ux/IA.md` §3 (Home, Work, Motion, About, Contact, Navigation and page transitions) + `03-ux/CONTENT.md` (About/Contact drafts).
> Same rhythm as the Luci steps: **one prompt per session**, check, commit.

---

## Step 0 · Prepare (you, 5 min)

1. ~~Copy from the latest kit~~ Done 2026-11-24: `03-ux/IA.md`, `03-ux/CONTENT.md`, `04-build/PAGES-BUILD-STEPS.md` (plus README and PROMPTS) are in the repo, adjusted to this repo's decisions (no availability copy, full-page Header Menu kept, About doesn't repeat the process; see `.luci/decisions/2026-11-24-pages-split-kit-update.md`).
2. Commit or merge any open branch first (e.g. `feat-cathand-choreography`), then:
   ```powershell
   git checkout main ; git pull
   git checkout -b feat-pages-split
   git add docs/pawprint-kit ; git commit -m "docs: separate pages plan" ; git push -u origin feat-pages-split
   ```

## Step 1 · Navigation and page transitions (session A)

```
Task — Pages split, step 1: navigation and page transitions. Read AGENTS.md, IA.md §2 and §3 "Navigation and page transitions", LOAFFY-ANIMATION.md §4.8, DESIGN.md §5.
1. Keep the full-page Header Menu (HeaderMenu.tsx) as the only navigation, on every screen size: no inline nav items, no sliding pill. Its links are real routes: /work, /motion, /about, /contact. The current page's link gets aria-current="page" and a visible current state (its pastel tag sticker stays shown).
2. Page transitions in src/app/template.tsx (or Next.js viewTransition if it's enabled and works with our static export): old page fades + shifts -8px (200ms), new page rises 16px → 0 (280ms). Reduced motion: instant.
3. On route change, the page's Loaffy plays "land" once (via LoaffyBus). Scroll to top on new navigation; Back/Forward restore position.
4. Header Menu: tapping a link plays the menu's close first, then navigates; focus lands on the new page's h1 or main (not back on the menu button).
5. /motion, /about and /contact already exist; only create a shell (h1 + title + description) for any that is missing.
Show me the menu on desktop and mobile, then a Back/Forward test.
```
**Check:** current page marked in the menu · no flash between pages · Back keeps your scroll position · keyboard focus lands on the new page's `<h1>` or main.
Commit: `feat(nav): route pages + transitions`.

## Step 2 · Home becomes a trailer (session B)

```
Task — Pages split, step 2: trim the home page. Read IA.md §3 Home (table) and CONTENT.md "Home previews".
1. Add homeFeatured (boolean) to the case-study zod schema. Set it true for classic-decoder and fierce-fight-gear; Luci always shows as the large featured card.
2. Featured work on home: Luci (large) + the 2 homeFeatured cases, then a "See all work (7) →" link to /work. Count comes from the data, not hard-coded.
3. Motion preview: showreel + 2 clips (first 2 from src/content/motion.ts, create the file with placeholders if missing) + "See all motion →".
4. About (short): keep as is, show only the 3 newest changelog rows, add "More about me →" to /about.
5. Kind words: one pull quote (pick one at build time or on mount, no layout shift) + "All kind words →" to /about#kind-words.
6. Contact panel: keep, add "All the ways to reach me →" to /contact.
7. Process story stays untouched.
Show me the home page at 375 and 1440 and the new links working.
```
**Check:** home is noticeably shorter · every preview links to its page · nothing exists only on home.
Commit: `feat(home): trailer layout with page links`.

## Step 3 · Work page polish (session C) — Replaced by `LAYOUT-STEPS.md` (Step 4)

```
Task — Pages split, step 3: /work. Read IA.md §3 Work index.
/work already exists. Make it match: page hero (display-xl "Work." + "Seven projects: one I founded, six I shipped for clients." + filter chips synced to ?tag= with aria-live count), Luci full-width featured card, client cases in a 2-column grid (1 below lg), compact ContactPanel, Loaffy window form peeking from the hero's right edge. Count text comes from the data.
```
Commit: `feat(work): page hero + layout`.

## Step 4 · Motion page (session D) — Replaced by `LAYOUT-STEPS.md` (Step 6)

```
Task — Pages split, step 4: /motion. Read IA.md §3 Motion, LOAFFY-ANIMATION.md §4.14 and §6.5 (reel → vibing), COMPONENTS.md VideoReel.
1. src/content/motion.ts: typed clips (title, type: "product-ui" | "brand" | "explainer" | "video", year, role, tools[], poster, mp4, webm, captions). Use clearly marked placeholders until I add files — no invented titles or clients.
2. Page: hero (display-xl "Motion." + intro line + Loaffy that switches to the vibing pose while the reel plays), Showreel (click to play, captions, poster), filter chips by type + clip grid (preview loops on hover/focus only, dialog player with focus trap + Esc), "How I animate" 4 bean steps (Storyboard → Animatic → Motion → Polish), tools chips, "More on Behance ↗", compact ContactPanel.
3. Videos lazy-load; nothing autoplays with sound; reduced motion = posters only until clicked.
```
Commit: `feat(motion): motion page`.

## Step 5 · About page (session E) — Replaced by `LAYOUT-STEPS.md` (Step 5)

```
Task — Pages split, step 5: /about. Read IA.md §3 About and CONTENT.md "About page" drafts + Changelog + Kind words.
Build the 10 sections in order: hero (portrait slot at public/about/portrait — placeholder frame if missing, "Hi, I'm Lucas.", intro, Resume button, Loaffy chill-lean pose), My story (3 chapters with years), full Changelog (Luci on top), How I work (the 3 working principles + "See the process, step by step →" to /#process; do NOT repeat Home's step-by-step process), What I'm good at (4 cards, each with 3 links to real case studies), Tools (grouped chips), Kind words (id="kind-words", both full testimonials with disclosure), Beyond work (placeholder — render only if I fill it), Education (+ my line placeholder), compact ContactPanel.
Use the copy exactly as drafted; keep [placeholders] visible only in dev, hidden in production builds.
```
Commit: `feat(about): about page`.

## Step 6 · Contact page (session F) — Replaced by `LAYOUT-STEPS.md` (Step 7)

```
Task — Pages split, step 6: /contact. Read IA.md §3 Contact and CONTENT.md "Contact page" drafts.
1. Hero: "Let's talk." + sub + Loaffy bubble form. No availability sticker or text anywhere (AGENTS.md rule 15).
2. Three cards: Email (CopyEmail lucas@pawprint.design + mailto), Book a 30-min chat (cal.com, new tab), LinkedIn.
3. Time zones (client component): my live local time in Phuket (updates each minute) next to the visitor's own local time from the browser, with our working-hours overlap highlighted. Computed with Intl.DateTimeFormat (no hard-coded offsets), no list of countries or regions. Server render shows a static fallback line so there's no layout shift.
4. First-message tips list, Quick answers (FAQ disclosures, no availability questions — hide any answer still in [brackets] in production), Elsewhere links (Behance, GitHub, Medium, Resume).
No form.
```
Commit: `feat(contact): contact page`.

## Step 7 · SEO + QA for the new pages (session G)

```
Task — Pages split, step 7: SEO and QA. Read IA.md §4, TECH-STACK.md §4–5, AGENTS.md §7.
1. Each page (/work, /motion, /about, /contact): unique title, description, canonical, build-time OG image with Loaffy in the page's pose (IA.md table), JSON-LD where relevant (Person on /about). Update sitemap.
2. axe in Light/Dark/Warm Dark on all 5 pages, Lighthouse mobile on all 5, keyboard-only run through the nav and every page.
3. Report numbers per page and list every placeholder left for me.
```
**Check:** 0 axe violations · Performance ≥ 95, Accessibility 100 on every page.
Open a PR → merge `feat-pages-split` into `main`. Then continue with **Phase 9 (launch)**.

---

## What you need to provide (any time before launch)

| Item | For | Where |
|---|---|---|
| Showreel (60–90s) + 6–12 clips with titles/roles | /motion, home preview | `public/motion/` + `src/content/motion.ts` |
| Portrait photo (warm, natural light) | /about hero | `public/about/portrait.jpg` |
| Your edits to the About story, Beyond work, education line | /about | CONTENT.md drafts |
| FAQ answers (reply time; nothing about availability — rule 15) · your working hours for the time-zone overlap | /contact | CONTENT.md drafts |
| Swap featured cases if you like | home | `homeFeatured` in the case MDX |
