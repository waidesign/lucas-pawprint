import type { ReactNode } from "react";
import { getCaseStudyBySlug } from "@/lib/case-studies";

export type CaseMode = "teaser" | "full";

/**
 * Server-side helper returning a case study's `visibility` mode ("teaser" | "full").
 * Resolved at build/render time so teaser builds never leak launch-only markup.
 */
export async function getCaseMode(slug = "luci"): Promise<CaseMode> {
  const { metadata } = await getCaseStudyBySlug(slug);
  return metadata.visibility;
}

export interface LaunchOnlyProps {
  /** Case study slug to check; defaults to `"luci"`. */
  slug?: string;
  /** Optional explicit override when parent already loaded `metadata.visibility`. */
  visibility?: CaseMode;
  children: ReactNode;
}

/**
 * Server Component that renders `children` ONLY when the case study's
 * `metadata.visibility === "full"`. Filters at render/build time (never CSS)
 * so teaser HTML contains zero launch-only markup.
 */
export async function LaunchOnly({
  slug = "luci",
  visibility,
  children,
}: LaunchOnlyProps) {
  const mode = visibility ?? (await getCaseMode(slug));
  if (mode !== "full") {
    return null;
  }
  return <>{children}</>;
}
