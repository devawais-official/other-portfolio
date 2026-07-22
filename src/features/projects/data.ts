// src/features/projects/data.ts

import { rawProjects } from "@/data";
import { getTranslationServer } from "@/i18n/i18n-server";
import type { Locale } from "@/i18n/config";
import { withTranslatedFields } from "@/lib/translated-data";

export interface Project {
    id: number;
    slug: string;
    title: string;
    summary: string;
    category: string;
    platform: string;
    image: string;
    url?: string;
    isOnPlayStore: boolean;
    isOnAppStore: boolean;
    iosUrl?: string;
    tech: string[];
}

export async function getProjectData(locale: Locale): Promise<Project[]> {
    const translate = getTranslationServer(locale);

    return rawProjects.map((raw) =>
        withTranslatedFields(raw, "projectsData", translate, (st) => ({
            title: st("title"),
            summary: st("summary"),
            category: st("category"),
        }))
    ) as Project[];
}