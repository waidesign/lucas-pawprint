"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { homeFaqs } from "@/content/site";
import { cn } from "@/lib/cn";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

export interface HomeFaqProps {
  className?: string;
}

/**
 * Home FAQ section ([P1-A3]):
 * - Sits directly above BuiltWith on a lilac-soft tinted band.
 * - Card-free hairline accordion (Rule 18), 48x48+ interactive rows,
 *   Rule 17 heading scale, and reduced-motion safe expand/collapse on the 40ms grid.
 */
export function HomeFaq({ className }: HomeFaqProps = {}) {
  const [openId, setOpenId] = useState<string | null>(homeFaqs[0]?.id ?? null);
  const prefersReduced = useReducedMotion() ?? false;

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section
      id="faq"
      labelledBy="faq-heading"
      tone="lilac"
      soft
      className={className}
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-4 lg:col-span-5">
          <Heading
            id="faq-heading"
            as="h2"
            highlight="asked"
            highlightTone="lilac"
          >
            Frequently asked.
          </Heading>
          <p className="max-w-md font-body text-body-lg text-text-muted">
            Straight answers on how I work, use AI, and collaborate across time
            zones.
          </p>
          <div className="pt-2">
            <TextLink
              href="/contact"
              tone="lilac"
              iconEnd={<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
              className="min-h-12 items-center font-body text-button font-semibold"
            >
              Still curious? Go to Contact
            </TextLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border-t-2 border-line-strong">
            {homeFaqs.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `${item.id}-panel`;
              const buttonId = `${item.id}-button`;

              return (
                <div
                  key={item.id}
                  className="border-b border-line"
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className="group flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-160 hover:text-text"
                  >
                    <span className="font-display text-h4 font-bold text-text">
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong bg-bg text-text transition-transform duration-200",
                        isOpen && "rotate-45 bg-lilac text-on-pastel",
                      )}
                    >
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          prefersReduced
                            ? { opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={
                          prefersReduced
                            ? { opacity: 1 }
                            : { height: "auto", opacity: 1 }
                        }
                        exit={
                          prefersReduced
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: prefersReduced ? 0 : 0.24,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[var(--prose-max)] pb-6 font-body text-body-lg text-text-muted">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
