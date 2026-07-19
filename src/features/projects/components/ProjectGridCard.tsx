"use client";

import Image from "next/image";
// IMPORTANT: Yahan wahi interface import karo jo tumne features/projects/types.ts mein banaya hai
import { Project } from "@/features/projects/data";
import GenericCard, { CardAction, CardBadge } from "@/components/ui/PreviewCard";
import { AppStoreIcon, ArrowUpRightIcon, PlayStoreIcon, SmartphoneIcon } from "@/components/icons/icons";
import { siteTheme } from "@/lib/site-config";

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

    // Media Block
    const media = project.image ? (
        <div className="w-full h-full flex flex-col items-center justify-center pt-8 pb-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-32 h-32 z-10 transition-transform duration-500 group-hover:scale-105">
                <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                    sizes="128px"
                    priority
                />
            </div>
        </div>
    ) : (
        <div aria-hidden className="w-full h-full flex items-center justify-center pt-8 pb-4">
            <div className="relative w-28 h-28 rounded-2xl flex items-center justify-center border border-white/10 bg-white/[0.02] shadow-inner">
                <SmartphoneIcon size={40} style={{ color: project.accent }} className={styles.fallbackIconColorOpacity} />
            </div>
        </div>
    );

    // Badges
    const badges: CardBadge[] = [
        { text: project.platform, variant: "primary" },
        { text: project.category, variant: "secondary" }
    ];

    // Tags
    const tags = project.tech.slice(0, 4).map(t => ({ text: t }));

    // Action Buttons
    const actions: CardAction[] = [];

    // PlayStore / URL button
    if (project.url) {
        actions.push({
            label: labels.ctaPlayStore, // Ab yeh prop se aa raha hai
            href: project.url,
            isExternal: true,
            variant: "primary",
            icon: isPlayStoreLink(project.url)
                ? <PlayStoreIcon className={styles.storeIconStyle} />
                : <ArrowUpRightIcon className={styles.storeIconStyle} />
        });
    }

    // AppStore button
    if (project.iosUrl) {
        actions.push({
            label: labels.ctaAppStore,
            href: project.iosUrl,
            isExternal: true,
            variant: "secondary",
            icon: <AppStoreIcon className={styles.storeIconStyle} />
        });
    }

    // Details button (fallback)
    if (!project.url && !project.iosUrl) {
        actions.push({
            label: labels.ctaDetails,
            href: `/projects/${project.slug}`,
            isExternal: false,
            variant: "secondary",
            icon: <ArrowUpRightIcon className={styles.storeIconStyle} />
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