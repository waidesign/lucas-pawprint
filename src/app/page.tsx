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
import { ContactPanel } from "@/components/sections/ContactPanel";

export default async function HomePage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <main id="main-content" className="flex-1">
        <Hero />
        <ProofStrip />
        <SelectedWork caseStudies={caseStudies} />
        <ProcessStory />
        <MotionReel />
        <AboutChangelog />
        <KindWords />
        <ContactPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
