"use client";

import { Calendar } from "lucide-react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/site";
import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { resolveCaseCta } from "@/lib/schema";
import { Loaffy } from "@/components/mascot/Loaffy";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";
import { trackEvent } from "@/lib/analytics";

export interface CaseCTAProps {
  heading?: string;
  body?: string;
  tone?: Tone;
  primaryLabel?: string;
  primaryHref?: string;
  primaryExternal?: boolean;
  showLoaffy?: boolean;
  className?: string;
}

/**
 * CaseCTA: the closing standout panel for every case study (Rule 18c — one standout card).
 * Uses the case's pastel tone with primary CTA + secondary "Book a chat" + Loaffy bubble form.
 */
export function CaseCTA({
  heading,
  body,
  tone,
  primaryLabel,
  primaryHref,
  primaryExternal,
  showLoaffy = true,
  className,
}: CaseCTAProps) {
  const ctx = useCaseStudy();
  const meta = ctx?.metadata;
  const isLuci = meta?.slug === "luci";
  const resolvedTone: Tone = tone ?? meta?.tone ?? "lilac";

  const resolvedMetaCta = resolveCaseCta(meta?.cta, meta?.visibility);

  const resolvedHeading =
    heading ?? (isLuci ? "Want to try Luci?" : "Want to build something together?");
  const resolvedBody =
    body ??
    (isLuci
      ? "Try it on your next project — or let's talk about yours."
      : "Let's talk about your product, design system, or next launch.");

  const resolvedPrimaryHref =
    primaryHref ??
    resolvedMetaCta?.href ??
    meta?.liveUrl ??
    `mailto:${profile.email}`;
  const resolvedPrimaryLabel =
    primaryLabel ??
    resolvedMetaCta?.label ??
    (meta?.liveUrl ? "Visit live site" : "Email me");
  const resolvedPrimaryExternal =
    primaryExternal ?? resolvedPrimaryHref.startsWith("http");

  const secondaryTone: Tone = resolvedTone === "mint" ? "butter" : "mint";

  return (
    <section
      aria-labelledby="case-cta-heading"
      className={cn("w-full bg-bg px-4 pt-12 pb-4 md:px-10 md:pt-16 lg:px-20", className)}
    >
      <div
        className={cn(
          "rounded-2xl border-2 border-line-strong p-6 text-on-pastel shadow-sticker md:p-10",
          TONE_BG_CLASSES[resolvedTone],
        )}
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <h2
              id="case-cta-heading"
              className={cn(
                "font-display text-on-pastel text-balance",
                HEADING_SCALE_CLASSES.h2,
              )}
            >
              {resolvedHeading}
            </h2>

            <p className="max-w-2xl font-body text-body-lg text-on-pastel/90">
              {resolvedBody}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                href={resolvedPrimaryHref}
                external={resolvedPrimaryExternal}
                onClick={() => {
                  if (isLuci) {
                    trackEvent("luci_click", { location: "case_cta_primary" });
                  }
                }}
              >
                {resolvedPrimaryLabel}
              </Button>

              <Button
                variant="secondary"
                tone={secondaryTone}
                size="lg"
                href={profile.bookingUrl}
                external
                iconStart={<Calendar className="h-5 w-5" />}
                onClick={() => {
                  trackEvent("book_chat_click", {
                    location: isLuci ? "luci_case_cta" : "case_cta",
                  });
                  emitLoaffyEvent("book-chat-click");
                }}
              >
                Book a chat
              </Button>
            </div>
          </div>

          {showLoaffy && (
            <div
              aria-hidden="true"
              className="flex items-center justify-center lg:col-span-4"
            >
              <Loaffy
                form="bubble"
                size={128}
                track={false}
                blink
                listenToBus={false}
                showGroundShadow
                decorative
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
