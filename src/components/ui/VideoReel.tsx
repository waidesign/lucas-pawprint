"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { Loaffy } from "@/components/mascot/Loaffy";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";

export interface VideoReelProps {
  src?: string;
  poster?: string;
  captionsSrc?: string;
  title?: string;
  tone?: Tone;
  /** Render Loaffy play form inside the play button (default true = Home unchanged; pass false when page already has Loaffy). */
  loaffyButton?: boolean;
  /** When true and no `src` is provided, render a still poster frame with caption and no play control (default false = Home unchanged). */
  staticWhenEmpty?: boolean;
  /** Caption displayed when `staticWhenEmpty` is true and no `src` is set. */
  emptyCaption?: string;
  className?: string;
}

export function VideoReel({
  src,
  poster,
  captionsSrc,
  title = "Lucas product & motion design showreel",
  tone = "sky",
  loaffyButton = true,
  staticWhenEmpty = false,
  emptyCaption = "Showreel coming soon",
  className,
}: VideoReelProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) {
      // Demo fallback when no video file is mounted yet
      const next = !playing;
      setPlaying(next);
      emitLoaffyEvent(next ? "reel-playing" : "reel-paused");
      return;
    }

    if (vid.paused) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  };

  // Pause automatically when leaving viewport (COMPONENTS.md §A VideoReel)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          } else if (playing) {
            setPlaying(false);
            emitLoaffyEvent("reel-paused");
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [playing]);

  if (!src && staticWhenEmpty) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-xl border-2 border-line-strong p-4 shadow-sticker md:p-6",
          TONE_BG_CLASSES[tone],
          className
        )}
      >
        <figure className="relative overflow-hidden rounded-md border-2 border-line-strong bg-bg">
          {poster ? (
            <Image
              src={poster}
              alt={title}
              width={1600}
              height={900}
              unoptimized
              className="block aspect-video w-full object-cover"
            />
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center bg-surface p-8 text-center">
              <p className="font-display text-h3 text-text">{title}</p>
            </div>
          )}

          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-line-strong bg-surface px-4 py-4">
            <p className="font-display text-h4 text-text">{title}</p>
            <p className="font-mono text-caption text-text-muted">
              {emptyCaption}
            </p>
          </figcaption>
        </figure>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl border-2 border-line-strong p-4 shadow-sticker md:p-6",
        TONE_BG_CLASSES[tone],
        className
      )}
    >
      <div className="relative overflow-hidden rounded-md border-2 border-line-strong bg-bg">
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            playsInline
            preload="metadata"
            autoPlay={false}
            onPlay={() => {
              setPlaying(true);
              emitLoaffyEvent("reel-playing");
            }}
            onPause={() => {
              setPlaying(false);
              emitLoaffyEvent("reel-paused");
            }}
            className="aspect-video w-full object-cover"
          >
            {captionsSrc && (
              <track
                kind="captions"
                src={captionsSrc}
                srcLang="en"
                label="English captions"
                default
              />
            )}
          </video>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center bg-surface p-8 text-center">
            <p className="font-display text-h3 text-text">{title}</p>
            <p className="mt-2 font-body text-body text-text-muted">
              {playing
                ? "Playing showreel — Loaffy is vibing."
                : loaffyButton
                  ? "Paused — click Loaffy Play to start the reel."
                  : "Paused — click Play to start the reel."}
            </p>
            {prefersReduced && (
              <p className="mt-2 font-mono text-caption text-text-muted">
                Reduced motion active: autoplay disabled
              </p>
            )}
          </div>
        )}

        {/* Custom Play/Pause button (Loaffy "play" form, 96px / h-24 w-24) */}
        <div className="mt-4 flex items-center justify-between border-t-2 border-line-strong bg-surface px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={playing ? `Pause ${title}` : `Play ${title}`}
              aria-pressed={playing}
              onClick={togglePlay}
              className="inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong bg-butter text-on-pastel lp-sticker-sm-interactive"
            >
              {playing ? (
                <Pause className="h-8 w-8" aria-hidden="true" />
              ) : loaffyButton ? (
                <Loaffy
                  form="play"
                  size={64}
                  track={false}
                  blink={false}
                  listenToBus={false}
                  decorative
                />
              ) : (
                <Play className="h-8 w-8" aria-hidden="true" />
              )}
            </button>

            <div>
              <p className="font-display text-h4 text-text">{title}</p>
              <p className="font-body text-caption text-text-muted">
                {playing ? "Playing (Loaffy pose: vibing)" : "Click play button (96×96 target)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
