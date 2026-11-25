import type { ReactNode } from "react";
import type { CaseStudyMetadata } from "@/lib/schema";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CaseStudyProvider } from "@/components/case/CaseStudyContext";
import { CaseHero } from "@/components/case/CaseHero";
import { CaseStepper } from "@/components/case/CaseStepper";
import { CaseCTA } from "@/components/case/CaseCTA";
import { TLDR } from "@/components/case/TLDR";
import { NextCase } from "@/components/case/NextCase";

export interface CaseLayoutProps {
  metadata: CaseStudyMetadata;
  nextCase?: CaseStudyMetadata;
  /**
   * Render the default Home-style CaseHero + "At a glance." (MetaRow + TLDR)
   * around the MDX body (default true for all cases).
   */
  renderDefaultHero?: boolean;
  /**
   * Render the default closing band (CaseCTA + NextCase) after the MDX body
   * (default true for all cases).
   */
  renderDefaultFooter?: boolean;
  children: ReactNode;
}

/**
 * Home-style CaseLayout shell for `/work/[slug]` (Phase 1):
 * - No full-width sticky breadcrumb + stepper bar; breadcrumb lives inside CaseHero.
 * - Floating lg+ chapter pill (`CaseStepper`) appears once the hero scrolls out and hides over closing.
 * - Hero (bg) → At a glance (bg) → Four alternating wavy-seam chapters → Closing band (CaseCTA + NextCase) → Footer.
 */
export function CaseLayout({
  metadata,
  nextCase,
  renderDefaultHero = true,
  renderDefaultFooter = true,
  children,
}: CaseLayoutProps) {
  return (
    <CaseStudyProvider metadata={metadata} nextCase={nextCase}>
      <div className="flex min-h-full flex-col bg-bg text-text">
        <SiteNav />
        <CaseStepper />

        <main id="main-content" className="flex-1 bg-bg text-text">
          {renderDefaultHero && (
            <>
              <CaseHero metadata={metadata} />
              <TLDR />
            </>
          )}

          <article className="w-full">{children}</article>

          {renderDefaultFooter && (
            <div
              data-case-closing="true"
              className="w-full bg-bg px-4 pt-12 pb-24 md:px-10 md:pt-16 md:pb-32 lg:px-20 lg:pb-40"
            >
              <div
                className={
                  nextCase
                    ? "grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch"
                    : "grid grid-cols-1"
                }
              >
                <CaseCTA embedded showLoaffy={false} />
                {nextCase && <NextCase embedded />}
              </div>
            </div>
          )}
        </main>

        <SiteFooter />
      </div>
    </CaseStudyProvider>
  );
}
