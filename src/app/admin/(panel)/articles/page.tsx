import Link from "next/link";
import { deleteArticleForm, toggleArticleStatus, duplicateArticle } from "@/app/admin/actions";
import { adminListArticles } from "@/lib/queries/admin";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, Copy, Eye, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default async function AdminArticlesPage() {
  const rows = await adminListArticles();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-semibold text-brand">Articles</h1>
          <p className="mt-0.5 text-[13px] text-brand/40">{rows.length} total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex h-8 items-center rounded-lg bg-cta px-4 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          New article
        </Link>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className="group flex items-center justify-between rounded-xl border border-black/[0.04] bg-white px-5 py-3.5 transition-shadow hover:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)]"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Link href={`/admin/articles/${row.id}`} className="truncate text-[14px] font-medium text-brand hover:text-cta transition-colors">
                  {row.title || "(Untitled)"}
                </Link>
                <span className={cn(
                  "shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase",
                  row.status === "published" ? "bg-cta/10 text-cta" : "bg-brand/[0.05] text-brand/40",
                )}>
                  {row.status}
                </span>
                {row.is_featured && <span className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">Featured</span>}
                {row.is_comparison && <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">Comparison</span>}
              </div>
              <p className="mt-0.5 text-[12px] text-brand/30">
                {(row.category as unknown as { name: string } | null)?.name ?? "Uncategorized"}
                {row.updated_at && ` · ${new Date(row.updated_at).toLocaleDateString("en-GB")}`}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              {/* Publish / Unpublish */}
              <form action={toggleArticleStatus}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="new_status" value={row.status === "published" ? "draft" : "published"} />
                <button
                  type="submit"
                  title={row.status === "published" ? "Unpublish" : "Publish"}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                    row.status === "published"
                      ? "text-amber-500 hover:bg-amber-50"
                      : "text-cta hover:bg-cta/10",
                  )}
                >
                  {row.status === "published" ? (
                    <ArrowDownCircle className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpCircle className="h-3.5 w-3.5" />
                  )}
                </button>
              </form>

              {/* View on site */}
              <Link
                href={`/article/${row.slug}`}
                target="_blank"
                title="View on site"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-brand/40 transition-colors hover:bg-brand/[0.04] hover:text-brand/70"
              >
                <Eye className="h-3.5 w-3.5" />
              </Link>

              {/* Edit */}
              <Link
                href={`/admin/articles/${row.id}`}
                title="Edit"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-brand/40 transition-colors hover:bg-brand/[0.04] hover:text-brand/70"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Link>

              {/* Duplicate */}
              <form action={duplicateArticle}>
                <input type="hidden" name="id" value={row.id} />
                <button
                  type="submit"
                  title="Duplicate"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-brand/40 transition-colors hover:bg-brand/[0.04] hover:text-brand/70"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </form>

              {/* Delete */}
              <form action={deleteArticleForm}>
                <input type="hidden" name="id" value={row.id} />
                <button
                  type="submit"
                  title="Delete"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-black/[0.08] py-12 text-center">
            <p className="text-[13px] text-brand/30">No articles yet</p>
            <Link href="/admin/articles/new" className="mt-2 inline-block text-[13px] font-medium text-cta hover:underline">
              Create your first article
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
