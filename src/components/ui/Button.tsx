import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  tone?: Tone;
} & ComponentPropsWithoutRef<"button">;

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-button",
  lg: "min-h-14 px-6 text-button",
};

export function Button({
  variant = "primary",
  size = "lg",
  href,
  external = false,
  iconStart,
  iconEnd,
  tone = "lilac",
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const variantClasses = (() => {
    if (variant === "primary") {
      return "bg-inverse-bg text-inverse-text border-2 border-transparent lp-btn-primary";
    }
    if (variant === "secondary") {
      return cn(
        TONE_BG_CLASSES[tone],
        "border-2 border-line-strong lp-sticker-sm-interactive"
      );
    }
    // ghost
    return "bg-transparent text-text border-2 border-transparent underline decoration-1 hover:decoration-2 hover:bg-surface-2 underline-offset-4 transition-all";
  })();

  const sharedClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-body font-semibold select-none",
    SIZE_CLASSES[size],
    variantClasses,
    disabled && "opacity-50 pointer-events-none shadow-none",
    className
  );

  const content = (
    <>
      {iconStart && (
        <span className="inline-flex shrink-0 items-center" aria-hidden="true">
          {iconStart}
        </span>
      )}
      <span>{children}</span>
      {iconEnd && (
        <span className="inline-flex shrink-0 items-center" aria-hidden="true">
          {iconEnd}
        </span>
      )}
      {external && (
        <span className="inline-flex shrink-0 items-center" aria-hidden="true">
          <ArrowUpRight className="h-4 w-4 shrink-0" />
        </span>
      )}
    </>
  );

  if (href && !disabled) {
    if (external || href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf")) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={sharedClasses}
        >
          {content}
          {external && <span className="sr-only"> (opens in new tab)</span>}
        </a>
      );
    }

    return (
      <Link href={href} className={sharedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={sharedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
