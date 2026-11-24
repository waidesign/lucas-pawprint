"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Form, Mood, Pose } from "./LoaffyBus";
import { LoaffySVG, type LoaffySize } from "./LoaffySVG";
import { useLoaffyMachine } from "./useLoaffyMachine";
import { useLoaffyStagePresence } from "./stage";

const LazyRiveMascot = dynamic(
  () => import("./RiveMascot").then((mod) => mod.RiveMascot),
  { ssr: false }
);

export interface LoaffyProps {
  mood?: Mood;
  pose?: Pose;
  form?: Form;
  /** Pixel size on the 8px grid (default 240) */
  size?: LoaffySize;
  /** Eyes follow pointer (default true when size >= 120) */
  track?: boolean;
  /** Random blink every 4-7s (default true) */
  blink?: boolean;
  /** Pen wobble filter (auto-off below 48px) */
  wobble?: boolean;
  /** aria-hidden when true */
  decorative?: boolean;
  /** aria-label when not decorative */
  label?: string;
  /** Subscribe to global LoaffyBus events (default true) */
  listenToBus?: boolean;
  /** Optional target ID to filter targeted LoaffyBus messages/triggers */
  targetId?: string;
  /** Show ground shadow (defaults to true when size > 128) */
  showGroundShadow?: boolean;
  /** Happy hop on click (5 clicks in 3s -> mid-flip) */
  onClick?: () => void;
  /**
   * Counts as "on screen" for the one-character rule (default true). Pass false while
   * this Loaffy is mounted but hidden, e.g. a hover peek at rest.
   */
  onStage?: boolean;
  className?: string;
}

const RIVE_ASSET_URL = "/rive/loaffy.riv";
let riveProbePromise: Promise<boolean> | null = null;

function checkRiveFileAvailable(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (riveProbePromise) return riveProbePromise;

  riveProbePromise = fetch(RIVE_ASSET_URL, { method: "HEAD" })
    .then((res) => {
      if (!res.ok) return false;
      const contentType = res.headers.get("content-type") ?? "";
      // Static server 404 fallbacks often return text/html
      if (contentType.includes("text/html")) return false;
      return true;
    })
    .catch(() => false);

  return riveProbePromise;
}

export function Loaffy({
  mood = "calm",
  pose = "none",
  form = "paw",
  size = 240,
  track,
  blink = true,
  wobble = true,
  decorative = false,
  label,
  listenToBus = true,
  targetId,
  showGroundShadow,
  onClick,
  onStage = true,
  className,
}: LoaffyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useLoaffyStagePresence(containerRef, onStage);
  const [shouldMountRive, setShouldMountRive] = useState(false);
  const [riveReady, setRiveReady] = useState(false);

  const machine = useLoaffyMachine({
    mood,
    pose,
    form,
    size,
    track,
    blink,
    listenToBus,
    targetId,
    containerRef,
  });

  // Upgrade to Rive when in view + browser idle + not reduced motion + /rive/loaffy.riv exists
  useEffect(() => {
    if (machine.reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let idleHandle: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const scheduleProbe = () => {
          checkRiveFileAvailable().then((exists) => {
            if (!cancelled && exists) {
              setShouldMountRive(true);
            }
          });
        };

        const winWithIdle = window as Window & {
          requestIdleCallback?: (cb: () => void) => number;
          cancelIdleCallback?: (id: number) => void;
        };

        if (typeof winWithIdle.requestIdleCallback === "function") {
          idleHandle = winWithIdle.requestIdleCallback(scheduleProbe);
        } else {
          idleHandle = window.setTimeout(scheduleProbe, 120);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (idleHandle !== null) {
        const winWithIdle = window as Window & {
          cancelIdleCallback?: (id: number) => void;
        };
        if (typeof winWithIdle.cancelIdleCallback === "function") {
          winWithIdle.cancelIdleCallback(idleHandle);
        } else {
          window.clearTimeout(idleHandle);
        }
      }
    };
  }, [machine.reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      onPointerEnter={() => machine.setIsHovered(true)}
      onPointerLeave={() => machine.setIsHovered(false)}
      onClick={() => machine.handleClick(onClick)}
      className={`relative inline-flex select-none items-center justify-center ${
        onClick ? "cursor-pointer" : ""
      } ${className ?? ""}`}
    >
      <div
        className="h-full w-full transition-opacity"
        style={{
          opacity: riveReady ? 0 : 1,
          transitionDuration: "var(--duration-instant)",
        }}
      >
        <LoaffySVG
          mood={machine.effectiveMood}
          pose={machine.effectivePose}
          form={machine.effectiveForm}
          size={size}
          wobble={wobble}
          decorative={decorative}
          label={label}
          lookOffset={machine.lookSvgOffset}
          blinking={machine.blinking}
          activeTrigger={machine.activeTrigger}
          reducedMotion={machine.reducedMotion}
          showGroundShadow={showGroundShadow}
          className="h-full w-full"
        />
      </div>

      {shouldMountRive && !machine.reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity"
          style={{
            opacity: riveReady ? 1 : 0,
            transitionDuration: "var(--duration-instant)",
          }}
        >
          <LazyRiveMascot
            src={RIVE_ASSET_URL}
            inputs={machine.riveInputs}
            onLoaded={() => setRiveReady(true)}
            onLoadError={() => {
              setShouldMountRive(false);
              setRiveReady(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
