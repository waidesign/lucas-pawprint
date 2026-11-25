import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn, type Tone } from "@/lib/cn";

export type TextLinkProps = {
  href: string;
  external?: boolean;
  tone?: Tone;
  iconEnd?: ReactNode;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

const TONE_HIGHLIGHT_VAR: Record<Tone, string> = {
  lilac: "var(--color-lilac)",
  mint: "var(--color-mint)",
  butter: "var(--color-butter)",
  sky: "var(--color-sky)",
  blush: "var(--color-blush)",
  pistachio: "var(--color-pistachio)",
};

export function TextLink({
  href,
  external = false,
  tone = "lilac",
  iconEnd,
  className,
  children,
  ...props
}: TextLinkProps) {
  const isExternalUrl =
    external ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.endsWith(".pdf");

  const sharedClasses = cn(
    // Pill highlight (one shape for every text link). 12px side padding keeps the round
    // ends clear of the text; the matching negative margin keeps the text aligned.
    "group relative isolate inline-flex items-center gap-1 rounded-pill px-3 -mx-3 font-body font-medium text-text underline decoration-1 underline-offset-4 transition-all hover:decoration-2 hover:text-on-pastel",
    className
  );

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 rounded-[inherit] transition-transform group-hover:scale-x-100 group-focus-visible:scale-x-100"
        style={{
          backgroundColor: TONE_HIGHLIGHT_VAR[tone],
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-out-soft)",
        }}
      />
      <span>{children}</span>
      {iconEnd && (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center transition-transform group-hover:translate-x-0.5"
          style={{
            transitionDuration: "var(--duration-fast)",
            transitionTimingFunction: "var(--ease-out-soft)",
          }}
        >
          {iconEnd}
        </span>
      )}
      {external && (
        <>
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{
              transitionDuration: "var(--duration-fast)",
              transitionTimingFunction: "var(--ease-out-soft)",
            }}
          >
            <ArrowUpRight className="h-[1em] w-[1em] shrink-0" aria-hidden="true" />
          </span>
          <span className="sr-only"> (opens in new tab)</span>
        </>
      )}
    </>
  );

  if (isExternalUrl) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={sharedClasses}
        {...props}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClasses} {...props}>
      {inner}
    </Link>
  );
}
