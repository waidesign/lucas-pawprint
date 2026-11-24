"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { profile } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { Wordmark } from "./Wordmark";

export interface HeaderMenuProps {
  open: boolean;
  onClose: () => void;
  currentPath?: string;
}

const MENU_ITEMS = [
  {
    label: "Work",
    href: "/work",
    tag: "01 · Case studies",
    toneClass: "bg-lilac text-on-pastel",
  },
  {
    label: "Motion",
    href: "/#motion",
    tag: "02 · Showreel",
    toneClass: "bg-sky text-on-pastel",
  },
  {
    label: "About",
    href: "/#about",
    tag: "03 · Bio & Changelog",
    toneClass: "bg-butter text-on-pastel",
  },
  {
    label: "Contact",
    href: "/#contact",
    tag: "04 · Say hi!",
    toneClass: "bg-blush text-on-pastel",
  },
] as const;

/**
 * Intuitive, playful Header Menu Navigation inspired by dontboardme.com:
 * - Full-width organic scalloped cloud curtain sliding down with spring physics.
 * - Double-layered cartoon scalloped bottom rim with soft blush underlay peek.
 * - Massive display navigation typography with interactive sticker tags on hover.
 * - Centered circular social icon buttons (LinkedIn, GitHub, Behance, Medium, Email).
 * - Full keyboard trap, Escape dismissal, scroll locking, and WCAG 2.2 AA compliance.
 */
export function HeaderMenu({ open, onClose, currentPath }: HeaderMenuProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    // Focus the center close button or first item
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

  return (
    <AnimatePresence>
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation menu"
          style={{ zIndex: "var(--z-modal)" }}
          className="fixed inset-0 flex flex-col justify-between overflow-y-auto"
        >
          {/* Dimmed backdrop (click to dismiss) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/30 backdrop-blur-[2px]"
          />

          {/* Scalloped Cloud Menu Curtain */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { y: "-100%" }}
            animate={prefersReduced ? { opacity: 1 } : { y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { y: "-100%" }}
            transition={
              prefersReduced
                ? { duration: 0.16 }
                : {
                    type: "spring",
                    stiffness: 280,
                    damping: 26,
                    mass: 0.9,
                  }
            }
            className="relative z-10 flex w-full flex-col bg-bg text-text shadow-sticker"
          >
            {/* Header bar inside curtain */}
            <div className="flex w-full items-center justify-between border-b-2 border-line-strong px-4 py-3 md:px-10 lg:px-20">
              {/* Left: Wordmark */}
              <div onClick={onClose} className="cursor-pointer">
                <Wordmark />
              </div>

              {/* Center: Synchronized close button */}
              <HeaderMenuButton open={true} onClick={onClose} />

              {/* Right: ThemeSwitch + Resume */}
              <div className="flex items-center gap-2 md:gap-3">
                <ThemeSwitch variant="compact" />
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

            {/* Curtain Body: Main links + Socials */}
            <div className="flex w-full flex-col items-center justify-center px-4 pb-12 pt-8 text-center md:pb-16 md:pt-12">
              {/* Giant Display Navigation Links */}
              <nav aria-label="Menu primary" className="w-full max-w-2xl">
                <ul className="flex flex-col items-center gap-2 md:gap-4">
                  {MENU_ITEMS.map((item, idx) => {
                    const isActive =
                      currentPath === item.href ||
                      Boolean(currentPath?.startsWith(`${item.href}/`));
                    const isHovered = hoveredIdx === idx;

                    return (
                      <motion.li
                        key={item.href}
                        initial={
                          prefersReduced
                            ? false
                            : { opacity: 0, y: -16, scale: 0.92 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: prefersReduced ? 0 : 0.08 + idx * 0.04,
                          type: "spring",
                          stiffness: 340,
                          damping: 22,
                        }}
                        className="relative flex items-center justify-center"
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                      >
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          onClick={onClose}
                          className={cn(
                            "group relative inline-flex items-center gap-3 px-6 py-2 font-display text-4xl font-extrabold uppercase tracking-tight text-text transition-transform duration-200 hover:scale-105 active:scale-95 md:text-6xl lg:text-7xl",
                            idx % 2 === 0
                              ? "hover:-rotate-1"
                              : "hover:rotate-1",
                            isActive && "text-line-strong underline decoration-lilac decoration-4 underline-offset-8"
                          )}
                        >
                          <span>{item.label}</span>

                          {/* Playful sticker pill on hover */}
                          <motion.span
                            initial={false}
                            animate={
                              isHovered
                                ? {
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                    rotate: idx % 2 === 0 ? 3 : -3,
                                  }
                                : { opacity: 0, scale: 0.8, x: -8 }
                            }
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                            }}
                            className={cn(
                              "pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-pill border-2 border-line-strong px-3 py-1 font-mono text-xs font-bold uppercase shadow-sticker-sm md:inline-block",
                              item.toneClass
                            )}
                          >
                            {item.tag}
                          </motion.span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Social Channels Row (inspired by dontboardme.com round icons) */}
              <div className="mt-8 flex flex-col items-center gap-4 border-t-2 border-line-strong/15 pt-8 md:mt-10">
                <p className="font-mono text-caption uppercase tracking-wider text-text-muted">
                  Connect &amp; Socials
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {/* LinkedIn */}
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn profile (opens in new tab)"
                    className="flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text shadow-sticker-sm transition-all duration-200 hover:scale-110 hover:bg-lilac hover:text-on-pastel active:scale-95"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub profile (opens in new tab)"
                    className="flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text shadow-sticker-sm transition-all duration-200 hover:scale-110 hover:bg-mint hover:text-on-pastel active:scale-95"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>

                  {/* Behance */}
                  <a
                    href={profile.socials.behance}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Behance profile (opens in new tab)"
                    className="flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text shadow-sticker-sm transition-all duration-200 hover:scale-110 hover:bg-sky hover:text-on-pastel active:scale-95"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M3 8h4.5a2.5 2.5 0 0 1 0 5H3V8z" />
                      <path d="M3 13h5a2.5 2.5 0 0 1 0 5H3v-5z" />
                      <path d="M14 13.5a3.5 3.5 0 1 0 6.5 1.5h-7" />
                      <path d="M15 8h4" />
                    </svg>
                  </a>

                  {/* Medium */}
                  <a
                    href={profile.socials.medium}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Medium articles (opens in new tab)"
                    className="flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text shadow-sticker-sm transition-all duration-200 hover:scale-110 hover:bg-butter hover:text-on-pastel active:scale-95"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <ellipse cx="6" cy="12" rx="4" ry="7" />
                      <ellipse cx="15" cy="12" rx="3" ry="6.5" />
                      <ellipse cx="21" cy="12" rx="1" ry="5.5" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label={`Send email to ${profile.email}`}
                    className="flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text shadow-sticker-sm transition-all duration-200 hover:scale-110 hover:bg-blush hover:text-on-pastel active:scale-95"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>

                <p className="mt-2 font-body text-caption text-text-muted">
                  Curious by nature, careful by habit. · Phuket, Thailand · UTC+7
                </p>
              </div>
            </div>

            {/* Organic Scalloped Cloud Bottom Border (inspired by dontboardme.com) */}
            <div className="relative -mb-1 w-full overflow-hidden text-line-strong">
              <svg
                aria-hidden="true"
                viewBox="0 0 1440 84"
                preserveAspectRatio="none"
                className="h-12 w-full sm:h-16 md:h-20"
              >
                {/* Layer 1: Soft Blush Underlay (shifted down by 8px) */}
                <path
                  d="M0,0 L0,28 Q120,68 240,28 Q360,68 480,28 Q600,68 720,28 Q840,68 960,28 Q1080,68 1200,28 Q1320,68 1440,28 L1440,0 Z"
                  className="fill-blush-soft dark:fill-blush-soft/20"
                  transform="translate(0, 8)"
                />
                {/* Layer 2: Main Cloud Body with 2.5px Pen Outline */}
                <path
                  d="M0,0 L0,28 Q120,68 240,28 Q360,68 480,28 Q600,68 720,28 Q840,68 960,28 Q1080,68 1200,28 Q1320,68 1440,28 L1440,0 Z"
                  fill="var(--color-bg)"
                  stroke="currentColor"
                  strokeWidth={2.5}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
