"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Upload } from "lucide-react";

export function MediaUploader() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus(null);
    try {
      const sigRes = await fetch("/api/cloudinary", { method: "POST" });
      if (!sigRes.ok) {
        setStatus("Could not get upload signature.");
        return;
      }
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
      if (!up.ok) {
        setStatus(data.error?.message ?? "Upload failed");
        return;
      }
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
      setStatus(`Uploaded successfully`);
      router.refresh();
    } finally {
      setUploading(false);
    }
  }

  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/[0.06] bg-white py-10 transition-colors hover:border-cta/30 hover:bg-cta/[0.01]">
      <Upload className="h-5 w-5 text-brand/30" />
      <span className="text-[13px] font-medium text-brand/40">
        {uploading ? "Uploading..." : "Click or drop to upload"}
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        disabled={uploading}
        onChange={onFile}
      />
      {status && <span className="mt-1 text-[12px] text-cta">{status}</span>}
    </label>
  );
}
