// src/lib/metadata.ts (or any shared utils file)

export interface StandardPageLabels {
    title: string;
    headerTitle: string;
    headerDesc: string;
}

/**
 * Har page ke standard meta/header keys ko automatically translate karne ka generic helper
 */
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