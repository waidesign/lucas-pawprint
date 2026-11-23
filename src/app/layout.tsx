import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { THEME_INIT_SCRIPT, ThemeProvider } from "@/lib/theme";
import { PawCursorProvider } from "@/components/mascot/PawCursorProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { SkipLink } from "@/components/site/SkipLink";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas (Wai Phyo Aung) · Product & Motion Designer",
  description:
    "Curious by nature, careful by habit. Product & Motion Designer portfolio at lucas.pawprint.design.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_INIT_SCRIPT,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text font-body">
        <ThemeProvider>
          <PawCursorProvider>
            <ToastProvider>
              <SkipLink />
              {children}
            </ToastProvider>
          </PawCursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
