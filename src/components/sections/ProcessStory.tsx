"use client";

import { useState } from "react";
import type { Tone } from "@/lib/cn";
import { Loaffy } from "@/components/mascot/Loaffy";
import { CatHand } from "@/components/mascot/CatHand";
import type { Form, Mood, Pose } from "@/components/mascot/LoaffyBus";
import { BeanStepper } from "@/components/ui/BeanStepper";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Sticker } from "@/components/ui/Sticker";

interface ProcessSceneSpec {
  stepName: string;
  scrollRange: string;
  line: string;
  detail: string;
  character: "loaffy" | "hand";
  mood?: Mood;
  pose?: Pose;
  form?: Form;
  tone: Tone;
}

const PROCESS_SCENES: ProcessSceneSpec[] = [
  {
    stepName: "Understand",
    scrollRange: "0–20%",
    line: "First, I ask a lot of questions.",
    detail:
      "I map what users actually struggle with, audit the existing product, and separate real constraints from assumptions before opening a canvas.",
    character: "loaffy",
    mood: "curious",
    pose: "none",
    form: "paw",
    tone: "butter",
  },
  {
    stepName: "Shape",
    scrollRange: "20–45%",
    line: "Then I sketch the flow before the pixels.",
    detail:
      "I strip the journey down to the fewest steps possible, sketching low-friction wireframes and decision branches with PMs and engineers.",
    character: "hand",
    tone: "sky",
  },
  {
    stepName: "Design",
    scrollRange: "45–70%",
    line: "Then I design the system, not just the screen.",
    detail:
      "I build tokens, accessible states, and reusable components on the 4/8 grid so design and production code speak the exact same language.",
    character: "loaffy",
    mood: "calm",
    pose: "none",
    form: "window",
    tone: "lilac",
  },
  {
    stepName: "Motion",
    scrollRange: "70–90%",
    line: "Then I make it move, with purpose.",
    detail:
      "Every transition explains a change of state, hierarchy, or system progress on a 40ms beat, with full reduced-motion support.",
    character: "loaffy",
    mood: "happy",
    pose: "vibing",
    form: "paw",
    tone: "blush",
  },
  {
    stepName: "Ship",
    scrollRange: "90–100%",
    line: "Then I ship it, and check it twice.",
    detail:
      "I review staging builds against the design system, test keyboard and responsive breakpoints, and ship clean production interfaces.",
    character: "loaffy",
    mood: "happy",
    pose: "jump",
    form: "paw",
    tone: "mint",
  },
];

/**
 * Static 5-step ProcessStory placeholder for Phase 5 (upgraded to GSAP ScrollTrigger scrub in Phase 7).
 * Section colour: mint-soft per DESIGN.md §1.4.
 * Strictly renders one character on screen at a time (Loaffy OR CatHand) per AGENTS.md §4.11.
 */
export function ProcessStory() {
  const [currentStep, setCurrentStep] = useState(0);
  const scene = PROCESS_SCENES[currentStep] ?? PROCESS_SCENES[0];

  return (
    <Section
      id="process"
      labelledBy="process-heading"
      tone="mint"
      soft
      className="border-2 border-line-strong"
    >
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Heading
              id="process-heading"
              as="h2"
              size="h1"
              highlight="think"
              highlightTone="mint"
            >
              How I think and ship.
            </Heading>
            <p className="mt-2 max-w-xl font-body text-body-lg text-text-muted">
              Five deliberate steps from raw questions to shipped product.
            </p>
          </div>

          <BeanStepper
            steps={PROCESS_SCENES.map((s) => s.stepName)}
            current={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        {/* Stage card */}
        <div
          aria-live="polite"
          className="grid grid-cols-1 items-center gap-8 rounded-xl border-2 border-line-strong bg-bg p-6 shadow-sticker md:p-10 lg:grid-cols-12"
        >
          {/* Character artboard (1 character at a time: Loaffy OR CatHand) */}
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-line-strong bg-surface p-8 lg:col-span-5">
            {scene.character === "hand" ? (
              <CatHand
                side="fur"
                from="bottom"
                claws
                action="sketch"
                size={160}
                label="Loaffy's cat hand sketching wireframe lines"
              />
            ) : (
              <Loaffy
                mood={scene.mood}
                pose={scene.pose}
                form={scene.form}
                size={128}
                track={false}
                blink={false}
                listenToBus={false}
                showGroundShadow
                label={`Loaffy during the ${scene.stepName} step`}
              />
            )}

            {currentStep === 4 && (
              <div className="mt-4">
                <Sticker tone="mint" rotate={-3} size="sm">
                  Shipped & verified ✓
                </Sticker>
              </div>
            )}
          </div>

          {/* Real DOM copy lines for screen readers and SEO */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="rounded-pill border-2 border-line-strong bg-mint px-3 py-1 font-mono text-caption font-semibold text-on-pastel">
                Step 0{currentStep + 1} · {scene.stepName}
              </span>
              <span className="font-mono text-caption text-text-muted">
                Scroll beat {scene.scrollRange}
              </span>
            </div>

            <h3 className="font-display text-h2 text-text">
              &ldquo;{scene.line}&rdquo;
            </h3>

            <p className="max-w-xl font-body text-body-lg text-text-muted">
              {scene.detail}
            </p>

            {/* Step controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="secondary"
                tone="lilac"
                size="md"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              >
                Previous step
              </Button>
              <Button
                variant="secondary"
                tone="mint"
                size="md"
                disabled={currentStep === PROCESS_SCENES.length - 1}
                onClick={() =>
                  setCurrentStep((s) =>
                    Math.min(PROCESS_SCENES.length - 1, s + 1)
                  )
                }
              >
                Next step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
