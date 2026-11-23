import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/case-studies";
import { CaseLayout } from "@/components/case/CaseLayout";

export function generateStaticParams(): { slug: string }[] {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getCaseStudySlugs();
  if (!slugs.includes(slug)) {
    return {};
  }

  const { metadata } = await getCaseStudyBySlug(slug);

  return {
    title: metadata.seo.title,
    description: metadata.seo.description,
    alternates: {
      canonical: `https://lucas.pawprint.design/work/${metadata.slug}`,
    },
    openGraph: {
      title: metadata.seo.title,
      description: metadata.seo.description,
      url: `https://lucas.pawprint.design/work/${metadata.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getCaseStudySlugs();
  if (!slugs.includes(slug)) {
    notFound();
  }

  const [{ metadata, Content }, allCases] = await Promise.all([
    getCaseStudyBySlug(slug),
    getAllCaseStudies(),
  ]);

  const currentIdx = allCases.findIndex((c) => c.slug === slug);
  const nextCase =
    allCases.length > 1 && currentIdx !== -1
      ? allCases[(currentIdx + 1) % allCases.length]?.metadata
      : undefined;

  return (
    <CaseLayout
      metadata={metadata}
      nextCase={nextCase}
      renderDefaultHero={slug !== "luci"}
    >
      <Content />
    </CaseLayout>
  );
}
