import { getAllCaseStudies } from "@/lib/case-studies";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { MotionReel } from "@/components/sections/MotionReel";
import { AboutChangelog } from "@/components/sections/AboutChangelog";
import { KindWords } from "@/components/sections/KindWords";
import { BuiltWith } from "@/components/sections/BuiltWith";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { SectionSeam } from "@/components/ui/SectionSeam";

export default async function HomePage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <main id="main-content" className="flex-1">
        <Hero />
        <ProofStrip />
        <SelectedWork caseStudies={caseStudies} showFilters={false} />
        {/* Attached sections meet along hand-cut wavy seams (no corners at the joins) */}
        <ProcessStory />
        <SectionSeam from="mint" to="sky" seed={11} />
        <MotionReel />
        <SectionSeam from="sky" to="butter" seed={23} />
        <AboutChangelog />
        <SectionSeam from="butter" to="blush" seed={37} />
        <KindWords />
        <SectionSeam from="blush" to="sky" seed={41} />
        <BuiltWith />
        <ContactPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
