"use client"

import {useQuery } from "@tanstack/react-query";
import { Repository } from "@/types/repository";
import { fetchRepositories } from "@/lib/api/repositories";

export function useRepositories() {

    return useQuery({
        queryKey: ["repositories"],
        queryFn: fetchRepositories,
    })
}
