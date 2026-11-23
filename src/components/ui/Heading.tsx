import type { ComponentPropsWithoutRef } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type HeadingTag = "h1" | "h2" | "h3" | "h4";
export type HeadingSize =
  | "display-xl"
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

export type HeadingProps = {
  as?: HeadingTag;
  size?: HeadingSize;
  /** Single word or phrase to wrap in a pastel pill (max 1 per headline) */
  highlight?: string;
  highlightTone?: Tone;
  children: string;
} & Omit<ComponentPropsWithoutRef<"h1">, "children">;

const SIZE_CLASSES: Record<HeadingSize, string> = {
  "display-xl": "text-display-xl",
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

export function Heading({
  as: Tag = "h2",
  size,
  highlight,
  highlightTone = "lilac",
  className,
  children,
  ...props
}: HeadingProps) {
  const effectiveSize = size ?? Tag;

  if (
    process.env.NODE_ENV !== "production" &&
    highlight &&
    highlight.trim().split(/\s+/).length > 2
  ) {
    throw new Error(
      `[Heading] Only one highlighted word is allowed per headline (received "${highlight}").`
    );
  }

  const renderContent = () => {
    if (!highlight) return children;
    const idx = children.indexOf(highlight);
    if (idx === -1) return children;

    const before = children.slice(0, idx);
    const match = children.slice(idx, idx + highlight.length);
    const after = children.slice(idx + highlight.length);

    return (
      <>
        {before}
        <span
          className={cn(
            "inline rounded-xs px-2 box-decoration-clone",
            TONE_BG_CLASSES[highlightTone]
          )}
        >
          {match}
        </span>
        {after}
      </>
    );
  };

  return (
    <Tag
      className={cn(
        "font-display text-text text-balance",
        SIZE_CLASSES[effectiveSize],
        className
      )}
      {...props}
    >
      {renderContent()}
    </Tag>
  );
}
