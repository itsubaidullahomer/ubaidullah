import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * The one origin every canonical, og:url, sitemap entry and JSON-LD URL
 * uses: https, no www, no trailing slash. Deliberately not read from an
 * environment variable, so a preview or misconfigured env can never
 * publish a different canonical.
 */
export const siteUrl = site.url.replace(/\/+$/, "");

/** Absolute URL for a path. The home page is the bare origin; other paths never end in "/". */
export function absoluteUrl(path = "/") {
  const clean = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${siteUrl}${clean}`;
}

type BuildMetadata = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description = site.description,
  path = "/",
  image,
  keywords,
  type = "website",
  publishedTime,
}: BuildMetadata = {}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title ? `${title} – ${site.name}` : `${site.name} – ${site.role}`;
  const ogImage = image ?? `${siteUrl}/api/og?title=${encodeURIComponent(title ?? site.name)}`;

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords: keywords ?? [...site.keywords],
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    publisher: site.name,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
