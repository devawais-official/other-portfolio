// src/features/about/types.ts

export interface ExpertiseGroup {
    label: string;
    items: string[];
}

export interface Experience {
    id: number;
    duration: string;
    role: string;
    company: string;
    description: string;
    achievements: string[];
}

export interface Stats {
    yearsExperience: string;
    projectsCompleted: string;
    clientsSatisfied: string;
    appsOnStores: string;
}

export interface AboutData {
    expertiseGroups: ExpertiseGroup[];
    experiences: Experience[];
    stats: Stats;
}