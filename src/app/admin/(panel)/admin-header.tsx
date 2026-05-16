"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Plus, ExternalLink, LogOut, Menu, X } from "lucide-react";
import { signOutAdmin } from "@/app/admin/actions";
import { Logo } from "@/components/public/logo";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

type Props = {
  nav: NavItem[];
  email: string;
};

export function AdminHeader({ nav, email }: Props) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y < 60) {
        setVisible(true);
      } else {
        setVisible(y < lastY.current);
      }
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 px-4 pt-4 transition-all duration-300 md:px-6",
        visible ? "translate-y-0 opacity-100" : "-translate-y-[calc(100%+1rem)] opacity-0",
      )}
    >
      <header className="mx-auto max-w-6xl rounded-2xl border border-black/[0.05] bg-white/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
        <div className="flex h-12 items-center justify-between gap-3 px-4 md:px-5">
          {/* Left: logo */}
          <Link href="/admin" aria-label="SterlingPeak admin" className="flex items-center">
            <Logo variant="full" size="sm" asLink={false} />
          </Link>

          {/* Center: nav pills */}
          <nav className="hidden items-center gap-0.5 rounded-xl bg-[#f2f2f2] p-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-[12px] font-medium transition-all",
                  pathname === item.href
                    ? "bg-white text-brand shadow-sm"
                    : "text-brand/45 hover:text-brand/70",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/admin/articles/new"
              className="inline-flex h-7 items-center gap-1 rounded-lg bg-cta px-2.5 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Plus className="h-3 w-3" />
              <span className="hidden sm:inline">New</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-brand/35 transition-colors hover:bg-black/[0.03] hover:text-brand/60"
            >
              <ExternalLink className="h-3 w-3" />
            </Link>
            <form action={signOutAdmin}>
              <button
                type="submit"
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-brand/35 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <LogOut className="h-3 w-3" />
              </button>
            </form>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-brand/50 md:hidden"
            >
              {mobileOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="border-t border-black/[0.04] px-4 py-3 md:hidden">
            <div className="flex flex-wrap gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors",
                    pathname === item.href
                      ? "bg-brand/[0.06] text-brand"
                      : "text-brand/45 hover:bg-black/[0.03] hover:text-brand/70",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="mt-2 px-2.5 text-[11px] text-brand/25">{email}</p>
          </div>
        )}
      </header>
    </div>
  );
}
