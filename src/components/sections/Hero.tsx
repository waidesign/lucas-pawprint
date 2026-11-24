"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Calendar } from "lucide-react";
import { profile } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import {
  emitLoaffyEvent,
  emitLoaffyMessage,
  emitLoaffyTrigger,
  type Pose,
} from "@/components/mascot/LoaffyBus";
import { Loaffy } from "@/components/mascot/Loaffy";
import {
  LoaffyStage,
  type HeroStagePhase,
} from "@/components/mascot/LoaffyStage";
import { Button } from "@/components/ui/Button";
import { Sticker } from "@/components/ui/Sticker";
import { springBouncy, springCalm, stagger } from "@/lib/motion";

const INLINE_POSES: readonly Pose[] = ["wink", "shades", "vibing", "loaf"];

/**
 * Module-level flag: resets on a full page load/refresh, persists across
 * client-side navigation. The landing intro only plays on a fresh load.
 */
let landingIntroStarted = false;

/**
 * Hero Section:
 * 1. Full-viewport Landing Intro plays alone first (`drop` -> `tremor` -> `swell` -> `exploding` -> 6 `posing` beats).
 * 2. Settled Hero orders elements top-to-bottom:
 *    - Blush Smash Sticker ("Everyone designs with AI now. It all looks like slop. Except mine.")
 *    - Prominent name & role line ("LUCAS (WAI PHYO AUNG) · PRODUCT & MOTION DESIGNER") at `text-h4` ([P1-A2])
 *    - Monumental `display-xl` H1 ("Think outside the box with Lucas & Loaffy.") with comic burst rays
 *      and an animated inline Loaffy nestled right into the headline typography ([P1-A1])
 *    - Supporting copy + CTAs + Scroll cue.
 */
export function Hero() {
  const prefersReduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<HeroStagePhase>(() =>
    prefersReduced || landingIntroStarted ? "settled" : "drop"
  );
  const [poseBeat, setPoseBeat] = useState(0);
  const [inlinePoseIdx, setInlinePoseIdx] = useState(0);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  const runChoreography = useCallback(() => {
    clearTimers();

    if (prefersReduced) {
      setPhase("settled");
      return;
    }

    // 0–360ms: Box drops in with gravity & impact squash
    setPhase("drop");
    setPoseBeat(0);

    // 360–840ms: First curious knock-knock tremor + brief anticipation pause
    const tTremor = window.setTimeout(() => {
      setPhase("tremor");
    }, 360);

    // 840–1480ms (640ms): Exponential pressure swell + violent hatch rattle (box completely closed!)
    const tSwell = window.setTimeout(() => {
      setPhase("swell");
    }, 840);

    // 1480–2120ms (640ms): BOOM! 4 box pieces blast apart & Loaffy pops cleanly out from center!
    const tExplode = window.setTimeout(() => {
      setPhase("exploding");
    }, 1480);

    // 2120–4520ms (6 x 400ms = 2400ms): 6-Act Loaffy Pose & Shape-Shift Showcase!
    const tBeat0 = window.setTimeout(() => {
      setPhase("posing");
      setPoseBeat(0); // Shades
    }, 2120);

    const tBeat1 = window.setTimeout(() => {
      setPoseBeat(1); // Wink
    }, 2520);

    const tBeat2 = window.setTimeout(() => {
      setPoseBeat(2); // Vibing
    }, 2920);

    const tBeat3 = window.setTimeout(() => {
      setPoseBeat(3); // Browser Window morph
    }, 3320);

    const tBeat4 = window.setTimeout(() => {
      setPoseBeat(4); // 3D Design Cube morph
    }, 3720);

    const tBeat5 = window.setTimeout(() => {
      setPoseBeat(5); // 3D Paw celebratory jump
    }, 4120);

    // 4560ms (114 * 40ms): Intro curtain dissolves; Header + Hero Text & Components cascade in!
    const tSettle = window.setTimeout(() => {
      setPhase("settled");
    }, 4560);

    timersRef.current = [
      tTremor,
      tSwell,
      tExplode,
      tBeat0,
      tBeat1,
      tBeat2,
      tBeat3,
      tBeat4,
      tBeat5,
      tSettle,
    ];
  }, [clearTimers, prefersReduced]);

  useEffect(() => {
    const startId = window.setTimeout(() => {
      // Skip when returning home via client-side navigation (intro already seen).
      if (!landingIntroStarted) runChoreography();
      landingIntroStarted = true;
    }, 0);
    return () => {
      window.clearTimeout(startId);
      clearTimers();
    };
  }, [runChoreography, clearTimers]);

  // Gently cycle the inline headline Loaffy pose every 3.6s once settled (off under reduced motion)
  useEffect(() => {
    if (prefersReduced || phase !== "settled") return;
    const intervalId = window.setInterval(() => {
      setInlinePoseIdx((prev) => (prev + 1) % INLINE_POSES.length);
    }, 3600);
    return () => window.clearInterval(intervalId);
  }, [prefersReduced, phase]);

  // Lock page scroll while the full-viewport intro curtain is playing
  useEffect(() => {
    if (phase === "settled" || prefersReduced) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase, prefersReduced]);

  // §6.2 Hero → Work scroll morph: as #work enters (0 → 1 over 400px), look down and morph paw → window
  useEffect(() => {
    if (prefersReduced || phase !== "settled") return;

    let cancelled = false;
    let revertFn: (() => void) | undefined;
    let wasMorphed = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const workEl = document.getElementById("work");
      if (!workEl) return;

      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: workEl,
          start: "top bottom",
          end: "+=400",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const morphed = p >= 0.45;

            emitLoaffyMessage({
              kind: "state",
              target: "hero",
              form: morphed ? "window" : "paw",
              lookY: p > 0.04 ? Math.round(p * 92) : null,
            });

            if (morphed && !wasMorphed) {
              wasMorphed = true;
              emitLoaffyTrigger("land", "hero");
            } else if (!morphed && wasMorphed) {
              wasMorphed = false;
            }
          },
        });
      });

      revertFn = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revertFn?.();
      emitLoaffyMessage({
        kind: "state",
        target: "hero",
        form: "paw",
        lookY: null,
      });
    };
  }, [prefersReduced, phase]);

  const handleSkipIntro = () => {
    clearTimers();
    setPhase("settled");
  };

  const heroRevealed = prefersReduced || phase === "settled";
  const currentInlinePose: Pose = prefersReduced
    ? "loaf"
    : INLINE_POSES[inlinePoseIdx] ?? "wink";

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative mx-2 rounded-xl bg-bg md:mx-4 px-4 py-16 text-text md:rounded-2xl md:px-10 md:py-20 lg:px-20 lg:py-24"
    >
      {/* Standalone Full-Viewport Intro Curtain (unmounts once settled) */}
      <LoaffyStage
        phase={prefersReduced ? "settled" : phase}
        poseBeat={poseBeat}
        onSkip={handleSkipIntro}
        reducedMotion={prefersReduced}
      />

      <div className="flex w-full flex-col items-center text-center">
        {/* 1. Blush Smash Sticker at top */}
        <motion.div
          initial={
            prefersReduced
              ? false
              : { opacity: 0, scale: 1.16, rotate: 0, y: 16 }
          }
          animate={
            heroRevealed
              ? { opacity: 1, scale: 1, rotate: 0, y: 0 }
              : { opacity: 0, scale: 1.16, rotate: 0, y: 16 }
          }
          transition={prefersReduced ? { duration: 0 } : springCalm}
        >
          <Sticker
            tone="blush"
            rotate={-2}
            size="md"
            className="px-4 py-3 md:px-6 md:py-4"
          >
            Everyone designs with AI now. It all looks like slop.{" "}
            <span className="inline-block rounded-xs border border-line-strong bg-butter px-2 py-1 font-display font-bold text-on-pastel">
              Except mine.
            </span>
          </Sticker>
        </motion.div>

        {/* 2. Prominent Name & Role line directly under the Smash Sticker ([P1-A2]: enlarged to text-h4) */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={
            heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { ...springCalm, delay: stagger }
          }
          className="mt-6 font-display text-h4 font-bold uppercase tracking-wide text-text"
        >
          {profile.name} · {profile.title}
        </motion.p>

        {/* 3. Monumental Display-XL H1 with comic burst lines + animated inline Loaffy ([P1-A1]) */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
          animate={
            heroRevealed
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 24, scale: 0.96 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { ...springCalm, delay: stagger * 2 }
          }
          className="mt-6 w-full"
        >
          <h1
            id="hero-heading"
            className="font-display text-display-xl text-text text-balance"
          >
            <span className="relative inline-block">
              {/* Comic pen burst rays on the left of "Think" (reference: Toca Boca headline) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 48 56"
                className="pointer-events-none absolute -left-8 top-1/2 hidden h-12 w-10 -translate-y-1/2 text-line-strong md:block lg:-left-12 lg:h-16 lg:w-12"
              >
                <g
                  stroke="currentColor"
                  strokeWidth={4}
                  strokeLinecap="round"
                >
                  <line x1={6} y1={14} x2={36} y2={20} />
                  <line x1={2} y1={32} x2={34} y2={30} />
                  <line x1={12} y1={50} x2={38} y2={40} />
                </g>
              </svg>
              Think
            </span>{" "}
            outside the{" "}
            <span className="inline rounded-xs bg-lilac px-2 text-on-pastel box-decoration-clone">
              box
            </span>{" "}
            with Lucas &amp;{" "}
            <span className="inline-flex items-baseline whitespace-nowrap">
              {/* Animated inline Loaffy nestled right into "Loaffy." (mounted only once settled: 1 character on screen at a time) */}
              {heroRevealed && (
                <motion.span
                  key={currentInlinePose}
                  initial={
                    prefersReduced
                      ? false
                      : { scale: 0.84, rotate: -10, y: 8 }
                  }
                  animate={
                    prefersReduced
                      ? { scale: 1, rotate: -6, y: 0 }
                      : {
                          scale: 1,
                          rotate: [-6, -2, -6],
                          y: [0, -6, 0],
                        }
                  }
                  whileHover={
                    prefersReduced
                      ? undefined
                      : { scale: 1.14, rotate: 4, y: -10 }
                  }
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : {
                          scale: springBouncy,
                          rotate: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                        }
                  }
                  className="relative -mr-1 inline-flex h-[0.82em] w-[0.82em] translate-y-[0.12em] items-center justify-center align-baseline [&>div]:!h-full [&>div]:!w-full"
                >
                  <Loaffy
                    targetId="hero"
                    form="paw"
                    pose={currentInlinePose}
                    mood={currentInlinePose === "vibing" ? "curious" : "happy"}
                    size={128}
                    track
                    blink
                    showGroundShadow={false}
                    decorative
                  />
                </motion.span>
              )}
              <span>Loaffy.</span>
            </span>
          </h1>
        </motion.div>

        {/* 4. Supporting copy */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={
            heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { ...springCalm, delay: stagger * 3 }
          }
          className="mt-6 max-w-2xl font-body text-body-lg text-text-muted"
        >
          I design web products, apps and motion for SaaS, e-commerce and
          data-heavy platforms, and I build my own.
        </motion.p>

        {/* 5. Primary & Secondary CTAs */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={
            heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { ...springCalm, delay: stagger * 4 }
          }
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            href="#work"
            iconEnd={<ArrowRight className="h-5 w-5" />}
          >
            See selected work
          </Button>

          <Button
            variant="secondary"
            tone="lilac"
            size="lg"
            href={profile.bookingUrl}
            external
            iconStart={<Calendar className="h-5 w-5" />}
            onClick={() => {
              trackEvent("book_chat_click", { location: "hero" });
              emitLoaffyEvent("book-chat-click");
            }}
          >
            Book a chat
          </Button>
        </motion.div>

        {/* 6. Scroll cue */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={heroRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.28, delay: stagger * 5 }
          }
          className="mt-10 hidden md:block"
        >
          <a
            href="#work"
            aria-label="Scroll to selected work"
            className="inline-flex min-h-12 items-center gap-2 rounded-pill border border-line bg-surface px-4 font-body text-caption text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <span>Scroll to selected work</span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
