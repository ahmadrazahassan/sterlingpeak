"use client";

import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  ImagePlus,
  Code2,
  Undo,
  Redo,
  Table,
} from "lucide-react";
import { ToolbarButton } from "./toolbar-button";
import type { ToolbarProps } from "./types";

export function Toolbar({ editor, onImageClick }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2">
      {/* Headings */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          icon={Heading1}
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        />
        <ToolbarButton
          icon={Heading2}
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        />
        <ToolbarButton
          icon={Heading3}
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        />
      </div>

      <Divider />

      {/* Lists */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          icon={List}
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet list"
        />
        <ToolbarButton
          icon={ListOrdered}
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered list"
        />
      </div>

      <Divider />

      {/* Block elements */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          icon={Quote}
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        />
        <ToolbarButton
          icon={Code2}
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Code block"
        />
        <ToolbarButton
          icon={Minus}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        />
        <ToolbarButton
          icon={Table}
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
          title="Insert table"
        />
      </div>

      <Divider />

      {/* Media */}
      <ToolbarButton icon={ImagePlus} onClick={onImageClick} title="Insert image" />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Undo/Redo */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          icon={Undo}
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        />
        <ToolbarButton
          icon={Redo}
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="mx-1.5 h-5 w-px bg-black/[0.06]" />;
}
