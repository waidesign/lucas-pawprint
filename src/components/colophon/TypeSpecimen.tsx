import { cn } from "@/lib/cn";
import { TYPE_SCALE } from "./foundations-data";

/**
 * /colophon · Type: every text token as a live sample at its real (fluid) size, with
 * its font, size range (375 → 1440), line height and tracking beside it.
 * Plain ruled list, no cards (rule 18). Samples are `<p>`, not headings (rule 17).
 */
export function TypeSpecimen() {
  return (
    <ul className="border-t-2 border-line-strong">
      {TYPE_SCALE.map((spec) => (
        <li
          key={spec.role}
          className="grid grid-cols-1 gap-4 border-b border-line py-8 lg:grid-cols-12 lg:gap-8"
        >
          <div className="space-y-2 lg:col-span-3">
            <code className="inline-block rounded-xs bg-surface-2 px-2 py-1 font-mono text-caption font-semibold text-text">
              text-{spec.role}
            </code>
            <p className="font-body text-caption text-text-muted">
              {spec.fontLabel}
            </p>
            <p className="font-mono text-caption text-text-muted">
              {spec.rangeLabel}px · line {spec.lineHeightLabel}
            </p>
          </div>
          <p
            className={cn(
              "min-w-0 text-balance break-words text-text lg:col-span-9",
              spec.fontClass,
              spec.textClass,
            )}
          >
            {spec.sample}
          </p>
        </li>
      ))}
    </ul>
  );
}
