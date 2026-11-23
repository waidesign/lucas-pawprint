import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="rounded-lg border-2 border-line-strong bg-surface px-6 py-4 text-body text-text shadow-sticker-sm">
        <p className="font-display text-h4 text-text">
          lucas.pawprint.design
        </p>
        <p className="mt-2 text-body text-text-muted">
          Phase 1 foundations aligned. Inspect tokens and themes in{" "}
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
