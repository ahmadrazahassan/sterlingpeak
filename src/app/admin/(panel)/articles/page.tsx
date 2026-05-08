import Link from "next/link";
import { deleteArticleForm } from "@/app/admin/actions";
import { adminListArticles } from "@/lib/queries/admin";
import { cn } from "@/lib/utils";

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
                <Link href={`/admin/articles/${row.id}`} className="truncate text-[14px] font-medium text-brand hover:text-cta">
                  {row.title}
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
            <form action={deleteArticleForm}>
              <input type="hidden" name="id" value={row.id} />
              <button type="submit" className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-red-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100">
                Delete
              </button>
            </form>
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
