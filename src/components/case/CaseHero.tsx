import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import type { CaseStudyMetadata } from "@/lib/schema";
import { BetaBadge } from "@/components/case/BetaBadge";
import { MetaRow } from "@/components/case/MetaRow";
import { Loaffy } from "@/components/mascot/Loaffy";
import { cn, TONE_BG_CLASSES } from "@/lib/cn";

export interface CaseHeroProps {
  metadata: CaseStudyMetadata;
  className?: string;
}

/**
 * Generic CaseHero per COMPONENTS.md §E & IA.md §3:
 * - Full-width header with case label, optional BetaBadge, h1 title (display-xl),
 *   summary column, cover frame on the case's pastel tone with Loaffy peeking in
 *   the case's form, and MetaRow definition list.
 */
export function CaseHero({ metadata, className }: CaseHeroProps) {
  const baseCover = metadata.cover.replace(/\.(webp|avif|png|jpe?g)$/i, "");
  const coverWebp = `${baseCover}.webp`;
  const coverAvif = `${baseCover}.avif`;

  return (
    <header className={cn("border-b border-line bg-bg py-12 md:py-20", className)}>
      {/* Title row: full width so display-xl (160px) breathes for longer case titles */}
      <div className="w-full space-y-4 px-4 md:px-10 lg:px-20">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-label uppercase tracking-wider text-text-subtle">
            Case Study · {metadata.client} · {metadata.year}
          </span>
          {metadata.badge && <BetaBadge label={metadata.badge} />}
        </div>

        <h1
          className={cn(
            "font-display text-text text-balance",
            HEADING_SCALE_CLASSES.h1,
          )}
        >
          {metadata.title}
        </h1>
      </div>

      <div className="mt-8 grid w-full grid-cols-1 items-center gap-8 px-4 md:mt-12 md:px-10 lg:grid-cols-12 lg:px-20">
        <div className="lg:col-span-5">
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
              TONE_BG_CLASSES[metadata.tone],
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
  );
}
