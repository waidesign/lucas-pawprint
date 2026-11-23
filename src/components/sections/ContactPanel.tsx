"use client";

import { Calendar } from "lucide-react";
import { profile, SOCIAL_LINKS } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";
import { Loaffy } from "@/components/mascot/Loaffy";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Sticker } from "@/components/ui/Sticker";
import { TextLink } from "@/components/ui/TextLink";

export interface ContactPanelProps {
  compact?: boolean;
}

/**
 * ContactPanel per COMPONENTS.md §D & DESIGN.md §1.4:
 * - Lilac panel (`rounded-2xl`, 2px pen border, `shadow-sticker`).
 * - Headline "Let's build something calm and curious.", CopyEmail, Book a chat,
 *   socials, time-zone line, and Loaffy in `bubble` form.
 */
export function ContactPanel({ compact = false }: ContactPanelProps) {
  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      tone="bg"
      className="border-t-2 border-line-strong"
    >
      <div className="rounded-2xl border-2 border-line-strong bg-lilac p-6 text-on-pastel shadow-sticker md:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Sticker tone="mint" rotate={-2} size="sm">
              {profile.availability}
            </Sticker>

            <Heading
              id="contact-heading"
              as="h2"
              size={compact ? "h2" : "h1"}
              highlight="curious"
              highlightTone="mint"
              className="text-on-pastel"
            >
              Let&apos;s build something calm and curious.
            </Heading>

            <p className="font-body text-body-lg text-on-pastel/90">
              {profile.timezoneNote}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <CopyEmail email={profile.email} />

              <Button
                variant="primary"
                size="md"
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

            <ul className="flex flex-wrap items-center gap-6 border-t border-line-strong/20 pt-6">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <TextLink
                    href={s.href}
                    external
                    tone="butter"
                    className="text-on-pastel"
                  >
                    {s.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center lg:col-span-4">
            <Loaffy
              form="bubble"
              size={128}
              track={false}
              blink={false}
              listenToBus={false}
              showGroundShadow
              label="Loaffy in speech bubble form"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
