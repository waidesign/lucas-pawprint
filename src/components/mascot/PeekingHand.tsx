"use client";

import { useEffect, useRef, useState } from "react";
import { handTiming } from "@/lib/motion";
import { cn } from "@/lib/cn";
import {
  CatHand,
  type CatHandAction,
  type CatHandSide,
} from "./CatHand";
import { useLoaffyOnScreen } from "./stage";

export interface PeekingHandProps {
  /** Wanted on screen (hover, focus, in view…). The hand still waits for the stage. */
  active: boolean;
  /** One-shot after the enter (§5): `bat` (claws flick) or `tap`. `idle` just hangs. */
  then?: "bat" | "tap" | "idle";
  /** Leave on its own after `handTiming.hold` instead of waiting for `active` to drop. */
  autoExit?: boolean;
  side?: CatHandSide;
  claws?: boolean;
  /** Pixel size on the 8px grid. */
  size?: number;
  /**
   * Position the hand's frame. Its bottom edge is the "edge" the paw rises from, so
   * put it behind the element it peeks over (that element needs a higher z-index).
   */
  className?: string;
}

/**
 * The cat hand peeking over an edge (LOAFFY.md §7: tapping a CTA, hanging over a
 * card edge). Purely decorative (`aria-hidden`), never takes pointer events, and only
 * appears while no Loaffy is on screen (one character at a time).
 */
export function PeekingHand({
  active,
  then = "idle",
  autoExit = false,
  side = "fur",
  claws = false,
  size = 96,
  className,
}: PeekingHandProps) {
  const loaffyOnScreen = useLoaffyOnScreen();
  const wanted = active && !loaffyOnScreen;
  const [action, setAction] = useState<CatHandAction>("exit");
  const [playKey, setPlayKey] = useState(0);
  // Only mounted while in (or leaving), so hidden hands cost nothing
  const [present, setPresent] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clear = () => {
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
    };
    clear();

    if (!wanted) {
      timers.current.push(window.setTimeout(() => setAction("exit"), 0));
      return clear;
    }

    timers.current.push(
      window.setTimeout(() => {
        setPresent(true);
        setAction("enter");
      }, 0),
    );
    if (then !== "idle") {
      timers.current.push(
        window.setTimeout(() => {
          setAction(then);
          setPlayKey((k) => k + 1);
        }, handTiming.enter * 1000),
      );
    }
    if (autoExit) {
      const oneShot = then === "bat" ? handTiming.bat : then === "tap" ? handTiming.tap : 0;
      timers.current.push(
        window.setTimeout(
          () => setAction("exit"),
          (handTiming.enter + oneShot + handTiming.hold) * 1000,
        ),
      );
    }
    return clear;
  }, [wanted, then, autoExit]);

  if (!present) return null;

  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute block", className)}
      style={{ width: size, height: size }}
    >
      <CatHand
        side={side}
        claws={claws}
        size={size}
        action={action}
        playKey={playKey}
        onActionComplete={(done) => {
          if (done === "exit") setPresent(false);
        }}
        decorative
        className="block h-full w-full"
      />
    </span>
  );
}
