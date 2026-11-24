"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { trackEvent } from "@/lib/analytics";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { Wordmark } from "./Wordmark";

export interface SiteNavProps {
  /** Override current path in /lab demos */
  activePathOverride?: string;
  /** Disable sticky positioning when rendered inside a /lab preview card */
  previewMode?: boolean;
  className?: string;
}

const HIDE_SCROLL_THRESHOLD = 120;

/**
 * SiteNav Header with intuitive & playful centered Menu Navigation inspired by dontboardme.com:
 * - Left: Wordmark with ginger toe bean.
 * - Center: Playful animated Menu toggle button (`=` morphs to `X`).
 * - Right: ThemeSwitch (compact) + Resume CTA.
 * - Overlay: Full-width organic scalloped cloud curtain with display typography and socials.
 */
export function SiteNav({
  activePathOverride,
  previewMode = false,
  className,
}: SiteNavProps) {
  const pathname = usePathname();
  const currentPath = activePathOverride ?? pathname ?? "/";
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        <div className="relative flex w-full items-center justify-between gap-4">
          {/* Left: Wordmark */}
          <div className="flex items-center">
            <Wordmark />
          </div>

          {/* Center: Playful Menu Toggle Button (inspired by dontboardme.com) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <HeaderMenuButton
              open={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              ariaControls="site-header-menu"
            />
          </div>

          {/* Right: ThemeSwitch (compact) + Resume CTA */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeSwitch variant="compact" />
            <div
              onClick={() =>
                trackEvent("resume_download", { location: "nav_desktop" })
              }
            >
              <Button
                variant="secondary"
                tone="lilac"
                size="md"
                href="/resume.pdf"
                external
                className="px-3 md:px-5"
              >
                Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Playful Scalloped Cloud Menu Curtain */}
      <HeaderMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPath={currentPath}
      />
    </>
  );
}
