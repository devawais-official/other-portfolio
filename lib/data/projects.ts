import portfolioData from "../portfolio.json";

export type Project = (typeof portfolioData.projects)[number];

export const projects: Project[] = portfolioData.projects;

export const platformFilters = Array.from(
  new Set(projects.map((p) => p.platform))
).sort();
