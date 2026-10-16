"use client";

import { RefreshCw, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import RepositoryCard from "@/components/repositories/repository-card";
import RepositoryFilters, {
    type RepositoryFilter,
} from "@/components/repositories/repository-filters";

import {
    useRepositories,
    useStartRepositoryIndexing,
    useSyncRepositories,
} from "@/hooks/use-repositories";

import type { Repository } from "@/types/repository";

export default function RepositoriesPage() {
    const router = useRouter();

    const {
        data: repositories = [],
        isPending,
        isError,
        error,
        refetch,
        isFetching,
    } = useRepositories();

    const {
        mutate: startIndexing,
        isPending: isStartingIndexing,
    } = useStartRepositoryIndexing();

    const {
        mutate: syncRepositories,
        isPending: isSyncing,
        error: syncError,
    } = useSyncRepositories();

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
        // Ignore double clicks while a start request is in flight.
        if (isStartingIndexing) {
            return;
        }

        startIndexing(repository.id);
    }

    function handleChatClick(repository: Repository) {
        router.push(`/chat/${encodeURIComponent(repository.id)}`);
    }

    function clearFilters() {
        setSearchQuery("");
        setActiveFilter("ALL");
    }

    if (isPending) {
        return (
            <main className="space-y-6 p-6 md:p-8">
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
                <section className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                        GitHub
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Repositories
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your GitHub repositories.
                    </p>
                </section>

                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
                    <h2 className="font-semibold">
                        Failed to load repositories
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {error instanceof Error
                            ? error.message
                            : "An unexpected error occurred."}
                    </p>

                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <RefreshCw
                            size={16}
                            className={isFetching ? "animate-spin" : ""}
                        />
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-8 p-6 md:p-8">
            {/* Header */}
            <section className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            GitHub
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Repositories
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={() => syncRepositories()}
                        disabled={isSyncing}
                        className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <RefreshCw
                            size={16}
                            className={isSyncing ? "animate-spin" : ""}
                        />
                        {isSyncing ? "Syncing..." : "Sync Repositories"}
                    </button>
                </div>

                <p className="max-w-2xl text-sm text-muted-foreground">
                    Manage your GitHub repositories, check indexing
                    status, and prepare repositories for code search.
                </p>

                {syncError && (
                    <p role="alert" className="text-sm text-destructive">
                        {syncError instanceof Error
                            ? syncError.message
                            : "Could not sync repositories. Try again."}
                    </p>
                )}
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
                        onClick={clearFilters}
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
                            : "Sync your GitHub repositories to load them here."}
                    </p>

                    {searchQuery.trim() ? (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                        >
                            Clear search and filters
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => syncRepositories()}
                            disabled={isSyncing}
                            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <RefreshCw
                                size={16}
                                className={isSyncing ? "animate-spin" : ""}
                            />
                            {isSyncing ? "Syncing..." : "Sync Repositories"}
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