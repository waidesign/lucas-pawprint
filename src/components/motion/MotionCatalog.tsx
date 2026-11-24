"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Captions, Play, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  MOTION_FILTER_TYPES,
  MOTION_TYPE_LABELS,
  type MotionClip,
  type MotionClipType,
} from "@/content/motion";
import { cn, TONE_SOFT_BG_CLASSES } from "@/lib/cn";
import { Chip } from "@/components/ui/Chip";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";

export interface MotionCatalogProps {
  clips: MotionClip[];
}

function ClipTile({
  clip,
  prefersReduced,
  onOpen,
}: {
  clip: MotionClip;
  prefersReduced: boolean;
  onOpen: (clip: MotionClip) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [previewActive, setPreviewActive] = useState(false);
  const hasVideo = Boolean(clip.mp4 || clip.webm);

  const startPreview = () => {
    if (prefersReduced || !hasVideo) return;
    setPreviewActive(true);
    const vid = videoRef.current;
    if (vid) {
      vid.play().catch(() => {});
    }
  };

  const stopPreview = () => {
    if (!hasVideo) return;
    setPreviewActive(false);
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      try {
        vid.currentTime = 0;
      } catch {
        // Ignore seek errors before metadata is loaded
      }
    }
  };

  return (
    <article className="flex flex-col gap-4">
      {hasVideo ? (
        <button
          type="button"
          onClick={() => onOpen(clip)}
          onMouseEnter={startPreview}
          onMouseLeave={stopPreview}
          onFocus={startPreview}
          onBlur={stopPreview}
          data-clip-id={clip.id}
          data-preview-active={
            previewActive && !prefersReduced ? "true" : "false"
          }
          data-reduced-motion={prefersReduced ? "true" : "false"}
          className={cn(
            "group relative block aspect-video w-full overflow-hidden rounded-md border-2 border-line-strong text-left lp-tile-cover-interactive",
            TONE_SOFT_BG_CLASSES[clip.tone],
          )}
        >
          <span className="sr-only">Play clip: {clip.title}. </span>
          <video
            ref={videoRef}
            poster={clip.poster}
            muted
            loop
            playsInline
            preload="none"
            autoPlay={false}
            aria-label={clip.posterAlt}
            className="h-full w-full object-cover"
          >
            {clip.webm && <source src={clip.webm} type="video/webm" />}
            {clip.mp4 && <source src={clip.mp4} type="video/mp4" />}
          </video>

          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-3 right-3 inline-flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text shadow-sticker-sm transition-transform",
              !prefersReduced &&
                "group-hover:scale-105 group-focus-visible:scale-105",
            )}
          >
            <Play className="h-5 w-5" />
          </span>
        </button>
      ) : (
        <div
          data-clip-id={clip.id}
          data-still-tile="true"
          className={cn(
            "relative aspect-video w-full overflow-hidden rounded-md border-2 border-line-strong",
            TONE_SOFT_BG_CLASSES[clip.tone],
          )}
        >
          {clip.poster ? (
            <Image
              src={clip.poster}
              alt={clip.posterAlt}
              width={960}
              height={540}
              unoptimized
              className="block h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between p-4 md:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-label uppercase tracking-wider text-text-muted">
                  {MOTION_TYPE_LABELS[clip.type]}
                </span>
                {clip.isPlaceholder && (
                  <span className="rounded-pill border border-line-strong bg-surface px-2 py-1 font-mono text-label uppercase text-text">
                    Placeholder
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-caption text-text-muted">
                  {clip.year}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <h4
          className={cn(
            "font-display text-balance text-text",
            HEADING_SCALE_CLASSES.h4,
          )}
        >
          {clip.title}
        </h4>
        <p className="font-body text-body text-text-muted">{clip.summary}</p>
        <p className="font-mono text-caption text-text-muted">
          {clip.role} · {clip.tools.join(", ")}
        </p>
      </div>
    </article>
  );
}

/**
 * Filterable motion clip gallery + accessible dialog player (LAYOUT-STEPS.md Step 6):
 * - Filter chips render only for types with at least one visible clip; if <= 1 type is
 *   present, the chip row and count are hidden.
 * - Active filter syncs to `?type=product-ui|brand|explainer|video` (unknown or unavailable
 *   values fall back to All and clear `?type=` via replaceState).
 * - Playable clips (with mp4/webm) render as `.lp-tile-cover-interactive` buttons with
 *   hover/focus-only muted previews (disabled under reduced motion) and open the modal player.
 * - Clips without video files render as still tiles (plain 2px pen border, no shadow, no
 *   play icon, not interactive, no dialog).
 */
export function MotionCatalog({ clips }: MotionCatalogProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const [selectedType, setSelectedType] = useState<"all" | MotionClipType>(
    "all",
  );
  const [activeClip, setActiveClip] = useState<MotionClip | null>(null);
  const [showCaptions, setShowCaptions] = useState(true);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const dialogVideoRef = useRef<HTMLVideoElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const availableTypes = useMemo(() => {
    const present = new Set<MotionClipType>(clips.map((c) => c.type));
    return MOTION_FILTER_TYPES.filter(
      (f): f is { value: MotionClipType; label: string } =>
        f.value !== "all" && present.has(f.value),
    );
  }, [clips]);

  const showFilters = availableTypes.length > 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const availableSet = new Set<MotionClipType>(
      availableTypes.map((t) => t.value),
    );

    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const rawType = params.get("type")?.trim().toLowerCase();
      if (!rawType) {
        setSelectedType("all");
        return;
      }
      if (showFilters && availableSet.has(rawType as MotionClipType)) {
        setSelectedType(rawType as MotionClipType);
      } else {
        setSelectedType("all");
        const url = new URL(window.location.href);
        url.searchParams.delete("type");
        window.history.replaceState({}, "", url.toString());
      }
    };
    const timer = window.setTimeout(syncFromUrl, 0);
    window.addEventListener("popstate", syncFromUrl);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", syncFromUrl);
    };
  }, [availableTypes, showFilters]);

  const handleSelectType = (type: "all" | MotionClipType) => {
    setSelectedType(type);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (type === "all") {
        url.searchParams.delete("type");
      } else {
        url.searchParams.set("type", type);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleOpenClip = (clip: MotionClip) => {
    if (!clip.mp4 && !clip.webm) return;
    setShowCaptions(true);
    setActiveClip(clip);
  };

  // Dialog focus trap, Esc to close, scroll lock, and focus restoration
  useEffect(() => {
    if (!activeClip) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const getFocusables = () =>
      dialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
      );

    getFocusables()?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveClip(null);
        return;
      }

      if (e.key === "Tab") {
        const focusables = getFocusables();
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [activeClip]);

  const filteredClips = useMemo(() => {
    if (!showFilters || selectedType === "all") return clips;
    return clips.filter((clip) => clip.type === selectedType);
  }, [clips, selectedType, showFilters]);

  const activeFilterLabel =
    MOTION_FILTER_TYPES.find((f) => f.value === selectedType)?.label ?? "All";

  const visibleFilters = useMemo(
    () => [{ value: "all" as const, label: "All" }, ...availableTypes],
    [availableTypes],
  );

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="space-y-4">
          <div
            role="group"
            aria-label="Filter motion clips by type"
            className="flex flex-wrap gap-2"
          >
            {visibleFilters.map((filter) => (
              <Chip
                key={filter.value}
                as="button"
                selected={selectedType === filter.value}
                onClick={() => handleSelectType(filter.value)}
              >
                {filter.label}
              </Chip>
            ))}
          </div>

          <p
            aria-live="polite"
            aria-atomic="true"
            className="font-mono text-caption text-text-muted"
          >
            {selectedType === "all"
              ? `Showing all ${filteredClips.length} clips`
              : `Showing ${filteredClips.length} of ${clips.length} clips in ${activeFilterLabel}`}
          </p>
        </div>
      )}

      {filteredClips.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredClips.map((clip) => (
            <ClipTile
              key={clip.id}
              clip={clip}
              prefersReduced={prefersReduced}
              onOpen={handleOpenClip}
            />
          ))}
        </div>
      ) : (
        <div className="border-t border-line py-10">
          <p className="font-body text-body-lg text-text-muted">
            No clips match &ldquo;{activeFilterLabel}&rdquo; yet.{" "}
            <button
              type="button"
              onClick={() => handleSelectType("all")}
              className="inline-flex min-h-12 items-center font-body text-button font-semibold text-text underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              Show all
            </button>
          </p>
        </div>
      )}

      {activeClip && (activeClip.mp4 || activeClip.webm) && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="motion-dialog-title"
          style={{ zIndex: "var(--z-modal)" }}
          className="fixed inset-0 flex items-center justify-center bg-bg p-4 md:p-8"
          onClick={() => setActiveClip(null)}
        >
          <div
            className="relative max-h-full w-full max-w-4xl overflow-auto rounded-xl border-2 border-line-strong bg-surface p-4 shadow-sticker md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                  {MOTION_TYPE_LABELS[activeClip.type]} · {activeClip.year}
                </p>
                <p
                  id="motion-dialog-title"
                  className="font-display text-h3 text-text"
                >
                  {activeClip.title}
                </p>
              </div>

              <IconButton
                aria-label="Close clip player"
                onClick={() => setActiveClip(null)}
              >
                <X className="h-5 w-5" />
              </IconButton>
            </div>

            <div className="overflow-hidden rounded-md border-2 border-line-strong bg-bg">
              <video
                ref={dialogVideoRef}
                controls
                playsInline
                preload="metadata"
                poster={activeClip.poster}
                autoPlay={false}
                className="aspect-video w-full object-cover"
              >
                {activeClip.webm && (
                  <source src={activeClip.webm} type="video/webm" />
                )}
                {activeClip.mp4 && (
                  <source src={activeClip.mp4} type="video/mp4" />
                )}
                {activeClip.captions && (
                  <track
                    kind="captions"
                    src={activeClip.captions}
                    srcLang="en"
                    label="English captions"
                    default
                  />
                )}
              </video>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-line-strong bg-surface px-4 py-3">
                <button
                  type="button"
                  aria-expanded={showCaptions}
                  aria-controls="motion-dialog-captions"
                  onClick={() => setShowCaptions((prev) => !prev)}
                  className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-line-strong bg-surface px-4 font-body text-button text-text transition-colors hover:bg-surface-2"
                >
                  <Captions className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {showCaptions ? "Hide captions" : "Show captions"}
                  </span>
                </button>

                <p className="font-mono text-caption text-text-muted">
                  {activeClip.role} · {activeClip.tools.join(", ")}
                </p>
              </div>
            </div>

            <div
              id="motion-dialog-captions"
              hidden={!showCaptions}
              className="mt-4 border-l-2 border-line-strong pl-4 font-body text-body text-text-muted"
            >
              <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                Captions &amp; notes
              </p>
              <p className="mt-1">{activeClip.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
