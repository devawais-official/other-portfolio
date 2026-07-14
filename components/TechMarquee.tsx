import { siteConfig } from "@/lib/siteConfig";

// Pulled straight from portfolio.json (via siteConfig.expertise) instead of
// a separately maintained list, so the marquee never drifts out of sync
// with the actual skills content (DRY — one source of truth).
const stack = [
  ...siteConfig.expertise.languages,
  ...siteConfig.expertise.android.slice(0, 3),
  ...siteConfig.expertise.multiplatform,
  ...siteConfig.expertise.flutter.slice(0, 3),
  ...siteConfig.expertise.architecture.slice(0, 2),
];

export default function TechMarquee() {
  const items = [...stack, ...stack];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-32" />
      <div className="flex w-max animate-marquee gap-3">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-border px-4 py-2 font-mono text-xs text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
