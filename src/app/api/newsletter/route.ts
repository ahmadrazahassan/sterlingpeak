import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

/* Sign-ups land in public.newsletter_subscribers. `source` records
   which placement the reader used (homepage, newsletter page, footer)
   so we can see what actually converts. `created_at` on the row is the
   consent timestamp, which is what we would produce if a subscriber
   ever queried their consent under UK GDPR. */

const schema = z.object({
  email: z.string().email().max(254),
  firstName: z.string().max(120).optional().nullable(),
  source: z.string().max(60).optional().nullable(),
  /* Consent is not a formality. The row is only written when the
     reader has ticked the box, so every address on the list has an
     affirmative opt-in behind it. */
  consent: z.literal(true),
  /* Honeypot. Real people never see this field, so anything in it is
     a bot. We answer with a normal success so the bot stops retrying. */
  website: z.string().max(200).optional().nullable(),
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
    return NextResponse.json(
      { error: "Enter a valid email address and confirm consent." },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const email = parsed.data.email.trim().toLowerCase();
  const firstName = parsed.data.firstName?.trim() || null;

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({
    email,
    first_name: firstName,
    source: parsed.data.source?.trim() || "website",
  });

  if (error) {
    /* Unique violation on email. The address is already on the list,
       which is a success from the reader's point of view. */
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, already: true });
    }
    return NextResponse.json(
      { error: "Could not add you right now. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
