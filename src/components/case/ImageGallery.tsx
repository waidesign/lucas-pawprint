"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";
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

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIdx]);

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
              className="group relative block w-full overflow-hidden bg-bg text-left"
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
                className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-pill border-2 border-line-strong bg-surface text-text opacity-0 shadow-sticker-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <ZoomIn className="h-4 w-4" />
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

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          style={{ zIndex: "var(--z-modal)" }}
          className="fixed inset-0 flex items-center justify-center bg-bg/95 p-4 md:p-8"
          onClick={() => setActiveIdx(null)}
        >
          <div
            className="relative max-h-full max-w-5xl overflow-auto rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="font-body text-caption text-text-muted">
                {activeImage.caption ?? activeImage.alt}
              </p>
              <IconButton
                aria-label="Close zoomed image"
                onClick={() => setActiveIdx(null)}
              >
                <X className="h-5 w-5" />
              </IconButton>
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
