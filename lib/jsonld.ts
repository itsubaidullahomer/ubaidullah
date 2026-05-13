import { site } from "@/content/site";
import { siteUrl } from "./seo";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.handle,
    url: siteUrl,
    image: `${siteUrl}/portrait.png`,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressCountry: "PK", addressLocality: site.location },
    worksFor: { "@type": "Organization", name: "Tututor.ai", url: "https://tututor.ai" },
    knowsAbout: site.keywords,
    sameAs: Object.values(site.socials).map((s) => s.url),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    description: site.description,
    inLanguage: "en",
    author: { "@type": "Person", name: site.name, url: siteUrl },
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
      item: new URL(item.path, siteUrl).toString(),
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
    author: { "@type": "Person", name: site.name, url: siteUrl },
    publisher: { "@type": "Person", name: site.name, url: siteUrl },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/writing/${p.slug}` },
  };
}

export function caseStudyJsonLd(p: { title: string; description: string; slug: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.description,
    image: p.image ?? `${siteUrl}/api/og?title=${encodeURIComponent(p.title)}`,
    url: `${siteUrl}/work/${p.slug}`,
    creator: { "@type": "Person", name: site.name, url: siteUrl },
  };
}
