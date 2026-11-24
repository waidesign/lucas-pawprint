import type { Metadata } from "next";
import {
  getVisibleMotionClips,
  HOW_I_ANIMATE,
  MOTION_TOOLS,
} from "@/content/motion";
import { profile } from "@/content/site";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { Loaffy } from "@/components/mascot/Loaffy";
import { MotionCatalog } from "@/components/motion/MotionCatalog";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { IndexColumns, type IndexColumnItem } from "@/components/ui/IndexColumns";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { VideoReel } from "@/components/ui/VideoReel";

export const metadata: Metadata = {
  title: "Motion · Lucas (Wai Phyo Aung)",
  description:
    "Product and interface motion design by Lucas (Wai Phyo Aung): showreel, Lottie micro-interactions, and After Effects studies.",
  alternates: {
    canonical: "https://lucas.pawprint.design/motion",
  },
  openGraph: {
    title: "Motion · Lucas (Wai Phyo Aung)",
    description:
      "Product and interface motion design by Lucas (Wai Phyo Aung): showreel, Lottie micro-interactions, and After Effects studies.",
    url: "https://lucas.pawprint.design/motion",
    type: "website",
    images: [
      {
        url: "https://lucas.pawprint.design/og/luci-teaser.png",
        width: 1200,
        height: 630,
        alt: "Motion design reel and studies by Lucas (Wai Phyo Aung).",
      },
    ],
  },
};

const ANIMATE_ITEMS: IndexColumnItem[] = HOW_I_ANIMATE.map((step) => ({
  id: step.id,
  number: step.number,
  title: step.title,
  body: step.body,
}));

export default function MotionPage() {
  const visibleClips = getVisibleMotionClips();
  const hasMultipleTypes = new Set(visibleClips.map((c) => c.type)).size > 1;

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <main id="main-content" className="flex-1">
        {/* 1. Hero + 2. Full-width Showreel (bg) */}
        <Section id="motion-hero" labelledBy="motion-page-heading" tone="bg">
          <div className="space-y-12">
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                  Showreel &amp; motion studies
                </p>
                <Heading id="motion-page-heading" as="h1">
                  Motion.
                </Heading>
                <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                  {profile.motionIntro}
                </p>
              </div>

              <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
                <Loaffy
                  form="play"
                  size={240}
                  label="Loaffy in play form; vibes while the showreel plays"
                />
              </div>
            </div>

            <VideoReel
              tone="sky"
              loaffyButton={false}
              staticWhenEmpty
              emptyCaption="Showreel coming soon"
              title="Lucas (Wai Phyo Aung) — Product & Motion Design Reel"
            />
          </div>
        </Section>

        {/* 3. Work by type / Motion studies (bg) */}
        <Section
          id="motion-work"
          labelledBy="motion-work-heading"
          tone="bg"
          className="border-t border-line rounded-none md:rounded-none"
        >
          <div className="space-y-10">
            <Heading
              id="motion-work-heading"
              as="h2"
              highlight={hasMultipleTypes ? "type" : "studies"}
              highlightTone="sky"
            >
              {hasMultipleTypes ? "Work by type." : "Motion studies."}
            </Heading>
            <h3 className="sr-only">Motion clips</h3>

            <MotionCatalog clips={visibleClips} />
          </div>
        </Section>

        {/* 4. How I animate + 5. Tools + Behance link (sky-soft band) */}
        <Section
          id="how-i-animate"
          labelledBy="how-i-animate-heading"
          tone="sky"
          soft
        >
          <div className="space-y-12">
            <div className="space-y-10">
              <Heading
                id="how-i-animate-heading"
                as="h2"
                highlight="animate"
                highlightTone="sky"
              >
                How I animate.
              </Heading>
              <h3 className="sr-only">Animation stages</h3>

              <IndexColumns
                items={ANIMATE_ITEMS}
                columns={4}
                ordered
                as="h4"
              />
            </div>

            <div className="space-y-6 border-t border-line pt-10">
              <div className="space-y-4">
                <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                  Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {MOTION_TOOLS.map((tool) => (
                    <Chip key={tool}>{tool}</Chip>
                  ))}
                </div>
              </div>

              <div>
                <TextLink
                  href={profile.socials.behance}
                  external
                  tone="sky"
                  className="text-body-lg"
                >
                  More on Behance
                </TextLink>
              </div>
            </div>
          </div>
        </Section>

        {/* 6. ContactPanel */}
        <ContactPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
