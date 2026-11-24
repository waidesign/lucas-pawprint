import type { ComponentPropsWithoutRef } from "react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";

export type HeadingTag = "h1" | "h2" | "h3" | "h4";
export type HeadingSize = "display-xl" | "display" | "h1" | "h2" | "h3" | "h4";

export type HeadingProps = {
  as?: HeadingTag;
  size?: HeadingSize;
  /** Single word or phrase to wrap in a pastel pill (max 1 per headline) */
  highlight?: string;
  highlightTone?: Tone;
  children: string;
} & Omit<ComponentPropsWithoutRef<"h1">, "children">;

/**
 * The site's one heading scale: every tag level renders at exactly one size, on every
 * page. Callers pick the semantic tag (`as`); the size follows. Only `/lab` demos pass
 * an explicit `size`.
 *   h1 → display-xl (160px desktop) · h2 → h1 token (64px)
 *   h3 → h2 token (48px)            · h4 → h3 token (32px)
 * Hand-written heading tags must use the same classes (see HEADING_SCALE_CLASSES).
 */
export const HEADING_SCALE: Record<HeadingTag, HeadingSize> = {
  h1: "display-xl",
  h2: "h1",
  h3: "h2",
  h4: "h3",
};

const SIZE_CLASSES: Record<HeadingSize, string> = {
  "display-xl": "text-display-xl",
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

/** Size class per heading tag, for hand-written `<h3>`/`<h4>` elements. */
export const HEADING_SCALE_CLASSES: Record<HeadingTag, string> = {
  h1: SIZE_CLASSES[HEADING_SCALE.h1],
  h2: SIZE_CLASSES[HEADING_SCALE.h2],
  h3: SIZE_CLASSES[HEADING_SCALE.h3],
  h4: SIZE_CLASSES[HEADING_SCALE.h4],
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
  const effectiveSize = size ?? HEADING_SCALE[Tag];

  if (
    process.env.NODE_ENV !== "production" &&
    highlight &&
    highlight.trim().split(/\s+/).length > 2
  ) {
    throw new Error(
      `[Heading] Only one highlighted word is allowed per headline (received "${highlight}").`,
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
            TONE_BG_CLASSES[highlightTone],
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
        className,
      )}
      {...props}
    >
      {renderContent()}
    </Tag>
  );
}
