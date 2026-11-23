import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ComponentType } from "react";

export interface CaseStudyMetadata {
  title: string;
  summary: string;
  publishedAt?: string;
  role?: string;
  timeline?: string;
  tags?: string[];
  featured?: boolean;
  coverImage?: string;
  [key: string]: unknown;
}

export interface CaseStudySummary {
  slug: string;
  metadata: CaseStudyMetadata;
}

export interface CaseStudyModule {
  default: ComponentType;
  metadata?: CaseStudyMetadata;
}

const CASE_STUDIES_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "case-studies"
);

/**
 * Returns all `.mdx` slugs inside `src/content/case-studies` for static generation (`generateStaticParams`).
 */
export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Loads an MDX case study component and its metadata by slug.
 * Supports either `export const metadata = { ... }` in the `.mdx` file or YAML frontmatter.
 */
export async function getCaseStudyBySlug(slug: string): Promise<{
  slug: string;
  metadata: CaseStudyMetadata;
  Content: ComponentType;
}> {
  const mdxModule = (await import(
    `@/content/case-studies/${slug}.mdx`
  )) as CaseStudyModule;

  let metadata: CaseStudyMetadata = mdxModule.metadata ?? {
    title: slug,
    summary: "",
  };

  if (!mdxModule.metadata) {
    const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      if (data && Object.keys(data).length > 0) {
        metadata = {
          title: String(data.title ?? slug),
          summary: String(data.summary ?? ""),
          ...data,
        };
      }
    }
  }

  return {
    slug,
    metadata,
    Content: mdxModule.default,
  };
}

/**
 * Lists all case studies sorted by `publishedAt` descending (if provided).
 */
export async function getAllCaseStudies(): Promise<CaseStudySummary[]> {
  const slugs = getCaseStudySlugs();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await getCaseStudyBySlug(slug);
      return { slug, metadata };
    })
  );

  return entries.sort((a, b) => {
    const dateA = a.metadata.publishedAt ?? "";
    const dateB = b.metadata.publishedAt ?? "";
    return dateB.localeCompare(dateA);
  });
}
