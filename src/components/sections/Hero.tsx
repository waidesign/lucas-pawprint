"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Calendar, FastForward } from "lucide-react";
import { profile } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { emitLoaffyEvent, type Pose } from "@/components/mascot/LoaffyBus";
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
 * Centered Theatrical Hero Section ([P1-A2], inspired by Toca Boca & upgraded for Pawprint):
 * - Single-column centered stage (full-width with 80px desktop horizontal padding).
 * - Choreography (40ms grid):
 *   0–720ms: Mystery Box shakes & hatches
 *   720–1120ms: Box explodes & vanishes; Loaffy jumps out
 *   1120–2080ms: Loaffy hits 3 quick poses (`shades` → `wink` → `vibing`, 320ms each)
 *   1920ms+: Hero headline, stickers, and CTAs spring in around Loaffy!
 * - Reduced motion skips directly to `"settled"` with zero delay.
 */
export function Hero() {
  const prefersReduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<HeroStagePhase>(() =>
    prefersReduced ? "settled" : "shaking"
  );
  const [poseBeat, setPoseBeat] = useState(0);
  const [heroRevealed, setHeroRevealed] = useState<boolean>(() => prefersReduced);
  const [activePoseOverride, setActivePoseOverride] = useState<Pose | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  const runChoreography = useCallback(() => {
    clearTimers();
    setActivePoseOverride(null);

    if (prefersReduced) {
      setPhase("settled");
      setHeroRevealed(true);
      return;
    }

    setPhase("shaking");
    setPoseBeat(0);
    setHeroRevealed(false);

    // 720ms (18 * 40ms): Box explodes & Loaffy jumps out
    const tExplode = window.setTimeout(() => {
      setPhase("exploding");
    }, 720);

    // 1120ms (28 * 40ms): Quick Pose 1 (Shades)
    const tPose0 = window.setTimeout(() => {
      setPhase("posing");
      setPoseBeat(0);
    }, 1120);

    // 1440ms (36 * 40ms): Quick Pose 2 (Wink)
    const tPose1 = window.setTimeout(() => {
      setPoseBeat(1);
    }, 1440);

    // 1760ms (44 * 40ms): Quick Pose 3 (Vibing) + Hero Text starts cascading in!
    const tPose2 = window.setTimeout(() => {
      setPoseBeat(2);
      setHeroRevealed(true);
    }, 1760);

    // 2080ms (52 * 40ms): Settle into interactive Loaf / 3D Paw
    const tSettle = window.setTimeout(() => {
      setPhase("settled");
      setHeroRevealed(true);
    }, 2080);

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

  const handleSkipIntro = () => {
    clearTimers();
    setPhase("settled");
    setHeroRevealed(true);
  };

  const effectiveRevealed = prefersReduced || heroRevealed;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-bg px-4 py-8 text-text md:px-10 md:py-12 lg:px-20 lg:py-16"
    >
      {/* Optional Skip Intro button while the 2s box hatch is playing */}
      {!effectiveRevealed && !prefersReduced && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSkipIntro}
            className="inline-flex min-h-12 items-center gap-2 rounded-pill border border-line bg-surface px-4 font-mono text-caption font-semibold text-text-muted hover:bg-surface-2 hover:text-text"
          >
            <span>Skip intro</span>
            <FastForward className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="flex w-full flex-col items-center text-center">
        {/* Top Eyebrow + Availability Sticker (cascades in as Loaffy finishes posing) */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -16, scale: 0.96 }}
          animate={
            effectiveRevealed
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: -16, scale: 0.96 }
          }
          transition={prefersReduced ? { duration: 0 } : springCalm}
          className="mb-4 flex flex-wrap items-center justify-center gap-3"
        >
          <Eyebrow beanDot tone="lilac">
            {profile.name} · {profile.title}
          </Eyebrow>
          <Sticker tone="mint" rotate={2} size="sm">
            {profile.availability}
          </Sticker>
        </motion.div>

        {/* Center Stage: Shaking Box → Explosion → Loaffy Quick Pose Reel → Interactive Mascot */}
        <LoaffyStage
          phase={prefersReduced ? "settled" : phase}
          poseBeat={poseBeat}
          activePoseOverride={activePoseOverride}
          onSelectPose={setActivePoseOverride}
          onReplay={runChoreography}
          reducedMotion={prefersReduced}
        />

        {/* Hero Text, Floating Smash Sticker & CTAs (appear right after the box pop & pose reel) */}
        <div className="mt-6 flex flex-col items-center space-y-6">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={
              effectiveRevealed
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : { ...springCalm, delay: stagger }
            }
            className="max-w-4xl"
          >
            <Heading
              id="hero-heading"
              as="h1"
              size="display"
              highlight="box"
              highlightTone="lilac"
            >
              Think outside the box with Lucas & Loaffy.
            </Heading>
          </motion.div>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={
              effectiveRevealed
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : { ...springCalm, delay: stagger * 2 }
            }
            className="max-w-2xl font-body text-body-lg text-text-muted"
          >
            I design web products, apps and motion for SaaS, e-commerce and
            data-heavy platforms, and I build my own.
          </motion.p>

          {/* Blush Smash Sticker stamping in */}
          <motion.div
            initial={
              prefersReduced
                ? false
                : { opacity: 0, scale: 1.16, rotate: 0, y: 16 }
            }
            animate={
              effectiveRevealed
                ? { opacity: 1, scale: 1, rotate: 0, y: 0 }
                : { opacity: 0, scale: 1.16, rotate: 0, y: 16 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : { ...springCalm, delay: stagger * 3 }
            }
          >
            <Sticker tone="blush" rotate={-2} size="md">
              Everyone designs with AI now. It all looks like slop.{" "}
              <span className="inline-block rounded-xs border border-line-strong bg-butter px-2 py-1 font-display font-bold text-on-pastel">
                Except mine.
              </span>
            </Sticker>
          </motion.div>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={
              effectiveRevealed
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : { ...springCalm, delay: stagger * 4 }
            }
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
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
            animate={effectiveRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.28, delay: stagger * 5 }
            }
            className="pt-4"
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
      </div>
    </section>
  );
}
