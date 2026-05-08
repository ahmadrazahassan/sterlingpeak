import { updateContactStatusForm } from "@/app/admin/actions";
import { adminListContacts } from "@/lib/queries/admin";
import { cn } from "@/lib/utils";

export default async function AdminContactPage() {
  const rows = await adminListContacts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-semibold text-brand">Messages</h1>
        <p className="mt-0.5 text-[13px] text-brand/40">{rows.length} messages</p>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-xl border border-black/[0.04] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[14px] font-medium text-brand">{r.name}</p>
                <p className="text-[12px] text-brand/40">{r.email}{r.company ? ` · ${r.company}` : ""}</p>
                {r.subject && <p className="mt-1 text-[13px] font-medium text-brand/70">{r.subject}</p>}
              </div>
              <div className="flex shrink-0 gap-1">
                {(["new", "read", "replied", "archived"] as const).map((s) => (
                  <form key={s} action={updateContactStatusForm}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="status" value={s} />
                    <button
                      type="submit"
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize transition-colors",
                        r.status === s
                          ? "bg-cta/10 text-cta"
                          : "text-brand/30 hover:bg-black/[0.03] hover:text-brand/60",
                      )}
                    >
                      {s}
                    </button>
                  </form>
                ))}
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-[13px] leading-relaxed text-brand/60">{r.message}</p>
            <p className="mt-2 text-[11px] text-brand/20">
              {r.created_at ? new Date(r.created_at).toLocaleString("en-GB") : ""}
            </p>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-black/[0.08] py-12 text-center">
            <p className="text-[13px] text-brand/30">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
