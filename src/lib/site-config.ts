import { SiteConfig, NavLink } from "@/types/site";
import { siteTheme } from "./theme-config";
import data from "@/data/personal-data.json";
import { FaGithub, FaLinkedin, FaMedium, FaStackOverflow, FaTwitter } from "react-icons/fa6";
import { Locale } from "next-intl";

const SITE_URL = "https://devawais.com";

type LocalizedPageMeta = {
  title: string;
  desc: string;
  keywords: string[];
};

type PageMetaEntry = {
  slug: string;
  keyPrefix: string;
  translations: Record<Locale, LocalizedPageMeta>;
};
export const siteConfig: SiteConfig = {
  name: data.name,
  shortName: data.shortName,
  role: data.title,
  tagline: data.subtitle,
  bio: data.bio,
  email: data.email,
  location: data.location,
  availability: data.availability,
  url: SITE_URL,
  description: `${data.name} (Devawais) — ${data.title} specializing in Android, Kotlin Multiplatform (KMP), and Flutter app development.`,
  keywords: [
    "Muhammad Awais",
    "Devawais",
    "Awais",
    "Android Developer",
    "Mobile Developer",
    "Kotlin Multiplatform",
    "Flutter Developer",
    "Jetpack Compose",
    "Compose Multiplatform",
  ],
  social: data.social,
  expertise: {
    languages: ["Kotlin", "Java", "Dart", "TypeScript"],
    android: ["Jetpack Compose", "Coroutines"],
    multiplatform: ["Compose Multiplatform", "KMP"],
    flutter: ["Flutter", "Bloc", "Dart"],
    architecture: ["MVI", "MVVM", "Clean Architecture"],
  },
};

export const socialLinks = [
  { href: data.social.github, icon: FaGithub, label: "GitHub" },
  { href: data.social.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: data.social.twitter, icon: FaTwitter, label: "Twitter" },
  { href: data.social.stackoverflow, icon: FaStackOverflow, label: "Stack Overflow" },
  { href: data.social.medium, icon: FaMedium, label: "Medium" },
];

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const siteRoutes = {
  home: "/",
  about: "/about",
  services: "/services",
  projects: "/projects",
  testimonials: "/testimonials",
  blog: "/blog",
  contact: "/contact",
} as const;

export const pageMetaDefaults = {
  home: { slug: "home", keyPrefix: "home" },
  testimonials: { slug: "testimonials", keyPrefix: "testimonials" },
  services: { slug: "services", keyPrefix: "services" },
  about: { slug: "about", keyPrefix: "about" },
  blog: { slug: "blog", keyPrefix: "blog" },
  contact: { slug: "contact", keyPrefix: "contact" },
  projects: { slug: "projects", keyPrefix: "projects" },
} as const;

export { siteTheme };