# Page transitions, smooth in-page scroll, hydration-safe reduced motion

**Date:** 2026-11-25 · **Decided by:** Lucas (asked for all three; implementation chosen by Claude)

## Page transitions
- Every page change reuses the header menu's two-layer sticker-cut wipe:
  - A lilac lead layer and a paper sheet grow from the top-right corner, with wavy pen-outlined edges. The open timing is 800ms, and the sheet starts 160ms behind the lead.
  - The route changes under the cover.
  - The wipe then plays backwards (the menu's close timing) to reveal the new page.
- **Shared code:** the wipe lives in `src/components/site/stickerWipe.tsx` (`blobPath`, timings, `WipeOutline`), used by `HeaderMenu` and `PageTransition`, so they can't drift apart.
- **Mount point:** `PageTransition` is mounted once in `src/app/layout.tsx` and sits at `--z-toast`, above the menu and the header.
- **Link handling:** same-origin page links are intercepted in the capture phase.
  - Link's own `onClick` still runs (analytics, closing the menu); Next sees `defaultPrevented` and skips its own navigation.
  - The route is prefetched as soon as the cover starts.
- **Skipped:**
  - new-tab and modifier-key clicks
  - `download` links and external links (`mailto:`, `tel:`)
  - file paths (resume PDF)
  - same-page `#hash`/query links
  - links marked `data-no-transition`
- **Back/forward:** the URL has already changed, so the cover starts full (before paint) and only the uncover plays.
- **Reduced motion:** a 120ms paper fade, the same as the menu.
- **Safety:** if a navigation never lands, the cover lifts after 4s.
- **Not on first load:** Home has its own landing intro, and covering the first paint would hurt LCP.
- **Cost:** about 1.2s before the new URL and about 2s in total. To shorten it, change the shared timings in `stickerWipe.tsx` (the menu changes too).

## Smooth in-page scroll
- **What:** `SmoothAnchorScroll` (in the root layout) handles same-page `#hash` links.
  - It eases the scroll (ease-in-out, 480–960ms by distance, 40ms grid).
  - It lands below the sticky header, or at the target's `scroll-margin-top`.
  - It updates the hash and moves focus to the target (adding `tabindex="-1"` when needed).
  - Wheel, touch or scroll keys cancel it.
- **Reduced motion:** an instant jump with the same focus handling.
- **Opt-out:** `data-no-smooth` (the skip link uses it).
- **Why JS rather than CSS `scroll-behavior: smooth`:** Home's pinned GSAP ScrollTrigger forces `scroll-behavior: auto` on `<html>`, and Next would also smooth-scroll route changes to the top.

## Hydration-safe reduced motion
- **Problem:** Motion's `useReducedMotion()` reads `matchMedia` on the client's first render. For visitors who prefer reduced motion, the hydration render then differs from the static HTML (React #418, first seen in `Hero.tsx`).
- **Fix:** `src/lib/useReducedMotion.ts` uses `useSyncExternalStore`, which reports `false` while hydrating and the real value straight after. All 36 components now import it instead of Motion's hook.
