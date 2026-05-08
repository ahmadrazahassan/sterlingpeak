import type { Editor } from "@tiptap/react";

export type EditorMode = "visual" | "html";

export interface ToolbarButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
}

export interface EditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export interface ToolbarProps {
  editor: Editor;
  onImageClick: () => void;
}

export interface BubbleMenuBarProps {
  editor: Editor;
}
