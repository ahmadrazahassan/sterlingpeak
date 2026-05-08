import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  first_name: z.string().max(120).optional().nullable(),
  source: z.string().max(120).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({
    email: parsed.data.email.toLowerCase(),
    first_name: parsed.data.first_name ?? null,
    source: parsed.data.source ?? "website",
  });
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, message: "Already subscribed" });
    }
    return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
