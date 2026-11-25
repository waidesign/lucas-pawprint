"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { profile } from "@/content/site";
import {
  blobPath,
  EASE_IN_OUT,
  EASE_OUT_SOFT,
  LEAD_CLOSE,
  LEAD_OPEN,
  LEAD_PHASE_OFFSET,
  SHEET_CLOSE,
  SHEET_OPEN,
  WipeOutline,
} from "@/components/site/stickerWipe";

export interface HeaderMenuProps {
  open: boolean;
  onClose: () => void;
  currentPath?: string;
  /** The site header: stays on top of the menu and is part of the focus loop. */
  headerRef?: RefObject<HTMLElement | null>;
}

const MENU_ITEMS = [
  {
    label: "Work",
    href: "/work",
    tag: "01 · Case studies",
    toneClass: "bg-lilac text-on-pastel",
  },
  /* "Motion" (/motion) is parked for now; Home's #motion section covers it. */
  {
    label: "About",
    href: "/about",
    tag: "02 · Bio & changelog",
    toneClass: "bg-butter text-on-pastel",
  },
  {
    label: "Contact",
    href: "/contact",
    tag: "03 · Say hi!",
    toneClass: "bg-blush text-on-pastel",
  },
] as const;

const SOCIAL_ICON_PROPS = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-5 w-5",
} as const;

const SOCIALS: {
  label: string;
  href: string;
  external: boolean;
  hoverClass: string;
  icon: ReactNode;
}[] = [
  {
    label: "LinkedIn profile (opens in new tab)",
    href: profile.socials.linkedin,
    external: true,
    hoverClass: "hover:bg-lilac",
    icon: (
      <svg {...SOCIAL_ICON_PROPS}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub profile (opens in new tab)",
    href: profile.socials.github,
    external: true,
    hoverClass: "hover:bg-mint",
    icon: (
      <svg {...SOCIAL_ICON_PROPS}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Behance profile (opens in new tab)",
    href: profile.socials.behance,
    external: true,
    hoverClass: "hover:bg-sky",
    icon: (
      <svg {...SOCIAL_ICON_PROPS}>
        <path d="M3 8h4.5a2.5 2.5 0 0 1 0 5H3V8z" />
        <path d="M3 13h5a2.5 2.5 0 0 1 0 5H3v-5z" />
        <path d="M14 13.5a3.5 3.5 0 1 0 6.5 1.5h-7" />
        <path d="M15 8h4" />
      </svg>
    ),
  },
  {
    label: "Medium articles (opens in new tab)",
    href: profile.socials.medium,
    external: true,
    hoverClass: "hover:bg-butter",
    icon: (
      <svg {...SOCIAL_ICON_PROPS}>
        <ellipse cx="6" cy="12" rx="4" ry="7" />
        <ellipse cx="15" cy="12" rx="3" ry="6.5" />
        <ellipse cx="21" cy="12" rx="1" ry="5.5" />
      </svg>
    ),
  },
  {
    label: `Send email to ${profile.email}`,
    href: `mailto:${profile.email}`,
    external: false,
    hoverClass: "hover:bg-blush",
    icon: (
      <svg {...SOCIAL_ICON_PROPS}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

/* Two-layer "sticker cut" wipe (shared with page transitions, see ./stickerWipe). */

/* Nav links: each word rises out of its own mask, one after another. */
const LINK_VARIANTS = {
  hidden: (idx: number) => ({
    y: "110%",
    rotate: 4,
    transition: {
      duration: 0.24,
      ease: EASE_IN_OUT,
      delay: (MENU_ITEMS.length - 1 - idx) * 0.04,
    },
  }),
  shown: (idx: number) => ({
    y: "0%",
    rotate: 0,
    transition: {
      duration: 0.56,
      ease: EASE_OUT_SOFT,
      delay: 0.48 + idx * 0.08,
    },
  }),
};

const SOCIAL_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.16, ease: EASE_IN_OUT },
  },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE_OUT_SOFT, delay: 0.8 },
  },
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-page Header Menu (inspired by dontboardme.com, built with our tokens):
 * - A full-viewport page (`bg-bg`) under the real site header (which never moves; its
 *   toggle in the right button group morphs `=` → `X`).
 * - Open: a two-layer sticker-cut wipe from the top-right corner. A lilac lead layer
 *   sweeps in, the paper menu sheet follows 160ms later; both have a wavy, morphing,
 *   pen-outlined edge (800ms, ease-in-out). As the sheet passes the centre, each nav
 *   link slides up out of its own mask (80ms stagger) and the socials fade up.
 * - Close: links drop back into their masks (bottom link first), socials fade, the sheet
 *   retracts into the corner (uncovering the lilac), then the lilac follows (640ms each).
 * - Reduced motion: no mask or slides, a short fade only.
 * - Sentence-case display links with a pastel tag sticker on hover.
 * - Focus loops through header + menu; Escape closes; page scroll is locked and the
 *   content behind is made `inert`. WCAG 2.2 AA.
 */
export function HeaderMenu({
  open,
  onClose,
  currentPath,
  headerRef,
}: HeaderMenuProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  // Stays mounted through the close animation; unmounts once the blob is gone.
  const [rendered, setRendered] = useState(open);
  // True once fully open: the clip-path is dropped so scrolling stays cheap.
  const [settled, setSettled] = useState(false);
  const leadProgress = useMotionValue(0);
  const sheetProgress = useMotionValue(0);
  // Different phase offsets so the two outlined edges never line up.
  const leadD = useTransform(leadProgress, (p) => blobPath(p, LEAD_PHASE_OFFSET));
  const sheetD = useTransform(sheetProgress, (p) => blobPath(p));
  const uid = useId().replace(/:/g, "");
  const leadMaskId = `site-menu-lead-${uid}`;
  const sheetMaskId = `site-menu-sheet-${uid}`;

  // Mount on open (adjusting state while rendering, React's recommended pattern).
  if (open && !rendered) setRendered(true);
  // Closing: put the clip back on so a quick re-open grows from the corner again.
  if (!open && settled) setSettled(false);

  useEffect(() => {
    if (!rendered) return;
    if (prefersReduced) {
      leadProgress.set(open ? 1 : 0);
      sheetProgress.set(open ? 1 : 0);
      if (!open) {
        const t = window.setTimeout(() => setRendered(false), 120);
        return () => window.clearTimeout(t);
      }
      return;
    }
    if (open) {
      const lead = animate(leadProgress, 1, LEAD_OPEN);
      const sheet = animate(sheetProgress, 1, SHEET_OPEN);
      sheet.then(() => setSettled(true));
      return () => {
        lead.stop();
        sheet.stop();
      };
    }
    const sheet = animate(sheetProgress, 0, SHEET_CLOSE);
    const lead = animate(leadProgress, 0, LEAD_CLOSE);
    lead.then(() => {
      setRendered(false);
      setSettled(false);
    });
    return () => {
      sheet.stop();
      lead.stop();
    };
  }, [open, rendered, prefersReduced, leadProgress, sheetProgress]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Make the page content behind the menu inert (everything next to the header
    // and the menu itself, e.g. <main> and the footer).
    const header = headerRef?.current ?? null;
    const dialog = dialogRef.current;
    const siblings = Array.from(header?.parentElement?.children ?? []).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && el !== header && el !== dialog,
    );
    siblings.forEach((el) => el.setAttribute("inert", ""));

    const getFocusables = () => [
      ...Array.from(header?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ...Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
    ];

    // Start on the first menu link.
    dialog?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusables = getFocusables();
        if (focusables.length === 0) return;
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
      siblings.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, headerRef, rendered]);

  if (!rendered) return null;

  const phase = open ? "shown" : "hidden";
  // While the wipe runs: clip both layers and draw their pen outlines.
  const wiping = !prefersReduced && !(open && settled);
  const layerZ = { zIndex: "var(--z-overlay)" } as const;

  const outline = (d: typeof sheetD) => (
    <WipeOutline d={d} zIndex={layerZ.zIndex} />
  );

  return (
    <>
      {/* Clip paths (objectBoundingBox units, so they scale with the viewport) */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <clipPath id={leadMaskId} clipPathUnits="objectBoundingBox">
            <motion.path d={leadD} />
          </clipPath>
          <clipPath id={sheetMaskId} clipPathUnits="objectBoundingBox">
            <motion.path d={sheetD} />
          </clipPath>
        </defs>
      </svg>

      {/* Lilac lead layer + its outline (only while the wipe runs) */}
      {wiping && (
        <>
          <div
            aria-hidden="true"
            style={{ ...layerZ, clipPath: `url(#${leadMaskId})` }}
            className="pointer-events-none fixed inset-0 bg-lilac"
          />
          {outline(leadD)}
        </>
      )}

      <motion.div
        id="site-header-menu"
        ref={dialogRef}
        role="dialog"
        aria-label="Site navigation menu"
        aria-hidden={!open || undefined}
        style={{
          ...layerZ,
          // Clip only while the wipe runs; once fully open, drop it (cheap scrolling).
          clipPath: wiping ? `url(#${sheetMaskId})` : undefined,
        }}
        initial={prefersReduced ? { opacity: 0 } : false}
        animate={
          prefersReduced
            ? { opacity: open ? 1 : 0, transition: { duration: 0.12 } }
            : undefined
        }
        className="fixed inset-0 h-dvh overflow-y-auto bg-bg text-text"
      >
        {/* pt clears the sticky site header that stays on top of this page */}
        <div className="flex min-h-full flex-col items-center px-4 pb-10 pt-28 text-center md:px-10 md:pb-12 md:pt-32 lg:px-20">
          {/* Giant display navigation links (sentence case) */}
          <nav
            aria-label="Menu primary"
            className="flex w-full max-w-2xl flex-1 items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-2 md:gap-4">
              {MENU_ITEMS.map((item, idx) => {
                const isActive =
                  currentPath === item.href ||
                  Boolean(currentPath?.startsWith(`${item.href}/`));
                const isHovered = hoveredIdx === idx;

                return (
                  <li
                    key={item.href}
                    className="relative flex items-center justify-center"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={onClose}
                      className={cn(
                        "group relative inline-flex items-center gap-3 px-6 py-2 font-display text-4xl font-extrabold tracking-tight text-text transition-transform duration-200 hover:scale-105 active:scale-95 md:text-6xl lg:text-7xl",
                        idx % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1",
                        isActive &&
                          "underline decoration-lilac decoration-4 underline-offset-8",
                      )}
                    >
                      {/* Mask: the word slides up out of it (and back down on close) */}
                      <span className="inline-block overflow-hidden pb-2 -mb-2">
                        <motion.span
                          className="inline-block origin-bottom-left"
                          custom={idx}
                          variants={LINK_VARIANTS}
                          initial={prefersReduced ? false : "hidden"}
                          animate={prefersReduced ? undefined : phase}
                        >
                          {item.label}
                        </motion.span>
                      </span>

                      {/* Pastel tag sticker on hover (sentence case) */}
                      <motion.span
                        initial={false}
                        animate={
                          isHovered && open
                            ? {
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                rotate: idx % 2 === 0 ? 3 : -3,
                              }
                            : { opacity: 0, scale: 0.92, x: -8 }
                        }
                        transition={{ duration: 0.32, ease: EASE_OUT_SOFT }}
                        className={cn(
                          "pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-pill border-2 border-line-strong px-3 py-1 font-mono text-caption font-semibold shadow-sticker-sm md:inline-block",
                          item.toneClass,
                        )}
                      >
                        {item.tag}
                      </motion.span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Theme + Socials, pinned to the bottom of the full-page menu */}
          <motion.div
            variants={SOCIAL_VARIANTS}
            initial={prefersReduced ? false : "hidden"}
            animate={prefersReduced ? undefined : phase}
            className="mt-10 flex w-full flex-col items-center gap-6 border-t-2 border-line-strong/15 pt-8"
          >
            <div className="flex flex-col items-center gap-2 md:hidden">
              <p className="font-mono text-caption tracking-wider text-text-muted">
                Theme
              </p>
              <ThemeSwitch variant="segmented" />
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="font-mono text-caption tracking-wider text-text-muted">
                Connect &amp; socials
              </p>

              <ul className="flex flex-wrap items-center justify-center gap-3">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noreferrer noopener" : undefined}
                    aria-label={social.label}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text shadow-sticker-sm transition-all duration-200 hover:scale-110 hover:text-on-pastel active:scale-95",
                      social.hoverClass,
                    )}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
              </ul>
            </div>

            <p className="font-body text-caption text-text-muted">
              Curious by nature, careful by habit.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Pen outline on the paper sheet's edge (only while the wipe runs) */}
      {wiping && outline(sheetD)}
    </>
  );
}
