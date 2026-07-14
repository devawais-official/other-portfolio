import portfolioData from "../portfolio.json";

export type BlogPost = (typeof portfolioData.blog)[number];

export const blogPosts: BlogPost[] = portfolioData.blog;
