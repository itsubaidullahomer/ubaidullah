import { site } from "@/content/site";
import { absoluteUrl, siteUrl } from "./seo";

const personId = `${siteUrl}/#person`;

/** Profiles that are the same person: every social link except email. */
const sameAs = Object.values(site.socials)
  .map((s) => s.url)
  .filter((url) => url.startsWith("https://"));

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    alternateName: "Ubaidullah",
    url: siteUrl,
    image: absoluteUrl(site.photo),
    jobTitle: site.role,
    description: site.description,
    worksFor: { "@type": "Organization", name: site.employer.name, url: site.employer.url },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    sameAs,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(p: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    image: p.image ?? `${siteUrl}/api/og?title=${encodeURIComponent(p.title)}`,
    datePublished: p.publishedTime,
    dateModified: p.modifiedTime ?? p.publishedTime,
    author: { "@type": "Person", "@id": personId, name: site.name, url: siteUrl },
    publisher: { "@type": "Person", "@id": personId, name: site.name, url: siteUrl },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/writing/${p.slug}`) },
  };
}

export function caseStudyJsonLd(p: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.description,
    image: p.image ?? `${siteUrl}/api/og?title=${encodeURIComponent(p.title)}`,
    url: absoluteUrl(`/work/${p.slug}`),
    creator: { "@type": "Person", "@id": personId, name: site.name, url: siteUrl },
  };
}
