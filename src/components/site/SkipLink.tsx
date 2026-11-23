import { cn } from "@/lib/cn";

export interface SkipLinkProps {
  targetId?: string;
  className?: string;
}

export function SkipLink({
  targetId = "main-content",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      style={{ zIndex: "var(--z-toast)" }}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:inline-flex focus:min-h-12 focus:items-center focus:rounded-pill focus:border-2 focus:border-line-strong focus:bg-butter focus:px-6 focus:font-body focus:text-button focus:text-on-pastel focus:shadow-sticker",
        className
      )}
    >
      Skip to content
    </a>
  );
}
