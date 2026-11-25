import type { MetadataRoute } from "next";

// Static export: rendered once at build time into out/manifest.webmanifest.
export const dynamic = "force-static";

/** Web app manifest: home-screen name and Loaffy icons (scripts/build-icons.mjs). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lucas (Wai Phyo Aung) · Product & Motion Designer",
    short_name: "Lucas",
    description:
      "Curious by nature, careful by habit. Product & Motion Designer portfolio.",
    start_url: "/",
    display: "browser",
    background_color: "#F6F6F3",
    theme_color: "#F6F6F3",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
