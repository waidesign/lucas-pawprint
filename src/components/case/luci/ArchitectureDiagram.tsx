/**
 * ArchitectureDiagram (V8 in CASE-LUCI.md §4 §7):
 * - Inline SVG showing one shared core box ("Shared toolbar core")
 *   branching to two thin shells ("Browser extension" → "any website" and
 *   "npm package" → "your project").
 * - Strict 4/8 grid geometry and type sizes (12px / 16px).
 */
export function ArchitectureDiagram() {
  return (
    <figure
      role="img"
      aria-label="Architecture diagram: one shared toolbar core connecting to two thin shells — a browser extension for any website and an npm package for your project."
      className="rounded-md border-2 border-line-strong bg-surface p-4"
    >
      <svg
        viewBox="0 0 640 160"
        aria-hidden="true"
        className="h-auto w-full text-text"
      >
        {/* Left: Shared core box */}
        <rect
          x="16"
          y="48"
          width="176"
          height="64"
          rx="16"
          fill="var(--color-lilac)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="104"
          y="76"
          textAnchor="middle"
          fill="var(--color-on-pastel)"
          fontSize="16"
          fontWeight="700"
          fontFamily="var(--font-display)"
        >
          Shared core
        </text>
        <text
          x="104"
          y="96"
          textAnchor="middle"
          fill="var(--color-on-pastel)"
          fontSize="12"
          fontFamily="var(--font-mono)"
        >
          1 UI · 1 exporter
        </text>

        {/* Branch arrows from core to the two shells */}
        <path
          d="M192,72 C220,72 220,40 248,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M192,88 C220,88 220,120 248,120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Top shell: Browser extension */}
        <rect
          x="248"
          y="16"
          width="168"
          height="48"
          rx="12"
          fill="var(--lp-bg)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="332"
          y="44"
          textAnchor="middle"
          fill="currentColor"
          fontSize="12"
          fontWeight="600"
          fontFamily="var(--font-body)"
        >
          Browser extension
        </text>

        {/* Bottom shell: npm package */}
        <rect
          x="248"
          y="96"
          width="168"
          height="48"
          rx="12"
          fill="var(--lp-bg)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="332"
          y="124"
          textAnchor="middle"
          fill="currentColor"
          fontSize="12"
          fontWeight="600"
          fontFamily="var(--font-body)"
        >
          npm package
        </text>

        {/* Arrows from shells to targets */}
        <line
          x1="416"
          y1="40"
          x2="456"
          y2="40"
          stroke="currentColor"
          strokeWidth="2"
        />
        <polygon points="456,36 464,40 456,44" fill="currentColor" />

        <line
          x1="416"
          y1="120"
          x2="456"
          y2="120"
          stroke="currentColor"
          strokeWidth="2"
        />
        <polygon points="456,116 464,120 456,124" fill="currentColor" />

        {/* Target 1: any website */}
        <rect
          x="468"
          y="16"
          width="156"
          height="48"
          rx="24"
          fill="var(--color-sky)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="546"
          y="44"
          textAnchor="middle"
          fill="var(--color-on-pastel)"
          fontSize="12"
          fontWeight="700"
          fontFamily="var(--font-mono)"
        >
          any website
        </text>

        {/* Target 2: your project */}
        <rect
          x="468"
          y="96"
          width="156"
          height="48"
          rx="24"
          fill="var(--color-mint)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="546"
          y="124"
          textAnchor="middle"
          fill="var(--color-on-pastel)"
          fontSize="12"
          fontWeight="700"
          fontFamily="var(--font-mono)"
        >
          your project
        </text>
      </svg>
    </figure>
  );
}
