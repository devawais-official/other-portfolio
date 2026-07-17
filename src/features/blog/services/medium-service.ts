import { BlogPost, MediumRawFeed } from "../types";

/**
 * Clean HTML entities like &amp;, &#39;, &quot; etc.
 */
function decodeHTMLEntities(text: string): string {
    if (!text) return "";
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ");
}

/**
 * Strips style tags, HTML tags, and retrieves a clean text excerpt
 */
function extractExcerpt(htmlContent: string, maxLength = 160): string {
    if (!htmlContent) return "";

    // 1. Remove script and style tags entirely with their inner contents
    let cleanText = htmlContent.replace(/<(style|script|svg)[^>]*>[\s\S]*?<\/\1>/gi, "");

    // 2. Strip all remaining HTML tags
    cleanText = cleanText.replace(/<\/?[^>]+(>|$)/g, " ");

    // 3. Decode entities & clean whitespaces
    cleanText = decodeHTMLEntities(cleanText)
        .replace(/\s+/g, " ")
        .trim();

    return cleanText.length > maxLength
        ? `${cleanText.substring(0, maxLength).trim()}...`
        : cleanText;
}

/**
 * Extracts first image URL from HTML content to use as thumbnail
 */
function extractThumbnail(htmlContent: string): string {
    if (!htmlContent) return "";
    // Medium specific tag source match
    const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : "";
}

/**
 * Calculates average read time based on standard 200 words per minute
 */
function calculateReadTime(htmlContent: string): number {
    if (!htmlContent) return 1;
    // Strip scripts, styles and tags first so code doesn't inflate word count
    const cleanText = htmlContent
        .replace(/<(style|script|svg)[^>]*>[\s\S]*?<\/\1>/gi, "")
        .replace(/<[^>]*>/g, " ");

    const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Fetches and structures Medium posts cleanly (Zero client-side parser dependencies)
 */
export async function fetchMediumBlogs(username: string): Promise<BlogPost[]> {
    const feedUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    try {
        const response = await fetch(apiUrl, {
            next: { revalidate: 3600 }, // Caches data for 1 hour on server
        });

        if (!response.ok) {
            console.warn(`Medium API returned status ${response.status}`);
            return [];
        }

        const data: MediumRawFeed = await response.json();
        if (data.status !== "ok" || !data.items) return [];

        return data.items.map((item) => {
            const content = item.content || item.description || "";
            const rawCategory = item.categories && item.categories.length > 0
                ? item.categories[0]
                : "Android";

            return {
                id: item.guid || item.link,
                title: decodeHTMLEntities(item.title), // 👈 Beautiful clean titles
                publishDate: item.pubDate,
                link: item.link,
                thumbnailUrl: item.thumbnail || extractThumbnail(content) || "/images/placeholder.svg",
                categories: item.categories || [],
                category: rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1),
                excerpt: extractExcerpt(content), // 👈 Pure clean readable text
                readTime: calculateReadTime(content), // 👈 Accurate word count estimation
            };
        });
    } catch (error) {
        console.error("Medium Service Error:", error);
        return [];
    }
}