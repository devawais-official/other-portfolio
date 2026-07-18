// src/features/about/components/AboutView.tsx
"use client";

import PageHeader from "@/components/ui/PageHeader";
import { siteTheme } from "@/lib/site-config";
import type { StandardPageLabels } from "@/utils/label-helper";

// Local Sub-components
import AboutBioCard from "./AboutBioCard";
import AboutExpertise from "./AboutExpertise";
import AboutTimeline from "./AboutTimeline";
import { AboutData } from "../types";

interface AboutViewProps {
    labels: StandardPageLabels;
    data: AboutData; // 🎯 Clean domain model reference
    tagline: string;
    availability: string;
}

export default function AboutView({ labels, data, tagline, availability }: AboutViewProps) {
    const { about: style } = siteTheme;

    return (
        <>
            <PageHeader
                eyebrow={labels.title}
                title={labels.headerTitle}
                description={labels.headerDesc}
            />

            <section className={style.sectionPadding}>
                <div className={style.mainGrid}>
                    {/* Left Column - Stats & Bio */}
                    <AboutBioCard
                        stats={data.stats}
                        tagline={tagline}
                        availability={availability}
                    />

                    {/* Right Column - Skill Tags */}
                    <AboutExpertise expertiseGroups={data.expertiseGroups} />
                </div>
            </section>

            {/* Experience Timeline Section */}
            <AboutTimeline experiences={data.experiences} />

        </>
    );
}