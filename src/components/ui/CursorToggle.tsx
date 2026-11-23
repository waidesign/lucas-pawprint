"use client";

import { cn } from "@/lib/cn";
import { usePawCursor } from "@/components/mascot/PawCursorProvider";
import { trackEvent } from "@/lib/analytics";

export interface CursorToggleProps {
  className?: string;
}

export function CursorToggle({ className }: CursorToggleProps) {
  const { enabled, isSupported, toggle } = usePawCursor();

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => {
        trackEvent("cursor_toggle", { enabled: !enabled });
        toggle();
      }}
      className={cn(
        "inline-flex min-h-12 items-center gap-3 rounded-pill border-2 border-line-strong bg-surface px-4 font-body text-button text-text lp-sticker-sm-interactive",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-4 w-3 rounded-pill border-2 border-line-strong transition-colors",
          enabled ? "bg-mint" : "bg-surface-2"
        )}
      />
      <span>Paw cursor: {enabled ? "On" : "Off"}</span>
    </button>
  );
}
