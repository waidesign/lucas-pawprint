import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { homeFaqs, profile } from "@/content/site";
import { cn } from "@/lib/cn";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { Loaffy } from "@/components/mascot/Loaffy";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { BookChatButton } from "@/components/contact/BookChatButton";
import { TimezoneOverlap } from "@/components/contact/TimezoneOverlap";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Heading, HEADING_SCALE_CLASSES } from "@/components/ui/Heading";
import { IndexColumns, type IndexColumnItem } from "@/components/ui/IndexColumns";
import { RuledList, type RuledListItem } from "@/components/ui/RuledList";
import { Section } from "@/components/ui/Section";
import { SectionSeam } from "@/components/ui/SectionSeam";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Contact · Lucas (Wai Phyo Aung)",
  description:
    "Email Lucas (Wai Phyo Aung), book a 30-minute chat on Cal.com, check live Phuket time-zone overlap, or connect on LinkedIn.",
  alternates: {
    canonical: "https://lucas.pawprint.design/contact",
  },
  openGraph: {
    title: "Contact · Lucas (Wai Phyo Aung)",
    description:
      "Email Lucas (Wai Phyo Aung), book a 30-minute chat on Cal.com, check live Phuket time-zone overlap, or connect on LinkedIn.",
    url: "https://lucas.pawprint.design/contact",
    type: "website",
    images: [
      {
        url: "https://lucas.pawprint.design/og/site.png",
        width: 1200,
        height: 630,
        alt: "Loaffy the paw next to “Hi, I'm Lucas.” Product & Motion Designer.",
      },
    ],
  },
};

const FIRST_MESSAGE_ITEMS: RuledListItem[] = [
  {
    id: "msg-role",
    body: "The role and team",
  },
  {
    id: "msg-timezone",
    body: "Your time zone",
  },
  {
    id: "msg-timeline",
    body: "Timeline",
  },
  {
    id: "msg-link",
    body: "A link to the job post or project brief",
  },
];

const CONTACT_QUICK_ANSWERS = homeFaqs.filter((item) =>
  ["faq-timezone", "faq-start", "faq-work"].includes(item.id),
);

const ELSEWHERE_LINKS = [
  { label: "LinkedIn", href: profile.socials.linkedin, tone: "sky" as const },
  { label: "Behance", href: profile.socials.behance, tone: "mint" as const },
  { label: "GitHub", href: profile.socials.github, tone: "lilac" as const },
  { label: "Medium", href: profile.socials.medium, tone: "butter" as const },
  { label: "Resume (PDF)", href: "/resume.pdf", tone: "blush" as const },
] as const;

export default function ContactPage() {
  const waysItems: IndexColumnItem[] = [
    {
      id: "way-email",
      label: "01 · Email",
      title: "Email",
      body: <CopyEmail email={profile.email} />,
    },
    {
      id: "way-chat",
      label: "02 · Video call",
      title: "Book a 30-min chat",
      body: "Pick a slot directly on Cal.com.",
      actions: <BookChatButton href={profile.bookingUrl} />,
    },
    {
      id: "way-linkedin",
      label: "03 · Profile",
      title: "LinkedIn",
      body: "Send a message or browse my work history on LinkedIn.",
      actions: (
        <TextLink href={profile.socials.linkedin} external tone="lilac">
          Message on LinkedIn
        </TextLink>
      ),
    },
  ];

  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <SiteNav />
      <main id="main-content" className="flex-1">
        {/* 1. Hero (bg) — aligned with Home/Work display hierarchy & smooth entrance cascade */}
        <Section id="contact-hero" labelledBy="contact-page-heading" tone="bg">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <HeroReveal step={0} variant="heading">
                <Heading
                  id="contact-page-heading"
                  as="h1"
                  highlight="talk"
                  highlightTone="lilac"
                >
                  Let&apos;s talk.
                </Heading>
              </HeroReveal>

              <HeroReveal step={1} variant="body">
                <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                  Email me, book a 30-minute chat, or check live Phuket time-zone
                  overlap below.
                </p>
              </HeroReveal>

              <HeroReveal
                step={2}
                variant="body"
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <CopyEmail email={profile.email} />
                <BookChatButton href={profile.bookingUrl} />
              </HeroReveal>
            </div>

            <HeroReveal
              step={1}
              variant="mascot"
              className="hidden lg:col-span-4 lg:flex lg:justify-end"
            >
              <Loaffy
                form="paw"
                mood="curious"
                size={240}
                label="Loaffy looking curious beside the contact header"
              />
            </HeroReveal>
          </div>
        </Section>

        <SectionSeam from="bg" to="lilac" seed={89} />

        {/* 2. Three ways (lilac-soft band) */}
        <Section
          id="ways-to-reach"
          labelledBy="ways-heading"
          tone="lilac"
          soft
        >
          <div className="space-y-10">
            <Heading
              id="ways-heading"
              as="h2"
              highlight="ways"
              highlightTone="lilac"
            >
              Three ways to reach me.
            </Heading>
            <h3 className="sr-only">Direct channels</h3>

            <IndexColumns items={waysItems} columns={3} as="h4" />
          </div>
        </Section>

        <SectionSeam from="lilac" to="bg" seed={97} />

        {/* 3. Time zones (bg) */}
        <Section id="time-zones" labelledBy="time-zones-heading" tone="bg">
          <div className="space-y-8">
            <Heading
              id="time-zones-heading"
              as="h2"
              highlight="zones"
              highlightTone="mint"
            >
              Time zones.
            </Heading>

            <TimezoneOverlap />
          </div>
        </Section>

        <SectionSeam from="bg" to="butter" seed={101} />

        {/* 4. First message + Quick answers (butter-soft band) */}
        <Section
          id="first-message"
          labelledBy="first-message-heading"
          tone="butter"
          soft
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-8 lg:col-span-5">
              <Heading
                id="first-message-heading"
                as="h2"
                highlight="helps"
                highlightTone="butter"
              >
                What helps in a first message.
              </Heading>

              <RuledList items={FIRST_MESSAGE_ITEMS} compact />
            </div>

            <div className="space-y-8 lg:col-span-7">
              <Heading
                id="quick-answers-heading"
                as="h2"
                highlight="answers"
                highlightTone="sky"
              >
                Quick answers.
              </Heading>

              <div className="border-t-2 border-line-strong">
                {CONTACT_QUICK_ANSWERS.map((qa, idx) => (
                  <details
                    key={qa.id}
                    open={idx === 0}
                    className="group border-b border-line py-5"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-display text-h4 text-text [&::-webkit-details-marker]:hidden">
                      <span>{qa.question}</span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong bg-bg font-mono text-body text-text transition-transform duration-200 group-open:rotate-45 group-open:bg-butter group-open:text-on-pastel"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                      {qa.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <SectionSeam from="butter" to="bg" seed={103} />

        {/* 5. Elsewhere + Explore work (bg band) */}
        <section
          aria-labelledby="contact-elsewhere-heading"
          className="w-full bg-bg px-4 py-12 md:px-10 md:py-16 lg:px-20 lg:py-20"
        >
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-between gap-6 lg:col-span-6">
              <div className="space-y-4">
                <p
                  id="contact-elsewhere-heading"
                  className="font-mono text-label uppercase tracking-wider text-text-muted"
                >
                  Elsewhere
                </p>
                <p className="max-w-md font-display text-h3 text-text">
                  Find my work and writing around the web.
                </p>
              </div>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                {ELSEWHERE_LINKS.map((link) => (
                  <li key={link.label}>
                    <TextLink
                      href={link.href}
                      external
                      tone={link.tone}
                      className="text-body-lg"
                    >
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <Link
                href="/work"
                className="group flex h-full w-full flex-col justify-between gap-8 rounded-2xl border-2 border-transparent bg-inverse-bg p-6 text-inverse-text select-none lp-btn-primary-lg md:p-10"
              >
                <div className="space-y-4">
                  <span className="block font-mono text-label uppercase tracking-wider text-inverse-text/75">
                    Selected work
                  </span>
                  <h2
                    className={cn(
                      "font-display text-inverse-text text-balance",
                      HEADING_SCALE_CLASSES.h2,
                    )}
                  >
                    See what I&apos;ve shipped.
                  </h2>
                  <p className="max-w-xl font-body text-body-lg text-inverse-text/80">
                    Browse seven case studies before we chat.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 font-body text-button font-semibold text-inverse-text">
                  <span>Explore all work</span>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Final CTA: Interested? ([P2-A1]) */}
        <ContactPanel className="pt-0" />
      </main>
      <SiteFooter />
    </div>
  );
}
