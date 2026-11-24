import type { Metadata } from "next";
import { Calendar, ArrowUpRight } from "lucide-react";
import {
  education,
  experience,
  legacySkills,
  legacyTools,
  profile,
} from "@/content/site";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { KindWords } from "@/components/sections/KindWords";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FadeIn } from "@/components/motion/FadeIn";
import { HandSketch } from "@/components/mascot/HandSketch";
import { stagger } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About · Lucas (Wai Phyo Aung)",
  description:
    "About Lucas (Wai Phyo Aung): 10 years in product and motion design, changelog (2016 to now), education, manager notes, and resume.",
  alternates: {
    canonical: "https://lucas.pawprint.design/about",
  },
  openGraph: {
    title: "About · Lucas (Wai Phyo Aung)",
    description:
      "About Lucas (Wai Phyo Aung): 10 years in product and motion design, changelog (2016 to now), education, manager notes, and resume.",
    url: "https://lucas.pawprint.design/about",
    type: "profile",
    images: [
      {
        url: "https://lucas.pawprint.design/og/luci-teaser.png",
        width: 1200,
        height: 630,
        alt: "About Lucas (Wai Phyo Aung), Product & Motion Designer.",
      },
    ],
  },
};

const HOW_I_WORK = [
  {
    step: "01",
    title: "Understand",
    line: "First, I ask a lot of questions.",
  },
  {
    step: "02",
    title: "Shape",
    line: "Then I sketch the flow before the pixels.",
  },
  {
    step: "03",
    title: "Design",
    line: "Then I design the system, not just the screen.",
  },
  {
    step: "04",
    title: "Motion",
    line: "Then I make it move, with purpose.",
  },
  {
    step: "05",
    title: "Ship",
    line: "Then I ship it, and check it twice.",
  },
] as const;

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wai Phyo Aung",
    alternateName: "Lucas",
    jobTitle: profile.title,
    email: profile.email,
    url: "https://lucas.pawprint.design",
    sameAs: [
      profile.socials.linkedin,
      profile.socials.behance,
      profile.socials.github,
      profile.socials.medium,
    ],
  };

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteNav />
      <main id="main-content" className="flex-1">
        {/* 1. Portrait + Bio + Resume */}
        <Section id="about-intro" labelledBy="about-page-heading" tone="bg">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                {profile.name} · {profile.title}
              </p>
              <Heading id="about-page-heading" as="h1">
                About.
              </Heading>
              <Heading as="h2" highlight="habit" highlightTone="butter">
                Curious by nature, careful by habit.
              </Heading>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="overflow-hidden rounded-lg border-2 border-line-strong bg-surface shadow-sticker">
                  <picture>
                    <source
                      srcSet={profile.portrait.src.replace(/\.webp$/i, ".avif")}
                      type="image/avif"
                    />
                    <source srcSet={profile.portrait.src} type="image/webp" />
                    <img
                      src={profile.portrait.src}
                      alt={profile.portrait.alt}
                      width={640}
                      height={640}
                      className="block aspect-square w-full object-cover"
                    />
                  </picture>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-8">
                <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text">
                  {profile.bioShort}
                </p>

                <p className="font-body text-body text-text-muted">
                  {profile.timezoneNote} · Works across US, Canada, NZ and
                  Singapore time zones.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    href="/resume.pdf"
                    external
                    iconEnd={<ArrowUpRight className="h-5 w-5" />}
                  >
                    Resume (PDF)
                  </Button>
                  <Button
                    variant="secondary"
                    tone="lilac"
                    size="lg"
                    href={profile.bookingUrl}
                    external
                    iconStart={<Calendar className="h-5 w-5" />}
                  >
                    Book a chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Changelog (full) + Education */}
        <Section
          id="changelog"
          labelledBy="changelog-heading"
          tone="butter"
          soft
          className="rounded-none border-2 border-line-strong md:rounded-none"
        >
          <div className="space-y-10">
            <Heading
              id="changelog-heading"
              as="h2"
              highlight="2016"
              highlightTone="butter"
            >
              Changelog (2016 → Now).
            </Heading>

            <ol className="space-y-6">
              {experience.map((item, idx) => (
                <li key={`${item.company}-${item.period}`}>
                  <FadeIn delay={idx * stagger}>
                    <Card tone="surface" className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-pill border border-line-strong bg-butter px-3 py-1 font-mono text-caption font-semibold text-on-pastel">
                          {item.period}
                        </span>
                        <span className="font-body text-caption text-text-muted">
                          {item.location}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
                        <Heading as="h4">{item.role}</Heading>
                        <span className="font-body text-body font-semibold text-text-muted">
                          {item.company}
                        </span>
                      </div>

                      <p className="max-w-[var(--prose-max)] font-body text-body text-text-muted">
                        {item.summary}
                      </p>
                    </Card>
                  </FadeIn>
                </li>
              ))}
            </ol>

            <Card tone="surface" className="space-y-2">
              <p className="font-mono text-label uppercase text-text-subtle">
                Education
              </p>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Heading as="h4">{education.degree}</Heading>
                <span className="font-body text-caption text-text-muted">
                  Graduated {education.graduated}
                </span>
              </div>
              <p className="font-body text-body text-text-muted">
                {education.school} · {education.location}
              </p>
            </Card>
          </div>
        </Section>

        {/* 3. How I work (process & tools) */}
        <Section
          id="how-i-work"
          labelledBy="how-i-work-heading"
          tone="mint"
          soft
          className="-mt-[var(--border-pen)] rounded-none border-2 border-line-strong md:rounded-none"
        >
          <div className="space-y-10">
            <Heading
              id="how-i-work-heading"
              as="h2"
              highlight="work"
              highlightTone="mint"
            >
              How I work.
            </Heading>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              {HOW_I_WORK.map((s) => (
                <Card key={s.step} tone="surface" className="space-y-3">
                  <span className="inline-block rounded-pill border border-line-strong bg-mint px-3 py-1 font-mono text-caption font-semibold text-on-pastel">
                    {s.step}
                  </span>
                  <Heading as="h4">{s.title}</Heading>
                  <p className="font-body text-body text-text-muted">
                    {s.line}
                  </p>
                  {/* Shape: the cat hand sketches the flow once in view (LOAFFY.md §7) */}
                  {s.title === "Shape" && (
                    <div className="relative h-24 w-full overflow-hidden rounded-md border-2 border-on-pastel bg-sky">
                      <HandSketch playInView handSize={96} />
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card tone="surface" className="space-y-4">
                <p className="font-mono text-label uppercase text-text-subtle">
                  Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {legacySkills.map((skill) => (
                    <Chip key={skill}>{skill}</Chip>
                  ))}
                </div>
              </Card>

              <Card tone="surface" className="space-y-4">
                <p className="font-mono text-label uppercase text-text-subtle">
                  Tools &amp; Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {legacyTools.map((tool) => (
                    <Chip key={tool}>{tool}</Chip>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Section>

        {/* 4. Kind words (full testimonials expanded) */}
        <KindWords expandAll />

        {/* 5. Contact */}
        <ContactPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
