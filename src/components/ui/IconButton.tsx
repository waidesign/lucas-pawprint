import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type IconButtonProps = {
  "aria-label": string;
  variant?: "primary" | "secondary" | "surface";
  tone?: Tone;
  href?: string;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "aria-label">;

export function IconButton({
  "aria-label": ariaLabel,
  variant = "surface",
  tone = "lilac",
  href,
  external = false,
  disabled = false,
  className,
  children,
  ...props
}: IconButtonProps) {
  const variantClasses = (() => {
    if (variant === "primary") {
      return "bg-inverse-bg text-inverse-text border-2 border-line-strong lp-btn-primary";
    }
    if (variant === "secondary") {
      return cn(
        TONE_BG_CLASSES[tone],
        "border-2 border-line-strong lp-sticker-sm-interactive"
      );
    }
    return "bg-surface text-text border-2 border-line-strong lp-sticker-sm-interactive hover:bg-surface-2";
  })();

  const sharedClasses = cn(
    "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-pill select-none",
    variantClasses,
    disabled && "opacity-50 pointer-events-none shadow-none",
    className
  );

  if (href && !disabled) {
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          aria-label={
            external ? `${ariaLabel} (opens in new tab)` : ariaLabel
          }
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={sharedClasses}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} aria-label={ariaLabel} className={sharedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={sharedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
