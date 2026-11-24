import type { ReactNode } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export interface CalloutProps {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({
  tone = "butter",
  title,
  children,
  className,
}: CalloutProps) {
  return (
    <aside
      className={cn(
        "my-6 border-l-2 border-line-strong pl-6 font-body text-body text-text",
        className,
      )}
    >
      {title && (
        <p className="mb-2 font-display text-h4 text-text">
          <span
            className={cn(
              "inline rounded-xs px-2 box-decoration-clone",
              TONE_BG_CLASSES[tone],
            )}
          >
            {title}
          </span>
        </p>
      )}
      <div className="max-w-[var(--prose-max)] space-y-2 text-text-muted">
        {children}
      </div>
    </aside>
  );
}
