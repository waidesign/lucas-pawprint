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
 * 1. Plays the full-viewport standalone Loaffy Box Hatch → Explosion → Quick Pose Reel
 *    curtain FIRST (`phase !== "settled"`), hiding the Header and all Hero elements.
 * 2. Only AFTER Loaffy finishes its pose reel (`phase === "settled"` at 2560ms) do the
 *    Header and Hero elements reveal:
 *    - Compact Loaffy (`size={128}`) + Eyebrow (no availability badge per [P1-A2])
 *    - Blush Smash Sticker ABOVE H1 ([P1-A3])
 *    - Giant `display-xl` H1 ([P1-A4])
 *    - Supporting copy + CTAs + Scroll cue.
 */
export function Hero() {
  const prefersReduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<HeroStagePhase>(() =>
    prefersReduced ? "settled" : "shaking"
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

    setPhase("shaking");
    setPoseBeat(0);

    // 880ms (22 * 40ms): Box explodes & BIG Loaffy jumps out
    const tExplode = window.setTimeout(() => {
      setPhase("exploding");
    }, 880);

    // 1360ms (34 * 40ms): Quick Pose 1 (Shades)
    const tPose0 = window.setTimeout(() => {
      setPhase("posing");
      setPoseBeat(0);
    }, 1360);

    // 1760ms (44 * 40ms): Quick Pose 2 (Wink)
    const tPose1 = window.setTimeout(() => {
      setPoseBeat(1);
    }, 1760);

    // 2160ms (54 * 40ms): Quick Pose 3 (Vibing)
    const tPose2 = window.setTimeout(() => {
      setPoseBeat(2);
    }, 2160);

    // 2560ms (64 * 40ms): Intro curtain lifts; Header + Hero Text & Components appear!
    const tSettle = window.setTimeout(() => {
      setPhase("settled");
    }, 2560);

    timersRef.current = [tExplode, tPose0, tPose1, tPose2, tSettle];
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
      className="relative w-full bg-bg px-4 py-12 text-text md:px-10 md:py-16 lg:px-20 lg:py-20"
    >
      <div className="flex w-full flex-col items-center text-center">
        {/* Top-level LoaffyStage (no transform/opacity wrapper so its fixed z-modal curtain covers 100vw x 100dvh above SiteNav) */}
        <LoaffyStage
          phase={prefersReduced ? "settled" : phase}
          poseBeat={poseBeat}
          onSkip={handleSkipIntro}
          reducedMotion={prefersReduced}
        />

        {/* Eyebrow (dot-free per [P1-A6], no availability badge per [P1-A2]) */}
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
          className="mt-4"
        >
          <Eyebrow>
            {profile.name} · {profile.title}
          </Eyebrow>
        </motion.div>

        {/* Blush Smash Sticker moved ABOVE H1 ([P1-A3]) */}
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
          transition={
            prefersReduced
              ? { duration: 0 }
              : { ...springCalm, delay: stagger * 2 }
          }
          className="mt-6"
        >
          <Sticker tone="blush" rotate={-2} size="md">
            Everyone designs with AI now. It all looks like slop.{" "}
            <span className="inline-block rounded-xs border border-line-strong bg-butter px-2 py-1 font-display font-bold text-on-pastel">
              Except mine.
            </span>
          </Sticker>
        </motion.div>

        {/* Giant Display-XL H1 ([P1-A4]) */}
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
              : { ...springCalm, delay: stagger * 3 }
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

        {/* Supporting copy */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={
            heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { ...springCalm, delay: stagger * 4 }
          }
          className="mt-6 max-w-2xl font-body text-body-lg text-text-muted"
        >
          I design web products, apps and motion for SaaS, e-commerce and
          data-heavy platforms, and I build my own.
        </motion.p>

        {/* Primary & Secondary CTAs */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={
            heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { ...springCalm, delay: stagger * 5 }
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

        {/* Scroll cue */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={heroRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.28, delay: stagger * 6 }
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
