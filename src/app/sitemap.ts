import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";

// Static export: rendered once at build time into out/sitemap.xml.
export const dynamic = "force-static";

const SITE_URL = "https://lucas.pawprint.design";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getAllCaseStudies();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/colophon`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const cases: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    changeFrequency: "monthly",
    priority: c.slug === "luci" ? 0.9 : 0.8,
  }));

  return [...pages, ...cases];
}
