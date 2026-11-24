"use client";

import {
  useTheme,
  type ThemePreference,
} from "@/lib/theme";
import { DesignSystemFoundations } from "@/components/colophon/DesignSystemFoundations";
import { LoaffyLabSection } from "./LoaffyLabSection";
import { ComponentsLabSection } from "./ComponentsLabSection";

const THEME_PREFERENCES: { id: ThemePreference; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "warm-dark", label: "Warm Dark" },
  { id: "system", label: "System" },
];

export function LabClient() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div className="min-h-full bg-bg text-text">
      {/* Sticky header with Theme Switcher */}
      <header className="sticky top-0 z-40 border-b-2 border-line-strong bg-bg px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-h4 text-text">
              lucas
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-3 w-2 rounded-pill border-2 border-line-strong bg-ginger align-baseline"
              />
            </span>
            <span className="rounded-pill border border-line bg-surface px-3 py-1 font-body text-caption text-text-muted">
              /lab · Phase 1 Foundations
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-body text-caption text-text-muted">
              Active: <strong className="text-text">{theme}</strong> (resolved:{" "}
              <strong className="text-text">{resolvedTheme}</strong>)
            </span>
            <div
              role="radiogroup"
              aria-label="Theme preference"
              className="flex flex-wrap items-center gap-1 rounded-pill border-2 border-line-strong bg-surface p-1 shadow-sticker-sm"
            >
              {THEME_PREFERENCES.map((opt) => {
                const active = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTheme(opt.id)}
                    className={`min-h-12 rounded-pill px-4 font-body text-button transition-colors duration-200 ${
                      active
                        ? "bg-inverse-bg text-inverse-text"
                        : "bg-transparent text-text hover:bg-surface-2"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto max-w-7xl space-y-16 px-4 py-12 md:px-8"
      >
        {/* Intro & Utility Verification Strip */}
        <section
          aria-labelledby="lab-intro-heading"
          className="rounded-xl border-2 border-line-strong bg-surface p-6 shadow-sticker md:p-8"
        >
          <p className="font-body text-label uppercase text-text-muted">
            Design System Verification · DESIGN.md v2.0
          </p>
          <h1
            id="lab-intro-heading"
            className="mt-2 font-display text-h1 text-text"
          >
            Foundations{" "}
            <span className="rounded-xs bg-lilac px-2 text-on-pastel">
              Laboratory
            </span>
          </h1>
          <p className="mt-4 max-w-2xl font-body text-body-lg text-text-muted">
            Inspect every token generated from design.md across Light, Dark and
            Warm Dark themes, fluid typography at 375 and 1440 viewports, the
            4/8 spacing grid, paw-derived radii, sticker shadows and 40ms-grid
            motion presets.
          </p>

          {/* TECH-STACK.md §3 required utility smoke strip */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <span className="rounded-pill border border-line bg-bg px-3 py-1 text-caption text-text">
              bg-bg
            </span>
            <span className="rounded-pill border border-line bg-surface px-3 py-1 text-caption text-text">
              bg-surface
            </span>
            <span className="rounded-pill border-2 border-line-strong bg-lilac px-3 py-1 text-caption text-on-pastel">
              bg-lilac + text-on-pastel
            </span>
            <span className="rounded-pill border border-line bg-lilac-soft px-3 py-1 text-caption text-text-muted">
              bg-lilac-soft + text-text-muted
            </span>
            <span className="rounded-xl border-2 border-line-strong bg-mint px-3 py-1 font-display text-caption text-on-pastel shadow-sticker">
              font-display + rounded-xl + shadow-sticker
            </span>
          </div>
        </section>

        <DesignSystemFoundations />

        {/* 8. Phase 2 — Loaffy, CatHand & PawCursor Gallery */}
        <LoaffyLabSection />

        {/* 9. Phase 3 — Core Components & Site Chrome Gallery */}
        <ComponentsLabSection />
      </main>
    </div>
  );
}
