import type { Mood, Pose } from "./LoaffyBus";

/**
 * Loaffy's expressions and poses with their reference SVGs and one-line notes
 * (LOAFFY.md §4–5). Shared by `/lab` (LoaffyLabSection) and the `/colophon` picker.
 */
export const LOAFFY_EXPRESSIONS: { mood: Mood; refSvg: string; note: string }[] = [
  {
    mood: "calm",
    refSvg: "/loaffy/expressions/calm.svg",
    note: "Tall ovals, slow blink every 4–7s, small smile",
  },
  {
    mood: "curious",
    refSvg: "/loaffy/expressions/curious.svg",
    note: "Eyes shift toward target, whole paw tilts −8°",
  },
  {
    mood: "thinking",
    refSvg: "/loaffy/expressions/thinking.svg",
    note: "Eyes small looking up, flat mouth, dotted orbit",
  },
  {
    mood: "happy",
    refSvg: "/loaffy/expressions/happy.svg",
    note: "Closed arcs ^ ^, big smile, beans hop up 10 units",
  },
  {
    mood: "sleepy",
    refSvg: "/loaffy/expressions/sleepy.svg",
    note: "Closed droopy arcs, flat mouth, beans drop 3 units, z z",
  },
  {
    mood: "surprised",
    refSvg: "/loaffy/expressions/surprised.svg",
    note: "Round wide eyes, small 'o' mouth, beans spread outward",
  },
];

export const LOAFFY_POSES: {
  pose: Exclude<Pose, "none">;
  refSvg: string;
  note: string;
}[] = [
  {
    pose: "loaf",
    refSvg: "/loaffy/poses/loaf.svg",
    note: "Squash scale(1.08, 0.92), calm eyes",
  },
  {
    pose: "shades",
    refSvg: "/loaffy/poses/shades.svg",
    note: "Tilt −6°, sunglasses, smirk",
  },
  {
    pose: "chill-lean",
    refSvg: "/loaffy/poses/chill-lean.svg",
    note: "Tilt 14°, half-lidded eyes, smirk",
  },
  {
    pose: "jump",
    refSvg: "/loaffy/poses/jump.svg",
    note: "Stretch scale(0.9, 1.1), lifted 10, beans flared",
  },
  {
    pose: "landing",
    refSvg: "/loaffy/poses/landing.svg",
    note: "Squash scale(1.14, 0.84), wide shadow",
  },
  {
    pose: "wink",
    refSvg: "/loaffy/poses/wink.svg",
    note: "One eye closed, ginger sparkle, smirk",
  },
  {
    pose: "side-eye",
    refSvg: "/loaffy/poses/side-eye.svg",
    note: "Half-lidded looking right, outer left bean raised",
  },
  {
    pose: "vibing",
    refSvg: "/loaffy/poses/vibing.svg",
    note: "Tilt −7°, beans bob unevenly, music notes",
  },
  {
    pose: "mid-flip",
    refSvg: "/loaffy/poses/mid-flip.svg",
    note: "Rotated 160°, surprised face, spin lines",
  },
];
