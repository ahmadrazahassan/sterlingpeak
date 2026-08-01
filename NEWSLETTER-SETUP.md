# Newsletter — The SterlingPeak Briefing

Sign-ups are captured by our own API route and stored in Supabase. No
third party ESP is wired in, no API key, no webhook. This replaces an
earlier draft of this document that described a Kit (ConvertKit)
integration which was never built.

## How it works

```
[NewsletterForm in browser]
       │  POST /api/newsletter
       │  body: email, consent, source, website (honeypot)
       ▼
[ /api/newsletter/route.ts ]
       │  - zod validation, consent must be literal true
       │  - honeypot filled  → returns ok, writes nothing
       │  - lowercases + trims the address
       ▼
[ Supabase: public.newsletter_subscribers ]
       email · first_name · source · status · created_at
```

A duplicate address hits the unique index on `email`, returns Postgres
`23505`, and the route answers `{ ok: true, already: true }`. The form
then shows "You are already on the list" rather than an error.

## Where the pieces live

| Piece | Path |
|---|---|
| Form (both tones) | `src/components/public/newsletter-form.tsx` |
| Home page block | `src/components/public/newsletter-cta.tsx` |
| Dedicated page | `src/app/(public)/newsletter/page.tsx` |
| API route | `src/app/api/newsletter/route.ts` |
| Footer block | `src/components/public/site-footer.tsx` |
| Table | `supabase/sterlingpeak.sql` |

## Placements and the `source` column

Every row records where it came from, so you can see what converts:

- `homepage` — The Briefing block on `/`
- `newsletter-page` — masthead form on `/newsletter`
- `newsletter-page-footer` — closing form on `/newsletter`
- `footer` — site footer, every page

## Consent and UK GDPR

The consent tick is required on the client **and** enforced on the
server (`consent: z.literal(true)`), so no row can exist without an
affirmative opt-in behind it. `created_at` is the consent timestamp.
Together with `source` that is enough to answer "when and where did
this person agree" if a subscriber or the ICO ever asks.

This is **single opt-in with logged consent**, which is lawful under UK
GDPR and PECR. It is not double opt-in, because nothing here can send
email yet. See below.

## What is not built yet

**Sending.** There is no delivery mechanism. Addresses collect in
Supabase and nothing goes out. Before promoting the Briefing anywhere,
either:

1. Export the list and send from an ESP (Kit, Buttondown, MailerLite),
   or
2. Add a transactional sender (Resend, Postmark) plus a broadcast flow.

**Double opt-in.** Requires a sender, plus a `confirmed_at` column and
a `/newsletter/confirm` route carrying a signed token. Worth adding
once an ESP is in place, since some affiliate reviewers look for it.

**Unsubscribe.** The copy promises one click unsubscribe. The `status`
column already supports `unsubscribed`, but the route and the link do
not exist yet. Build this at the same time as sending, and before the
first issue goes out.

## Reading the list

Supabase Studio → Table editor → `newsletter_subscribers`. Filter on
`status = 'active'` for the current list, group by `source` to see
which placement is working.
