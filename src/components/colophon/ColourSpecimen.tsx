"use client";

import { useEffect, useRef, useState } from "react";
import type { ResolvedTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";
import {
  CHARACTER_TOKENS,
  PASTEL_TOKENS,
  RESOLVED_THEMES,
  THEME_ROLES,
} from "./foundations-data";

const LABEL = "font-mono text-label uppercase tracking-wider text-text-muted";

/** Theme roles shown per column; the six section tints are listed once under pastels. */
const CORE_ROLES = THEME_ROLES.filter((r) => !r.role.endsWith("-soft"));

/**
 * /colophon · Colour: the theme roles rendered live in Light, Dark and Warm Dark side
 * by side (each column scoped with its own `data-theme`), then the six pastels and the
 * character-only palette. Hex values are read from the live CSS variables.
 * Rule 18: the three theme columns are the section's one card group (token specimens);
 * pastel and character swatches are plain swatches, not cards.
 */
export function ColourSpecimen() {
  const themeRefs = useRef<Record<ResolvedTheme, HTMLElement | null>>({
    light: null,
    dark: null,
    "warm-dark": null,
  });
  const [themeHex, setThemeHex] = useState<
    Record<ResolvedTheme, Record<string, string>>
  >({ light: {}, dark: {}, "warm-dark": {} });
  const [staticHex, setStaticHex] = useState<Record<string, string>>({});

  useEffect(() => {
    const next: Record<ResolvedTheme, Record<string, string>> = {
      light: {},
      dark: {},
      "warm-dark": {},
    };
    for (const t of RESOLVED_THEMES) {
      const el = themeRefs.current[t.id];
      if (!el) continue;
      const styles = window.getComputedStyle(el);
      for (const spec of CORE_ROLES) {
        next[t.id][spec.cssVar] = styles.getPropertyValue(spec.cssVar).trim();
      }
    }
    const root = window.getComputedStyle(document.documentElement);
    const nextStatic: Record<string, string> = {};
    for (const p of [...PASTEL_TOKENS, ...CHARACTER_TOKENS]) {
      nextStatic[p.cssVar] = root.getPropertyValue(p.cssVar).trim();
    }
    // Reading computed CSS variables needs the DOM, so it runs after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeHex(next);
    setStaticHex(nextStatic);
  }, []);

  return (
    <div className="space-y-16">
      {/* Theme roles × 3 themes */}
      <div className="space-y-6">
        <p className={LABEL}>Theme roles · Light, Dark, Warm Dark</p>
        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {RESOLVED_THEMES.map((t) => (
            <li
              key={t.id}
              ref={(el) => {
                themeRefs.current[t.id] = el;
              }}
              data-theme={t.id}
              className="rounded-lg border-2 border-line-strong bg-bg p-6 text-text shadow-sticker-sm"
            >
              <div className="flex items-center justify-between gap-4 border-b-2 border-line-strong pb-4">
                <p className="font-display text-h4 text-text">{t.label}</p>
                <code className="font-mono text-caption text-text-muted">
                  data-theme=&quot;{t.id}&quot;
                </code>
              </div>
              <ul className="divide-y divide-line">
                {CORE_ROLES.map((spec) => (
                  <li key={spec.role} className="flex items-center gap-3 py-2">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-8 shrink-0 rounded-xs border-2 border-line-strong",
                        spec.bgClass,
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-caption font-semibold text-text">
                        {spec.role}
                      </span>
                      <span className="block font-body text-caption text-text-muted">
                        {spec.use}
                      </span>
                    </span>
                    <code className="shrink-0 font-mono text-caption text-text-muted">
                      {themeHex[t.id]?.[spec.cssVar] || "…"}
                    </code>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Pastels */}
      <div className="space-y-6">
        <p className={LABEL}>Pastels · the same in every theme</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-7">
          {PASTEL_TOKENS.map((item) => (
            <li key={item.name} className="space-y-3">
              <span
                aria-hidden="true"
                className={cn(
                  "block h-20 rounded-sm border-2 border-line-strong",
                  item.bgClass,
                )}
              />
              <span className="block">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-caption font-semibold text-text">
                    {item.name}
                  </span>
                  <code className="font-mono text-caption text-text-muted">
                    {staticHex[item.cssVar] || "…"}
                  </code>
                </span>
                <span className="mt-1 block font-body text-caption text-text-muted">
                  {item.role}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Character palette */}
      <div className="space-y-6 border-t border-line pt-12">
        <div className="space-y-2">
          <p className={LABEL}>Character palette</p>
          <p className="max-w-[var(--prose-max)] font-body text-body text-text-muted">
            Ginger belongs to Loaffy and the wordmark bean. It never appears on
            buttons, links, focus rings or backgrounds.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
          {CHARACTER_TOKENS.map((item) => (
            <li key={item.name} className="space-y-3">
              <span
                aria-hidden="true"
                className={cn(
                  "block h-12 rounded-sm border-2 border-line-strong",
                  item.bgClass,
                )}
              />
              <span className="block">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-caption font-semibold text-text">
                    {item.name}
                  </span>
                  <code className="font-mono text-caption text-text-muted">
                    {staticHex[item.cssVar] || "…"}
                  </code>
                </span>
                <span className="mt-1 block font-body text-caption text-text-muted">
                  {item.role}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
