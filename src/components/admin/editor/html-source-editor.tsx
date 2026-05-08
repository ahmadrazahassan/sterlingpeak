"use client";

interface HtmlSourceEditorProps {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
}

export function HtmlSourceEditor({
  value,
  onChange,
  minHeight = 400,
}: HtmlSourceEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
      className="w-full resize-y bg-[#1e1e2e] px-5 py-4 font-mono text-[13px] leading-relaxed text-green-300 outline-none selection:bg-green-800/40"
      style={{ minHeight }}
      placeholder="Write or paste HTML here..."
    />
  );
}
