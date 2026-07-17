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
  href: string;
  isExternal?: boolean;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

interface GenericCardProps {
  /** The main click destination of the card */
  href: string;
  title: string;
  summary: string;
  /** Pass the image or a custom fallback block from parent */
  media: ReactNode;
  /** Top-right floating badges */
  badges?: CardBadge[];
  /** Bottom tags (e.g. tech stack, keywords) */
  tags?: CardTag[];
  /** Actions like CTA buttons (Play Store, App Store, etc.) */
  actions?: CardAction[];
}

export default function GenericCard({
  href,
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
      className={`group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-2xl transition-all duration-500 hover:border-primary-light/40 hover:shadow-primary/10 ${isHovered ? "is-hovered" : ""
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((v) => !v)}
    >
      {/* HUD Effect overlay */}
      <HUDFrame isHovered={isHovered} />

      <div className="relative h-full w-full">
        {/* Render media container */}
        <div className="absolute inset-0 overflow-hidden">
          {media}
        </div>

        {/* Overlay effect on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-blue-500/5 mix-blend-overlay opacity-0 transition-opacity duration-700 group-hover:opacity-100"
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
                      ? "border-primary/30 bg-primary/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.45)]"
                      : "border-white/10 bg-bg/90 text-primary-light/90 shadow-xl"
                    }`}
                >
                  {badge.text}
                </span>
              );
            })}
          </div>
        )}

        {/* Bottom Content Area */}
        <div className="absolute inset-x-0 bottom-0 z-40 bg-gradient-to-t from-bg via-bg/85 to-transparent px-6 pb-6 pt-16">
          <Link
            href={href}
            className="inline-block font-display text-xl font-bold tracking-tight text-ink transition-colors hover:text-primary-light sm:text-2xl"
          >
            {title}
          </Link>

          {/* Expandable Hover Panel */}
          <div
            className={`grid transition-all duration-500 ${isHovered ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="overflow-hidden">
              <p className="text-sm leading-relaxed text-muted">{summary}</p>

              {/* Tags (e.g. Tech stack) */}
              {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="border border-border bg-white/5 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide text-primary-light/80"
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
                        href={action.href}
                        onClick={(e) => e.stopPropagation()}
                        className={`relative inline-flex items-center gap-2 overflow-hidden rounded-sm px-4 py-2.5 text-white transition-all duration-300 min-h-[44px] min-w-[44px] border ${isPrimary
                            ? "border-primary/40 bg-primary/20 hover:bg-primary/30"
                            : "border-white/20 bg-white/10 hover:bg-white/20"
                          }`}
                        {...extraProps}
                      >
                        {action.icon}
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest">
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
    </div>
  );
}