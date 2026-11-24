"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";

/**
 * Character stage (LOAFFY.md §3 / AGENTS.md rule 11): one character on screen at a time.
 *
 * Every Loaffy that is actually on show reports while it intersects the viewport.
 * The cat hand reads `useLoaffyOnScreen()` and only comes in while no Loaffy is
 * visible, and leaves early if one scrolls into view. The paw cursor is exempt.
 */

const onScreen = new Set<object>();
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function setOnScreen(token: object, visible: boolean) {
  const had = onScreen.has(token);
  if (visible === had) return;
  if (visible) onScreen.add(token);
  else onScreen.delete(token);
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return onScreen.size > 0;
}

function getServerSnapshot() {
  return false;
}

/** True while any Loaffy is on screen. */
export function useLoaffyOnScreen(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Report the element as a Loaffy on screen while it intersects the viewport.
 * `present: false` for a Loaffy that is mounted but hidden (e.g. a hover peek at rest).
 */
export function useLoaffyStagePresence(
  ref: RefObject<Element | null>,
  present = true,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || !present) return;

    const token = {};
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      setOnScreen(token, Boolean(entry?.isIntersecting));
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      setOnScreen(token, false);
    };
  }, [ref, present]);
}
