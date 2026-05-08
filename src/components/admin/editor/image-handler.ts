import type { Editor } from "@tiptap/react";

export async function uploadAndInsertImage(
  file: File,
  editor: Editor,
): Promise<boolean> {
  const sigRes = await fetch("/api/cloudinary", { method: "POST" });
  if (!sigRes.ok) return false;

  const sig = await sigRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", sig.apiKey);
  fd.append("timestamp", String(sig.timestamp));
  fd.append("signature", sig.signature);
  fd.append("folder", sig.folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    { method: "POST", body: fd },
  );

  const data = await uploadRes.json();
  if (!uploadRes.ok || !data.secure_url) return false;

  editor
    .chain()
    .focus()
    .setImage({ src: data.secure_url, alt: file.name.replace(/\.[^.]+$/, "") })
    .run();

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

  return true;
}
