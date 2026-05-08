import { createClient } from "@/lib/supabase/server";

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  hero_title: string | null;
  seo_title: string | null;
  seo_description: string | null;
  icon: string | null;
  color: string | null;
  sort_order: number;
};

export async function fetchActiveCategories() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select(
      "id, name, slug, description, hero_title, seo_title, seo_description, icon, color, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []) as CategoryRow[];
}

export async function fetchCategoryBySlug(slug: string) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select(
      "id, name, slug, description, hero_title, seo_title, seo_description, icon, color, sort_order",
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return data as CategoryRow | null;
}

export async function searchCategories(q: string) {
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
  const [byName, byDesc] = await Promise.all([
    supabase
      .from("categories")
      .select(
        "id, name, slug, description, hero_title, seo_title, seo_description, icon, color, sort_order",
      )
      .eq("is_active", true)
      .ilike("name", pattern)
      .limit(20),
    supabase
      .from("categories")
      .select(
        "id, name, slug, description, hero_title, seo_title, seo_description, icon, color, sort_order",
      )
      .eq("is_active", true)
      .ilike("description", pattern)
      .limit(20),
  ]);
  const map = new Map<string, CategoryRow>();
  for (const row of [...(byName.data ?? []), ...(byDesc.data ?? [])] as CategoryRow[]) {
    map.set(row.id, row);
  }
  return [...map.values()].slice(0, 20);
}
