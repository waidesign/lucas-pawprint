import { cn, type Tone } from "@/lib/cn";

/**
 * SectionSeam: the hand-cut join between two attached sections.
 *
 * Sits between two bordered sections (same side margins), overlapping 24px into
 * each (`-my-6`, height 48px). Above the edge it paints the upper section's soft
 * tone, below it the lower section's, and draws the edge as a 2px pen line
 * (line-strong, so it follows the theme). Side borders continue through it.
 *
 * Two styles, both seeded; `wave` is the default used across the site ("random" but identical on every visit):
 * - `wave`: a soft, lumpy hand-cut curve.
 * - `torn`: a torn-paper edge (short straight segments of random length, an
 *   occasional deeper rip) with a flat ink shadow under the upper "paper".
 *
 * The two sections lose their rounded corners at the join (see page.tsx).
 */

const SOFT_FILL: Record<Tone, string> = {
  lilac: "fill-lilac-soft",
  mint: "fill-mint-soft",
  butter: "fill-butter-soft",
  sky: "fill-sky-soft",
  blush: "fill-blush-soft",
  pistachio: "fill-pistachio-soft",
};

/* viewBox 1000×48 (1 unit = 1px vertically); the section boundary is y = 24. */
const W = 1000;
const H = 48;
const MID = 24;

const WAVE = { amplitude: 16, points: 31 } as const;
const TORN = {
  drift: 7, // slow, paper-like curve the tear follows
  jitter: 2.5, // fine teeth
  minStep: 2,
  maxStep: 7,
  ripChance: 0.04,
  ripDepth: 6,
  shadow: 3,
} as const;

const f = (n: number) => n.toFixed(1);

/** Small deterministic PRNG (mulberry32) so each edge is stable per seed. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Soft lumpy wave (Catmull-Rom → cubic Bézier) from x = 0 to x = W. */
function wavePath(seed: number) {
  const r = rng(seed);
  const n = WAVE.points;
  const pts = Array.from({ length: n }, (_, i) => {
    const x = (i / (n - 1)) * W;
    // ends stay near the middle so the side borders meet the edge cleanly
    const edge = i === 0 || i === n - 1 ? 0.3 : 1;
    return [x, MID + (r() * 2 - 1) * WAVE.amplitude * edge] as const;
  });
  const at = (i: number) => pts[Math.max(0, Math.min(n - 1, i))]!;
  let d = `M${f(at(0)[0])},${f(at(0)[1])}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(
      p2[0] - (p3[0] - p1[0]) / 6,
    )},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

/** Torn-paper edge: fine jagged teeth riding a slow drift, with the odd small rip. */
function tornPath(seed: number) {
  const r = rng(seed);
  // slow drift: two seeded sine waves (phases/frequencies from the seed)
  const p1 = r() * Math.PI * 2;
  const p2 = r() * Math.PI * 2;
  const k1 = 2 + r() * 2;
  const k2 = 5 + r() * 3;
  const drift = (x: number) => {
    const t = (x / W) * Math.PI * 2;
    return (
      TORN.drift * (0.6 * Math.sin(k1 * t + p1) + 0.4 * Math.sin(k2 * t + p2))
    );
  };
  let x = 0;
  let d = `M0,${f(MID)}`;
  while (x < W) {
    x = Math.min(W, x + TORN.minStep + r() * (TORN.maxStep - TORN.minStep));
    const atEnd = x >= W;
    // fade the drift in/out near the sides so the side borders meet the edge cleanly
    const fade = Math.min(1, x / 40, (W - x) / 40);
    let y = MID + (drift(x) + (r() * 2 - 1) * TORN.jitter) * fade;
    if (!atEnd && r() < TORN.ripChance)
      y += TORN.ripDepth * (r() < 0.5 ? -1 : 1) * fade;
    if (atEnd) y = MID;
    d += ` L${f(x)},${f(y)}`;
  }
  return d;
}

export type SectionSeamVariant = "wave" | "torn";

export interface SectionSeamProps {
  /** Tone of the section above (its soft variant is used). */
  from: Tone;
  /** Tone of the section below (its soft variant is used). */
  to: Tone;
  /** Shape seed: give each seam a different number. */
  seed: number;
  /** Edge style (wave is the site default; torn paper kept as an option). */
  variant?: SectionSeamVariant;
  className?: string;
}

export function SectionSeam({
  from,
  to,
  seed,
  variant = "wave",
  className,
}: SectionSeamProps) {
  const edge = variant === "torn" ? tornPath(seed) : wavePath(seed);
  const upper = `${edge} V0 H0 Z`;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative z-10 mx-2 -my-6 h-12 border-x-2 border-line-strong md:mx-4",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        {/* lower tone everywhere, then the upper "paper" on top */}
        <path d={`M0,0 H${W} V${H} H0 Z`} className={SOFT_FILL[to]} />
        {variant === "torn" && (
          // flat ink shadow just under the torn edge (no blur)
          <path
            d={upper}
            transform={`translate(0 ${TORN.shadow})`}
            fill="var(--color-shadow)"
            opacity={0.18}
          />
        )}
        <path d={upper} className={SOFT_FILL[from]} />
        <path
          d={edge}
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin={variant === "torn" ? "miter" : "round"}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
