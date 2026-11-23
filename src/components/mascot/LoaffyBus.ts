export type Mood =
  | "calm"
  | "curious"
  | "thinking"
  | "happy"
  | "sleepy"
  | "surprised";

export type Pose =
  | "none"
  | "loaf"
  | "shades"
  | "chill-lean"
  | "jump"
  | "landing"
  | "wink"
  | "side-eye"
  | "vibing"
  | "mid-flip";

export type Form =
  | "paw"
  | "paw-3d"
  | "window"
  | "phone"
  | "cube"
  | "play"
  | "bubble"
  | "lost";

export type LoaffyTrigger =
  | "tap"
  | "jump"
  | "land"
  | "wink"
  | "flip"
  | "blink";

export type LoaffySiteEvent =
  | "email-copied"
  | "book-chat-click"
  | "logo-hover"
  | "idle-30s"
  | "user-activity"
  | "loaffy-click"
  | "reel-playing"
  | "reel-paused"
  | "route-change"
  | "not-found"
  | "theme-change";

export type LoaffyBusMessage =
  | { kind: "event"; event: LoaffySiteEvent }
  | { kind: "trigger"; trigger: LoaffyTrigger }
  | {
      kind: "state";
      mood?: Mood;
      pose?: Pose;
      form?: Form;
    };

type LoaffyListener = (msg: LoaffyBusMessage) => void;

const listeners = new Set<LoaffyListener>();

export function subscribeLoaffyBus(listener: LoaffyListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function emitLoaffyMessage(msg: LoaffyBusMessage): void {
  for (const listener of listeners) {
    listener(msg);
  }
}

export function emitLoaffyEvent(event: LoaffySiteEvent): void {
  emitLoaffyMessage({ kind: "event", event });
}

export function emitLoaffyTrigger(trigger: LoaffyTrigger): void {
  emitLoaffyMessage({ kind: "trigger", trigger });
}
