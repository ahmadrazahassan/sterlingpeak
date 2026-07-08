/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleRow } from "@/lib/queries/articles";
import { ActionButton } from "@/components/public/action-button";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   ArticleCard — the "framed tile" system.

   Every article sits on a raised white card with the artwork mounted
   inside a slim frame, gallery-style. The thumbnail is always full
   16:9 — the source artwork carries its own titles and branding, so
   it is never cropped, squared or clipped. The category floats as a
   glass chip pinned to the artwork itself.

   Variants:
     1. Hero       — full-width lead tile (huge image, big headline)
     2. Magazine   — wide split tile, artwork one side, type the other
     3. Feature    — large 2-up tile
     4. Standard   — 3-up grid tile
     5. Horizontal — compact row tile, artwork left
     6. Index      — numbered leaderboard row (lives inside a panel)
     7. Poster     — framed full-bleed artwork with overlay headline
   ────────────────────────────────────────────────────────────────── */

type BaseProps = {
  article: ArticleRow;
  className?: string;
};

/* ────── shared: the raised card surface ────── */

const surface = cn(
  "group relative flex flex-col overflow-hidden rounded-[1.4rem] bg-card p-1.5",
  "ring-1 ring-brand/[0.07]",
  "shadow-[0_1px_2px_rgba(0,55,72,0.05),0_24px_48px_-32px_rgba(0,55,72,0.35)]",
  "transition-[transform,box-shadow] duration-500 ease-out",
  "hover:-translate-y-1 hover:shadow-[0_1px_3px_rgba(0,55,72,0.08),0_36px_64px_-30px_rgba(0,55,72,0.45)]",
);

/* ────── shared: category chip pinned to the artwork ────── */

function CategoryChip({ article }: { article: ArticleRow }) {
  const categoryName = article.category?.name ?? null;
  // Hide the redundant Comparison chip when the article is already in
  // the Comparisons category.
  const showComparisonChip =
    article.is_comparison &&
    !(categoryName?.toLowerCase().includes("comparison") ?? false);

  if (!categoryName && !showComparisonChip) return null;

  return (
    <div className="pointer-events-none absolute left-3.5 top-3.5 z-10 flex flex-wrap items-center gap-2">
      {categoryName && (
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.16em] text-brand shadow-[0_2px_10px_rgba(0,55,72,0.15)] backdrop-blur-md">
          {categoryName}
        </span>
      )}
      {showComparisonChip && (
        <span className="rounded-full bg-cta px-3 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.16em] text-white shadow-[0_2px_10px_rgba(34,173,1,0.35)]">
          Comparison
        </span>
      )}
    </div>
  );
}

/* ────── shared: text eyebrow for tight placements without a chip ────── */

function TextEyebrow({ article }: { article: ArticleRow }) {
  if (!article.category) return null;
  return (
    <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.18em] text-accent">
      {article.category.name}
    </p>
  );
}

/* ────── shared: byline / reading time ────── */

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

/* ────── shared: framed 16:9 artwork ────── */

function FramedThumb({
  article,
  rounded = "rounded-[1rem]",
  chip = true,
  className,
}: {
  article: ArticleRow;
  rounded?: string;
  chip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden bg-brand/[0.05]",
        rounded,
        className,
      )}
    >
      {chip && <CategoryChip article={article} />}
      {article.thumbnail_url ? (
        <img
          src={article.thumbnail_url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-[650ms] ease-out group-hover:scale-[1.04]"
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

/* ────── shared: card footer — meta left, affordance right ────── */

function CardFooter({
  article,
  cta = false,
}: {
  article: ArticleRow;
  cta?: boolean;
}) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
      <Meta article={article} />
      {cta ? (
        <ActionButton asSpan variant="cta" size="sm">
          Read article
        </ActionButton>
      ) : (
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/[0.06] text-brand transition-colors duration-300 group-hover:bg-cta group-hover:text-white"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   1. HERO — full-width lead tile. Used once per section.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardHero({ article, className }: BaseProps) {
  return (
    <Link href={`/article/${article.slug}`} className={cn(surface, className)}>
      <FramedThumb article={article} rounded="rounded-[1.1rem]" />
      <div className="flex flex-1 flex-col px-5 pb-5 pt-7 md:px-8 md:pb-7 md:pt-9">
        <h3 className="max-w-3xl font-heading text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] text-brand transition-colors group-hover:text-accent md:text-[2.3rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <CardFooter article={article} cta />
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   2. MAGAZINE — wide split tile. Artwork mounted on one side, the
   typography set on the other.
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
        surface,
        "lg:grid lg:items-center lg:gap-2.5",
        reverse
          ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
          : "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]",
        className,
      )}
    >
      <FramedThumb
        article={article}
        rounded="rounded-[1.05rem]"
        className={cn(reverse && "lg:order-2")}
      />
      <div
        className={cn(
          "flex flex-col px-4 pb-4 pt-6 lg:px-9 lg:py-8",
          reverse && "lg:order-1",
        )}
      >
        <h3 className="font-heading text-[1.45rem] font-semibold leading-[1.14] tracking-[-0.014em] text-brand transition-colors group-hover:text-accent md:text-[1.8rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <ActionButton asSpan variant="cta" size="sm">
            Read article
          </ActionButton>
          <Meta article={article} />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   3. FEATURE — large 2-up tile.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardFeature({ article, className }: BaseProps) {
  return (
    <Link href={`/article/${article.slug}`} className={cn(surface, className)}>
      <FramedThumb article={article} />
      <div className="flex flex-1 flex-col px-4 pb-4 pt-6 md:px-5 md:pb-5">
        <h3 className="font-heading text-[1.35rem] font-semibold leading-[1.18] tracking-[-0.012em] text-brand transition-colors group-hover:text-accent md:text-[1.55rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <CardFooter article={article} cta />
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   4. STANDARD — 3-up grid tile.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardStandard({ article, className }: BaseProps) {
  return (
    <Link href={`/article/${article.slug}`} className={cn(surface, className)}>
      <FramedThumb article={article} />
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <h3 className="font-heading text-[1.15rem] font-semibold leading-[1.22] tracking-[-0.01em] text-brand transition-colors group-hover:text-accent line-clamp-3 md:text-[1.22rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <CardFooter article={article} />
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   5. HORIZONTAL — compact row tile. Full-width artwork on mobile,
   generous fixed-width artwork from sm up.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardHorizontal({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        surface,
        "p-2 sm:flex-row sm:items-center sm:gap-1",
        className,
      )}
    >
      <div className="w-full shrink-0 sm:w-[210px] md:w-[240px] lg:w-[270px]">
        <FramedThumb
          article={article}
          rounded="rounded-[0.85rem]"
          chip={false}
        />
      </div>
      <div className="min-w-0 flex-1 px-3.5 pb-3.5 pt-4 sm:py-3 sm:pl-5 sm:pr-4">
        <TextEyebrow article={article} />
        <h3 className="mt-2 font-heading text-[1.05rem] font-semibold leading-[1.24] tracking-[-0.008em] text-brand transition-colors group-hover:text-accent line-clamp-3 sm:text-[1.12rem]">
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
   6. INDEX — numbered leaderboard row. Designed to live inside a
   panel (rounded surface with row dividers), not to carry its own
   card surface.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardIndex({
  article,
  index,
  className,
}: BaseProps & { index: number }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-4 px-5 py-6 transition-colors hover:bg-page/70 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-6 md:px-7",
        className,
      )}
    >
      <span
        aria-hidden
        className="font-heading text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-brand/20 transition-colors duration-300 group-hover:text-cta md:text-[2rem]"
      >
        {String(index).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <TextEyebrow article={article} />
        <h3 className="mt-1.5 font-heading text-[1.05rem] font-semibold leading-[1.24] tracking-[-0.008em] text-brand transition-colors group-hover:text-accent line-clamp-2 md:text-[1.2rem]">
          {article.title}
        </h3>
        <div className="mt-2">
          <Meta article={article} />
        </div>
      </div>

      {/* Full-width artwork below the text on mobile, wide 16:9 on the right from sm up. */}
      <div className="col-span-2 w-full sm:col-span-1 sm:w-[270px] md:w-[330px] lg:w-[390px]">
        <FramedThumb
          article={article}
          rounded="rounded-[0.85rem]"
          chip={false}
        />
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   7. POSTER — framed full-bleed artwork with overlay headline.
   ────────────────────────────────────────────────────────────────── */

export function ArticleCardPoster({ article, className }: BaseProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(surface, "block", className)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.05rem] bg-brand/[0.05]">
        <CategoryChip article={article} />
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
        <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
          <h3 className="max-w-3xl font-heading text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.012em] text-white transition-transform duration-300 group-hover:-translate-y-0.5 md:text-[2.15rem] lg:text-[2.4rem]">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-4 hidden max-w-2xl text-[15px] leading-relaxed text-white/65 line-clamp-2 md:block">
              {article.excerpt}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <ActionButton asSpan variant="cta" size="md" tone="dark">
              Read article
            </ActionButton>
            <Meta article={article} tone="white" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ListPanel — the shared rounded surface that Index rows sit inside.
   Exported so sections can build leaderboards consistently.
   ────────────────────────────────────────────────────────────────── */

export function ListPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.4rem] bg-card ring-1 ring-brand/[0.07]",
        "shadow-[0_1px_2px_rgba(0,55,72,0.05),0_24px_48px_-32px_rgba(0,55,72,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SectionHeader — used across listings for consistent section
   openers. `tone="dark"` for sections set on the brand slab.
   ────────────────────────────────────────────────────────────────── */

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  ctaLabel = "View all",
  align = "default",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  align?: "default" | "center";
  tone?: "light" | "dark";
}) {
  const isCenter = align === "center";
  const isDark = tone === "dark";
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
        <h2
          className={cn(
            "mt-3 font-heading text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[2.75rem]",
            isDark ? "text-white" : "text-brand",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-[15.5px] leading-relaxed",
              isDark ? "text-white/60" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {href && (
        <div className="shrink-0 self-start md:self-end">
          <ActionButton
            href={href}
            variant="ghost"
            size="md"
            tone={isDark ? "dark" : "light"}
          >
            {ctaLabel}
          </ActionButton>
        </div>
      )}
    </div>
  );
}
