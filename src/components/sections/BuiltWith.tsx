"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";
import { LoaffyWorkspace } from "@/components/mascot/LoaffyWorkspace";
import { ClawdMark } from "@/components/ui/ClawdMark";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

/** Claude: Clawd, Claude Code's 8-bit mascot (ink pixels on the pastel tile). */
function ClaudeGlyph() {
  return <ClawdMark className="w-[78%]" />;
}

/** Gemini: the four-point spark, as a flat outlined shape (no gradient). */
function GeminiGlyph() {
  return (
    <svg viewBox="-12 -12 24 24" aria-hidden="true" className="h-[66%] w-[66%]">
      <path
        d="M0,-11 C1.2,-3 3,-1.2 11,0 C3,1.2 1.2,3 0,11 C-1.2,3 -3,1.2 -11,0 C-3,-1.2 -1.2,-3 0,-11 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LuciGlyph() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG mark, no optimisation needed
    <img
      src="/images/luci-mark.svg"
      alt=""
      width={32}
      height={32}
      className="block h-[78%] w-[78%]"
    />
  );
}

/**
 * Inline logo sticker for the headline (like Loaffy nestled in the Hero h1): a pastel
 * tile with a pen border and sticker shadow, gently rocking on its own beat.
 */
function LogoTile({
  toneClass,
  tilt,
  delay,
  children,
}: {
  toneClass: string;
  tilt: number;
  delay: number;
  children: ReactNode;
}) {
  const prefersReduced = useReducedMotion() ?? false;
  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={
        prefersReduced
          ? { rotate: tilt }
          : { rotate: [tilt, -tilt, tilt], y: [0, -4, 0] }
      }
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }
      }
      whileHover={prefersReduced ? undefined : { scale: 1.12, rotate: 0 }}
      className={cn(
        "relative mr-2 inline-flex h-[0.84em] w-[0.84em] translate-y-[0.08em] items-center justify-center rounded-sm border-2 border-on-pastel align-baseline text-on-pastel shadow-sticker-sm",
        toneClass,
      )}
    >
      {children}
    </motion.span>
  );
}

/**
 * Built-with section ([P1-A1], layout inspired by deno.com "Better JavaScript", rebuilt
 * in our design system): copy + CTA on the left, Loaffy's late-night workspace scene on
 * the right. h2 at the site heading scale (rule 17) with the Luci, Claude and Gemini
 * marks inline as stickers.
 */
export function BuiltWith() {
  return (
    <Section
      id="built-with"
      labelledBy="built-with-heading"
      tone="bg"
      className="max-md:py-14"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-8 lg:col-span-5">
          <h2
            id="built-with-heading"
            className={cn(
              "font-display text-text text-balance",
              HEADING_SCALE_CLASSES.h2,
            )}
          >
            Built with{" "}
            <span className="whitespace-nowrap">
              <LogoTile toneClass="bg-lilac" tilt={-4} delay={0}>
                <LuciGlyph />
              </LogoTile>
              Luci,
            </span>{" "}
            <span className="whitespace-nowrap">
              <LogoTile toneClass="bg-butter" tilt={3} delay={0.4}>
                <ClaudeGlyph />
              </LogoTile>
              Claude
            </span>{" "}
            &amp;{" "}
            <span className="whitespace-nowrap">
              <LogoTile toneClass="bg-mint" tilt={-3} delay={0.8}>
                <GeminiGlyph />
              </LogoTile>
              Gemini.
            </span>
          </h2>

          <p className="max-w-xl font-body text-body-lg text-text-muted">
            Luci and Claude&apos;s brains, open-source skills, and Gemini
            coding models: Argon and Neon.
          </p>

          <TextLink
            href="/work/luci"
            tone="lilac"
            iconEnd={<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
            onClick={() => trackEvent("luci_click", { location: "built_with" })}
            className="min-h-12 items-center font-body text-button font-semibold"
          >
            See how Luci works
          </TextLink>
        </div>

        <div className="lg:col-span-7">
          <LoaffyWorkspace />
        </div>
      </div>
    </Section>
  );
}
