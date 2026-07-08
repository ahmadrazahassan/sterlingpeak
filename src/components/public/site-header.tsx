"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { MAIN_NAV } from "@/lib/nav";
import { Logo } from "@/components/public/logo";
import { SearchOverlay } from "@/components/public/search-overlay";
import { cn } from "@/lib/utils";

export type MegaFeatured = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

type ComparisonPreview = {
  title: string;
  slug: string;
  excerpt: string | null;
};

type Props = {
  softwareFeatured: MegaFeatured;
  comparisonArticles: ComparisonPreview[];
};

/* ──────────────────────────────────────────────────────────────────
   SterlingPeak masthead — "The Index".

   A private-bank / broadsheet approach to navigation. The resting
   bar withholds: a centred wordmark flanked by two quiet controls —
   Index on the left, Search on the right. No link row, no dropdown
   carets, no coloured button. It is silent at the top of the page
   and gains a hairline + blur only once the reader scrolls.

   All wayfinding lives behind the Index: a full-viewport editorial
   contents page where the site's categories are set as a numbered
   broadsheet index, beside an editor's desk drawn from live data.

   The same control serves every breakpoint — there is no separate
   mobile hamburger. One idea, executed once.
   ────────────────────────────────────────────────────────────────── */

/* One-line editorial notes for each primary category. Keyed by the
   MAIN_NAV label so the hrefs stay a single source of truth in nav.ts. */
const CATEGORY_NOTE: Record<string, string> = {
  Accounting: "Cloud ledgers, bookkeeping and MTD-ready accounts",
  Software: "The business software stack UK firms actually run",
  Comparisons: "Head-to-head verdicts on price, features and fit",
  Payroll: "PAYE, RTI, pensions and people operations",
  "Tax & VAT": "VAT schemes, Making Tax Digital and HMRC compliance",
  Guides: "Practical playbooks for founders and finance teams",
  Industries: "Sector-specific software for how your trade works",
};

const EDITORIAL_LINKS = [
  { href: "/about", label: "About" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/affiliate-disclosure", label: "Disclosure" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/cookie-policy", label: "Cookies" },
];

export function SiteHeader({ softwareFeatured, comparisonArticles }: Props) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Hairline + blur fade in only after the reader leaves the top. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body-scroll lock while the Index is open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes the Index. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-border-subtle bg-page/85 backdrop-blur-md supports-[backdrop-filter]:bg-page/70"
            : "border-b border-transparent bg-page",
        )}
      >
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
          {/* ── LEFT: Index trigger ── */}
          <div className="justify-self-start">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-index"
              className="group -ml-2 inline-flex items-center gap-3 rounded-full px-2 py-2 text-brand transition-colors hover:text-cta"
            >
              <TwoLineGlyph active={open} />
              <span className="hidden text-[11px] font-heading font-semibold uppercase tracking-[0.24em] sm:inline">
                Index
              </span>
            </button>
          </div>

          {/* ── CENTER: Masthead ── */}
          <div className="justify-self-center">
            <Link
              href="/"
              aria-label="SterlingPeak — home"
              className="inline-flex items-baseline"
            >
              <Logo variant="full" size="md" asLink={false} />
              <span
                aria-hidden
                className="ml-1 self-start font-heading text-[10px] font-medium leading-none text-brand/35"
              >
                ®
              </span>
            </Link>
          </div>

          {/* ── RIGHT: Search ── */}
          <div className="justify-self-end">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="group -mr-2 inline-flex items-center gap-2.5 rounded-full px-2 py-2 text-brand transition-colors hover:text-cta"
            >
              <span className="hidden text-[11px] font-heading font-semibold uppercase tracking-[0.24em] sm:inline">
                Search
              </span>
              <Search className="h-[17px] w-[17px]" strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </header>

      <IndexOverlay
        open={open}
        onClose={() => setOpen(false)}
        onOpenSearch={() => {
          setOpen(false);
          setSearchOpen(true);
        }}
        softwareFeatured={softwareFeatured}
        comparisons={comparisonArticles}
      />

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Two-line glyph — a restrained alternative to the three-line
   hamburger. Two unequal bars echo the logo's two-square asymmetry;
   they cross into an × when the Index is open.
   ────────────────────────────────────────────────────────────────── */

function TwoLineGlyph({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className="relative flex h-[11px] w-[20px] flex-col justify-between"
    >
      <span
        className={cn(
          "block h-[1.5px] origin-center rounded-full bg-current transition-all duration-300 ease-out",
          active ? "translate-y-[4.75px] rotate-45 w-full" : "w-full",
        )}
      />
      <span
        className={cn(
          "block h-[1.5px] origin-center rounded-full bg-current transition-all duration-300 ease-out",
          active ? "-translate-y-[4.75px] -rotate-45 w-full" : "w-3/5",
        )}
      />
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────
   The Index — full-viewport contents page.
   ────────────────────────────────────────────────────────────────── */

function IndexOverlay({
  open,
  onClose,
  onOpenSearch,
  softwareFeatured,
  comparisons,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  softwareFeatured: MegaFeatured;
  comparisons: ComparisonPreview[];
}) {
  const lead = comparisons[0];
  const rest = comparisons.slice(1, 4);

  /* Entrance helper — staggered rise, gated on `open`. */
  const rise = (i: number) =>
    ({
      transitionDelay: open ? `${120 + i * 45}ms` : "0ms",
    }) as const;

  return (
    <div
      id="site-index"
      role="dialog"
      aria-modal="true"
      aria-label="Site index"
      className={cn(
        "fixed inset-0 z-50 overflow-y-auto bg-page transition-opacity duration-500",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {/* Overlay masthead — mirrors the resting bar */}
      <div className="sticky top-0 z-10 bg-page/85 backdrop-blur-md">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
          <div className="justify-self-start">
            <button
              type="button"
              onClick={onClose}
              className="group -ml-2 inline-flex items-center gap-3 rounded-full px-2 py-2 text-brand transition-colors hover:text-cta"
            >
              <TwoLineGlyph active />
              <span className="hidden text-[11px] font-heading font-semibold uppercase tracking-[0.24em] sm:inline">
                Close
              </span>
            </button>
          </div>
          <div className="justify-self-center">
            <Link
              href="/"
              onClick={onClose}
              aria-label="SterlingPeak — home"
              className="inline-flex items-baseline"
            >
              <Logo variant="full" size="md" asLink={false} />
            </Link>
          </div>
          <div className="justify-self-end">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Open search"
              className="group -mr-2 inline-flex items-center gap-2.5 rounded-full px-2 py-2 text-brand transition-colors hover:text-cta"
            >
              <span className="hidden text-[11px] font-heading font-semibold uppercase tracking-[0.24em] sm:inline">
                Search
              </span>
              <Search className="h-[17px] w-[17px]" strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-6 md:px-8 md:pt-10">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          {/* ── Numbered category index ── */}
          <nav aria-label="Sections">
            <p
              className={cn(
                "text-[10.5px] font-heading font-semibold uppercase tracking-[0.3em] text-brand/40 transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              style={rise(0)}
            >
              Contents
            </p>

            <ul className="mt-6 md:mt-8">
              {MAIN_NAV.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    style={rise(i + 1)}
                    className={cn(
                      "group flex items-baseline gap-4 border-t border-border-subtle py-5 transition-all duration-500 md:gap-6 md:py-7",
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0",
                    )}
                  >
                    <span className="w-7 shrink-0 font-mono text-[12px] tabular-nums text-cta/70 md:w-9 md:text-[13px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-[1.55rem] font-semibold tracking-[-0.02em] text-brand transition-colors group-hover:text-cta md:text-[2.4rem]">
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className="mx-2 hidden h-px flex-1 translate-y-[-2px] self-center bg-border-subtle md:block"
                    />
                    <span className="hidden max-w-[15rem] self-center text-right text-[12.5px] leading-snug text-muted-foreground md:block">
                      {CATEGORY_NOTE[item.label]}
                    </span>
                    <ArrowUpRight
                      className="hidden h-5 w-5 shrink-0 self-center text-cta opacity-0 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 md:block"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Fine-print rule: editorial + legal */}
            <div
              className={cn(
                "mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border-subtle pt-6 transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              style={rise(MAIN_NAV.length + 1)}
            >
              {EDITORIAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className="text-[11.5px] font-heading font-medium uppercase tracking-[0.14em] text-brand/55 transition-colors hover:text-cta"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* ── Editor's desk ── */}
          <aside
            className={cn(
              "transition-all duration-700",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? "260ms" : "0ms" }}
          >
            <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.3em] text-brand/40">
              Editor&apos;s desk
            </p>

            {/* Curated pick */}
            <Link
              href={softwareFeatured.href}
              onClick={onClose}
              className="group mt-6 block rounded-[1.5rem] border border-border-subtle bg-card p-6 transition-all duration-300 hover:border-cta/40 hover:shadow-[0_28px_60px_-32px_rgba(0,55,72,0.28)] md:mt-8 md:p-7"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-cta">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-[2px] bg-cta"
                />
                Editor&apos;s pick
              </span>
              <p className="mt-4 font-heading text-[1.3rem] font-semibold leading-[1.16] tracking-[-0.01em] text-brand transition-colors group-hover:text-cta">
                {softwareFeatured.title}
              </p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                {softwareFeatured.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-heading font-semibold text-cta">
                {softwareFeatured.ctaLabel}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              </span>
            </Link>

            {/* Latest comparisons */}
            {(lead || rest.length > 0) && (
              <div className="mt-8">
                <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.3em] text-brand/40">
                  Latest comparisons
                </p>
                <ul className="mt-4">
                  {[lead, ...rest].filter(Boolean).map((a) => (
                    <li key={a!.slug}>
                      <Link
                        href={`/article/${a!.slug}`}
                        onClick={onClose}
                        className="group flex items-start gap-3 border-t border-border-subtle py-3.5"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cta/30 transition-colors group-hover:bg-cta"
                        />
                        <span className="font-heading text-[14px] font-medium leading-snug text-brand/85 transition-colors group-hover:text-cta">
                          {a!.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
