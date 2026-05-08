import { searchArticles } from "@/lib/queries/articles";
import { searchCategories } from "@/lib/queries/categories";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const [articles, categories] = await Promise.all([
    searchArticles(q),
    searchCategories(q),
  ]);
  return NextResponse.json({
    articles: articles.map((a) => ({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      category: a.category,
      is_comparison: a.is_comparison,
    })),
    categories: categories.map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
    })),
  });
}
