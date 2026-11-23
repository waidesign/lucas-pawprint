"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useReducedMotion } from "motion/react";
import {
  subscribeLoaffyBus,
  type Form,
  type LoaffySiteEvent,
  type LoaffyTrigger,
  type Mood,
  type Pose,
} from "./LoaffyBus";
import {
  FORM_TO_RIVE,
  LOAFFY_REACTIONS,
  MOOD_TO_RIVE,
  POSE_TO_RIVE,
  TRIGGER_DURATIONS_MS,
} from "./reactions";

export interface LoaffyInputsContract {
  mood: 0 | 1 | 2 | 3 | 4 | 5;
  form: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  pose: 0 | 1 | 2 | 3 | 4;
  lookX: number;
  lookY: number;
  hover: boolean;
  reduced: boolean;
  activeTrigger: LoaffyTrigger | null;
  triggerSeq: number;
}

export interface UseLoaffyMachineOptions {
  mood?: Mood;
  pose?: Pose;
  form?: Form;
  size?: number;
  track?: boolean;
  blink?: boolean;
  listenToBus?: boolean;
  containerRef: RefObject<HTMLElement | null>;
}

export interface UseLoaffyMachineResult {
  effectiveMood: Mood;
  effectivePose: Pose;
  effectiveForm: Form;
  blinking: boolean;
  activeTrigger: LoaffyTrigger | null;
  triggerSeq: number;
  lookSvgOffset: { x: number; y: number };
  riveInputs: LoaffyInputsContract;
  isHovered: boolean;
  setIsHovered: (v: boolean) => void;
  fireTrigger: (trigger: LoaffyTrigger) => void;
  handleClick: (userOnClick?: () => void) => void;
  reducedMotion: boolean;
}

const IDLE_TIMEOUT_MS = 30000;
const FLIP_WINDOW_MS = 3000;
const FLIP_CLICKS_REQUIRED = 5;

export function useLoaffyMachine({
  mood = "calm",
  pose = "none",
  form = "paw",
  size = 240,
  track,
  blink = true,
  listenToBus = true,
  containerRef,
}: UseLoaffyMachineOptions): UseLoaffyMachineResult {
  const prefersReduced = useReducedMotion() ?? false;
  const shouldTrack = (track ?? size >= 120) && !prefersReduced;

  const [overrideMood, setOverrideMood] = useState<Mood | null>(null);
  const [overridePose, setOverridePose] = useState<Pose | null>(null);
  const [overrideForm, setOverrideForm] = useState<Form | null>(null);
  const [isSleepyIdle, setIsSleepyIdle] = useState(false);

  const [blinking, setBlinking] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<LoaffyTrigger | null>(
    null
  );
  const [triggerSeq, setTriggerSeq] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized -100..100 for Rive; divided to <= 3 units for 200-viewBox SVG
  const [lookNormalized, setLookNormalized] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const triggerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moodTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doubleBlinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const lastCooldownsRef = useRef<Record<string, number>>({});
  const clickTimestampsRef = useRef<number[]>([]);

  const fireTrigger = useCallback(
    (trigger: LoaffyTrigger) => {
      if (prefersReduced) return;

      if (trigger === "blink") {
        setBlinking(true);
        setActiveTrigger("blink");
        setTriggerSeq((s) => s + 1);
        if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
        triggerTimeoutRef.current = setTimeout(() => {
          setBlinking(false);
          setActiveTrigger((curr) => (curr === "blink" ? null : curr));
        }, TRIGGER_DURATIONS_MS.blink);
        return;
      }

      setActiveTrigger(trigger);
      setTriggerSeq((s) => s + 1);

      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
      triggerTimeoutRef.current = setTimeout(() => {
        setActiveTrigger(null);
      }, TRIGGER_DURATIONS_MS[trigger]);
    },
    [prefersReduced]
  );

  const handleSiteEvent = useCallback(
    (event: LoaffySiteEvent) => {
      const spec = LOAFFY_REACTIONS[event];
      if (!spec) return;

      const now = Date.now();
      if (spec.cooldownMs) {
        const last = lastCooldownsRef.current[event] ?? 0;
        if (now - last < spec.cooldownMs) return;
        lastCooldownsRef.current[event] = now;
      }

      if (event === "user-activity") {
        setIsSleepyIdle(false);
        return;
      }

      if (event === "idle-30s") {
        setIsSleepyIdle(true);
        return;
      }

      if (spec.form !== undefined) {
        setOverrideForm(spec.form);
      }

      if (spec.pose !== undefined) {
        setOverridePose(spec.pose === "none" ? null : spec.pose);
      }

      if (spec.mood !== undefined) {
        setIsSleepyIdle(false);
        setOverrideMood(spec.mood);
        if (moodTimeoutRef.current) clearTimeout(moodTimeoutRef.current);
        if (spec.resetMoodAfterMs) {
          moodTimeoutRef.current = setTimeout(() => {
            setOverrideMood(null);
          }, spec.resetMoodAfterMs);
        }
      }

      if (spec.trigger) {
        fireTrigger(spec.trigger);
      }
    },
    [fireTrigger]
  );

  const handleClick = useCallback(
    (userOnClick?: () => void) => {
      setIsSleepyIdle(false);
      const now = Date.now();
      const recent = clickTimestampsRef.current.filter(
        (t) => now - t < FLIP_WINDOW_MS
      );
      recent.push(now);
      clickTimestampsRef.current = recent;

      if (recent.length >= FLIP_CLICKS_REQUIRED) {
        clickTimestampsRef.current = [];
        fireTrigger("flip");
      } else {
        fireTrigger("tap");
        setOverrideMood("happy");
        if (moodTimeoutRef.current) clearTimeout(moodTimeoutRef.current);
        moodTimeoutRef.current = setTimeout(() => {
          setOverrideMood(null);
        }, 560);
      }

      userOnClick?.();
    },
    [fireTrigger]
  );

  // 1. Random blink every 4-7s (200ms total; 15% chance of double blink)
  useEffect(() => {
    if (!blink || prefersReduced) return;

    let cancelled = false;

    const scheduleNextBlink = () => {
      // Snap delay to 40ms grid between 4000ms and 7000ms
      const steps = 100 + Math.floor(Math.random() * 76); // 100..175 * 40ms = 4000..7000ms
      const delayMs = steps * 40;

      blinkTimerRef.current = setTimeout(() => {
        if (cancelled) return;
        fireTrigger("blink");

        if (Math.random() < 0.15) {
          doubleBlinkTimerRef.current = setTimeout(() => {
            if (!cancelled) fireTrigger("blink");
          }, 240);
        }

        scheduleNextBlink();
      }, delayMs);
    };

    scheduleNextBlink();

    return () => {
      cancelled = true;
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
      if (doubleBlinkTimerRef.current)
        clearTimeout(doubleBlinkTimerRef.current);
    };
  }, [blink, prefersReduced, fireTrigger]);

  // 2. 30s inactivity -> sleepy; any user input -> calm
  useEffect(() => {
    if (prefersReduced || !listenToBus) return;

    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const resetIdle = () => {
      setIsSleepyIdle((wasSleepy) => (wasSleepy ? false : wasSleepy));
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsSleepyIdle(true);
      }, IDLE_TIMEOUT_MS);
    };

    resetIdle();

    window.addEventListener("pointermove", resetIdle, { passive: true });
    window.addEventListener("pointerdown", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle, { passive: true });
    window.addEventListener("scroll", resetIdle, { passive: true });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("pointermove", resetIdle);
      window.removeEventListener("pointerdown", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      window.removeEventListener("scroll", resetIdle);
    };
  }, [prefersReduced, listenToBus]);

  // 3. Eye tracking (pointer position -> -100..100 for Rive and <= 3 units for SVG)
  useEffect(() => {
    if (!shouldTrack) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let rafId: number | null = null;
    let latestClientX = 0;
    let latestClientY = 0;

    const updateLook = () => {
      rafId = null;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = latestClientX - centerX;
      const dy = latestClientY - centerY;
      const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.35;

      const normX = Math.max(-1, Math.min(1, dx / maxRadius));
      const normY = Math.max(-1, Math.min(1, dy / maxRadius));

      // Clamp circular magnitude to 1
      const mag = Math.hypot(normX, normY);
      const clampedX = mag > 1 ? normX / mag : normX;
      const clampedY = mag > 1 ? normY / mag : normY;

      setLookNormalized({
        x: Math.round(clampedX * 100),
        y: Math.round(clampedY * 100),
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      latestClientX = e.clientX;
      latestClientY = e.clientY;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateLook);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [shouldTrack, containerRef]);

  // 4. Subscribe to LoaffyBus and theme changes
  useEffect(() => {
    if (!listenToBus) return;

    const unsub = subscribeLoaffyBus((msg) => {
      if (msg.kind === "event") {
        handleSiteEvent(msg.event);
      } else if (msg.kind === "trigger") {
        fireTrigger(msg.trigger);
      } else if (msg.kind === "state") {
        if (msg.mood !== undefined) setOverrideMood(msg.mood);
        if (msg.pose !== undefined)
          setOverridePose(msg.pose === "none" ? null : msg.pose);
        if (msg.form !== undefined) setOverrideForm(msg.form);
      }
    });

    const onThemeChange = () => {
      handleSiteEvent("theme-change");
    };
    window.addEventListener("lp-theme-change", onThemeChange);

    return () => {
      unsub();
      window.removeEventListener("lp-theme-change", onThemeChange);
    };
  }, [listenToBus, handleSiteEvent, fireTrigger]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
      if (moodTimeoutRef.current) clearTimeout(moodTimeoutRef.current);
    };
  }, []);

  const effectiveMood: Mood = prefersReduced
    ? mood
    : overrideMood ?? (isSleepyIdle ? "sleepy" : mood);

  const effectivePose: Pose = overridePose ?? pose;
  const effectiveForm: Form = overrideForm ?? form;

  const activeLookX = shouldTrack ? lookNormalized.x : 0;
  const activeLookY = shouldTrack ? lookNormalized.y : 0;

  // Map -100..100 to <= 3 units in 200-viewBox SVG coordinates
  const lookSvgOffset = {
    x: Number(((activeLookX / 100) * 3).toFixed(2)),
    y: Number(((activeLookY / 100) * 3).toFixed(2)),
  };

  const riveInputs: LoaffyInputsContract = {
    mood: MOOD_TO_RIVE[effectiveMood],
    form: FORM_TO_RIVE[effectiveForm],
    pose: POSE_TO_RIVE[effectivePose],
    lookX: activeLookX,
    lookY: activeLookY,
    hover: isHovered,
    reduced: prefersReduced,
    activeTrigger,
    triggerSeq,
  };

  return {
    effectiveMood,
    effectivePose,
    effectiveForm,
    blinking,
    activeTrigger,
    triggerSeq,
    lookSvgOffset,
    riveInputs,
    isHovered,
    setIsHovered,
    fireTrigger,
    handleClick,
    reducedMotion: prefersReduced,
  };
}
