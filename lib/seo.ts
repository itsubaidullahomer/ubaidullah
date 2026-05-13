import type { Metadata } from "next";
import { site } from "@/content/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

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
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`;
  const ogImage = image ?? `${SITE_URL}/api/og?title=${encodeURIComponent(title ?? site.name)}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: keywords ?? [...site.keywords],
    authors: [{ name: site.name, url: SITE_URL }],
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
      creator: `@${site.handle}`,
    },
  };
}

export const siteUrl = SITE_URL;
