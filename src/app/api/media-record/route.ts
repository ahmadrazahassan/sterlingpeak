import { getAdminProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { profile } = await getAdminProfile();
  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  if (!b.url || typeof b.url !== "string") {
    return NextResponse.json({ error: "url required" }, { status: 400 });
  }
  const supabase = await createClient();
  await supabase.from("media_assets").insert({
    cloudinary_public_id: typeof b.public_id === "string" ? b.public_id : null,
    url: b.url,
    secure_url: typeof b.secure_url === "string" ? b.secure_url : null,
    format: typeof b.format === "string" ? b.format : null,
    width: typeof b.width === "number" ? b.width : null,
    height: typeof b.height === "number" ? b.height : null,
    bytes: typeof b.bytes === "number" ? b.bytes : null,
  });
  return NextResponse.json({ ok: true });
}
