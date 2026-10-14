"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import RepositoryCard from "@/components/repositories/repository-card";
import RepositoryFilters, {
    type RepositoryFilter,
} from "@/components/repositories/repository-filters";

import {
    useRepositories,
    useStartRepositoryIndexing,
} from "@/hooks/use-repositories";

import  DashboardHeader from "@/components/dashboard/DashboardHeader";
import type { Repository } from "@/types/repository";

export default function RepositoriesPage() {
    const router = useRouter();

    const {
        data: repositories = [],
        isPending,
        isError,
        error,
    } = useRepositories();

    const {
        mutate: startIndexing,
        isPending: isStartingIndexing,
    } = useStartRepositoryIndexing();

    const [activeFilter, setActiveFilter] =
        useState<RepositoryFilter>("ALL");

    const [searchQuery, setSearchQuery] = useState("");

    const filteredRepositories = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return repositories.filter((repo) => {
            const matchesSearch =
                !query ||
                [
                    repo.name,
                    repo.fullName,
                    repo.description,
                    repo.owner,
                    repo.language,
                ].some((value) =>
                    value?.toLowerCase().includes(query)
                );

            if (!matchesSearch) {
                return false;
            }

            switch (activeFilter) {
                case "PUBLIC":
                    return !repo.isPrivate;

                case "PRIVATE":
                    return repo.isPrivate;

                case "COMPLETED":
                    return repo.indexStatus === "DONE";

                case "PENDING":
                case "INDEXING":
                case "FAILED":
                    return repo.indexStatus === activeFilter;

                default:
                    return true;
            }
        });
    }, [repositories, activeFilter, searchQuery]);

    function handleIndex(repository: Repository) {
        startIndexing(repository.id);
    }

    function handleChatClick(repository: Repository) {
        router.push(`/chat/${encodeURIComponent(repository.id)}`);
    }

    if (isPending) {
        return (
            <main className="space-y-6 p-6 md:p-8">
                {/* //<DashboardHeader /> */}
                <div className="flex min-h-60 items-center justify-center">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
                        Loading repositories...
                    </div>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="space-y-6 p-6 md:p-8">
                {/* <DashboardHeader /> */}

                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
                    <h2 className="font-semibold">
                        Failed to load repositories
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {error instanceof Error
                            ? error.message
                            : "An unexpected error occurred."}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-8 p-6 md:p-8">
            {/* Header */}
            <section className="space-y-2">
                {/* <DashboardHeader /> */}

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

            {/* Search */}
            <section className="space-y-3">
                <label
                    htmlFor="repository-search"
                    className="text-sm font-medium"
                >
                    Search repositories
                </label>

                <div className="relative max-w-xl">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                        id="repository-search"
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(event.target.value)
                        }
                        placeholder="Search by name, owner, language..."
                        className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-10 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />

                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            aria-label="Clear repository search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
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

                {(searchQuery || activeFilter !== "ALL") && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            setActiveFilter("ALL");
                        }}
                        className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* Repository grid */}
            {filteredRepositories.length === 0 ? (
                <div className="rounded-xl border border-dashed p-12 text-center">
                    <Search className="mx-auto h-8 w-8 text-muted-foreground" />

                    <h2 className="mt-3 font-semibold">
                        {searchQuery.trim()
                            ? "No matching repositories"
                            : "No repositories found"}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {searchQuery.trim()
                            ? "Try another search term or change your selected filter."
                            : "There are no repositories matching this filter."}
                    </p>

                    {(searchQuery || activeFilter !== "ALL") && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setActiveFilter("ALL");
                            }}
                            className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                        >
                            Clear search and filters
                        </button>
                    )}
                </div>
            ) : (
                <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredRepositories.map((repository) => (
                        <RepositoryCard
                            key={repository.id}
                            repository={repository}
                            onIndex={handleIndex}
                            onChat={handleChatClick}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}