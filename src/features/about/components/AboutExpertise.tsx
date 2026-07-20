// src/features/about/components/AboutExpertise.tsx
"use client";

import AnimatedSection from "@/components/layout/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { siteTheme } from "@/lib/site-config";
import { useI18n } from "@/i18n/i18n-client";
import { AndroidIcon, FlutterIcon, LanguageIcon, LinkedinIcon, StackOutlinedIcon, ToolIcon } from "@/components/icons/icons";

interface ExpertiseGroup {
    label: string;
    items: string[];
}

interface AboutExpertiseProps {
    expertiseGroups: ExpertiseGroup[];
}

const getGroupIcon = (label: string) => {
    const cleanLabel = label.toLowerCase();
    if (cleanLabel.includes("lang") || cleanLabel.includes("coding")) {
        return <LanguageIcon className="text-[rgba(var(--color-primary),1)] text-sm shrink-0" />;
    }
    if (cleanLabel.includes("multi") || cleanLabel.includes("kmp") || cleanLabel.includes("cross")) {
        return <LinkedinIcon className="text-[rgba(var(--color-primary),1)] text-sm shrink-0" />;
    }
    if (cleanLabel.includes("flutter")) {
        return <FlutterIcon className="text-[rgba(var(--color-primary),1)] text-sm shrink-0" />;
    }
    if (cleanLabel.includes("arch") || cleanLabel.includes("design")) {
        return <StackOutlinedIcon className="text-[rgba(var(--color-primary),1)] text-sm shrink-0" />;
    }
    if (cleanLabel.includes("tool") || cleanLabel.includes("env")) {
        return <ToolIcon className="text-[rgba(var(--color-primary),1)] text-sm shrink-0" />;
    }
    return <AndroidIcon className="text-[rgba(var(--color-primary),1)] text-sm shrink-0" />;
};

export default function AboutExpertise({ expertiseGroups }: AboutExpertiseProps) {
    const { translate } = useI18n();
    const { about: style } = siteTheme;

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <SectionHeader
                    eyebrow={translate("about.expertiseTitle")}
                    title={translate("about.expertiseSubtitle")}
                />
            </div>

            <div className={style.expertiseGrid}>
                {expertiseGroups.map((group, i) => (
                    <AnimatedSection
                        key={group.label}
                        delay={i * 0.05}
                        className={style.expertiseCard}
                    >
                        {/* Decorative background glow for high-end feel on card hover */}
                        <div className="absolute -right-4 -top-4 w-12 h-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all duration-300 pointer-events-none" />

                        {/* Heading + Dynamic Icon row */}
                        <div className="flex items-center gap-2 border-b border-[rgba(var(--color-border),0.08)] pb-2">
                            {getGroupIcon(group.label)}
                            <h3 className={style.expertiseTitle}>{group.label}</h3>
                        </div>

                        {/* Dynamic Minimalist Tag Pills */}
                        <div className={style.tagsContainer}>
                            {group.items.map((item, itemIdx) => (
                                <span
                                    key={`${group.label}-${item}-${itemIdx}`}
                                    className={style.tagSpan}
                                >
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