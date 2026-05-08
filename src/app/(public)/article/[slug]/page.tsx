/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/public/article-body";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { extractToc } from "@/lib/markdown";
import {
  fetchArticleBySlug,
  fetchRelatedArticles,
} from "@/lib/queries/articles";
import { JsonLd } from "@/components/public/json-ld";
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) notFound();

  const related = await fetchRelatedArticles(article.id);
  const toc = extractToc(article.content);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sterlingpeak.uk";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: article.author
      ? { "@type": "Person", name: article.author.name }
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
      <div className="border-b border-border-subtle bg-page/60">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              article.category
                ? { label: article.category.name, href: `/categories/${article.category.slug}` }
                : { label: "Insights", href: "/categories/small-business-guides" },
              { label: article.title },
            ]}
          />
          {article.category && (
            <Badge variant="accent" className="mt-4">
              {article.category.name}
            </Badge>
          )}
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight text-brand md:text-5xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{article.excerpt}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {article.author && (
              <Link
                href={`/authors/${article.author.slug}`}
                className="font-medium text-brand hover:text-accent"
              >
                {article.author.name}
              </Link>
            )}
            {article.published_at && (
              <span>
                Updated{" "}
                {new Date(article.updated_at).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
            {article.reading_time != null && (
              <span>{article.reading_time} min read</span>
            )}
          </div>
          {article.affiliate_disclosure_required && (
            <p className="mt-6 max-w-3xl rounded-2xl border border-border-subtle bg-card px-4 py-3 text-sm text-muted-foreground">
              <strong className="text-brand">Disclosure:</strong> SterlingPeak may earn a
              commission when you use partner links on this page. Editorial judgments stay
              independent and practical for UK SMEs.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[minmax(0,1fr)_260px] md:gap-14 md:px-8">
        <article className="min-w-0">
          {article.thumbnail_url && (
            <div className="mb-10 overflow-hidden rounded-[1.5rem] border border-border-subtle">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.thumbnail_url}
                alt=""
                className="w-full object-cover"
              />
            </div>
          )}
          <ArticleBody content={article.content} />
        </article>
        <aside className="hidden md:block">
          {toc.length > 0 && (
            <nav
              aria-label="On this page"
              className="sticky top-28 rounded-[1.25rem] border border-border-subtle bg-card p-5 shadow-card"
            >
              <p className="text-xs font-heading font-semibold uppercase tracking-wide text-muted-foreground">
                On this page
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id} style={{ paddingLeft: item.level === 3 ? "0.75rem" : 0 }}>
                    <a href={`#${item.id}`} className="text-muted-foreground hover:text-brand">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border-subtle bg-page/40 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-heading text-2xl font-semibold text-brand">Related</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((a) => (
                <Link key={a.id} href={`/article/${a.slug}`}>
                  <Card className="h-full border-border-subtle transition-shadow hover:shadow-card">
                    <CardContent className="p-5">
                      <p className="font-heading font-semibold text-brand">{a.title}</p>
                      {a.excerpt && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {a.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <Card className="border-border-subtle bg-brand text-white">
          <CardContent className="p-8">
            <h2 className="font-heading text-xl font-semibold">Weekly intelligence</h2>
            <p className="mt-2 max-w-lg text-sm text-white/80">
              Comparisons, tax updates, and operational guides for UK SMEs.
            </p>
            <NewsletterForm source={`article-${slug}`} variant="dark" className="mt-6 max-w-md" />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
