import portfolioData from "../portfolio.json";

export type Testimonial = (typeof portfolioData.testimonials)[number];

export const testimonials: Testimonial[] = portfolioData.testimonials;
