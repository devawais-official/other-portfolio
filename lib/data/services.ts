import portfolioData from "../portfolio.json";

export type Service = (typeof portfolioData.services)[number];

export const services: Service[] = portfolioData.services;
