import type { MetadataRoute } from "next";

// Static export: rendered once at build time into out/robots.txt.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/lab"] },
    sitemap: "https://lucas.pawprint.design/sitemap.xml",
    host: "https://lucas.pawprint.design",
  };
}
