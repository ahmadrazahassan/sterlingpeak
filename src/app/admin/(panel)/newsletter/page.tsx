import { adminListNewsletter } from "@/lib/queries/admin";

export default async function AdminNewsletterPage() {
  const rows = await adminListNewsletter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-semibold text-brand">Newsletter</h1>
        <p className="mt-0.5 text-[13px] text-brand/40">{rows.length} subscribers</p>
      </div>

      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-xl border border-black/[0.04] bg-white px-5 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium text-brand">{r.email}</p>
              <p className="text-[12px] text-brand/30">
                {r.first_name ?? "—"} · {r.source ?? "website"} · {r.created_at ? new Date(r.created_at).toLocaleDateString("en-GB") : ""}
              </p>
            </div>
            <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${r.status === "active" ? "bg-cta/10 text-cta" : "bg-brand/[0.05] text-brand/40"}`}>
              {r.status}
            </span>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-black/[0.08] py-12 text-center">
            <p className="text-[13px] text-brand/30">No subscribers yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
