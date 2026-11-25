"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import type { MotionValue, Transition } from "motion/react";
import {
  ProcessIllustration,
  type ProcessIllustrationId,
} from "./ProcessIllustrations";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { ProcessHandScene } from "@/components/mascot/ProcessHandScene";
import { profile } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { springCalm } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Heading, HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

interface ProcessSceneSpec {
  stepName: string;
  line: string;
  detail: string;
  tone: Tone;
  illustration: ProcessIllustrationId;
  scrubRange: [number, number];
}

const PROCESS_SCENES: ProcessSceneSpec[] = [
  {
    stepName: "Understand",
    line: "First, I ask a lot of questions.",
    detail:
      "I map what users actually struggle with, audit the existing product, and separate real constraints from assumptions before opening a canvas.",
    tone: "butter",
    illustration: "understand",
    scrubRange: [0, 0.2],
  },
  {
    stepName: "Shape",
    line: "Then I sketch the flow before the pixels.",
    detail:
      "I strip the journey down to the fewest steps possible, sketching low-friction wireframes and decision branches with PMs and engineers.",
    tone: "sky",
    illustration: "shape",
    scrubRange: [0.2, 0.45],
  },
  {
    stepName: "Design",
    line: "Then I design the system, not just the screen.",
    detail:
      "I build tokens, accessible states, and reusable components on the 4/8 grid so design and production code speak the exact same language.",
    tone: "lilac",
    illustration: "design",
    scrubRange: [0.45, 0.7],
  },
  {
    stepName: "Motion",
    line: "Then I make it move, with purpose.",
    detail:
      "Every transition explains a change of state, hierarchy, or system progress on a 40ms beat, with full reduced-motion support.",
    tone: "blush",
    illustration: "motion",
    scrubRange: [0.7, 0.9],
  },
  {
    stepName: "Ship",
    line: "Then I ship it, and check it twice.",
    detail:
      "I review staging builds against the design system, test keyboard and responsive breakpoints, and ship clean production interfaces.",
    tone: "mint",
    illustration: "ship",
    scrubRange: [0.9, 1],
  },
];

/* Resting tilt per card (degrees): kept small so stacked columns never collide. */
const CARD_TILTS = [-2, 1, -1, 2, -1] as const;

/* Pinned (≥ lg): each card rises in cleanly across its slice of the 300vh scrub. */
const PIN_REVEAL_START = 0;
const PIN_REVEAL_STEP = 0.16;
const PIN_REVEAL_LENGTH = 0.2;
const PIN_REVEAL_FROM = "32vh";

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

/* Hover "come out": hovered card stays put while later cards slide right by overlap. */
const LIFT_Y = -8;
const UNCOVER_SHIFT_LG = 48; // matches lg:-ml-12
const UNCOVER_SHIFT_XL = 64; // matches xl:-ml-16
const XL_QUERY = "(min-width: 1280px)";

/* ease-out-soft at duration-slow (480ms): calm glide without overshoot. */
const HOVER_TRANSITION: Transition = {
  type: "tween",
  duration: 0.48,
  ease: [0.22, 1, 0.36, 1],
};

interface ProcessCardProps {
  scene: ProcessSceneSpec;
  index: number;
  total: number;
  isActive: boolean;
  isLifted: boolean;
  shiftX: number;
  onActivate: () => void;
  onRelease: () => void;
  pinProgress: MotionValue<number>;
  isDesktopPinned: boolean;
  isLg: boolean;
  prefersReduced: boolean;
}

function ProcessCard({
  scene,
  index,
  total,
  isActive,
  isLifted,
  shiftX,
  onActivate,
  onRelease,
  pinProgress,
  isDesktopPinned,
  isLg,
  prefersReduced,
}: ProcessCardProps) {
  const tilt = CARD_TILTS[index % CARD_TILTS.length];

  const pinStart = PIN_REVEAL_START + index * PIN_REVEAL_STEP;
  const range: [number, number] = [pinStart, pinStart + PIN_REVEAL_LENGTH];
  const revealY = useTransform(pinProgress, range, [PIN_REVEAL_FROM, "0vh"]);
  const revealOpacity = useTransform(
    pinProgress,
    [range[0], range[0] + PIN_REVEAL_LENGTH / 2],
    [0, 1],
  );
  // Each step's Cat Hand scene scrubs across its own slice of the pinned timeline ([P3-A1])
  const sceneScrub = useTransform(pinProgress, scene.scrubRange, [0, 1]);
  // Step 5 (Ship): "Shipped" sticker stamps in across 90–98% scrub
  const shippedScale = useTransform(pinProgress, [0.9, 0.96, 1], [1.24, 0.96, 1]);
  const shippedOpacity = useTransform(pinProgress, [0.88, 0.94], [0, 1]);

  const innerCard = (
    <motion.div
      initial={false}
      animate={
        prefersReduced
          ? { x: 0, y: 0, rotate: isActive ? 0 : tilt }
          : {
              x: shiftX,
              y: isLifted ? LIFT_Y : 0,
              rotate: isLifted || isActive ? 0 : tilt,
            }
      }
      transition={prefersReduced ? { duration: 0 } : HOVER_TRANSITION}
      className="relative h-full"
    >
      {/* Folder tab on the first card */}
      {index === 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-8 left-8 inline-flex h-8 items-center rounded-t-xs border-2 border-b-0 border-line-strong bg-bg px-3 font-mono text-label uppercase tracking-wider text-text"
        >
          Process
        </span>
      )}

      {/* "Shipped" sticker stamp on step 5 (§6.4 / USER-FLOWS.md §5) */}
      {index === 4 && (isActive || prefersReduced) && (
        <motion.span
          aria-hidden="true"
          style={
            isDesktopPinned
              ? { scale: shippedScale, opacity: shippedOpacity }
              : undefined
          }
          initial={prefersReduced ? false : { scale: 1.2, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: -4 }}
          transition={prefersReduced ? { duration: 0 } : springCalm}
          className="absolute -right-2 -top-4 z-20 inline-flex rounded-pill border-2 border-on-pastel bg-butter px-3 py-1 font-mono text-caption font-bold uppercase text-on-pastel shadow-sticker-sm"
        >
          Shipped
        </motion.span>
      )}

      <article
        className={cn(
          "flex h-full flex-col items-start gap-4 rounded-lg border-2 border-line-strong bg-bg p-6 text-left text-text shadow-sticker",
          prefersReduced && isActive && "outline-2 outline-offset-4 outline-focus",
        )}
      >
        <h3
          className={cn(
            "font-display text-text",
            HEADING_SCALE_CLASSES.h3,
          )}
        >
          {scene.stepName}
        </h3>

        <p
          aria-hidden="true"
          className="font-display text-h1 font-extrabold leading-none text-text"
        >
          {String(index + 1).padStart(2, "0")}.
        </p>

        <div className="space-y-2">
          <p className="font-body text-body font-semibold text-text">
            {scene.line}
          </p>
          <p className="font-body text-body text-text-muted">
            {scene.detail}
          </p>
        </div>

        {/* The pastel panel is a light surface in every theme, so scope it to the light
            theme: the hand scenes' bg-surface/bg-bg pieces and the CatHand outline
            (--lp-outline) stay paper + ink instead of turning near-black in Dark/Warm Dark. */}
        <div
          data-theme="light"
          className={cn(
            "relative mt-auto flex h-44 w-full items-center justify-center overflow-hidden rounded-md border-2 border-on-pastel text-on-pastel lg:h-36",
            TONE_BG_CLASSES[scene.tone],
          )}
        >
          {isActive ? (
            <ProcessHandScene
              kind={scene.illustration}
              scrub={isDesktopPinned ? sceneScrub : undefined}
              play
              handSize={isLg ? 144 : 176}
            />
          ) : (
            <ProcessIllustration id={scene.illustration} />
          )}
        </div>
      </article>
    </motion.div>
  );

  // Desktop pinned (≥ lg): scrubbed reveal driven by GSAP ScrollTrigger progress
  if (isDesktopPinned) {
    return (
      <motion.li
        tabIndex={0}
        aria-label={`Step ${index + 1} of ${total}: ${scene.stepName}`}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onBlur={onRelease}
        onClick={onActivate}
        style={{
          y: revealY,
          opacity: revealOpacity,
          zIndex: index,
        }}
        className="relative min-w-0 cursor-pointer rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus lg:flex-1 lg:not-first:-ml-12 xl:not-first:-ml-16"
      >
        {innerCard}
      </motion.li>
    );
  }

  // Mobile/tablet (< lg, non-reduced): no pin, each card animates once into view
  if (!prefersReduced) {
    return (
      <motion.li
        tabIndex={0}
        aria-label={`Step ${index + 1} of ${total}: ${scene.stepName}`}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ ...springCalm, delay: index * 0.08 }}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        style={{ zIndex: isLifted ? "var(--z-sticker)" : index }}
        className="relative min-w-0 cursor-pointer rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      >
        {innerCard}
      </motion.li>
    );
  }

  // Reduced motion: five static frames selectable via Previous / Next or click
  return (
    <li
      tabIndex={0}
      aria-label={`Step ${index + 1} of ${total}: ${scene.stepName}`}
      aria-current={isActive ? "step" : undefined}
      onFocus={onActivate}
      onClick={onActivate}
      style={{ zIndex: index }}
      className="relative min-w-0 rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus lg:flex-1 lg:not-first:-ml-12 xl:not-first:-ml-16"
    >
      {innerCard}
    </li>
  );
}

/**
 * ProcessStory (USER-FLOWS.md §5 & LOAFFY-ANIMATION.md §6.4):
 * - Desktop (`≥ lg`, motion ok): ~300vh pinned GSAP ScrollTrigger (dynamically imported,
 *   Home only) scrubbing 5 scenes and driving Loaffy/CatHand via LoaffyBus/Rive inputs.
 * - `< lg` (motion ok): unpinned 5 stacked steps, each animating once into view.
 * - Reduced motion: 5 static frames with Previous / Next buttons & `aria-live="polite"`.
 * - Copy lines are real DOM text announced politely as the active scene changes.
 */
export function ProcessStory() {
  const prefersReduced = useReducedMotion() ?? false;
  const isLg = useMediaQuery(LG_QUERY);
  const isXl = useMediaQuery(XL_QUERY);
  const isDesktopPinned = isLg && !prefersReduced;

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lastScrubStepRef = useRef(0);
  const pinProgress = useMotionValue(prefersReduced ? 1 : 0);

  const [active, setActive] = useState(0);
  const [lifted, setLifted] = useState<number | null>(null);

  const activateStep = useCallback((idx: number, withLift = false) => {
    const clamped = Math.max(0, Math.min(PROCESS_SCENES.length - 1, idx));
    setActive(clamped);
    if (withLift) setLifted(clamped);
  }, []);

  // Dynamically load GSAP ScrollTrigger ONLY on ≥ lg and when reduced motion is off
  useEffect(() => {
    if (!isDesktopPinned) {
      pinProgress.set(1);
      return;
    }

    // Reset immediately so cards never stay stuck at 1 from the initial SSR false→true flip
    // while GSAP is loading asynchronously.
    pinProgress.set(0);

    let cancelled = false;
    let revertFn: (() => void) | undefined;
    let resizeObserver: ResizeObserver | null = null;
    let refreshRaf: number | null = null;

    const syncProgress = (p: number) => {
      pinProgress.set(p);

      const nextStep =
        p < 0.2
          ? 0
          : p < 0.45
            ? 1
            : p < 0.7
              ? 2
              : p < 0.9
                ? 3
                : 4;

      if (nextStep !== lastScrubStepRef.current) {
        lastScrubStepRef.current = nextStep;
        setActive(nextStep);
      }
    };

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !trackRef.current || !stageRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      let trigger: ReturnType<typeof ScrollTrigger.create> | null = null;

      const ctx = gsap.context(() => {
        trigger = ScrollTrigger.create({
          trigger: stageRef.current,
          start: "top top",
          end: "+=200%", // 100vh stage + 200vh pin distance = ~300vh total scroll
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => syncProgress(self.progress),
          onRefresh: (self) => syncProgress(self.progress),
        });
      }, trackRef);

      const scheduleRefresh = () => {
        if (cancelled) return;
        if (refreshRaf !== null) window.cancelAnimationFrame(refreshRaf);
        refreshRaf = window.requestAnimationFrame(() => {
          refreshRaf = null;
          if (!cancelled) {
            ScrollTrigger.refresh();
          }
        });
      };

      // Measure accurate trigger bounds immediately & whenever content above (lazy images, fonts, intro) shifts height.
      ScrollTrigger.refresh();
      if (trigger) {
        syncProgress((trigger as { progress: number }).progress);
      }

      if (typeof ResizeObserver !== "undefined") {
        let lastHeight = document.body.scrollHeight;
        resizeObserver = new ResizeObserver(() => {
          const nextHeight = document.body.scrollHeight;
          if (nextHeight !== lastHeight) {
            lastHeight = nextHeight;
            scheduleRefresh();
          }
        });
        resizeObserver.observe(document.body);
      }

      document.fonts?.ready?.then(scheduleRefresh).catch(() => {});

      revertFn = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      if (refreshRaf !== null) window.cancelAnimationFrame(refreshRaf);
      resizeObserver?.disconnect();
      revertFn?.();
    };
  }, [isDesktopPinned, pinProgress]);

  const activeScene = PROCESS_SCENES[active] ?? PROCESS_SCENES[0];
  const uncoverShift = isXl ? UNCOVER_SHIFT_XL : UNCOVER_SHIFT_LG;
  const shiftFor = (i: number) =>
    isLg && lifted !== null && i > lifted ? uncoverShift : 0;

  return (
    <Section
      id="process"
      labelledBy="process-heading"
      tone="mint"
      soft
      className="overflow-x-clip border-b-2 border-line-strong"
    >
      <div ref={trackRef}>
        <div
          ref={stageRef}
          className={cn(
            "space-y-12",
            isDesktopPinned &&
              "flex min-h-screen flex-col justify-start space-y-8 py-10",
          )}
        >
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Heading
                id="process-heading"
                as="h2"
                highlight="think"
                highlightTone="mint"
              >
                How I think and ship.
              </Heading>
              <p className="mt-2 max-w-xl font-body text-body-lg text-text-muted">
                Five deliberate steps from raw questions to shipped product.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Polite live announcement of the active step's real DOM copy */}
              <p
                role="status"
                aria-live="polite"
                className={
                  prefersReduced
                    ? "rounded-pill border-2 border-line-strong bg-bg px-4 py-2 font-body text-caption font-semibold text-text shadow-sticker-sm"
                    : "sr-only"
                }
              >
                Step {active + 1} of {PROCESS_SCENES.length} —{" "}
                {activeScene?.stepName}: {activeScene?.line}
              </p>

              {/* Reduced-motion frame controls per USER-FLOWS.md §5 */}
              {prefersReduced && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    tone="butter"
                    size="md"
                    disabled={active === 0}
                    iconStart={<ArrowLeft className="h-4 w-4" />}
                    onClick={() => activateStep(active - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    tone="butter"
                    size="md"
                    disabled={active === PROCESS_SCENES.length - 1}
                    iconEnd={<ArrowRight className="h-4 w-4" />}
                    onClick={() => activateStep(active + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}

              <div
                className="shrink-0"
                onClick={() =>
                  trackEvent("book_chat_click", { location: "process" })
                }
              >
                <Button
                  variant="primary"
                  size="lg"
                  href={profile.bookingUrl}
                  external
                  iconStart={<Calendar className="h-5 w-5" />}
                >
                  Book a chat
                </Button>
              </div>
            </div>
          </div>

          <ol
            onMouseLeave={() => setLifted(null)}
            className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2 lg:flex lg:items-stretch lg:gap-0"
          >
            {PROCESS_SCENES.map((scene, i) => (
              <ProcessCard
                key={scene.stepName}
                scene={scene}
                index={i}
                total={PROCESS_SCENES.length}
                isActive={i === active}
                isLifted={i === lifted}
                shiftX={shiftFor(i)}
                onActivate={() => activateStep(i, true)}
                onRelease={() => setLifted((cur) => (cur === i ? null : cur))}
                pinProgress={pinProgress}
                isDesktopPinned={isDesktopPinned}
                isLg={isLg}
                prefersReduced={prefersReduced}
              />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
