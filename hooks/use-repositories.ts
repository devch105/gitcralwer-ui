
"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    fetchRepositories,
    startRepositoryIndexing,
} from "@/lib/api/repositories";

import type { Repository } from "@/types/repository";

export function useRepositories() {
    return useQuery<Repository[]>({
        queryKey: ["repositories"],
        queryFn: fetchRepositories,

        // Poll while at least one repository is being indexed.
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

export function useStartRepositoryIndexing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (repositoryId: string) =>
            startRepositoryIndexing(repositoryId),

        onSuccess: (repository) => {
            // Immediately update the individual repository
            // in case the UI uses this query later.
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

            // Fetch the latest repository list.
            queryClient.invalidateQueries({
                queryKey: ["repositories"],
            });
        },
    });
}
