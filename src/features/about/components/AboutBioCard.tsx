"use client";

import AnimatedSection from "@/components/layout/AnimatedSection";
import { siteConfig } from "@/lib/site-config";
import { siteTheme } from "@/lib/theme-config";
import { useI18n } from "@/i18n/i18n-provider";

interface AboutBioCardProps {
    stats: {
        yearsExperience: string;
        projectsCompleted: string;
        clientsSatisfied: string;
        appsOnStores: string;
    };
    tagline: string;
    availability: string;
}

export default function AboutBioCard({ stats, tagline, availability }: AboutBioCardProps) {
    const { translate } = useI18n();
    const { about: style } = siteTheme;

    const statEntries = [
        { label: translate("about.stats.experience"), value: stats.yearsExperience },
        { label: translate("about.stats.completed"), value: stats.projectsCompleted },
        { label: translate("about.stats.satisfied"), value: stats.clientsSatisfied },
        { label: translate("about.stats.stores"), value: stats.appsOnStores },
    ];

    const initials = siteConfig.shortName || "MA";

    return (
        <AnimatedSection className={style.bioCard}>
            <div className={style.avatarBadge}>{initials}</div>
            <h2 className={style.bioName}>{siteConfig.name}</h2>
            <p className={style.bioTagline}>{tagline}</p>

            <dl className={style.infoList}>
                <div className={style.infoRow}>
                    <dt className={style.infoLabel}>{translate("about.infoTitle")}</dt>
                    <dd className={style.infoValue}>{translate("about.infoLocation")}</dd>
                </div>
                <div className={style.infoRow}>
                    <dt className={style.infoLabel}>{translate("about.infoAvailability")}</dt>
                    <dd className={style.infoValue}>{availability}</dd>
                </div>
                <div className={style.infoRow}>
                    <dt className={style.infoLabel}>{translate("about.infoFocus")}</dt>
                    <dd className={style.infoValue}>{translate("about.infoFocusVal")}</dd>
                </div>
            </dl>

            <div className={style.statsGrid}>
                {statEntries.map((s) => (
                    <div key={s.label}>
                        <p className={style.statValue}>{s.value}</p>
                        <p className={style.statLabel}>{s.label}</p>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
}