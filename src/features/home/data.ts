// src/features/home/data/index.ts
import { stats, testimonials, rawProjects } from "@/data/index";
import { getTranslationServer } from "@/i18n/i18n-server";
import { Locale } from "@/i18n/config";
import { withTranslatedList } from "@/lib/translated-data";

export const getHomeData = async (locale: Locale) => {
    const translate = getTranslationServer(locale);

    const featuredProjects = withTranslatedList(
        rawProjects.slice(0, 3),
        "projectsData",
        translate,
        (t) => ({
            title: t("title"),
            summary: t("summary"),
            category: t("category"),
        })
    );

    const featuredTestimonials = withTranslatedList(
        testimonials.slice(0, 3),
        "testimonialsData",
        translate,
        (t) => ({
            message: t("message"),
        })
    );

    return {
        featuredProjects,
        featuredTestimonials,
        stats,
        processStepIds: ["01", "02", "03", "04"] as const,
    };
};