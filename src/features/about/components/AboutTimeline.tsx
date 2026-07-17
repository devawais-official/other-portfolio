// src/features/about/components/AboutTimeline.tsx
"use client";

import AnimatedSection from "@/components/layout/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { siteTheme } from "@/lib/theme-config";
import { useI18n } from "@/i18n/i18n-provider";
import type { Experience } from "../types";

interface AboutTimelineProps {
    experiences: Experience[];
}

export default function AboutTimeline({ experiences }: AboutTimelineProps) {
    const { translate } = useI18n();
    const { about: style } = siteTheme;

    return (
        <section className={style.timelineSection}>
            <div className={style.timelineLayout}>
                <SectionHeader
                    eyebrow={translate("about.experienceTitle")}
                    title={translate("about.experienceSubtitle")}
                    className={style.timelineHeaderClass}
                />
                <div className={style.timelineContainer}>
                    {experiences.map((exp, i) => (
                        <AnimatedSection key={exp.id} delay={i * 0.06} className={style.experienceCard}>
                            <div>
                                <p className={style.expDuration}>{exp.duration}</p>
                                <h3 className={style.expRole}>{exp.role}</h3>
                                <p className={style.expCompany}>{exp.company}</p>
                            </div>
                            <div>
                                <p className={style.expDesc}>{exp.description}</p>
                                <ul className={style.achievementsList}>
                                    {exp.achievements.map((a) => (
                                        <li key={a} className={style.achievementItem}>
                                            <span className={style.bulletPoint} />
                                            {a}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}