import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/markdown";

type Props = {
  content: string;
};

function isHtml(content: string): boolean {
  return /^\s*<[a-z][\s\S]*>/i.test(content.trim());
}

export function ArticleBody({ content }: Props) {
  if (isHtml(content)) {
    return (
      <div
        className="article-content prose prose-brand max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children, ...props }) => {
          const text = String(children);
          const id = slugifyHeading(text);
          return (
            <h2
              id={id}
              className="mt-12 scroll-mt-28 font-heading text-2xl font-semibold text-brand first:mt-0"
              {...props}
            >
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => {
          const text = String(children);
          const id = slugifyHeading(text);
          return (
            <h3
              id={id}
              className="mt-8 scroll-mt-28 font-heading text-xl font-semibold text-brand"
              {...props}
            >
              {children}
            </h3>
          );
        },
        p: ({ children, ...props }) => (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground" {...props}>
            {children}
          </p>
        ),
        ul: ({ children, ...props }) => (
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props}>
            {children}
          </ol>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="mt-6 border-l-4 border-accent pl-4 italic text-brand/90"
            {...props}
          >
            {children}
          </blockquote>
        ),
        table: ({ children, ...props }) => (
          <div className="mt-6 overflow-x-auto rounded-xl border border-border-subtle">
            <table className="w-full text-sm" {...props}>
              {children}
            </table>
          </div>
        ),
        th: ({ children, ...props }) => (
          <th className="border-b border-border-subtle bg-page px-3 py-2 text-left font-heading" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="border-b border-border-subtle px-3 py-2 text-muted-foreground" {...props}>
            {children}
          </td>
        ),
        a: ({ children, href, ...props }) => (
          <a
            href={href}
            className="font-medium text-accent underline-offset-2 hover:underline"
            {...props}
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
