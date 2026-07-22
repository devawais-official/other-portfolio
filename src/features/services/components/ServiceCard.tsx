// src/features/services/components/ServiceCard.tsx
"use client";

import {
  SERVICES_ICON_MAP,
  type LocalizedServiceItem,
} from "../configs/services-config";
import { StackOutlinedIcon } from "@/components/icons/icons";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface ServiceCardProps {
  service: LocalizedServiceItem;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = SERVICES_ICON_MAP[service.iconName] ?? StackOutlinedIcon;

  return (
    <article className="card-surface group relative flex h-full flex-col justify-between p-6 transition-all duration-300 hover:border-primary/40 sm:p-7">
      {/* Upper Content */}
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary-light transition-transform duration-500 group-hover:scale-105">
          <IconComponent size={20} aria-hidden="true" />
        </div>

        <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-heading transition-colors duration-300 group-hover:text-primary-light">
          {service.title}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {service.description}
        </p>
      </div>

      {/* Tech Stack Badges */}
      <div className="mt-6 flex flex-wrap gap-2">
        {service.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-border/20 bg-surface-sunken/40 px-3 py-1 font-mono text-xs font-medium text-muted transition-all duration-300 group-hover:border-primary/30 group-hover:text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}