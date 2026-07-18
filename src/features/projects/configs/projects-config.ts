export const PROJECT_FILTER_KEYS = ["android", "kmp", "flutter"] as const;
export type ProjectFilterKey = typeof PROJECT_FILTER_KEYS[number];

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

    // Improved fallback mechanism
    const safeTranslate = (key: string, fallback: string) => {
        const val = translate(key);
        // Agar translation key wapis aa rahi hai (missing), toh fallback show karo
        return val === key ? fallback : val;
    };

    return {
        allLabel: safeTranslate("projects.filters.all", "All"),

        // Filters map securely using defined keys
        filters: PROJECT_FILTER_KEYS.map((key) => ({
            value: key,
            label: safeTranslate(`projects.filters.${key}`, key.charAt(0).toUpperCase() + key.slice(1))
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