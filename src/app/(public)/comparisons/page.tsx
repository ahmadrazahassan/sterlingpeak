import Link from "next/link";
import { fetchComparisonsForListing } from "@/lib/queries/articles";
import { fetchActiveCategories } from "@/lib/queries/categories";
import {
  ArticleCardFeature,
  ArticleCardPoster,
  ArticleCardStandard,
} from "@/components/public/article-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business software comparisons for UK SMEs",
  description:
    "Compare accounting, payroll, HR, ERP, and finance tools using practical criteria built around real business needs.",
};

type SearchParams = Promise<{ category?: string }>;

export default async function ComparisonsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: catFilter } = await searchParams;
  const [articles, categories] = await Promise.all([
    fetchComparisonsForListing(),
    fetchActiveCategories(),
  ]);

  const filtered = catFilter
    ? articles.filter((a) => a.category?.slug === catFilter)
    : articles;

  const lead = filtered[0];
  const featureRow = filtered.slice(1, 3); // 2-up below the poster
  const rest = filtered.slice(3);

  return (
    <div>
      {/* ── HEADER ── */}
      <section className="border-b border-border-subtle bg-page/50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            Comparisons
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.022em] text-brand md:text-[3.5rem]">
            Business software comparisons for UK SMEs
          </h1>
          <p className="mt-6 max-w-3xl text-[1.1rem] leading-relaxed text-muted-foreground">
            Side-by-side analysis of UK accounting, payroll, HR, and ERP tools —
            evaluated on real pricing, MTD compliance, feature depth, and
            operational fit. Updated as products and HMRC rules change.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            <FilterChip href="/comparisons" active={!catFilter} label="All" />
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                href={`/comparisons?category=${c.slug}`}
                active={catFilter === c.slug}
                label={c.name}
              />
            ))}
          </div>

          <p className="mt-7 text-[12.5px] text-muted-foreground/85">
            Every comparison evaluates real pricing, UK compliance support,
            feature depth, and operational fit.{" "}
            <Link
              href="/editorial-policy"
              className="text-accent underline-offset-2 hover:underline"
            >
              Read our methodology
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-6 py-20 md:px-8 md:py-24">
        {filtered.length === 0 && (
          <div className="rounded-[1.75rem] border border-border-subtle bg-card p-12 text-center">
            <p className="font-heading text-xl font-semibold text-brand">
              No comparisons match this filter yet
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-muted-foreground">
              Try removing the filter or check back as we publish new analysis.
            </p>
          </div>
        )}

        {/* Lead poster */}
        {lead && (
          <section>
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
              Featured comparison
            </p>
            <div className="mt-6">
              <ArticleCardPoster article={lead} />
            </div>
          </section>
        )}

        {/* Feature row (2-up, larger cards) */}
        {featureRow.length > 0 && (
          <section>
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
              Most read this week
            </p>
            <h2 className="mt-3 font-heading text-[1.85rem] font-semibold leading-tight tracking-[-0.014em] text-brand md:text-[2.25rem]">
              Practical comparisons UK readers are using
            </h2>
            <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-14">
              {featureRow.map((a) => (
                <ArticleCardFeature key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* Rest of grid (3-up Standard) */}
        {rest.length > 0 && (
          <section>
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
              All comparisons
            </p>
            <h2 className="mt-3 font-heading text-[1.85rem] font-semibold leading-tight tracking-[-0.014em] text-brand md:text-[2.25rem]">
              Full library
            </h2>
            <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {rest.map((a) => (
                <ArticleCardStandard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "inline-flex items-center rounded-full bg-brand px-4 py-2 text-[13px] font-heading font-semibold text-white transition-colors"
          : "inline-flex items-center rounded-full border border-border-subtle bg-card px-4 py-2 text-[13px] font-heading font-medium text-brand/75 transition-colors hover:border-accent/40 hover:text-accent"
      }
    >
      {label}
    </Link>
  );
}
