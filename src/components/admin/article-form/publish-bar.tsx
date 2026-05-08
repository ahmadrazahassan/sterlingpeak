"use client";

import { Eye, Save, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface PublishBarProps {
  status: string;
  isPending: boolean;
  articleSlug?: string;
  onToggleStatus: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export function PublishBar({
  status,
  isPending,
  articleSlug,
  onToggleStatus,
  onSaveDraft,
  onPublish,
}: PublishBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onToggleStatus}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors",
          status === "published"
            ? "bg-cta/10 text-cta"
            : "bg-brand/[0.05] text-brand/60",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            status === "published" ? "bg-cta" : "bg-brand/30",
          )}
        />
        {status === "published" ? "Published" : "Draft"}
      </button>

      <div className="flex items-center gap-2">
        {articleSlug && (
          <button
            type="button"
            onClick={() => window.open(`/article/${articleSlug}`, "_blank")}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-black/[0.06] bg-white px-3 text-[12px] font-medium text-brand/60 transition-colors hover:bg-black/[0.02]"
          >
            <Eye className="h-3 w-3" />
            Preview
          </button>
        )}
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isPending}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-black/[0.06] bg-white px-4 text-[12px] font-semibold text-brand/70 transition-colors hover:bg-black/[0.02] disabled:opacity-50"
        >
          <Save className="h-3 w-3" />
          {isPending ? "Saving..." : "Save draft"}
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={isPending}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-cta px-4 text-[12px] font-semibold text-white shadow-sm shadow-cta/20 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Send className="h-3 w-3" />
          {isPending ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
