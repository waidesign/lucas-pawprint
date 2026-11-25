"use client";

import { useSyncExternalStore } from "react";

export type PageTransitionPhase = "idle" | "covering" | "covered" | "revealing";

let phase: PageTransitionPhase = "idle";
const listeners = new Set<() => void>();

/** Set by <PageTransition>; everything else only reads it. */
export function setPageTransitionPhase(next: PageTransitionPhase) {
  if (next === phase) return;
  phase = next;
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

const isReady = () => phase === "idle" || phase === "revealing";

/**
 * True once the new page is visible: always on a first load, and during a client-side
 * navigation from the moment the wipe starts uncovering. Mount-triggered hero animations
 * wait for it, so they play as the page is revealed instead of hidden under the cover.
 */
export function useRevealReady(): boolean {
  return useSyncExternalStore(subscribe, isReady, () => true);
}
