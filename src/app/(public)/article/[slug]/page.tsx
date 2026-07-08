/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/public/article-body";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { ArticleCardStandard } from "@/components/public/article-card";
import { JsonLd } from "@/components/public/json-ld";
import {
  fetchArticleBySlug,
  fetchRelatedArticles,
} from "@/lib/queries/articles";
import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) return { title: "Article" };
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sterlingpeak.uk";
  return {
    title: article.meta_title ?? article.title,
    description: article.meta_description ?? article.excerpt ?? undefined,
    alternates: article.canonical_url
      ? { canonical: article.canonical_url }
      : { canonical: `${site}/article/${article.slug}` },
    openGraph: {
      title: article.meta_title ?? article.title,
      description: article.meta_description ?? article.excerpt ?? undefined,
      type: "article",
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at,
    },
  };
}

const ukDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const ukShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) notFound();

  const related = await fetchRelatedArticles(article.id);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sterlingpeak.uk";

  /* Always show inline disclosure on commercial pieces (Sage compliance baseline). */
  const isCommercial =
    article.affiliate_disclosure_required ||
    article.is_comparison ||
    /\b(sage|xero|quickbooks|freeagent|brightpay|moneysoft|hibob|bamboohr|pleo|expensify|gocardless|stripe)\b/i.test(
      `${article.title} ${article.excerpt ?? ""}`,
    );

  const verifiedOn = article.updated_at ?? article.published_at ?? "";

  /* Always render the editor's real headshot. If the DB row carries an
     avatar_url we prefer that; otherwise we fall back to the local portrait
     so SterlingPeak articles never render with empty initials. */
  const authorPortrait =
    article.author?.avatar_url ?? "/Ayesha.jpeg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.name,
          url: `${site}/authors/${article.author.slug}`,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "SterlingPeak",
      url: site,
    },
    mainEntityOfPage: `${site}/article/${article.slug}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ── HEADER STRIP ── */}
      <div className="border-b border-border-subtle bg-page">
        <div className="mx-auto max-w-5xl px-5 pt-10 md:px-8 md:pt-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              article.category
                ? {
                    label: article.category.name,
                    href: `/categories/${article.category.slug}`,
                  }
                : { label: "Insights", href: "/categories/small-business-guides" },
              { label: article.title },
            ]}
          />
        </div>

        {/* ── HERO ── */}
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-8 md:px-8 md:pb-16">
          {article.category && (
            <Link
              href={`/categories/${article.category.slug}`}
              className="inline-flex items-center gap-2 text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta"
            >
              <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-[1.5px] bg-cta" />
              {article.category.name}
            </Link>
          )}
          <h1 className="mt-5 max-w-4xl font-heading text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.022em] text-brand md:text-[3.25rem] lg:text-[3.5rem]">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-6 max-w-3xl text-[1.1rem] leading-relaxed text-muted-foreground md:text-[1.2rem]">
              {article.excerpt}
            </p>
          )}

          {/* Byline strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border-subtle pt-6 text-[12.5px] text-muted-foreground">
            {article.author && (
              <Link
                href={`/authors/${article.author.slug}`}
                className="inline-flex items-center gap-2 font-heading font-medium text-brand transition-colors hover:text-cta"
              >
                <img
                  src={authorPortrait}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover ring-1 ring-inset ring-brand/10"
                />
                {article.author.name}
              </Link>
            )}
            {article.author && (
              <span aria-hidden className="hidden h-3 w-px bg-brand/15 sm:inline-block" />
            )}
            {article.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <span className="text-brand/55">Published</span>
                {ukShortDate(article.published_at)}
              </span>
            )}
            {article.updated_at && article.updated_at !== article.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <span className="text-brand/55">Updated</span>
                {ukShortDate(article.updated_at)}
              </span>
            )}
            {article.reading_time != null && (
              <>
                <span aria-hidden className="hidden h-3 w-px bg-brand/15 sm:inline-block" />
                <span>{article.reading_time} min read</span>
              </>
            )}
          </div>

          {/* Inline affiliate disclosure — always shown for commercial pieces */}
          {isCommercial && verifiedOn && (
            <div className="mt-7 max-w-4xl rounded-2xl border border-cta/15 bg-cta/[0.05] px-5 py-4">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cta/15 text-cta"
                >
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <p className="text-[13px] leading-relaxed text-brand/85">
                  <span className="font-heading font-semibold text-brand">
                    Disclosure.
                  </span>{" "}
                  This article contains affiliate links to UK software products,
                  including Sage UK. SterlingPeak may earn a referral commission
                  if you sign up for a paid plan, at no extra cost to you.
                  Commission never decides which products we recommend or how we
                  score them. Pricing was last verified on{" "}
                  <strong className="text-brand">{ukDate(verifiedOn)}</strong>.
                  Read the full{" "}
                  <Link
                    href="/editorial-policy"
                    className="text-cta underline-offset-2 hover:underline"
                  >
                    Editorial Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/affiliate-disclosure"
                    className="text-cta underline-offset-2 hover:underline"
                  >
                    Affiliate Disclosure
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── COVER IMAGE — wide, FT-scale ── */}
      {article.thumbnail_url && (
        <div className="mx-auto max-w-6xl px-5 pt-10 md:px-8 md:pt-14">
          <div className="overflow-hidden rounded-[1.5rem] border border-border-subtle bg-brand/[0.03] md:rounded-[2rem]">
            <img
              src={article.thumbnail_url}
              alt=""
              className="w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ── ARTICLE BODY ── */}
      <article className="mx-auto max-w-[920px] px-5 py-14 md:px-8 md:py-20">
        <ArticleBody content={article.content} />

        {/* Pricing verification footer */}
        {verifiedOn && (
          <div className="mt-14 rounded-2xl border border-border-subtle bg-card px-5 py-4">
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              <span className="font-heading font-semibold text-brand">
                Pricing &amp; product details verified on{" "}
                {ukDate(verifiedOn)}.
              </span>{" "}
              SterlingPeak re-verifies vendor pricing each VAT cycle. Features
              and pricing may have changed since, so confirm directly with the
              provider before purchase.
            </p>
          </div>
        )}

        {/* Author bio block */}
        {article.author && (
          <div className="mt-14 border-t border-border-subtle pt-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
              <img
                src={authorPortrait}
                alt={article.author.name}
                className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-inset ring-brand/10"
              />
              <div className="min-w-0">
                <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                  Written by
                </p>
                <p className="mt-1.5 font-heading text-[1.2rem] font-semibold tracking-[-0.008em] text-brand">
                  {article.author.name}
                </p>
                <p className="mt-1 text-[13px] font-medium text-cta">
                  Founder &amp; Editor-in-Chief, SterlingPeak
                </p>
                <p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-muted-foreground">
                  Ayesha covers UK accounting software, payroll and Making Tax
                  Digital for sole traders, SMEs and finance teams, writing from
                  Greater Manchester, England.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] font-heading font-medium">
                  <Link
                    href={`/authors/${article.author.slug}`}
                    className="text-brand transition-colors hover:text-cta"
                  >
                    All articles by Ayesha →
                  </Link>
                  <Link
                    href="/contact"
                    className="text-brand/55 transition-colors hover:text-cta"
                  >
                    Contact the editor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="border-t border-border-subtle bg-card/40 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
              Continue reading
            </p>
            <h2 className="mt-3 font-heading text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.014em] text-brand md:text-[2.25rem]">
              Related from the desk
            </h2>
            <div className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {related.slice(0, 3).map((a) => (
                <ArticleCardStandard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
