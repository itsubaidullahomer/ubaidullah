import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { writingPosts } from "@/content/writing";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`,           lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${siteUrl}/work`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/writing`,    lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${siteUrl}/now`,        lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${siteUrl}/uses`,       lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/playground`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`,    lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const writingRoutes: MetadataRoute.Sitemap = writingPosts.map((p) => ({
    url: `${siteUrl}/writing/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
