import { createClient } from "@/lib/supabase/server";

export async function adminListArticles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "id, title, slug, status, is_featured, is_comparison, updated_at, category:categories(name)",
    )
    .order("updated_at", { ascending: false });
  return data ?? [];
}

export async function adminGetArticle(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
  return data;
}

export async function adminListCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function adminListAuthors() {
  const supabase = await createClient();
  const { data } = await supabase.from("authors").select("*").order("name", { ascending: true });
  return data ?? [];
}

export async function adminListNewsletter() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  return data ?? [];
}

export async function adminListContacts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  return data ?? [];
}

export async function adminListMedia() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  return data ?? [];
}

export async function adminDashboardCounts() {
  const supabase = await createClient();
  const [
    articles,
    published,
    drafts,
    subs,
    contacts,
    cats,
  ] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("id", { count: "exact", head: true }),
  ]);
  return {
    totalArticles: articles.count ?? 0,
    published: published.count ?? 0,
    drafts: drafts.count ?? 0,
    subscribers: subs.count ?? 0,
    contactMessages: contacts.count ?? 0,
    categories: cats.count ?? 0,
  };
}

export async function adminContentHealth() {
  const supabase = await createClient();
  const { data: draftList } = await supabase
    .from("articles")
    .select("id, title")
    .eq("status", "draft")
    .limit(10);
  const { data: noThumb } = await supabase
    .from("articles")
    .select("id, title")
    .eq("status", "published")
    .is("thumbnail_url", null)
    .limit(10);
  const { data: noMeta } = await supabase
    .from("articles")
    .select("id, title")
    .eq("status", "published")
    .is("meta_description", null)
    .limit(10);
  const { data: noCat } = await supabase
    .from("articles")
    .select("id, title")
    .is("category_id", null)
    .limit(10);
  return {
    drafts: draftList ?? [],
    missingThumb: noThumb ?? [],
    missingMeta: noMeta ?? [],
    missingCategory: noCat ?? [],
  };
}
