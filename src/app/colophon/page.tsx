import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Callout } from "@/components/case/Callout";
import { DecisionCard } from "@/components/case/DecisionCard";
import { ColourSpecimen } from "@/components/colophon/ColourSpecimen";
import { ComponentSpecimen } from "@/components/colophon/ComponentSpecimen";
import { LoaffyPicker } from "@/components/colophon/LoaffyPicker";
import { MotionSpecimen } from "@/components/colophon/MotionSpecimen";
import { SpaceShapeSpecimen } from "@/components/colophon/SpaceShapeSpecimen";
import { TypeSpecimen } from "@/components/colophon/TypeSpecimen";
import { Loaffy } from "@/components/mascot/Loaffy";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { IndexColumns, type IndexColumnItem } from "@/components/ui/IndexColumns";
import { Section } from "@/components/ui/Section";
import { SectionSeam } from "@/components/ui/SectionSeam";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Colophon · Lucas (Wai Phyo Aung)",
  description:
    "How lucas.pawprint.design is built: live colour tokens in 3 themes, type scale, spacing, motion on a 40ms beat, Loaffy, components, accessibility and stack.",
  alternates: {
    canonical: "https://lucas.pawprint.design/colophon",
  },
  openGraph: {
    title: "Colophon · Lucas (Wai Phyo Aung)",
    description:
      "The live design system of lucas.pawprint.design: tokens in 3 themes, type, spacing, motion, Loaffy, components, accessibility and stack.",
    url: "https://lucas.pawprint.design/colophon",
    type: "article",
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

const AT_A_GLANCE: IndexColumnItem[] = [
  {
    id: "colophon-problem",
    label: "The problem",
    body: "Most portfolios talk about design systems in screenshots while their own pages hardcode one-off colors, spacing, and headings.",
  },
  {
    id: "colophon-built",
    label: "What I built",
    body: "Measured 8 real reference sites with Luci, authored one token file (design.md), generated Tailwind v4 theme variables on a strict 4/8 grid, and wired Loaffy through a typed state machine.",
  },
  {
    id: "colophon-result",
    label: "Result",
    body: "One verifiable design language running in Light, Dark, and Warm Dark themes, rendered live on this page.",
  },
];

/** DecisionCard's title row paints the band colour so the 2px rule passes behind it. */
const LILAC_BAND = { "--chapter-bg": "var(--lp-lilac-soft)" } as CSSProperties;

export default function ColophonPage() {
  const shipColumns: IndexColumnItem[] = [
    {
      id: "colophon-accessibility",
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
            <TextLink href="https://luci.pawprint.design" external tone="lilac">
              Luci (luci.pawprint.design)
            </TextLink>
          </li>
          <li>
            <strong className="text-text">Typefaces:</strong> Bricolage
            Grotesque &amp; Inter (via{" "}
            <code className="font-mono text-caption">next/font/google</code>).
          </li>
          <li>
            <strong className="text-text">Author:</strong> Lucas (Wai Phyo Aung),
            made with care in Phuket, Thailand.
          </li>
        </ul>
      ),
    },
  ];

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <main id="main-content" className="flex-1">
        {/* 1. Hero (bg): same hierarchy and entrance cascade as About and Contact */}
        <Section id="colophon-intro" labelledBy="colophon-heading" tone="bg">
          <div className="space-y-16">
            <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-8">
                <HeroReveal step={0} variant="heading">
                  <Heading
                    id="colophon-heading"
                    as="h1"
                    highlight="Colophon"
                    highlightTone="mint"
                  >
                    Colophon.
                  </Heading>
                </HeroReveal>
                <HeroReveal step={1} variant="body">
                  <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                    Every token, colour theme, type clamp, motion timing, and
                    Loaffy reaction on this site is deliberate, and every one of
                    them is rendered live below.
                  </p>
                </HeroReveal>
              </div>

              <HeroReveal
                step={1}
                variant="mascot"
                className="hidden lg:col-span-4 lg:flex lg:justify-end"
              >
                <Loaffy
                  form="paw"
                  mood="thinking"
                  size={240}
                  label="Loaffy thinking beside the colophon header"
                />
              </HeroReveal>
            </div>

            <HeroReveal step={2} variant="body">
              <h2 className="sr-only">At a glance</h2>
              <IndexColumns items={AT_A_GLANCE} columns={3} bodySize="body-lg" />
            </HeroReveal>
          </div>
        </Section>

        <SectionSeam from="bg" to="lilac" seed={89} />

        {/* 2. Portfolio as a product (lilac-soft band) */}
        <Section
          id="product"
          labelledBy="product-heading"
          tone="lilac"
          soft
          style={LILAC_BAND}
        >
          <div className="space-y-10">
            <Heading
              id="product-heading"
              as="h2"
              highlight="product"
              highlightTone="lilac"
            >
              A portfolio built like a product.
            </Heading>

            <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
              Hiring teams and engineering leads look for consistency between
              what a designer says they ship and what is actually inspectable in
              the browser. Instead of keeping tokens in private Figma files, this
              site compiles{" "}
              <code className="rounded-xs bg-surface-2 px-2 py-1 font-mono text-caption text-text">
                design.md
              </code>{" "}
              directly into CSS variables and validates every spacing, radius,
              shadow, and 40ms motion step before a production build passes.
            </p>

            <DecisionCard
              title="Tokens only, and never pure black or white"
              problem="Pure #000000 and #FFFFFF feel harsh and strip warmth out of playful illustrations and long-form reading."
              decision="Grounded the palette on Ink (#2B2B2B) and Cloud (#F6F6F3), paired with 6 pastels and a Warm Dark mode, keeping Ginger (#F4A878) exclusive to Loaffy and the wordmark bean."
              why="Every pastel + Ink pairing hits WCAG AAA contrast across all three themes while keeping Loaffy visually distinct."
              tone="lilac"
            />

            <Callout tone="lilac" title="How Luci helped build this site">
              <p>
                Eight reference sites were measured element by element with{" "}
                <TextLink href="/work/luci" tone="lilac">
                  Luci
                </TextLink>{" "}
                (my own open-source product) to extract real font sizes, padding
                cadences, and layouts before writing a single line of CSS.
              </p>
            </Callout>
          </div>
        </Section>

        <SectionSeam from="lilac" to="bg" seed={97} />

        {/* 3. Colour (bg) */}
        <Section id="colour" labelledBy="colour-heading" tone="bg">
          <div className="space-y-12">
            <div className="space-y-4">
              <Heading
                id="colour-heading"
                as="h2"
                highlight="three"
                highlightTone="sky"
              >
                Colour in three themes.
              </Heading>
              <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                Each column below is scoped to its own theme, so Light, Dark and
                Warm Dark can be compared side by side. The values are read live
                from the page.
              </p>
            </div>
            <ColourSpecimen />
          </div>
        </Section>

        <SectionSeam from="bg" to="mint" seed={101} />

        {/* 4. Type (mint-soft band) */}
        <Section id="type" labelledBy="type-heading" tone="mint" soft>
          <div className="space-y-12">
            <div className="space-y-4">
              <Heading
                id="type-heading"
                as="h2"
                highlight="scale"
                highlightTone="mint"
              >
                Two typefaces, one scale.
              </Heading>
              <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                Bricolage Grotesque for display, Inter for reading. Headings
                scale fluidly between 375 and 1440 wide, and every size and line
                height lands on the 4/8 grid.
              </p>
            </div>
            <TypeSpecimen />
          </div>
        </Section>

        <SectionSeam from="mint" to="bg" seed={103} />

        {/* 5. Space, corners and shadows (bg) */}
        <Section id="space" labelledBy="space-heading" tone="bg">
          <div className="space-y-12">
            <div className="space-y-4">
              <Heading
                id="space-heading"
                as="h2"
                highlight="corners"
                highlightTone="butter"
              >
                Space, corners and shadows.
              </Heading>
              <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                Every size, space, radius and shadow offset is a multiple of 4.
                Shadows are solid stickers with zero blur.
              </p>
            </div>
            <SpaceShapeSpecimen />
          </div>
        </Section>

        <SectionSeam from="bg" to="butter" seed={107} />

        {/* 6. Motion (butter-soft band) */}
        <Section id="motion" labelledBy="motion-heading" tone="butter" soft>
          <div className="space-y-12">
            <div className="space-y-4">
              <Heading
                id="motion-heading"
                as="h2"
                highlight="beat"
                highlightTone="butter"
              >
                Motion on a 40ms beat.
              </Heading>
              <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                Every duration and delay is a multiple of 40ms. Things arrive
                fast and settle softly. With reduced motion, slides become short
                fades.
              </p>
            </div>
            <MotionSpecimen />
            <TextLink
              href="/#motion"
              tone="butter"
              iconEnd={<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
              className="min-h-12 items-center font-body text-button font-semibold"
            >
              See the principles in action
            </TextLink>
          </div>
        </Section>

        <SectionSeam from="butter" to="bg" seed={109} />

        {/* 7. Loaffy (bg) */}
        <Section id="loaffy" labelledBy="loaffy-heading" tone="bg">
          <div className="space-y-12">
            <Heading
              id="loaffy-heading"
              as="h2"
              highlight="Loaffy"
              highlightTone="blush"
            >
              Meet Loaffy.
            </Heading>
            <LoaffyPicker />
          </div>
        </Section>

        <SectionSeam from="bg" to="sky" seed={113} />

        {/* 8. Components (sky-soft band) */}
        <Section id="components" labelledBy="components-heading" tone="sky" soft>
          <div className="space-y-12">
            <Heading
              id="components-heading"
              as="h2"
              highlight="Components"
              highlightTone="sky"
            >
              Components.
            </Heading>
            <ComponentSpecimen />
          </div>
        </Section>

        <SectionSeam from="sky" to="bg" seed={127} />

        {/* 9. How it ships (bg) */}
        <Section id="ships" labelledBy="ships-heading" tone="bg">
          <div className="space-y-10">
            <Heading
              id="ships-heading"
              as="h2"
              highlight="ships"
              highlightTone="pistachio"
            >
              How it ships.
            </Heading>
            <h3 className="sr-only">Accessibility, tech stack and credits</h3>
            <IndexColumns items={shipColumns} columns={3} as="h4" />
          </div>
        </Section>

        <ContactPanel className="pt-0" />
      </main>
      <SiteFooter />
    </div>
  );
}
