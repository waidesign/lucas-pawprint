"use client";

import { education, experience, profile } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { stagger } from "@/lib/motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Loaffy } from "@/components/mascot/Loaffy";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

/**
 * AboutChangelog section per COMPONENTS.md §D & DESIGN.md §1.4:
 * - Section colour: butter-soft.
 * - Portrait in 32px-radius (`rounded-lg`) frame, short bio, changelog list,
 *   education, resume link, and Loaffy in `chill-lean` pose.
 */
export function AboutChangelog() {
  return (
    <Section
      id="about"
      labelledBy="about-heading"
      tone="butter"
      soft
      className="-mt-[var(--border-pen)] border-2 border-line-strong"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left column: Portrait, bio, Loaffy chill-lean, Resume CTA */}
        <div className="space-y-6 lg:col-span-5">
          <Heading
            id="about-heading"
            as="h2"
            size="h1"
            highlight="habit"
            highlightTone="butter"
          >
            Curious by nature, careful by habit.
          </Heading>

          <div className="flex flex-wrap items-end gap-6">
            <div className="overflow-hidden rounded-lg border-2 border-line-strong bg-surface shadow-sticker-sm">
              <picture>
                <source
                  srcSet={profile.portrait.src.replace(/\.webp$/i, ".avif")}
                  type="image/avif"
                />
                <source srcSet={profile.portrait.src} type="image/webp" />
                <img
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  width={176}
                  height={176}
                  loading="lazy"
                  decoding="async"
                  className="block h-44 w-44 object-cover"
                />
              </picture>
            </div>

            <Loaffy
              pose="chill-lean"
              size={128}
              track={false}
              blink={false}
              listenToBus={false}
              decorative
            />
          </div>

          <p className="font-body text-body-lg text-text">{profile.bioShort}</p>

          <div className="rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker-sm">
            <p className="font-body text-label uppercase text-text-muted">
              Education
            </p>
            <p className="mt-1 font-display text-h4 text-text">
              {education.degree}
            </p>
            <p className="font-body text-body text-text-muted">
              {education.school} · {education.location}
            </p>
          </div>

          <div
            onClick={() =>
              trackEvent("resume_download", { location: "about_section" })
            }
          >
            <Button
              variant="secondary"
              tone="butter"
              size="lg"
              href="/resume.pdf"
              external
            >
              Resume (PDF)
            </Button>
          </div>
        </div>

        {/* Right column: Changelog (5 experience entries) */}
        <div className="space-y-4 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-h3 text-text">
              Changelog (2016 → Now)
            </h3>
            <span className="rounded-pill border border-line-strong bg-surface px-3 py-1 font-mono text-caption text-text-muted">
              {profile.years} years in design
            </span>
          </div>

          <ol className="space-y-4">
            {experience.map((item, idx) => (
              <li key={`${item.company}-${item.period}`}>
                <FadeIn delay={Math.min(idx, 5) * stagger}>
                  <Card tone="surface" className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-pill border border-line-strong bg-butter px-3 py-0.5 font-mono text-caption font-semibold text-on-pastel">
                        {item.period}
                      </span>
                      <span className="font-body text-caption text-text-muted">
                        {item.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
                      <h4 className="font-display text-h4 text-text">
                        {item.role}
                      </h4>
                      <span className="font-body text-body font-semibold text-text-muted">
                        {item.company}
                      </span>
                    </div>

                    <p className="font-body text-body text-text-muted">
                      {item.summary}
                    </p>
                  </Card>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
