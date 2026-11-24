# Pages-split kit update, adjusted to this repo's decisions

- Date: 2026-11-24
- Status: accepted

## What
Copied the new kit files (`README.md`, `03-ux/IA.md`, `03-ux/CONTENT.md`, `04-build/PROMPTS.md`, new `04-build/PAGES-BUILD-STEPS.md`) into `docs/pawprint-kit/`, then changed three things in them:
1. **No availability copy (AGENTS.md rule 15 kept).** /contact has no "Open to remote roles in the US, Canada, NZ, Singapore" line, no availability sticker, and no relocation / notice / contract / work-rights FAQs. The sub is now "Email me, book a 30-minute chat, or find me on LinkedIn." The time-zone block shows Lucas's time next to the visitor's own time (from the browser) instead of a table of named regions.
2. **The full-page Header Menu stays** (commit `4efe235`). The kit's inline nav with a sliding ink pill and its separate mobile sheet are dropped; the current page gets `aria-current="page"` and its tag sticker stays shown in the menu.
3. **/about doesn't repeat Home's process.** "How I work" on /about is the 3 working principles plus a link to `/#process`; the step-by-step process lives on Home only.

Also: the About story draft says "delivered" (not "led") motion projects at Global Innovation Media, matching `src/content/site.ts` (rule 6: no invented facts).

## Why
Lucas reviewed the conflicts and chose: keep rule 15 ("do it for the best"), keep the current menu, and don't do the same thing on /about as on Home.

## Consequences
- The /about Shape card's cat-hand sketch (`2026-11-24-cat-hand-placements.md`, placement 5) goes away when PAGES-BUILD-STEPS Step 5 rebuilds /about. Pick another hand moment there then, or leave /about to Loaffy (chill lean).
- Existing /about copy "Works across US, Canada, NZ and Singapore time zones." breaks rule 15; Step 5 replaces it.

## Alternatives considered
- Lift rule 15 for /contact only: rejected, the rule was an explicit decision.
- Adopt the pill nav: rejected, the full-page menu was just built and approved.
- 4-step process on /about: still repeats Home in a different shape.
