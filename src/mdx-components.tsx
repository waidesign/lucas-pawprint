import type { MDXComponents } from "mdx/types";
import { Chapter } from "@/components/case/Chapter";
import { DecisionCard } from "@/components/case/DecisionCard";
import { Callout } from "@/components/case/Callout";
import { ImageGallery } from "@/components/case/ImageGallery";
import { Clip } from "@/components/case/Clip";
import { BetaBadge } from "@/components/case/BetaBadge";

const components: MDXComponents = {
  Chapter,
  DecisionCard,
  Callout,
  ImageGallery,
  Clip,
  BetaBadge,
  h1: ({ children, ...props }) => (
    <h1 className="font-display text-h1 text-text" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mt-10 font-display text-h2 text-text" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-8 font-display text-h3 text-text" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-4 text-body text-text" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-text underline decoration-2 underline-offset-4 transition-colors duration-200"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-body text-text" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-body text-text"
      {...props}
    >
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 border-line-strong pl-4 italic text-text-muted"
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
