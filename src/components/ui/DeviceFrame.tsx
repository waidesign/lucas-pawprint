import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type DeviceType = "laptop" | "phone" | "browser" | "none";

export interface DeviceFrameProps {
  device?: DeviceType;
  src?: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
  tone?: Tone;
  priority?: boolean;
  children?: ReactNode;
  className?: string;
}

export function DeviceFrame({
  device = "browser",
  src,
  alt,
  width = 1200,
  height = 750,
  tone = "sky",
  priority = false,
  children,
  className,
}: DeviceFrameProps) {
  const screenContent = src ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="block h-auto w-full object-cover"
    />
  ) : (
    <div
      role="img"
      aria-label={alt}
      className="flex min-h-48 w-full items-center justify-center bg-bg p-8 text-text"
    >
      {children}
    </div>
  );

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-line-strong p-6 shadow-sticker md:p-8",
        TONE_BG_CLASSES[tone],
        className
      )}
    >
      {device === "none" && (
        <div className="overflow-hidden rounded-md border-2 border-line-strong bg-bg">
          {screenContent}
        </div>
      )}

      {device === "browser" && (
        <div className="overflow-hidden rounded-md border-2 border-line-strong bg-bg">
          <div className="flex h-10 items-center gap-2 border-b-2 border-line-strong bg-surface px-4">
            <span className="h-3 w-3 rounded-pill border border-line-strong bg-blush" />
            <span className="h-3 w-3 rounded-pill border border-line-strong bg-butter" />
            <span className="h-3 w-3 rounded-pill border border-line-strong bg-mint" />
            <span className="ml-2 truncate rounded-pill border border-line bg-bg px-3 py-0.5 font-mono text-caption text-text-muted">
              lucas.pawprint.design
            </span>
          </div>
          {screenContent}
        </div>
      )}

      {device === "laptop" && (
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-t-md border-2 border-line-strong bg-bg">
            <div className="flex h-6 items-center justify-center border-b border-line bg-surface">
              <span className="h-2 w-2 rounded-pill border border-line-strong bg-surface-2" />
            </div>
            {screenContent}
          </div>
          <div className="-mx-4 h-4 rounded-b-md border-2 border-t-0 border-line-strong bg-surface" />
        </div>
      )}

      {device === "phone" && (
        <div className="mx-auto max-w-xs overflow-hidden rounded-lg border-2 border-line-strong bg-bg p-2">
          <div className="mx-auto mb-2 h-2 w-16 rounded-pill bg-line-strong" />
          <div className="overflow-hidden rounded-md border border-line">
            {screenContent}
          </div>
        </div>
      )}
    </div>
  );
}
