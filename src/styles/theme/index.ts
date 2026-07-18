import { globalsTheme } from './globals';
import { headerTheme, footerTheme } from './layout';
import { buttonTheme, sectionHeaderTheme, testimonialCardTheme } from './components';
import {
    homeTheme,
    heroTheme,
    aboutTheme,
    contactTheme,
    projectsTheme,
    servicesTheme,
    blogTheme,
    notFoundTheme
} from './sections';

export const siteTheme = {
    ...globalsTheme,

    // Layout
    header: headerTheme,
    footer: footerTheme,

    // Components
    button: buttonTheme,
    sectionHeader: sectionHeaderTheme,
    testimonialCard: testimonialCardTheme,

    // Pages & Sections
    home: homeTheme,
    hero: heroTheme,
    about: aboutTheme,
    contact: contactTheme,
    projects: projectsTheme,
    services: servicesTheme,
    blog: blogTheme,
    notFoundPage: notFoundTheme,
};