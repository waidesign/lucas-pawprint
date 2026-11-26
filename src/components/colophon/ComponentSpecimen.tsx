import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Sticker } from "@/components/ui/Sticker";
import { TextLink } from "@/components/ui/TextLink";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { profile } from "@/content/site";

const LABEL = "font-mono text-label uppercase tracking-wider text-text-muted";

function Row({ label, note, children }: { label: string; note: string; children: ReactNode }) {
  return (
    <li className="grid grid-cols-1 gap-4 py-8 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-8">
      <div className="space-y-1 lg:col-span-4">
        <p className={LABEL}>{label}</p>
        <p className="font-body text-caption text-text-muted">{note}</p>
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-4 lg:col-span-8">
        {children}
      </div>
    </li>
  );
}

/**
 * /colophon · Components: the site's real primitives, live, in one framed specimen
 * (the section's single card group, rule 18b). Links go to real pages; the theme
 * switch changes the whole site.
 */
export function ComponentSpecimen() {
  return (
    <div className="rounded-xl border-2 border-line-strong bg-surface p-6 shadow-sticker md:p-10">
      <ul className="divide-y divide-line">
        <Row
          label="Buttons"
          note="Primary in ink, secondary on a pastel, 48px and 56px tall. Every target is at least 48×48."
        >
          <Button variant="primary" size="lg" href="/work" iconEnd={<ArrowRight className="h-5 w-5" />}>
            See selected work
          </Button>
          <Button variant="secondary" tone="lilac" size="lg" href="/contact">
            Say hi
          </Button>
          <Button variant="secondary" tone="mint" size="md" href="/about">
            About me
          </Button>
        </Row>

        <Row
          label="Text links"
          note="One pill highlight on hover and focus, in any pastel."
        >
          <TextLink href="/work/luci" tone="lilac">
            Luci
          </TextLink>
          <TextLink href="/about" tone="butter">
            About
          </TextLink>
          <TextLink href={profile.socials.behance} external tone="mint">
            Behance
          </TextLink>
        </Row>

        <Row
          label="Chips, badges, stickers"
          note="Clean text only: no status dots inside any of them."
        >
          <Chip>Design systems</Chip>
          <Chip tone="mint">Motion</Chip>
          <Badge label="Badge" tone="butter" />
          <Sticker tone="blush" rotate={-2} size="sm">
            Calm page, lively character
          </Sticker>
        </Row>

        <Row
          label="Theme"
          note="Light, Dark, Warm Dark or System. This switch changes the whole site."
        >
          <ThemeSwitch variant="segmented" />
        </Row>

        <Row
          label="Fields"
          note="A real label, a hint or an error in text, never colour alone."
        >
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <Field
              htmlFor="colophon-input-name"
              label="Your name"
              hint="Default field."
            >
              <Input
                id="colophon-input-name"
                placeholder="Your name"
                aria-describedby="colophon-input-name-description"
              />
            </Field>
            <Field
              htmlFor="colophon-input-email"
              label="Email"
              hint="Read-only pill field."
            >
              <Input
                id="colophon-input-email"
                type="email"
                value={profile.email}
                readOnly
                shape="pill"
                aria-describedby="colophon-input-email-description"
              />
            </Field>
            <Field
              htmlFor="colophon-input-error"
              label="Email (with an error)"
              error="Please enter a valid email address."
            >
              <Input
                id="colophon-input-error"
                type="email"
                defaultValue="not-an-email"
                invalid
                aria-describedby="colophon-input-error-description"
              />
            </Field>
            <Field
              htmlFor="colophon-input-disabled"
              label="Disabled"
              hint="Unavailable state."
            >
              <Input
                id="colophon-input-disabled"
                value="Locked value"
                disabled
                aria-describedby="colophon-input-disabled-description"
              />
            </Field>
          </div>
        </Row>
      </ul>
    </div>
  );
}
