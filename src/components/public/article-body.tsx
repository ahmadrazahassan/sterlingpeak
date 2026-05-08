"use client";

import { useMemo } from "react";
import { slugifyHeading } from "@/lib/markdown";

interface ArticleBodyProps {
  content: string;
}

/**
 * Injects id attributes into h2/h3 tags for anchor linking from the TOC.
 * Works on raw HTML strings so the TOC sidebar can deep-link to headings.
 */
function injectHeadingIds(html: string): string {
  return html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = slugifyHeading(text);
      if (/\bid\s*=/i.test(attrs)) return _match;
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
