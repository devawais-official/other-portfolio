// src/services/github.service.ts

export interface GitHubStats {
    followers: number;
    stars: number;
}

interface GitHubUserResponse {
    followers?: number;
}

interface GitHubRepoResponse {
    stargazers_count?: number;
}

/**
 * Fetches user followers and total public repository stargazers count from GitHub API.
 * Uses Next.js data revalidation (1 hour caching) and optional GITHUB_TOKEN authentication.
 */
export async function getGitHubStatsAction(
    username: string
): Promise<GitHubStats> {
    const fallbackStats: GitHubStats = { followers: 0, stars: 0 };

    if (!username?.trim()) {
        return fallbackStats;
    }

    try {
        // Optional GITHUB_TOKEN header to avoid rate-limiting (60 req/hr unauth vs 5000 req/hr auth)
        const headers: Record<string, string> = {
            Accept: "application/vnd.github.v3+json",
            ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
        };

        const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
            headers,
            next: { revalidate: 604800 }, // 1 week cache time period to avoid rate limiting
        };

        // Parallel requests for user profile and repos
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, fetchOptions),
            fetch(
                `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
                fetchOptions
            ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
            console.warn(
                `[GitHubService] API returned non-200 status: User (${userRes.status}), Repos (${reposRes.status})`
            );
            return fallbackStats;
        }

        const userData: GitHubUserResponse = await userRes.json();
        const reposData: GitHubRepoResponse[] = await reposRes.json();

        const totalStars = Array.isArray(reposData)
            ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
            : 0;

        return {
            followers: userData.followers || 0,
            stars: totalStars,
        };
    } catch (error) {
        console.error("[GitHubService] Fetching failed, returning fallback:", error);
        return fallbackStats;
    }
}