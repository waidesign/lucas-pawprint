"use client";

import { Calendar } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";
import { Loaffy } from "@/components/mascot/Loaffy";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export interface ContactPanelProps {
  className?: string;
}

/**
 * ContactPanel ([P1-A6]):
 * - Plain centered band directly on the page background (no card container).
 * - Special display `h2` (`text-display`, 96px desktop — between `h2` 64px and `h1` 160px)
 *   with Loaffy tightly nestled between "Inter" and "ested?", plus a single "Book a chat"
 *   Primary Button underneath.
 */
export function ContactPanel({ className }: ContactPanelProps = {}) {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      tone="bg"
      className={className}
    >
      <div className="flex flex-col items-center justify-center gap-8 py-8 text-center text-text md:gap-10 md:py-16">
        <h2
          id="contact-heading"
          aria-label="Interested?"
          className={cn(
            "inline-flex flex-nowrap items-center justify-center font-display text-display text-text"
          )}
        >
          <span aria-hidden="true">Inter</span>
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={
              prefersReduced ? undefined : { y: [0, -4, 0], rotate: [-4, 3, -4] }
            }
            transition={
              prefersReduced
                ? undefined
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
            whileHover={prefersReduced ? undefined : { scale: 1.12, rotate: 0 }}
            className="-mx-2 inline-flex shrink-0 -translate-y-1 items-center align-middle md:-mx-3"
          >
            <Loaffy
              form="paw"
              mood="happy"
              size={128}
              track={false}
              blink
              listenToBus={false}
              showGroundShadow={false}
              decorative
              className="!h-[0.92em] !w-[0.92em]"
            />
          </motion.span>
          <span aria-hidden="true">ested?</span>
        </h2>

        <Button
          variant="primary"
          size="lg"
          href={profile.bookingUrl}
          external
          iconStart={<Calendar className="h-5 w-5" />}
          onClick={() => {
            trackEvent("book_chat_click", { location: "contact_panel" });
            emitLoaffyEvent("book-chat-click");
          }}
        >
          Book a chat
        </Button>
      </div>
    </Section>
  );
}
