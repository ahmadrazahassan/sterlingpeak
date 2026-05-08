"use client";

import { BubbleMenu } from "@tiptap/react/menus";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Link2,
  Unlink,
  Highlighter,
} from "lucide-react";
import { useCallback } from "react";
import { ToolbarButton } from "./toolbar-button";
import type { BubbleMenuBarProps } from "./types";

export function BubbleMenuBar({ editor }: BubbleMenuBarProps) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      className="flex items-center gap-0.5 rounded-xl border border-black/[0.06] bg-white px-2 py-1.5 shadow-xl shadow-black/[0.08]"
    >
      <ToolbarButton
        icon={Bold}
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold (Ctrl+B)"
      />
      <ToolbarButton
        icon={Italic}
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic (Ctrl+I)"
      />
      <ToolbarButton
        icon={UnderlineIcon}
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Underline (Ctrl+U)"
      />
      <ToolbarButton
        icon={Strikethrough}
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      />
      <ToolbarButton
        icon={Code}
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Inline code"
      />
      <ToolbarButton
        icon={Highlighter}
        active={editor.isActive("highlight")}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        title="Highlight"
      />

      <div className="mx-1 h-5 w-px bg-black/[0.08]" />

      <ToolbarButton
        icon={Link2}
        active={editor.isActive("link")}
        onClick={setLink}
        title="Insert link"
      />
      {editor.isActive("link") && (
        <ToolbarButton
          icon={Unlink}
          onClick={() => editor.chain().focus().unsetLink().run()}
          title="Remove link"
        />
      )}
    </BubbleMenu>
  );
}
