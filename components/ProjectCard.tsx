"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Smartphone, ArrowUpRight } from "lucide-react";
import { HudFrame } from "./ui/hud-frame";
import { PlayStoreIcon, AppStoreIcon } from "./ui/store-icons";
import type { Project } from "@/lib/data/projects";
import { useI18n } from "@/lib/i18n";

const isPlayStoreLink = (url?: string) => Boolean(url?.includes("play.google.com"));

/** Falls back to a branded gradient panel when a project has no screenshot yet. */
function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        className="object-cover transition-all duration-700 [.is-hovered_&]:scale-110 [.is-hovered_&]:blur-[2px] [.is-hovered_&]:brightness-75"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center transition-transform duration-700 [.is-hovered_&]:scale-105"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${project.accent}33, transparent 60%), linear-gradient(160deg, #13161D 0%, #0B0D12 100%)`,
      }}
    >
      <Smartphone size={56} style={{ color: project.accent }} className="opacity-30" />
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const [isHovered, setIsHovered] = useState(false);
  const hasExternalLink = Boolean(project.url || project.iosUrl);

  return (
    <div
      className={`group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-2xl transition-all duration-500 hover:border-primary-light/40 hover:shadow-primary/10 ${isHovered ? "is-hovered" : ""
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((v) => !v)}
    >
      <HudFrame isHovered={isHovered} />

      <div className="relative h-full w-full">
        <ProjectMedia project={project} />

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blue-500/5 mix-blend-overlay opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute right-5 top-5 z-40 flex flex-col items-end gap-2">
          <span className="rounded-sm border border-primary/30 bg-primary/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(139,92,246,0.45)]">
            {project.platform}
          </span>
          <span className="rounded-sm border border-white/10 bg-bg/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary-light/90 shadow-xl">
            {project.category}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-40 bg-gradient-to-t from-bg via-bg/85 to-transparent px-6 pb-6 pt-16">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-block font-display text-xl font-bold tracking-tight text-ink transition-colors hover:text-primary-light sm:text-2xl"
          >
            {project.title}
          </Link>

          <div
            className={`grid transition-all duration-500 ${isHovered ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="overflow-hidden">
              <p className="text-sm leading-relaxed text-muted">{project.summary}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="border border-border bg-white/5 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide text-primary-light/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-primary/40 bg-primary/20 px-4 py-2.5 text-white transition-all duration-300 hover:bg-primary/30 min-h-[44px] min-w-[44px]"
                  >
                    {isPlayStoreLink(project.url) ? (
                      <PlayStoreIcon className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    )}
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest">
                      {project.ctaText || t("projects.ctaPlayStore")}
                    </span>
                  </a>
                )}
                {"iosUrl" in project && project.iosUrl && (
                  <a
                    href={project.iosUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-white/20 bg-white/10 px-4 py-2.5 text-white transition-all duration-300 hover:bg-white/20 min-h-[44px] min-w-[44px]"
                  >
                    <AppStoreIcon className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest">
                      {"iosCtaText" in project ? project.iosCtaText : t("projects.ctaAppStore")}
                    </span>
                  </a>
                )}
                {!hasExternalLink && (
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-white/20 bg-white/10 px-4 py-2.5 text-white transition-all duration-300 hover:bg-white/20 min-h-[44px] min-w-[44px]"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest">
                      {project.ctaText || t("projects.ctaDetails")}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
