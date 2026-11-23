import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn, type Tone } from "@/lib/cn";

export type TextLinkProps = {
  href: string;
  external?: boolean;
  tone?: Tone;
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
    "group relative inline-flex items-baseline gap-1 rounded-xs px-1 -mx-1 font-body font-medium text-text underline decoration-1 underline-offset-4 transition-all hover:decoration-2 hover:text-on-pastel",
    className
  );

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 rounded-xs transition-transform group-hover:scale-x-100 group-focus-visible:scale-x-100"
        style={{
          backgroundColor: TONE_HIGHLIGHT_VAR[tone],
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-out-soft)",
        }}
      />
      <span>{children}</span>
      {external && (
        <>
          <span aria-hidden="true" className="inline-block leading-none">
            ↗
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
