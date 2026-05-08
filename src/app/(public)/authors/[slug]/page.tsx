import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { fetchArticlesByAuthor, fetchAuthorBySlug } from "@/lib/queries/authors";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await fetchAuthorBySlug(slug);
  if (!author) return { title: "Author" };
  return {
    title: `${author.name} | SterlingPeak`,
    description: author.bio ?? undefined,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await fetchAuthorBySlug(slug);
  if (!author) notFound();

  const articles = await fetchArticlesByAuthor(author.id);

  return (
    <div>
      <section className="border-b border-border-subtle bg-page/50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: author.name },
            ]}
          />
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-border-subtle bg-card">
              {author.avatar_url ? (
                <img
                  src={author.avatar_url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-heading text-muted-foreground">
                  {author.name.slice(0, 1)}
                </div>
              )}
            </div>
            <div>
              <h1 className="font-heading text-4xl font-semibold text-brand">{author.name}</h1>
              {author.role && (
                <p className="mt-1 text-sm font-medium text-accent">{author.role}</p>
              )}
              {author.bio && (
                <p className="mt-4 max-w-2xl text-muted-foreground">{author.bio}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {author.linkedin_url && (
                  <a href={author.linkedin_url} className="text-accent hover:underline">
                    LinkedIn
                  </a>
                )}
                {author.twitter_url && (
                  <a href={author.twitter_url} className="text-accent hover:underline">
                    X
                  </a>
                )}
                {author.website_url && (
                  <a href={author.website_url} className="text-accent hover:underline">
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <h2 className="font-heading text-xl font-semibold text-brand">Articles</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(articles as { id: string; title: string; slug: string; excerpt: string | null }[]).map(
            (a) => (
              <Link key={a.id} href={`/article/${a.slug}`}>
                <Card className="h-full border-border-subtle hover:shadow-card">
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
            ),
          )}
        </div>
        {articles.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">No published articles yet.</p>
        )}
      </div>
    </div>
  );
}
