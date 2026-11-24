"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
 * SiteNav Header:
 * - Left: Wordmark with ginger toe bean.
 * - Right: ThemeSwitch (compact) + Resume CTA + Menu toggle (`=` morphs to `X`).
 * - Menu: a full-page overlay that fades in *under* this header. The header itself stays
 *   put (raised above the menu, never hidden while open), so there is never a second header.
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
  const headerRef = useRef<HTMLElement | null>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
        ref={headerRef}
        style={{
          // While the menu is open the header sits above it (menu = --z-overlay).
          zIndex: previewMode
            ? undefined
            : menuOpen
              ? "var(--z-modal)"
              : "var(--z-nav)",
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-out-soft)",
        }}
        className={cn(
          "w-full border-b-2 border-line-strong bg-bg px-4 py-3 transition-transform md:px-10 lg:px-20",
          !previewMode && "sticky top-0",
          !previewMode && hidden && !menuOpen && "-translate-y-full",
          className,
        )}
      >
        <div className="flex w-full items-center justify-between gap-4">
          {/* Left: Wordmark */}
          <div className="flex items-center">
            <Wordmark />
          </div>

          {/* Right: ThemeSwitch (compact, md+) + Resume CTA + Menu toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeSwitch variant="compact" className="hidden md:inline-block" />
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
            <HeaderMenuButton
              open={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              ariaControls="site-header-menu"
            />
          </div>
        </div>
      </header>

      {/* Full-page menu, fading in under the header */}
      <HeaderMenu
        open={menuOpen}
        onClose={closeMenu}
        currentPath={currentPath}
        headerRef={headerRef}
      />
    </>
  );
}
