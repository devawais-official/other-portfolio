// src/services/github.service.ts

export interface GitHubStats {
    followers: number;
    stars: number;
}

export async function getGitHubStatsAction(username: string): Promise<GitHubStats> {
    if (!username) return { followers: 0, stars: 0 };

    try {
        // Dono requests parallel chalengi time bachane ke liye
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, {
                headers: { Accept: "application/vnd.github.v3+json" },
                next: { revalidate: 3600 } // 1 hour caching if using Next.js data caching
            }),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
                headers: { Accept: "application/vnd.github.v3+json" },
                next: { revalidate: 3600 }
            })
        ]);

        if (!userRes.ok || !reposRes.ok) {
            throw new Error("GitHub API responded with an error status");
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        let totalStars = 0;
        if (Array.isArray(reposData)) {
            totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
        }
        console.log("total followers", userData.followers);
        console.log("total stars", totalStars);

        return {

            followers: userData.followers || 0,
            stars: totalStars
        };
    } catch (error) {
        console.error("[GitHubService] Fetching failed, returning fallback:", error);
        return { followers: 0, stars: 0 }; // Domain fallback data safely returned
    }
}