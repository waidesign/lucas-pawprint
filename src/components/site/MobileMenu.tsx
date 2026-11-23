"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { TextLink } from "@/components/ui/TextLink";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { Wordmark } from "./Wordmark";

export interface NavItem {
  label: string;
  href: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Motion", href: "/motion" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS: { label: string; href: string }[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/waiphyoaung-design",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/waiphyoaungdesign",
  },
  {
    label: "GitHub",
    href: "https://github.com/waidesign",
  },
  {
    label: "Medium",
    href: "https://medium.com/@waiphyoaung.design",
  },
];

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  currentPath?: string;
}

export function MobileMenu({ open, onClose, currentPath }: MobileMenuProps) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const sheet = sheetRef.current;
    const focusables = sheet?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile site navigation"
      style={{ zIndex: "var(--z-modal)" }}
      className="fixed inset-0 flex flex-col justify-between overflow-y-auto bg-bg p-6 text-text"
    >
      {/* Top row: Wordmark + Close button */}
      <div className="flex items-center justify-between border-b-2 border-line-strong pb-4">
        <div onClick={onClose}>
          <Wordmark />
        </div>
        <IconButton aria-label="Close navigation menu" onClick={onClose}>
          <X className="h-6 w-6" aria-hidden="true" />
        </IconButton>
      </div>

      {/* Center: Big display-size links */}
      <nav aria-label="Mobile primary" className="my-8">
        <ul className="space-y-4">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive =
              currentPath === item.href ||
              (item.href !== "/" && currentPath?.startsWith(`${item.href}/`));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={onClose}
                  className={cn(
                    "inline-flex min-h-14 items-center rounded-lg px-4 font-display text-display transition-colors",
                    isActive
                      ? "bg-lilac text-on-pastel border-2 border-line-strong shadow-sticker-sm"
                      : "text-text hover:bg-surface"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: Resume + ThemeSwitch + Socials */}
      <div className="space-y-6 border-t-2 border-line-strong pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="secondary"
            tone="lilac"
            size="lg"
            href="/resume.pdf"
            external
          >
            Resume
          </Button>
          <ThemeSwitch variant="segmented" />
        </div>

        <ul className="flex flex-wrap items-center gap-6">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}>
              <TextLink href={s.href} external tone="mint">
                {s.label}
              </TextLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
