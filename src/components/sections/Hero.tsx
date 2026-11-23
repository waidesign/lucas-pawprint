"use client";

import { ArrowDown, ArrowRight, Calendar } from "lucide-react";
import { profile } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";
import { LoaffyStage } from "@/components/mascot/LoaffyStage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Sticker } from "@/components/ui/Sticker";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      style={{
        paddingLeft: "var(--space-gutter)",
        paddingRight: "var(--space-gutter)",
      }}
      className="w-full bg-bg py-8 text-text md:py-16 lg:py-20"
    >
      <div
        className="mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8"
        style={{ maxWidth: "var(--container-max)" }}
      >
        {/* Left column (40% visual weight on desktop, top on mobile so title + availability + resume fit 375x667) */}
        <div className="space-y-6 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow beanDot tone="lilac">
              {profile.name} · {profile.title}
            </Eyebrow>
            <Sticker tone="mint" rotate={2} size="sm">
              {profile.availability}
            </Sticker>
          </div>

          <Heading
            id="hero-heading"
            as="h1"
            size="display"
            highlight="box"
            highlightTone="lilac"
          >
            Think outside the box with Lucas & Loaffy.
          </Heading>

          <p className="max-w-xl font-body text-body-lg text-text-muted">
            I design web products, apps and motion for SaaS, e-commerce and
            data-heavy platforms, and I build my own.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              href="#work"
              iconEnd={<ArrowRight className="h-5 w-5" />}
            >
              See selected work
            </Button>

            <Button
              variant="secondary"
              tone="lilac"
              size="lg"
              href={profile.bookingUrl}
              external
              iconStart={<Calendar className="h-5 w-5" />}
              onClick={() => {
                trackEvent("book_chat_click", { location: "hero" });
                emitLoaffyEvent("book-chat-click");
              }}
            >
              Book a chat
            </Button>
          </div>
        </div>

        {/* Right column (LoaffyStage ≈ 60% visual presence) */}
        <div className="lg:col-span-6">
          <LoaffyStage />
        </div>
      </div>

      {/* Scroll cue at bottom */}
      <div
        className="mx-auto mt-8 flex justify-center lg:mt-12"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <a
          href="#work"
          aria-label="Scroll to selected work"
          className="inline-flex min-h-12 items-center gap-2 rounded-pill border border-line bg-surface px-4 font-body text-caption text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
        >
          <span>Scroll to selected work</span>
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
