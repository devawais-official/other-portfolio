// src/features/projects/data.ts

import { rawProjects } from "@/data";
import { getTranslationServer } from "@/i18n/i18n-server";
import type { Locale } from "@/i18n/config";
import { withTranslatedFields } from "@/lib/translated-data";

// 1. Raw Project shape coming from data files
export interface RawProject {
    id: number;
    slug: string;
    platform: string;
    image: string;
    url?: string;
    isOnPlayStore: boolean;
    isOnAppStore: boolean;
    iosUrl?: string;
    tech: string[];
    technology?: string;
    updatedAt?: string;
}

// 2. Localized Project structure with guaranteed string types
export interface Project extends RawProject {
    title: string;
    summary: string;
    category: string;
}

// 3. Helper to map single raw project to localized project using "projectsData" namespace
export function mapToLocalizedProject(
    raw: RawProject,
    translate: ReturnType<typeof getTranslationServer>
): Project {
    return withTranslatedFields(raw, "projectsData", translate, (st) => ({
        title: (st("title") ?? "") as string,
        summary: (st("summary") ?? "") as string,
        category: (st("category") ?? "") as string,
    })) as Project;
}

// 4. Async Data Fetcher
export async function getProjectData(locale: Locale): Promise<Project[]> {
    const translate = getTranslationServer(locale);
    return (rawProjects as RawProject[]).map((raw) =>
        mapToLocalizedProject(raw, translate)
    );
}