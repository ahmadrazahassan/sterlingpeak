"use client";

const logos = [
  { name: "Sage", src: "/sage.png" },
  { name: "Xero", src: "/Xero Wordmark_Blue.png" },
  { name: "QuickBooks", src: "/quickbooks-brand-preferred-logo-50-50-black-external.png" },
  { name: "BambooHR", src: "/bamboohr.png" },
];

function LogoItem({ logo }: { logo: (typeof logos)[number] }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-6 md:px-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.name}
        className="h-6 w-auto select-none object-contain md:h-7"
        draggable={false}
      />
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-6 md:px-8 md:py-8">
      <div className="flex items-center">
        {/* Left label */}
        <div className="shrink-0 border-r border-brand/10 pr-6 md:pr-8">
          <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.15em] text-brand/40">
            Platforms we cover editorially
          </span>
        </div>

        {/* Right scrolling logos */}
        <div
          className="relative min-w-0 flex-1 overflow-hidden pl-6 md:pl-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          }}
        >
          <div className="marquee-track-rtl">
            {[0, 1, 2, 3].map((set) => (
              <div key={set} className="flex shrink-0 items-center" aria-hidden={set > 0}>
                {logos.map((logo) => (
                  <LogoItem key={`${set}-${logo.name}`} logo={logo} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
