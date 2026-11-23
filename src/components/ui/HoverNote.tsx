"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Info } from "lucide-react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export interface HoverNoteProps {
  /** One sentence explaining the design decision */
  note: ReactNode;
  label?: string;
  tone?: Tone;
  className?: string;
}

export function HoverNote({
  note,
  label = "Why this design decision",
  tone = "butter",
  className,
}: HoverNoteProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cn("relative inline-flex items-center align-middle", className)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (
            containerRef.current &&
            !containerRef.current.contains(e.relatedTarget as Node)
          ) {
            setOpen(false);
          }
        }}
        className="inline-flex h-12 w-12 items-center justify-center rounded-pill select-none"
      >
        <span
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center rounded-pill border-2 border-line-strong shadow-sticker-sm transition-transform",
            TONE_BG_CLASSES[tone]
          )}
        >
          <Info className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>

      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{ zIndex: "var(--z-overlay)" }}
          className={cn(
            " absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded-sm border-2 border-line-strong p-3 font-body text-caption shadow-sticker-sm",
            TONE_BG_CLASSES[tone]
          )}
        >
          {note}
        </span>
      )}
    </span>
  );
}
