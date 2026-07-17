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
    const styles = siteTheme.projects; // 👈 Layout styles extracted

    // 1. Media Block using siteTheme classes
    const media = project.image ? (
        <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className={styles.imageTransition}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
    ) : (
        <div
            aria-hidden
            className={styles.iconFallbackTransition}
            style={{
                background: `radial-gradient(circle at 30% 20%, ${project.accent}33, transparent 60%), linear-gradient(160deg, #13161D 0%, #0B0D12 100%)`,
            }}
        >
            <Smartphone size={56} style={{ color: project.accent }} className={styles.fallbackIconColorOpacity} />
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