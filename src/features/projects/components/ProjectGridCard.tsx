// src/features/projects/components/ProjectGridCard.tsx

"use client";

import Image from "next/image";
import { Smartphone, ArrowUpRight } from "lucide-react";
import { Project } from "@/data";
import GenericCard, { CardAction, CardBadge } from "@/components/ui/PreviewCard";
import { AppStoreIcon, PlayStoreIcon } from "@/components/icons/StoreIcons";
import { siteTheme } from "@/lib/theme-config";

const isPlayStoreLink = (url?: string) => Boolean(url?.includes("play.google.com"));

interface ProjectGridCardProps {
    project: Project;
    labels: {
        ctaPlayStore: string;
        ctaAppStore: string;
        ctaDetails: string;
    };
}

export default function ProjectGridCard({ project, labels }: ProjectGridCardProps) {
    const styles = siteTheme.projects;

    // 🎯 1. Updated Media Block: Center contained image frame to prevent raw bleed & contrast clash
    // 🎯 Clear, large, and centered icon block optimized for transparent PNGs
    const media = project.image ? (
        <div className="w-full h-full flex flex-col items-center justify-center pt-8 pb-4">
            {/* Soft ambient glow strictly behind the logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative w-32 h-32 z-10 transition-transform duration-500 group-hover:scale-105">
                <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                    sizes="128px"
                />
            </div>
        </div>
    ) : (
        <div aria-hidden className="w-full h-full flex items-center justify-center pt-8 pb-4">
            <div className="relative w-28 h-28 rounded-2xl flex items-center justify-center border border-white/10 bg-white/[0.02] shadow-inner">
                <Smartphone size={40} style={{ color: project.accent }} className={styles.fallbackIconColorOpacity} />
            </div>
        </div>
    );

    // 2. Badges mapping
    const badges: CardBadge[] = [
        { text: project.platform, variant: "primary" },
        { text: project.category, variant: "secondary" }
    ];

    // 3. Tags mapping
    const tags = project.tech.slice(0, 4).map(t => ({ text: t }));

    // 4. Action Buttons mapping
    const actions: CardAction[] = [];

    if (project.url) {
        actions.push({
            label: project.ctaText || labels.ctaPlayStore,
            href: project.url,
            isExternal: true,
            variant: "primary",
            icon: isPlayStoreLink(project.url)
                ? <PlayStoreIcon className={styles.storeIconStyle} />
                : <ArrowUpRight className={styles.storeIconStyle} />
        });
    }

    if (project.iosUrl) {
        actions.push({
            label: project.iosCtaText || labels.ctaAppStore,
            href: project.iosUrl,
            isExternal: true,
            variant: "secondary",
            icon: <AppStoreIcon className={styles.storeIconStyle} />
        });
    }

    if (!project.url && !project.iosUrl) {
        actions.push({
            label: project.ctaText || labels.ctaDetails,
            href: `/projects/${project.slug}`,
            isExternal: false,
            variant: "secondary",
            icon: <ArrowUpRight className={styles.storeIconStyle} />
        });
    }

    return (
        <GenericCard
            href={`/projects/${project.slug}`}
            title={project.title}
            summary={project.summary}
            media={media}
            badges={badges}
            tags={tags}
            actions={actions}
        />
    );
}