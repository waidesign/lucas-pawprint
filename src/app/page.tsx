import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";
import { profile } from "@/content/site";

export default async function HomePage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <main
      id="main-content"
      className="flex flex-1 items-center justify-center p-8"
    >
      <div className="rounded-lg border-2 border-line-strong bg-surface px-6 py-4 text-body text-text shadow-sticker-sm">
        <p className="font-display text-h4 text-text">{profile.name}</p>
        <p className="mt-2 text-body text-text-muted">
          Phase 4 content validated ({caseStudies.length} case studies, lead:{" "}
          <strong className="text-text">{caseStudies[0]?.metadata.title}</strong>
          ). Inspect tokens, Loaffy and components in{" "}
          <Link
            href="/lab"
            className="underline decoration-2 underline-offset-4 text-text"
          >
            /lab
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
