"use client";

import AnimatedSection from "@/components/layout/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { siteTheme } from "@/lib/theme-config";
import { useI18n } from "@/i18n/i18n-provider";

interface ExpertiseGroup {
    label: string;
    items: string[];
}

interface AboutExpertiseProps {
    expertiseGroups: ExpertiseGroup[];
}

export default function AboutExpertise({ expertiseGroups }: AboutExpertiseProps) {
    const { translate } = useI18n();
    const { about: style } = siteTheme;

    return (
        <div>
            <SectionHeader
                eyebrow={translate("about.expertiseTitle")}
                title={translate("about.expertiseSubtitle")}
            />
            <div className={style.expertiseGrid}>
                {expertiseGroups.map((group, i) => (
                    <AnimatedSection key={group.label} delay={i * 0.05} className={style.expertiseCard}>
                        <h3 className={style.expertiseTitle}>{group.label}</h3>
                        <div className={style.tagsContainer}>
                            {group.items.map((item) => (
                                <span key={item} className={style.tagSpan}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}