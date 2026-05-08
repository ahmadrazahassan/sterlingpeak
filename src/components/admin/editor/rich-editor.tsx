"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Highlight } from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TextAlign } from "@tiptap/extension-text-align";
import { useCallback, useRef, useState } from "react";
import { Eye, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toolbar } from "./toolbar";
import { BubbleMenuBar } from "./bubble-menu-bar";
import { HtmlSourceEditor } from "./html-source-editor";
import { uploadAndInsertImage } from "./image-handler";
import type { EditorMode, EditorProps } from "./types";

export function RichEditor({
  content,
  onChange,
  placeholder = "Start writing your article...",
  minHeight = 400,
}: EditorProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<EditorMode>("visual");
  const [htmlSource, setHtmlSource] = useState(content);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Placeholder.configure({ placeholder }),
      ImageExt.configure({
        allowBase64: false,
        HTMLAttributes: { class: "rounded-lg max-w-full" },
      }),
      LinkExt.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-accent underline" },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      setHtmlSource(html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none px-5 py-4 outline-none text-brand",
          "focus:outline-none",
        ),
        style: `min-height:${minHeight}px`,
      },
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (!files?.length) return false;
        const file = files[0];
        if (!file.type.startsWith("image/")) return false;
        event.preventDefault();
        if (editor) uploadAndInsertImage(file, editor);
        return true;
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of Array.from(items)) {
          if (item.type.startsWith("image/")) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file && editor) uploadAndInsertImage(file, editor);
            return true;
          }
        }
        return false;
      },
    },
  });

  const switchToVisual = useCallback(() => {
    if (editor) editor.commands.setContent(htmlSource);
    setMode("visual");
  }, [editor, htmlSource]);

  const switchToHtml = useCallback(() => {
    if (editor) setHtmlSource(editor.getHTML());
    setMode("html");
  }, [editor]);

  const handleHtmlChange = useCallback(
    (val: string) => {
      setHtmlSource(val);
      onChange(val);
    },
    [onChange],
  );

  const handleImageFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      await uploadAndInsertImage(file, editor);
      e.target.value = "";
    },
    [editor],
  );

  if (!editor) {
    return (
      <div
        className="flex items-center justify-center text-brand/20 text-sm"
        style={{ minHeight }}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Top bar: Toolbar + Mode Switch */}
      <div className="flex items-center justify-between border-b border-black/[0.04]">
        {mode === "visual" && (
          <Toolbar editor={editor} onImageClick={() => fileRef.current?.click()} />
        )}
        {mode === "html" && <div className="flex-1" />}

        <div className="mr-3 flex shrink-0 rounded-lg bg-[#f2f2f2] p-0.5 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => mode === "html" && switchToVisual()}
            className={cn(
              "flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors",
              mode === "visual"
                ? "bg-white text-brand shadow-sm"
                : "text-brand/50",
            )}
          >
            <Eye className="h-3 w-3" /> Visual
          </button>
          <button
            type="button"
            onClick={() => mode === "visual" && switchToHtml()}
            className={cn(
              "flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors",
              mode === "html"
                ? "bg-white text-brand shadow-sm"
                : "text-brand/50",
            )}
          >
            <Code2 className="h-3 w-3" /> HTML
          </button>
        </div>
      </div>

      {/* Editor Content */}
      {mode === "visual" ? (
        <>
          <BubbleMenuBar editor={editor} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <HtmlSourceEditor
          value={htmlSource}
          onChange={handleHtmlChange}
          minHeight={minHeight}
        />
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFile}
      />
    </div>
  );
}
