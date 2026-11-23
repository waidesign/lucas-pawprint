"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { trackEvent } from "@/lib/analytics";
import { PRIMARY_NAV_ITEMS } from "@/content/site";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

export interface SiteNavProps {
  /** Override current path in /lab demos */
  activePathOverride?: string;
  /** Disable sticky positioning when rendered inside a /lab preview card */
  previewMode?: boolean;
  className?: string;
}

const HIDE_SCROLL_THRESHOLD = 120;

export function SiteNav({
  activePathOverride,
  previewMode = false,
  className,
}: SiteNavProps) {
  const pathname = usePathname();
  const currentPath = activePathOverride ?? pathname ?? "/";
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (previewMode) return;

    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollYRef.current;

      if (y > HIDE_SCROLL_THRESHOLD && y > prev + 8) {
        setHidden(true);
      } else if (y < prev - 8 || y <= HIDE_SCROLL_THRESHOLD) {
        setHidden(false);
      }

      lastScrollYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [previewMode]);

  return (
    <>
      <header
        style={{
          zIndex: previewMode ? undefined : "var(--z-nav)",
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-out-soft)",
        }}
        className={cn(
          "w-full border-b-2 border-line-strong bg-bg px-4 py-3 transition-transform md:px-10 lg:px-20",
          !previewMode && "sticky top-0",
          !previewMode && hidden && "-translate-y-full",
          className
        )}
      >
        <div className="flex w-full items-center justify-between gap-4">
          {/* Left: Wordmark */}
          <Wordmark />

          {/* Center: Pill nav (surface bg) — Work · Motion · About · Contact */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-pill border-2 border-line-strong bg-surface p-1 shadow-sticker-sm md:flex"
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive =
                currentPath === item.href ||
                (item.href !== "/" && currentPath.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-12 items-center rounded-pill px-5 font-body text-button transition-colors",
                    isActive
                      ? "bg-inverse-bg text-inverse-text"
                      : "text-text hover:bg-surface-2"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right (Desktop): ThemeSwitch (compact) + Resume */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeSwitch variant="compact" />
            <div onClick={() => trackEvent("resume_download", { location: "nav_desktop" })}>
              <Button
                variant="secondary"
                tone="lilac"
                size="md"
                href="/resume.pdf"
                external
              >
                Resume
              </Button>
            </div>
          </div>

          {/* Right (Mobile < md): Resume + ThemeSwitch (compact) + Menu IconButton */}
          <div className="flex items-center gap-2 md:hidden">
            <div onClick={() => trackEvent("resume_download", { location: "nav_mobile" })}>
              <Button
                variant="secondary"
                tone="lilac"
                size="md"
                href="/resume.pdf"
                external
                className="px-4"
              >
                Resume
              </Button>
            </div>
            <ThemeSwitch variant="compact" />
            <IconButton
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={currentPath}
      />
    </>
  );
}
