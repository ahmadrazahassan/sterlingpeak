export interface Category {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category_id: string | null;
  author_id: string | null;
  thumbnail_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  status: string;
  article_type: string;
  is_featured: boolean;
  is_comparison: boolean;
  affiliate_disclosure_required: boolean;
  published_at: string | null;
}

export interface ArticleFormProps {
  article?: Article | null;
  categories: Category[];
  authors: Author[];
}
