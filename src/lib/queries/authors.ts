import { createClient } from "@/lib/supabase/server";

export type AuthorRow = {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  role: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  expertise: string[] | null;
};

export async function fetchAuthorBySlug(slug: string) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("authors")
    .select(
      "id, name, slug, bio, role, avatar_url, linkedin_url, twitter_url, website_url, expertise",
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return data as AuthorRow | null;
}

export async function fetchArticlesByAuthor(authorId: string) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      thumbnail_url,
      reading_time,
      published_at,
      category:categories ( name, slug )
    `,
    )
    .eq("status", "published")
    .eq("author_id", authorId)
    .order("published_at", { ascending: false });
  return data ?? [];
}
