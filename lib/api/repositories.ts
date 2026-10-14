
import { ENDPOINTS } from "@/utilities/endpoints";
import type { Repository } from "@/types/repository";

export async function fetchRepositories(): Promise<Repository[]> {
    const response = await fetch(`${ENDPOINTS.REPOS}?refresh=false`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch repositories: ${response.statusText}`
        );
    }

    return response.json();
}

export async function startRepositoryIndexing(
    repositoryId: string
): Promise<Repository> {
    const response = await fetch(
        `${ENDPOINTS.REPOS}/${repositoryId}/index`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to start repository indexing: ${response.statusText}`
        );
    }

    return response.json();
}

export async function fetchRepository(
    repositoryId: string
): Promise<Repository> {
    const response = await fetch(
        `${ENDPOINTS.REPOS}/${repositoryId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch repository: ${response.statusText}`
        );
    }

    return response.json();
}

/**
 * Fetch the user's most recently indexed repositories.
 */
export async function fetchRecentlyIndexedRepos(
    limit = 5
): Promise<Repository[]> {
    const url = new URL(`${ENDPOINTS.REPOS}/recently-indexed`);
    url.searchParams.set("limit", String(limit));

    const response = await fetch(url.toString(), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch recently indexed repositories: ${response.statusText}`
        );
    }

    

    return response.json();
}