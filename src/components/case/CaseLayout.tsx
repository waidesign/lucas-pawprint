import type { ReactNode } from "react";
import Link from "next/link";
import type { CaseStudyMetadata } from "@/lib/schema";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CaseStudyProvider } from "@/components/case/CaseStudyContext";
import { CaseHero } from "@/components/case/CaseHero";
import { CaseStepper } from "@/components/case/CaseStepper";
import { TLDR } from "@/components/case/TLDR";
import { NextCase } from "@/components/case/NextCase";

export interface CaseLayoutProps {
  metadata: CaseStudyMetadata;
  nextCase?: CaseStudyMetadata;
  /**
   * When true, renders the generic CaseHero + MetaRow + TLDR + NextCase chrome
   * around the MDX body. Set to false when a case study (like Luci in Steps 4–6)
   * renders custom `<LuciHero />`, `<TLDR />`, and `<CaseCTA />` directly in MDX.
   */
  renderDefaultHero?: boolean;
  renderDefaultFooter?: boolean;
  children: ReactNode;
}

/**
 * Generic CaseLayout shell for `/work/[slug]` per IA.md §2–§3, COMPONENTS.md §E,
 * and DESIGN.md §1.4 & §3–§4:
 * - Breadcrumb "Work / {title}" + sticky BeanStepper (`CaseStepper`) on `≥ lg`
 * - Prose width rules (`--prose-max` 720px) & section spacing (`--space-section`)
 * - Reusable across all 7 case studies.
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
      <SiteNav />

      <main id="main-content" className="min-h-screen bg-bg text-text">
        {/* Top breadcrumb + sticky BeanStepper bar */}
        <div className="sticky top-0 z-30 border-b border-line bg-bg">
          <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-10 lg:px-20">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 font-mono text-caption text-text-muted">
                <li>
                  <Link
                    href="/#work"
                    className="inline-flex min-h-12 items-center px-1 font-medium text-text underline decoration-2 underline-offset-4 hover:text-text-muted"
                  >
                    Work
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-text">
                  {metadata.title}
                </li>
              </ol>
            </nav>

            <div className="hidden lg:block">
              <CaseStepper className="lg:static" />
            </div>
          </div>
        </div>

        {/* Generic CaseHero + MetaRow + TLDR when the MDX doesn't render its own hero */}
        {renderDefaultHero && (
          <>
            <CaseHero metadata={metadata} />
            <TLDR />
          </>
        )}

        {/* Mobile/tablet stepper bar: single horizontal scrolling row, no outer pill */}
        <div className="border-b border-line bg-surface py-2 lg:hidden">
          <div className="w-full overflow-x-auto px-4 md:px-10">
            <CaseStepper />
          </div>
        </div>

        {/* MDX Case Study Body */}
        <article className="w-full">{children}</article>

        {/* Next case study link */}
        {renderDefaultFooter && <NextCase />}
      </main>

      <SiteFooter />
    </CaseStudyProvider>
  );
}
