"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SeoPanelProps {
  open: boolean;
  onToggle: () => void;
  defaults: {
    meta_title: string;
    meta_description: string;
    canonical_url: string;
  };
}

export function SeoPanel({ open, onToggle, defaults }: SeoPanelProps) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-xl border border-black/[0.05] bg-white p-4 text-[12px] font-semibold text-brand/60 transition-colors hover:bg-[#fafafa]"
      >
        SEO settings
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="space-y-3 rounded-xl border border-black/[0.05] bg-white p-4">
          <div>
            <label className="text-[11px] font-medium text-brand/50">
              Meta title
            </label>
            <input
              name="meta_title"
              defaultValue={defaults.meta_title}
              className="mt-1 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-brand/50">
              Meta description
            </label>
            <textarea
              name="meta_description"
              defaultValue={defaults.meta_description}
              rows={3}
              className="mt-1 w-full resize-none rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-brand/50">
              Canonical URL
            </label>
            <input
              name="canonical_url"
              defaultValue={defaults.canonical_url}
              className="mt-1 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30"
            />
          </div>
        </div>
      )}
    </>
  );
}
