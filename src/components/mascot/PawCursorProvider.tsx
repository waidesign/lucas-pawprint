"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const PAW_CURSOR_STORAGE_KEY = "paw-cursor";
const PAW_CURSOR_CHANGE_EVENT = "lp-paw-cursor-change";

export interface PawCursorContextValue {
  enabled: boolean;
  isSupported: boolean;
  setEnabled: (next: boolean) => void;
  toggle: () => void;
}

const PawCursorContext = createContext<PawCursorContextValue | null>(null);

function checkCursorSupported(): boolean {
  if (typeof window === "undefined") return true;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const isReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return !isCoarse && !isReduced;
}

function readPawCursorEnabled(): boolean {
  if (typeof window === "undefined") return true;
  if (!checkCursorSupported()) return false;
  try {
    const stored = window.localStorage.getItem(PAW_CURSOR_STORAGE_KEY);
    if (stored === "off") return false;
    if (stored === "on") return true;
  } catch {
    // Ignore storage read errors
  }
  return true;
}

function applyDomPawCursor(enabled: boolean): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(
    "data-paw-cursor",
    enabled ? "on" : "off"
  );
}

function subscribePawCursor(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const coarseMql = window.matchMedia("(pointer: coarse)");
  const reducedMql = window.matchMedia("(prefers-reduced-motion: reduce)");

  const handleEnvChange = () => {
    applyDomPawCursor(readPawCursorEnabled());
    onStoreChange();
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === PAW_CURSOR_STORAGE_KEY || e.key === null) {
      handleEnvChange();
    }
  };

  window.addEventListener(PAW_CURSOR_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorage);
  coarseMql.addEventListener("change", handleEnvChange);
  reducedMql.addEventListener("change", handleEnvChange);

  return () => {
    window.removeEventListener(PAW_CURSOR_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorage);
    coarseMql.removeEventListener("change", handleEnvChange);
    reducedMql.removeEventListener("change", handleEnvChange);
  };
}

const getServerEnabledSnapshot = (): boolean => true;
const getServerSupportedSnapshot = (): boolean => true;

export function PawCursorProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(
    subscribePawCursor,
    readPawCursorEnabled,
    getServerEnabledSnapshot
  );

  const isSupported = useSyncExternalStore(
    subscribePawCursor,
    checkCursorSupported,
    getServerSupportedSnapshot
  );

  useEffect(() => {
    applyDomPawCursor(enabled && isSupported);
  }, [enabled, isSupported]);

  const setEnabled = useCallback((next: boolean) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        PAW_CURSOR_STORAGE_KEY,
        next ? "on" : "off"
      );
    } catch {
      // Ignore storage quota errors
    }
    const effective = next && checkCursorSupported();
    applyDomPawCursor(effective);
    window.dispatchEvent(new Event(PAW_CURSOR_CHANGE_EVENT));
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!readPawCursorEnabled());
  }, [setEnabled]);

  const value = useMemo<PawCursorContextValue>(
    () => ({
      enabled: enabled && isSupported,
      isSupported,
      setEnabled,
      toggle,
    }),
    [enabled, isSupported, setEnabled, toggle]
  );

  return createElement(PawCursorContext.Provider, { value }, children);
}

export function usePawCursor(): PawCursorContextValue {
  const ctx = useContext(PawCursorContext);
  if (!ctx) {
    throw new Error("usePawCursor() must be used inside <PawCursorProvider>.");
  }
  return ctx;
}
