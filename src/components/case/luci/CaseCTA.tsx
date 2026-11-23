"use client";

import { Calendar } from "lucide-react";
import { profile } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { NextCase } from "@/components/case/NextCase";
import { useCaseStudy } from "@/components/case/CaseStudyContext";
import { Loaffy } from "@/components/mascot/Loaffy";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";
import { trackEvent } from "@/lib/analytics";

/**
 * CaseCTA (§12 of CASE-LUCI.md):
 * - Lilac panel ("Want to try Luci?", primary CTA from metadata.cta[mode],
 *   secondary "Book a chat", decorative Loaffy in bubble form).
 * - Followed by NextCase → Classic Decoder.
 */
export function CaseCTA() {
  const ctx = useCaseStudy();
  const meta = ctx?.metadata;
  const mode = meta?.visibility ?? "teaser";
  const isFull = mode === "full";

  const primaryCta = isFull
    ? (meta?.cta?.full ?? {
        label: "Try Luci",
        href: "https://luci.pawprint.design",
      })
    : (meta?.cta?.teaser ?? {
        label: "Request beta access",
        href: "mailto:lucas@pawprint.design?subject=Luci%20beta",
      });

  return (
    <section
      aria-labelledby="luci-case-cta-heading"
      className="w-full border-t border-line bg-bg"
    >
      <div className="w-full px-4 pt-12 md:px-10 md:pt-16 lg:px-20">
        <div className="rounded-2xl border-2 border-line-strong bg-lilac p-6 text-on-pastel shadow-sticker md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <h2
                id="luci-case-cta-heading"
                className="font-display text-h1 text-on-pastel"
              >
                Want to try Luci?
              </h2>

              <p className="font-body text-body-lg text-on-pastel/90">
                Or let&apos;s talk about your product.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  href={primaryCta.href}
                  onClick={() =>
                    trackEvent("luci_click", {
                      location: "case_cta_primary",
                      mode,
                    })
                  }
                >
                  {primaryCta.label}
                </Button>

                <Button
                  variant="secondary"
                  tone="mint"
                  size="lg"
                  href={profile.bookingUrl}
                  external
                  iconStart={<Calendar className="h-5 w-5" />}
                  onClick={() => {
                    trackEvent("book_chat_click", { location: "luci_case_cta" });
                    emitLoaffyEvent("book-chat-click");
                  }}
                >
                  Book a chat
                </Button>
              </div>
            </div>

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
          </div>
        </div>
      </div>

      <NextCase
        slug="classic-decoder"
        title="Classic Decoder"
        summary="Full website redesign for a classic-car data platform, moved from WordPress to Next.js."
        tone="sky"
        form="window"
      />
    </section>
  );
}
