import type { Metadata } from "next";
import { profile } from "@/content/site";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact · Lucas (Wai Phyo Aung)",
  description:
    "Get in touch with Lucas (Wai Phyo Aung): copy email, book a chat on Cal.com, and links across LinkedIn, Behance, GitHub, and Medium.",
  alternates: {
    canonical: "https://lucas.pawprint.design/contact",
  },
  openGraph: {
    title: "Contact · Lucas (Wai Phyo Aung)",
    description:
      "Get in touch with Lucas (Wai Phyo Aung): copy email, book a chat on Cal.com, and links across LinkedIn, Behance, GitHub, and Medium.",
    url: "https://lucas.pawprint.design/contact",
    type: "website",
    images: [
      {
        url: "https://lucas.pawprint.design/og/luci-teaser.png",
        width: 1200,
        height: 630,
        alt: "Contact Lucas (Wai Phyo Aung), Product & Motion Designer.",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <main id="main-content" className="flex-1">
        <Section
          id="contact-hero"
          labelledBy="contact-page-heading"
          tone="bg"
          className="py-16 md:py-20 lg:py-24"
        >
          <div className="space-y-4">
            <p className="font-mono text-label uppercase tracking-wider text-text-muted">
              {profile.name} · {profile.location} · {profile.timezone}
            </p>
            <Heading id="contact-page-heading" as="h1">
              Contact.
            </Heading>
          </div>
        </Section>

        <ContactPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
