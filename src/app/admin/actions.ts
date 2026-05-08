"use server";

import { slugifyHeading } from "@/lib/markdown";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/");
}

export async function deleteArticleForm(formData: FormData) {
  const id = formData.get("id") as string;
  if (id) await deleteArticle(id);
}

export async function toggleArticleStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const newStatus = formData.get("new_status") as string;
  if (!id || !newStatus) return;
  const supabase = await createClient();
  const updates: Record<string, unknown> = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };
  if (newStatus === "published") {
    updates.published_at = new Date().toISOString();
  }
  await supabase.from("articles").update(updates).eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/");
}

export async function duplicateArticle(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  const supabase = await createClient();
  const { data: original } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
  if (!original) return;
  const { id: _id, created_at: _ca, updated_at: _ua, published_at: _pa, slug, ...rest } = original;
  await supabase.from("articles").insert({
    ...rest,
    slug: `${slug}-copy-${Date.now()}`,
    title: `${original.title} (Copy)`,
    status: "draft",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: null,
  });
  revalidatePath("/admin/articles");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id);
  revalidatePath("/admin/categories");
}

export async function deleteAuthor(id: string) {
  const supabase = await createClient();
  await supabase.from("authors").delete().eq("id", id);
  revalidatePath("/admin/authors");
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function saveArticle(formData: FormData) {
  const supabase = await createClient();
  const id = (formData.get("id") as string) || "";
  const title = (formData.get("title") as string)?.trim() ?? "";
  const slugRaw = (formData.get("slug") as string)?.trim();
  let slug = slugRaw || slugifyHeading(title);
  if (!slug) slug = `article-${Date.now()}`;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = (formData.get("content") as string) ?? "";
  const category_id = (formData.get("category_id") as string) || null;
  const author_id = (formData.get("author_id") as string) || null;
  const thumbnail_url = (formData.get("thumbnail_url") as string) || null;
  const meta_title = (formData.get("meta_title") as string) || null;
  const meta_description = (formData.get("meta_description") as string) || null;
  const canonical_url = (formData.get("canonical_url") as string) || null;
  const status = (formData.get("status") as string) === "published" ? "published" : "draft";
  const article_type = (formData.get("article_type") as string) || "guide";
  const is_featured = formData.get("is_featured") === "on";
  const is_comparison = formData.get("is_comparison") === "on";
  const affiliate_disclosure_required = formData.get("affiliate_disclosure_required") === "on";
  const pubDate = (formData.get("published_date") as string) || (formData.get("published_at") as string)?.slice(0, 10) || "";
  const pubTime = (formData.get("published_time") as string) || "09:00";
  const published_at =
    status === "published"
      ? pubDate ? `${pubDate}T${pubTime}:00.000Z` : new Date().toISOString()
      : null;

  const row = {
    title,
    slug,
    excerpt,
    content,
    category_id: category_id || null,
    author_id: author_id || null,
    thumbnail_url,
    meta_title,
    meta_description,
    canonical_url,
    reading_time: readingTime(content),
    status,
    article_type,
    is_featured,
    is_comparison,
    affiliate_disclosure_required,
    published_at,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabase.from("articles").update(row).eq("id", id);
  } else {
    await supabase.from("articles").insert({ ...row, created_at: new Date().toISOString() });
  }
  revalidatePath("/");
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function saveCategory(formData: FormData) {
  const supabase = await createClient();
  const id = (formData.get("id") as string) || "";
  const row = {
    name: (formData.get("name") as string) ?? "",
    slug: (formData.get("slug") as string) ?? "",
    description: (formData.get("description") as string) || null,
    hero_title: (formData.get("hero_title") as string) || null,
    seo_title: (formData.get("seo_title") as string) || null,
    seo_description: (formData.get("seo_description") as string) || null,
    sort_order: Number(formData.get("sort_order") || 0),
    is_active: formData.get("is_active") === "on",
    updated_at: new Date().toISOString(),
  };
  if (id) await supabase.from("categories").update(row).eq("id", id);
  else
    await supabase
      .from("categories")
      .insert({ ...row, created_at: new Date().toISOString() });
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function saveAuthor(formData: FormData) {
  const supabase = await createClient();
  const id = (formData.get("id") as string) || "";
  const row = {
    name: (formData.get("name") as string) ?? "",
    slug: (formData.get("slug") as string) ?? "",
    bio: (formData.get("bio") as string) || null,
    role: (formData.get("role") as string) || null,
    avatar_url: (formData.get("avatar_url") as string) || null,
    linkedin_url: (formData.get("linkedin_url") as string) || null,
    twitter_url: (formData.get("twitter_url") as string) || null,
    website_url: (formData.get("website_url") as string) || null,
    is_active: formData.get("is_active") === "on",
    updated_at: new Date().toISOString(),
  };
  if (id) await supabase.from("authors").update(row).eq("id", id);
  else
    await supabase.from("authors").insert({ ...row, created_at: new Date().toISOString() });
  revalidatePath("/admin/authors");
  redirect("/admin/authors");
}

export async function saveSiteSetting(formData: FormData) {
  const supabase = await createClient();
  const key = (formData.get("key") as string) ?? "";
  const valueRaw = (formData.get("value") as string) ?? "{}";
  let value: unknown;
  try {
    value = JSON.parse(valueRaw);
  } catch {
    return;
  }
  await supabase.from("site_settings").upsert(
    { key, value, updated_at: new Date().toISOString() },
    { onConflict: "key" },
  );
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function updateContactStatusForm(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  if (!id || !status) return;
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ status }).eq("id", id);
  revalidatePath("/admin/contact-messages");
}
