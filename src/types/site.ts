export interface SocialLinks {
    github: string;
    linkedin: string;
    twitter?: string;
    email?: string;
    stackoverflow?: string;
    medium?: string;
}

export interface Expertise {
    languages: string[];
    android: string[];
    multiplatform: string[];
    flutter: string[];
    architecture: string[];
}

export interface SiteConfig {
    name: string;
    shortName: string;
    role: string;
    tagline: string;
    bio: string;
    email: string;
    location: string;
    availability: string;
    social: SocialLinks;
    expertise: Expertise;
    url: string;
    description: string;
    keywords: string[];
}

export interface NavLink {
    href: string;
    label: string;
}