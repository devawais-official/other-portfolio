// src/features/projects/configs/projects-config.ts

import localeEn from "@/i18n/locales/en.json";
export const PROJECT_FILTER_KEYS = Object.keys(localeEn.projects.filters).filter(
    (key) => key !== "all"
);

export interface ProjectsGridConfig {
    allLabel: string;
    filters: { value: string; label: string }[];
    labels: {
        noProjectsFound: string;
        viewProject: string;
        backToAll: string;
        techStack: string;
        ctaPlayStore: string;
        ctaAppStore: string;
        ctaDetails: string;
    };
}

export function getProjectsGridConfig(translate: (key: string) => string): ProjectsGridConfig {
    const safeTranslate = (key: string, fallback: string) => {
        const val = translate(key);
        return val === key || val.startsWith("projects.") ? fallback : val;
    };

    return {
        // Direct call to projects.filters.all
        allLabel: safeTranslate("projects.filters.all", "All"),

        // 3. Filters list ab pure dynamic keys par loop karegi bina kisi hardcoding ke!
        filters: PROJECT_FILTER_KEYS.map((key) => ({
            value: key, // "android", "kmp", etc. (Matches project.platform in data)
            label: safeTranslate(`projects.filters.${key}`, key.toUpperCase())
        })),

        labels: {
            noProjectsFound: safeTranslate("projects.noProjectsFound", "No projects found for this category."),
            backToAll: safeTranslate("projects.backToProjects", "Back to Projects"),
            viewProject: safeTranslate("projects.ctas.details", "View Details"),
            techStack: safeTranslate("projects.techStack", "Tech Stack"),

            // Nested CTAs
            ctaPlayStore: safeTranslate("projects.ctas.playStore", "Google Play"),
            ctaAppStore: safeTranslate("projects.ctas.appStore", "App Store"),
            ctaDetails: safeTranslate("projects.ctas.details", "View Details"),
        }
    };
}