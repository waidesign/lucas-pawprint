"use client";

import { useState } from "react";
import { testimonials } from "@/content/site";
import { stagger } from "@/lib/motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

/**
 * KindWords section per COMPONENTS.md §D & DESIGN.md §1.4:
 * - Section colour: blush-soft.
 * - 2 real manager testimonials (Hafsa A. & Fahad Qaiser) with pull quote
 *   and an accessible "Read the full note" disclosure.
 */
export function KindWords() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleNote = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Section
      id="kind-words"
      labelledBy="kind-words-heading"
      tone="blush"
      soft
      className="border-t-2 border-line-strong"
    >
      <div className="space-y-8">
        <div>
          <Heading
            id="kind-words-heading"
            as="h2"
            size="h1"
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
            const isExpanded = Boolean(openIds[t.id]);
            const noteId = `testimonial-note-${t.id}`;

            return (
              <FadeIn key={t.id} delay={idx * stagger}>
                <Card
                  tone="surface"
                  className="flex h-full flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <blockquote className="font-display text-h3 text-text">
                      &ldquo;{t.pull}&rdquo;
                    </blockquote>

                    <div>
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={noteId}
                        onClick={() => toggleNote(t.id)}
                        className="inline-flex min-h-12 items-center rounded-pill border-2 border-line-strong bg-blush px-4 font-body text-button text-on-pastel lp-sticker-sm-interactive"
                      >
                        {isExpanded ? "Hide full note ↑" : "Read the full note ↓"}
                      </button>

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
