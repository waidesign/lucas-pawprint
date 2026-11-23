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
        "my-6 rounded-lg border-2 border-line-strong p-6 font-body text-body shadow-sticker-sm",
        TONE_BG_CLASSES[tone],
        className
      )}
    >
      {title && <p className="mb-2 font-display text-h4">{title}</p>}
      <div className="space-y-2">{children}</div>
    </aside>
  );
}
