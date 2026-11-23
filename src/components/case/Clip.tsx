import { cn } from "@/lib/cn";

export interface ClipProps {
  src?: string;
  poster?: string;
  caption: string;
  className?: string;
}

export function Clip({ src, poster, caption, className }: ClipProps) {
  return (
    <figure
      className={cn(
        "my-6 overflow-hidden rounded-lg border-2 border-line-strong bg-surface shadow-sticker-sm",
        className
      )}
    >
      {src ? (
        <video
          src={src}
          poster={poster}
          muted
          playsInline
          controls
          preload="metadata"
          className="aspect-video w-full bg-bg object-cover"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-bg p-6 text-center font-mono text-caption text-text-muted">
          [Motion clip placeholder: {caption}]
        </div>
      )}
      <figcaption className="border-t border-line px-4 py-3 font-body text-caption text-text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
