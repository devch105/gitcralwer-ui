"use client";

import {
    ArrowRight,
    CheckCircle2,
    Code2,
    FileCode2,
    FolderGit2,
    Layers3,
    RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { useRecentlyIndexedRepos } from "@/hooks/use-recently-indexed-repos";
function formatIndexedDate(value: string | null) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function RecentlyIndexedRepos() {
  const router = useRouter();

  const {
  data: repositories,
  isPending,
  isError,
  error,
  refetch,
} = useRecentlyIndexedRepos(5);


  const recentRepositories = useMemo(() => {
    return (repositories ?? [])
      .filter(
        (repo) =>
          repo.indexStatus === "DONE" && repo.indexedAt !== null
      )
      .sort(
        (a, b) =>
          new Date(b.indexedAt!).getTime() -
          new Date(a.indexedAt!).getTime()
      )
      .slice(0, 5);
  }, [repositories]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Recently Indexed Repos
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Your latest successfully indexed repositories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isPending}
          aria-label="Refresh indexed repositories"
          className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-44 animate-pulse rounded-xl border border-zinc-200 bg-white"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-700">
            Could not load indexed repositories.
          </p>
          <p className="mt-1 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Please try again."}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 text-sm font-semibold text-red-700 underline"
          >
            Try again
          </button>
        </div>
      ) : recentRepositories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
          <FolderGit2 className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="mt-3 font-medium text-zinc-800">
            No indexed repositories yet
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            Successfully indexed repositories will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentRepositories.map((repo) => (
            <button
              key={repo.id}
              type="button"
              onClick={() =>
                router.push(`/chat/${encodeURIComponent(repo.id)}`)
              }
              className="group rounded-xl border border-zinc-200 bg-white p-5 text-left transition hover:border-zinc-400 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-lg bg-zinc-100 p-2">
                  <FolderGit2 className="h-5 w-5 text-zinc-700" />
                </div>

                <div className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Indexed
                </div>
              </div>

              <h3 className="mt-4 truncate font-semibold text-zinc-900">
                {repo.fullName}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                <Code2 className="h-4 w-4 shrink-0" />
                <span className="truncate">
                  {repo.language || "Language unavailable"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-50 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <FileCode2 className="h-3.5 w-3.5" />
                    Files
                  </div>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {repo.filesTotal.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="rounded-lg bg-zinc-50 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Layers3 className="h-3.5 w-3.5" />
                    Chunks
                  </div>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {repo.chunkCount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <p className="text-xs text-zinc-500">
                  {formatIndexedDate(repo.indexedAt)}
                </p>
                <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-zinc-800" />
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}