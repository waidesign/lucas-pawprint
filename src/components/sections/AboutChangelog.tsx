"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  FileText,
  Maximize2,
  MessageCircle,
  Minus,
  MousePointer2,
  PenLine,
  Plus,
  Square,
  StickyNote,
  Type,
  X,
} from "lucide-react";
import { experience, profile } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { handTiming, springCalm } from "@/lib/motion";
import { CatHand, type CatHandAction } from "@/components/mascot/CatHand";
import { LoaffyMarkIcon } from "@/components/mascot/LoaffyMark";
import { useLoaffyOnScreen } from "@/components/mascot/stage";
import { Button } from "@/components/ui/Button";
import { ClawdMark } from "@/components/ui/ClawdMark";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

/* ── Story steps (scroll position → step) ────────────────────────────── */
const STEP = {
  ask1: 1,
  bio: 2,
  ask2: 3,
  reply: 4,
  firstNote: 5, // notes occupy 5 … 5 + n − 1
} as const;
const NOTE_COUNT = experience.length;
const STEP_RESUME = STEP.firstNote + NOTE_COUNT;
const STEP_MAX = STEP_RESUME;

/* ── Canvas world (xl): a real, pannable/zoomable board ──────────────────
   World is 1160×760 (w-290 × h-190); notes are 320 wide (w-80). Positions are
   board coordinates (illustration geometry). */
const NOTE_W = 320;
const NOTE_H_EST = 300;
const NOTE_POS = [
  { x: 48, y: 56, rotate: -2 },
  { x: 424, y: 28, rotate: 2 },
  { x: 800, y: 72, rotate: -1 },
  { x: 224, y: 408, rotate: 1.5 },
  { x: 608, y: 392, rotate: -2.5 },
] as const;
const BOARD = { x: 32, y: 16, w: 1112, h: 720 }; // bounds of all notes, for Fit view
const ZOOM = { min: 0.4, max: 1.6, step: 0.2 } as const;
/** The board always opens (and follows the story) at 100%. */
const DEFAULT_ZOOM = 1;
const PAN_STEP = 48;
const NOTE_TONES = [
  "bg-butter",
  "bg-mint",
  "bg-sky",
  "bg-blush",
  "bg-lilac",
] as const;
const CAMERA_EASE = [0.22, 1, 0.36, 1] as const;
/** Camera glide to a note (s); the paw taps when it arrives. */
const CAMERA_GLIDE = 0.64;
/** How long the paw stays after a pat before leaving (s, 40ms grid). */
const PAT_HOLD = 0.48;
/** Minimum ms between advancing desktop sticky notes so Loaffy's full hand animation completes (40ms grid). */
const NOTE_PACE_MS = Math.round(
  (CAMERA_GLIDE + handTiming.tap + PAT_HOLD + handTiming.exit) * 1000,
);

const PIN_QUERY = "(min-width: 1024px) and (min-height: 520px)";
const XL_QUERY = "(min-width: 1024px)";
const LG_QUERY = "(min-width: 1024px)";

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* ── Chat pieces ─────────────────────────────────────────────────────── */
const MESSAGE_MOTION = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: springCalm,
} as const;

function Avatar({
  toneClass,
  children,
}: {
  toneClass: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border-2 border-on-pastel text-on-pastel",
        toneClass,
      )}
    >
      {children}
    </span>
  );
}

/** Visitor message: bubble on the right, Loaffy avatar beside it. */
function UserBubble({ children }: { children: ReactNode }) {
  return (
    <motion.div
      layout="position"
      {...MESSAGE_MOTION}
      className="flex items-start justify-end gap-3"
    >
      <p className="max-w-[80%] rounded-lg rounded-tr-xs border-2 border-line-strong bg-lilac px-4 py-3 font-body text-body text-on-pastel">
        {children}
      </p>
      <Avatar toneClass="bg-blush">
        <LoaffyMarkIcon className="w-6" />
      </Avatar>
    </motion.div>
  );
}

/** Assistant message: Clawd avatar, message card on the left. */
function AssistantMessage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      layout="position"
      {...MESSAGE_MOTION}
      className="flex items-start gap-3"
    >
      <Avatar toneClass="bg-butter">
        <ClawdMark className="w-6" />
      </Avatar>
      <div className="min-w-0 flex-1 space-y-3 rounded-lg rounded-tl-xs border-2 border-line bg-surface px-4 py-3 font-body text-body text-text">
        {children}
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  const prefersReduced = useReducedMotion() ?? false;
  return (
    <motion.div
      layout="position"
      {...MESSAGE_MOTION}
      className="flex items-center gap-3"
    >
      <Avatar toneClass="bg-butter">
        <ClawdMark className="w-6" />
      </Avatar>
      <span className="inline-flex h-10 items-center gap-1 rounded-lg rounded-tl-xs border-2 border-line bg-surface px-4">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-pill bg-text-muted"
            animate={prefersReduced ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 0.72, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </span>
    </motion.div>
  );
}

/* ── Canvas pieces ───────────────────────────────────────────────────── */
function CanvasDots({ id }: { id: string }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle
            cx="12"
            cy="12"
            r="1"
            fill="var(--color-text-subtle)"
            fillOpacity="0.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function CanvasCursor({
  name,
  toneClass,
}: {
  name: string;
  toneClass: string;
}) {
  return (
    <span aria-hidden="true" className="flex items-start">
      <MousePointer2
        className="h-6 w-6 fill-text text-text"
        strokeWidth={1.5}
      />
      <span
        className={cn(
          "-ml-1 mt-4 rounded-pill border-2 border-on-pastel px-3 py-0.5 font-body text-caption font-semibold text-on-pastel shadow-sticker-sm",
          toneClass,
        )}
      >
        {name}
      </span>
    </span>
  );
}

function NoteBody({ item }: { item: (typeof experience)[number] }) {
  return (
    <>
      <span className="self-start rounded-pill border-2 border-on-pastel bg-bg px-3 py-1 font-mono text-label text-text">
        {item.period}
      </span>
      <p className="font-display text-body-lg font-bold">{item.role}</p>
      <p className="font-body text-body font-semibold">{item.company}</p>
      <p className="font-body text-body">{item.summary}</p>
    </>
  );
}

const TOOLS = [MousePointer2, StickyNote, Type, Square, PenLine, MessageCircle];

function ControlButton({
  label,
  onClick,
  children,
  wide = false,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xs font-body text-caption font-semibold text-text transition-colors hover:bg-surface",
        wide ? "px-3" : "w-10",
      )}
    >
      {children}
    </button>
  );
}

/**
 * About · changelog as a Claude-style chat + FigJam-style canvas.
 * - Chat (left): visitor bubbles with a Loaffy avatar, assistant messages with a Clawd
 *   avatar. The visitor asks about Lucas; the assistant answers with the portrait +
 *   bio, hands over a "Changelog" artifact, and finally the resume.
 * - Canvas (right, xl): a real board. Drag to pan, arrow keys to pan when focused,
 *   zoom −/+, 100%, and Fit view. During the scroll story the camera glides to each
 *   newly placed note until the visitor moves the board themselves.
 *   Below xl: the notes stack in a grid (no drag, so page scrolling never fights it).
 * - Scroll story: pinned (xl + tall screens) → scroll drives the steps, reversible;
 *   otherwise plays once in view; reduced motion shows everything.
 * - Facts come from `profile` + `experience`; the two visitor questions and the
 *   assistant's connecting lines are UI copy. The chat is aria-hidden with the bio in
 *   an sr-only paragraph; the canvas is real content (a list of notes) + labelled
 *   controls. Education is intentionally not shown.
 */
export function AboutChangelog() {
  const prefersReduced = useReducedMotion() ?? false;
  const isPinned = useMediaQuery(PIN_QUERY) && !prefersReduced;
  const isXl = useMediaQuery(XL_QUERY);
  const isLg = useMediaQuery(LG_QUERY);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chatColRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const chatHoverRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const userMovedRef = useRef(false);
  const inView = useInView(stageRef, { once: true, margin: "-20% 0px" });
  const [scrollStep, setScrollStep] = useState(1);
  const [timedStep, setTimedStep] = useState(0);
  const [zoomPct, setZoomPct] = useState(100);

  // Camera (board pan + zoom)
  const camX = useMotionValue(0);
  const camY = useMotionValue(0);
  const camScale = useMotionValue(DEFAULT_ZOOM);
  useMotionValueEvent(camScale, "change", (v) =>
    setZoomPct(Math.round(v * 100)),
  );

  // Pinned: bind page scroll directly & smoothly via spring-damped progress ([P3-A2]).
  // Drives step reveals AND smooth camera pan directly from scroll so it tracks scroll 1:1.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.45,
  });

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (!isPinned) return;
    let next: number;
    if (v < 0.2) {
      // Intro chat bubbles (steps 1..4)
      next = 1 + Math.min(3, Math.floor((v / 0.2) * 4));
    } else if (v < 0.9) {
      // 5 sticky notes (steps 5..9), equal generous scroll bands (~14% of 520svh each)
      const noteIdx = Math.min(
        NOTE_COUNT - 1,
        Math.floor(((v - 0.2) / 0.7) * NOTE_COUNT),
      );
      next = STEP.firstNote + noteIdx;
    } else {
      next = STEP_MAX;
    }
    setScrollStep((cur) => (cur === next ? cur : next));

    // Continuously glide the board camera between note centers as the user scrolls
    if (isXl && !userMovedRef.current && v >= 0.18) {
      const el = viewportRef.current;
      if (el && el.clientWidth > 0) {
        const w = el.clientWidth;
        const h = el.clientHeight;
        const noteSpan = Math.min(
          NOTE_COUNT - 1,
          Math.max(0, ((v - 0.2) / 0.7) * NOTE_COUNT - 0.35),
        );
        const i0 = Math.floor(noteSpan);
        const i1 = Math.min(NOTE_COUNT - 1, i0 + 1);
        const frac = noteSpan - i0;
        // Smoothstep between notes so the camera pauses gently on each note center
        const eased = frac * frac * (3 - 2 * frac);
        const p0 = NOTE_POS[i0] ?? NOTE_POS[0];
        const p1 = NOTE_POS[i1] ?? p0;
        const cx = p0.x + (p1.x - p0.x) * eased + NOTE_W / 2;
        const cy = p0.y + (p1.y - p0.y) * eased + NOTE_H_EST / 2;
        camX.set(w / 2 - cx * DEFAULT_ZOOM);
        camY.set(h / 2 - cy * DEFAULT_ZOOM);
        camScale.set(DEFAULT_ZOOM);
      }
    }
  });

  // Not pinned on very short desktop viewports (< 520px tall): play steps once in view.
  useEffect(() => {
    if (!isLg || isPinned || prefersReduced || !inView) return;
    const delayMs = timedStep >= STEP.firstNote ? NOTE_PACE_MS : 640;
    if (timedStep >= STEP_MAX) return;
    const id = window.setTimeout(() => {
      setTimedStep((s) => Math.min(STEP_MAX, s + 1));
    }, delayMs);
    return () => window.clearTimeout(id);
  }, [isLg, isPinned, prefersReduced, inView, timedStep]);

  const step = prefersReduced ? STEP_MAX : isPinned ? scrollStep : timedStep;
  const notesShown = Math.max(
    0,
    Math.min(NOTE_COUNT, step - STEP.firstNote + 1),
  );
  const focusNote = Math.max(0, notesShown - 1);
  const typing = isLg && (step === STEP.ask1 || step === STEP.ask2);

  // Keep wheel/trackpad scrolling isolated to the left chat column on desktop (lg+) only;
  // on mobile (< lg) the chat flows naturally with page scroll ([P1-A5]).
  useEffect(() => {
    if (!isLg) return;
    const col = chatColRef.current;
    const scroller = chatScrollRef.current;
    if (!col || !scroller) return;

    const onWheel = (e: globalThis.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const deltaY =
        e.deltaMode === 1
          ? e.deltaY * 24
          : e.deltaMode === 2
            ? e.deltaY * scroller.clientHeight
            : e.deltaY;

      if (deltaY !== 0) {
        scroller.scrollTop += deltaY;
      }
    };

    col.addEventListener("wheel", onWheel, { passive: false });
    return () => col.removeEventListener("wheel", onWheel);
  }, [isLg]);

  // Auto-scroll to the latest chat bubble on desktop (lg+) when the scroll story advances.
  useEffect(() => {
    if (!isLg) return;
    const scroller = chatScrollRef.current;
    if (!scroller || chatHoverRef.current) return;
    const raf = window.requestAnimationFrame(() => {
      scroller.scrollTo({
        top: scroller.scrollHeight,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [isLg, step, typing, prefersReduced]);

  /* ── Camera helpers ── */
  const viewport = () => {
    const el = viewportRef.current;
    return { w: el?.clientWidth ?? 0, h: el?.clientHeight ?? 0 };
  };

  const moveCamera = useCallback(
    (x: number, y: number, scale: number) => {
      const t = prefersReduced
        ? { duration: 0 }
        : { duration: CAMERA_GLIDE, ease: CAMERA_EASE };
      animate(camX, x, t);
      animate(camY, y, t);
      animate(camScale, scale, t);
    },
    [camX, camY, camScale, prefersReduced],
  );

  const followNote = useCallback(
    (i: number) => {
      const { w, h } = viewport();
      const pos = NOTE_POS[i] ?? NOTE_POS[0];
      if (!w) return;
      // Default view is always 100%: following a note never keeps a zoom level.
      const s = DEFAULT_ZOOM;
      moveCamera(
        w / 2 - (pos.x + NOTE_W / 2) * s,
        h / 2 - (pos.y + NOTE_H_EST / 2) * s,
        s,
      );
    },
    [moveCamera],
  );

  const fitView = useCallback(() => {
    const { w, h } = viewport();
    if (!w) return;
    const pad = 48;
    const s = Math.min(
      ZOOM.max,
      Math.max(
        ZOOM.min,
        Math.min((w - pad * 2) / BOARD.w, (h - pad * 2) / BOARD.h),
      ),
    );
    moveCamera(
      (w - BOARD.w * s) / 2 - BOARD.x * s,
      (h - BOARD.h * s) / 2 - BOARD.y * s,
      s,
    );
  }, [moveCamera]);

  /** Zoom to `ns`, keeping the viewport centre fixed. */
  const zoomTo = (ns: number) => {
    const { w, h } = viewport();
    const s = camScale.get();
    const next = Math.min(
      ZOOM.max,
      Math.max(ZOOM.min, Math.round(ns * 10) / 10),
    );
    const cx = w / 2;
    const cy = h / 2;
    userMovedRef.current = true;
    moveCamera(
      cx - ((cx - camX.get()) * next) / s,
      cy - ((cy - camY.get()) * next) / s,
      next,
    );
  };

  // Camera centres the newest note when not smoothly driven by pinned scroll (or on initial mount).
  useEffect(() => {
    if (!isXl || userMovedRef.current || (isPinned && notesShown > 0)) return;
    followNote(focusNote);
  }, [isXl, isPinned, notesShown, focusNote, followNote]);

  /* ── Cat hand pats each new note down (xl board, LOAFFY.md §7) ──────────
     The camera centres each new note, so the paw rises from the canvas's bottom
     edge at its centre, taps once the camera arrives, and leaves shortly after.
     Skipped when the visitor has moved the board, under reduced motion, and
     whenever a Loaffy is on screen (one character at a time). */
  const loaffyOnScreen = useLoaffyOnScreen();
  const [pawAction, setPawAction] = useState<CatHandAction>("exit");
  const [pawKey, setPawKey] = useState(0);
  const pawInRef = useRef(false);
  const pawTimersRef = useRef<number[]>([]);
  const prevNotesRef = useRef(notesShown);

  useEffect(() => {
    const prev = prevNotesRef.current;
    prevNotesRef.current = notesShown;
    const timers = pawTimersRef.current;
    const later = (fn: () => void, seconds: number) => {
      timers.push(window.setTimeout(fn, seconds * 1000));
    };
    const clear = () => {
      for (const id of timers) window.clearTimeout(id);
      timers.length = 0;
    };

    const allowed =
      isXl && !prefersReduced && !userMovedRef.current && !loaffyOnScreen;
    if (!allowed || notesShown < prev) {
      if (pawInRef.current) {
        clear();
        pawInRef.current = false;
        later(() => setPawAction("exit"), 0);
      }
      return;
    }
    if (notesShown === prev) return;

    clear();
    if (!pawInRef.current) {
      pawInRef.current = true;
      later(() => setPawAction("enter"), 0);
    }
    later(() => {
      setPawAction("tap");
      setPawKey((k) => k + 1);
    }, CAMERA_GLIDE);
    later(
      () => {
        pawInRef.current = false;
        setPawAction("exit");
      },
      CAMERA_GLIDE + handTiming.tap + PAT_HOLD,
    );
  }, [notesShown, isXl, prefersReduced, loaffyOnScreen]);

  useEffect(() => {
    const timers = pawTimersRef.current;
    return () => {
      for (const id of timers) window.clearTimeout(id);
    };
  }, []);

  const onCanvasKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const d: Record<string, [number, number]> = {
      ArrowLeft: [PAN_STEP, 0],
      ArrowRight: [-PAN_STEP, 0],
      ArrowUp: [0, PAN_STEP],
      ArrowDown: [0, -PAN_STEP],
    };
    const v = d[e.key];
    if (!v) return;
    e.preventDefault();
    userMovedRef.current = true;
    camX.set(camX.get() + v[0]);
    camY.set(camY.get() + v[1]);
  };

  return (
    <Section
      id="about"
      labelledBy="about-heading"
      tone="butter"
      soft
      className="-mt-[var(--border-pen)] overflow-clip border-y-2 border-line-strong"
    >
      {/* Screen-reader version of the chat bio on desktop where the chat pane is aria-hidden */}
      {isLg && <p className="sr-only">{profile.bioShort}</p>}

      <div ref={trackRef} className={cn(isPinned && "h-[520svh]")}>
        <div
          className={cn(
            "flex flex-col gap-10",
            isPinned && "sticky top-0 h-svh gap-8 py-12",
          )}
        >
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <Heading
              id="about-heading"
              as="h2"
              highlight="habit"
              highlightTone="butter"
            >
              Curious by nature, careful by habit.
            </Heading>
            <div
              onClick={() =>
                trackEvent("resume_download", { location: "about_section" })
              }
            >
              <Button
                variant="secondary"
                tone="butter"
                size="lg"
                href="/resume.pdf"
                external
              >
                Resume (PDF)
              </Button>
            </div>
          </div>

          {/* ── App window: chat (+ canvas on lg+ only; mobile shows scroll-revealed chat messages [P1-A5]) ── */}
          <div
            ref={stageRef}
            className={cn(
              "grid grid-cols-1 overflow-hidden rounded-xl border-2 border-line-strong bg-bg shadow-sticker lg:grid-cols-12",
              isPinned && "min-h-0 flex-1",
            )}
          >
            {/* Chat panel */}
            <div
              ref={chatColRef}
              aria-hidden={isLg ? true : undefined}
              onMouseEnter={() => {
                chatHoverRef.current = true;
              }}
              onMouseLeave={() => {
                chatHoverRef.current = false;
              }}
              className={cn(
                "flex min-h-0 flex-col",
                isLg && "lg:col-span-4 lg:border-r-2 lg:border-line-strong",
              )}
            >
              <div className="flex h-14 items-center gap-3 border-b-2 border-line px-4">
                <ArrowLeft className="h-5 w-5 text-text-muted" />
                <span className="flex-1 font-body text-body font-semibold text-text">
                  About Lucas
                </span>
                <X className="h-5 w-5 text-text-muted" />
              </div>

              {isLg ? (
                <div
                  ref={chatScrollRef}
                  className={cn(
                    "min-h-0 flex-1 overflow-y-auto overscroll-contain",
                    !isPinned && "h-128 flex-none",
                  )}
                >
                  <div className="flex min-h-full flex-col justify-end gap-4 p-4">
                    <AnimatePresence initial={false}>
                      {step >= STEP.ask1 && (
                        <UserBubble key="ask1">Who&apos;s Lucas?</UserBubble>
                      )}
                      {step >= STEP.bio && (
                        <AssistantMessage key="bio">
                          <span className="flex items-center gap-3">
                            <picture>
                              <source
                                srcSet={profile.portrait.src.replace(
                                  /\.webp$/i,
                                  ".avif",
                                )}
                                type="image/avif"
                              />
                              <source
                                srcSet={profile.portrait.src}
                                type="image/webp"
                              />
                              <img
                                src={profile.portrait.src}
                                alt=""
                                width={48}
                                height={48}
                                loading="lazy"
                                decoding="async"
                                className="block h-12 w-12 rounded-sm border-2 border-line-strong object-cover"
                              />
                            </picture>
                            <span className="font-display font-bold text-text">
                              {profile.name}
                            </span>
                          </span>
                          <p>{profile.bioShort}</p>
                        </AssistantMessage>
                      )}
                      {step >= STEP.ask2 && (
                        <UserBubble key="ask2">
                          What has he worked on since 2016?
                        </UserBubble>
                      )}
                      {step >= STEP.reply && (
                        <AssistantMessage key="reply">
                          <p>
                            Here&apos;s his changelog, one sticky note per role.
                            It&apos;s on the canvas.
                          </p>
                          <span className="flex items-center gap-3 rounded-md border-2 border-line-strong bg-bg p-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xs border-2 border-on-pastel bg-butter text-on-pastel">
                              <StickyNote className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-body text-body font-semibold text-text">
                                Changelog (2016 – Now)
                              </span>
                              <span className="block font-body text-caption text-text-muted">
                                {NOTE_COUNT} notes · {profile.years} years in
                                design
                              </span>
                            </span>
                          </span>
                        </AssistantMessage>
                      )}
                      {step >= STEP_RESUME && (
                        <AssistantMessage key="resume">
                          <p>Want the full story? The resume has it all.</p>
                          <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={-1}
                            aria-label="Resume (PDF) (opens in new tab)"
                            onClick={() =>
                              trackEvent("resume_download", {
                                location: "about_chat_card",
                              })
                            }
                            className="lp-sticker-sm-interactive flex min-h-12 items-center justify-between gap-3 rounded-md border-2 border-on-pastel bg-butter p-3 text-on-pastel"
                          >
                            <span className="flex items-center gap-3">
                              <FileText
                                className="h-5 w-5 shrink-0"
                                aria-hidden="true"
                              />
                              <span className="font-body text-body font-semibold">
                                Resume (PDF)
                              </span>
                            </span>
                            <ArrowUpRight
                              className="h-5 w-5 shrink-0"
                              aria-hidden="true"
                            />
                          </a>
                        </AssistantMessage>
                      )}
                      {typing && <TypingBubble key={`typing-${step}`} />}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* Mobile (< lg): no internal scroll, sticky notes reveal as messages on page scroll ([P1-A5]) */
                <div className="flex flex-col gap-4 p-4">
                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={prefersReduced ? { duration: 0 } : springCalm}
                  >
                    <UserBubble>Who&apos;s Lucas?</UserBubble>
                  </motion.div>

                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={prefersReduced ? { duration: 0 } : springCalm}
                  >
                    <AssistantMessage>
                      <span className="flex items-center gap-3">
                        <picture>
                          <source
                            srcSet={profile.portrait.src.replace(
                              /\.webp$/i,
                              ".avif",
                            )}
                            type="image/avif"
                          />
                          <source
                            srcSet={profile.portrait.src}
                            type="image/webp"
                          />
                          <img
                            src={profile.portrait.src}
                            alt=""
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                            className="block h-12 w-12 rounded-sm border-2 border-line-strong object-cover"
                          />
                        </picture>
                        <span className="font-display font-bold text-text">
                          {profile.name}
                        </span>
                      </span>
                      <p>{profile.bioShort}</p>
                    </AssistantMessage>
                  </motion.div>

                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={prefersReduced ? { duration: 0 } : springCalm}
                  >
                    <UserBubble>What has he worked on since 2016?</UserBubble>
                  </motion.div>

                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={prefersReduced ? { duration: 0 } : springCalm}
                  >
                    <AssistantMessage>
                      <p>Here&apos;s his changelog, one sticky note per role.</p>
                    </AssistantMessage>
                  </motion.div>

                  <ol
                    aria-label="Changelog, 2016 to now"
                    className="flex flex-col gap-4"
                  >
                    {experience.map((item, i) => {
                      const rotate = NOTE_POS[i % NOTE_POS.length]?.rotate ?? 0;
                      return (
                        <motion.li
                          key={`${item.company}-${item.period}`}
                          initial={
                            prefersReduced
                              ? false
                              : { opacity: 0, y: 20, rotate: rotate + 3 }
                          }
                          whileInView={{
                            opacity: 1,
                            y: 0,
                            rotate: prefersReduced ? 0 : rotate * 0.6,
                          }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={
                            prefersReduced ? { duration: 0 } : springCalm
                          }
                          className="flex items-start gap-3"
                        >
                          <Avatar toneClass="bg-butter">
                            <ClawdMark className="w-6" />
                          </Avatar>
                          <div
                            className={cn(
                              "min-w-0 flex-1 flex flex-col gap-2 rounded-lg rounded-tl-xs border-2 border-on-pastel p-4 text-on-pastel shadow-sticker-sm",
                              NOTE_TONES[i % NOTE_TONES.length],
                            )}
                          >
                            <NoteBody item={item} />
                          </div>
                        </motion.li>
                      );
                    })}
                  </ol>

                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={prefersReduced ? { duration: 0 } : springCalm}
                  >
                    <AssistantMessage>
                      <p>Want the full story? The resume has it all.</p>
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Resume (PDF) (opens in new tab)"
                        onClick={() =>
                          trackEvent("resume_download", {
                            location: "about_chat_card",
                          })
                        }
                        className="lp-sticker-sm-interactive flex min-h-12 items-center justify-between gap-3 rounded-md border-2 border-on-pastel bg-butter p-3 text-on-pastel"
                      >
                        <span className="flex items-center gap-3">
                          <FileText
                            className="h-5 w-5 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="font-body text-body font-semibold">
                            Resume (PDF)
                          </span>
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    </AssistantMessage>
                  </motion.div>
                </div>
              )}

              <div className="border-t-2 border-line p-3">
                <div className="flex items-center gap-2 rounded-sm border-2 border-line bg-surface px-3 py-2">
                  <span className="flex-1 font-body text-body text-text-subtle">
                    Ask about Lucas…
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-inverse-bg text-inverse-text">
                    <ArrowUp className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* ── Canvas (desktop lg+ only; hidden on mobile per [P1-A5]) ────────── */}
            {isLg && (
              <section
                aria-label="Changelog canvas, 2016 to now"
                className={cn(
                  "relative overflow-hidden bg-surface lg:col-span-8",
                  isXl ? (isPinned ? "min-h-0" : "min-h-160") : "p-4 pl-20",
                )}
              >
              <CanvasDots id="about-canvas-dots" />

              {/* Tool rail (decorative) */}
              <div
                aria-hidden="true"
                className="absolute left-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1 rounded-md border-2 border-line-strong bg-bg p-1 shadow-sticker-sm"
              >
                {TOOLS.map((Icon, i) => (
                  <span
                    key={i}
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-xs text-text-muted",
                      i === 1 && "bg-butter text-on-pastel",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                ))}
              </div>

              {/* File name */}
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 z-20 rounded-pill border-2 border-line-strong bg-bg px-3 py-1 font-body text-caption font-semibold text-text"
              >
                Changelog (2016 – Now)
              </span>

              {isXl ? (
                <>
                  {/* Viewport: drag to pan, arrow keys when focused */}
                  <div
                    ref={viewportRef}
                    tabIndex={0}
                    onKeyDown={onCanvasKey}
                    role="group"
                    aria-label="Board. Drag or use the arrow keys to move around."
                    className="absolute inset-0 cursor-grab outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-focus active:cursor-grabbing"
                  >
                    <motion.div
                      drag
                      dragMomentum
                      onDragStart={() => {
                        userMovedRef.current = true;
                      }}
                      style={{
                        x: camX,
                        y: camY,
                        scale: camScale,
                        originX: 0,
                        originY: 0,
                      }}
                      className="absolute left-0 top-0 h-190 w-290"
                    >
                      <ol>
                        {experience.map((item, i) => {
                          const pos =
                            NOTE_POS[i % NOTE_POS.length] ?? NOTE_POS[0];
                          const placed = i < notesShown;
                          return (
                            <motion.li
                              key={`${item.company}-${item.period}`}
                              initial={false}
                              animate={
                                placed
                                  ? {
                                      opacity: 1,
                                      scale: 1,
                                      y: 0,
                                      rotate: pos.rotate,
                                    }
                                  : {
                                      opacity: 0,
                                      scale: 1.12,
                                      y: -24,
                                      rotate: pos.rotate + 6,
                                    }
                              }
                              transition={
                                prefersReduced ? { duration: 0 } : springCalm
                              }
                              style={{ left: pos.x, top: pos.y }}
                              className={cn(
                                "absolute flex w-80 flex-col gap-3 rounded-xs border-2 border-on-pastel p-6 text-on-pastel shadow-sticker-sm",
                                NOTE_TONES[i % NOTE_TONES.length],
                              )}
                            >
                              <NoteBody item={item} />
                            </motion.li>
                          );
                        })}
                      </ol>

                      {/* Live cursors live on the board, so they pan/zoom with it */}
                      <motion.div
                        className="pointer-events-none absolute z-10"
                        initial={false}
                        animate={{
                          left: (NOTE_POS[focusNote]?.x ?? 0) + NOTE_W - 48,
                          top: (NOTE_POS[focusNote]?.y ?? 0) + NOTE_H_EST - 40,
                          opacity: notesShown > 0 ? 1 : 0,
                        }}
                        transition={
                          prefersReduced ? { duration: 0 } : springCalm
                        }
                      >
                        <CanvasCursor name="Lucas" toneClass="bg-mint" />
                      </motion.div>
                      <motion.div
                        className="pointer-events-none absolute left-240 top-160 z-10"
                        initial={false}
                        animate={
                          prefersReduced
                            ? { opacity: 1 }
                            : { x: [0, -16, -8, 0], y: [0, -8, 4, 0] }
                        }
                        transition={{
                          duration: 6.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <CanvasCursor name="Claude" toneClass="bg-sky" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Cat hand: rises from the canvas's bottom edge to pat the centred note */}
                  {!prefersReduced && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square h-[48%] -translate-x-1/2"
                    >
                      <CatHand
                        side="fur"
                        claws={false}
                        size={240}
                        action={pawAction}
                        playKey={pawKey}
                        decorative
                        className="block h-full w-full"
                      />
                    </div>
                  )}

                  {/* Zoom + Fit view controls */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-sm border-2 border-line-strong bg-bg p-1 shadow-sticker-sm">
                    <ControlButton
                      label="Zoom out"
                      onClick={() => zoomTo(camScale.get() - ZOOM.step)}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </ControlButton>
                    <ControlButton
                      label={`Zoom ${zoomPct}%. Reset to 100%`}
                      wide
                      onClick={() => zoomTo(DEFAULT_ZOOM)}
                    >
                      <span aria-hidden="true">{zoomPct}%</span>
                    </ControlButton>
                    <ControlButton
                      label="Zoom in"
                      onClick={() => zoomTo(camScale.get() + ZOOM.step)}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </ControlButton>
                    <span
                      aria-hidden="true"
                      className="mx-1 h-6 w-0.5 bg-line"
                    />
                    <ControlButton
                      label="Fit view: show all notes"
                      wide
                      onClick={() => {
                        userMovedRef.current = true;
                        fitView();
                      }}
                    >
                      <Maximize2 className="h-4 w-4" aria-hidden="true" />
                      <span aria-hidden="true">Fit view</span>
                    </ControlButton>
                  </div>
                </>
              ) : (
                <ol className="relative grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2">
                  {experience.map((item, i) => {
                    const placed = i < notesShown;
                    const rotate = NOTE_POS[i % NOTE_POS.length]?.rotate ?? 0;
                    return (
                      <motion.li
                        key={`${item.company}-${item.period}`}
                        initial={false}
                        animate={
                          placed
                            ? { opacity: 1, scale: 1, y: 0, rotate }
                            : {
                                opacity: 0,
                                scale: 1.12,
                                y: -24,
                                rotate: rotate + 6,
                              }
                        }
                        transition={
                          prefersReduced ? { duration: 0 } : springCalm
                        }
                        className={cn(
                          "flex flex-col gap-3 rounded-xs border-2 border-on-pastel p-6 text-on-pastel shadow-sticker-sm",
                          NOTE_TONES[i % NOTE_TONES.length],
                        )}
                      >
                        <NoteBody item={item} />
                      </motion.li>
                    );
                  })}
                </ol>
              )}
            </section>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
