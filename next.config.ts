import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain files to out/, served by Cloudflare
  // Workers static assets (DEPLOY-CLOUDFLARE.md §1–2). No server at runtime.
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // cacheComponents / partialPrefetching removed: they enable PPR, which can't run in
  // export mode, and the site has no dynamic data for them to cache.
  // Dev only: let phones on the home network (192.168.x.x) use live reload.
  allowedDevOrigins: ["192.168.*.*"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  // Remark / Rehype plugins can be configured here
});

export default withMDX(nextConfig);
