"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import {
  MAIN_NAV,
  SOFTWARE_MEGA_CORE,
  SOFTWARE_MEGA_GUIDES,
  INDUSTRY_MEGA,
} from "@/lib/nav";
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

type MegaKey = "software" | "comparisons" | "industries";

/* ──────────────────────────────────────────────────────────────────
   SterlingPeak masthead.
   Minimal, premium, editorial — designed in the FT / Stratechery /
   The Information idiom. Two thin bars: a typographic utility line
   on top (date + secondary nav + tagline) and a clean main bar with
   the wordmark, primary nav, and a single subscribe CTA.

   Compresses on scroll. Mega-panels open as a single full-width
   editorial panel under the header, not a clutter of dropdowns.
   ────────────────────────────────────────────────────────────────── */

export function SiteHeader({ softwareFeatured, comparisonArticles }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<null | MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* Scroll-aware compression — 24px threshold, like a serious news site. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile drawer or mega panel is open. */
  useEffect(() => {
    const lock = mobileOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close everything on route change. */
  useEffect(() => {
    setMega(null);
    setMobileOpen(false);
  }, [pathname]);

  /* Today's date for the masthead — formatted like a UK publication. */
  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      {/* ── UTILITY MASTHEAD LINE ── */}
      <div className="hidden border-b border-border-subtle bg-page lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 py-2.5">
          <div className="flex items-center gap-4 text-[11.5px] tracking-wide text-brand/70">
            <span
              className="inline-flex items-center gap-1.5 font-heading font-semibold text-brand"
              aria-label="Today's date"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-cta"
              />
              {today}
            </span>
            <span aria-hidden className="h-3 w-px bg-brand/15" />
            <span className="font-medium">
              Independent UK finance &amp; software publication
            </span>
          </div>

          <nav
            aria-label="Utility"
            className="flex items-center gap-7 text-[11.5px] font-medium text-brand/65"
          >
            <Link href="/about" className="transition-colors hover:text-brand">
              About
            </Link>
            <Link
              href="/editorial-policy"
              className="transition-colors hover:text-brand"
            >
              Editorial
            </Link>
            <Link
              href="/affiliate-disclosure"
              className="transition-colors hover:text-brand"
            >
              Disclosure
            </Link>
            <Link href="/contact" className="transition-colors hover:text-brand">
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header
        onMouseLeave={() => setMega(null)}
        className={cn(
          "sticky top-0 z-40 border-b transition-[height,background-color,border-color] duration-300 ease-out",
          scrolled
            ? "border-border-subtle bg-page/92 backdrop-blur-[14px]"
            : "border-transparent bg-page",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center gap-8 px-5 transition-[height] duration-300 md:px-8",
            scrolled ? "h-[64px]" : "h-[80px]",
          )}
        >
          {/* Logo — pure wordmark, no icon card */}
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-1 font-heading text-[1.35rem] font-semibold tracking-[-0.02em] text-brand transition-opacity hover:opacity-90"
            aria-label="SterlingPeak — home"
          >
            <span>SterlingPeak</span>
            <span
              aria-hidden
              className="inline-block h-[7px] w-[7px] rounded-full bg-cta transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Primary nav — centered, typographic, no pill backgrounds */}
          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center lg:flex"
          >
            <ul className="flex items-center gap-9">
              {MAIN_NAV.map((item) => {
                const megaKey: MegaKey | null =
                  item.label === "Software"
                    ? "software"
                    : item.label === "Comparisons"
                      ? "comparisons"
                      : item.label === "Industries"
                        ? "industries"
                        : null;
                const isActive =
                  pathname === item.href ||
                  (megaKey && mega === megaKey) ||
                  (item.href.length > 1 && pathname.startsWith(item.href));

                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => setMega(megaKey ?? null)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={megaKey ? mega === megaKey : undefined}
                      className={cn(
                        "group/nav relative inline-flex items-center py-2 text-[13.5px] font-heading font-medium tracking-[0.005em] transition-colors",
                        isActive ? "text-brand" : "text-brand/75 hover:text-brand",
                      )}
                    >
                      {item.label}
                      {/* Underline accent — appears on hover/active */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute -bottom-[1px] left-0 right-0 h-[2px] bg-brand transition-transform duration-300 ease-out",
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/nav:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand/70 transition-colors hover:bg-brand/[0.05] hover:text-brand"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>

            <Link
              href="/newsletter"
              className="hidden h-10 items-center gap-1.5 rounded-full bg-brand px-5 text-[13px] font-heading font-semibold text-white transition-colors hover:bg-brand/90 sm:inline-flex"
            >
              Subscribe
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand/70 transition-colors hover:bg-brand/[0.05] hover:text-brand lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>

        {/* ── MEGA PANEL ── */}
        <MegaPanel
          open={mega}
          softwareFeatured={softwareFeatured}
          comparisons={comparisonArticles}
        />
      </header>

      {/* ── MOBILE DRAWER ── */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => {
          setMobileOpen(false);
          setSearchOpen(true);
        }}
      />

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Mega panel — unified for all three mega keys. Editorial layout
   with a focused featured card on the right rather than a wall of
   links.
   ────────────────────────────────────────────────────────────────── */

function MegaPanel({
  open,
  softwareFeatured,
  comparisons,
}: {
  open: MegaKey | null;
  softwareFeatured: MegaFeatured;
  comparisons: ComparisonPreview[];
}) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full overflow-hidden border-b border-border-subtle bg-page transition-[max-height,opacity] duration-300 ease-out",
        open ? "max-h-[640px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        {open === "software" && (
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
            <MegaColumn
              eyebrow="Core software"
              links={SOFTWARE_MEGA_CORE.map((l) => ({
                label: l.label,
                href: l.href,
              }))}
            />
            <MegaColumn
              eyebrow="Popular guides"
              links={SOFTWARE_MEGA_GUIDES.map((l) => ({
                label: l.label,
                href: l.href,
              }))}
            />
            <MegaFeaturedCard featured={softwareFeatured} />
          </div>
        )}

        {open === "comparisons" && (
          <div>
            <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-accent">
              Recent head-to-head analysis
            </p>
            <div className="mt-7 grid gap-x-12 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
              {comparisons.slice(0, 6).map((a) => (
                <Link key={a.slug} href={`/article/${a.slug}`} className="group block">
                  <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.18em] text-cta">
                    Comparison
                  </p>
                  <p className="mt-2 font-heading text-[1.05rem] font-semibold leading-[1.22] text-brand transition-colors group-hover:text-accent">
                    {a.title}
                  </p>
                  {a.excerpt && (
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground line-clamp-2">
                      {a.excerpt}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-heading font-semibold text-cta">
                    Read
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-10 border-t border-border-subtle pt-6">
              <Link
                href="/comparisons"
                className="inline-flex items-center gap-1.5 text-[13px] font-heading font-semibold text-brand transition-colors hover:text-accent"
              >
                See every comparison
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {open === "industries" && (
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-16">
            <div>
              <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-accent">
                Industries we cover
              </p>
              <ul className="mt-7 grid grid-cols-2 gap-x-10 gap-y-3.5">
                {INDUSTRY_MEGA.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-[14px] font-heading font-medium text-brand/85 transition-colors hover:text-accent"
                    >
                      <span
                        aria-hidden
                        className="h-1 w-1 shrink-0 rounded-full bg-brand/25 transition-colors group-hover:bg-accent"
                      />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/categories/industry-solutions"
              className="group flex flex-col rounded-[1.25rem] border border-border-subtle bg-card p-7 transition-colors hover:border-accent/40"
            >
              <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-accent">
                Industry solutions hub
              </p>
              <p className="mt-4 font-heading text-[1.35rem] font-semibold leading-tight text-brand">
                Find the right software by business type
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                Industry-specific guidance and operational considerations for UK
                SMEs across construction, hospitality, professional services,
                healthcare, and more.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-heading font-semibold text-cta">
                Explore industries
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function MegaColumn({
  eyebrow,
  links,
}: {
  eyebrow: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-accent">
        {eyebrow}
      </p>
      <ul className="mt-7 space-y-3.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-2 text-[14.5px] font-heading font-medium text-brand/85 transition-colors hover:text-accent"
            >
              {l.label}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaFeaturedCard({ featured }: { featured: MegaFeatured }) {
  return (
    <Link
      href={featured.href}
      className="group flex flex-col rounded-[1.25rem] border border-border-subtle bg-card p-7 transition-colors hover:border-accent/40"
    >
      <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-accent">
        Editor&apos;s pick
      </p>
      <p className="mt-4 font-heading text-[1.35rem] font-semibold leading-tight text-brand">
        {featured.title}
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
        {featured.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-heading font-semibold text-cta">
        {featured.ctaLabel}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Mobile drawer — full-screen, large typography, editorial.
   ────────────────────────────────────────────────────────────────── */

function MobileDrawer({
  open,
  onClose,
  onOpenSearch,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-brand/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        role="presentation"
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md transform flex-col bg-page transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex h-[64px] items-center justify-between border-b border-border-subtle px-5">
          <span className="font-heading text-[1.15rem] font-semibold tracking-[-0.018em] text-brand">
            SterlingPeak
            <span
              aria-hidden
              className="ml-1 inline-block h-[6px] w-[6px] translate-y-[-2px] rounded-full bg-cta"
            />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand/70 transition-colors hover:bg-brand/[0.05] hover:text-brand"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-8">
          <button
            type="button"
            onClick={onOpenSearch}
            className="mb-8 inline-flex w-full items-center gap-3 rounded-full border border-border-subtle bg-card px-5 py-3 text-left text-[13.5px] text-brand/55 transition-colors hover:border-brand/20"
          >
            <Search className="h-4 w-4" strokeWidth={1.6} />
            Search articles, comparisons, guides
          </button>

          <nav aria-label="Mobile primary">
            <ul className="space-y-1">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between border-b border-border-subtle py-4 font-heading text-[1.4rem] font-semibold tracking-[-0.014em] text-brand transition-colors hover:text-accent"
                  >
                    {item.label}
                    <ArrowUpRight
                      className="h-4 w-4 text-brand/40"
                      strokeWidth={1.6}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-[13px] font-medium text-brand/65">
            <Link href="/about" onClick={onClose} className="hover:text-brand">
              About
            </Link>
            <Link
              href="/editorial-policy"
              onClick={onClose}
              className="hover:text-brand"
            >
              Editorial Policy
            </Link>
            <Link
              href="/affiliate-disclosure"
              onClick={onClose}
              className="hover:text-brand"
            >
              Affiliate Disclosure
            </Link>
            <Link href="/contact" onClick={onClose} className="hover:text-brand">
              Contact
            </Link>
            <Link
              href="/privacy-policy"
              onClick={onClose}
              className="hover:text-brand"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              onClick={onClose}
              className="hover:text-brand"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        <div className="border-t border-border-subtle px-5 py-5">
          <Link
            href="/newsletter"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-brand text-[14px] font-heading font-semibold text-white transition-colors hover:bg-brand/90"
          >
            Subscribe to the Briefing
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <p className="mt-3 text-center text-[11px] text-brand/50">
            Free · weekly · UK GDPR compliant
          </p>
        </div>
      </div>
    </>
  );
}
