"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveArticle } from "@/app/admin/actions";
import { RichEditor } from "@/components/admin/rich-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { cn } from "@/lib/utils";
import { Calendar, ChevronDown, Eye, Save } from "lucide-react";

type Category = { id: string; name: string };
type Author = { id: string; name: string };

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category_id: string | null;
  author_id: string | null;
  thumbnail_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  status: string;
  article_type: string;
  is_featured: boolean;
  is_comparison: boolean;
  affiliate_disclosure_required: boolean;
  published_at: string | null;
};

type Props = {
  article?: Article | null;
  categories: Category[];
  authors: Author[];
};

export function ArticleForm({ article, categories, authors }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState(article?.content ?? "");
  const [thumbnail, setThumbnail] = useState(article?.thumbnail_url ?? "");
  const [status, setStatus] = useState(article?.status ?? "draft");
  const [showSeo, setShowSeo] = useState(false);

  const defaultAuthor = authors.length === 1 ? authors[0].id : (article?.author_id ?? "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("content", content);
    formData.set("thumbnail_url", thumbnail);
    formData.set("status", status);
    startTransition(async () => {
      await saveArticle(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" value={article?.id ?? ""} />

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStatus(status === "draft" ? "published" : "draft")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors",
              status === "published"
                ? "bg-cta/10 text-cta"
                : "bg-brand/[0.05] text-brand/60",
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", status === "published" ? "bg-cta" : "bg-brand/30")} />
            {status === "published" ? "Published" : "Draft"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (article) window.open(`/article/${article.slug}`, "_blank");
            }}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-black/[0.06] bg-white px-3 text-[12px] font-medium text-brand/60 transition-colors hover:bg-black/[0.02]"
          >
            <Eye className="h-3 w-3" />
            Preview
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-cta px-4 text-[12px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Save className="h-3 w-3" />
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left: editor */}
        <div className="space-y-4">
          {/* Title */}
          <input
            name="title"
            defaultValue={article?.title ?? ""}
            placeholder="Article title..."
            className="w-full border-0 bg-transparent font-heading text-2xl font-semibold text-brand outline-none placeholder:text-brand/20 md:text-3xl"
          />

          {/* Slug */}
          <input
            name="slug"
            defaultValue={article?.slug ?? ""}
            placeholder="slug-auto-generated"
            className="w-full border-0 bg-transparent text-[13px] text-brand/40 outline-none placeholder:text-brand/20"
          />

          {/* Excerpt */}
          <textarea
            name="excerpt"
            defaultValue={article?.excerpt ?? ""}
            placeholder="Write a short excerpt..."
            rows={2}
            className="w-full resize-none rounded-xl border border-black/[0.05] bg-white px-4 py-3 text-sm text-brand outline-none placeholder:text-brand/25 focus:border-cta/30 focus:ring-1 focus:ring-cta/10"
          />

          {/* Rich editor */}
          <div className="rounded-xl border border-black/[0.05] bg-white">
            <RichEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Right: sidebar settings */}
        <div className="space-y-4">
          {/* Thumbnail */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4">
            <p className="text-[12px] font-semibold text-brand/60">Featured image</p>
            <ImageUpload value={thumbnail} onChange={setThumbnail} />
          </div>

          {/* Publish date */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4">
            <label className="flex items-center gap-2 text-[12px] font-semibold text-brand/60">
              <Calendar className="h-3.5 w-3.5" />
              Publish date & time
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-medium text-brand/30">Date</span>
                <input
                  name="published_date"
                  type="date"
                  defaultValue={article?.published_at ? article.published_at.slice(0, 10) : ""}
                  className="mt-1 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[12px] text-brand outline-none focus:border-cta/30"
                />
              </div>
              <div>
                <span className="text-[10px] font-medium text-brand/30">Time</span>
                <input
                  name="published_time"
                  type="time"
                  defaultValue={article?.published_at ? article.published_at.slice(11, 16) : "09:00"}
                  className="mt-1 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[12px] text-brand outline-none focus:border-cta/30"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const form = document.querySelector<HTMLFormElement>("form");
                if (!form) return;
                const dateInput = form.querySelector<HTMLInputElement>("[name=published_date]");
                const timeInput = form.querySelector<HTMLInputElement>("[name=published_time]");
                if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
                if (timeInput) timeInput.value = new Date().toTimeString().slice(0, 5);
              }}
              className="mt-2 text-[11px] font-medium text-cta hover:underline"
            >
              Set to now
            </button>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4">
            <p className="text-[12px] font-semibold text-brand/60">Category</p>
            <select
              name="category_id"
              defaultValue={article?.category_id ?? ""}
              className="mt-2 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
            >
              <option value="">None</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4">
            <p className="text-[12px] font-semibold text-brand/60">Author</p>
            <select
              name="author_id"
              defaultValue={defaultAuthor}
              className="mt-2 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
            >
              {authors.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          {/* Article type */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4">
            <p className="text-[12px] font-semibold text-brand/60">Type</p>
            <input
              name="article_type"
              defaultValue={article?.article_type ?? "guide"}
              className="mt-2 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
            />
          </div>

          {/* Flags */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4">
            <p className="text-[12px] font-semibold text-brand/60">Flags</p>
            <div className="mt-3 space-y-2.5">
              <label className="flex items-center gap-2.5 text-[13px] text-brand/70">
                <input type="checkbox" name="is_featured" defaultChecked={article?.is_featured} className="h-4 w-4 rounded border-black/10 text-cta focus:ring-cta/30" />
                Featured
              </label>
              <label className="flex items-center gap-2.5 text-[13px] text-brand/70">
                <input type="checkbox" name="is_comparison" defaultChecked={article?.is_comparison} className="h-4 w-4 rounded border-black/10 text-cta focus:ring-cta/30" />
                Comparison
              </label>
              <label className="flex items-center gap-2.5 text-[13px] text-brand/70">
                <input type="checkbox" name="affiliate_disclosure_required" defaultChecked={article?.affiliate_disclosure_required} className="h-4 w-4 rounded border-black/10 text-cta focus:ring-cta/30" />
                Affiliate disclosure
              </label>
            </div>
          </div>

          {/* SEO toggle */}
          <button
            type="button"
            onClick={() => setShowSeo(!showSeo)}
            className="flex w-full items-center justify-between rounded-xl border border-black/[0.05] bg-white p-4 text-[12px] font-semibold text-brand/60 transition-colors hover:bg-[#fafafa]"
          >
            SEO settings
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showSeo && "rotate-180")} />
          </button>

          {showSeo && (
            <div className="space-y-3 rounded-xl border border-black/[0.05] bg-white p-4">
              <div>
                <label className="text-[11px] font-medium text-brand/50">Meta title</label>
                <input
                  name="meta_title"
                  defaultValue={article?.meta_title ?? ""}
                  className="mt-1 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-brand/50">Meta description</label>
                <textarea
                  name="meta_description"
                  defaultValue={article?.meta_description ?? ""}
                  rows={3}
                  className="mt-1 w-full resize-none rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-brand/50">Canonical URL</label>
                <input
                  name="canonical_url"
                  defaultValue={article?.canonical_url ?? ""}
                  className="mt-1 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
