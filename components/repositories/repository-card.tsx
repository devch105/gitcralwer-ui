"use client";

import type { Repository } from "@/types/repository";
import {
    AlertCircle,
    CheckCircle2,
    Clock3,
    ExternalLink,
    FileCode2,
    GitBranch,
    Globe2,
    Lock,
    Loader2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

interface RepositoryCardProps {
    repository: Repository;
    onIndex?: (repository: Repository) => void;
}

function getStatusConfig(status: Repository["indexStatus"]) {
    switch (status) {
        case "COMPLETED":
            return {
                label: "Indexed",
                icon: CheckCircle2,
                className:
                    "border-green-500/20 bg-green-500/10 text-green-600",
            };

        case "INDEXING":
            return {
                label: "Indexing",
                icon: Loader2,
                className:
                    "border-blue-500/20 bg-blue-500/10 text-blue-600",
            };

        case "FAILED":
            return {
                label: "Failed",
                icon: AlertCircle,
                className:
                    "border-red-500/20 bg-red-500/10 text-red-600",
            };

        default:
            return {
                label: "Pending",
                icon: Clock3,
                className:
                    "border-yellow-500/20 bg-yellow-500/10 text-yellow-600",
            };
    }
}

export default function RepositoryCard({
    repository,
    onIndex,
}: RepositoryCardProps) {
    const status = getStatusConfig(repository.indexStatus);
    const StatusIcon = status.icon;

    const isIndexing = repository.indexStatus === "INDEXING";
    const isCompleted = repository.indexStatus === "COMPLETED";

    return (
        <Card className="group flex h-full flex-col border-border/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm text-muted-foreground">
                            {repository.owner}
                        </p>

                        <h3 className="mt-1 truncate text-lg font-semibold">
                            {repository.name}
                        </h3>
                    </div>

                    {repository.isPrivate ? (
                        <Badge variant="outline" className="shrink-0 gap-1">
                            <Lock className="h-3 w-3" />
                            Private
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="shrink-0 gap-1">
                            <Globe2 className="h-3 w-3" />
                            Public
                        </Badge>
                    )}
                </div>

                <p className="line-clamp-2 min-h-[40px] text-sm leading-5 text-muted-foreground">
                    {repository.description ||
                        "No description available for this repository."}
                </p>

                <Badge
                    variant="outline"
                    className={`w-fit gap-1 ${status.className}`}
                >
                    <StatusIcon
                        className={`h-3.5 w-3.5 ${
                            isIndexing ? "animate-spin" : ""
                        }`}
                    />
                    {status.label}
                </Badge>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border bg-muted/30 p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FileCode2 className="h-3.5 w-3.5" />
                            Files
                        </div>

                        <p className="mt-1 text-sm font-semibold">
                            {repository.filesTotal}
                        </p>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FileCode2 className="h-3.5 w-3.5" />
                            Chunks
                        </div>

                        <p className="mt-1 text-sm font-semibold">
                            {repository.chunkCount}
                        </p>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                            Language
                        </span>

                        <span className="font-medium">
                            {repository.language || "Unknown"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <GitBranch className="h-3.5 w-3.5" />
                            Branch
                        </span>

                        <span className="max-w-[150px] truncate font-medium">
                            {repository.defaultBranch}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                {!isCompleted && (
                    <Button
                        className="flex-1"
                        disabled={isIndexing}
                        onClick={() => onIndex?.(repository)}
                    >
                        {isIndexing
                            ? "Indexing..."
                            : repository.indexStatus === "FAILED"
                              ? "Retry Indexing"
                              : "Index Repository"}
                    </Button>
                )}

                <Button
                    variant="outline"
                    //asChild
                    className={isCompleted ? "flex-1" : ""}
                >
                    <a
                        href={repository.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        GitHub
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}