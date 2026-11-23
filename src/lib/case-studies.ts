import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import {
  caseStudyMetadataSchema,
  type CaseStudyMetadata,
} from "@/lib/schema";

export type { CaseStudyMetadata };

export interface CaseStudySummary {
  slug: string;
  metadata: CaseStudyMetadata;
}

export interface CaseStudyModule {
  default: ComponentType;
  metadata?: unknown;
}

const CASE_STUDIES_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "case-studies"
);

const BANNED_BODY_CLAIMS_REGEX =
  /\+\s*(?:150|180|200|300)\s*%|\b(?:150|180|200|300)%\s*(?:increase|uplift|sales|growth|surge)|\b(?:38|42|45|55|60|70|85)%\b/i;

const LUCI_BANNED_TERMS_REGEX = new RegExp(
  [
    "\\b(?:" +
      ["Hov" + "erify", "Site" + "peel", "Agen" + "tation", "G" + "AW", "Grap" + "hify"].join(
        "|"
      ) +
      ")\\b",
    "orch" + "estrat",
    "\\bpri" + "cing\\b",
    "%\\s*comp" + "lete",
  ].join("|"),
  "i"
);

/**
 * Returns all `.mdx` slugs inside `src/content/case-studies` (skipping `_template.mdx`).
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
 * Loads an MDX case study component and validates its `export const metadata` against `caseStudyMetadataSchema`
 * and checks the MDX body for banned unverified percentage claims (and CASE-LUCI.md §7 terms for `luci`).
 * Throws and fails the build if metadata or content is invalid.
 */
export async function getCaseStudyBySlug(slug: string): Promise<{
  slug: string;
  metadata: CaseStudyMetadata;
  Content: ComponentType;
}> {
  const mdxModule = (await import(
    `@/content/case-studies/${slug}.mdx`
  )) as CaseStudyModule;

  if (!mdxModule.metadata) {
    throw new Error(
      `[case-studies] Missing "export const metadata" in src/content/case-studies/${slug}.mdx.`
    );
  }

  const parsed = caseStudyMetadataSchema.safeParse(mdxModule.metadata);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(
      `[case-studies] Invalid metadata in src/content/case-studies/${slug}.mdx — ${issues}`
    );
  }

  if (parsed.data.slug !== slug) {
    throw new Error(
      `[case-studies] Metadata slug "${parsed.data.slug}" does not match filename "${slug}.mdx".`
    );
  }

  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    const rawMdx = fs.readFileSync(filePath, "utf8");
    const bannedMatch = rawMdx.match(BANNED_BODY_CLAIMS_REGEX);
    if (bannedMatch) {
      throw new Error(
        `[case-studies] Banned unverified percentage/metric "${bannedMatch[0]}" found in src/content/case-studies/${slug}.mdx.`
      );
    }

    if (slug === "luci") {
      const luciBannedMatch = rawMdx.match(LUCI_BANNED_TERMS_REGEX);
      if (luciBannedMatch) {
        throw new Error(
          `[case-studies] Forbidden term "${luciBannedMatch[0]}" (CASE-LUCI.md §7) found in src/content/case-studies/luci.mdx.`
        );
      }
    }
  }

  return {
    slug,
    metadata: parsed.data,
    Content: mdxModule.default,
  };
}

/**
 * Lists all case studies validated with Zod, skipping `status: "draft"` in production,
 * and sorted by `order` ascending (`Luci = 1` first).
 */
export async function getAllCaseStudies(): Promise<CaseStudySummary[]> {
  const slugs = getCaseStudySlugs();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await getCaseStudyBySlug(slug);
      return { slug, metadata };
    })
  );

  const isProd = process.env.NODE_ENV === "production";
  const visible = isProd
    ? entries.filter((e) => e.metadata.status !== "draft")
    : entries;

  return visible.sort((a, b) => a.metadata.order - b.metadata.order);
}
