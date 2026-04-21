import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lumousui.com";

const routes = [
  "/",
  "/components",
  "/templates",
  "/pricing",
  "/waitlist",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
