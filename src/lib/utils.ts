import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFullDateTime(dateStr?: string): string {
    if (!dateStr) return "";

    // Normalize space to 'T' for cross-browser compatibility (e.g., Safari)
    const normalizedDate = dateStr.replace(" ", "T");

    return new Date(normalizedDate).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export interface StandardPageLabels {
    title: string;
    headerTitle: string;
    headerDesc: string;
}

export function getStandardPageLabels(
    translate: (key: string) => string,
    pageKey: string
): StandardPageLabels {
    return {
        title: translate(`${pageKey}.title`),
        headerTitle: translate(`${pageKey}.headerTitle`),
        headerDesc: translate(`${pageKey}.headerDesc`),
    };
}

export function getLocalizedPath(path: string, locale: string): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
}

export function getInitials(name: string): string {
    if (!name) return "";

    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
}