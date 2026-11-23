import type {
  Form,
  LoaffySiteEvent,
  LoaffyTrigger,
  Mood,
  Pose,
} from "./LoaffyBus";

export interface ReactionSpec {
  event: LoaffySiteEvent;
  description: string;
  trigger?: LoaffyTrigger;
  mood?: Mood;
  pose?: Pose;
  form?: Form;
  resetMoodAfterMs?: number;
  cooldownMs?: number;
}

/**
 * Declarative event -> reaction map from LOAFFY-ANIMATION.md §6.5.
 * All durations and timers lie on the 40ms grid.
 */
export const LOAFFY_REACTIONS: Record<LoaffySiteEvent, ReactionSpec> = {
  "email-copied": {
    event: "email-copied",
    description: "Copy email success: tap (hop) -> mood happy 1600ms -> calm",
    trigger: "tap",
    mood: "happy",
    resetMoodAfterMs: 1600,
  },
  "book-chat-click": {
    event: "book-chat-click",
    description: "Book a chat click: wink",
    trigger: "wink",
  },
  "logo-hover": {
    event: "logo-hover",
    description: "Hover logo: wink (once per 10s)",
    trigger: "wink",
    cooldownMs: 10000,
  },
  "idle-30s": {
    event: "idle-30s",
    description: "Idle 30s: mood sleepy",
    mood: "sleepy",
  },
  "user-activity": {
    event: "user-activity",
    description: "Any user input after idle: mood calm",
    mood: "calm",
  },
  "loaffy-click": {
    event: "loaffy-click",
    description: "Click Loaffy: tap (hop); 5 clicks within 3s -> flip",
    trigger: "tap",
  },
  "reel-playing": {
    event: "reel-playing",
    description: "Reel playing: pose vibing",
    pose: "vibing",
  },
  "reel-paused": {
    event: "reel-paused",
    description: "Reel paused: pose none",
    pose: "none",
  },
  "route-change": {
    event: "route-change",
    description: "Route change: land on the new page's Loaffy",
    trigger: "land",
  },
  "not-found": {
    event: "not-found",
    description: "404: form lost + mood surprised",
    form: "lost",
    mood: "surprised",
  },
  "theme-change": {
    event: "theme-change",
    description: "Theme switch: blink",
    trigger: "blink",
  },
};

export const TRIGGER_DURATIONS_MS: Record<LoaffyTrigger, number> = {
  blink: 200,
  wink: 320,
  land: 480,
  tap: 560,
  jump: 720,
  flip: 720,
};

/** Rive numeric input mappings per LOAFFY-ANIMATION.md §3.3 & §7.2 */
export const MOOD_TO_RIVE: Record<Mood, 0 | 1 | 2 | 3 | 4 | 5> = {
  calm: 0,
  curious: 1,
  thinking: 2,
  happy: 3,
  sleepy: 4,
  surprised: 5,
};

export const FORM_TO_RIVE: Record<Form, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7> = {
  paw: 0,
  "paw-3d": 1,
  window: 2,
  phone: 3,
  cube: 4,
  play: 5,
  bubble: 6,
  lost: 7,
};

export const POSE_TO_RIVE: Record<Pose, 0 | 1 | 2 | 3 | 4> = {
  none: 0,
  loaf: 1,
  shades: 2,
  "chill-lean": 3,
  vibing: 4,
  jump: 0,
  landing: 0,
  wink: 0,
  "side-eye": 0,
  "mid-flip": 0,
};
