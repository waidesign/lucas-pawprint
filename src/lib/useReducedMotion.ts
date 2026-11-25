"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/* The static export is rendered without knowing the visitor's preference, so the
   server (and the hydration pass) must say "no preference" too. */
const getServerSnapshot = () => false;

/**
 * Hydration-safe `prefers-reduced-motion`.
 *
 * Motion's `useReducedMotion()` reads `matchMedia` on the client's first render, so for
 * visitors who prefer reduced motion the hydration render differs from the static HTML
 * (different `initial` states, intro phases, extra buttons) and React throws a hydration
 * mismatch. `useSyncExternalStore` renders with the server snapshot (`false`) while
 * hydrating, then re-renders immediately with the real value and keeps it in sync.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
