import { saveSiteSetting } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

const homepageKeys = [
  "hero",
  "insight_tiles",
  "featured_comparisons_section",
  "framework_section",
  "categories_section",
  "latest_section",
  "industries_section",
  "toolkit_section",
  "toolkit_items",
  "homepage_industries",
  "newsletter_section",
  "trust_section",
  "final_cta",
  "footer",
  "mega_menu",
] as const;

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from("site_settings").select("key, value");

  const map = new Map<string, unknown>();
  rows?.forEach((r) => map.set(r.key, r.value));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-semibold text-brand">Settings</h1>
        <p className="mt-0.5 text-[13px] text-brand/40">Site copy and section configuration (JSON)</p>
      </div>

      <div className="space-y-4">
        {homepageKeys.map((key) => {
          const value = map.get(key);
          const str = value != null ? JSON.stringify(value, null, 2) : "{}";
          return (
            <div key={key} className="rounded-xl border border-black/[0.04] bg-white p-5">
              <form action={saveSiteSetting} className="space-y-3">
                <input type="hidden" name="key" value={key} />
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-brand">{key}</p>
                  <button
                    type="submit"
                    className="rounded-lg bg-cta px-3 py-1 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Save
                  </button>
                </div>
                <textarea
                  name="value"
                  required
                  rows={key === "hero" || key === "framework_section" || key === "trust_section" ? 14 : 8}
                  defaultValue={str}
                  className="w-full resize-y rounded-lg border border-black/[0.06] bg-[#f9f9f9] p-3 font-mono text-[12px] text-brand outline-none focus:border-cta/30"
                />
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
