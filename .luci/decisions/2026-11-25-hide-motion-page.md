# Park /motion; Home #motion shows craft, not a reel

**Date:** 2026-11-25 · **Decided by:** Lucas (asked for it; layout chosen by Claude on his instruction to follow its recommendation)

## Decision
- `/motion` is hidden from the whole site for now: no showreel or clips are ready, and Lucas doesn't want to spend time on it yet.
- Home keeps a Motion section (`#motion`), but it proves understanding instead of showing a reel.

## What changed
- Route moved to `src/app/_motion/page.tsx` (private App Router folder: not routed, not exported). Code, `MotionCatalog` and `MOTION_CLIPS` are kept.
- Links removed: `PRIMARY_NAV_ITEMS` (footer, mobile menu), `HeaderMenu` (tags renumbered 01–03), About "What I'm good at → Motion" (now `/#motion` + Behance), `scripts/qa.mjs` default routes.
- `MotionReel` deleted; `MotionCraft` (Home) =
  1. h2 "Motion that explains." + `profile.motionIntro` + one primary button to Behance.
  2. Six principles (Easing, Timing, Anticipation, Follow-through, Staging, Reduced motion), each in a frame around a live demo running on the site's real duration/easing tokens (`durations`, `easings`, `springCalm`, `stagger` in `src/lib/motion.ts`). Plays once on scroll-in, Play/Replay re-runs it. Reduced motion: rests at the final pose, moves only when someone presses Play.
  3. Plain two-column close: "How I make it." (4 steps) and "Where it works." (feedback, orientation, guidance, character), with examples taken only from real work already on the site.
- Rule 18: the demo frames are the section's one card group (frames around live demos).

## To bring /motion back
Rename `src/app/_motion` → `src/app/motion`, restore the nav/menu/footer/About links and the qa route, and decide whether Home #motion links to it.

## Kit docs to update when Lucas approves
`docs/pawprint-kit/03-ux/IA.md` (Home row 5 + `/motion` section), `02-design-system/COMPONENTS.md` (`MotionReel` row → `MotionCraft`), `04-build/TECH-STACK.md` sections list.
