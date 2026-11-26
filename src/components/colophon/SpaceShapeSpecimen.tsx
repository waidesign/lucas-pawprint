import { cn } from "@/lib/cn";
import { RADIUS_TOKENS, SHADOW_TOKENS, SPACING_STEPS } from "./foundations-data";

const LABEL = "font-mono text-label uppercase tracking-wider text-text-muted";

/**
 * /colophon · Space, corners and shadows: the spacing ladder as bars, the radii as
 * butter shapes and the three sticker shadows (hover lifts them).
 * Rule 18: the shadow stickers are the section's one card group (token specimens);
 * bars and shapes are plain swatches.
 */
export function SpaceShapeSpecimen() {
  return (
    <div className="space-y-16">
      {/* Spacing */}
      <div className="space-y-6">
        <p className={LABEL}>Spacing · 4/8 grid, 0 to 160</p>
        <ul className="divide-y divide-line border-y border-line">
          {SPACING_STEPS.map((step) => (
            <li key={step} className="flex items-center gap-4 py-2">
              <code className="w-24 shrink-0 font-mono text-caption font-semibold text-text">
                space-{step}
              </code>
              <span className="w-16 shrink-0 font-mono text-caption text-text-muted">
                {step}px
              </span>
              <span className="min-w-0 flex-1">
                <span
                  aria-hidden="true"
                  className="block h-4 max-w-full rounded-xs bg-mint"
                  style={{ width: `var(--space-${step})` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Corners */}
      <div className="space-y-6">
        <p className={LABEL}>Corners · taken from the paw</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-7">
          {RADIUS_TOKENS.map((r) => (
            <li key={r.name} className="space-y-3">
              <span
                aria-hidden="true"
                className={cn(
                  "block h-20 border-2 border-line-strong bg-butter",
                  r.className,
                )}
              />
              <span className="block">
                <span className="block font-mono text-caption font-semibold text-text">
                  {r.name}
                </span>
                <span className="block font-mono text-caption text-text-muted">
                  {r.size === "9999" ? "pill" : `${r.size}px`}
                  {r.paw !== "—" ? ` · ${r.paw}` : ""}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sticker shadows */}
      <div className="space-y-6">
        <p className={LABEL}>Sticker shadows · solid offset, zero blur</p>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SHADOW_TOKENS.map((s) => (
            <li
              key={s.name}
              className={cn(
                "rounded-lg border-2 border-line-strong bg-sky p-6 text-on-pastel transition-transform motion-safe:hover:-translate-x-1 motion-safe:hover:-translate-y-1",
                s.className,
              )}
              style={{
                transitionDuration: "var(--duration-fast)",
                transitionTimingFunction: "var(--ease-out-soft)",
              }}
            >
              <code className="font-mono text-caption font-semibold">
                {s.name}
              </code>
              <p className="mt-4 font-display text-h4">Offset {s.offset}</p>
              <p className="mt-2 font-body text-body">{s.use}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
