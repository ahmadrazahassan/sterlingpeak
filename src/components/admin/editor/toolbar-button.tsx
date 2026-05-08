"use client";

import { cn } from "@/lib/utils";
import type { ToolbarButtonProps } from "./types";

export function ToolbarButton({
  icon: Icon,
  active,
  disabled,
  onClick,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg transition-all",
        active
          ? "bg-cta/10 text-cta"
          : "text-brand/50 hover:bg-black/[0.04] hover:text-brand",
        disabled && "pointer-events-none opacity-30",
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
