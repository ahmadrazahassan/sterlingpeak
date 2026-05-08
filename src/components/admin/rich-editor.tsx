"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useCallback, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Link2,
  Unlink,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  ImagePlus,
  Minus,
  Code2,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export function RichEditor({ content, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"visual" | "html">("visual");
  const [htmlSource, setHtmlSource] = useState(content);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Start writing your article...",
      }),
      ImageExt.configure({
        allowBase64: false,
        HTMLAttributes: { class: "rounded-lg max-w-full" },
      }),
      LinkExt.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-accent underline" },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlSource(html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none px-5 py-4 min-h-[400px] outline-none text-brand",
      },
    },
  });

  const switchToVisual = useCallback(() => {
    if (editor) {
      editor.commands.setContent(htmlSource);
      onChange(htmlSource);
    }
    setMode("visual");
  }, [editor, htmlSource, onChange]);

  const switchToHtml = useCallback(() => {
    if (editor) {
      setHtmlSource(editor.getHTML());
    }
    setMode("html");
  }, [editor]);

  const handleHtmlChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setHtmlSource(val);
    onChange(val);
  }, [onChange]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  const addImage = useCallback(() => {
    fileRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const sigRes = await fetch("/api/cloudinary", { method: "POST" });
    if (!sigRes.ok) return;
    const sig = await sigRes.json();

    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", sig.apiKey);
    fd.append("timestamp", String(sig.timestamp));
    fd.append("signature", sig.signature);
    fd.append("folder", sig.folder);

    const up = await fetch(
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
      { method: "POST", body: fd },
    );
    const data = await up.json();
    if (up.ok && data.secure_url) {
      editor.chain().focus().setImage({ src: data.secure_url }).run();

      await fetch("/api/media-record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: data.secure_url,
          secure_url: data.secure_url,
          public_id: data.public_id,
          format: data.format,
          width: data.width,
          height: data.height,
          bytes: data.bytes,
        }),
      });
    }

    e.target.value = "";
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="relative">
      {/* Tab switcher + toolbar */}
      <div className="flex items-center justify-between border-b border-black/[0.04] px-3 py-1.5">
        <div className="flex items-center gap-0.5">
          {mode === "visual" && (
            <>
              <ToolBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                <List className="h-3.5 w-3.5" />
              </ToolBtn>
              <ToolBtn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                <ListOrdered className="h-3.5 w-3.5" />
              </ToolBtn>
              <ToolBtn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                <Quote className="h-3.5 w-3.5" />
              </ToolBtn>
              <ToolBtn active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <Minus className="h-3.5 w-3.5" />
              </ToolBtn>
              <div className="mx-1 h-4 w-px bg-black/[0.06]" />
              <ToolBtn active={false} onClick={addImage}>
                <ImagePlus className="h-3.5 w-3.5" />
              </ToolBtn>
            </>
          )}
        </div>

        {/* Mode tabs */}
        <div className="flex items-center gap-0.5 rounded-lg bg-[#f2f2f2] p-0.5">
          <button
            type="button"
            onClick={switchToVisual}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all",
              mode === "visual" ? "bg-white text-brand shadow-sm" : "text-brand/40 hover:text-brand/60",
            )}
          >
            <Eye className="h-3 w-3" />
            Visual
          </button>
          <button
            type="button"
            onClick={switchToHtml}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all",
              mode === "html" ? "bg-white text-brand shadow-sm" : "text-brand/40 hover:text-brand/60",
            )}
          >
            <Code2 className="h-3 w-3" />
            HTML
          </button>
        </div>
      </div>

      {/* Visual editor */}
      {mode === "visual" && (
        <>
          <BubbleMenu
            editor={editor}
            className="flex items-center gap-0.5 rounded-xl border border-black/[0.08] bg-white p-1 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)]"
          >
            <BubbleBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
              <Bold className="h-3.5 w-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
              <Italic className="h-3.5 w-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
              <UnderlineIcon className="h-3.5 w-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
              <Strikethrough className="h-3.5 w-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
              <Code className="h-3.5 w-3.5" />
            </BubbleBtn>
            <div className="mx-0.5 h-4 w-px bg-black/[0.06]" />
            <BubbleBtn active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              <Heading1 className="h-3.5 w-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              <Heading2 className="h-3.5 w-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              <Heading3 className="h-3.5 w-3.5" />
            </BubbleBtn>
            <div className="mx-0.5 h-4 w-px bg-black/[0.06]" />
            <BubbleBtn active={editor.isActive("link")} onClick={addLink}>
              <Link2 className="h-3.5 w-3.5" />
            </BubbleBtn>
            {editor.isActive("link") && (
              <BubbleBtn active={false} onClick={removeLink}>
                <Unlink className="h-3.5 w-3.5" />
              </BubbleBtn>
            )}
          </BubbleMenu>

          <EditorContent editor={editor} />
        </>
      )}

      {/* HTML source editor */}
      {mode === "html" && (
        <textarea
          value={htmlSource}
          onChange={handleHtmlChange}
          spellCheck={false}
          className="min-h-[400px] w-full resize-y bg-[#1e1e1e] p-5 font-mono text-[13px] leading-relaxed text-green-300 outline-none"
          placeholder="<h1>Paste your HTML here...</h1>"
        />
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}

function BubbleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
        active ? "bg-cta/10 text-cta" : "text-brand/50 hover:bg-black/[0.04] hover:text-brand",
      )}
    >
      {children}
    </button>
  );
}

function ToolBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
        active ? "bg-brand/[0.06] text-brand" : "text-brand/40 hover:bg-black/[0.03] hover:text-brand/70",
      )}
    >
      {children}
    </button>
  );
}
