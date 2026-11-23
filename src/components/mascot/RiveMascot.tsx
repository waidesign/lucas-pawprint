"use client";

import { useEffect, useRef } from "react";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
  type UseRiveParameters,
} from "@rive-app/react-canvas";
import type { LoaffyInputsContract } from "./useLoaffyMachine";

export const LOAFFY_STATE_MACHINE = "Loaffy SM";
export const LOAFFY_ARTBOARD = "Loaffy";

export interface RiveMascotProps {
  /** Path to the `.riv` file inside `public/` (defaults to `/rive/loaffy.riv`) */
  src?: string;
  /** Artboard name (defaults to `"Loaffy"`) */
  artboard?: string;
  /** State machine name (defaults to `"Loaffy SM"`) */
  stateMachine?: string;
  /** State machine input contract from `useLoaffyMachine` (LOAFFY-ANIMATION.md §7.2) */
  inputs?: LoaffyInputsContract;
  /** Autoplay animation on mount (defaults to true) */
  autoplay?: boolean;
  /** Layout fit mode (defaults to Fit.Contain) */
  fit?: Fit;
  /** Layout alignment (defaults to Alignment.Center) */
  alignment?: Alignment;
  /** Container className */
  className?: string;
  /** Callback fired once the Rive file loads successfully */
  onLoaded?: () => void;
  /** Callback fired if the Rive file fails to load */
  onLoadError?: () => void;
  /** Additional Rive hook parameters */
  options?: Partial<UseRiveParameters>;
}

export function RiveMascot({
  src = "/rive/loaffy.riv",
  artboard = LOAFFY_ARTBOARD,
  stateMachine = LOAFFY_STATE_MACHINE,
  inputs,
  autoplay = true,
  fit = Fit.Contain,
  alignment = Alignment.Center,
  className = "h-full w-full",
  onLoaded,
  onLoadError,
  options,
}: RiveMascotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastTriggerSeqRef = useRef<number>(0);

  const dpr =
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio || 1, 2)
      : 1;

  const { rive, RiveComponent } = useRive(
    {
      src,
      artboard,
      stateMachines: stateMachine,
      autoplay,
      layout: new Layout({
        fit,
        alignment,
      }),
      onLoad: () => {
        onLoaded?.();
      },
      onLoadError: () => {
        onLoadError?.();
      },
      ...options,
    },
    {
      useDevicePixelRatio: true,
      customDevicePixelRatio: dpr,
    }
  );

  // State machine inputs per LOAFFY-ANIMATION.md §3.3 & §7.2
  const moodInput = useStateMachineInput(rive, stateMachine, "mood");
  const formInput = useStateMachineInput(rive, stateMachine, "form");
  const poseInput = useStateMachineInput(rive, stateMachine, "pose");
  const lookXInput = useStateMachineInput(rive, stateMachine, "lookX");
  const lookYInput = useStateMachineInput(rive, stateMachine, "lookY");
  const hoverInput = useStateMachineInput(rive, stateMachine, "hover");
  const reducedInput = useStateMachineInput(rive, stateMachine, "reduced");

  const tapTrigger = useStateMachineInput(rive, stateMachine, "tap");
  const jumpTrigger = useStateMachineInput(rive, stateMachine, "jump");
  const landTrigger = useStateMachineInput(rive, stateMachine, "land");
  const winkTrigger = useStateMachineInput(rive, stateMachine, "wink");
  const flipTrigger = useStateMachineInput(rive, stateMachine, "flip");
  const blinkTrigger = useStateMachineInput(rive, stateMachine, "blink");

  /* eslint-disable react-hooks/immutability */
  // Sync continuous inputs
  useEffect(() => {
    if (!inputs) return;
    if (moodInput) moodInput.value = inputs.mood;
    if (formInput) formInput.value = inputs.form;
    if (poseInput) poseInput.value = inputs.pose;
    if (lookXInput) lookXInput.value = inputs.lookX;
    if (lookYInput) lookYInput.value = inputs.lookY;
    if (hoverInput) hoverInput.value = inputs.hover;
    if (reducedInput) reducedInput.value = inputs.reduced;
  }, [
    inputs,
    moodInput,
    formInput,
    poseInput,
    lookXInput,
    lookYInput,
    hoverInput,
    reducedInput,
  ]);
  /* eslint-enable react-hooks/immutability */

  // Fire one-shot triggers
  useEffect(() => {
    if (!inputs || !inputs.activeTrigger) return;
    if (inputs.triggerSeq === lastTriggerSeqRef.current) return;
    lastTriggerSeqRef.current = inputs.triggerSeq;

    switch (inputs.activeTrigger) {
      case "tap":
        tapTrigger?.fire();
        break;
      case "jump":
        jumpTrigger?.fire();
        break;
      case "land":
        landTrigger?.fire();
        break;
      case "wink":
        winkTrigger?.fire();
        break;
      case "flip":
        flipTrigger?.fire();
        break;
      case "blink":
        blinkTrigger?.fire();
        break;
    }
  }, [
    inputs,
    tapTrigger,
    jumpTrigger,
    landTrigger,
    winkTrigger,
    flipTrigger,
    blinkTrigger,
  ]);

  // Pause Rive when off-screen (IntersectionObserver) or when tab is hidden
  useEffect(() => {
    if (!rive) return;
    const el = containerRef.current;
    if (!el) return;

    let inView = true;

    const syncPlayState = () => {
      if (inView && !document.hidden) {
        rive.play();
      } else {
        rive.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting;
        }
        syncPlayState();
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    document.addEventListener("visibilitychange", syncPlayState);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayState);
    };
  }, [rive]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <RiveComponent className="h-full w-full" />
    </div>
  );
}
