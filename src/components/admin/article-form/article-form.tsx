"use client";

import { useRef, useState, useTransition } from "react";
import { saveArticle } from "@/app/admin/actions";
import { RichEditor } from "@/components/admin/editor";
import { PublishBar } from "./publish-bar";
import { FormSidebar } from "./form-sidebar";
import type { ArticleFormProps } from "./types";

export function ArticleForm({ article, categories, authors }: ArticleFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState(article?.content ?? "");
  const [thumbnail, setThumbnail] = useState(article?.thumbnail_url ?? "");
  const [status, setStatus] = useState(article?.status ?? "draft");

  function buildFormData(statusOverride: string) {
    const form = formRef.current;
    if (!form) return null;
    const fd = new FormData(form);
    fd.set("content", content);
    fd.set("thumbnail_url", thumbnail);
    fd.set("status", statusOverride);

    if (statusOverride === "published") {
      const dateVal = fd.get("published_date") as string;
      if (!dateVal) {
        fd.set("published_date", new Date().toISOString().slice(0, 10));
        fd.set("published_time", new Date().toTimeString().slice(0, 5));
      }
    }
    return fd;
  }

  function submit(statusOverride: string) {
    const fd = buildFormData(statusOverride);
    if (!fd) return;
    setStatus(statusOverride);
    startTransition(async () => {
      await saveArticle(fd);
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        submit(status);
      }}
      className="space-y-6"
    >
      <input type="hidden" name="id" value={article?.id ?? ""} />

      <PublishBar
        status={status}
        isPending={isPending}
        articleSlug={article?.slug}
        onToggleStatus={() =>
          setStatus((s) => (s === "draft" ? "published" : "draft"))
        }
        onSaveDraft={() => submit("draft")}
        onPublish={() => submit("published")}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left column: Content */}
        <div className="space-y-4">
          <input
            name="title"
            defaultValue={article?.title ?? ""}
            placeholder="Article title..."
            className="w-full border-0 bg-transparent font-heading text-2xl font-semibold text-brand outline-none placeholder:text-brand/20 md:text-3xl"
          />

          <input
            name="slug"
            defaultValue={article?.slug ?? ""}
            placeholder="slug-auto-generated"
            className="w-full border-0 bg-transparent text-[13px] text-brand/40 outline-none placeholder:text-brand/20"
          />

          <textarea
            name="excerpt"
            defaultValue={article?.excerpt ?? ""}
            placeholder="Write a short excerpt..."
            rows={2}
            className="w-full resize-none rounded-xl border border-black/[0.05] bg-white px-4 py-3 text-sm text-brand outline-none placeholder:text-brand/25 focus:border-cta/30 focus:ring-1 focus:ring-cta/10"
          />

          <div className="overflow-hidden rounded-xl border border-black/[0.05] bg-white">
            <RichEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Right column: Sidebar */}
        <FormSidebar
          article={article}
          categories={categories}
          authors={authors}
          thumbnail={thumbnail}
          onThumbnailChange={setThumbnail}
        />
      </div>
    </form>
  );
}
