import { ENDPOINTS } from "@/utilities/endpoints";
import { Repository } from "@/types/repository";

export async function fetchRepositories(): Promise<Repository[]> {
    const response = await fetch(`${ENDPOINTS.REPOS}?refresh=false`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    return response.json()
}