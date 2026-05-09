"use client";

import { useMemo } from "react";
import { slugifyHeading } from "@/lib/markdown";

interface ArticleBodyProps {
  content: string;
}

/**
 * Injects id attributes into h2/h3 tags for anchor linking from the TOC.
 * Works on raw HTML strings so the TOC sidebar can deep-link to headings.
 * Deduplicates IDs to match the extractToc logic (e.g. "pros", "pros-1").
 */
function injectHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag, attrs, inner) => {
      if (/\bid\s*=/i.test(attrs)) return _match;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const base = slugifyHeading(text);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count}`;
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    },
  );
}

export function ArticleBody({ content }: ArticleBodyProps) {
  const processedHtml = useMemo(() => {
    if (!content) return "";
    return injectHeadingIds(content);
  }, [content]);

  if (!processedHtml) return null;

  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}
