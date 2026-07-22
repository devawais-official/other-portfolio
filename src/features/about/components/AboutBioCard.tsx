"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/i18n/i18n-client";
import data from "@/data/personal-data.json";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "@/components/icons/icons";
import { getGitHubStatsAction, type GitHubStats } from "../services/githubService";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import type { Stats } from "../types";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface AboutBioCardProps {
  stats: Stats;
  tagline?: string;
  availability?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function AboutBioCard({ stats, tagline, availability }: AboutBioCardProps) {
  const { translate } = useI18n();

  // --- Dynamic GitHub Stats State ---
  const [githubStats, setGithubStats] = useState<GitHubStats & { loading: boolean }>({
    followers: 0,
    stars: 0,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;
    getGitHubStatsAction(data.usernames.github).then((res) => {
      if (!isMounted) return;
      setGithubStats({
        ...res,
        loading: false,
      });
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const finalTagline =
    !tagline || tagline === "aboutData.roleVal" || tagline === "aboutData.role"
      ? translate("aboutData.roleVal") || "Mobile App Developer"
      : tagline;

  const finalAvailability =
    !availability || availability === "aboutData.availability"
      ? translate("aboutData.availability") || "Available for freelance"
      : availability;

  const statEntries = [
    { label: translate("aboutData.stats.experience"), value: stats.yearsExperience },
    { label: translate("aboutData.stats.completed"), value: stats.projectsCompleted },
    { label: translate("aboutData.stats.satisfied"), value: stats.clientsSatisfied },
    { label: translate("aboutData.stats.stores"), value: stats.appsOnStores },
  ];

  const resumeHref = "/resume.pdf";

  return (
    <AnimatedSection className="card-surface flex min-h-[500px] flex-col justify-between gap-8 p-6 pb-8">
      {/* Top Section: Dev Picture Avatar + Identity + Key Metadata */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border/40 bg-primary/15 shadow-sm">
            <Image
              src="/brand/dev-pic.webp"
              alt={siteConfig.name}
              fill
              className="object-cover object-top"
              sizes="56px"
              priority
            />
          </div>
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-light">
            {finalAvailability}
          </span>
        </div>

        <h2 className="font-display text-2xl font-bold text-heading">
          {siteConfig.name}
        </h2>
        <p className="mt-1 text-sm text-muted">{finalTagline}</p>

        <dl className="mt-5 flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{translate("aboutData.infoTitle")}</dt>
            <dd className="font-medium text-heading">
              {translate("aboutData.infoLocation")}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{translate("aboutData.infoFocus")}</dt>
            <dd className="font-medium text-heading">
              {translate("aboutData.infoFocusVal")}
            </dd>
          </div>
        </dl>
      </div>

      {/* Middle Section: Deliverables Grid (2x2) */}
      <div className="grid grid-cols-2 gap-4 border-t border-border/20 pt-6">
        {statEntries.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/30 bg-surface/50 p-3.5 backdrop-blur-sm"
          >
            <p className="font-display text-xl font-bold text-heading">{s.value}</p>
            <p className="mt-1 text-xs text-muted/90">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bottom Section: Social Credibility & Resume Action */}
      <div className="mt-auto flex w-full flex-col">
        {/* Social Credibility Badges */}
        <div className="grid grid-cols-2 gap-3 border-t border-border/20 pt-5">
          {/* GitHub Stats */}
          <div className="flex items-center gap-2.5 rounded-xl border border-border/30 bg-surface/60 p-3">
            <GithubIcon className="shrink-0 text-base text-primary-light" />
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <div>
                  <p className="font-mono text-xs font-bold leading-none text-heading">
                    {githubStats.loading ? "..." : githubStats.followers}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">
                    {translate("aboutData.githubFollowers") || "Followers"}
                  </p>
                </div>
                <span className="font-mono text-xs text-muted/40">·</span>
                <div>
                  <p className="font-mono text-xs font-bold leading-none text-heading">
                    {githubStats.loading ? "..." : `${githubStats.stars}★`}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">
                    {translate("aboutData.githubStars") || "Stars"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn Connections */}
          <div className="flex items-center gap-2.5 rounded-xl border border-border/30 bg-surface/60 p-3">
            <LinkedinIcon className="shrink-0 text-base text-primary-light" />
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold leading-none text-heading">
                500+
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">
                {translate("aboutData.linkedinConnections") || "Connections"}
              </p>
            </div>
          </div>
        </div>

        {/* Download Resume Button */}
        <a
          href={resumeHref}
          target="_blank"
          rel="noreferrer"
          className="btn-primary group mt-5 flex w-full items-center justify-center gap-2"
        >
          <DownloadIcon
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          {translate("aboutData.downloadCv") || "Download CV / Resume"}
        </a>
      </div>
    </AnimatedSection>
  );
}