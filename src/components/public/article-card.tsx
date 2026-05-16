/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleRow } from "@/lib/queries/articles";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   ArticleCard — visual system for SterlingPeak.

   All thumbnail variants are 16:9 to match the source artwork
   so the embedded titles and branding inside the thumbnail are
   never clipped. Sizes are tuned to feel like a professional
   UK finance publication rather than a generic blog grid.

   Variants:
     1. Hero       — lead post on a section (massive image + big headline)
     2. Magazine   — wide horizontal split, image on one side
     3. Feature    — primary 2-up card
     4. Standard   — 3-up grid card
     5. Horizontal — compact image-left, text-right
     6. Poster     — full-bleed image with overlay title (highest impact)
   ────────────────────────────────────────────────────────────────── */

type BaseProps = {
  article: ArticleRow;
  className?: string;
};

/* ────── shared bits ────── */

function Eyebrow({
  article,
  tone = "accent",
}: {
  article: ArticleRow;
  tone?: "accent" | "white";
}) {
  const color = tone === "white" ? "text-white/85" : "text-accent";
  return (
    <div className="flex items-center gap-2.5">
      {article.category && (
        <span
          className={cn(
            "text-[11px] font-heading font-semibold uppercase tracking-[0.18em]",
            color,
          )}
        >
          {article.category.name}
        </span>
      )}
      {article.is_comparison && (
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[10px] font-heading font-semibold uppercase tracking-[0.14em]",
            tone === "white"
              ? "bg-white/15 text-white/90"
              : "bg-cta/10 text-cta",
          )}
        >
          Comparison
        </span>
      )}
    </div>
  );
}

function Meta({
  article,
  tone = "muted",
  size = "sm",
}: {
  article: ArticleRow;
  tone?: "muted" | "white";
  size?: "sm" | "md";
}) {
  const color = tone === "white" ? "text-white/55" : "text-muted-foreground";
  const text = size === "md" ? "text-[13.5px]" : "text-[12.5px]";
  const parts: string[] = [];
  if (article.author?.name) parts.push(article.author.name);
  if (article.reading_time) parts.push(`${article.reading_time} min read`);
  if (parts.length === 0) return null;
  return <p className={cn(text, color)}>{parts.join("  ·  ")}</p>;
}

function Thumb({
  article,
  ratio = "aspect-[16/9]",
  rounded = "rounded-[1.25rem]",
  className,
}: {
  article: ArticleRow;
  ratio?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-brand/[0.04] ring-1 ring-inset ring-brand/[0.04]",
        ratio,
        rounded,
        className,
      )}
    >
      {article.thumbnail_url ? (
        <img
          src={article.thumbnail_url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-heading text-3xl font-semibold text-brand/15">
            SterlingPeak
          </span>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   1. HERO — section lead. Massive 16:9 image with editorial headline
   directly underneath. Used once per section.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardHero({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn("group block", className)}
    >
      <Thumb
        article={article}
        ratio="aspect-[16/9]"
        rounded="rounded-[1.5rem] md:rounded-[2rem]"
      />
      <div className="mt-8 max-w-3xl md:mt-10">
        <Eyebrow article={article} />
        <h3 className="mt-4 font-heading text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.022em] text-brand transition-colors group-hover:text-accent md:text-[2.5rem] lg:text-[2.75rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="mt-6">
          <Meta article={article} size="md" />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   2. MAGAZINE — wide horizontal split. One large image on the left,
   typography on the right. Used as a full-width single card to break
   the rhythm of grids.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardMagazine({
  article,
  className,
  reverse = false,
}: BaseProps & { reverse?: boolean }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "group grid items-center gap-10 lg:gap-14",
        reverse
          ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
          : "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]",
        className,
      )}
    >
      <Thumb
        article={article}
        ratio="aspect-[16/9]"
        rounded="rounded-[1.5rem] md:rounded-[2rem]"
        className={cn(reverse ? "lg:order-2" : "")}
      />
      <div className={cn("max-w-xl", reverse ? "lg:order-1" : "")}>
        <Eyebrow article={article} />
        <h3 className="mt-4 font-heading text-[1.5rem] font-semibold leading-[1.14] tracking-[-0.014em] text-brand transition-colors group-hover:text-accent md:text-[1.85rem] lg:text-[2rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="mt-6 flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-heading font-semibold text-cta">
            Read article
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="h-1 w-1 rounded-full bg-brand/15" aria-hidden />
          <Meta article={article} />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   3. FEATURE — primary 2-up card. Strong 16:9 image and a confident
   editorial headline.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardFeature({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn("group block", className)}
    >
      <Thumb article={article} ratio="aspect-[16/9]" rounded="rounded-[1.5rem]" />
      <div className="mt-6">
        <Eyebrow article={article} />
        <h3 className="mt-3 font-heading text-[1.5rem] font-semibold leading-[1.16] tracking-[-0.012em] text-brand transition-colors group-hover:text-accent md:text-[1.7rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-3.5 text-[15px] leading-relaxed text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="mt-5">
          <Meta article={article} />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   4. STANDARD — 3-up grid card. 16:9 image (matches source artwork
   so nothing is cropped). Generous typography below.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardStandard({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn("group block", className)}
    >
      <Thumb article={article} ratio="aspect-[16/9]" rounded="rounded-[1.25rem]" />
      <div className="mt-5">
        <Eyebrow article={article} />
        <h3 className="mt-2.5 font-heading text-[1.2rem] font-semibold leading-[1.2] tracking-[-0.01em] text-brand transition-colors group-hover:text-accent line-clamp-3 md:text-[1.3rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="mt-4">
          <Meta article={article} />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   5. HORIZONTAL — compact card with the image on the left.
   Designed for narrow rails next to a hero post.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardHorizontal({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "group flex gap-6 rounded-2xl border border-transparent p-3 transition-colors hover:border-border-subtle hover:bg-card/70",
        className,
      )}
    >
      <div className="relative aspect-[16/9] w-[180px] shrink-0 overflow-hidden rounded-xl bg-brand/[0.04] ring-1 ring-inset ring-brand/[0.04] sm:w-[230px] md:w-[260px]">
        {article.thumbnail_url ? (
          <img
            src={article.thumbnail_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-medium text-brand/20">
            SterlingPeak
          </div>
        )}
      </div>
      <div className="min-w-0 self-center">
        <Eyebrow article={article} />
        <h3 className="mt-2.5 font-heading text-[1.1rem] font-semibold leading-[1.22] tracking-[-0.008em] text-brand transition-colors group-hover:text-accent line-clamp-3 sm:text-[1.2rem]">
          {article.title}
        </h3>
        <div className="mt-3">
          <Meta article={article} />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   6. POSTER — full-bleed image with overlay headline. Used for the
   highest-impact placements (lead of the comparisons section, lead
   of a category page).
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardPoster({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-[1.5rem] md:rounded-[2rem]",
        className,
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand/[0.05]">
        {article.thumbnail_url ? (
          <img
            src={article.thumbnail_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand">
            <span className="font-heading text-4xl font-semibold text-white/15">
              SterlingPeak
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7 md:p-10 lg:p-12">
          <Eyebrow article={article} tone="white" />
          <h3 className="mt-4 max-w-3xl font-heading text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.012em] text-white transition-transform duration-300 group-hover:translate-y-[-2px] md:text-[2.25rem] lg:text-[2.5rem]">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-4 hidden max-w-2xl text-[15px] leading-relaxed text-white/65 line-clamp-2 md:block">
              {article.excerpt}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-heading font-semibold text-brand transition-transform duration-300 group-hover:translate-x-1">
              Read article <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
            <Meta article={article} tone="white" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SectionHeader — used across listings for consistent section openers.
   ────────────────────────────────────────────────────────────────── */

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  ctaLabel = "View all",
  align = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  align?: "default" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:gap-8",
        isCenter
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", isCenter && "mx-auto")}>
        {eyebrow && (
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 font-heading text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.02em] text-brand md:text-[2.75rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border-subtle bg-card px-5 py-2.5 text-[13px] font-heading font-semibold text-brand transition-colors hover:border-accent/40 hover:text-accent md:self-end"
        >
          {ctaLabel}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}
