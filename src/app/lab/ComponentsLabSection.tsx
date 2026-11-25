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
import { Field } from "@/components/ui/Field";
import { Input, Textarea } from "@/components/ui/Input";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { CursorToggle } from "@/components/ui/CursorToggle";
import { BeanStepper } from "@/components/ui/BeanStepper";
import { BeanLoader } from "@/components/ui/BeanLoader";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { VideoReel } from "@/components/ui/VideoReel";
import { Badge } from "@/components/ui/Badge";
import { RuledList } from "@/components/ui/RuledList";
import { IndexColumns } from "@/components/ui/IndexColumns";
import { PullQuote } from "@/components/ui/PullQuote";
import { Callout } from "@/components/case/Callout";
import { BrowserFrame } from "@/components/case/BrowserFrame";
import { FeatureRow } from "@/components/case/FeatureRow";
import { DecisionList } from "@/components/case/DecisionList";
import { Showcase } from "@/components/case/Showcase";
import { PainList } from "@/components/case/PainList";
import { InsightList } from "@/components/case/InsightList";
import { Outcome as CaseOutcome } from "@/components/case/Outcome";
import { Learnings as CaseLearnings } from "@/components/case/Learnings";
import { CaseStepper } from "@/components/case/CaseStepper";
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
          tones + ink sticker shadow), Ghost, sizes md (48) &amp; lg (56),
          polymorphic links, external link icon, and disabled states.
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
          <Button
            variant="ghost"
            size="lg"
            iconEnd={<ArrowRight className="h-4 w-4" />}
          >
            Read case study
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

      {/* 2. TextLink, Heading, Eyebrow & Badge */}
      <div className="space-y-6 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <h3 className="font-display text-h3 text-text">
          02 · TextLink, Heading (Single Highlight), Eyebrow &amp; Badge
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          <Eyebrow beanDot tone="lilac">
            Lucas (Wai Phyo Aung) · Product &amp; Motion Designer
          </Eyebrow>
          <Badge label="Open source" tone="lilac" />
          <Badge label="Live" tone="mint" />
          <Badge label="Case study" tone="butter" />
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
            label="Horizontal progress steps demo"
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
            label="Vertical progress steps demo"
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
          <SiteFooter navLabel="Footer navigation preview" />
        </div>

        <MobileMenu
          open={mobileSheetDemoOpen}
          onClose={() => setMobileSheetDemoOpen(false)}
          currentPath="/work"
        />
      </div>

      {/* 9. Layout Kit & Rule 18 (RuledList, IndexColumns, PullQuote, Callout & Card rule test) */}
      <div className="space-y-8 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <div className="border-b border-line pb-4">
          <h3 className="font-display text-h3 text-text">
            09 · Layout Kit &amp; Rule 18 (No Card Overuse)
          </h3>
          <p className="mt-1 font-body text-caption text-text-muted">
            Plain type, 1px hairlines, 2px pen rules, and open column rhythm
            replace text-only boxes across non-Home routes. Works in Light, Dark
            and Warm Dark at 375 and 1440.
          </p>
        </div>

        {/* Card: when (not) to use + rule test */}
        <div className="space-y-4">
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            Card: when (not) to use — The 4-step rule test
          </p>
          <RuledList
            ordered
            as="h4"
            items={[
              {
                bean: 1,
                beanTone: "lilac",
                title: "Clickable whole?",
                body: "If clicking anywhere on the entire container navigates or triggers an action (NextCase, cover card), Card is allowed.",
                aside: "Card OK",
              },
              {
                bean: 2,
                beanTone: "sky",
                title: "Media or live demo frame?",
                body: "Screenshots, device frames, video players, code frames, diagrams, and token specimens keep a 2px pen border.",
                aside: "Frame OK",
              },
              {
                bean: 3,
                beanTone: "mint",
                title: "Single standout panel in the section?",
                body: "One standout moment per section (ContactPanel, CaseCTA) earns a Card or panel.",
                aside: "1 Panel OK",
              },
              {
                bean: 4,
                beanTone: "butter",
                title: "Text, lists, stats, or multi-column info?",
                body: "Never box text-only content or nest cards inside cards. Use RuledList, IndexColumns, PullQuote, or a Callout margin note.",
                aside: "No Box",
              },
            ]}
          />
        </div>

        {/* IndexColumns: 2, 3, and 4 columns with labels, big numbers, Chip & actions */}
        <div className="space-y-6 border-t border-line pt-6">
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            IndexColumns (2 / 3 / 4 columns · mono or Chip labels · display numerals for real steps only · actions)
          </p>

          <IndexColumns
            columns={3}
            bodySize="body-lg"
            items={[
              {
                label: (
                  <Chip tone="butter" size="sm">
                    Problem
                  </Chip>
                ),
                title: "Understand first",
                body: "Map the messy reality and real constraints before touching visual layout.",
              },
              {
                label: (
                  <Chip tone="mint" size="sm">
                    What I did
                  </Chip>
                ),
                title: "Design the system",
                body: "Turn recurring states into shared tokens and predictable primitives.",
              },
              {
                label: "Shipped",
                title: "Check twice",
                body: "Verify accessibility, reduced motion, and breakpoints before release.",
                actions: (
                  <TextLink
                    href="#lab-components-heading"
                    tone="lilac"
                    iconEnd={<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  >
                    Inspect primitives
                  </TextLink>
                ),
              },
            ]}
          />

          <IndexColumns
            columns={4}
            items={[
              {
                label: "Layout",
                title: "Two-column / Four-column",
                body: "Plain typography under a 2px pen rule scales cleanly down to 375px.",
              },
              {
                label: "Fill",
                title: "Zero fill",
                body: "Background contrast comes from alternating soft section bands, not repeated card fills.",
              },
              {
                label: "Shadow",
                title: "Zero shadow",
                body: "Sticker shadows stay reserved for clickable controls and primary media.",
              },
              {
                label: "Type",
                title: "Token scale",
                body: "Every heading follows Rule 17 through HEADING_SCALE_CLASSES.",
              },
            ]}
          />

          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            Steps variant (ordered · numerals only when order matters)
          </p>

          <IndexColumns
            columns={4}
            ordered
            items={[
              {
                number: "01",
                title: "Understand",
                body: "Map the problem and the real constraints.",
              },
              {
                number: "02",
                title: "Shape",
                body: "Sketch the flow and decide the structure.",
              },
              {
                number: "03",
                title: "Design",
                body: "Build tokens, states and screens.",
              },
              {
                number: "04",
                title: "Ship",
                body: "Check twice, then release.",
              },
            ]}
          />
        </div>

        {/* PullQuote: stacked with hairline separator + full note disclosure */}
        <div className="space-y-4 border-t border-line pt-6">
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            PullQuote (sibling hairline separator, role caption, relationship Chip, optional full note disclosure)
          </p>
          <div>
            <PullQuote
              quote="Quiet hierarchy makes technical products feel effortless without shouting."
              author="Example Collaborator"
              role="Engineering Lead"
              company="Pawprint Lab"
              relationship="Colleague"
              chipTone="blush"
              fullNote="This disclosure reveals the full unabridged quote in a clean left-ruled block without boxing it in another card."
            />
            <PullQuote
              quote="Reserving sticker borders for real media and CTAs immediately makes every interactive element easier to spot."
              author="Second Reviewer"
              role="Design Systems"
              company="Pawprint Lab"
              relationship="Client"
              chipTone="mint"
            />
          </div>
        </div>

        {/* Callout margin notes */}
        <div className="space-y-4 border-t border-line pt-6">
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            Callout (restyled margin note — 2px left rule, pastel highlight title, zero fill/shadow)
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Callout tone="butter" title="Margin note">
              <p>
                A restyled Callout uses a 2px left pen border and highlighted
                title pill instead of a heavy boxed card.
              </p>
            </Callout>
            <Callout tone="mint" title="No nested boxes">
              <p>
                Reads smoothly inside white, dark, warm-dark, and pastel chapter
                backgrounds while staying on the 4/8 grid.
              </p>
            </Callout>
          </div>
        </div>
      </div>

      {/* 10. Case Study Template Patterns (FeatureRow, DecisionList, Showcase, BrowserFrame, PainList, InsightList, Outcome, Learnings, CaseStepper) */}
      <div className="space-y-10 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <div className="border-b border-line pb-4">
          <h3 className="font-display text-h3 text-text">
            10 · Case Study Template Patterns
          </h3>
          <p className="mt-1 font-body text-caption text-text-muted">
            Home-style case study storytelling primitives: BrowserFrame, FeatureRow
            (left/right), DecisionList, Showcase (single &amp; gallery), PainList,
            InsightList, Outcome, Learnings, and inline CaseStepper pill.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            Floating chapter pill (inline preview)
          </p>
          <CaseStepper inline label="Case study chapters (component example)" />
        </div>

        <div className="border-t border-line pt-6">
          <FeatureRow
            eyebrow="FeatureRow · 7/5 split"
            title="Plain copy beside one framed surface."
            highlight="framed"
            highlightTone="lilac"
            body="Mirrors Home's CaseCard geometry with alternating media sides, a mono eyebrow, and optional labelled details."
            points={[
              { label: "Layout", text: "7/5 or 6/6 grid on desktop, stacked on mobile." },
              { label: "Rule 18", text: "Only the media window wears a pen border and sticker shadow." },
            ]}
            media={
              <BrowserFrame url="luci.pawprint.design" tone="lilac" padded>
                <div className="flex aspect-16/10 items-center justify-center bg-bg p-8 text-center">
                  <p className="font-display text-h4 text-text">
                    BrowserFrame (padded pastel mat + 3 pastel dots)
                  </p>
                </div>
              </BrowserFrame>
            }
            caption="BrowserFrame wraps screenshots or LoopVideo with consistent window chrome."
          />
        </div>

        <div className="border-t border-line pt-6">
          <DecisionList
            heading="DecisionList"
            intro="Plain rows with Problem, Decision, and Why columns split by 1px hairlines."
            items={[
              {
                title: "Alternating wavy chapter bands",
                problem: "Stacked grey boxes made case studies feel disconnected from the Home page.",
                decision: "Alternated bg and soft pastel bands joined by SectionSeam waves, each led by a quiet mono step label.",
                why: "Every case study now shares the exact rhythm and hierarchy of Home.",
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-line pt-6 lg:grid-cols-2">
          <PainList
            items={[
              {
                title: "PainList item",
                body: "Lists real user friction in plain hairline rows.",
              },
            ]}
          />
          <InsightList
            items={[
              {
                title: "InsightList item",
                body: "Lists verified findings in plain hairline rows.",
              },
            ]}
          />
        </div>

        <div className="border-t border-line pt-6">
          <Showcase
            title="Showcase (single frame)"
            caption="Large framed media block with caption, or 2–3 frame lightbox gallery."
            tone="sky"
          >
            <BrowserFrame url="classicdecoder.com" shadow="none">
              <div className="flex aspect-16/10 items-center justify-center bg-bg p-8 text-center">
                <p className="font-display text-h4 text-text">
                  Single-frame Showcase on a pastel mat
                </p>
              </div>
            </BrowserFrame>
          </Showcase>
        </div>

        <div className="border-t border-line pt-6">
          <CaseOutcome
            statement="Shipped and live with one consistent design language."
            shipped={[
              "Home-style CaseHero with inline breadcrumb and tilted cover stage",
              "Four alternating wavy chapters with floating lg+ chapter pill",
            ]}
            liveUrl="https://lucas.pawprint.design"
            liveLabel="Visit portfolio"
            tone="mint"
          />
          <CaseLearnings
            items={[
              "Hierarchy does the heavy lifting when cards get out of the way.",
              "Real screenshots and short loops prove craft better than claims.",
            ]}
          />
        </div>
      </div>

      {/* 11. Forms & Fields (Field, Input, Textarea) */}
      <div className="space-y-4 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
        <h3 className="font-display text-h3 text-text">
          11 · Forms &amp; Fields
        </h3>
        <p className="font-body text-caption text-text-muted">
          Field, Input (rounded &amp; pill, md 48px / lg 56px, default,
          pre-filled readOnly, invalid, disabled) and Textarea on the 4/8 grid.
        </p>

        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
          <Field
            htmlFor="lab-input-default"
            label="Your name"
            hint="Default editable field (md 48px)."
          >
            <Input
              id="lab-input-default"
              placeholder="Lucas (Wai Phyo Aung)"
              aria-describedby="lab-input-default-description"
            />
          </Field>

          <Field
            htmlFor="lab-input-readonly"
            label="Pre-filled read-only"
            hint="Read-only pill input (cannot be edited, selects on click)."
          >
            <Input
              id="lab-input-readonly"
              type="email"
              value="lucas@pawprint.design"
              readOnly
              shape="pill"
              aria-describedby="lab-input-readonly-description"
            />
          </Field>

          <Field
            htmlFor="lab-input-error"
            label="Email"
            required
            error="Please enter a valid email address."
          >
            <Input
              id="lab-input-error"
              type="email"
              defaultValue="not-an-email"
              invalid
              aria-describedby="lab-input-error-description"
            />
          </Field>

          <Field
            htmlFor="lab-input-disabled"
            label="Disabled"
            hint="Unavailable state."
          >
            <Input
              id="lab-input-disabled"
              value="Locked value"
              disabled
              aria-describedby="lab-input-disabled-description"
            />
          </Field>

          <Field
            htmlFor="lab-textarea"
            label="Project note"
            hint="Multi-line textarea matching Input tokens."
            className="md:col-span-2"
          >
            <Textarea
              id="lab-textarea"
              placeholder="Tell me about the role, team, and timeline…"
              aria-describedby="lab-textarea-description"
            />
          </Field>
        </div>
      </div>
    </section>
  );
}
