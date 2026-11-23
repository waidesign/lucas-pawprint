# START HERE · Lucas's step-by-step guide

> Your project: `E:\Lucas\lucas.pawprint.design` (Next.js 16 foundation + Luci already in place).
> Your repo: `https://github.com/waidesign/lucas-pawprint` (created, not connected yet).
> Hosting: Cloudflare (later, at launch). Email: `lucas@pawprint.design` → `waiphyoaung.design@gmail.com` (set up at launch).

---

## Step 1 · Connect the local project to GitHub (today, 10 min)

Open PowerShell (or the VS Code terminal) and run:

```powershell
cd E:\Lucas\lucas.pawprint.design
git status
```

- If it says **"not a git repository"**: run `git init -b main`.
- Check `.gitignore` contains at least:
  ```
  node_modules/
  .next/
  out/
  .env*
  .wrangler/
  .open-next/
  ```
  If Luci treats `.luci/local/` as machine-only (it holds your local brain), add `.luci/local/` too. Keep `.luci/rules.md` and `.luci/context.md` committed.

```powershell
git add .
git commit -m "chore: foundation (Next.js 16, tokens pipeline, MDX, Motion, Rive, Luci)"
git remote add origin https://github.com/waidesign/lucas-pawprint.git
git push -u origin main
```

If the push is rejected because the GitHub repo already has a README or licence:
```powershell
git pull origin main --allow-unrelated-histories --no-edit
git push -u origin main
```

## Step 2 · Add this kit to the project (today, 5 min)

1. Unzip `pawprint-kit.zip` into `E:\Lucas\lucas.pawprint.design\docs\pawprint-kit\`.
2. Copy `docs\pawprint-kit\AGENTS.md` to the project root. Make `CLAUDE.md` point to it. In PowerShell, run as admin, or just copy the file:
   ```powershell
   Copy-Item docs\pawprint-kit\AGENTS.md AGENTS.md
   Copy-Item AGENTS.md CLAUDE.md
   ```
   If you copy instead of linking, re-copy `CLAUDE.md` whenever `AGENTS.md` changes.
3. Copy assets:
   ```powershell
   New-Item -ItemType Directory -Force public\loaffy, public\cursors | Out-Null
   Copy-Item -Recurse docs\pawprint-kit\05-assets\loaffy\* public\loaffy\
   Copy-Item docs\pawprint-kit\05-assets\loaffy\cursors\*.svg public\cursors\
   ```
4. Put your latest `resume.pdf` (≤ 1 MB) in `public\`.
5. Commit: `git add . ; git commit -m "docs: add pawprint kit, AGENTS.md, Loaffy assets" ; git push`.

## Step 3 · Build with your agent (one phase per branch)

For each phase in `04-build/PROMPTS.md`:

1. `git checkout -b phase-<n>-<name>` (e.g. `phase-1-foundations`).
2. Paste **Session kickoff** (PROMPTS.md §0.2), then the phase **Prompt**.
3. Read the agent's plan → reply "go".
4. Review using the phase's **Check** list (look at `/lab` and the routes in the browser at `npm run dev`).
5. Use the **Review** / **Fix** / **Polish** prompts until it meets **Done when**.
6. Commit, push, open a PR on GitHub, merge to `main`.

| Phase | What you get | Your input needed |
|---|---|---|
| 1 Foundations alignment | New design.md, 3 themes, 4/8 tokens, fonts, `/lab` | Approve `/lab` |
| 2 Loaffy | SVG Loaffy (Rive-ready), hand, paw cursor | Compare with the canvas |
| 3 Core components | Buttons, stickers, nav, footer… | Keyboard test |
| 4 Content | Luci + 6 case studies in MDX, no fake numbers | Fill `[placeholders]`, choose Luci screenshots |
| 5 Home | All home sections | Review copy |
| 6 Case studies | `/work` + 7 case pages | Read each one |
| 7 Process story | Signature scroll animation | Feel check |
| 8 Other pages | Motion, About, Contact, Colophon, 404 | Showreel file |
| 9 Launch | Cloudflare, domain, email, QA | Dashboard steps (Step 5 below) |

## Step 4 · Your Rive track (parallel, Phases 2–7)

Build `loaffy.riv` and `hand.riv` from `01-brand/LOAFFY-ANIMATION.md` (rig §3, timelines §4, state machine §3.3). Watch the live loops on the canvas **Animation kit** board for timing. Drop the files into `public\rive\`; the site switches from the SVG to Rive automatically (Phase 2 facade). Steps R1–R8 are in PROMPTS.md §R.

## Step 5 · Launch on Cloudflare (Phase 9)

Follow `04-build/DEPLOY-CLOUDFLARE.md`:
1. Agent makes the app a static export + `wrangler.jsonc` (§2).
2. You import the GitHub repo in Cloudflare **Workers & Pages** with builds for non-production branches on (§3), so every branch gets a preview URL.
3. You add the custom domain `lucas.pawprint.design` (§4).
4. You set up Email Routing `lucas@` → Gmail, and optionally Gmail "Send mail as" (§5).
5. You redirect the old Vercel site and update LinkedIn, Behance, CV and email signature (§6).

## Decisions made for you (change any time)

| Item | Decision |
|---|---|
| Case-study years, team, timeline | Filled with sensible values where the old repo had them; anything truly unknown stays `[placeholder]` for you to confirm in Phase 4 |
| Bio | Drafted in CONTENT.md in your voice; edit freely |
| Experience | "10 years in design" (2016 → now) |
| Email | `lucas@pawprint.design` everywhere on the site |
| Luci | Lead case study, shown as **teaser** (private beta) until public launch, with "Request beta access" |
| Hosting | Static export on Cloudflare Workers static assets (simplest, free, no adapter); switch to Cloudflare's Next.js adapter only if you ever need server features |
| Package manager | npm (what your project already uses) |
| Grid | Everything on multiples of 4/8; durations on 40ms steps |
