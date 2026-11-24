import type { Metadata } from "next";
import { profile } from "@/content/site";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Loaffy } from "@/components/mascot/Loaffy";
import { BookChatButton } from "@/components/contact/BookChatButton";
import { TimezoneOverlap } from "@/components/contact/TimezoneOverlap";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Heading } from "@/components/ui/Heading";
import { IndexColumns, type IndexColumnItem } from "@/components/ui/IndexColumns";
import { RuledList, type RuledListItem } from "@/components/ui/RuledList";
import { Section } from "@/components/ui/Section";
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
        url: "https://lucas.pawprint.design/og/luci-teaser.png",
        width: 1200,
        height: 630,
        alt: "Contact Lucas (Wai Phyo Aung), Product & Motion Designer.",
      },
    ],
  },
};

const FIRST_MESSAGE_ITEMS: RuledListItem[] = [
  {
    id: "msg-role",
    marker: "01",
    body: "The role and team",
  },
  {
    id: "msg-timezone",
    marker: "02",
    body: "Your time zone",
  },
  {
    id: "msg-timeline",
    marker: "03",
    body: "Timeline",
  },
  {
    id: "msg-link",
    marker: "04",
    body: "A link to the job post",
  },
];

interface QuickAnswer {
  id: string;
  question: string;
  answer: string;
  isPlaceholder: boolean;
}

const QUICK_ANSWERS: QuickAnswer[] = [
  {
    id: "qa-reply-time",
    question: "How fast do you reply?",
    answer: "[e.g. within 1–2 working days]",
    isPlaceholder: true,
  },
];

const ELSEWHERE_LINKS = [
  { label: "Behance", href: profile.socials.behance, tone: "sky" as const },
  { label: "GitHub", href: profile.socials.github, tone: "lilac" as const },
  { label: "Medium", href: profile.socials.medium, tone: "mint" as const },
  { label: "Resume", href: "/resume.pdf", tone: "butter" as const },
] as const;

export default function ContactPage() {
  const isDev = process.env.NODE_ENV !== "production";
  const visibleAnswers = isDev
    ? QUICK_ANSWERS
    : QUICK_ANSWERS.filter((qa) => !qa.isPlaceholder);

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
        {/* 1. Hero (bg) */}
        <Section id="contact-hero" labelledBy="contact-page-heading" tone="bg">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                {profile.name} · {profile.location} · {profile.timezone}
              </p>
              <Heading id="contact-page-heading" as="h1">
                Let&apos;s talk.
              </Heading>
              <p className="max-w-[var(--prose-max)] font-body text-body-lg text-text-muted">
                Email me, book a 30-minute chat, or find me on LinkedIn.
              </p>
            </div>

            <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
              <Loaffy
                form="bubble"
                size={240}
                label="Loaffy in speech bubble form"
              />
            </div>
          </div>
        </Section>

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

        {/* 4. First message (+ Quick answers when non-placeholder) + 5. Elsewhere (bg) */}
        <Section
          id="first-message"
          labelledBy="first-message-heading"
          tone="bg"
          className="pt-0"
        >
          <div className="space-y-12">
            <div
              className={
                visibleAnswers.length > 0
                  ? "grid grid-cols-1 gap-12 lg:grid-cols-12"
                  : "max-w-[var(--prose-max)]"
              }
            >
              <div
                className={
                  visibleAnswers.length > 0
                    ? "space-y-8 lg:col-span-6"
                    : "space-y-8"
                }
              >
                <Heading
                  id="first-message-heading"
                  as="h2"
                  highlight="helps"
                  highlightTone="butter"
                >
                  What helps in a first message.
                </Heading>

                <RuledList items={FIRST_MESSAGE_ITEMS} ordered compact />
              </div>

              {visibleAnswers.length > 0 && (
                <div className="space-y-8 lg:col-span-6">
                  <Heading
                    id="quick-answers-heading"
                    as="h2"
                    highlight="answers"
                    highlightTone="sky"
                  >
                    Quick answers.
                  </Heading>

                  <div className="border-t-2 border-line-strong">
                    {visibleAnswers.map((qa) => (
                      <details
                        key={qa.id}
                        className="group border-b border-line py-5"
                      >
                        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-display text-h4 text-text [&::-webkit-details-marker]:hidden">
                          <span>{qa.question}</span>
                          <span
                            aria-hidden="true"
                            className="shrink-0 font-mono text-body text-text-muted transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <p className="mt-3 max-w-[var(--prose-max)] font-body text-body text-text-muted">
                          {qa.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Elsewhere under a hairline */}
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4 border-t border-line pt-10">
              <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                Elsewhere
              </p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
