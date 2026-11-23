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
          loop
          playsInline
          controls
          preload="none"
          className="aspect-video w-full bg-bg object-cover"
        />
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-bg p-6 text-center font-mono text-caption text-text-muted">
          <span>[6–8s loop clip placeholder]</span>
          {poster && <span>Poster: {poster}</span>}
        </div>
      )}
      <figcaption className="border-t border-line px-4 py-3 font-body text-caption text-text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
