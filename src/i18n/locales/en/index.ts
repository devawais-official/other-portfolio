import ui from "./ui.json";
import seo from "./seo.json";
import projects from "./projects.json";
import testimonials from "./testimonials.json";
import experiences from "./experiences.json";
import services from "./services.json";

const en = {

    ...ui,

    seo: {
        ...seo
    },
    projectsData: projects,
    testimonialsData: testimonials,
    experiencesData: experiences,
    servicesData: services,
};

export default en;