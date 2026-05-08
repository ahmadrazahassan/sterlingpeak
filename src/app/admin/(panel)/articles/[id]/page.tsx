import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form"
import { adminGetArticle, adminListAuthors, adminListCategories } from "@/lib/queries/admin";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const [article, categories, authors] = await Promise.all([
    adminGetArticle(id),
    adminListCategories(),
    adminListAuthors(),
  ]);
  if (!article) notFound();

  return (
    <ArticleForm
      article={article}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      authors={authors.map((a) => ({ id: a.id, name: a.name }))}
    />
  );
}
