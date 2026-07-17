// src/utils/date.ts

/**
 * Formats a date string (e.g., "2026-06-23 18:16:21") into a localized full date and time string.
 * Output example: "Jun 23, 2026, 6:16 PM"
 */
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