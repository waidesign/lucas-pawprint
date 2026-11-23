import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabClient } from "./LabClient";

export const metadata: Metadata = {
  title: "Design System Lab · lucas.pawprint.design",
  description: "Development-only token, theme, typography and motion laboratory.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabPage() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ENABLE_LAB !== "true"
  ) {
    notFound();
  }

  return <LabClient />;
}
