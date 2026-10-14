"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRecentlyIndexedRepos } from "@/lib/api/repositories";

export function useRecentlyIndexedRepos(limit = 5) {
    return useQuery({
        queryKey: ["recently-indexed-repos", limit],
        queryFn: () => fetchRecentlyIndexedRepos(limit),
        staleTime: 30_000,
        refetchOnWindowFocus: true,
    });
}