import { profile } from "@/content/site";
import { stagger } from "@/lib/motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { Heading, HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { VideoReel } from "@/components/ui/VideoReel";

const MOTION_CLIPS = [
  {
    title: "VIN Scanning & Verification Choreography",
    summary:
      "Lightweight Lottie scanning states created in After Effects for Classic Decoder so archive queries feel responsive and transparent.",
    tag: "Lottie · Product Feedback",
  },
  {
    title: "Interactive Customizer & Sticker Physics",
    summary:
      "Tactile 40ms-grid spring transitions and canvas feedback that guide users through multi-step customization without visual noise.",
    tag: "UI Motion · Design Systems",
  },
];

export interface MotionReelProps {
  headingLevel?: "h1" | "h2";
  className?: string;
}

/**
 * MotionReel section per COMPONENTS.md §D & DESIGN.md §1.4:
 * - Section colour: sky-soft.
 * - VideoReel + motion clips + Behance link.
 */
export function MotionReel({
  headingLevel = "h2",
  className,
}: MotionReelProps = {}) {
  return (
    <Section
      id="motion"
      labelledBy="motion-heading"
      tone="sky"
      soft
      className={cn(
        "-mt-[var(--border-pen)] border-y-2 border-line-strong",
        className,
      )}
    >
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Heading id="motion-heading" as={headingLevel}>
              Motion.
            </Heading>
            <p className="mt-2 max-w-xl font-body text-body-lg text-text-muted">
              {profile.motionIntro}
            </p>
          </div>

          <Button
            variant="secondary"
            tone="sky"
            size="md"
            href={profile.socials.behance}
            external
          >
            More on Behance
          </Button>
        </div>

        <FadeIn delay={0}>
          <VideoReel
            tone="sky"
            title="Lucas (Wai Phyo Aung) — Product & Motion Design Reel"
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {MOTION_CLIPS.map((clip, idx) => (
            <FadeIn key={clip.title} delay={(idx + 1) * stagger}>
              <Card tone="surface" className="h-full space-y-3">
                <span className="inline-block rounded-pill border border-line-strong bg-sky px-3 py-1 font-mono text-caption font-semibold text-on-pastel">
                  {clip.tag}
                </span>
                <h3
                  className={cn(
                    "font-display text-text",
                    HEADING_SCALE_CLASSES.h3,
                  )}
                >
                  {clip.title}
                </h3>
                <p className="font-body text-body text-text-muted">
                  {clip.summary}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
