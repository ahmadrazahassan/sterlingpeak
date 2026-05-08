import { adminListMedia } from "@/lib/queries/admin";
import { MediaUploader } from "@/components/admin/media-uploader";

export default async function AdminMediaPage() {
  const assets = await adminListMedia();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-xl font-semibold text-brand">Media</h1>
        <p className="mt-0.5 text-[13px] text-brand/40">Upload and manage images</p>
      </div>

      <MediaUploader />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((a) => (
          <div
            key={a.id}
            className="group overflow-hidden rounded-xl border border-black/[0.04] bg-white transition-shadow hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]"
          >
            {(a.secure_url ?? a.url) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={a.secure_url ?? a.url}
                alt={a.alt_text ?? "Media"}
                className="h-32 w-full object-cover"
              />
            )}
            <div className="p-3">
              <p className="truncate text-[11px] font-mono text-brand/40">{a.secure_url ?? a.url}</p>
              <p className="mt-1 text-[11px] text-brand/25">
                {a.width}×{a.height} {a.format ? `· ${a.format}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {assets.length === 0 && (
        <div className="rounded-xl border border-dashed border-black/[0.08] py-12 text-center">
          <p className="text-[13px] text-brand/30">No media uploaded yet</p>
        </div>
      )}
    </div>
  );
}
