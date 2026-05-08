"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
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
        onChange(data.secure_url);

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
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  if (value) {
    return (
      <div className="relative mt-3 overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt="Thumbnail" className="w-full rounded-xl object-cover" draggable={false} />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/[0.06] bg-[#fafafa] py-8 transition-all hover:border-cta/30 hover:bg-cta/[0.02] disabled:opacity-60"
      >
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-cta" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta/10">
            <ImagePlus className="h-4 w-4 text-cta" />
          </div>
        )}
        <span className="text-[12px] font-medium text-brand/40">
          {uploading ? "Uploading to Cloudinary..." : "Click to upload image"}
        </span>
        <span className="text-[10px] text-brand/25">
          JPG, PNG, WebP — original quality preserved
        </span>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </>
  );
}
