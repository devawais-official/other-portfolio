export interface BlogPost {
    id: string;
    title: string;
    publishDate: string;
    link: string;
    thumbnailUrl: string;
    categories: string[];
    category: string;       // For UI Badge representation
    excerpt: string;        // Clean stripped HTML content
    readTime: number;       // Dynamically calculated read time
}

// 👈 Yeh interface add karein jo api.rss2json.com ke raw data ko map karega
export interface MediumRawItem {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: Record<string, any>;
    categories: string[];
}

export interface MediumRawFeed {
    status: string;
    feed: {
        url: string;
        title: string;
        link: string;
        author: string;
        description: string;
        image: string;
    };
    items: MediumRawItem[];
}