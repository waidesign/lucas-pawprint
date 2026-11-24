"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useInView, useReducedMotion } from "motion/react";
import { PeekingHand } from "@/components/mascot/PeekingHand";

/** Only the first Key decision a visitor reaches on a page gets the paw. */
let claimedPath: string | null = null;

/**
 * The cat hand hangs over the top edge of a DecisionCard (LOAFFY.md §7: hanging over a
 * card edge) when the card reaches the middle of the screen: once per page, then leaves.
 * Off under reduced motion (no character motion; the card reads the same without it).
 */
export function DecisionHandPeek() {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion() ?? false;
  const inCentre = useInView(anchorRef, {
    once: true,
    margin: "-40% 0px -40% 0px",
  });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!inCentre || prefersReduced || claimedPath === pathname) return;
    claimedPath = pathname;
    const id = window.setTimeout(() => setActive(true), 0);
    return () => window.clearTimeout(id);
  }, [inCentre, prefersReduced, pathname]);

  return (
    <span ref={anchorRef} aria-hidden="true" className="absolute inset-x-0 top-0">
      <PeekingHand
        active={active}
        then="idle"
        autoExit
        side="beans"
        size={96}
        className="-top-12 right-12 z-0"
      />
    </span>
  );
}
