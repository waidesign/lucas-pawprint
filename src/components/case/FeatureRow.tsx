"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn, type Tone } from "@/lib/cn";
import { springCalm } from "@/lib/motion";
import { Heading } from "@/components/ui/Heading";

export interface FeaturePoint {
  label: string;
  text: string;
}

export interface FeatureRowProps {
  /** Optional small mono label above the heading (e.g. "Devtool", "Core flow").
   *  No numerals: feature rows are parallel, not steps. */
  eyebrow?: string;
  /** Feature title — rendered as h3 at h2 token (48px, Rule 17) */
  title: string;
  /** Optional single highlighted word inside `title` */
  highlight?: string;
  highlightTone?: Tone;
  /** Body copy (one or more paragraphs) */
  body?: ReactNode;
  /** Optional labelled key-value list under the body */
  points?: FeaturePoint[];
  /** Optional plain bullet list under the body */
  bullets?: string[];
  /** Framed media (BrowserFrame, DeviceFrame, LoopVideo, Showcase image, etc.) */
  media?: ReactNode;
  /** Optional caption rendered directly under the media */
  caption?: string;
  /** Put media on the right on lg+ (alternating rows mirror Home's CaseCard geometry) */
  reverse?: boolean;
  /** Column split ratio on lg+: "7/5" (7 media / 5 text) or "6/6" */
  split?: "6/6" | "7/5";
  /** Optional extra body/actions passed as MDX children when `media` prop is used */
  children?: ReactNode;
  className?: string;
}

/**
 * FeatureRow: the primary storytelling unit in case studies.
 * Mirrors Home's CaseCard geometry (6/6 or 7/5 split, media left/right alternating)
 * with plain typography beside one framed media element (AGENTS.md rule 18).
 */
export function FeatureRow({
  eyebrow,
  title,
  highlight,
  highlightTone = "lilac",
  body,
  points,
  bullets,
  media,
  caption,
  reverse = false,
  split = "7/5",
  children,
  className,
}: FeatureRowProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const mediaColClass = split === "7/5" ? "lg:col-span-7" : "lg:col-span-6";
  const textColClass = split === "7/5" ? "lg:col-span-5" : "lg:col-span-6";

  const mediaContent = media ?? null;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={prefersReduced ? { duration: 0 } : springCalm}
      className={cn(
        "grid grid-cols-1 items-center gap-8 py-8 md:gap-12 md:py-12 lg:grid-cols-12 lg:gap-16",
        className,
      )}
    >
      {/* Media column */}
      {mediaContent && (
        <figure className={cn("space-y-3", mediaColClass, reverse && "lg:order-2")}>
          <div
            className={cn(
              "transition-transform duration-300 ease-out hover:rotate-0 motion-reduce:rotate-0",
              reverse ? "rotate-[1.2deg]" : "-rotate-[1.2deg]",
            )}
          >
            {mediaContent}
          </div>
          {caption && (
            <figcaption className="font-body text-caption text-text-muted">
              {caption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Plain-on-canvas text column */}
      <div
        className={cn(
          "flex flex-col items-start gap-5",
          mediaContent ? textColClass : "lg:col-span-8",
          reverse && mediaContent && "lg:order-1",
        )}
      >
        {eyebrow && (
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            {eyebrow}
          </p>
        )}

        <Heading
          as="h3"
          highlight={highlight}
          highlightTone={highlightTone}
        >
          {title}
        </Heading>

        {body && (
          <div className="max-w-[var(--prose-max)] space-y-4 font-body text-body-lg text-text-muted">
            {typeof body === "string" ? <p>{body}</p> : body}
          </div>
        )}

        {children && (
          <div className="max-w-[var(--prose-max)] space-y-4 font-body text-body-lg text-text-muted">
            {children}
          </div>
        )}

        {points && points.length > 0 && (
          <dl className="w-full divide-y divide-line border-y border-line">
            {points.map((pt) => (
              <div
                key={pt.label}
                className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-12 sm:gap-4"
              >
                <dt className="font-mono text-label uppercase tracking-wider text-text sm:col-span-4">
                  {pt.label}
                </dt>
                <dd className="font-body text-body text-text-muted sm:col-span-8">
                  {pt.text}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {bullets && bullets.length > 0 && (
          <ul className="w-full divide-y divide-line border-t border-line font-body text-body text-text-muted">
            {bullets.map((item) => (
              <li key={item} className="py-3">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
