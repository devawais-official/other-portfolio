import portfolioData from "./portfolio.json";

const { profile, expertise, seo } = portfolioData;

// The production domain isn't "content" that changes per update, so it
// stays a small constant here rather than living in portfolio.json.
const SITE_URL = "https://devawais.com";

export const siteConfig = {
  name: profile.name,
  shortName: profile.shortName,
  role: profile.title,
  tagline: profile.subtitle,
  bio: profile.bio,
  email: profile.email,
  location: profile.location,
  availability: profile.availability,
  social: profile.social,
  expertise,
  url: SITE_URL,
  description: seo.description,
  keywords: seo.keywords,
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
