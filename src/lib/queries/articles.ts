import { createClient } from "@/lib/supabase/server";

const articleSelect = `
  id,
  title,
  slug,
  excerpt,
  content,
  thumbnail_url,
  meta_title,
  meta_description,
  canonical_url,
  reading_time,
  published_at,
  updated_at,
  is_featured,
  is_comparison,
  affiliate_disclosure_required,
  article_type,
  category:categories ( id, name, slug ),
  author:authors ( id, name, slug, avatar_url )
`;

export type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  reading_time: number | null;
  published_at: string | null;
  updated_at: string;
  is_featured: boolean;
  is_comparison: boolean;
  affiliate_disclosure_required: boolean;
  article_type: string;
  category: { id: string; name: string; slug: string } | null;
  author: {
    id: string;
    name: string;
    slug: string;
    avatar_url: string | null;
  } | null;
};

function asArticle(row: unknown): ArticleRow {
  const o = row as Record<string, unknown>;
  const cat = o.category;
  const auth = o.author;
  return {
    ...(o as unknown as ArticleRow),
    category: Array.isArray(cat) ? (cat[0] as ArticleRow["category"]) ?? null : (cat as ArticleRow["category"]) ?? null,
    author: Array.isArray(auth) ? (auth[0] as ArticleRow["author"]) ?? null : (auth as ArticleRow["author"]) ?? null,
  };
}

function asArticles(rows: unknown): ArticleRow[] {
  if (!Array.isArray(rows)) return [];
  return rows.map(asArticle);
}

export async function fetchArticleBySlug(slug: string) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data ? asArticle(data) : null;
}

export async function fetchFeaturedComparisons(limit = 3) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .eq("is_comparison", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  return asArticles(data);
}

export async function fetchLatestInsights(limit = 10) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [] as ArticleRow[];
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  return asArticles(data);
}

export async function fetchArticlesGroupedByCategory(
  categorySlugs: string[],
  perCategory = 6,
) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {} as Record<string, ArticleRow[]>;
  }
  const supabase = await createClient();
  const { data: cats } = await supabase
    .from("categories")
    .select("id, slug")
    .eq("is_active", true)
    .in("slug", categorySlugs);

  if (!cats?.length) return {} as Record<string, ArticleRow[]>;

  const result: Record<string, ArticleRow[]> = {};
  await Promise.all(
    cats.map(async (cat) => {
      const { data } = await supabase
        .from("articles")
        .select(articleSelect)
        .eq("status", "published")
        .eq("category_id", cat.id)
        .order("published_at", { ascending: false })
        .limit(perCategory);
      result[cat.slug] = asArticles(data);
    }),
  );
  return result;
}

export async function fetchArticlesByCategory(
  categorySlug: string,
  limit = 24,
) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }
  const supabase = await createClient();
  const { data: cat } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .eq("is_active", true)
    .maybeSingle();
  if (!cat) return [];
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .eq("category_id", cat.id)
    .order("published_at", { ascending: false })
    .limit(limit);
  return asArticles(data);
}

export async function fetchCategoryFeaturedArticle(categorySlug: string) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }
  const supabase = await createClient();
  const { data: cat } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .maybeSingle();
  if (!cat) return null;
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .eq("category_id", cat.id)
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (data) return asArticle(data);
  const { data: fallback } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .eq("category_id", cat.id)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return fallback ? asArticle(fallback) : null;
}

export async function searchArticles(q: string, limit = 30) {
  if (
    !q.trim() ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }
  const safe = q.trim().replace(/%/g, "").slice(0, 80);
  if (!safe) return [];
  const pattern = `%${safe}%`;
  const supabase = await createClient();
  const [byTitle, byExcerpt, byContent] = await Promise.all([
    supabase
      .from("articles")
      .select(articleSelect)
      .eq("status", "published")
      .ilike("title", pattern)
      .limit(20),
    supabase
      .from("articles")
      .select(articleSelect)
      .eq("status", "published")
      .ilike("excerpt", pattern)
      .limit(20),
    supabase
      .from("articles")
      .select(articleSelect)
      .eq("status", "published")
      .ilike("content", pattern)
      .limit(15),
  ]);
  const map = new Map<string, ArticleRow>();
  for (const row of [
    ...asArticles(byTitle.data),
    ...asArticles(byExcerpt.data),
    ...asArticles(byContent.data),
  ]) {
    map.set(row.id, row);
  }
  return [...map.values()].slice(0, limit);
}

export async function fetchComparisonsForListing() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .eq("is_comparison", true)
    .order("published_at", { ascending: false });
  return asArticles(data);
}

export async function fetchRelatedArticles(articleId: string, limit = 4) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("related_articles")
    .select("related_article_id")
    .eq("article_id", articleId);
  const ids = links?.map((l) => l.related_article_id) ?? [];
  if (!ids.length) return [];
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .in("id", ids)
    .limit(limit);
  return asArticles(data);
}
