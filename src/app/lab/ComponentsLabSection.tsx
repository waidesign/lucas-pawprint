"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import type { Tone } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { TextLink } from "@/components/ui/TextLink";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chip } from "@/components/ui/Chip";
import { Sticker } from "@/components/ui/Sticker";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { HoverNote } from "@/components/ui/HoverNote";
import { useToast } from "@/components/ui/Toast";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { CursorToggle } from "@/components/ui/CursorToggle";
import { BeanStepper } from "@/components/ui/BeanStepper";
import { BeanLoader } from "@/components/ui/BeanLoader";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { VideoReel } from "@/components/ui/VideoReel";
import { BetaBadge } from "@/components/ui/BetaBadge";
import { SiteNav } from "@/components/site/SiteNav";
import { MobileMenu } from "@/components/site/MobileMenu";
import { SiteFooter } from "@/components/site/SiteFooter";

const ALL_TONES: Tone[] = [
  "lilac",
  "mint",
  "butter",
  "sky",
  "blush",
  "pistachio",
];

const FILTER_TAGS = [
  "All",
  "Own product",
  "Web",
  "Apps",
  "Design systems",
  "E-commerce",
  "AI workflow",
];

const PROCESS_STEPS = ["Understand", "Shape", "Design", "Ship"];

export function ComponentsLabSection() {
  const { showToast, dismissToast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeStep, setActiveStep] = useState(1);
  const [mobileSheetDemoOpen, setMobileSheetDemoOpen] = useState(false);

  return (
    <section
      aria-labelledby="lab-components-heading"
      className="space-y-12 rounded-xl border-2 border-line-strong bg-bg p-6 text-text shadow-sticker md:p-8"
    >
      <div className="border-b border-line pb-6">
        <p className="font-body text-label uppercase text-text-muted">
          09 · Phase 3 — Core Components & Site Chrome
        </p>
        <h2
          id="lab-components-heading"
          className="mt-2 font-display text-h2 text-text"
        >
          UI Primitives, Interactive Controls & Site Chrome
        </h2>
        <p className="mt-2 max-w-2xl font-body text-body text-text-muted">
          Every component below uses tokens only, adheres to the 4/8 grid and
          48×48 minimum touch targets, and implements hover lift, press squish,
          visible focus rings and reduced-motion behavior.
        </p>
      </div>

      {/* 1. Button & IconButton */}
      <div className="space-y-4 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <h3 className="font-display text-h3 text-text">
          01 · Button & IconButton
        </h3>
        <p className="font-body text-caption text-text-muted">
          Primary (inverse fill + sky sticker shadow), Secondary (all 6 pastel
          tones + ink sticker shadow), Ghost, sizes md (48) & lg (56),
          polymorphic links, external ↗, and disabled states.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            iconEnd={<ArrowRight className="h-5 w-5" />}
          >
            See selected work
          </Button>
          <Button variant="secondary" tone="lilac" size="lg">
            Book a chat
          </Button>
          <Button variant="ghost" size="lg">
            Read case study →
          </Button>
          <Button variant="primary" size="md">
            Primary md (48)
          </Button>
          <Button
            variant="secondary"
            tone="mint"
            size="md"
            href="/resume.pdf"
            external
          >
            Resume
          </Button>
          <Button variant="primary" size="md" disabled>
            Disabled primary
          </Button>
          <Button variant="secondary" tone="butter" size="md" disabled>
            Disabled secondary
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          {ALL_TONES.map((tone) => (
            <Button key={tone} variant="secondary" tone={tone} size="md">
              Secondary ({tone})
            </Button>
          ))}
        </div>

        {/* Static State Matrix (Default · Hover/Lifted · Active/Pressed · Focus-Visible · Disabled) */}
        <div className="border-t border-line pt-4">
          <p className="mb-3 font-mono text-caption text-text-muted">
            Interactive State Matrix (all 5 states visible at once):
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-start gap-2">
              <span className="font-mono text-caption text-text-muted">
                1. Default
              </span>
              <Button variant="secondary" tone="lilac" size="md">
                Default state
              </Button>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="font-mono text-caption text-text-muted">
                2. Hover (lift −4, shadow-sticker)
              </span>
              <Button
                variant="secondary"
                tone="lilac"
                size="md"
                className="-translate-x-1 -translate-y-1 shadow-sticker"
              >
                Hovered state
              </Button>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="font-mono text-caption text-text-muted">
                3. Active (press +4, scale 0.96, shadow-none)
              </span>
              <Button
                variant="secondary"
                tone="lilac"
                size="md"
                className="translate-x-1 translate-y-1 scale-95 shadow-none"
              >
                Pressed state
              </Button>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="font-mono text-caption text-text-muted">
                4. Focus-Visible (2px ring + 4px offset)
              </span>
              <Button
                variant="secondary"
                tone="lilac"
                size="md"
                className="outline-2 outline-offset-4 outline-focus"
              >
                Focused state
              </Button>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="font-mono text-caption text-text-muted">
                5. Disabled (aria-disabled)
              </span>
              <Button variant="secondary" tone="lilac" size="md" disabled>
                Disabled state
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-4">
          <IconButton aria-label="Surface icon button" variant="surface">
            <Sparkles className="h-5 w-5" />
          </IconButton>
          <IconButton
            aria-label="Primary icon button"
            variant="primary"
          >
            <ArrowRight className="h-5 w-5" />
          </IconButton>
          {ALL_TONES.map((tone) => (
            <IconButton
              key={tone}
              aria-label={`Secondary ${tone} icon button`}
              variant="secondary"
              tone={tone}
            >
              <ExternalLink className="h-5 w-5" />
            </IconButton>
          ))}
          <IconButton
            aria-label="Disabled icon button"
            variant="surface"
            disabled
          >
            <Sparkles className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      {/* 2. TextLink, Heading, Eyebrow & BetaBadge */}
      <div className="space-y-6 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <h3 className="font-display text-h3 text-text">
          02 · TextLink, Heading (Single Highlight), Eyebrow & BetaBadge
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          <Eyebrow beanDot tone="lilac">
            Lucas (Wai Phyo Aung) · Product & Motion Designer
          </Eyebrow>
          <BetaBadge />
        </div>

        <div className="space-y-4 border-t border-line pt-4">
          <Heading
            as="h2"
            size="display"
            highlight="box"
            highlightTone="lilac"
          >
            Think outside the box with Lucas & Loaffy.
          </Heading>
          <Heading
            as="h3"
            size="h2"
            highlight="curious"
            highlightTone="mint"
          >
            Let&apos;s build something calm and curious.
          </Heading>
        </div>

        <div className="flex flex-wrap items-center gap-6 border-t border-line pt-4">
          {ALL_TONES.map((tone) => (
            <TextLink key={tone} href="#lab-components-heading" tone={tone}>
              Inline link ({tone})
            </TextLink>
          ))}
          <TextLink href="https://luci.pawprint.design" external tone="butter">
            Live site
          </TextLink>
        </div>
      </div>

      {/* 3. Chip & Filter Chip */}
      <div className="space-y-4 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <h3 className="font-display text-h3 text-text">
          03 · Chip & Interactive Filter Chips
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <Chip tone="surface">Surface tag</Chip>
          {ALL_TONES.map((tone) => (
            <Chip key={tone} tone={tone}>
              {tone}
            </Chip>
          ))}
        </div>

        <div className="border-t border-line pt-4">
          <p className="mb-2 font-mono text-caption text-text-muted">
            Filter chip bar (as=&quot;button&quot;, aria-pressed, 48px touch
            target):
          </p>
          <div
            role="group"
            aria-label="Filter case studies by tag"
            className="flex flex-wrap items-center gap-1"
          >
            {FILTER_TAGS.map((tag) => (
              <Chip
                key={tag}
                as="button"
                selected={selectedFilter === tag}
                onClick={() => setSelectedFilter(tag)}
              >
                {tag}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Sticker, Card, Section & HoverNote */}
      <div className="space-y-6 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-h3 text-text">
            04 · Sticker, Card, Section & HoverNote
          </h3>
          <HoverNote
            tone="butter"
            note="Stickers use 2px pen borders and solid offset shadows instead of blurred drop shadows."
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <Sticker tone="blush" rotate={-2} size="md">
            Everyone designs with AI now. It all looks like slop.{" "}
            <strong>Except mine.</strong>
          </Sticker>
          <Sticker tone="mint" rotate={2} size="sm">
            Calm page, lively character
          </Sticker>
          <Sticker tone="butter" rotate={-3} size="sm">
            Curious by nature, careful by habit.
          </Sticker>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3">
          <Card tone="surface">
            <p className="font-display text-h4">Surface Card</p>
            <p className="mt-2 font-body text-body text-text-muted">
              2px pen border, rounded-lg (32px), solid shadow-sticker-sm.
            </p>
          </Card>
          <Card tone="lilac">
            <p className="font-display text-h4">Lilac Card</p>
            <p className="mt-2 font-body text-body">
              Always uses on-pastel (#2B2B2B) text across all three themes.
            </p>
          </Card>
          <Card tone="sky">
            <p className="font-display text-h4">Sky Card</p>
            <p className="mt-2 font-body text-body">
              Used for Classic Decoder and informational callouts.
            </p>
          </Card>
        </div>

        <Section
          id="lab-nested-section-demo"
          labelledBy="lab-nested-section-heading"
          tone="mint"
          soft
          className="rounded-lg border-2 border-line-strong"
        >
          <h4
            id="lab-nested-section-heading"
            className="font-display text-h3 text-text"
          >
            Section Container (mint-soft)
          </h4>
          <p className="mt-2 font-body text-body text-text-muted">
            Applies fluid --space-section vertical padding, --space-gutter
            horizontal padding, and --container-max width.
          </p>
        </Section>
      </div>

      {/* 5. Toast, CopyEmail, ThemeSwitch & CursorToggle */}
      <div className="space-y-6 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <h3 className="font-display text-h3 text-text">
          05 · Toast, CopyEmail, ThemeSwitch & CursorToggle
        </h3>

        <div className="space-y-4">
          <p className="font-mono text-caption text-text-muted">
            CopyEmail (lucas@pawprint.design) — hover 1.2s without copying for
            Loaffy side-eye, or click Copy to fire Toast + Happy hop:
          </p>
          <CopyEmail />
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <Button
            variant="secondary"
            tone="mint"
            size="md"
            onClick={() =>
              showToast({
                message: "Copied. Loaffy's waiting by the inbox.",
                tone: "mint",
                mood: "happy",
              })
            }
          >
            Trigger Success Toast
          </Button>
          <Button
            variant="secondary"
            tone="butter"
            size="md"
            onClick={() =>
              showToast({
                message: "Loaffy's fetching it…",
                tone: "butter",
                mood: "thinking",
              })
            }
          >
            Trigger Thinking Toast
          </Button>
          <Button
            variant="secondary"
            tone="blush"
            size="md"
            onClick={() =>
              showToast({
                message: "Couldn't copy. Here it is: lucas@pawprint.design",
                tone: "blush",
                mood: "surprised",
              })
            }
          >
            Trigger Error Toast
          </Button>
          <Button variant="ghost" size="md" onClick={dismissToast}>
            Dismiss Toast
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <ThemeSwitch variant="segmented" />
            <ThemeSwitch variant="compact" />
          </div>
          <CursorToggle />
        </div>
      </div>

      {/* 6. BeanStepper & BeanLoader */}
      <div className="space-y-6 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <h3 className="font-display text-h3 text-text">
          06 · BeanStepper & BeanLoader
        </h3>

        <div className="space-y-4">
          <p className="font-mono text-caption text-text-muted">
            BeanStepper (Horizontal & Vertical — click a step or use Next/Prev):
          </p>
          <BeanStepper
            steps={PROCESS_STEPS}
            current={activeStep}
            onStepClick={setActiveStep}
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              tone="lilac"
              size="md"
              onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
            >
              Previous step
            </Button>
            <Button
              variant="secondary"
              tone="mint"
              size="md"
              onClick={() =>
                setActiveStep((s) => Math.min(PROCESS_STEPS.length - 1, s + 1))
              }
            >
              Next step
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8 border-t border-line pt-4">
          <BeanStepper
            steps={PROCESS_STEPS}
            current={activeStep}
            orientation="vertical"
            onStepClick={setActiveStep}
          />
          <div className="space-y-2">
            <p className="font-mono text-caption text-text-muted">
              BeanLoader (960ms loop, 240ms per bean):
            </p>
            <BeanLoader showText />
          </div>
        </div>
      </div>

      {/* 7. DeviceFrame & VideoReel */}
      <div className="space-y-6 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <h3 className="font-display text-h3 text-text">
          07 · DeviceFrame & VideoReel
        </h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DeviceFrame
            device="browser"
            tone="sky"
            alt="Classic Decoder homepage preview inside browser DeviceFrame"
          >
            <div className="text-center">
              <p className="font-display text-h4">Browser DeviceFrame</p>
              <p className="mt-1 font-body text-caption text-text-muted">
                Thin 2px pen frame · rounded-md screen · sky pastel panel
              </p>
            </div>
          </DeviceFrame>

          <DeviceFrame
            device="phone"
            tone="mint"
            alt="Classic Decoder App preview inside phone DeviceFrame"
          >
            <div className="text-center">
              <p className="font-display text-h4">Phone Frame</p>
              <p className="mt-1 font-body text-caption text-text-muted">
                App case study cover
              </p>
            </div>
          </DeviceFrame>
        </div>

        <VideoReel
          tone="sky"
          title="Motion Showreel — Product & Interface Animation"
        />
      </div>

      {/* 8. Site Chrome: SiteNav, MobileMenu & SiteFooter */}
      <div className="space-y-6 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-h3 text-text">
              08 · Site Chrome (SiteNav, MobileMenu & SiteFooter)
            </h3>
            <p className="font-body text-caption text-text-muted">
              Wordmark with ginger toe bean; right group: compact ThemeSwitch, Resume
              button and HeaderMenuButton; full-page HeaderMenu that fades in under the
              header, with focus trap; and pistachio-soft SiteFooter.
            </p>
          </div>
          <Button
            variant="secondary"
            tone="lilac"
            size="md"
            onClick={() => setMobileSheetDemoOpen(true)}
          >
            Open header menu (Esc to close)
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border-2 border-line-strong">
          <SiteNav activePathOverride="/work" previewMode />
        </div>

        <div className="overflow-hidden rounded-lg border-2 border-line-strong">
          <SiteFooter />
        </div>

        <MobileMenu
          open={mobileSheetDemoOpen}
          onClose={() => setMobileSheetDemoOpen(false)}
          currentPath="/work"
        />
      </div>
    </section>
  );
}
