"use client";

import { useEffect } from "react";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires the 404 analytics event with the missing pathname and triggers Loaffy's lost reaction.
 */
export function NotFoundTracker() {
  useEffect(() => {
    trackEvent("not_found", { path: window.location.pathname });
    emitLoaffyEvent("not-found");
  }, []);

  return null;
}
