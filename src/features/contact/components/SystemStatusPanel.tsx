
"use client";

import { MapPinIcon } from "@/components/icons/icons";
import { useI18n } from "@/i18n/i18n-client";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface SystemStatusPanelProps {
  location: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function SystemStatusPanel({ location }: SystemStatusPanelProps) {
  const { translate } = useI18n();

  return (
    <section className="card-surface group relative flex h-full min-h-[380px] w-full flex-col justify-between overflow-hidden p-0">
      {/* Background Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--primary)_0%,transparent_70%)] opacity-10 transition-opacity duration-500 group-hover:opacity-15"
        aria-hidden="true"
      />

      {/* Interactive / Visual Canvas Container */}
      <div
        className="absolute inset-0 z-0 opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
        aria-hidden="true"
      />

      {/* Location Footer */}
      <div className="relative z-10 mt-auto w-full bg-gradient-to-t from-surface-sunken via-surface-sunken/70 to-transparent p-6 sm:p-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary-light backdrop-blur-sm">
            <MapPinIcon className="h-4 w-4 animate-pulse" aria-hidden="true" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight text-heading uppercase">
            {translate("contact.locationTitle")}
          </h3>
        </div>

        <p className="truncate font-mono text-xs font-semibold uppercase tracking-widest text-muted">
          {location}
        </p>
      </div>
    </section>
  );
}