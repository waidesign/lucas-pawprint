import type { Tone } from "@/lib/cn";

export type MotionClipType = "product-ui" | "brand" | "explainer" | "video";

export interface MotionClip {
  id: string;
  title: string;
  type: MotionClipType;
  summary: string;
  year: string;
  role: string;
  tools: string[];
  tone: Tone;
  poster?: string;
  posterAlt: string;
  mp4?: string;
  webm?: string;
  captions?: string;
  /** True while awaiting real clip media/title from Lucas (never invent titles or clients). */
  isPlaceholder: boolean;
}

export const MOTION_FILTER_TYPES: {
  value: "all" | MotionClipType;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "product-ui", label: "Product UI" },
  { value: "brand", label: "Brand & campaigns" },
  { value: "explainer", label: "Explainers" },
  { value: "video", label: "Video" },
];

export const MOTION_TYPE_LABELS: Record<MotionClipType, string> = {
  "product-ui": "Product UI",
  brand: "Brand & campaigns",
  explainer: "Explainers",
  video: "Video",
};

/**
 * Typed motion clips for `/motion`.
 * - First two entries preserve the two real clip descriptions from `MotionReel`.
 * - Every other entry is an explicit placeholder slot awaiting real titles, posters,
 *   video files, and captions from Lucas (AGENTS.md rule 6: never invent titles/clients).
 */
export const MOTION_CLIPS: MotionClip[] = [
  {
    id: "vin-scanning-choreography",
    title: "VIN Scanning & Verification Choreography",
    type: "product-ui",
    summary:
      "Lightweight Lottie scanning states created in After Effects for Classic Decoder so archive queries feel responsive and transparent.",
    year: "2025",
    role: "Lead UI/UX & Motion Designer",
    tools: ["After Effects", "Lottie"],
    tone: "sky",
    posterAlt:
      "Poster frame for VIN Scanning & Verification Choreography motion study.",
    isPlaceholder: false,
  },
  {
    id: "interactive-customizer-physics",
    title: "Interactive Customizer & Sticker Physics",
    type: "product-ui",
    summary:
      "Tactile 40ms-grid spring transitions and canvas feedback that guide users through multi-step customization without visual noise.",
    year: "2025",
    role: "Lead UI/UX & Motion Designer",
    tools: ["Figma", "After Effects"],
    tone: "blush",
    posterAlt:
      "Poster frame for Interactive Customizer & Sticker Physics motion study.",
    isPlaceholder: false,
  },
  {
    id: "placeholder-brand-01",
    title: "Brand & campaign clip 01 (placeholder)",
    type: "brand",
    summary:
      "Placeholder slot for a brand or campaign motion piece — replace with real title, poster, video, and captions.",
    year: "TBD",
    role: "Motion Designer",
    tools: ["After Effects"],
    tone: "mint",
    posterAlt: "Placeholder poster frame for Brand & campaign clip 01.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-brand-02",
    title: "Brand & campaign clip 02 (placeholder)",
    type: "brand",
    summary:
      "Placeholder slot for a second brand or campaign motion piece — replace with real title, poster, video, and captions.",
    year: "TBD",
    role: "Motion Designer",
    tools: ["After Effects", "Premiere Pro"],
    tone: "butter",
    posterAlt: "Placeholder poster frame for Brand & campaign clip 02.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-explainer-01",
    title: "Explainer animation 01 (placeholder)",
    type: "explainer",
    summary:
      "Placeholder slot for a product or concept explainer — replace with real title, poster, video, and captions.",
    year: "TBD",
    role: "Motion Designer",
    tools: ["After Effects", "Figma"],
    tone: "lilac",
    posterAlt: "Placeholder poster frame for Explainer animation 01.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-video-01",
    title: "Video edit 01 (placeholder)",
    type: "video",
    summary:
      "Placeholder slot for a broadcast or campaign video edit — replace with real title, poster, video, and captions.",
    year: "TBD",
    role: "Video Editor",
    tools: ["Premiere Pro"],
    tone: "pistachio",
    posterAlt: "Placeholder poster frame for Video edit 01.",
    isPlaceholder: true,
  },
];

export const HOW_I_ANIMATE = [
  {
    id: "animate-01",
    number: "01",
    title: "Storyboard",
    body: "I sketch the key beats and state changes before I open a timeline.",
  },
  {
    id: "animate-02",
    number: "02",
    title: "Animatic",
    body: "I test pacing with rough frames, so the story lands on time.",
  },
  {
    id: "animate-03",
    number: "03",
    title: "Animate",
    body: "I build easing, anticipation and overlap in After Effects or Figma, on a 40ms beat.",
  },
  {
    id: "animate-04",
    number: "04",
    title: "Hand off",
    body: "I export light Lottie files and write timing as tokens, so engineers ship what I designed.",
  },
] as const;

export type MotionPrincipleId =
  | "easing"
  | "timing"
  | "anticipation"
  | "follow-through"
  | "staging"
  | "reduced-motion";

export interface MotionPrinciple {
  id: MotionPrincipleId;
  name: string;
  /** The rule, in one short line. */
  rule: string;
  /** How I apply it in websites and apps. */
  body: string;
  /** The real values the live demo runs on (site tokens). */
  spec: string;
  tone: Tone;
}

/** Home #motion: the principles, each with a live demo (MotionPrincipleDemos). */
export const MOTION_PRINCIPLES: MotionPrinciple[] = [
  {
    id: "easing",
    name: "Easing",
    rule: "Nothing real moves at one speed.",
    body: "Things arrive fast and settle softly. I keep linear for progress bars.",
    spec: "720ms · ease-out vs linear",
    tone: "sky",
  },
  {
    id: "timing",
    name: "Timing",
    rule: "Small things move fast. Big things move slow.",
    body: "A toggle flips in 200ms. A sheet that covers the screen gets 480ms, so the eye can follow it.",
    spec: "200ms toggle · 480ms sheet",
    tone: "mint",
  },
  {
    id: "anticipation",
    name: "Anticipation",
    rule: "Wind up before the action.",
    body: "A small pull back says something is about to happen, like a message before it flies.",
    spec: "120ms wind-up · 280ms go",
    tone: "butter",
  },
  {
    id: "follow-through",
    name: "Follow-through",
    rule: "Things settle. They don't stop dead.",
    body: "The container lands first and its content catches up a beat later.",
    spec: "Spring · 40ms overlap",
    tone: "blush",
  },
  {
    id: "staging",
    name: "Staging",
    rule: "One thing at a time.",
    body: "I reveal a list in order, so the eye reads it top to bottom, not all at once.",
    spec: "80ms stagger",
    tone: "lilac",
  },
  {
    id: "reduced-motion",
    name: "Reduced motion",
    rule: "Respect the setting.",
    body: "When someone turns motion down, slides become short fades. Same meaning, no travel.",
    spec: "480ms wipe → 120ms fade",
    tone: "pistachio",
  },
];

/** Home #motion: what motion does in websites and apps, with real examples. */
export const MOTION_IN_PRODUCT = [
  {
    id: "use-feedback",
    title: "Feedback",
    body: "A press, a save, a search. Motion says “got it” before anyone wonders.",
    example: "Lottie scanning states for Classic Decoder’s VIN search",
  },
  {
    id: "use-orientation",
    title: "Orientation",
    body: "Menus and sheets grow from where you tapped, so nobody loses their place.",
    example: "The menu on this site, wiping in from its own button",
  },
  {
    id: "use-guidance",
    title: "Guidance",
    body: "Ordered reveals lead the eye to the next step, without a tutorial.",
    example: "Step-by-step transitions in the Fierce Fight Gear customizer",
  },
  {
    id: "use-character",
    title: "Character",
    body: "One lively detail makes a calm interface feel alive. Once, not everywhere.",
    example: "Loaffy, the pawprint cat on this site",
  },
] as const;

export const MOTION_TOOLS: string[] = [
  "After Effects",
  "Premiere Pro",
  "Figma",
  "Rive",
  "Lottie",
];

/**
 * Returns motion clips visible in the current environment.
 * Production builds never render entries with `isPlaceholder: true`.
 */
export function getVisibleMotionClips(
  includePlaceholders = process.env.NODE_ENV !== "production",
): MotionClip[] {
  return includePlaceholders
    ? MOTION_CLIPS
    : MOTION_CLIPS.filter((clip) => !clip.isPlaceholder);
}
