import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Loaffy } from "@/components/mascot/Loaffy";
import { NotFoundTracker } from "@/components/site/NotFoundTracker";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "404 · Loaffy looked everywhere · Lucas (Wai Phyo Aung)",
  description: "This page isn't here. Maybe it never was.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <NotFoundTracker />
      <main id="main-content" className="flex flex-1 items-center">
        <Section
          id="not-found"
          labelledBy="not-found-heading"
          tone="bg"
          className="py-16 md:py-24"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                404 · Page not found
              </p>

              {/* Full-width h1 so display-xl (160px) fits comfortably without overflowing columns */}
              <Heading
                id="not-found-heading"
                as="h1"
                highlight="everywhere"
                highlightTone="lilac"
              >
                Loaffy looked everywhere.
              </Heading>
            </div>

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-8">
                <p className="max-w-xl font-body text-body-lg text-text-muted">
                  This page isn&apos;t here. Maybe it never was.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    href="/"
                    iconStart={<ArrowLeft className="h-5 w-5" />}
                  >
                    Back home
                  </Button>
                  <Button
                    variant="secondary"
                    tone="lilac"
                    size="lg"
                    href="/work"
                    iconEnd={<ArrowRight className="h-5 w-5" />}
                  >
                    See the work
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center lg:col-span-4">
                <Loaffy
                  form="lost"
                  mood="surprised"
                  size={240}
                  label="Loaffy looking around with scattered toe beans"
                />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
