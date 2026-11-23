import type { ReactNode } from "react";
import Link from "next/link";
import type { CaseStudyMetadata } from "@/lib/schema";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CaseStudyProvider } from "@/components/case/CaseStudyContext";
import { CaseStepper } from "@/components/case/CaseStepper";
import { MetaRow } from "@/components/case/MetaRow";
import { TLDR } from "@/components/case/TLDR";
import { NextCase } from "@/components/case/NextCase";
import { BetaBadge } from "@/components/case/BetaBadge";
import { Loaffy } from "@/components/mascot/Loaffy";
import { cn, TONE_BG_CLASSES } from "@/lib/cn";

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
  const baseCover = metadata.cover.replace(/\.(webp|avif|png|jpe?g)$/i, "");
  const coverWebp = `${baseCover}.webp`;
  const coverAvif = `${baseCover}.avif`;

  return (
    <CaseStudyProvider metadata={metadata} nextCase={nextCase}>
      <SiteNav />

      <main id="main-content" className="min-h-screen bg-bg text-text">
        {/* Top breadcrumb + sticky BeanStepper bar */}
        <div className="sticky top-20 z-30 border-b border-line bg-bg/95 backdrop-blur-none">
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
                <li
                  aria-current="page"
                  className="font-semibold text-text"
                >
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
            <header className="border-b border-line bg-bg py-12 md:py-20">
              <div className="grid w-full grid-cols-1 items-center gap-8 px-4 md:px-10 lg:grid-cols-12 lg:px-20">
                <div className="space-y-4 lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-label uppercase tracking-wider text-text-subtle">
                      Case Study · {metadata.client} · {metadata.year}
                    </span>
                    {metadata.badge && <BetaBadge label={metadata.badge} />}
                  </div>

                  <h1 className="font-display text-display text-text">
                    {metadata.title}
                  </h1>

                  <p className="font-body text-body-lg text-text-muted">
                    {metadata.summary}
                  </p>
                </div>

                <div className="relative pt-8 lg:col-span-7">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-6 top-0 z-0"
                  >
                    <Loaffy
                      form={metadata.form}
                      mood="curious"
                      size={128}
                      track={false}
                      blink
                      listenToBus={false}
                      decorative
                    />
                  </div>

                  <div
                    className={cn(
                      "relative z-10 overflow-hidden rounded-xl border-2 border-line-strong p-4 shadow-sticker md:p-6",
                      TONE_BG_CLASSES[metadata.tone]
                    )}
                  >
                    <div className="overflow-hidden rounded-md border-2 border-line-strong bg-bg">
                      <picture>
                        <source srcSet={coverAvif} type="image/avif" />
                        <source srcSet={coverWebp} type="image/webp" />
                        <img
                          src={coverWebp}
                          alt={metadata.coverAlt}
                          width={1200}
                          height={750}
                          className="block aspect-16/10 w-full object-cover"
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 w-full px-4 md:px-10 lg:px-20">
                <MetaRow />
              </div>
            </header>

            <TLDR />
          </>
        )}

        {/* Mobile/tablet stepper bar */}
        <div className="border-b border-line bg-surface py-3 lg:hidden">
          <div className="w-full overflow-x-auto px-4 md:px-10 lg:px-20">
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
