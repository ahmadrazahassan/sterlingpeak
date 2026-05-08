"use client";

import { useState, useRef } from "react";
import { Calendar } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";
import { SeoPanel } from "./seo-panel";
import type { Article, Category, Author } from "./types";

interface FormSidebarProps {
  article?: Article | null;
  categories: Category[];
  authors: Author[];
  thumbnail: string;
  onThumbnailChange: (url: string) => void;
}

export function FormSidebar({
  article,
  categories,
  authors,
  thumbnail,
  onThumbnailChange,
}: FormSidebarProps) {
  const [showSeo, setShowSeo] = useState(false);
  const defaultAuthor =
    authors.length === 1 ? authors[0].id : (article?.author_id ?? "");

  return (
    <div className="space-y-4">
      {/* Thumbnail */}
      <SidebarCard label="Featured image">
        <ImageUpload value={thumbnail} onChange={onThumbnailChange} />
      </SidebarCard>

      {/* Publish date */}
      <SidebarCard>
        <label className="flex items-center gap-2 text-[12px] font-semibold text-brand/60">
          <Calendar className="h-3.5 w-3.5" />
          Publish date & time
        </label>
        <DateTimePicker
          defaultDate={article?.published_at?.slice(0, 10) ?? ""}
          defaultTime={article?.published_at?.slice(11, 16) ?? "09:00"}
        />
      </SidebarCard>

      {/* Category */}
      <SidebarCard label="Category">
        <select
          name="category_id"
          defaultValue={article?.category_id ?? ""}
          className="mt-2 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
        >
          <option value="">None</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </SidebarCard>

      {/* Author */}
      <SidebarCard label="Author">
        <select
          name="author_id"
          defaultValue={defaultAuthor}
          className="mt-2 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
        >
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </SidebarCard>

      {/* Article type */}
      <SidebarCard label="Type">
        <input
          name="article_type"
          defaultValue={article?.article_type ?? "guide"}
          className="mt-2 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
        />
      </SidebarCard>

      {/* Flags */}
      <SidebarCard label="Flags">
        <div className="mt-3 space-y-2.5">
          <FlagCheckbox
            name="is_featured"
            label="Featured"
            defaultChecked={article?.is_featured}
          />
          <FlagCheckbox
            name="is_comparison"
            label="Comparison"
            defaultChecked={article?.is_comparison}
          />
          <FlagCheckbox
            name="affiliate_disclosure_required"
            label="Affiliate disclosure"
            defaultChecked={article?.affiliate_disclosure_required}
          />
        </div>
      </SidebarCard>

      {/* SEO */}
      <SeoPanel
        open={showSeo}
        onToggle={() => setShowSeo(!showSeo)}
        defaults={{
          meta_title: article?.meta_title ?? "",
          meta_description: article?.meta_description ?? "",
          canonical_url: article?.canonical_url ?? "",
        }}
      />
    </div>
  );
}

/* ── Small reusable pieces ── */

function SidebarCard({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-black/[0.05] bg-white p-4">
      {label && (
        <p className="text-[12px] font-semibold text-brand/60">{label}</p>
      )}
      {children}
    </div>
  );
}

function FlagCheckbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-[13px] text-brand/70">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-black/10 text-cta focus:ring-cta/30"
      />
      {label}
    </label>
  );
}

function DateTimePicker({
  defaultDate,
  defaultTime,
}: {
  defaultDate: string;
  defaultTime: string;
}) {
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div>
          <span className="text-[10px] font-medium text-brand/30">Date</span>
          <input
            ref={dateRef}
            name="published_date"
            type="date"
            defaultValue={defaultDate}
            className="mt-1 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[12px] text-brand outline-none focus:border-cta/30"
          />
        </div>
        <div>
          <span className="text-[10px] font-medium text-brand/30">Time</span>
          <input
            ref={timeRef}
            name="published_time"
            type="time"
            defaultValue={defaultTime}
            className="mt-1 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[12px] text-brand outline-none focus:border-cta/30"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          if (dateRef.current)
            dateRef.current.value = new Date().toISOString().slice(0, 10);
          if (timeRef.current)
            timeRef.current.value = new Date()
              .toTimeString()
              .slice(0, 5);
        }}
        className="mt-2 text-[11px] font-medium text-cta hover:underline"
      >
        Set to now
      </button>
    </>
  );
}
