"use client";

import { profile, shippedForClients } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { Chip } from "@/components/ui/Chip";
import { TextLink } from "@/components/ui/TextLink";
import { BetaBadge } from "@/components/ui/BetaBadge";

export function ProofStrip() {
  return (
    <section
      id="proof"
      aria-label="Experience and client proof"
      className="w-full border-y-2 border-line-strong bg-surface px-4 py-6 text-text md:px-10 lg:px-20"
    >
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Founder of Luci + 10 years + Empire Pixel */}
        <div className="flex flex-wrap items-center gap-3 font-body text-body text-text">
          <span className="font-semibold">
            Founder of{" "}
            <TextLink
              href={`/work/${profile.founderOf.slug}`}
              tone="lilac"
              onClick={() =>
                trackEvent("luci_click", { location: "proof_strip" })
              }
            >
              {profile.founderOf.name}
            </TextLink>
          </span>
          <BetaBadge />
          <span aria-hidden="true" className="text-text-muted">
            ·
          </span>
          <span>{profile.years} years in design</span>
          <span aria-hidden="true" className="text-text-muted">
            ·
          </span>
          <span className="text-text-muted">
            Now: Senior UI/UX & Motion Designer at{" "}
            <strong className="font-semibold text-text">Empire Pixel</strong>
          </span>
        </div>

        {/* Right: Shipped for list */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-body text-caption font-semibold uppercase text-text-muted">
            Shipped for:
          </span>
          {shippedForClients.map((client) => (
            <Chip key={client} tone="surface" size="sm">
              {client}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
