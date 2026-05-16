"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import {
  MAIN_NAV,
  SOFTWARE_MEGA_CORE,
  SOFTWARE_MEGA_GUIDES,
  INDUSTRY_MEGA,
} from "@/lib/nav";
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

type MegaKey = "software" | "comparisons" | "industries";

const NAV_ITEMS_WITH_MEGA: Record<string, MegaKey> = {
  Software: "software",
  Comparisons: "comparisons",
  Industries: "industries",
};

/* ──────────────────────────────────────────────────────────────────
   SterlingPeak masthead — single-row studio bar.

   Layout:
     [logo]                  [manchester, uk · 12:34 PM]                   [nav | nav | nav | Subscribe]

   Single thin horizontal bar. No utility stripe, no second row.
   Pure typography on the left, live UK status indicator in the
   middle, nav with vertical dividers and dropdown carets on the
   right, green pill CTA at the far end.
   ────────────────────────────────────────────────────────────────── */

export function SiteHeader({ softwareFeatured, comparisonArticles }: Props) {
  const pathname = usePathname();
  const [mega, setMega] = useState<null | MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [time, setTime] = useState<string>("");

  /* Live UK time (Manchester / Europe/London zone), updates every minute. */
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Europe/London",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  /* Body-scroll lock for mobile drawer. */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close on route change. */
  useEffect(() => {
    setMega(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        onMouseLeave={() => setMega(null)}
        className="sticky top-0 z-40 border-b border-border-subtle bg-page"
      >
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center px-5 md:px-8">
          {/* ── LEFT: Logo ── */}
          <Link
            href="/"
            aria-label="SterlingPeak — home"
            className="group flex shrink-0 items-baseline"
          >
            <Logo variant="full" size="md" asLink={false} />
            <span
              aria-hidden
              className="ml-1 self-start font-heading text-[10px] font-medium leading-none text-brand/40"
            >
              ®
            </span>
          </Link>

          {/* ── CENTER: Live Manchester status (desktop only) ── */}
          <div className="ml-auto mr-auto hidden items-center gap-2.5 md:flex">
            <span className="font-heading text-[12.5px] font-medium tracking-[0.005em] text-brand/65">
              Manchester, UK
            </span>
            <span
              aria-hidden
              className="inline-block h-[9px] w-[9px] rounded-[2px] bg-cta shadow-[0_0_0_2px_rgba(34,173,1,0.18)]"
            />
            <span
              className="font-mono text-[12.5px] font-medium tabular-nums text-brand/75"
              aria-label="Current Manchester time"
            >
              {time || "—"}
            </span>
          </div>

          {/* ── RIGHT: Primary nav with dividers + Subscribe pill ── */}
          <nav
            aria-label="Primary"
            className="ml-auto hidden items-center lg:flex"
          >
            <ul className="flex items-center">
              {MAIN_NAV.map((item, idx) => {
                const megaKey: MegaKey | undefined =
                  NAV_ITEMS_WITH_MEGA[item.label];
                const isActive =
                  pathname === item.href ||
                  (megaKey && mega === megaKey) ||
                  (item.href.length > 1 && pathname.startsWith(item.href));

                return (
                  <li
                    key={item.label}
                    className={cn(
                      "flex items-center",
                      idx > 0 && "border-l border-brand/10",
                    )}
                    onMouseEnter={() => setMega(megaKey ?? null)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={megaKey ? mega === megaKey : undefined}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-5 text-[12.5px] font-heading font-medium tracking-[0.005em] transition-colors",
                        "h-[60px]",
                        isActive ? "text-brand" : "text-brand/75 hover:text-brand",
                      )}
                    >
                      {item.label}
                      {megaKey && (
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform duration-300",
                            mega === megaKey
                              ? "rotate-180 text-cta"
                              : "text-brand/40",
                          )}
                          strokeWidth={2}
                          aria-hidden
                        />
                      )}
                    </Link>
                  </li>
                );
              })}

              {/* Search — slim icon button slot before CTA, with divider */}
              <li className="flex items-center border-l border-brand/10">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  className="inline-flex h-[60px] items-center px-5 text-brand/75 transition-colors hover:text-brand"
                >
                  <Search className="h-[15px] w-[15px]" strokeWidth={1.8} />
                </button>
              </li>

              {/* Subscribe pill — sits flush-right, full-height */}
              <li className="flex items-center border-l border-brand/10">
                <Link
                  href="/newsletter"
                  className="group/cta inline-flex h-[60px] items-center bg-cta px-7 text-[12.5px] font-heading font-semibold text-white transition-colors hover:bg-cta/90"
                >
                  Subscribe
                </Link>
              </li>
            </ul>
          </nav>

          {/* ── MOBILE actions ── */}
          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand/75 transition-colors hover:bg-cta/10 hover:text-cta"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand/75 transition-colors hover:bg-cta/10 hover:text-cta"
            >
              {mobileOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.7} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>

        {/* Mega panel sits inside the header so it lines up with the bar */}
        <MegaPanel
          open={mega}
          softwareFeatured={softwareFeatured}
          comparisons={comparisonArticles}
        />
      </header>

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
   Mega panel — full-bleed under the bar, broadsheet convention.
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
        open
          ? "max-h-[640px] opacity-100 shadow-[0_30px_60px_-30px_rgba(0,55,72,0.18)]"
          : "pointer-events-none max-h-0 opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-14">
        {open === "software" && (
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14">
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
            <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
              Recent head-to-head analysis
            </p>
            <div className="mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {comparisons.slice(0, 6).map((a) => (
                <Link
                  key={a.slug}
                  href={`/article/${a.slug}`}
                  className="group block"
                >
                  <span className="inline-flex items-center rounded-full bg-cta/10 px-2.5 py-0.5 text-[10px] font-heading font-semibold uppercase tracking-[0.16em] text-cta ring-1 ring-inset ring-cta/15">
                    Comparison
                  </span>
                  <p className="mt-3 font-heading text-[1.05rem] font-semibold leading-[1.22] text-brand transition-colors group-hover:text-cta">
                    {a.title}
                  </p>
                  {a.excerpt && (
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground line-clamp-2">
                      {a.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-9 border-t border-border-subtle pt-5">
              <Link
                href="/comparisons"
                className="inline-flex items-center gap-1.5 rounded-full bg-cta/10 px-4 py-2 text-[13px] font-heading font-semibold text-cta ring-1 ring-inset ring-cta/15 transition-colors hover:bg-cta hover:text-white hover:ring-cta"
              >
                See every comparison
              </Link>
            </div>
          </div>
        )}

        {open === "industries" && (
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-14">
            <div>
              <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                Industries we cover
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1.5">
                {INDUSTRY_MEGA.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex w-full items-center gap-2.5 rounded-full px-3 py-2 text-[13.5px] font-heading font-medium text-brand/85 transition-colors hover:bg-cta/10 hover:text-cta"
                    >
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-cta/30 transition-colors group-hover:bg-cta"
                      />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/categories/industry-solutions"
              className="group flex flex-col rounded-3xl border border-border-subtle bg-card p-6 transition-all duration-300 hover:border-cta/40 hover:shadow-[0_22px_50px_-26px_rgba(34,173,1,0.35)]"
            >
              <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                Industry solutions hub
              </p>
              <p className="mt-3 font-heading text-[1.25rem] font-semibold leading-tight text-brand">
                Find the right software by business type
              </p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                Industry-specific guidance for UK SMEs across construction,
                hospitality, professional services, healthcare and more.
              </p>
              <span className="mt-5 inline-flex w-fit items-center rounded-full bg-cta/10 px-4 py-2 text-[12.5px] font-heading font-semibold text-cta ring-1 ring-inset ring-cta/15 transition-colors group-hover:bg-cta group-hover:text-white group-hover:ring-cta">
                Explore industries
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
      <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
        {eyebrow}
      </p>
      <ul className="mt-6 space-y-1">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="group inline-flex w-full items-center justify-between gap-2 rounded-full px-3 py-2 text-[14px] font-heading font-medium text-brand/85 transition-colors hover:bg-cta/10 hover:text-cta"
            >
              <span>{l.label}</span>
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
      className="group flex flex-col rounded-3xl border border-border-subtle bg-card p-6 transition-all duration-300 hover:border-cta/40 hover:shadow-[0_22px_50px_-26px_rgba(34,173,1,0.35)]"
    >
      <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
        Editor&apos;s pick
      </p>
      <p className="mt-3 font-heading text-[1.25rem] font-semibold leading-tight text-brand">
        {featured.title}
      </p>
      <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
        {featured.description}
      </p>
      <span className="mt-5 inline-flex w-fit items-center rounded-full bg-cta/10 px-4 py-2 text-[12.5px] font-heading font-semibold text-cta ring-1 ring-inset ring-cta/15 transition-colors group-hover:bg-cta group-hover:text-white group-hover:ring-cta">
        {featured.ctaLabel}
      </span>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Mobile drawer — full-screen, large editorial nav, green CTA.
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
          "fixed inset-0 z-40 bg-brand/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        role="presentation"
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md transform flex-col overflow-hidden bg-page shadow-[0_30px_60px_-20px_rgba(0,55,72,0.3)] transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-border-subtle px-5">
          <div onClick={onClose} className="cursor-pointer">
            <Logo variant="full" size="md" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand/75 transition-colors hover:bg-cta/10 hover:text-cta"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.7} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-7">
          <button
            type="button"
            onClick={onOpenSearch}
            className="mb-7 inline-flex w-full items-center gap-3 rounded-full border border-border-subtle bg-card px-5 py-3.5 text-left text-[13.5px] text-brand/55 transition-colors hover:border-cta/40 hover:text-brand"
          >
            <Search className="h-4 w-4" strokeWidth={1.7} />
            Search articles, comparisons, guides
          </button>

          <nav aria-label="Mobile primary">
            <ul>
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-brand/10 py-4 transition-colors hover:text-cta"
                  >
                    <span className="font-heading text-[1.15rem] font-medium tracking-[-0.012em] text-brand transition-colors group-hover:text-cta">
                      {item.label}
                    </span>
                    <ChevronDown
                      className="h-4 w-4 -rotate-90 text-brand/35 transition-colors group-hover:text-cta"
                      strokeWidth={1.7}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8">
            <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
              Editorial
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-[13px] font-medium">
              {[
                { href: "/about", label: "About" },
                { href: "/editorial-policy", label: "Editorial Policy" },
                { href: "/affiliate-disclosure", label: "Disclosure" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/cookie-policy", label: "Cookie Policy" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className="rounded-full px-2 py-1 text-brand/70 transition-colors hover:bg-cta/10 hover:text-cta"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-border-subtle px-5 py-5">
          <Link
            href="/newsletter"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center gap-1.5 bg-cta text-[14px] font-heading font-semibold text-white transition-colors hover:bg-cta/90"
          >
            Subscribe to the Briefing
          </Link>
          <p className="mt-3 text-center text-[11px] text-brand/50">
            Free &middot; weekly &middot; UK GDPR compliant
          </p>
        </div>
      </div>
    </>
  );
}
