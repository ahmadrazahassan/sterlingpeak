export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Extracts a table-of-contents from article content.
 * Supports both HTML headings (<h2>, <h3>) and Markdown (## / ###).
 */
export function extractToc(content: string) {
  const toc: { level: number; text: string; id: string }[] = [];
  if (!content) return toc;

  const seen = new Map<string, number>();

  function uniqueId(text: string): string {
    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  }

  const htmlHeadingRegex = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = htmlHeadingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    if (text) {
      toc.push({ level, text, id: uniqueId(text) });
    }
  }

  if (toc.length > 0) return toc;

  const lines = content.split("\n");
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)/);
    if (m) {
      const level = m[1].length;
      const text = m[2].trim();
      toc.push({ level, text, id: uniqueId(text) });
    }
  }
  return toc;
}
