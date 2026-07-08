import Link from "next/link";
import {
  adminContentHealth,
  adminDashboardCounts,
} from "@/lib/queries/admin";
import { FileText, MessageSquare, FolderTree, TrendingUp } from "lucide-react";

export default async function AdminDashboardPage() {
  const [counts, health] = await Promise.all([
    adminDashboardCounts(),
    adminContentHealth(),
  ]);

  const stats = [
    { label: "Articles", value: counts.totalArticles, icon: FileText, href: "/admin/articles" },
    { label: "Published", value: counts.published, icon: TrendingUp, href: "/admin/articles" },
    { label: "Drafts", value: counts.drafts, icon: FileText, href: "/admin/articles" },
    { label: "Messages", value: counts.contactMessages, icon: MessageSquare, href: "/admin/contact-messages" },
    { label: "Categories", value: counts.categories, icon: FolderTree, href: "/admin/categories" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-xl font-semibold text-brand">Dashboard</h1>
        <p className="mt-1 text-[13px] text-brand/40">Editorial overview</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-xl border border-black/[0.04] bg-white p-5 transition-shadow hover:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-brand/35">{s.label}</span>
              <s.icon className="h-3.5 w-3.5 text-brand/20 transition-colors group-hover:text-cta/60" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-brand">{s.value}</p>
          </Link>
        ))}
      </div>

      {/* Content health */}
      <div>
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-brand/40">Content health</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <HealthCard title="Drafts" items={health.drafts} />
          <HealthCard title="Missing thumbnail" items={health.missingThumb} />
          <HealthCard title="Missing meta description" items={health.missingMeta} />
          <HealthCard title="No category" items={health.missingCategory} />
        </div>
      </div>
    </div>
  );
}

function HealthCard({ title, items }: { title: string; items: { id: string; title: string }[] }) {
  return (
    <div className="rounded-xl border border-black/[0.04] bg-white p-4">
      <p className="text-[12px] font-semibold text-brand/60">{title}</p>
      {items.length === 0 ? (
        <p className="mt-2 text-[12px] text-brand/25">All clear</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {items.map((a) => (
            <li key={a.id}>
              <Link href={`/admin/articles/${a.id}`} className="text-[13px] text-cta hover:underline">
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
