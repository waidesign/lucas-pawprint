import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { education, experience, profile } from "@/content/site";
import type { Tone } from "@/lib/cn";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { KindWords } from "@/components/sections/KindWords";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { Loaffy } from "@/components/mascot/Loaffy";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Heading, HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { IndexColumns, type IndexColumnItem } from "@/components/ui/IndexColumns";
import { RuledList, type RuledListItem } from "@/components/ui/RuledList";
import { Section } from "@/components/ui/Section";
import { SectionSeam } from "@/components/ui/SectionSeam";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";

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
        url: "https://lucas.pawprint.design/og/site.png",
        width: 1200,
        height: 630,
        alt: "Loaffy the paw next to “Hi, I'm Lucas.” Product & Motion Designer.",
      },
    ],
  },
};

const ABOUT_INTRO =
  "I'm Lucas (Wai Phyo Aung), a product and motion designer in Phuket, Thailand. I've spent 10 years making things look right and move right, and lately, building my own tools.";

const STORY_CHAPTERS: RuledListItem[] = [
  {
    id: "story-2016-2020",
    marker: "2016–2020",
    title: "Video and animation",
    body: "I started as a freelance creative designer in Myanmar, then edited video for a free-to-air TV channel. Cutting stories to the second taught me timing.",
  },
  {
    id: "story-2020-2022",
    marker: "2020–2022",
    title: "Motion design",
    body: "At Global Innovation Media I delivered motion projects from concept and storyboard to the final render. I learned to explain ideas with movement.",
  },
  {
    id: "story-2022-now",
    marker: "2022–now",
    title: "Product design",
    body: "At Empire Pixel I moved into UI/UX: research, design systems, websites and apps for automotive, SaaS, e-commerce and hospitality clients. In 2026 I founded Luci.",
  },
];

const WORKING_PRINCIPLES = [
  {
    id: "principle-01",
    number: "01",
    title: "Measure before I design.",
    body: "I map what users actually struggle with, audit the existing product, and separate real constraints from assumptions before opening a canvas.",
  },
  {
    id: "principle-02",
    number: "02",
    title: "Design the system, not the screen.",
    body: "I build tokens, accessible states, and reusable components on the 4/8 grid so design and production code speak the exact same language.",
  },
  {
    id: "principle-03",
    number: "03",
    title: "Ship, then check twice.",
    body: "I review staging builds against the design system, test keyboard and responsive breakpoints, and ship clean production interfaces.",
  },
] as const;

interface CapabilityArea {
  id: string;
  title: string;
  links: { label: string; href: string; tone: Tone; external?: boolean }[];
}

const CAPABILITY_AREAS: CapabilityArea[] = [
  {
    id: "area-product-design",
    title: "Product design",
    links: [
      {
        label: "Vehicle Databases pricing and checkout",
        href: "/work/vehicle-databases",
        tone: "butter",
      },
      {
        label: "Classic Decoder classifieds and dashboard",
        href: "/work/classic-decoder",
        tone: "sky",
      },
      {
        label: "Fierce Fight Gear customizer",
        href: "/work/fierce-fight-gear",
        tone: "blush",
      },
    ],
  },
  {
    id: "area-design-systems",
    title: "Design systems",
    links: [
      {
        label: "Classic Decoder",
        href: "/work/classic-decoder",
        tone: "sky",
      },
      {
        label: "Detailed Vehicle History",
        href: "/work/detailed-vehicle-history",
        tone: "pistachio",
      },
      {
        label: "this site",
        href: "/colophon",
        tone: "lilac",
      },
    ],
  },
  {
    id: "area-motion",
    title: "Motion",
    links: [
      {
        label: "How I use motion",
        href: "/#motion",
        tone: "mint",
      },
      {
        label: "Motion work on Behance",
        href: profile.socials.behance,
        tone: "mint",
        external: true,
      },
      {
        label: "Loaffy",
        href: "/colophon#design",
        tone: "lilac",
      },
    ],
  },
  {
    id: "area-building-with-ai",
    title: "Building with AI",
    links: [
      {
        label: "Luci",
        href: "/work/luci",
        tone: "lilac",
      },
      {
        label: "Sarayah Phuket Villas rebuild",
        href: "/work/sarayah-phuket-villas",
        tone: "lilac",
      },
      {
        label: "this portfolio",
        href: "/colophon",
        tone: "lilac",
      },
    ],
  },
];

const TOOL_GROUPS: { label: string; items: string[] }[] = [
  {
    label: "Design",
    items: [
      "Figma",
      "Figma AI",
      "FigJam",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe Firefly",
      "Framer",
      "Webflow",
    ],
  },
  {
    label: "Motion",
    items: ["Adobe After Effects", "Adobe Premiere Pro", "Lottiefiles"],
  },
  {
    label: "Build",
    items: [
      "Luci (Own Product)",
      "Claude Code",
      "Google Antigravity",
      "Cursor",
      "Codex",
      "Google AI Studio",
      "v0.dev",
      "Copilot",
      "Github",
      "Bitbucket",
      "Vercel",
      "JIRA",
      "Google Apps",
    ],
  },
];

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

  const changelogItems: RuledListItem[] = [
    ...experience.map((item) => ({
      id: `${item.company}-${item.period}`,
      marker: item.period,
      title: item.role,
      body: (
        <div className="space-y-1">
          <p className="font-body text-body font-semibold text-text">
            {item.company}
          </p>
          <p className="font-body text-body text-text-muted">{item.summary}</p>
        </div>
      ),
      aside: item.location,
    })),
    {
      id: "education",
      marker: "Education",
      title: education.degree,
      body: (
        <div className="space-y-1">
          <p className="font-body text-body font-semibold text-text">
            {education.school} · Graduated {education.graduated}
          </p>
        </div>
      ),
      aside: education.location,
    },
  ];

  const principleItems: IndexColumnItem[] = WORKING_PRINCIPLES.map((p) => ({
    id: p.id,
    number: p.number,
    title: p.title,
    body: p.body,
  }));

  const capabilityItems: IndexColumnItem[] = CAPABILITY_AREAS.map((area) => ({
    id: area.id,
    title: area.title,
    body: (
      <ul className="space-y-2">
        {area.links.map((link) => (
          <li key={link.label}>
            <TextLink
              href={link.href}
              external={link.external ?? false}
              tone={link.tone}
            >
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteNav />
      <main id="main-content" className="flex-1">
        {/* 1. Hero (bg) — mirrors Home/Work hierarchy & smooth entrance cascade */}
        <Section id="about-intro" labelledBy="about-page-heading" tone="bg">
          <div className="space-y-12">
            <HeroReveal step={0} variant="heading" className="space-y-4">
              <Heading
                id="about-page-heading"
                as="h1"
                highlight="Lucas"
                highlightTone="butter"
              >
                Hi, I&apos;m Lucas.
              </Heading>
            </HeroReveal>

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <HeroReveal step={1} variant="media" className="lg:col-span-5">
                <div className="-rotate-[1.8deg] overflow-hidden rounded-xl border-2 border-line-strong bg-surface shadow-sticker transition-transform duration-300 ease-out hover:rotate-0 motion-reduce:rotate-0">
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
              </HeroReveal>

              <div className="flex flex-col justify-between gap-8 lg:col-span-7">
                <div className="space-y-6">
                  <HeroReveal step={2} variant="body" className="space-y-6">
                    <p className="max-w-[var(--prose-max)] font-body text-body-lg font-medium text-text">
                      {ABOUT_INTRO}
                    </p>
                    <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                      {profile.timezoneNote} · Founder of{" "}
                      <TextLink href="/work/luci" tone="lilac">
                        Luci (Open source)
                      </TextLink>
                      .
                    </p>
                  </HeroReveal>

                  <HeroReveal
                    step={3}
                    variant="body"
                    className="flex flex-wrap items-center gap-6 pt-2"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      href="/resume.pdf"
                      external
                    >
                      Resume (PDF)
                    </Button>
                    <TextLink
                      href="/work"
                      tone="butter"
                      iconEnd={
                        <ArrowRight
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      }
                      className="min-h-12 items-center font-body text-button font-semibold"
                    >
                      Explore my work
                    </TextLink>
                  </HeroReveal>
                </div>

                <HeroReveal
                  step={3}
                  variant="mascot"
                  className="hidden justify-end pt-2 lg:flex"
                >
                  <Loaffy
                    form="paw"
                    pose="chill-lean"
                    size={240}
                    label="Loaffy leaning back in a relaxed pose"
                  />
                </HeroReveal>
              </div>
            </div>
          </div>
        </Section>

        <SectionSeam from="bg" to="butter" seed={61} />

        {/* 2. My story (butter-soft band) */}
        <Section
          id="my-story"
          labelledBy="my-story-heading"
          tone="butter"
          soft
        >
          <div className="space-y-10">
            <Heading
              id="my-story-heading"
              as="h2"
              highlight="story"
              highlightTone="butter"
            >
              My story.
            </Heading>

            <RuledList items={STORY_CHAPTERS} ordered as="h3" />
          </div>
        </Section>

        <SectionSeam from="butter" to="bg" seed={67} />

        {/* 3. Changelog (bg) */}
        <Section id="changelog" labelledBy="changelog-heading" tone="bg">
          <div className="space-y-10">
            <Heading
              id="changelog-heading"
              as="h2"
              highlight="Changelog"
              highlightTone="lilac"
            >
              Changelog.
            </Heading>
            <h3 className="sr-only">Experience and education</h3>

            <RuledList items={changelogItems} ordered as="h4" />
          </div>
        </Section>

        <SectionSeam from="bg" to="mint" seed={71} />

        {/* 4. How I work (mint-soft band) */}
        <Section
          id="how-i-work"
          labelledBy="how-i-work-heading"
          tone="mint"
          soft
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
            <h3 className="sr-only">Working principles</h3>

            <IndexColumns
              items={principleItems}
              columns={3}
              ordered
              as="h4"
            />

            <div className="pt-2">
              <TextLink
                href="/#process"
                tone="mint"
                iconEnd={
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                }
                className="min-h-12 items-center font-body text-button font-semibold"
              >
                See the process, step by step
              </TextLink>
            </div>
          </div>
        </Section>

        <SectionSeam from="mint" to="bg" seed={73} />

        {/* 5. What I'm good at + 6. Tools (bg) */}
        <Section
          id="capabilities"
          labelledBy="capabilities-heading"
          tone="bg"
        >
          <div className="space-y-12">
            <div className="space-y-10">
              <Heading
                id="capabilities-heading"
                as="h2"
                highlight="good"
                highlightTone="sky"
              >
                What I&apos;m good at.
              </Heading>
              <h3 className="sr-only">Areas of practice</h3>

              <IndexColumns
                items={capabilityItems}
                columns={4}
                as="h4"
                className="lg:grid-cols-2 xl:grid-cols-4"
              />
            </div>

            <div className="border-t border-line pt-12">
              <p className="mb-8 font-mono text-label uppercase tracking-wider text-text-muted">
                Tools
              </p>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {TOOL_GROUPS.map((group) => (
                  <div key={group.label} className="space-y-4">
                    <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((tool) => (
                        <Chip key={tool}>{tool}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <SectionSeam from="bg" to="blush" seed={79} />

        {/* 7. Kind words (blush-soft band, id="kind-words") */}
        <KindWords variant="quotes" />

        <SectionSeam from="blush" to="bg" seed={83} />

        {/* 8. Closing 2-column CTA matching case-study & Home polish (bg before pistachio footer seam) */}
        <section
          aria-labelledby="about-closing-heading"
          className="w-full bg-bg px-4 pt-12 pb-24 md:px-10 md:pt-16 md:pb-32 lg:px-20 lg:pb-40"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border-2 border-line-strong bg-lilac p-6 text-on-pastel shadow-sticker md:p-10">
              <div className="space-y-4">
                <h2
                  id="about-closing-heading"
                  className={cn(
                    "font-display text-on-pastel text-balance",
                    HEADING_SCALE_CLASSES.h2,
                  )}
                >
                  Let&apos;s build something thoughtful.
                </h2>
                <p className="max-w-xl font-body text-body-lg text-on-pastel/90">
                  Email me directly or pick a 30-minute slot on Cal.com.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 pt-2">
                <CopyEmail email={profile.email} />
                <Button
                  variant="primary"
                  size="lg"
                  href={profile.bookingUrl}
                  external
                  iconStart={<Calendar className="h-5 w-5" />}
                >
                  Book a chat
                </Button>
              </div>
            </div>

            <Link
              href="/work"
              className="group flex h-full w-full flex-col justify-between gap-8 rounded-2xl border-2 border-transparent bg-inverse-bg p-6 text-inverse-text select-none lp-btn-primary md:p-10"
            >
              <div className="space-y-4">
                <span className="block font-mono text-label uppercase tracking-wider text-inverse-text/75">
                  Selected work
                </span>
                <h2
                  className={cn(
                    "font-display text-inverse-text text-balance",
                    HEADING_SCALE_CLASSES.h2,
                  )}
                >
                  See what I&apos;ve shipped.
                </h2>
                <p className="max-w-xl font-body text-body-lg text-inverse-text/80">
                  Seven case studies across Luci, automotive data platforms,
                  e-commerce customizers, and hospitality.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 font-body text-button font-semibold text-inverse-text">
                <span>Explore all work</span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
