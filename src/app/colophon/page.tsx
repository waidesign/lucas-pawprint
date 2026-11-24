import type { Metadata } from "next";
import Link from "next/link";
import { DesignSystemFoundations } from "@/components/colophon/DesignSystemFoundations";
import { LoaffyLabSection } from "@/app/lab/LoaffyLabSection";
import { ComponentsLabSection } from "@/app/lab/ComponentsLabSection";
import { CaseStepper } from "@/components/case/CaseStepper";
import { Chapter } from "@/components/case/Chapter";
import { Callout } from "@/components/case/Callout";
import { DecisionCard } from "@/components/case/DecisionCard";
import { MetaRow } from "@/components/case/MetaRow";
import { TLDR } from "@/components/case/TLDR";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { IndexColumns, type IndexColumnItem } from "@/components/ui/IndexColumns";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Colophon · Lucas (Wai Phyo Aung)",
  description:
    "How lucas.pawprint.design was built: live tokens in 3 themes, type scale, motion demos, Loaffy gallery, components, WCAG 2.2 AA accessibility, and Luci + Pawprint credits.",
  alternates: {
    canonical: "https://lucas.pawprint.design/colophon",
  },
  openGraph: {
    title: "Colophon · Lucas (Wai Phyo Aung)",
    description:
      "Case study and live design system of lucas.pawprint.design: tokens across 3 themes, Loaffy gallery, components, accessibility, and stack.",
    url: "https://lucas.pawprint.design/colophon",
    type: "article",
    images: [
      {
        url: "https://lucas.pawprint.design/og/luci-teaser.png",
        width: 1200,
        height: 630,
        alt: "Colophon — Live Design System for lucas.pawprint.design.",
      },
    ],
  },
};

const TECH_STACK = [
  "Next.js 16 App Router (static export)",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "@next/mdx + Zod schema",
  "Motion + lazy GSAP ScrollTrigger",
  "Rive-ready SVG-first Loaffy facade",
  "Sharp (AVIF, WebP, build-time OG PNGs)",
  "Cloudflare Workers static assets",
] as const;

const A11Y_COMMITMENTS = [
  "WCAG 2.2 AA contrast verified across Light, Dark, and Warm Dark themes (Ink on every pastel hits AAA contrast).",
  "Keyboard navigation: visible 2px focus-visible rings, skip-to-content link, trapped focus in lightbox dialogs & menu drawer, Escape to dismiss.",
  "Minimum 48×48px interactive targets across buttons, icon buttons, chips, and theme controls.",
  "Reduced motion support: static 5-frame Previous/Next stepper for ProcessStory, disabled parallax/trackers, and instant fades.",
  "Real DOM copy and sr-only transcripts with polite aria-live updates for scroll stories.",
] as const;

export default function ColophonPage() {
  const shipColumns: IndexColumnItem[] = [
    {
      id: "colophon-accessibility",
      label: "WCAG 2.2 AA",
      title: "Accessibility",
      body: (
        <ul className="list-disc space-y-2 pl-5 font-body text-body text-text-muted">
          {A11Y_COMMITMENTS.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "colophon-stack",
      label: "Architecture",
      title: "Tech stack",
      body: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
          <p className="font-body text-body text-text-muted">
            Static export built ahead of time with Zod MDX validation, AVIF/WebP
            image optimization, and build-time OG share cards.
          </p>
        </div>
      ),
    },
    {
      id: "colophon-credits",
      label: "Pawprint",
      title: "Credits",
      body: (
        <ul className="space-y-3 font-body text-body text-text-muted">
          <li>
            <strong className="text-text">Pawprint umbrella:</strong>{" "}
            <TextLink href="https://pawprint.design" external tone="mint">
              pawprint.design
            </TextLink>
          </li>
          <li>
            <strong className="text-text">Design extraction &amp; QA:</strong>{" "}
            <TextLink
              href="https://luci.pawprint.design"
              external
              tone="lilac"
            >
              Luci (luci.pawprint.design)
            </TextLink>
          </li>
          <li>
            <strong className="text-text">Typefaces:</strong> Bricolage
            Grotesque &amp; Inter (via{" "}
            <code className="font-mono text-caption">next/font/google</code>).
          </li>
          <li>
            <strong className="text-text">Author:</strong> Lucas (Wai Phyo Aung)
            — Made with care in Phuket, Thailand.
          </li>
        </ul>
      ),
    },
  ];

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />

      <main id="main-content" className="flex-1 bg-bg text-text">
        {/* Sticky breadcrumb + BeanStepper (case study shell pattern) */}
        <div className="sticky top-0 z-30 border-b border-line bg-bg">
          <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-10 lg:px-20">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 font-mono text-caption text-text-muted">
                <li>
                  <Link
                    href="/work"
                    className="inline-flex min-h-12 items-center px-1 font-medium text-text underline decoration-2 underline-offset-4 hover:text-text-muted"
                  >
                    Work
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-text">
                  Colophon
                </li>
              </ol>
            </nav>

            <div className="hidden lg:block">
              <CaseStepper inline />
            </div>
          </div>
        </div>

        {/* Hero + MetaRow */}
        <header className="border-b border-line bg-bg py-12 md:py-20">
          <div className="w-full space-y-6 px-4 md:px-10 lg:px-20">
            <p className="font-mono text-label uppercase tracking-wider text-text-subtle">
              Portfolio as a Product · Live Design System
            </p>

            <Heading id="colophon-heading" as="h1">
              Colophon.
            </Heading>

            <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
              Every token, colour theme, type clamp, motion timing, and Loaffy
              reaction on this site is deliberate and rendered live below as a
              case study of lucas.pawprint.design.
            </p>

            <MetaRow
              role="Design & Build (Lucas + AI coding agents)"
              timeline="2026"
              platforms={["Web (Static export)", "Light · Dark · Warm Dark"]}
              tools={[
                "Next.js 16",
                "Tailwind CSS v4",
                "Motion",
                "GSAP",
                "Sharp",
                "Luci",
              ]}
              liveUrl="https://lucas.pawprint.design"
            />
          </div>
        </header>

        {/* TL;DR */}
        <TLDR
          problem="Most portfolios talk about design systems in screenshots while their own pages hardcode one-off colors, spacing, and headings."
          whatIDid="Measured 8 real reference sites with Luci, authored one token file (design.md), generated Tailwind v4 theme variables on a strict 4/8 grid, and wired Loaffy through a typed state machine."
          whatIDidLabel="What I built"
          outcome="One verifiable design language running in Light, Dark, and Warm Dark themes, rendered live right here on /colophon."
          outcomeLabel="Result"
        />

        {/* Chapter 01 · Understand */}
        <Chapter
          step="understand"
          title="Why build the portfolio as its own case study"
          tone="bg"
        >
          <p>
            Hiring teams and engineering leads look for consistency between what a
            designer says they ship and what is actually inspectable in the browser.
            Instead of keeping tokens in private Figma files, this site compiles{" "}
            <code className="rounded-xs bg-surface-2 px-2 py-1 font-mono text-caption">
              design.md
            </code>{" "}
            directly into CSS variables and validates every spacing, radius, shadow,
            and 40ms motion step before a production build passes.
          </p>

          <DecisionCard
            title="Tokens-only UI & zero pure black/white"
            problem="Pure #000000 and #FFFFFF feel harsh and strip warmth out of playful illustrations and long-form reading."
            decision="Grounded the palette on Ink (#2B2B2B) and Cloud (#F6F6F3), paired with 6 pastels and a Warm Dark mode, keeping Ginger (#F4A878) exclusive to Loaffy and the wordmark bean."
            why="Every pastel + Ink pairing hits WCAG AAA contrast across all three themes while keeping Loaffy visually distinct."
            tone="lilac"
          />

          <Callout tone="lilac" title="How Luci helped build this site">
            <p>
              Eight reference sites were measured element-by-element using{" "}
              <TextLink href="/work/luci" tone="lilac">
                Luci
              </TextLink>{" "}
              (my own product, in private beta) to extract real font sizes, padding
              cadences, and layouts before writing a single line of CSS.
            </p>
          </Callout>
        </Chapter>

        {/* Chapter 02 · Shape — Live Tokens, Type & Motion */}
        <Chapter
          step="shape"
          title="Tokens in 3 themes, type scale & 40ms motion"
          tone="surface"
        >
          <div className="pt-8">
            <DesignSystemFoundations nestedInChapter />
          </div>
        </Chapter>

        {/* Chapter 03 · Design — Loaffy Gallery & Components */}
        <Chapter
          step="design"
          title="Loaffy character gallery, reactions & components"
          tone="bg"
        >
          <div className="space-y-16 overflow-x-clip pt-8">
            <LoaffyLabSection />
            <ComponentsLabSection />
          </div>
        </Chapter>

        {/* Chapter 04 · Ship — Accessibility, Stack & Credits */}
        <Chapter
          step="ship"
          title="Accessibility, tech stack & Pawprint credits"
          tone="pistachio-soft"
        >
          <h3 className="sr-only">Accessibility, tech stack and credits</h3>
          <div className="pt-6">
            <IndexColumns items={shipColumns} columns={3} as="h4" />
          </div>
        </Chapter>

        <ContactPanel />
      </main>

      <SiteFooter />
    </div>
  );
}
