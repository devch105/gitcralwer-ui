"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    fetchRepositories,
    syncRepositories,
    startRepositoryIndexing,
} from "@/lib/api/repositories";

import type { Repository } from "@/types/repository";

const REPOSITORIES_KEY = ["repositories"] as const;
const INDEXING_POLL_MS = 2000;

export function useRepositories() {
    return useQuery<Repository[]>({
        queryKey: REPOSITORIES_KEY,
        queryFn: fetchRepositories,

        // Overview and the repositories page share this cache entry, so
        // moving between them reuses the data instead of refetching.
        staleTime: 5 * 60_000,
        refetchOnWindowFocus: false,

        // Poll only while something is indexing, and stop if a poll fails
        // so a broken backend is not hit every interval.
        refetchInterval: (query) => {
            if (query.state.status === "error") {
                return false;
            }

            const repositories = query.state.data;

            const isIndexing = repositories?.some(
                (repository) => repository.indexStatus === "INDEXING"
            );

            return isIndexing ? INDEXING_POLL_MS : false;
        },
    });
}

export function useSyncRepositories() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: syncRepositories,

        // The sync endpoint already returns the full list,
        // so write it to the cache instead of refetching.
        onSuccess: (repositories) => {
            queryClient.setQueryData<Repository[]>(
                REPOSITORIES_KEY,
                repositories
            );
        },
    });
}

export function useStartRepositoryIndexing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: startRepositoryIndexing,

        // The response carries the repository with status INDEXING.
        // Writing it to the cache is enough: it also starts the polling
        // above, so no invalidate (and no extra request) is needed.
        onSuccess: (repository) => {
            queryClient.setQueryData<Repository[]>(
                REPOSITORIES_KEY,
                (repositories) =>
                    repositories?.map((repo) =>
                        repo.id === repository.id ? repository : repo
                    )
            );
        },

        // If the start was rejected (for example, already indexing),
        // reload the list so the UI shows the real state.
        onError: () => {
            queryClient.invalidateQueries({
                queryKey: REPOSITORIES_KEY,
            });
        },
    });
}