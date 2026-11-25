"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  blobPath,
  LEAD_PHASE_OFFSET,
  PAGE_LEAD_CLOSE as LEAD_CLOSE,
  PAGE_LEAD_OPEN as LEAD_OPEN,
  PAGE_SHEET_CLOSE as SHEET_CLOSE,
  PAGE_SHEET_OPEN as SHEET_OPEN,
  WipeOutline,
} from "@/components/site/stickerWipe";
import { setPageTransitionPhase } from "@/lib/pageTransitionStore";

type Phase = "idle" | "covering" | "covered" | "revealing";

const Z = "var(--z-toast)";
/* Reduced motion: a short paper fade instead of the wipe (same as the header menu). */
const FADE = { duration: 0.12 } as const;
/* If a navigation never lands (offline, error), uncover anyway. */
const NAV_TIMEOUT_MS = 4000;

/** Same-origin page link that should get the transition, or null to let the browser/Next handle it. */
function transitionTarget(e: MouseEvent): URL | null {
  if (e.defaultPrevented || e.button !== 0) return null;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const anchor = (e.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download") || anchor.dataset.noTransition !== undefined) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null; // external, mailto:, tel:
  if (url.pathname === window.location.pathname) return null; // same page: #hash / query
  if (/\.[a-z0-9]+$/i.test(url.pathname)) return null; // files (resume PDF, images)
  return url;
}

/**
 * PageTransition: every page change plays the header menu's two-layer sticker-cut wipe.
 * - Link click: the lilac lead + paper sheet sweep in from the top-right corner (cover),
 *   the route changes underneath, then the wipe plays backwards (uncover).
 * - Back/forward (URL already changed): starts covered and plays the uncover.
 * - Reduced motion: a 120ms paper fade instead of the wipe.
 * Clicks are intercepted in the capture phase, so Link's own onClick handlers (analytics,
 * closing the menu) still run; Link sees `defaultPrevented` and skips its own navigation.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const prevPathRef = useRef(pathname);
  const controlsRef = useRef<AnimationPlaybackControls[]>([]);
  const timeoutRef = useRef<number | null>(null);

  const lead = useMotionValue(0);
  const sheet = useMotionValue(0);
  const fade = useMotionValue(0);
  const leadD = useTransform(lead, (p) => blobPath(p, LEAD_PHASE_OFFSET));
  const sheetD = useTransform(sheet, (p) => blobPath(p));

  const uid = useId().replace(/:/g, "");
  const leadMaskId = `page-wipe-lead-${uid}`;
  const sheetMaskId = `page-wipe-sheet-${uid}`;

  const go = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
    setPageTransitionPhase(next); // lets hero animations wait for the uncover
  }, []);

  const stopAll = useCallback(() => {
    controlsRef.current.forEach((c) => c.stop());
    controlsRef.current = [];
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reveal = useCallback(async () => {
    stopAll();
    // Let the new page paint under the cover first, then uncover. Hero animations start
    // with the uncover ("revealing"), so they play while the wipe lifts.
    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    go("revealing");
    const controls = prefersReduced
      ? [animate(fade, 0, FADE)]
      : [animate(sheet, 0, SHEET_CLOSE), animate(lead, 0, LEAD_CLOSE)];
    controlsRef.current = controls;
    await Promise.all(controls);
    if (phaseRef.current === "revealing") go("idle");
  }, [fade, go, lead, prefersReduced, sheet, stopAll]);

  const cover = useCallback(
    async (url: URL) => {
      const href = url.pathname + url.search + url.hash;
      router.prefetch(url.pathname + url.search);
      stopAll();
      go("covering");
      const controls = prefersReduced
        ? [animate(fade, 1, FADE)]
        : [animate(lead, 1, LEAD_OPEN), animate(sheet, 1, SHEET_OPEN)];
      controlsRef.current = controls;
      await Promise.all(controls);
      if (phaseRef.current !== "covering") return;
      go("covered");
      router.push(href);
      timeoutRef.current = window.setTimeout(() => {
        if (phaseRef.current === "covered") void reveal();
      }, NAV_TIMEOUT_MS);
    },
    [fade, go, lead, prefersReduced, reveal, router, sheet, stopAll],
  );

  // Intercept internal page links (capture phase, before Next's Link handler).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const url = transitionTarget(e);
      if (!url) return;
      e.preventDefault();
      if (phaseRef.current === "covering" || phaseRef.current === "covered") return;
      void cover(url);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [cover]);

  // Route landed: uncover. If we didn't cover (back/forward), start covered — before paint.
  useLayoutEffect(() => {
    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;
    if (phaseRef.current !== "covered" && phaseRef.current !== "covering") {
      stopAll();
      lead.set(1);
      sheet.set(1);
      fade.set(1);
      go("covered"); // hero animations wait for the uncover, as on link clicks
    }
    void reveal();
  }, [fade, go, lead, pathname, reveal, sheet, stopAll]);

  useEffect(() => stopAll, [stopAll]);

  if (phase === "idle") return null;

  if (prefersReduced) {
    return (
      <motion.div
        aria-hidden="true"
        style={{ zIndex: Z, opacity: fade }}
        className="pointer-events-none fixed inset-0 bg-bg"
      />
    );
  }

  return (
    <>
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <clipPath id={leadMaskId} clipPathUnits="objectBoundingBox">
            <motion.path d={leadD} />
          </clipPath>
          <clipPath id={sheetMaskId} clipPathUnits="objectBoundingBox">
            <motion.path d={sheetD} />
          </clipPath>
        </defs>
      </svg>
      <div
        aria-hidden="true"
        style={{ zIndex: Z, clipPath: `url(#${leadMaskId})` }}
        className="pointer-events-none fixed inset-0 bg-lilac"
      />
      <WipeOutline d={leadD} zIndex={Z} />
      <div
        aria-hidden="true"
        style={{ zIndex: Z, clipPath: `url(#${sheetMaskId})` }}
        className="pointer-events-none fixed inset-0 bg-bg"
      />
      <WipeOutline d={sheetD} zIndex={Z} />
    </>
  );
}
