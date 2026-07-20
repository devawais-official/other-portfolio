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
  href?: string;
  isExternal?: boolean;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

interface GenericCardProps {
  href?: string;
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
      className={`group relative aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-[rgba(var(--color-border),0.15)] bg-[rgba(var(--color-surface),0.2)] backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-primary/30 hover:shadow-primary/5 flex flex-col justify-between ${isHovered ? "is-hovered" : ""
        }`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered((prev) => !prev)}
    >
      {/* HUD Effect overlay */}
      <HUDFrame isHovered={isHovered} />

      {/* Dynamic overlay effect on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-primary/5 mix-blend-overlay opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* 🎯 FIX 1: Floating Badges Contrast Fix */}
      {badges.length > 0 && (
        <div className="absolute right-5 top-5 z-40 flex flex-col items-end gap-2">
          {badges.map((badge, idx) => {
            const isPrimary = badge.variant === "primary" || !badge.variant;
            return (
              <span
                key={idx}
                className={`rounded-full border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${isPrimary
                    ? "border-[rgba(var(--color-border),0.3)] bg-[rgba(var(--color-accent),1)] text-[rgba(var(--color-text-on-accent),1)] shadow-[0_0_15px_rgba(var(--color-accent),0.3)]"
                    : "border-[rgba(var(--color-border),0.4)] bg-[rgba(var(--color-primary),1)] text-[rgba(var(--color-text-on-accent),1)] shadow-[0_0_15px_rgba(var(--color-primary),0.2)]"
                  }`}
              >
                {badge.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Media Block */}
      <div className="w-full h-[40%] sm:h-[50%] relative flex items-center justify-center border-b border-[rgba(var(--color-border),0.1)]">
        {media}
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-40 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 flex-grow flex flex-col justify-end bg-gradient-to-t from-[rgba(var(--color-bg),0.95)] via-[rgba(var(--color-bg),0.6)] to-transparent">
        <h3 className="inline-block font-display text-lg font-bold tracking-tight text-ink sm:text-xl group-hover:text-[rgba(var(--color-primary),1)] transition-colors duration-300">
          {title}
        </h3>

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
                    className="border border-[rgba(var(--color-border),0.1)] bg-[rgba(var(--color-surface),0.3)] px-2 py-0.5 rounded-md font-mono text-[8px] font-semibold uppercase tracking-wide text-[rgba(var(--color-primary),0.9)]"
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            )}

            {/* 🎯 FIX 2: Action Buttons Shape and Color Setup */}
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
                      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 transition-all duration-300 min-h-[34px] border font-mono text-[9px] font-bold uppercase tracking-widest active:scale-95 ${isPrimary
                          ? "border-[rgba(var(--color-border),0.2)] bg-[rgba(var(--color-primary),1)] text-[rgba(var(--color-text-on-accent),1)] hover:bg-[rgba(var(--color-primary-light),1)] shadow-[0_2px_10px_rgba(var(--color-primary),0.2)]"
                          : "border-[rgba(var(--color-border),0.3)] bg-[rgba(var(--color-bg),0.6)] text-[rgba(var(--color-ink),1)] hover:bg-[rgba(var(--color-surface),0.5)] hover:border-[rgba(var(--color-primary),0.3)]"
                        }`}
                      {...extraProps}
                    >
                      {action.icon}
                      <span>{action.label}</span>
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