

import { rawProjects } from "@/data";
import { getTranslationServer } from "@/i18n/i18n-server";
import type { Locale } from "@/i18n/config";
import { withTranslatedFields } from "@/lib/translated-data";


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


export interface Project extends RawProject {
    title: string;
    summary: string;
    category: string;
}


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


export async function getProjectData(locale: Locale): Promise<Project[]> {
    const translate = getTranslationServer(locale);
    return (rawProjects as RawProject[]).map((raw) =>
        mapToLocalizedProject(raw, translate)
    );
}