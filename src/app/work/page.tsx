import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ContactPanel } from "@/components/sections/ContactPanel";

export const metadata: Metadata = {
  title: "Work · Lucas (Wai Phyo Aung)",
  description:
    "Selected product and motion design work by Lucas (Wai Phyo Aung): Luci (my own product) and 6 shipped web, app, and design system case studies.",
  alternates: {
    canonical: "https://lucas.pawprint.design/work",
  },
  openGraph: {
    title: "Work · Lucas (Wai Phyo Aung)",
    description:
      "Selected product and motion design work by Lucas (Wai Phyo Aung): Luci (my own product) and 6 shipped web, app, and design system case studies.",
    url: "https://lucas.pawprint.design/work",
    type: "website",
    images: [
      {
        url: "https://lucas.pawprint.design/og/luci-teaser.png",
        width: 1200,
        height: 630,
        alt: "Work by Lucas (Wai Phyo Aung), featuring Luci.",
      },
    ],
  },
};

export default async function WorkIndexPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <SiteNav />
      <main id="main-content">
        <SelectedWork
          caseStudies={caseStudies}
          headingLevel="h1"
          syncUrlQuery
        />
        <ContactPanel />
      </main>
      <SiteFooter />
    </>
  );
}
