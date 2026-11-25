"use client";

import { useId, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn, type Tone } from "@/lib/cn";
import { Chip } from "@/components/ui/Chip";

export interface PullQuoteProps {
  /** Short pull quote displayed prominently in Bricolage h3 token size (not a heading) */
  quote: string;
  author: string;
  role?: string;
  company?: string;
  relationship?: string;
  chipTone?: Tone | "surface";
  /** Optional longer full note hidden behind "Read the full note" disclosure */
  fullNote?: string;
  /** Optional custom disclosure slot rendered below the metadata */
  disclosure?: ReactNode;
  /** Use on-pastel text/divider tokens when sitting directly on a pastel band */
  onPastel?: boolean;
  className?: string;
}

export function PullQuote({
  quote,
  author,
  role,
  company,
  relationship,
  chipTone = "surface",
  fullNote,
  disclosure,
  onPastel = false,
  className,
}: PullQuoteProps) {
  const [expanded, setExpanded] = useState(false);
  const noteId = useId();
  const textClass = onPastel ? "text-on-pastel" : "text-text";
  const mutedClass = onPastel ? "text-on-pastel/80" : "text-text-muted";
  const dividerClass = onPastel
    ? "[&+&]:border-on-pastel/25"
    : "[&+&]:border-line";

  const roleLine = [role, company].filter(Boolean).join(" · ");

  return (
    <figure
      className={cn(
        "max-w-[var(--prose-max)] space-y-6 [&+&]:border-t [&+&]:pt-10",
        dividerClass,
        className,
      )}
    >
      <blockquote className={cn("font-display text-h3 text-pretty", textClass)}>
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className={cn("font-display text-h4", textClass)}>{author}</p>
          {roleLine && (
            <p className={cn("font-body text-caption", mutedClass)}>
              {roleLine}
            </p>
          )}
        </div>

        {relationship && <Chip tone={chipTone} size="sm">{relationship}</Chip>}
      </figcaption>

      {fullNote && (
        <div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={noteId}
            onClick={() => setExpanded((prev) => !prev)}
            className={cn(
              "inline-flex min-h-12 items-center gap-2 font-body text-button font-semibold underline decoration-1 underline-offset-4 transition-all hover:decoration-2",
              textClass,
            )}
          >
            <span>{expanded ? "Hide full note" : "Read the full note"}</span>
            {expanded ? (
              <ArrowUp className="h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
          </button>

          <div
            id={noteId}
            hidden={!expanded}
            className={cn(
              "mt-4 border-l-2 pl-6 font-body text-body whitespace-pre-line",
              onPastel ? "border-on-pastel" : "border-line-strong",
              mutedClass,
            )}
          >
            {fullNote}
          </div>
        </div>
      )}

      {disclosure && <div>{disclosure}</div>}
    </figure>
  );
}
