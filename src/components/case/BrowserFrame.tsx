import Image from "next/image";
import type { ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export interface BrowserFrameProps {
  /** Optional image path (without or with .webp/.avif extension) */
  src?: string;
  /** Accessible description for image or region */
  alt?: string;
  /** Optional intrinsic dimensions for raster image */
  width?: number;
  height?: number;
  /** Optional URL or window title shown in the browser bar */
  url?: string;
  /** Shadow level: "sticker" for main media, "sm" or "none" for secondary/gallery frames */
  shadow?: "none" | "sm" | "sticker";
  /** Optional pastel backdrop fill behind the frame (used only when padded is true) */
  tone?: Tone;
  /** Wrap inside a pastel padded mat like a hero stage */
  padded?: boolean;
  /** Render image with eager priority (above the fold) */
  priority?: boolean;
  /** Optional custom content (e.g. LoopVideo, diagram, custom preview) */
  children?: ReactNode;
  className?: string;
}

const SHADOW_CLASSES = {
  none: "",
  sm: "shadow-sticker-sm",
  sticker: "shadow-sticker",
} as const;

/**
 * BrowserFrame: flat portfolio browser window frame.
 * 2px pen border, rounded-xl, top chrome bar with three pastel dots (blush/butter/mint)
 * matching /case-studies/luci/hero.webp. Wraps a screenshot (<picture> AVIF+WebP) or LoopVideo.
 */
export function BrowserFrame({
  src,
  alt = "",
  width = 1440,
  height = 900,
  url,
  shadow = "sticker",
  tone,
  padded = false,
  priority = false,
  children,
  className,
}: BrowserFrameProps) {
  const isRasterWithExt = src && /\.(webp|avif|png|jpe?g)$/i.test(src);
  const isSvg = src && /\.svg$/i.test(src);
  const baseSrc = src ? src.replace(/\.(webp|avif|png|jpe?g)$/i, "") : "";
  const webpSrc = isSvg ? src : `${baseSrc}.webp`;
  const avifSrc = isSvg ? undefined : `${baseSrc}.avif`;

  const windowNode = (
    <div
      className={cn(
        "overflow-hidden rounded-xl border-2 border-line-strong bg-bg",
        !padded && SHADOW_CLASSES[shadow],
        !padded && className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex h-10 items-center gap-2 border-b-2 border-line-strong bg-surface px-4"
      >
        <span className="h-3 w-3 shrink-0 rounded-pill border border-line-strong bg-blush" />
        <span className="h-3 w-3 shrink-0 rounded-pill border border-line-strong bg-butter" />
        <span className="h-3 w-3 shrink-0 rounded-pill border border-line-strong bg-mint" />
        {url && (
          <span className="ml-2 truncate rounded-pill border border-line bg-bg px-3 py-0.5 font-mono text-caption text-text-muted">
            {url}
          </span>
        )}
      </div>

      <div className="relative bg-bg">
        {children ? (
          children
        ) : src ? (
          isSvg ? (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              unoptimized
              className="block h-auto w-full object-cover"
            />
          ) : (
            <picture>
              {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
              {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
              <img
                src={isRasterWithExt ? src : webpSrc}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full object-cover"
              />
            </picture>
          )
        ) : null}
      </div>
    </div>
  );

  if (padded && tone) {
    return (
      <div
        className={cn(
          "rounded-2xl border-2 border-line-strong p-4 md:p-6",
          TONE_BG_CLASSES[tone],
          SHADOW_CLASSES[shadow],
          className,
        )}
      >
        {windowNode}
      </div>
    );
  }

  return windowNode;
}
