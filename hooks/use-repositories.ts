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

export function useRepositories() {
    const queryClient = useQueryClient();

    return useQuery<Repository[]>({
        queryKey: ["repositories"],
        queryFn: fetchRepositories,

        refetchInterval: (query) => {
            const repositories = query.state.data;

            if (!repositories) {
                return false;
            }

            const isIndexing = repositories.some(
                (repository) =>
                    repository.indexStatus === "INDEXING"
            );

            return isIndexing ? 1000 : false;
        },
    });
}

export function useSyncRepositories() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: syncRepositories,

        onSuccess: (repositories) => {
            queryClient.setQueryData<Repository[]>(
                ["repositories"],
                repositories
            );
        },
    });
}

export function useStartRepositoryIndexing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (repositoryId: string) =>
            startRepositoryIndexing(repositoryId),

        onSuccess: (repository) => {
            queryClient.setQueryData<Repository[]>(
                ["repositories"],
                (repositories) => {
                    if (!repositories) {
                        return repositories;
                    }

                    return repositories.map((repo) =>
                        repo.id === repository.id
                            ? repository
                            : repo
                    );
                }
            );

            queryClient.invalidateQueries({
                queryKey: ["repositories"],
            });
        },
    });
}