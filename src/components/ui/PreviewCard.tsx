// src/components/ui/PreviewCard.tsx
"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { HUDFrame } from "./HUDFrame";

export interface CardBadge {
  text: string;
  variant?: "primary" | "secondary";
}

export interface CardTag {
  text: string;
}

export interface CardAction {
  label: string;
  href?: string
  isExternal?: boolean;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

interface GenericCardProps {
  href?: string
  title: string;
  summary: string;
  media: ReactNode;
  badges?: CardBadge[];
  tags?: CardTag[];
  actions?: CardAction[];
}

export default function GenericCard({
  title,
  summary,
  media,
  badges = [],
  tags = [],
  actions = [],
}: GenericCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-[#0f241a]/40 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-primary/30 hover:shadow-primary/5 flex flex-col justify-between ${isHovered ? "is-hovered" : ""
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* HUD Effect overlay */}
      <HUDFrame isHovered={isHovered} />

      {/* Dynamic overlay effect on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-primary/5 mix-blend-overlay opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Floating Badges (Top Right) */}
      {badges.length > 0 && (
        <div className="absolute right-5 top-5 z-40 flex flex-col items-end gap-2">
          {badges.map((badge, idx) => {
            const isPrimary = badge.variant === "primary" || !badge.variant;
            return (
              <span
                key={idx}
                className={`rounded-sm border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest ${isPrimary
                  ? "border-primary/30 bg-primary/90 text-white shadow-[0_0_15px_rgba(var(--primary-rgb),0.45)]"
                  : "border-white/10 bg-black/80 text-primary/90 shadow-xl"
                  }`}
              >
                {badge.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Media Block: Height managed beautifully across mobile & desktop */}
      <div className="w-full h-[40%] sm:h-[50%] relative flex items-center justify-center border-b border-white/[0.03]">
        {media}
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-40 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 flex-grow flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        {/* 🎯 Fix 404: Direct specific project detailed link */}
        <h3 className="inline-block font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
          {title}
        </h3>

        {/* 🎯 Mobile optimization: `sm:grid-rows-[0fr]` resets to 0 only on desktop till hovered */}
        <div
          className={`grid transition-all duration-500 mt-2 ${isHovered
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[1fr] opacity-100 sm:grid-rows-[0fr] sm:opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <p className="text-xs leading-relaxed text-muted mt-1 line-clamp-2 sm:line-clamp-none">
              {summary}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wide text-primary/80"
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            )}

            {/* Action CTAs */}
            {actions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {actions.map((action, idx) => {
                  const isPrimary = action.variant === "primary";
                  const Comp = action.isExternal ? "a" : Link;
                  const extraProps = action.isExternal
                    ? { target: "_blank", rel: "noreferrer" }
                    : {};

                  return (
                    <Comp
                      key={idx}
                      href={action.href || "#"}
                      onClick={(e) => e.stopPropagation()}
                      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-sm px-3 py-2 text-white transition-all duration-300 min-h-[34px] border ${isPrimary
                        ? "border-primary/40 bg-primary/20 hover:bg-primary/30"
                        : "border-white/20 bg-white/10 hover:bg-white/20"
                        }`}
                      {...extraProps}
                    >
                      {action.icon}
                      <span className="font-mono text-[8px] font-bold uppercase tracking-widest">
                        {action.label}
                      </span>
                    </Comp>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}