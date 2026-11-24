import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/case-studies";
import { CaseLayout } from "@/components/case/CaseLayout";
import { profile } from "@/content/site";

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
  const canonicalUrl = `https://lucas.pawprint.design/work/${metadata.slug}`;

  const ogImageUrl = `https://lucas.pawprint.design/og/${metadata.slug}.png`;

  const ogAlt =
    metadata.slug === "luci"
      ? `Loaffy in window form on lilac with "Luci · open source"`
      : `Loaffy in ${metadata.form} form on ${metadata.tone} with "${metadata.title}"`;

  return {
    title: metadata.seo.title,
    description: metadata.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metadata.seo.title,
      description: metadata.seo.description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.seo.title,
      description: metadata.seo.description,
      images: [ogImageUrl],
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

  const authorSchema = {
    "@type": "Person",
    name: "Wai Phyo Aung",
    alternateName: "Lucas",
    jobTitle: profile.title,
    email: profile.email,
    url: "https://lucas.pawprint.design",
  };

  const canonicalUrl = `https://lucas.pawprint.design/work/${metadata.slug}`;
  const ogImageUrl = `https://lucas.pawprint.design/og/${metadata.slug}.png`;

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: metadata.title,
    headline: metadata.seo.title,
    description: metadata.seo.description,
    url: canonicalUrl,
    image: ogImageUrl,
    dateCreated: metadata.year,
    author: authorSchema,
    keywords: metadata.tags.join(", "),
  };

  const softwareAppJsonLd =
    slug === "luci"
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Luci",
          url: "https://luci.pawprint.design",
          applicationCategory: "DesignApplication",
          operatingSystem: "Web, Chrome, Node.js",
          description: metadata.summary,
          author: authorSchema,
        }
      : null;

  return (
    <CaseLayout metadata={metadata} nextCase={nextCase}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            softwareAppJsonLd
              ? [creativeWorkJsonLd, softwareAppJsonLd]
              : creativeWorkJsonLd
          ),
        }}
      />
      <Content />
    </CaseLayout>
  );
}
