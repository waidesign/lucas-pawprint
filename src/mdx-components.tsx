import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 font-display text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 font-display text-xl font-medium tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-4 leading-7 text-foreground/90" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="font-medium text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/90" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-foreground/90"
      {...props}
    >
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 border-accent pl-4 italic text-muted"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded-sm bg-surface-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
