"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BeanStepper } from "@/components/ui/BeanStepper";
import type { ChapterStep } from "@/components/case/Chapter";
import { cn } from "@/lib/cn";

const CHAPTER_STEPS: { key: ChapterStep; label: string }[] = [
  { key: "understand", label: "Understand" },
  { key: "shape", label: "Shape" },
  { key: "design", label: "Design" },
  { key: "ship", label: "Ship" },
];

export interface CaseStepperProps {
  className?: string;
}

/**
 * Sticky BeanStepper wrapper for case study pages (`≥ lg` sticky bar).
 * Uses `IntersectionObserver` over `<section data-chapter-step="...">` elements
 * to highlight the active step (`aria-current="step"`) as the reader scrolls.
 */
export function CaseStepper({ className }: CaseStepperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReduced = useReducedMotion() ?? false;

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter-step]")
    );
    if (sections.length === 0) {
      return;
    }

    const visibleSteps = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const stepAttr = entry.target.getAttribute(
            "data-chapter-step"
          ) as ChapterStep | null;
          const stepIndex = CHAPTER_STEPS.findIndex((s) => s.key === stepAttr);
          if (stepIndex === -1) continue;

          if (entry.isIntersecting) {
            visibleSteps.set(entry.target, stepIndex);
          } else {
            visibleSteps.delete(entry.target);
          }
        }

        if (visibleSteps.size > 0) {
          // Pick the visible section highest in document order
          for (const sec of sections) {
            const idx = visibleSteps.get(sec);
            if (idx !== undefined) {
              setCurrentIndex(idx);
              break;
            }
          }
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (index: number) => {
    setCurrentIndex(index);
    const stepKey = CHAPTER_STEPS[index]?.key;
    if (!stepKey) return;
    const target = document.querySelector<HTMLElement>(
      `[data-chapter-step="${stepKey}"]`
    );
    if (target) {
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={cn(
        " lg:sticky lg:top-24 lg:z-30",
        className
      )}
    >
      <div className="inline-flex rounded-pill border-2 border-line-strong bg-bg px-3 py-1 shadow-sticker-sm">
        <BeanStepper
          steps={CHAPTER_STEPS.map((s) => s.label)}
          current={currentIndex}
          orientation="horizontal"
          onStepClick={handleStepClick}
        />
      </div>
    </div>
  );
}
