import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { letters } from "@/content/letters";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/letters`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/library`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/songs`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const letterRoutes: MetadataRoute.Sitemap = letters.map((letter) => ({
    url: `${baseUrl}/letters/${letter.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/library/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...letterRoutes, ...articleRoutes];
}
