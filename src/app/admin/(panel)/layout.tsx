import { redirect } from "next/navigation";
import { getAdminProfile } from "@/lib/auth";
import { AdminHeader } from "./admin-header";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/authors", label: "Authors" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/contact-messages", label: "Contact" },
  { href: "/admin/settings", label: "Settings" },
] as const;

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getAdminProfile();
  if (!user || !profile) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <AdminHeader
        nav={nav as unknown as { href: string; label: string }[]}
        email={profile.email ?? user.email ?? ""}
      />
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-8">
        {children}
      </main>
    </div>
  );
}
