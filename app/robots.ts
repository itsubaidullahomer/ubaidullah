import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Everything is crawlable, including /api/og, which serves the share images. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
