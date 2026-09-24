"use client";

import { useMemo, useState } from "react";

import RepositoryCard from "@/components/repositories/repository-card";
import RepositoryFilters, {
  type RepositoryFilter,
} from "@/components/repositories/repository-filters";

import { useRepositories } from "@/hooks/use-repositories";
import type { Repository } from "@/types/repository";

export default function RepositoriesPage() {
    const {
        data: repositories = [],
        isPending,
        isError,
        error,
    } = useRepositories();

    const [activeFilter, setActiveFilter] =
        useState<RepositoryFilter>("ALL");

    const filteredRepositories = useMemo(() => {
        switch (activeFilter) {
            case "PUBLIC":
                return repositories.filter(
                    (repo) => !repo.isPrivate
                );

            case "PRIVATE":
                return repositories.filter(
                    (repo) => repo.isPrivate
                );

            case "COMPLETED":
            case "PENDING":
            case "INDEXING":
            case "FAILED":
                return repositories.filter(
                    (repo) => repo.indexStatus === activeFilter
                );

            default:
                return repositories;
        }
    }, [repositories, activeFilter]);

    function handleIndex(repository: Repository) {
        console.log(
            "Index repository:",
            repository.fullName
        );
    }

    if (isPending) {
        return (
            <main className="p-6">
                <div className="text-sm text-muted-foreground">
                    Loading repositories...
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="p-6">
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                    <h2 className="font-semibold">
                        Failed to load repositories
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {error.message}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-8 p-6 md:p-8">
            {/* Header */}
            <section className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                    GitHub
                </p>

                <h1 className="text-3xl font-bold tracking-tight">
                    Repositories
                </h1>

                <p className="max-w-2xl text-sm text-muted-foreground">
                    Manage your GitHub repositories, check indexing
                    status, and prepare repositories for code search.
                </p>
            </section>

            {/* Filters */}
            <section>
                <RepositoryFilters
                    repositories={repositories}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
            </section>

            {/* Result count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                        {filteredRepositories.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                        {repositories.length}
                    </span>{" "}
                    repositories
                </p>
            </div>

            {/* Repository grid */}
            {filteredRepositories.length === 0 ? (
                <div className="rounded-xl border border-dashed p-12 text-center">
                    <h2 className="font-semibold">
                        No repositories found
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        There are no repositories matching this filter.
                    </p>
                </div>
            ) : (
                <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredRepositories.map((repository) => (
                        <RepositoryCard
                            key={repository.id}
                            repository={repository}
                            onIndex={handleIndex}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}