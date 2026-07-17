import { projects, testimonials, stats } from "@/data/index";

export const getHomeData = () => ({
    featuredProjects: projects.slice(0, 3),
    featuredTestimonials: testimonials.slice(0, 3),
    stats,
    processStepIds: ["01", "02", "03", "04"] as const,
});