// src/components/sections/AboutBioCard.tsx
"use client";

import { useEffect, useState } from "react";
import AnimatedSection from "@/components/layout/AnimatedSection";
import { siteConfig } from "@/lib/site-config";
import { siteTheme } from "@/lib/theme-config";
import { useI18n } from "@/i18n/i18n-provider";
import { FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { social } from "@/data/personal-data.json"
import { } from "@/data/stats.json"
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
    const [githubStats, setGithubStats] = useState({ followers: 0, stars: 0, loading: true });

    useEffect(() => {
        // Apne github username ko siteConfig se le rahe hain
        const username = social.github || "devawais-official";

        async function fetchGitHubData() {
            try {
                // 1. Fetch User Profile for Followers
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userRes.json();

                // 2. Fetch Repositories to calculate Total Stars
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                const reposData = await reposRes.json();

                let totalStars = 0;
                if (Array.isArray(reposData)) {
                    totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
                }

                setGithubStats({
                    followers: userData.followers || 0,
                    stars: totalStars,
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching GitHub stats:", error);
                setGithubStats((prev) => ({ ...prev, loading: false }));
            }
        }

        fetchGitHubData();
    }, []);

    const finalTagline = !tagline || tagline === "about.role"
        ? "Mobile App Developer"
        : tagline;

    const finalAvailability = !availability || availability === "about.availability"
        ? "Available for freelance"
        : availability;

    const statEntries = [
        { label: translate("about.stats.experience"), value: stats.yearsExperience },
        { label: translate("about.stats.completed"), value: stats.projectsCompleted },
        { label: translate("about.stats.satisfied"), value: stats.clientsSatisfied },
        { label: translate("about.stats.stores"), value: stats.appsOnStores },
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
                        <dt className={style.infoLabel}>{translate("about.infoTitle")}</dt>
                        <dd className={style.infoValue}>{translate("about.infoLocation")}</dd>
                    </div>
                    <div className={style.infoRow}>
                        <dt className={style.infoLabel}>{translate("about.infoFocus")}</dt>
                        <dd className={style.infoValue}>{translate("about.infoFocusVal")}</dd>
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

                    {/* GitHub Box (Loads actual Live Stars or Followers) */}
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/5">
                        <FiGithub className="text-primary text-sm" />
                        <div>
                            <p className="text-xs font-mono font-bold leading-none text-ink">
                                {githubStats.loading ? "..." : `${githubStats.followers} / ${githubStats.stars} ★`}
                            </p>
                            <p className="text-[8px] font-mono text-muted/60 uppercase tracking-wider mt-1">
                                Followers / Stars
                            </p>
                        </div>
                    </div>

                    {/* LinkedIn Box */}
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/5">
                        <FiLinkedin className="text-primary text-sm" />
                        <div>
                            <p className="text-xs font-mono font-bold leading-none text-ink">
                                {stats.projectsCompleted || "1,200+"}
                            </p>
                            <p className="text-[8px] font-mono text-muted/60 uppercase tracking-wider mt-1">
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
                    className="group relative flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-center text-xs font-mono font-bold tracking-wider uppercase border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
                >
                    <FiDownload size={13} className="transition-transform duration-300 group-hover:translate-y-[-1px]" />
                    Download CV / Resume
                </a>
            </div>
        </AnimatedSection>
    );
}