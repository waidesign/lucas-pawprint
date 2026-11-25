import { HOW_I_ANIMATE, MOTION_IN_PRODUCT } from "@/content/motion";
import { profile } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { MotionPrincipleDemos } from "@/components/motion/MotionPrincipleDemos";

/**
 * MotionCraft (Home #motion). Replaces the showreel preview while `/motion` is parked.
 * Shows that Lucas knows the rules of motion, not just the tools:
 * 1. Header: h2 + intro + one primary link to Behance.
 * 2. Principles: six live demos on the site's real tokens (the only card group, rule 18).
 * 3. Plain two-column close: how I make it (ordered) · where it works in a product.
 */
export function MotionCraft() {
  return (
    <Section id="motion" labelledBy="motion-heading" tone="bg">
      <div className="space-y-16">
        {/* 1. Header */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="space-y-4">
            <Heading
              id="motion-heading"
              as="h2"
              highlight="explains"
              highlightTone="sky"
            >
              Motion that explains.
            </Heading>
            <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
              {profile.motionIntro} These are the rules I animate by. Press
              play on any of them.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={profile.socials.behance}
            external
            className="shrink-0"
          >
            See my motion work on Behance
          </Button>
        </div>

        {/* 2. Principles, each with a live demo */}
        <div>
          <h3 className="sr-only">Motion principles, with live demos</h3>
          <MotionPrincipleDemos />
        </div>

        {/* 3. How I make it · Where it works */}
        <div className="grid grid-cols-1 gap-16 border-t border-line pt-16 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-8">
            <Heading as="h3" highlight="make" highlightTone="sky">
              How I make it.
            </Heading>
            <ol className="border-t border-line">
              {HOW_I_ANIMATE.map((step) => (
                <li
                  key={step.id}
                  className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-b border-line py-6"
                >
                  <span
                    aria-hidden="true"
                    className="row-span-2 font-mono text-label text-text-muted"
                  >
                    {step.number}
                  </span>
                  <p className="font-body text-body-lg font-semibold text-text">
                    {step.title}
                  </p>
                  <p className="font-body text-body text-text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-8">
            <Heading as="h3" highlight="works" highlightTone="sky">
              Where it works.
            </Heading>
            <ul className="border-t border-line">
              {MOTION_IN_PRODUCT.map((use) => (
                <li
                  key={use.id}
                  className="space-y-1 border-b border-line py-6"
                >
                  <p className="font-body text-body-lg font-semibold text-text">
                    {use.title}
                  </p>
                  <p className="font-body text-body text-text-muted">
                    {use.body}
                  </p>
                  <p className="pt-1 font-mono text-caption text-text-muted">
                    e.g. {use.example}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
