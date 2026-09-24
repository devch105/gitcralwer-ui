"use client";

import type { Repository } from "@/types/repository";

export type RepositoryFilter =
    | "ALL"
    | "PUBLIC"
    | "PRIVATE"
    | "COMPLETED"
    | "PENDING"
    | "INDEXING"
    | "FAILED";

interface RepositoryFiltersProps {
    repositories: Repository[];
    activeFilter: RepositoryFilter;
    onFilterChange: (filter: RepositoryFilter) => void;
}

const filters: {
    key: RepositoryFilter;
    label: string;
}[] = [
    { key: "ALL", label: "All" },
    { key: "PUBLIC", label: "Public" },
    { key: "PRIVATE", label: "Private" },
    { key: "COMPLETED", label: "Indexed" },
    { key: "PENDING", label: "Pending" },
    { key: "INDEXING", label: "Indexing" },
    { key: "FAILED", label: "Failed" },
];

function getCount(
    repositories: Repository[],
    filter: RepositoryFilter
) {
    switch (filter) {
        case "PUBLIC":
            return repositories.filter((repo) => !repo.isPrivate).length;

        case "PRIVATE":
            return repositories.filter((repo) => repo.isPrivate).length;

        case "COMPLETED":
        case "PENDING":
        case "INDEXING":
        case "FAILED":
            return repositories.filter(
                (repo) => repo.indexStatus === filter
            ).length;

        default:
            return repositories.length;
    }
}

export default function RepositoryFilters({
    repositories,
    activeFilter,
    onFilterChange,
}: RepositoryFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
                const isActive = activeFilter === filter.key;
                const count = getCount(repositories, filter.key);

                return (
                    <button
                        key={filter.key}
                        type="button"
                        onClick={() => onFilterChange(filter.key)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                        {filter.label}
                        <span className="ml-2 opacity-70">
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}