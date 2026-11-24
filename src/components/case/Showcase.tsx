"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { BrowserFrame } from "@/components/case/BrowserFrame";

export interface ShowcaseItem {
  src: string;
  alt: string;
  caption?: string;
  /** Optional browser URL bar when frame="browser" */
  url?: string;
  /** Frame style for this item: "browser" | "phone" | "plain" (default "browser") */
  frame?: "browser" | "phone" | "plain";
  width?: number;
  height?: number;
}

export interface ShowcaseProps {
  /** Optional subheading above the showcase */
  title?: string;
  /** Optional description above the showcase */
  description?: string;
  /** Single-frame caption when rendering `children` */
  caption?: string;
  /** Optional pastel backdrop mat behind a single frame */
  tone?: Tone;
  /** Gallery of 2–3 framed screenshots (max one gallery per section, Rule 18) */
  items?: ShowcaseItem[];
  /** Single large framed media block (BrowserFrame, DeviceFrame, LoopVideo, etc.) */
  children?: ReactNode;
  className?: string;
}

function renderPicture(item: ShowcaseItem) {
  const isSvg = /\.svg$/i.test(item.src);
  const base = item.src.replace(/\.(webp|avif|png|jpe?g)$/i, "");
  const webp = isSvg ? item.src : `${base}.webp`;
  const avif = isSvg ? undefined : `${base}.avif`;

  if (isSvg) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width ?? 1200}
        height={item.height ?? 800}
        unoptimized
        className="block h-auto w-full object-cover"
      />
    );
  }

  return (
    <picture>
      {avif && <source srcSet={avif} type="image/avif" />}
      <source srcSet={webp} type="image/webp" />
      <img
        src={webp}
        alt={item.alt}
        width={item.width ?? 1200}
        height={item.height ?? 800}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full object-cover"
      />
    </picture>
  );
}

/**
 * Showcase: one large framed media block with caption, OR a 2–3 frame gallery
 * with accessible lightbox zoom (focus trap, Esc, Left/Right arrows).
 */
export function Showcase({
  title,
  description,
  caption,
  tone,
  items,
  children,
  className,
}: ShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const isOpen = activeIdx !== null;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const count = items?.length ?? 0;

  useEffect(() => {
    if (!isOpen || count === 0) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const getFocusables = () =>
      dialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

    getFocusables()?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveIdx(null);
        return;
      }
      if (e.key === "ArrowLeft" && count > 1) {
        e.preventDefault();
        setActiveIdx((cur) => (cur === null ? null : (cur - 1 + count) % count));
        return;
      }
      if (e.key === "ArrowRight" && count > 1) {
        e.preventDefault();
        setActiveIdx((cur) => (cur === null ? null : (cur + 1) % count));
        return;
      }
      if (e.key === "Tab") {
        const focusables = getFocusables();
        if (!focusables || focusables.length === 0) return;
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
  }, [isOpen, count]);

  const activeItem =
    items && activeIdx !== null ? (items[activeIdx] ?? null) : null;

  return (
    <div className={cn("my-10 space-y-6", className)}>
      {(title || description) && (
        <div className="max-w-[var(--prose-max)] space-y-3">
          {title && (
            <h3
              className={cn(
                "font-display text-text text-balance",
                HEADING_SCALE_CLASSES.h3,
              )}
            >
              {title}
            </h3>
          )}
          {description && (
            <p className="font-body text-body-lg text-text-muted">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Single large framed media block */}
      {children && (
        <figure className="space-y-3">
          {tone ? (
            <div
              className={cn(
                "rounded-2xl border-2 border-line-strong p-4 shadow-sticker md:p-8",
                TONE_BG_CLASSES[tone],
              )}
            >
              {children}
            </div>
          ) : (
            children
          )}
          {caption && (
            <figcaption className="font-body text-caption text-text-muted">
              {caption}
            </figcaption>
          )}
        </figure>
      )}

      {/* 2–3 frame gallery */}
      {items && items.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 gap-8",
            items.length === 2 && "md:grid-cols-2",
            items.length >= 3 && "md:grid-cols-3",
          )}
        >
          {items.map((item, idx) => {
            const frameType = item.frame ?? "browser";
            const imgButton = (
              <button
                type="button"
                aria-label={`Zoom image: ${item.alt}`}
                onClick={() => setActiveIdx(idx)}
                className="group relative block w-full overflow-hidden bg-bg text-left"
              >
                {renderPicture(item)}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 inline-flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-bg text-text opacity-0 shadow-sticker-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <ZoomIn className="h-5 w-5" />
                </span>
              </button>
            );

            return (
              <figure key={item.src} className="space-y-3">
                {frameType === "browser" ? (
                  <BrowserFrame url={item.url} shadow="none">
                    {imgButton}
                  </BrowserFrame>
                ) : frameType === "phone" ? (
                  <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border-2 border-line-strong bg-bg p-2">
                    <div
                      aria-hidden="true"
                      className="mx-auto mb-2 h-2 w-16 rounded-pill bg-line-strong"
                    />
                    <div className="overflow-hidden rounded-lg border border-line">
                      {imgButton}
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-xl border-2 border-line-strong bg-bg">
                    {imgButton}
                  </div>
                )}

                {item.caption && (
                  <figcaption className="font-body text-caption text-text-muted">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      )}

      {/* Lightbox modal */}
      {activeItem && activeIdx !== null && items && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.alt}
          style={{ zIndex: "var(--z-modal)" }}
          className="fixed inset-0 flex items-center justify-center bg-bg/95 p-4 md:p-8"
          onClick={() => setActiveIdx(null)}
        >
          <div
            className="relative max-h-full max-w-5xl overflow-auto rounded-xl border-2 border-line-strong bg-surface p-4 shadow-sticker"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
              <p className="font-body text-caption text-text-muted">
                {activeItem.caption ?? activeItem.alt}
              </p>
              <div className="flex items-center gap-2">
                {items.length > 1 && (
                  <>
                    <IconButton
                      aria-label="Previous image"
                      onClick={() =>
                        setActiveIdx((activeIdx - 1 + items.length) % items.length)
                      }
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </IconButton>
                    <span className="font-mono text-caption text-text-muted">
                      {activeIdx + 1} / {items.length}
                    </span>
                    <IconButton
                      aria-label="Next image"
                      onClick={() =>
                        setActiveIdx((activeIdx + 1) % items.length)
                      }
                    >
                      <ArrowRight className="h-5 w-5" />
                    </IconButton>
                  </>
                )}
                <IconButton
                  aria-label="Close zoomed image"
                  onClick={() => setActiveIdx(null)}
                >
                  <X className="h-5 w-5" />
                </IconButton>
              </div>
            </div>
            <Image
              src={
                /\.svg$/i.test(activeItem.src)
                  ? activeItem.src
                  : `${activeItem.src.replace(/\.(webp|avif|png|jpe?g)$/i, "")}.webp`
              }
              alt={activeItem.alt}
              width={activeItem.width ?? 1440}
              height={activeItem.height ?? 960}
              unoptimized
              className="block h-auto max-h-[75dvh] w-full rounded-md object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
