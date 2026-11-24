"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";

export interface GalleryImageItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageGalleryProps {
  images: GalleryImageItem[];
  className?: string;
}

/**
 * Responsive 1–3 image gallery with accessible lightbox zoom dialog:
 * - Captions, 2px pen border, solid sticker shadow.
 * - Full focus trap (Tab/Shift+Tab), Escape to close, Left/Right slide keys,
 *   body scroll lock, and focus restoration to the triggering thumbnail button.
 */
export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const isOpen = activeIdx !== null;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const getFocusables = () =>
      dialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

    getFocusables()?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveIdx(null);
        return;
      }

      if (e.key === "ArrowLeft" && images.length > 1) {
        e.preventDefault();
        setActiveIdx((cur) =>
          cur === null ? null : (cur - 1 + images.length) % images.length
        );
        return;
      }

      if (e.key === "ArrowRight" && images.length > 1) {
        e.preventDefault();
        setActiveIdx((cur) =>
          cur === null ? null : (cur + 1) % images.length
        );
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
  }, [isOpen, images.length]);

  const activeImage = activeIdx !== null ? images[activeIdx] : null;

  return (
    <>
      <div
        className={cn(
          "my-6 grid grid-cols-1 gap-6",
          images.length === 2 && "md:grid-cols-2",
          images.length >= 3 && "md:grid-cols-3",
          className
        )}
      >
        {images.map((img, idx) => (
          <figure
            key={img.src}
            className="overflow-hidden rounded-md border-2 border-line-strong bg-surface shadow-sticker-sm"
          >
            <button
              type="button"
              aria-label={`Zoom image: ${img.alt}`}
              onClick={() => setActiveIdx(idx)}
              className="group relative block min-h-12 w-full overflow-hidden bg-bg text-left"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={960}
                height={640}
                unoptimized
                className="block h-auto w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 inline-flex h-12 w-12 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text opacity-0 shadow-sticker-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <ZoomIn className="h-5 w-5" />
              </span>
            </button>
            {img.caption && (
              <figcaption className="border-t border-line px-4 py-3 font-body text-caption text-text-muted">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {activeImage && activeIdx !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          style={{ zIndex: "var(--z-modal)" }}
          className="fixed inset-0 flex items-center justify-center bg-bg p-4 md:p-8"
          onClick={() => setActiveIdx(null)}
        >
          <div
            className="relative max-h-full max-w-5xl overflow-auto rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
              <p className="font-body text-caption text-text-muted">
                {activeImage.caption ?? activeImage.alt}
              </p>
              <div className="flex items-center gap-2">
                {images.length > 1 && (
                  <>
                    <IconButton
                      aria-label="Previous image"
                      onClick={() =>
                        setActiveIdx(
                          (activeIdx - 1 + images.length) % images.length
                        )
                      }
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </IconButton>
                    <span className="font-mono text-caption text-text-muted">
                      {activeIdx + 1} / {images.length}
                    </span>
                    <IconButton
                      aria-label="Next image"
                      onClick={() =>
                        setActiveIdx((activeIdx + 1) % images.length)
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
              src={activeImage.src}
              alt={activeImage.alt}
              width={1440}
              height={960}
              unoptimized
              className="block h-auto max-h-[75dvh] w-full rounded-sm object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
