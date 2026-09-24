import {
    Code2,
    ExternalLink,
    GitBranch,
    Star,
} from "lucide-react";

interface RepositoryCardProps {
    name: string;
    description: string;
    language: string;
    stars: number;
    branches: number;
    indexedAt: string;
}

export default function RepositoryCard({
    name,
    description,
    language,
    stars,
    branches,
    indexedAt,
}: RepositoryCardProps) {
    return (
        <div className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                            <Code2 size={18} />
                        </div>

                        <div className="min-w-0">
                            <h3 className="truncate font-semibold text-zinc-900">
                                {name}
                            </h3>

                            <p className="text-xs text-zinc-400">
                                Repository
                            </p>
                        </div>

                    </div>

                </div>

                <button
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 opacity-0 transition group-hover:opacity-100 hover:bg-zinc-100 hover:text-zinc-900"
                    aria-label={`Open ${name}`}
                >
                    <ExternalLink size={16} />
                </button>

            </div>

            {/* Description */}
            <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-zinc-500">
                {description}
            </p>

            {/* Metadata */}
            <div className="mt-5 flex items-center gap-5 text-xs text-zinc-500">

                <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    {language}
                </span>

                <span className="flex items-center gap-1.5">
                    <Star size={14} />
                    {stars}
                </span>

                <span className="flex items-center gap-1.5">
                    <GitBranch size={14} />
                    {branches}
                </span>

                <span className="ml-auto flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {indexedAt}
                </span>

            </div>

        </div>
    );
}