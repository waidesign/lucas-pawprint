# Information Architecture · lucas.pawprint.design

## 1. Sitemap

```
lucas.pawprint.design
├── /                         Home
├── /work                     All case studies (filterable)
│   ├── /work/luci            ← lead case study (own product, open source, full)
│   ├── /work/classic-decoder
│   ├── /work/classic-decoder-app
│   ├── /work/vehicle-databases
│   ├── /work/detailed-vehicle-history
│   ├── /work/fierce-fight-gear
│   └── /work/sarayah-phuket-villas
├── /motion                   Showreel + motion pieces (+ Behance link)
├── /about                    Bio, changelog, how I work, kind words
├── /contact                  Email, book a chat, socials, time zones
├── /colophon                 How this site is built: tokens, type, Loaffy, a11y, stack
├── /resume.pdf               Static file (also linked as "Resume" everywhere)
└── 404                       Loaffy (Lost form)
```

Hidden / later: `/lab` (dev-only component gallery, `noindex`), `/loaffy` (mascot playground easter egg).

## 2. Navigation model

| Place | Items |
|---|---|
| Top nav (desktop) | Wordmark → `/` · Work · Motion · About · Contact · ThemeSwitch · **Resume** |
| Top nav (mobile) | Wordmark · Menu → full-screen sheet (Work, Motion, About, Contact, Resume, ThemeSwitch, socials) |
| Footer | Work · Motion · About · Contact · Colophon · Resume · LinkedIn · Behance · GitHub · Medium · ThemeSwitch · CursorToggle |
| Case study | Breadcrumb "Work / Classic Decoder" · sticky BeanStepper · NextCase at the end |
| 404 | Back home · See the work |

Rules: max 4 primary items. "Resume" is always one click away. Contact is reachable from every page (nav + footer + end of every case study).

## 3. Page templates

### Home (`/`) — a trailer for the whole site
The home page **previews** each area and hands off to its page. Every preview ends with a "See all …" link. Nothing on home is the only place something lives.

| # | Section | Visitor question | Shows on home | Hands off to |
|---|---|---|---|---|
| 1 | Hero | Who is this and what do they do? | Full hero | See selected work → `#work` |
| 2 | Proof strip | Are they real and experienced? | One line | Luci → `/work/luci` |
| 3 | Featured work | Can they do the work we need? | **3 cases**: Luci (large, featured) + 2 client cases (`homeFeatured: true`; default Classic Decoder, Fierce Fight Gear) | **See all work (7) →** `/work` |
| 4 | Process story (signature) | How do they think? | Full (lives on home) | — |
| 5 | Motion preview | Can they make things move well? | Showreel + 2 clips | **See all motion →** `/motion` |
| 6 | About (short) | What's their background? | Current short version, 3 changelog rows | **More about me →** `/about` |
| 7 | Kind words | What are they like to work with? | 1 pull quote (rotates between the two on reload) | All kind words → `/about#kind-words` |
| 8 | Contact panel | How do I reach them? | Copy email + Book a chat | **All the ways to reach me →** `/contact` |
| 9 | Footer | Where else can I go? | — | — |

Which client cases appear on home is a content switch (`homeFeatured: true` in the case's MDX metadata, max 2), so Lucas can swap them without code changes.

### Work index (`/work`)
1. **Page hero:** display-xl "Work." · one line: *Seven projects: one I founded, six I shipped for clients.* · filter chips (All · Own product · Web · Apps · Design systems · E-commerce · AI workflow) synced to `?tag=`, `aria-live` result count.
2. **Luci** full-width featured card (7/5 split, "Open source" badge).
3. **Client cases** as cover tiles (only the cover is framed) in a 2-column grid (1 column below lg), each its own pastel.
4. **Compact ContactPanel.**
Page Loaffy: window form, peeking from the hero's right edge.

### Case study (`/work/[slug]`)
Luci (`visibility: full`): "Open source" badge, "Try Luci" CTA to luci.pawprint.design, real product screenshots and recordings. No version numbers, release dates or star counts (AGENTS.md rule 7).

1. CaseHero (title, one-line summary, cover on pastel, Loaffy form peeking)
2. MetaRow (Role · Team · Timeline · Platform · Tools · Live link)
3. TL;DR stickers (Problem · What I did · Outcome)
4. Context (who the users are, what was broken)
5. Process — BeanStepper chapters: **Understand → Shape → Design → Ship**
6. Key decisions (3–5 DecisionCards: problem → decision → why, with before/after)
7. Design system highlights
8. Motion & interaction (short clips)
9. Outcome & learnings (qualitative; real facts only)
10. NextCase + ContactPanel (compact)

### Motion (`/motion`)
1. **Page hero:** display-xl "Motion." · *I started in video and animation. Now I use motion to explain products, not decorate them.* · Loaffy in the Vibing pose while the reel plays.
2. **Showreel:** VideoReel, 60–90s, captions, poster, plays on click (autoplay muted only when reduced motion is off).
3. **Work by type:** filter chips (All · Product UI · Brand & campaigns · Explainers · Video) over a grid of 6–12 clips; each card: looping preview on hover/focus, title, one line, role, tools. Clicking opens a dialog player (focus trap, Esc, captions).
4. **How I animate:** 4 bean steps — Storyboard → Animatic → Motion → Polish — one line each.
5. **Tools:** After Effects, Premiere Pro, Figma, Rive, Lottie (chips).
6. **More on Behance ↗** · compact ContactPanel.
Clip data lives in `src/content/motion.ts` (title, type, year, role, tools, poster, mp4, webm, captions). Placeholders until Lucas supplies files.

### About (`/about`)
1. **Page hero:** portrait (rounded-xl, 2px border) + display "Hi, I'm Lucas." + body-lg intro (2–3 lines) + Resume button + Loaffy in the Chill-lean pose.
2. **My story:** 3 short chapters with years — *Video and animation (2016–2020)* → *Motion design (2020–2022)* → *Product design and building my own tools (2022–now)*. Plain first person, 2–3 sentences each.
3. **Changelog:** full experience list (CONTENT.md), newest first, Luci on top.
4. **How I work:** the 3 working principles from CONTENT.md ("Measure before I design", "Design the system, not the screen", "Ship, then check twice"), each with one line `[Lucas's line]`, then a link **See the process, step by step →** to `/#process`. The step-by-step process lives on Home only; About does not repeat it (decision 2026-11-24).
5. **What I'm good at:** 4 index columns — Product design · Design systems · Motion · Building with AI — each with 3 concrete examples linking to case studies.
6. **Tools:** grouped chips (Design · Motion · Build).
7. **Kind words** (`#kind-words`): both full testimonials with pull quote + "Read the full note" disclosure.
8. **Beyond work** *(optional, Lucas fills or removes)*: `[2–3 things you enjoy outside work]`.
9. **Education:** B.Eng. (Hons) Civil Engineering, University of Wolverhampton — with one line on how engineering shapes how you design (`[your line]`).
10. **Compact ContactPanel.**

### Contact (`/contact`)
1. **Page hero:** display "Let's talk." · *Email me, book a 30-minute chat, or find me on LinkedIn.* · Loaffy in the bubble form. No availability sticker or text (AGENTS.md rule 15).
2. **Three ways** (3 index columns): **Email** — CopyEmail `lucas@pawprint.design` + mailto · **Book a 30-min chat** — cal.com (new tab) · **LinkedIn** — profile link.
3. **Time zones:** Lucas's live local time (Phuket, UTC+7, updates each minute, client-only) next to the visitor's own local time (read from the browser), with the overlap of working hours highlighted (Lucas's hours `[e.g. 09:00–18:00 — confirm]`). Computed with `Intl.DateTimeFormat`; no hard-coded offsets (handles daylight saving). No list of countries or regions (rule 15).
4. **What helps in a first message:** short list — role and team, time zone, timeline, link to the job post.
5. **Quick answers:** FAQ disclosures — response time `[placeholder]`. Lucas may add more, but none about availability, remote or relocation, notice period or work rights (rule 15).
6. **Elsewhere:** Behance, GitHub, Medium, Resume.
No form (static site): everything goes through email, cal.com or LinkedIn.

### Navigation and page transitions
- **Navigation is the full-page Header Menu** (`src/components/site/HeaderMenu.tsx`, kept by decision 2026-11-24): the menu button in the header opens a full-page sheet with a wavy, pen-outlined wipe; links slide up out of their masks (80ms stagger). The same menu on every screen size: no inline nav items, no sliding pill.
- Links are real routes (`/work`, `/motion`, `/about`, `/contact`). The current page's link has `aria-current="page"` and a visible current state (its pastel tag sticker stays shown).
- Tapping a link plays the menu's close, then the page transition.
- **Route change:** View Transitions (Next.js `viewTransition` support if enabled, otherwise Motion in `src/app/template.tsx`): old page fades and shifts −8px (200ms), new page rises 16px → 0 (280ms). The page's Loaffy plays `land` once (LOAFFY-ANIMATION.md §4.8). Reduced motion: instant swap.
- Scroll resets to top on route change, except Back/Forward, which restore position.
- Each page has its own `<h1>`, title, description, canonical and OG image (Loaffy in the page's pose).

| Page | Loaffy on that page |
|---|---|
| Home | Loaf pose outside the box (hero) |
| Work | Window form peek |
| Motion | Vibing (while reel plays) |
| About | Chill lean |
| Contact | Bubble form |

### Colophon (`/colophon`)
Live design system: palette (all themes), type scale, spacing, radius, shadows, motion tokens with demos, Loaffy expressions/poses/forms, cursor, component gallery, accessibility statement, tech stack, credits. Doubles as "portfolio as a product" proof.

## 4. URL and SEO rules

- Canonical domain: `https://lucas.pawprint.design`. 301 redirect `waiphyoaungdesign.vercel.app/*` → same path on the new domain.
- Lowercase, hyphenated slugs. No trailing slash.
- Each page: unique `<title>` ("Classic Decoder · Lucas (Wai Phyo Aung)"), meta description (≤ 155 chars), canonical, OG + Twitter tags, OG image generated per page (`next/og`) with Loaffy in the case's form and pastel.
- JSON-LD: `Person` on home/about (name "Wai Phyo Aung", alternateName "Lucas", jobTitle "Product & Motion Designer", email "lucas@pawprint.design", url, sameAs socials); `CreativeWork` on each case study; `SoftwareApplication` for Luci.
- `sitemap.xml` and `robots.txt` generated by Next.js.

## 5. Content model

### `src/content/case-studies/<slug>.mdx` — metadata export (validated with zod in `src/lib/schema.ts`)
`@next/mdx` has no frontmatter, so each file exports its metadata:
```tsx
export const metadata = {
  title: "Classic Decoder",
  slug: "classic-decoder",
  order: 2,                    // Luci = 1
  featured: false,             // Luci = true
  homeFeatured: true,          // show on the home page (max 2 client cases + Luci)
  status: "published",         // published | draft
  visibility: "full",          // full | teaser  (every case is full; Luci is public)
  badge: undefined,            // e.g. "Open source" for Luci
  client: "Classic Decoder",
  summary: "Full website redesign for a classic-car data platform, moved from WordPress to Next.js.",
  year: "2025",
  role: "Lead UI/UX & Motion Designer (Empire Pixel)",
  team: "Me, 1 PM, 2 full-stack developers",
  timeline: "4 months, discovery to hand-off",
  platforms: ["Web", "Mobile web"],
  industry: "Automotive",
  tags: ["Web", "Design systems"],
  tools: ["Figma", "Next.js", "After Effects"],
  tone: "sky",                 // lilac | mint | butter | sky | blush | pistachio
  form: "window",              // Loaffy form for this case
  cover: "/case-studies/classic-decoder/cover",   // optimiser adds .avif/.webp
  coverAlt: "Classic Decoder homepage on desktop and phone, showing the VIN search.",
  liveUrl: "https://classicdecoder.com",
  cta: undefined,              // Luci: { label: "Try Luci", href: "https://luci.pawprint.design" }
  tldr: { problem: "…", whatIDid: "…", outcome: "…" },   // outcome qualitative unless a real, sourced number exists
  seo: { title: "Classic Decoder · Lucas (Wai Phyo Aung)", description: "…" },
};
```
Body uses MDX components: `<Chapter step="understand|shape|design|ship">`, `<DecisionCard>`, `<Callout tone="butter">`, `<ImageGallery>`, `<Clip>`.
Loader: existing `src/lib/case-studies.ts` (`getCaseStudySlugs`, `getCaseStudyBySlug`, `getAllCaseStudies`) — extend to parse `metadata` with the zod schema, skip `_template.mdx` and `status: "draft"` in production, and sort by `order`.

### `src/content/site.ts`
```ts
export const profile = { name: "Lucas (Wai Phyo Aung)", short: "Lucas", title: "Product & Motion Designer", years: 10,
  email: "lucas@pawprint.design", bookingUrl: "https://cal.com/wai.design-start-a-virtual-chat",
  location: "Phuket, Thailand", timezone: "UTC+7", availability: "Open to remote roles · US · CA · NZ · SG",
  founderOf: { name: "Luci", url: "https://luci.pawprint.design", status: "Open source" },
  socials: { linkedin: "https://linkedin.com/in/waiphyoaung-design", behance: "https://www.behance.net/waiphyoaungdesign",
             github: "https://github.com/waidesign", medium: "https://medium.com/@waiphyoaung.design" } };
export const experience: { period: string; role: string; company: string; location: string; summary: string }[];
export const testimonials: { quote: string; pull: string; author: string; role: string; company: string; relationship: string }[];
export const education = { degree: "B.Eng. (Hons) Civil Engineering", school: "University of Wolverhampton" };
```

### Case order, tone and Loaffy form
See the table in `CONTENT.md` → Case studies (Luci first, lilac, window).
