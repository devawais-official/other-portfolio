import { testimonials, stats, rawProjects } from "@/data/index";
import testimonialMessages from "@/data/testimonials.json";
import { getTranslationServer } from "@/i18n/i18n-server";
import { Locale } from "@/i18n/config";
import { Project } from "@/features/projects/data";

export const getHomeData = async (locale: Locale) => {
    const translate = await getTranslationServer(locale);

    const featuredProjects: Project[] = rawProjects.slice(0, 3).map((raw) => ({
        ...raw,
        title: translate(`projectsData.${raw.slug}.title`),
        summary: translate(`projectsData.${raw.slug}.summary`),
        category: translate(`projectsData.${raw.slug}.category`),
    }));

    const featuredTestimonials = testimonials.slice(0, 3).map((item) => ({
        ...item,
        message: (testimonialMessages as any)[item.slug]?.message || ""
    }));

    return {
        featuredProjects,
        featuredTestimonials,
        stats,
        processStepIds: ["01", "02", "03", "04"] as const,
    };
};