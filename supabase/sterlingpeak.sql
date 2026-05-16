-- ============================================================================
-- STERLINGPEAK — Complete Database Schema
-- ============================================================================
-- Target: Supabase (PostgreSQL 15+)
-- Run in Supabase SQL Editor or via `supabase db push`
-- No demo articles. Admin publishes content via the CMS.
-- Images handled via Cloudinary (URLs stored, not blobs).
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- EXTENSIONSa
-- ────────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────────────────────
-- TABLES
-- ────────────────────────────────────────────────────────────────────────────

-- Profiles: synced from auth.users via trigger. Drives admin access.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Categories: content taxonomy with optional nesting.
create table if not exists public.categories (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text not null unique,
  description     text,
  hero_title      text,
  seo_title       text,
  seo_description text,
  icon            text,
  color           text,
  parent_id       uuid references public.categories (id) on delete set null,
  sort_order      integer not null default 0,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Authors: editorial team members.
create table if not exists public.authors (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text not null unique,
  bio          text,
  role         text,
  avatar_url   text,
  linkedin_url text,
  twitter_url  text,
  website_url  text,
  expertise    text[],
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Articles: core content — guides, comparisons, analysis.
create table if not exists public.articles (
  id                             uuid primary key default gen_random_uuid(),
  title                          text not null,
  slug                           text not null unique,
  excerpt                        text,
  content                        text not null,
  category_id                    uuid references public.categories (id) on delete set null,
  author_id                      uuid references public.authors (id) on delete set null,
  thumbnail_url                  text,
  meta_title                     text,
  meta_description               text,
  canonical_url                  text,
  reading_time                   integer,
  status                         text not null default 'draft' check (status in ('draft', 'published')),
  article_type                   text not null default 'guide',
  is_featured                    boolean not null default false,
  is_comparison                  boolean not null default false,
  affiliate_disclosure_required  boolean not null default false,
  published_at                   timestamptz,
  created_at                     timestamptz not null default now(),
  updated_at                     timestamptz not null default now()
);

-- Article tags: flexible tagging without a separate tags table.
create table if not exists public.article_tags (
  id         uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  tag        text not null,
  unique (article_id, tag)
);

-- Related articles: manual editorial linking between articles.
create table if not exists public.related_articles (
  id                 uuid primary key default gen_random_uuid(),
  article_id         uuid not null references public.articles (id) on delete cascade,
  related_article_id uuid not null references public.articles (id) on delete cascade,
  unique (article_id, related_article_id),
  check (article_id <> related_article_id)
);

-- Newsletter subscribers: public sign-up, admin reads.
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  first_name text,
  source     text default 'website',
  status     text not null default 'active' check (status in ('active', 'unsubscribed')),
  created_at timestamptz not null default now()
);

-- Contact messages: public form submissions.
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text,
  subject    text,
  message    text not null,
  status     text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

-- Media assets: Cloudinary metadata records.
create table if not exists public.media_assets (
  id                   uuid primary key default gen_random_uuid(),
  cloudinary_public_id text,
  url                  text not null,
  secure_url           text,
  format               text,
  width                integer,
  height               integer,
  bytes                integer,
  alt_text             text,
  created_at           timestamptz not null default now()
);

-- Site settings: key/value JSON store for CMS-driven copy.
create table if not exists public.site_settings (
  id         uuid primary key default gen_random_uuid(),
  key        text not null unique,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- FUNCTIONS
-- ────────────────────────────────────────────────────────────────────────────

-- Auto-update updated_at on row modification.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Sync new auth.users → public.profiles automatically.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Admin check helper (avoids infinite recursion in RLS policies).
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = uid and p.role = 'admin'
  );
$$;

-- ────────────────────────────────────────────────────────────────────────────
-- TRIGGERS
-- ────────────────────────────────────────────────────────────────────────────

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger categories_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

create trigger authors_updated_at
  before update on public.authors
  for each row execute function public.set_updated_at();

create trigger articles_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ────────────────────────────────────────────────────────────────────────────
-- GRANTS
-- ────────────────────────────────────────────────────────────────────────────

grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to authenticated;
grant select, insert on public.newsletter_subscribers to anon;
grant select, insert on public.contact_messages to anon;
grant select on public.categories to anon;
grant select on public.authors to anon;
grant select on public.articles to anon;
grant select on public.article_tags to anon;
grant select on public.related_articles to anon;
grant select on public.site_settings to anon;

-- ────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.authors enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;
alter table public.related_articles enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;

-- Profiles
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin(auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());
create policy "profiles_admin_all" on public.profiles
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Categories
create policy "categories_public_read_active" on public.categories
  for select using (is_active = true or public.is_admin(auth.uid()));
create policy "categories_admin_write" on public.categories
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Authors
create policy "authors_public_read_active" on public.authors
  for select using (is_active = true or public.is_admin(auth.uid()));
create policy "authors_admin_write" on public.authors
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Articles
create policy "articles_public_read_published" on public.articles
  for select using (status = 'published' or public.is_admin(auth.uid()));
create policy "articles_admin_write" on public.articles
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Article Tags
create policy "article_tags_public_read" on public.article_tags
  for select using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and (a.status = 'published' or public.is_admin(auth.uid()))
    )
  );
create policy "article_tags_admin_write" on public.article_tags
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Related Articles
create policy "related_articles_public_read" on public.related_articles
  for select using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and (a.status = 'published' or public.is_admin(auth.uid()))
    )
  );
create policy "related_articles_admin_write" on public.related_articles
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Newsletter Subscribers
create policy "newsletter_insert_public" on public.newsletter_subscribers
  for insert with check (true);
create policy "newsletter_admin_select" on public.newsletter_subscribers
  for select using (public.is_admin(auth.uid()));
create policy "newsletter_admin_update" on public.newsletter_subscribers
  for update using (public.is_admin(auth.uid()));
create policy "newsletter_admin_delete" on public.newsletter_subscribers
  for delete using (public.is_admin(auth.uid()));

-- Contact Messages
create policy "contact_insert_public" on public.contact_messages
  for insert with check (true);
create policy "contact_admin_all" on public.contact_messages
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Media Assets
create policy "media_admin_all" on public.media_assets
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Site Settings
create policy "site_settings_public_read" on public.site_settings
  for select using (true);
create policy "site_settings_admin_write" on public.site_settings
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ────────────────────────────────────────────────────────────────────────────
-- INDEXES (performance for public queries)
-- ────────────────────────────────────────────────────────────────────────────

create index if not exists idx_articles_category
  on public.articles (category_id);

create index if not exists idx_articles_status_published
  on public.articles (status, published_at desc);

create index if not exists idx_articles_featured
  on public.articles (is_featured)
  where status = 'published';

create index if not exists idx_articles_comparison
  on public.articles (is_comparison)
  where status = 'published';

create index if not exists idx_articles_slug
  on public.articles (slug);

create index if not exists idx_articles_author
  on public.articles (author_id);

create index if not exists idx_article_tags_article
  on public.article_tags (article_id);

create index if not exists idx_article_tags_tag
  on public.article_tags (tag);

create index if not exists idx_related_articles_article
  on public.related_articles (article_id);

create index if not exists idx_related_articles_related
  on public.related_articles (related_article_id);

create index if not exists idx_categories_slug
  on public.categories (slug);

create index if not exists idx_categories_sort
  on public.categories (sort_order)
  where is_active = true;

create index if not exists idx_authors_slug
  on public.authors (slug);

create index if not exists idx_newsletter_email
  on public.newsletter_subscribers (email);

create index if not exists idx_newsletter_created
  on public.newsletter_subscribers (created_at desc);

create index if not exists idx_contact_created
  on public.contact_messages (created_at desc);

create index if not exists idx_media_created
  on public.media_assets (created_at desc);

create index if not exists idx_site_settings_key
  on public.site_settings (key);

-- ────────────────────────────────────────────────────────────────────────────
-- SEED: Categories
-- ────────────────────────────────────────────────────────────────────────────

insert into public.categories (name, slug, description, hero_title, seo_title, seo_description, sort_order, is_active)
values
  ('Accounting', 'accounting',
   'Bookkeeping, cloud accounting, and reporting for UK SMEs.',
   'Accounting insights for modern UK businesses',
   'Accounting | SterlingPeak',
   'Practical accounting software and finance guides for UK SMEs.', 1, true),
  ('Business Software', 'business-software',
   'Operational tools beyond the ledger.',
   'Business software for UK SMEs',
   'Business Software | SterlingPeak',
   'Guides to choosing business software in the UK.', 2, true),
  ('Comparisons', 'comparisons',
   'Side-by-side software analysis.',
   'Software comparisons for UK SMEs',
   'Comparisons | SterlingPeak',
   'Compare accounting, payroll, and finance tools.', 3, true),
  ('Payroll & HR', 'payroll-hr',
   'Payroll compliance and people operations.',
   'Payroll & HR insights',
   'Payroll & HR | SterlingPeak',
   'Payroll software and HR operations for UK businesses.', 4, true),
  ('VAT & Tax', 'vat-tax',
   'VAT, MTD, and tax workflows.',
   'VAT & tax guidance',
   'VAT & Tax | SterlingPeak',
   'Tax and Making Tax Digital guidance for SMEs.', 5, true),
  ('Small Business Guides', 'small-business-guides',
   'Foundational SME operations content.',
   'Small business guides',
   'SME Guides | SterlingPeak',
   'Practical guides for growing UK businesses.', 6, true),
  ('Payments & Banking', 'payments-banking',
   'Cash flow, banking, and payments.',
   'Payments & banking',
   'Payments & Banking | SterlingPeak',
   'Banking and payment workflows for SMEs.', 7, true),
  ('ERP & Operations', 'erp-operations',
   'Scaling systems and operations.',
   'ERP & operations',
   'ERP & Operations | SterlingPeak',
   'ERP and operational software for UK SMEs.', 8, true),
  ('Industry Solutions', 'industry-solutions',
   'Sector-specific software guidance.',
   'Industry solutions',
   'Industry Solutions | SterlingPeak',
   'Software guidance by industry.', 9, true)
on conflict (slug) do nothing;

-- ────────────────────────────────────────────────────────────────────────────
-- SEED: Authors
-- ────────────────────────────────────────────────────────────────────────────

insert into public.authors (name, slug, bio, role, is_active)
values
  ('Hafiza Ayesha Waheed', 'hafiza-ayesha-waheed',
   'Founder and lead editor at SterlingPeak. Covers UK accounting software, payroll systems, and compliance for SMEs.',
   'Editor-in-Chief', true)
on conflict (slug) do nothing;

-- ────────────────────────────────────────────────────────────────────────────
-- SEED: Site Settings (CMS-driven homepage/footer copy)
-- ────────────────────────────────────────────────────────────────────────────

insert into public.site_settings (key, value)
values
  ('hero', '{
    "eyebrow": "Independent UK Finance Publication",
    "heading": "UK accounting and payroll software, reviewed properly.",
    "description": "Editorial reviews and head-to-head comparisons of Sage, Xero, QuickBooks, FreeAgent, and the payroll, VAT, and operations software UK SMEs actually run on. Written for HMRC, Making Tax Digital, and UK GAAP — not US tax law translated into pounds.",
    "ctaPrimaryLabel": "Read our comparisons",
    "ctaPrimaryHref": "/comparisons",
    "ctaSecondaryLabel": "Browse editorial guides",
    "ctaSecondaryHref": "/categories/accounting"
  }'::jsonb),

  ('featured_comparisons_section', '{
    "title": "Head-to-head software comparisons",
    "subtitle": "Side-by-side analysis of UK accounting, payroll, and business platforms — pricing, MTD compliance, integrations, and workflow trade-offs."
  }'::jsonb),

  ('latest_section', '{
    "title": "Recently published"
  }'::jsonb),

  ('newsletter_section', '{
    "title": "The SterlingPeak Briefing",
    "description": "A weekly dispatch covering UK software updates, HMRC changes, and the editorial analysis our readers rely on."
  }'::jsonb),

  ('trust_section', '{
    "title": "Our editorial commitments",
    "columns": [
      {
        "title": "Independent editorial",
        "body": "Our writers and editors operate independently. Software vendors have no influence over our conclusions, scores, or recommendations."
      },
      {
        "title": "Research-backed analysis",
        "body": "Every comparison evaluates real pricing, actual feature sets, and UK-specific compliance support — not press releases."
      },
      {
        "title": "Transparent affiliate disclosure",
        "body": "Some links earn SterlingPeak a referral commission. We disclose every affiliate relationship and never let it shape editorial outcomes."
      }
    ]
  }'::jsonb),

  ('footer', '{
    "statement": "Independent software intelligence for UK finance teams.",
    "supporting": "SterlingPeak publishes editorial-grade comparisons, guides, and compliance analysis for accounting, payroll, and business operations."
  }'::jsonb),

  ('mega_menu', '{
    "softwareFeatured": {
      "title": "Sage vs Xero: Which is better for UK SMEs?",
      "description": "Compare features, pricing, payroll, VAT support, and reporting workflows.",
      "href": "/comparisons",
      "ctaLabel": "Read comparison"
    }
  }'::jsonb)
on conflict (key) do nothing;

-- ────────────────────────────────────────────────────────────────────────────
-- HERO COPY — re-apply on every run.
-- The block above uses `on conflict do nothing` so it will not overwrite a
-- previously seeded hero row. We deliberately update the hero key on every
-- run so the live site picks up editorial revisions to the headline.
-- ────────────────────────────────────────────────────────────────────────────

update public.site_settings
set value = '{
  "eyebrow": "Independent UK Finance Publication",
  "heading": "UK accounting and payroll software, reviewed properly.",
  "description": "Editorial reviews and head-to-head comparisons of Sage, Xero, QuickBooks, FreeAgent, and the payroll, VAT, and operations software UK SMEs actually run on. Written for HMRC, Making Tax Digital, and UK GAAP — not US tax law translated into pounds.",
  "ctaPrimaryLabel": "Read the comparisons",
  "ctaPrimaryHref": "/comparisons",
  "ctaSecondaryLabel": "Editorial guides",
  "ctaSecondaryHref": "/categories/accounting"
}'::jsonb,
    updated_at = now()
where key = 'hero';

-- ────────────────────────────────────────────────────────────────────────────
-- ADMIN USER
-- ────────────────────────────────────────────────────────────────────────────
-- Run AFTER creating the user in Supabase Authentication.
-- The handle_new_user trigger auto-creates the profile row.
-- This promotes the profile to admin.

update public.profiles
set role = 'admin'
where email = 'sharmawamiqa3@gmail.com';

-- ════════════════════════════════════════════════════════════════════════════
-- DONE. Admin creates articles, authors, and categories via the CMS.
-- No demo content seeded. Production-ready.
-- ════════════════════════════════════════════════════════════════════════════
