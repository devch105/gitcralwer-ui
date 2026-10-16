import type { Repository } from "@/types/repository";
import { apiFetch } from "@/utilities/api";
import { ENDPOINTS } from "@/utilities/endpoints";

async function request<T>(
  url: string,
  init: RequestInit | undefined,
  errorMessage: string
): Promise<T> {
  const res = await apiFetch(url, init);
  if (!res.ok) {
    throw new Error(`${errorMessage} (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const fetchRepositories = () =>
  request<Repository[]>(
    `${ENDPOINTS.REPOS}?refresh=false`,
    undefined,
    "Failed to fetch repositories"
  );

/** Pull the latest repositories from GitHub and return the updated list. */
export const syncRepositories = () =>
  request<Repository[]>(
    `${ENDPOINTS.REPOS}/sync`,
    { method: "POST" },
    "Failed to sync repositories"
  );

export const startRepositoryIndexing = (repositoryId: string) =>
  request<Repository>(
    `${ENDPOINTS.REPOS}/${encodeURIComponent(repositoryId)}/index`,
    { method: "POST" },
    "Failed to start repository indexing"
  );

export const fetchRepository = (repositoryId: string) =>
  request<Repository>(
    `${ENDPOINTS.REPOS}/${encodeURIComponent(repositoryId)}`,
    undefined,
    "Failed to fetch repository"
  );

/** Fetch the user's most recently indexed repositories. */
export const fetchRecentlyIndexedRepos = (limit = 5) =>
  request<Repository[]>(
    `${ENDPOINTS.REPOS}/recently-indexed?limit=${limit}`,
    undefined,
    "Failed to fetch recently indexed repositories"
  );