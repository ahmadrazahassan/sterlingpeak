import { ArticleForm } from "@/components/admin/article-form";
import { adminListAuthors, adminListCategories } from "@/lib/queries/admin";

export default async function NewArticlePage() {
  const [categories, authors] = await Promise.all([
    adminListCategories(),
    adminListAuthors(),
  ]);

  return (
    <ArticleForm
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      authors={authors.map((a) => ({ id: a.id, name: a.name }))}
    />
  );
}
