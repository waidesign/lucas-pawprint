import { cn } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import type { MDXComponents } from "mdx/types";
import { CaseLayout } from "@/components/case/CaseLayout";
import { CaseHero } from "@/components/case/CaseHero";
import { Chapter } from "@/components/case/Chapter";
import { CaseStepper } from "@/components/case/CaseStepper";
import { BeanStepper } from "@/components/ui/BeanStepper";
import { MetaRow } from "@/components/case/MetaRow";
import { TLDR } from "@/components/case/TLDR";
import { NextCase } from "@/components/case/NextCase";
import { LaunchOnly } from "@/components/case/LaunchOnly";
import { DecisionCard } from "@/components/case/DecisionCard";
import { Callout } from "@/components/case/Callout";
import { ImageGallery } from "@/components/case/ImageGallery";
import { Clip } from "@/components/case/Clip";
import { BetaBadge } from "@/components/case/BetaBadge";
import { LuciHero } from "@/components/case/luci/LuciHero";
import { ProblemDiagram } from "@/components/case/luci/ProblemDiagram";
import { AudienceCards } from "@/components/case/luci/AudienceCards";
import { PrincipleCards } from "@/components/case/luci/PrincipleCards";
import { AnnotatedExport } from "@/components/case/luci/AnnotatedExport";
import { A11yFindings } from "@/components/case/luci/A11yFindings";
import { CaptureFlow } from "@/components/case/luci/CaptureFlow";
import { Outcome } from "@/components/case/luci/Outcome";
import { Learnings } from "@/components/case/luci/Learnings";
import { CaseCTA } from "@/components/case/luci/CaseCTA";
import { ToolbarAnatomy } from "@/components/case/luci/ToolbarAnatomy";
import { HowSteps } from "@/components/case/luci/HowSteps";
import { ArchitectureDiagram } from "@/components/case/luci/ArchitectureDiagram";
import { FeedbackBeforeAfter } from "@/components/case/luci/FeedbackBeforeAfter";
import { BrandBoard } from "@/components/case/luci/BrandBoard";
import { BuildTimeline } from "@/components/case/luci/BuildTimeline";

const components: MDXComponents = {
  CaseLayout,
  CaseHero,
  Chapter,
  CaseStepper,
  BeanStepper,
  MetaRow,
  TLDR,
  NextCase,
  LaunchOnly,
  DecisionCard,
  Callout,
  ImageGallery,
  Clip,
  BetaBadge,
  LuciHero,
  ProblemDiagram,
  AudienceCards,
  PrincipleCards,
  AnnotatedExport,
  A11yFindings,
  CaptureFlow,
  Outcome,
  Learnings,
  CaseCTA,
  ToolbarAnatomy,
  HowSteps,
  ArchitectureDiagram,
  FeedbackBeforeAfter,
  BrandBoard,
  BuildTimeline,
  h1: ({ children, ...props }) => (
    <h1
      className={cn(
        "font-display text-text text-balance",
        HEADING_SCALE_CLASSES.h1,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className={cn(
        "mt-10 font-display text-text text-balance",
        HEADING_SCALE_CLASSES.h2,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className={cn(
        "mt-8 font-display text-text text-balance",
        HEADING_SCALE_CLASSES.h3,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mt-4 max-w-[var(--prose-max)] text-body text-current"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-current underline decoration-2 underline-offset-4 transition-colors duration-200"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mt-4 max-w-[var(--prose-max)] list-disc space-y-2 pl-6 text-body text-current"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-4 max-w-[var(--prose-max)] list-decimal space-y-2 pl-6 text-body text-current"
      {...props}
    >
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 max-w-[var(--prose-max)] border-l-2 border-line-strong pl-4 italic text-text-muted"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded-xs bg-surface-2 px-2 py-1 font-mono text-caption text-text"
      {...props}
    >
      {children}
    </code>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
