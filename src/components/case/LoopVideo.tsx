"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export interface LoopVideoProps {
  /** WebM video source path */
  webm: string;
  /** Optional MP4 fallback source (only render if the file exists) */
  mp4?: string;
  /** Required poster image shown before playback and under prefers-reduced-motion */
  poster: string;
  /** Accessible description of what the video recording demonstrates */
  alt: string;
  /** Optional start offset in seconds to skip initial page-load frames on play and loop */
  start?: number;
  /** Optional aspect ratio class (default "aspect-16/10") */
  aspectClassName?: string;
  className?: string;
}

/**
 * LoopVideo (WCAG 2.2.2 compliant auto-playing silent loop):
 * - Muted, playsInline, loop, preload="none", poster required.
 * - Plays only while in view (IntersectionObserver) when prefers-reduced-motion is off.
 * - Visible 48×48 pause/play button in the bottom-right corner.
 * - Static poster under prefers-reduced-motion until explicitly played by the user.
 * - Optional `start` seeks past initial page-load frames on metadata load, play, and loop wrap.
 */
export function LoopVideo({
  webm,
  mp4,
  poster,
  alt,
  start = 0,
  aspectClassName = "aspect-16/10",
  className,
}: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion() ?? false;

  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [userStartedInReduced, setUserStartedInReduced] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const shouldPlay = prefersReduced
    ? userStartedInReduced && !userPaused && inView
    : !userPaused && inView;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const seekToStart = useCallback(
    (video: HTMLVideoElement) => {
      if (start > 0 && Number.isFinite(video.duration)) {
        const safeStart = Math.min(start, Math.max(0, video.duration - 0.2));
        if (video.currentTime < safeStart) {
          video.currentTime = safeStart;
        }
      }
    },
    [start],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      if (start > 0 && video.readyState >= 1 && video.currentTime < start) {
        seekToStart(video);
      }
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      video.pause();
    }
  }, [shouldPlay, start, seekToStart]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      setUserPaused(true);
      video.pause();
      setIsPlaying(false);
    } else {
      setUserPaused(false);
      if (prefersReduced) {
        setUserStartedInReduced(true);
      }
      if (start > 0 && video.readyState >= 1 && video.currentTime < start) {
        seekToStart(video);
      }
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-surface",
        aspectClassName,
        className,
      )}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="none"
        poster={poster}
        aria-label={alt}
        onLoadedMetadata={(e) => seekToStart(e.currentTarget)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (start > 0 && v.currentTime < start - 0.15) {
            seekToStart(v);
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={
          aspectClassName === "aspect-auto"
            ? "block h-auto w-full"
            : "block h-full w-full object-cover"
        }
      >
        <source src={webm} type="video/webm" />
        {mp4 && <source src={mp4} type="video/mp4" />}
      </video>

      <button
        type="button"
        onClick={handleTogglePlay}
        aria-label={isPlaying ? `Pause video: ${alt}` : `Play video: ${alt}`}
        aria-pressed={isPlaying}
        className="absolute bottom-3 right-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-bg text-text lp-sticker-sm-interactive"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Play className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
