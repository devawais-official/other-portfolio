import { getTranslationServer } from "@/i18n/i18n-server";
import { Locale } from "@/i18n/config";


import rawProjects from "@/data/projects.json";
import rawTestimonials from "@/data/testimonials.json";
import rawExperiences from "@/data/experiences.json";
import rawServices from "@/data/services.json";

export function getLocalizedPortfolioData(locale: Locale) {
    const t = getTranslationServer(locale);


    const projects = rawProjects.map((project) => {
        const baseKey = `projectsData.${project.slug}`;
        return {
            ...project,
            title: t(`${baseKey}.title`),
            category: t(`${baseKey}.category`),
            summary: t(`${baseKey}.summary`),
            description: t(`${baseKey}.description`),
            ctaText: t(`${baseKey}.ctaText`),
            altText: t(`${baseKey}.altText`),

            highlights: [0, 1, 2].map((id) => t(`${baseKey}.highlights.${id}`)),
        };
    });


    const testimonials = rawTestimonials.map((item) => ({
        ...item,
        message: t(`testimonialsData.${item.slug}.message`),
    }));


    const experiences = rawExperiences.map((exp) => {
        const baseKey = `experiencesData.${exp.slug}`;
        return {
            ...exp,
            role: t(`${baseKey}.role`),
            description: t(`${baseKey}.description`),

            achievements: [0, 1, 2].map((id) => t(`${baseKey}.achievements.${id}`)),
        };
    });


    const services = rawServices.map((service) => {
        const baseKey = `servicesData.${service.slug}`;
        return {
            ...service,
            title: t(`${baseKey}.title`),
            description: t(`${baseKey}.description`),
        };
    });

    return {
        projects,
        testimonials,
        experiences,
        services,
    };
}