import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { MotionCraft } from "@/components/sections/MotionCraft";
import { AboutChangelog } from "@/components/sections/AboutChangelog";
import { KindWords } from "@/components/sections/KindWords";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { BuiltWith } from "@/components/sections/BuiltWith";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { SectionSeam } from "@/components/ui/SectionSeam";

export const metadata: Metadata = {
  alternates: { canonical: "https://lucas.pawprint.design" },
};

const HOME_SELECTED_SLUGS = [
  "luci",
  "vehicle-databases",
  "classic-decoder-app",
] as const;

export default async function HomePage() {
  const caseStudies = await getAllCaseStudies();
  const homeCaseStudies = HOME_SELECTED_SLUGS.map((slug) =>
    caseStudies.find((c) => c.slug === slug),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <main id="main-content" className="flex-1">
        <Hero />
        <ProofStrip />
        <SelectedWork
          caseStudies={homeCaseStudies}
          totalCount={caseStudies.length}
          showFilters={false}
        />
        {/* Attached sections meet along hand-cut wavy seams (no corners at the joins) */}
        <SectionSeam from="bg" to="mint" seed={7} />
        <ProcessStory />
        <SectionSeam from="mint" to="bg" seed={11} />
        <MotionCraft />
        <SectionSeam from="bg" to="butter" seed={23} />
        <AboutChangelog />
        <SectionSeam from="butter" to="bg" seed={37} />
        <KindWords />
        <SectionSeam from="bg" to="lilac" seed={41} />
        <HomeFaq />
        <SectionSeam from="lilac" to="bg" seed={47} />
        <BuiltWith />
        <ContactPanel className="pt-0" />
      </main>
      <SiteFooter />
    </div>
  );
}
