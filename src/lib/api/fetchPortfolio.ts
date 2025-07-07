import type { portfolioItem } from "$lib/types/portfolioItem";

export default async function fetchItems(): Promise<portfolioItem[]> {
		try {
			const [res1, res2] = await Promise.all([
				fetch('/api/items'),
				fetch(import.meta.env.VITE_GITHUB_API_URL)
			]);

			if (!res1.ok) throw new Error(`DB fetch failed: ${res1.status}`);
			if (!res2.ok) throw new Error(`GitHub fetch failed: ${res2.status}`);

			const DBData = await res1.json();
			const githubData = await res2.json();

			const transformedGithubData = githubData
				.filter((repo) => isValidGitHubUrl(repo.html_url))
				.map((repo) => ({
					id: repo.id,
					title: repo.name,
					description: repo.description || 'No description provided.',
					img_url: null,
					url: repo.html_url
				}));

			return [...DBData, ...transformedGithubData];
		} catch (error) {
			console.error('Error fetching items:', error);
            return [];
		}
	}

	function isValidGitHubUrl(url: string): boolean {
		try {
			const parsed = new URL(url);
			return parsed.hostname === 'github.com' && /^\/[^/]+\/[^/]+$/.test(parsed.pathname);
		} catch {
			return false;
		}
	}