"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { testimonials } from "@/content/site";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { PullQuote } from "@/components/ui/PullQuote";
import { Section } from "@/components/ui/Section";

export interface KindWordsProps {
  /** "cards" = Home default (2 surface cards); "quotes" = card-free PullQuote stack (/about) */
  variant?: "cards" | "quotes";
  expandAll?: boolean;
  className?: string;
}

/**
 * KindWords section per COMPONENTS.md §D & DESIGN.md §1.4:
 * - Section colour: blush-soft.
 * - 2 real manager testimonials (Hafsa A. & Fahad Qaiser) with pull quote
 *   and an accessible "Read the full note" disclosure.
 */
export function KindWords({
  variant = "cards",
  expandAll = false,
  className,
}: KindWordsProps = {}) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleNote = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (variant === "quotes") {
    return (
      <Section
        id="kind-words"
        labelledBy="kind-words-heading"
        tone="blush"
        soft
        className={className}
      >
        <div className="space-y-12">
          <div>
            <Heading
              id="kind-words-heading"
              as="h2"
              highlight="managers"
              highlightTone="blush"
            >
              Kind words from direct managers.
            </Heading>
            <p className="mt-2 max-w-xl font-body text-body-lg text-text-muted">
              Real notes from the product and art leadership I work with every day.
            </p>
          </div>

          <div className="space-y-10">
            {testimonials.map((t) => (
              <PullQuote
                key={t.id}
                quote={t.pull}
                author={t.author}
                role={t.role}
                company={t.company}
                relationship={t.relationship}
                chipTone="surface"
                fullNote={t.quote}
              />
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="kind-words"
      labelledBy="kind-words-heading"
      tone="bg"
      className={className}
    >
      <div className="space-y-8">
        <div>
          <Heading
            id="kind-words-heading"
            as="h2"
            highlight="managers"
            highlightTone="blush"
          >
            Kind words from direct managers.
          </Heading>
          <p className="mt-2 max-w-xl font-body text-body-lg text-text-muted">
            Real notes from the product and art leadership I work with every day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((t, idx) => {
            const isExpanded = expandAll || Boolean(openIds[t.id]);
            const noteId = `testimonial-note-${t.id}`;

            return (
              <FadeIn key={t.id} delay={idx * stagger}>
                <Card
                  tone="surface"
                  style={{
                    transitionDuration: "var(--duration-base)",
                    transitionTimingFunction: "var(--ease-out-soft)",
                  }}
                  className={cn(
                    "flex h-full flex-col justify-between gap-6 transition-transform motion-safe:hover:rotate-0 motion-safe:focus-within:rotate-0",
                    // Sticker tilt like the motion demo cards; straightens on hover/focus,
                    // and stays straight while its full note is open.
                    isExpanded
                      ? "rotate-0"
                      : idx % 2 === 0
                        ? "motion-safe:-rotate-[1.6deg]"
                        : "motion-safe:rotate-[1.4deg]",
                  )}
                >
                  <div className="space-y-4">
                    <blockquote className="font-display text-h3 text-text">
                      &ldquo;{t.pull}&rdquo;
                    </blockquote>

                    <div>
                      {!expandAll && (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={noteId}
                          onClick={() => toggleNote(t.id)}
                          className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-line-strong bg-blush px-4 font-body text-button text-on-pastel lp-sticker-sm-interactive"
                        >
                          <span>
                            {isExpanded ? "Hide full note" : "Read the full note"}
                          </span>
                          {isExpanded ? (
                            <ArrowUp className="h-4 w-4 shrink-0" aria-hidden="true" />
                          ) : (
                            <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
                          )}
                        </button>
                      )}

                      {isExpanded && (
                        <div
                          id={noteId}
                          className="mt-4 space-y-3 rounded-md border border-line bg-bg p-4 font-body text-body text-text-muted whitespace-pre-line"
                        >
                          {t.quote}
                        </div>
                      )}
                    </div>
                  </div>

                  <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
                    <div>
                      <p className="font-display text-h4 text-text">
                        {t.author}
                      </p>
                      <p className="font-body text-caption text-text-muted">
                        {t.role} · {t.company}
                      </p>
                    </div>
                    <span className="rounded-pill border border-line bg-bg px-3 py-1 font-mono text-caption text-text-muted">
                      {t.relationship}
                    </span>
                  </footer>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
