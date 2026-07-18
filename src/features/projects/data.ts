// src/features/projects/data.ts
import { rawProjects } from "@/data";
import { getTranslationServer } from "@/i18n/i18n-server";
import { Locale } from "@/i18n/config";
// src/features/projects/data.ts

export interface Project {
    id: number;
    slug: string;
    title: string;
    summary: string;
    category: string;
    platform: string;
    image: string;
    url?: string;
    iosUrl?: string;     // Ye missing tha!
    accent: string;      // Ye missing tha!
    tech: string[];
}

export const getProjectData = async (locale: Locale): Promise<Project[]> => {
    const t = await getTranslationServer(locale);

    return rawProjects.map((raw) => {
        return {
            ...raw, // ...raw mein id, slug, platform, image, url, iosUrl, accent, tech sab aa jayenge
            title: t(`projectsData.${raw.slug}.title`),
            summary: t(`projectsData.${raw.slug}.summary`),
            category: t(`projectsData.${raw.slug}.category`),
        } as Project; // Explicit cast taake TS satisfied rahe
    });
};