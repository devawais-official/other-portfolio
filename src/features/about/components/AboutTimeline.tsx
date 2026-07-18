// src/features/about/components/AboutTimeline.tsx
"use client";

import AnimatedSection from "@/components/layout/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { siteTheme } from "@/lib/site-config";
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
                        <AnimatedSection
                            key={exp.id}
                            delay={i * 0.06}
                            className={style.experienceCard}
                        >
                            {/* Left Column: Role Meta (Takes 1/4 layout on desktop) */}
                            <div className="flex flex-col gap-1 md:col-span-1">
                                <span className={style.expDuration}>{exp.duration}</span>
                                <h3 className={style.expRole}>{exp.role}</h3>
                                <p className={style.expCompany}>{exp.company}</p>
                            </div>

                            {/* Right Column: Detailed Experience (Takes 3/4 layout on desktop) */}
                            <div className="md:col-span-3 flex flex-col gap-4">
                                <p className={style.expDesc}>
                                    {exp.description}
                                </p>

                                {exp.achievements && exp.achievements.length > 0 && (
                                    <ul className={style.achievementsList}>
                                        {exp.achievements.map((a, aIdx) => (
                                            <li
                                                key={`${exp.id}-ach-${aIdx}`}
                                                className={style.achievementItem}
                                            >
                                                <span className={style.bulletPoint}>—</span>
                                                <span>{a}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}