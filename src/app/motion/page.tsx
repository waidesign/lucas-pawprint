import type { Metadata } from "next";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MotionReel } from "@/components/sections/MotionReel";
import { ContactPanel } from "@/components/sections/ContactPanel";

export const metadata: Metadata = {
  title: "Motion · Lucas (Wai Phyo Aung)",
  description:
    "Product and interface motion design by Lucas (Wai Phyo Aung): showreel, Lottie micro-interactions, and After Effects studies.",
  alternates: {
    canonical: "https://lucas.pawprint.design/motion",
  },
  openGraph: {
    title: "Motion · Lucas (Wai Phyo Aung)",
    description:
      "Product and interface motion design by Lucas (Wai Phyo Aung): showreel, Lottie micro-interactions, and After Effects studies.",
    url: "https://lucas.pawprint.design/motion",
    type: "website",
    images: [
      {
        url: "https://lucas.pawprint.design/og/luci-teaser.png",
        width: 1200,
        height: 630,
        alt: "Motion design reel and studies by Lucas (Wai Phyo Aung).",
      },
    ],
  },
};

export default function MotionPage() {
  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <main id="main-content" className="flex-1">
        <MotionReel
          headingLevel="h1"
          className="mt-0 border-x-0 border-t-0 md:rounded-b-2xl"
        />
        <ContactPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
