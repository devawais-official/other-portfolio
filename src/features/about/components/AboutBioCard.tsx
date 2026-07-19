// src/components/sections/AboutBioCard.tsx
"use client";

import { useEffect, useState } from "react";
import AnimatedSection from "@/components/layout/AnimatedSection";
import { siteConfig } from "@/lib/site-config";
import { siteTheme } from "@/lib/site-config";
import { useI18n } from "@/i18n/i18n-provider";
import data from "@/data/personal-data.json";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "@/components/icons/icons";
import { getGitHubStatsAction, GitHubStats } from "../services/githubService";

interface AboutBioCardProps {
    stats: {
        yearsExperience: string;
        projectsCompleted: string;
        clientsSatisfied: string;
        appsOnStores: string;
    };
    tagline?: string;
    availability?: string;
}

export default function AboutBioCard({ stats, tagline, availability }: AboutBioCardProps) {
    const { translate } = useI18n();
    const { about: style } = siteTheme;

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

    const finalTagline = !tagline || tagline === "aboutData.roleVal" || tagline === "aboutData.role"
        ? "Mobile App Developer"
        : tagline;

    const finalAvailability = !availability || availability === "aboutData.availability"
        ? "Available for freelance"
        : availability;

    const statEntries = [
        { label: translate("aboutData.stats.experience"), value: stats.yearsExperience },
        { label: translate("aboutData.stats.completed"), value: stats.projectsCompleted },
        { label: translate("aboutData.stats.satisfied"), value: stats.clientsSatisfied },
        { label: translate("aboutData.stats.stores"), value: stats.appsOnStores },
    ];

    const initials = siteConfig.shortName || "MA";

    return (
        // 🎯 Note: Style config classes updated below to prevent overlap and handle dynamic height
        <AnimatedSection className={`${style.bioCard} flex flex-col justify-between h-auto min-h-full gap-6 pb-8`}>

            {/* Top Area: Avatar + Name + Basic Info */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary font-bold text-lg border border-primary/20">
                        {initials}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-mint/80 bg-mint/5 px-2.5 py-1 rounded-full border border-mint/10">
                        {finalAvailability}
                    </span>
                </div>

                <h2 className={style.bioName}>{siteConfig.name}</h2>
                <p className={style.bioTagline}>{finalTagline}</p>

                <dl className="mt-5 flex flex-col gap-2.5 text-sm">
                    <div className={style.infoRow}>
                        <dt className={style.infoLabel}>{translate("aboutData.infoTitle")}</dt>
                        <dd className={style.infoValue}>{translate("aboutData.infoLocation")}</dd>
                    </div>
                    <div className={style.infoRow}>
                        <dt className={style.infoLabel}>{translate("aboutData.infoFocus")}</dt>
                        <dd className={style.infoValue}>{translate("aboutData.infoFocusVal")}</dd>
                    </div>
                </dl>
            </div>

            {/* Middle Area: Work Metrics (2x2 Grid) */}
            <div className="pt-5 border-t border-white/5">
                <div className={style.statsGrid}>
                    {statEntries.map((s) => (
                        <div key={s.label} className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.02]">
                            <p className={style.statValue}>{s.value}</p>
                            <p className={style.statLabel}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Area: Social Audience & Action */}
            <div className="pt-5 border-t border-white/5 mt-auto">
                {/* Social Credibility Stats (Dynamic GitHub + Live Static LinkedIn) */}
                <div className="grid grid-cols-2 gap-3 mb-5">

                    {/* GitHub Box */}
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <GithubIcon className="text-primary text-base" />
                        <div className="min-w-0">
                            <div className="flex items-baseline gap-3">
                                <div>
                                    <p className="text-sm font-mono font-bold leading-none text-ink">
                                        {githubStats.loading ? "..." : githubStats.followers}
                                    </p>
                                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-1">
                                        Followers
                                    </p>
                                </div>
                                <span className="text-muted/30 text-xs font-mono">·</span>
                                <div>
                                    <p className="text-sm font-mono font-bold leading-none text-ink">
                                        {githubStats.loading ? "..." : `${githubStats.stars} ★`}
                                    </p>
                                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-1">
                                        Stars
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LinkedIn Box */}
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <LinkedinIcon className="text-primary text-base" />
                        <div>
                            <p className="text-sm font-mono font-bold leading-none text-ink">
                                {stats.projectsCompleted || "1,200+"}
                            </p>
                            {/* 🛠️ Idhar bhi text size aur contrast tight kar diya taaki easily read ho sake */}
                            <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-1.5">
                                Connections
                            </p>
                        </div>
                    </div>
                </div>

                {/* Fixed Action Button: Sleek, visible, and non-overlapping */}
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-center text-xs font-mono font-bold tracking-wider uppercase border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                >
                    <DownloadIcon size={14} className="transition-transform duration-300 group-hover:translate-y-[-1px]" />
                    Download CV / Resume
                </a>
            </div>
        </AnimatedSection>
    );
}
