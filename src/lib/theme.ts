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

export type ThemePreference = "light" | "dark" | "warm-dark" | "system";
export type ResolvedTheme = "light" | "dark" | "warm-dark";

export const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "lp-theme-change";

/**
 * Inline head script executed before first paint to prevent theme flash.
 * Per DESIGN.md §6:
 * - Stored in localStorage.theme ("light" | "dark" | "warm-dark" | "system", default "system")
 * - "system" resolves to "light" when OS is light, and "warm-dark" when OS is dark.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("theme")||"system";var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var r=(s==="light"||s==="dark"||s==="warm-dark")?s:(d?"warm-dark":"light");document.documentElement.setAttribute("data-theme",r);document.documentElement.setAttribute("data-theme-preference",s);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (next: ThemePreference, origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function resolveThemePreference(
  preference: ThemePreference,
  osPrefersDark: boolean
): ResolvedTheme {
  if (
    preference === "light" ||
    preference === "dark" ||
    preference === "warm-dark"
  ) {
    return preference;
  }
  return osPrefersDark ? "warm-dark" : "light";
}

function readStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (
      stored === "light" ||
      stored === "dark" ||
      stored === "warm-dark" ||
      stored === "system"
    ) {
      return stored;
    }
  } catch {
    // Ignore storage read errors
  }
  return "system";
}

function readResolvedTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  const pref = readStoredPreference();
  const osDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return resolveThemePreference(pref, osDark);
}

function applyDomTheme(
  preference: ThemePreference,
  resolved: ResolvedTheme
): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.setAttribute("data-theme-preference", preference);
}

function subscribeThemeStore(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMediaChange = () => {
    const pref = readStoredPreference();
    if (pref === "system") {
      applyDomTheme("system", resolveThemePreference("system", mql.matches));
      onStoreChange();
    }
  };

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY || e.key === null) {
      const pref = readStoredPreference();
      applyDomTheme(pref, resolveThemePreference(pref, mql.matches));
      onStoreChange();
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorageChange);
  mql.addEventListener("change", handleMediaChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorageChange);
    mql.removeEventListener("change", handleMediaChange);
  };
}

const getServerThemeSnapshot = (): ThemePreference => "system";
const getServerResolvedSnapshot = (): ResolvedTheme => "light";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeThemeStore,
    readStoredPreference,
    getServerThemeSnapshot
  );

  const resolvedTheme = useSyncExternalStore(
    subscribeThemeStore,
    readResolvedTheme,
    getServerResolvedSnapshot
  );

  useEffect(() => {
    applyDomTheme(theme, resolvedTheme);
  }, [theme, resolvedTheme]);

  const setTheme = useCallback((next: ThemePreference) => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const nextResolved = resolveThemePreference(next, mql.matches);

    const commitChange = () => {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore storage quota / private mode errors
      }
      applyDomTheme(next, nextResolved);
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    };

    const docWithVt = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };

    if (!reducedMotion && typeof docWithVt.startViewTransition === "function") {
      docWithVt.startViewTransition(() => {
        commitChange();
      });
    } else {
      commitChange();
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme() must be used inside <ThemeProvider>.");
  }
  return ctx;
}
