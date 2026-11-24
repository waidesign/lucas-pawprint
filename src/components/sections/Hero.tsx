"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Calendar } from "lucide-react";
import { profile } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";
import {
  LoaffyStage,
  type HeroStagePhase,
} from "@/components/mascot/LoaffyStage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Sticker } from "@/components/ui/Sticker";
import { springCalm, stagger } from "@/lib/motion";

/**
 * Hero Section:
 * 1. Full-viewport Landing Intro plays alone first (`drop` -> `tremor` -> `swell` -> `exploding` -> 6 `posing` beats).
 * 2. Settled Hero contains NO Loaffy ([P1-A1]), and orders elements top-to-bottom:
 *    - Blush Smash Sticker ("Everyone designs with AI now. It all looks like slop. Except mine.")
 *    - Eyebrow ("LUCAS (WAI PHYO AUNG) · PRODUCT & MOTION DESIGNER") directly under the sticker ([P1-A2])
 *    - Giant `display-xl` H1 ("Think outside the box with Lucas & Loaffy.")
 *    - Supporting copy + CTAs + Scroll cue.
 */
export function Hero() {
  const prefersReduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<HeroStagePhase>(() =>
    prefersReduced ? "settled" : "drop"
  );
  const [poseBeat, setPoseBeat] = useState(0);
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

    // 840–1480ms (640ms): Exponential pressure swell + violent hatch rattle (Loaffy tucked inside!)
    const tSwell = window.setTimeout(() => {
      setPhase("swell");
    }, 840);

    // 1480–2120ms (640ms): BOOM! 4 box pieces blast apart as Loaffy erupts UP from INSIDE the box!
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
      runChoreography();
    }, 0);
    return () => {
      window.clearTimeout(startId);
      clearTimers();
    };
  }, [runChoreography, clearTimers]);

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

  const handleSkipIntro = () => {
    clearTimers();
    setPhase("settled");
  };

  const heroRevealed = prefersReduced || phase === "settled";

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full bg-bg px-4 py-16 text-text md:px-10 md:py-20 lg:px-20 lg:py-24"
    >
      {/* Standalone Full-Viewport Intro Curtain (renders `null` once settled — [P1-A1]) */}
      <LoaffyStage
        phase={prefersReduced ? "settled" : phase}
        poseBeat={poseBeat}
        onSkip={handleSkipIntro}
        reducedMotion={prefersReduced}
      />

      <div className="flex w-full flex-col items-center text-center">
        {/* 1. Blush Smash Sticker at top ([P1-A3]) */}
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
          <Sticker tone="blush" rotate={-2} size="md">
            Everyone designs with AI now. It all looks like slop.{" "}
            <span className="inline-block rounded-xs border border-line-strong bg-butter px-2 py-1 font-display font-bold text-on-pastel">
              Except mine.
            </span>
          </Sticker>
        </motion.div>

        {/* 2. Eyebrow moved directly UNDER the Smash Sticker ([P1-A2]) */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={
            heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { ...springCalm, delay: stagger }
          }
          className="mt-6"
        >
          <Eyebrow>
            {profile.name} · {profile.title}
          </Eyebrow>
        </motion.div>

        {/* 3. Giant Display-XL H1 */}
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
          <Heading
            id="hero-heading"
            as="h1"
            size="display-xl"
            highlight="box"
            highlightTone="lilac"
          >
            Think outside the box with Lucas & Loaffy.
          </Heading>
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
          className="mt-10"
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
