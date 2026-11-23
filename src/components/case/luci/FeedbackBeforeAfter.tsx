/**
 * FeedbackBeforeAfter (V9 in CASE-LUCI.md §4 §7):
 * - Inline SVG comparing three stacked repeated page headers (where agents drop some)
 *   versus Luci's single grouped feedback session header.
 */
export function FeedbackBeforeAfter() {
  return (
    <figure
      role="img"
      aria-label="Before and after diagram: three repeated page headers causing an agent to drop pages versus Luci's single session header grouping all pages together."
      className="rounded-md border-2 border-line-strong bg-surface p-4"
    >
      <svg
        viewBox="0 0 640 176"
        aria-hidden="true"
        className="h-auto w-full text-text"
      >
        {/* Left column: Before (3 repeated headers) */}
        <rect
          x="16"
          y="16"
          width="288"
          height="144"
          rx="12"
          fill="var(--lp-bg)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="32"
          y="40"
          fill="currentColor"
          fontSize="12"
          fontWeight="700"
          fontFamily="var(--font-mono)"
        >
          ✕ Repeated headers (agents drop pages)
        </text>

        <rect
          x="32"
          y="54"
          width="256"
          height="24"
          rx="6"
          fill="var(--color-blush)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text
          x="44"
          y="70"
          fill="var(--color-on-pastel)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          Header: Page /home · 2 notes
        </text>

        <rect
          x="32"
          y="86"
          width="256"
          height="24"
          rx="6"
          fill="var(--lp-surface)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.5"
        />
        <text
          x="44"
          y="102"
          fill="currentColor"
          fontSize="11"
          fontFamily="var(--font-mono)"
          opacity="0.55"
        >
          Header: Page /work · skipped
        </text>

        <rect
          x="32"
          y="118"
          width="256"
          height="24"
          rx="6"
          fill="var(--lp-surface)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.5"
        />
        <text
          x="44"
          y="134"
          fill="currentColor"
          fontSize="11"
          fontFamily="var(--font-mono)"
          opacity="0.55"
        >
          Header: Page /about · skipped
        </text>

        {/* Right column: After (1 grouped session header) */}
        <rect
          x="336"
          y="16"
          width="288"
          height="144"
          rx="12"
          fill="var(--lp-bg)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="352"
          y="40"
          fill="currentColor"
          fontSize="12"
          fontWeight="700"
          fontFamily="var(--font-mono)"
        >
          ✓ Luci: one grouped session header
        </text>

        <rect
          x="352"
          y="54"
          width="256"
          height="90"
          rx="8"
          fill="var(--color-mint)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="366"
          y="74"
          fill="var(--color-on-pastel)"
          fontSize="12"
          fontWeight="700"
          fontFamily="var(--font-mono)"
        >
          Session #1 · 3 pages grouped
        </text>
        <text
          x="374"
          y="96"
          fill="var(--color-on-pastel)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          ├─ /home (2 notes) ✓
        </text>
        <text
          x="374"
          y="114"
          fill="var(--color-on-pastel)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          ├─ /work (1 note) ✓
        </text>
        <text
          x="374"
          y="132"
          fill="var(--color-on-pastel)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          └─ /about (1 note) ✓
        </text>
      </svg>
    </figure>
  );
}
