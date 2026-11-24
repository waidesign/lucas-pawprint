import { cn } from "@/lib/cn";

/**
 * Clawd: Claude Code's retro 8-bit mascot, drawn from its terminal banner:
 *
 *    ▐▛███▜▌
 *   ▝▜█████▛▘
 *     ▘▘ ▝▝
 *
 * Each quarter-block character is a 2×2 grid of pixels; terminal cells are twice as
 * tall as wide, so every pixel is 1 unit wide × 2 units tall (viewBox 18×10). The two
 * missing quarters in the top row are the eyes (left transparent), the side quarters
 * are the arms and the bottom row is the four legs.
 *
 * Colour: `currentColor` by default, so it follows the surrounding text in every
 * theme (Clawd's brand terracotta sits next to Loaffy's ginger, which the design
 * system reserves for Loaffy). Pass `fill` to put it on a pastel instead.
 * Pixel geometry is illustration coordinates.
 */
const CLAWD_PIXELS: [number, number][] = [
  // Row 1 ( ▐▛███▜▌): body top; eyes are the gaps at (5,1) and (12,1)
  [3, 0],
  [3, 1],
  [4, 0],
  [5, 0],
  [4, 1],
  [6, 0],
  [7, 0],
  [8, 0],
  [9, 0],
  [10, 0],
  [11, 0],
  [6, 1],
  [7, 1],
  [8, 1],
  [9, 1],
  [10, 1],
  [11, 1],
  [12, 0],
  [13, 0],
  [13, 1],
  [14, 0],
  [14, 1],
  // Row 2 (▝▜█████▛▘): arms + body
  [1, 2],
  [2, 2],
  [3, 2],
  [3, 3],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [8, 2],
  [9, 2],
  [10, 2],
  [11, 2],
  [12, 2],
  [13, 2],
  [4, 3],
  [5, 3],
  [6, 3],
  [7, 3],
  [8, 3],
  [9, 3],
  [10, 3],
  [11, 3],
  [12, 3],
  [13, 3],
  [14, 2],
  [15, 2],
  [14, 3],
  [16, 2],
  // Row 3 (  ▘▘ ▝▝): legs
  [4, 4],
  [6, 4],
  [11, 4],
  [13, 4],
];

const CLAWD_PATH = CLAWD_PIXELS.map(([x, y]) => `M${x},${y * 2}h1v2h-1z`).join(
  "",
);

export interface ClawdMarkProps {
  className?: string;
  /** Pixel colour (defaults to currentColor). */
  fill?: string;
  /** Accessible name; omit when the word "Claude" is already next to it. */
  label?: string;
}

export function ClawdMark({
  className,
  fill = "currentColor",
  label,
}: ClawdMarkProps) {
  return (
    <svg
      viewBox="0 0 18 10"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      shapeRendering="crispEdges"
      className={cn("block h-auto w-8", className)}
    >
      <path d={CLAWD_PATH} fill={fill} />
    </svg>
  );
}
