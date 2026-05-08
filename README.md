# SterlingPeak

Production-oriented Next.js site for **sterlingpeak.uk**: UK SME finance and business software publication with Supabase CMS, Cloudinary media, and a full `/admin` editorial panel.

## Requirements

- Node 20+
- [Supabase](https://supabase.com) project
- [Cloudinary](https://cloudinary.com) account (images only — not Supabase Storage)
- Optional: Vercel for hosting

## Environment

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; optional unless you use service-role scripts)
- Cloudinary: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_SITE_URL` (e.g. `https://sterlingpeak.uk` or `http://localhost:3000`)

## Database

1. In the Supabase SQL editor, run migrations in order:
   - [`supabase/migrations/20260508180000_init.sql`](supabase/migrations/20260508180000_init.sql)
   - [`supabase/migrations/20260508180001_seed.sql`](supabase/migrations/20260508180001_seed.sql)
2. Create an auth user (Authentication → Users → Add user).
3. Grant admin access:

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin@email.com';
```

## Develop

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Deploy (Vercel)

- Import the repo; set the same env vars as `.env.example`.
- Connect `sterlingpeak.uk` in Vercel project domains.
- Point Supabase Auth redirect URLs to your production URL if you use magic links.

## Spec

Product and design requirements live in the repo root: [`../sterlingpeak_cursor_prompt_dynamic_sections.md`](../sterlingpeak_cursor_prompt_dynamic_sections.md).
