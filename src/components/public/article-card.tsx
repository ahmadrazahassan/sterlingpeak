/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleRow } from "@/lib/queries/articles";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   ArticleCard variants
   The whole site uses these. Each variant has a distinct visual
   weight so different sections of the site read as different sections,
   not a single repeating grid.
   ────────────────────────────────────────────────────────────────── */

type BaseProps = {
  article: ArticleRow;
  className?: string;
};

/* ---- shared bits ---- */

function Eyebrow({ article, tone = "accent" }: { article: ArticleRow; tone?: "accent" | "white" }) {
  const color = tone === "white" ? "text-white/85" : "text-accent";
  return (
    <div className="flex items-center gap-2">
      {article.category && (
        <span
          className={cn(
            "text-[10px] font-heading font-semibold uppercase tracking-[0.16em]",
            color,
          )}
        >
          {article.category.name}
        </span>
      )}
      {article.is_comparison && (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[9.5px] font-heading font-semibold uppercase tracking-[0.14em]",
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

function Meta({ article, tone = "muted" }: { article: ArticleRow; tone?: "muted" | "white" }) {
  const color = tone === "white" ? "text-white/55" : "text-muted-foreground";
  const parts: string[] = [];
  if (article.author?.name) parts.push(article.author.name);
  if (article.reading_time) parts.push(`${article.reading_time} min read`);
  if (parts.length === 0) return null;
  return <p className={cn("text-[12px]", color)}>{parts.join("  ·  ")}</p>;
}

function Thumb({
  article,
  ratio = "aspect-[16/10]",
  className,
}: {
  article: ArticleRow;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-brand/[0.04]",
        ratio,
        className,
      )}
    >
      {article.thumbnail_url ? (
        <img
          src={article.thumbnail_url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="font-heading text-3xl font-semibold text-brand/15">
            SterlingPeak
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   1. HERO — the lead post. Massive image, large headline, used once
   per page. 16:9 image, full bleed inside container.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardHero({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn("group block", className)}
    >
      <Thumb
        article={article}
        ratio="aspect-[16/9] md:aspect-[21/10]"
        className="rounded-[1.75rem]"
      />
      <div className="mt-7 max-w-3xl">
        <Eyebrow article={article} />
        <h3 className="mt-3 font-heading text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.02em] text-brand transition-colors group-hover:text-accent md:text-[2.25rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-3">
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
   2. FEATURE — used in 2-up grids. 4:3 image, mid-weight headline.
   Sits between hero and standard.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardFeature({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn("group block", className)}
    >
      <Thumb article={article} ratio="aspect-[4/3]" />
      <div className="mt-5">
        <Eyebrow article={article} />
        <h3 className="mt-2.5 font-heading text-[1.4rem] font-semibold leading-[1.18] tracking-[-0.012em] text-brand transition-colors group-hover:text-accent md:text-[1.55rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground line-clamp-2">
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
   3. STANDARD — used in 3-up grids. 3:2 image. Generous but not large.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardStandard({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn("group block", className)}
    >
      <Thumb article={article} ratio="aspect-[3/2]" />
      <div className="mt-4">
        <Eyebrow article={article} />
        <h3 className="mt-2 font-heading text-[1.15rem] font-semibold leading-[1.22] tracking-[-0.01em] text-brand transition-colors group-hover:text-accent line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="mt-3.5">
          <Meta article={article} />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   4. HORIZONTAL — image on left, text on right. Used in tight column
   layouts where a full grid card would feel too tall.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardHorizontal({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "group flex gap-5 rounded-2xl border border-transparent p-2.5 transition-colors hover:border-border-subtle hover:bg-card/60",
        className,
      )}
    >
      <div className="relative h-[120px] w-[170px] shrink-0 overflow-hidden rounded-xl bg-brand/[0.04] sm:h-[136px] sm:w-[200px]">
        {article.thumbnail_url ? (
          <img
            src={article.thumbnail_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-medium text-brand/20">
            SterlingPeak
          </div>
        )}
      </div>
      <div className="min-w-0 self-center">
        <Eyebrow article={article} />
        <h3 className="mt-2 font-heading text-[1.05rem] font-semibold leading-[1.22] tracking-[-0.008em] text-brand transition-colors group-hover:text-accent line-clamp-2 sm:text-[1.15rem]">
          {article.title}
        </h3>
        <div className="mt-2.5">
          <Meta article={article} />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   5. POSTER — overlay title on the image. Used for highest-impact
   placements (top-of-section, comparisons hero).
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardPoster({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn("group relative block overflow-hidden rounded-[1.75rem]", className)}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand/[0.05]">
        {article.thumbnail_url ? (
          <img
            src={article.thumbnail_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand">
            <span className="font-heading text-4xl font-semibold text-white/15">
              SterlingPeak
            </span>
          </div>
        )}
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <Eyebrow article={article} tone="white" />
          <h3 className="mt-3 max-w-2xl font-heading text-[1.5rem] font-semibold leading-[1.14] tracking-[-0.012em] text-white transition-transform duration-300 group-hover:translate-y-[-2px] md:text-[2rem]">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-3 hidden max-w-xl text-[14.5px] leading-relaxed text-white/65 line-clamp-2 md:block">
              {article.excerpt}
            </p>
          )}
          <div className="mt-5 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-heading font-semibold text-brand">
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
   Section header — used across all listings for consistency.
   ────────────────────────────────────────────────────────────────── */

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  ctaLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 font-heading text-[2rem] font-semibold leading-[1.1] tracking-[-0.018em] text-brand md:text-[2.5rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
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
