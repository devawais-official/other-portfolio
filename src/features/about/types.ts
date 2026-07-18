// src/features/about/types.ts

export interface ExpertiseGroup {
    label: string;
    items: string[];
}
export interface Experience {
    slug: string;
    id: string;
    role: string;
    company: string;      // Yeh add karo
    duration: string;
    description: string;
    achievements: string[];
}

export interface AboutData {
    expertiseGroups: any[];
    experiences: Experience[];
    stats: any;
}
export interface Stats {
    yearsExperience: string;
    projectsCompleted: string;
    clientsSatisfied: string;
    appsOnStores: string;
}

