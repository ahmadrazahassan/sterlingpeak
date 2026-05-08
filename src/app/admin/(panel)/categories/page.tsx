import { saveCategory } from "@/app/admin/actions";
import { adminListCategories } from "@/lib/queries/admin";

export default async function AdminCategoriesPage() {
  const categories = await adminListCategories();

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-xl font-semibold text-brand">Categories</h1>

      {/* Create form */}
      <div className="rounded-xl border border-black/[0.04] bg-white p-6">
        <p className="text-[13px] font-semibold text-brand/60">New category</p>
        <form action={saveCategory} className="mt-4 grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="id" value="" />
          <div>
            <label className="text-[11px] font-medium text-brand/50">Name</label>
            <input name="name" required className="mt-1 h-9 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 text-[13px] text-brand outline-none focus:border-cta/30" />
          </div>
          <div>
            <label className="text-[11px] font-medium text-brand/50">Slug</label>
            <input name="slug" required className="mt-1 h-9 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 text-[13px] text-brand outline-none focus:border-cta/30" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] font-medium text-brand/50">Description</label>
            <textarea name="description" rows={2} className="mt-1 w-full resize-none rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 py-2 text-[13px] text-brand outline-none focus:border-cta/30" />
          </div>
          <div>
            <label className="text-[11px] font-medium text-brand/50">Hero title</label>
            <input name="hero_title" className="mt-1 h-9 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 text-[13px] text-brand outline-none focus:border-cta/30" />
          </div>
          <div>
            <label className="text-[11px] font-medium text-brand/50">Sort order</label>
            <input name="sort_order" type="number" defaultValue={0} className="mt-1 h-9 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 text-[13px] text-brand outline-none focus:border-cta/30" />
          </div>
          <div>
            <label className="text-[11px] font-medium text-brand/50">SEO title</label>
            <input name="seo_title" className="mt-1 h-9 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 text-[13px] text-brand outline-none focus:border-cta/30" />
          </div>
          <div>
            <label className="text-[11px] font-medium text-brand/50">SEO description</label>
            <input name="seo_description" className="mt-1 h-9 w-full rounded-lg border border-black/[0.06] bg-[#f9f9f9] px-3 text-[13px] text-brand outline-none focus:border-cta/30" />
          </div>
          <label className="flex items-center gap-2 text-[13px] text-brand/60 sm:col-span-2">
            <input type="checkbox" name="is_active" defaultChecked className="h-4 w-4 rounded border-black/10 text-cta focus:ring-cta/30" />
            Active
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="h-8 rounded-lg bg-cta px-4 text-[12px] font-semibold text-white transition-opacity hover:opacity-90">
              Create
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="space-y-2">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-xl border border-black/[0.04] bg-white px-5 py-3">
            <div>
              <p className="text-[14px] font-medium text-brand">{c.name}</p>
              <p className="text-[12px] text-brand/30">{c.slug} · sort {c.sort_order}</p>
            </div>
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${c.is_active ? "bg-cta/10 text-cta" : "bg-brand/[0.05] text-brand/40"}`}>
              {c.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
