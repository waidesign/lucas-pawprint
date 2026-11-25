"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
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
  /** Render inline (e.g. for /lab or /colophon) instead of the fixed floating chapter pill */
  inline?: boolean;
  /**
   * Accessible name of the stepper's nav landmark. Every instance on a page needs a
   * unique one (axe landmark-unique), e.g. demos on /colophon next to the real stepper.
   */
  label?: string;
  className?: string;
}

/**
 * Floating chapter pill (Phase 1.F):
 * - Compact BeanStepper with the 4 chapters (Understand · Shape · Design · Ship, aria-current="step").
 * - Appears top-centre under the nav on lg+ once `[data-case-hero]` scrolls out of view.
 * - Hides over `[data-case-closing]` (CaseCTA + NextCase + Footer).
 * - Hidden below lg. Always keyboard reachable: reveals cleanly on focus-within.
 */
export function CaseStepper({
  inline = false,
  label,
  className,
}: CaseStepperProps) {
  const navLabel =
    label ?? (inline ? "Case study chapters (example)" : "Case study chapters");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const [inClosing, setInClosing] = useState(false);
  const prefersReduced = useReducedMotion() ?? false;

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter-step]"),
    );
    if (sections.length === 0) return;

    const visibleSteps = new Map<Element, number>();

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const stepAttr = entry.target.getAttribute(
            "data-chapter-step",
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
      },
    );

    for (const section of sections) {
      chapterObserver.observe(section);
    }

    if (inline) {
      return () => chapterObserver.disconnect();
    }

    const heroEl = document.querySelector<HTMLElement>("[data-case-hero]");
    const closingEl = document.querySelector<HTMLElement>("[data-case-closing]");

    const heroObserver = heroEl
      ? new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (!entry) return;
            setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom < 80);
          },
          { threshold: 0 },
        )
      : null;

    if (heroEl && heroObserver) {
      heroObserver.observe(heroEl);
    }

    const closingObserver = closingEl
      ? new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (!entry) return;
            setInClosing(entry.isIntersecting);
          },
          { threshold: 0.05 },
        )
      : null;

    if (closingEl && closingObserver) {
      closingObserver.observe(closingEl);
    }

    return () => {
      chapterObserver.disconnect();
      heroObserver?.disconnect();
      closingObserver?.disconnect();
    };
  }, [inline]);

  const handleStepClick = (index: number) => {
    setCurrentIndex(index);
    const stepKey = CHAPTER_STEPS[index]?.key;
    if (!stepKey) return;
    const target = document.querySelector<HTMLElement>(
      `[data-chapter-step="${stepKey}"]`,
    );
    if (target) {
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  if (inline) {
    return (
      <div
        className={cn(
          "inline-flex whitespace-nowrap rounded-pill border-2 border-line-strong bg-bg px-3 py-1 shadow-sticker-sm",
          className,
        )}
      >
        <BeanStepper
          steps={CHAPTER_STEPS.map((s) => s.label)}
          current={currentIndex}
          orientation="horizontal"
          nowrap
          label={navLabel}
          onStepClick={handleStepClick}
        />
      </div>
    );
  }

  const isVisible = pastHero && !inClosing;

  return (
    <div
      style={{
        transitionDuration: "var(--duration-fast)",
        transitionTimingFunction: "var(--ease-out-soft)",
      }}
      className={cn(
        "fixed top-20 left-1/2 z-30 hidden -translate-x-1/2 transition-all lg:block",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100",
        className,
      )}
    >
      <div className="inline-flex whitespace-nowrap rounded-pill border-2 border-line-strong bg-bg px-3 py-1 shadow-sticker-sm">
        <BeanStepper
          steps={CHAPTER_STEPS.map((s) => s.label)}
          current={currentIndex}
          orientation="horizontal"
          nowrap
          label={navLabel}
          onStepClick={handleStepClick}
        />
      </div>
    </div>
  );
}
