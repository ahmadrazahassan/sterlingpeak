-- SterlingPeak initial schema (spec §25)
-- Run in Supabase SQL editor or via supabase db push

-- Extensions
create extension if not exists "pgcrypto";

-- Profiles (admin metadata, §25 profiles)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  hero_title text,
  seo_title text,
  seo_description text,
  icon text,
  color text,
  parent_id uuid references public.categories (id) on delete set null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  bio text,
  role text,
  avatar_url text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  expertise text[],
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  category_id uuid references public.categories (id) on delete set null,
  author_id uuid references public.authors (id) on delete set null,
  thumbnail_url text,
  meta_title text,
  meta_description text,
  canonical_url text,
  reading_time integer,
  status text not null default 'draft' check (status in ('draft', 'published')),
  article_type text not null default 'guide',
  is_featured boolean not null default false,
  is_comparison boolean not null default false,
  affiliate_disclosure_required boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.article_tags (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  tag text not null
);

create table public.related_articles (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  related_article_id uuid not null references public.articles (id) on delete cascade,
  unique (article_id, related_article_id)
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  source text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  subject text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  cloudinary_public_id text,
  url text not null,
  secure_url text,
  format text,
  width integer,
  height integer,
  bytes integer,
  alt_text text,
  created_at timestamptz not null default now()
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Updated_at triggers
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger categories_updated_at before update on public.categories
  for each row execute function public.set_updated_at();
create trigger authors_updated_at before update on public.authors
  for each row execute function public.set_updated_at();
create trigger articles_updated_at before update on public.articles
  for each row execute function public.set_updated_at();
create trigger site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

-- New user → profile
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: admin check (avoid recursion in policies)
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

grant usage on schema public to anon, authenticated;

-- RLS
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

-- profiles: users read own; admins read all
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin(auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());
create policy "profiles_admin_all" on public.profiles
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- categories
create policy "categories_public_read_active" on public.categories
  for select using (is_active = true or public.is_admin(auth.uid()));
create policy "categories_admin_write" on public.categories
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- authors
create policy "authors_public_read_active" on public.authors
  for select using (is_active = true or public.is_admin(auth.uid()));
create policy "authors_admin_write" on public.authors
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- articles
create policy "articles_public_read_published" on public.articles
  for select using (status = 'published' or public.is_admin(auth.uid()));
create policy "articles_admin_write" on public.articles
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- article_tags (visible if article visible)
create policy "article_tags_select" on public.article_tags
  for select using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and (a.status = 'published' or public.is_admin(auth.uid()))
    )
  );
create policy "article_tags_admin_all" on public.article_tags
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- related_articles
create policy "related_articles_select" on public.related_articles
  for select using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and (a.status = 'published' or public.is_admin(auth.uid()))
    )
  );
create policy "related_articles_admin_all" on public.related_articles
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- newsletter: public insert; admin read
create policy "newsletter_insert_public" on public.newsletter_subscribers
  for insert with check (true);
create policy "newsletter_admin_select" on public.newsletter_subscribers
  for select using (public.is_admin(auth.uid()));
create policy "newsletter_admin_update" on public.newsletter_subscribers
  for update using (public.is_admin(auth.uid()));

-- contact: public insert; admin all
create policy "contact_insert_public" on public.contact_messages
  for insert with check (true);
create policy "contact_admin_all" on public.contact_messages
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- media_assets: admin only
create policy "media_admin_all" on public.media_assets
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- site_settings: public read; admin write
create policy "site_settings_public_read" on public.site_settings
  for select using (true);
create policy "site_settings_admin_write" on public.site_settings
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Indexes
create index idx_articles_category on public.articles (category_id);
create index idx_articles_status_published on public.articles (status, published_at desc);
create index idx_articles_featured on public.articles (is_featured) where status = 'published';
create index idx_articles_comparison on public.articles (is_comparison) where status = 'published';
create index idx_article_tags_article on public.article_tags (article_id);
create index idx_related_article on public.related_articles (article_id);
