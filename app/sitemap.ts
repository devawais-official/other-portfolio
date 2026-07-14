import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { projects } from "@/lib/data/projects";
import { blogPosts } from "@/lib/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/testimonials",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${siteConfig.url}/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
