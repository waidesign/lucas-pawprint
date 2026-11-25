"use client";

import { useEffect } from "react";
import { animate, type AnimationPlaybackControls } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EASE_IN_OUT } from "@/components/site/stickerWipe";

/* Duration grows with distance but stays subtle: 480–960ms on the 40ms grid. */
const MIN_S = 0.48;
const MAX_S = 0.96;
const PX_PER_S = 2400;

function durationFor(distance: number) {
  const s = Math.min(MAX_S, Math.max(MIN_S, Math.abs(distance) / PX_PER_S));
  return Math.round(s / 0.04) * 0.04;
}

/** Offset below the sticky header: the target's own scroll-margin-top, else the header height. */
function topOffset(target: HTMLElement) {
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  if (margin > 0) return margin;
  return document.querySelector("header")?.getBoundingClientRect().height ?? 0;
}

/**
 * SmoothAnchorScroll: same-page `#hash` links glide to their section instead of jumping.
 * - Eased (ease-in-out) scroll, 480–960ms by distance; any wheel/touch/key input cancels it.
 * - Lands below the sticky header, updates the URL hash, and moves focus to the target
 *   (without scrolling again) so keyboard and screen-reader users land there too.
 * - Reduced motion: instant jump, same focus handling.
 * - Opt out with `data-no-smooth` (the skip link keeps its instant jump).
 * Done in JS rather than CSS `scroll-behavior` because Home's pinned GSAP ScrollTrigger
 * forces `scroll-behavior: auto` on <html>, and Next would smooth route-change scrolls too.
 */
export function SmoothAnchorScroll() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let controls: AnimationPlaybackControls | null = null;
    const cancel = () => {
      controls?.stop();
      controls = null;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.dataset.noSmooth !== undefined) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(anchor.href, window.location.href);
      const here = window.location;
      if (url.origin !== here.origin || url.pathname !== here.pathname) return;
      if (url.search !== here.search || !url.hash) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      cancel();

      const from = window.scrollY;
      const to = Math.max(
        0,
        target.getBoundingClientRect().top + from - topOffset(target),
      );

      const finish = () => {
        if (window.location.hash !== url.hash) {
          window.history.pushState(window.history.state, "", url.hash);
        }
        if (!target.hasAttribute("tabindex") && !target.matches("a, button, input, select, textarea")) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });
      };

      if (prefersReduced || Math.abs(to - from) < 2) {
        window.scrollTo({ top: to, behavior: "instant" });
        finish();
        return;
      }

      controls = animate(from, to, {
        duration: durationFor(to - from),
        ease: EASE_IN_OUT,
        onUpdate: (y) => window.scrollTo({ top: y, behavior: "instant" }),
        onComplete: () => {
          controls = null;
          finish();
        },
      });
    };

    const interruptKeys = new Set([
      "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ",
    ]);
    const onKey = (e: KeyboardEvent) => {
      if (interruptKeys.has(e.key)) cancel();
    };

    // Capture phase: runs before Next's <Link> handler, which would otherwise jump instantly.
    document.addEventListener("click", onClick, true);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancel();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", onKey);
    };
  }, [prefersReduced]);

  return null;
}
