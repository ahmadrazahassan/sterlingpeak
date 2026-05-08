import { createClient } from "@/lib/supabase/server";

export async function fetchSiteSettingsMap(): Promise<Map<string, unknown>> {
  const map = new Map<string, unknown>();
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return map;
  }
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  data?.forEach((row) => map.set(row.key, row.value));
  return map;
}

export function getSetting<T>(map: Map<string, unknown>, key: string, fallback: T): T {
  const v = map.get(key);
  if (v === undefined || v === null) return fallback;
  return v as T;
}
