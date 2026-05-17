import { fetchActiveCategories } from "@/lib/queries/categories";
import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sterlingpeak.uk";
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/comparisons",
    "/about",
    "/contact",
    "/search",
    "/editorial-policy",
    "/affiliate-disclosure",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticRoutes;
  }

  const supabase = await createClient();
  const [{ data: articles }, categories] = await Promise.all([
    supabase.from("articles").select("slug, updated_at").eq("status", "published"),
    fetchActiveCategories(),
  ]);

  const articleUrls: MetadataRoute.Sitemap =
    articles?.map((a) => ({
      url: `${base}/article/${a.slug}`,
      lastModified: new Date(a.updated_at ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) ?? [];

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const { data: authors } = await supabase
    .from("authors")
    .select("slug, updated_at")
    .eq("is_active", true);

  const authorUrls: MetadataRoute.Sitemap =
    authors?.map((a) => ({
      url: `${base}/authors/${a.slug}`,
      lastModified: new Date(a.updated_at ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })) ?? [];

  return [...staticRoutes, ...articleUrls, ...categoryUrls, ...authorUrls];
}
