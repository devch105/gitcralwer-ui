
"use client";

import {
  CheckCircle2,
  Clock3,
  FolderGit2,
  LoaderCircle,
  XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import RecentChattedRepos from "@/components/dashboard/RecentChattedRepos";
import RecentlyIndexedRepos from "@/components/dashboard/RecentlyIndexedRepos";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useRepositories } from "@/hooks/use-repositories";


export default function Overview() {
  const router = useRouter();
 const { user } = useAuth();
  const {
    data: repositories = [],
    isPending,
    isError,
    error,
    refetch,
  } = useRepositories();

  const stats = useMemo(
    () => [
      {
        label: "Total repositories",
        value: repositories.length,
        icon: FolderGit2,
      },
      {
        label: "Indexed",
        value: repositories.filter(
          (repo) => repo.indexStatus === "DONE"
        ).length,
        icon: CheckCircle2,
      },
      {
        label: "Indexing",
        value: repositories.filter(
          (repo) => repo.indexStatus === "INDEXING"
        ).length,
        icon: Clock3,
      },
      {
        label: "Failed",
        value: repositories.filter(
          (repo) => repo.indexStatus === "FAILED"
        ).length,
        icon: XCircle,
      },
    ],
    [repositories]
  );


  if (isPending) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin" />
        Loading your overview...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-4 md:p-6">
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-5"
        >
          <h2 className="font-semibold">
            Could not load your overview
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred."}
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="mx-auto space-y-4 p-3 md:p-8">
         <section className="mb-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
                      Welcome back, {user?.displayName || user?.githubusername} 👋
                  </h1>
         </section>
      <section className="space-y-2">
        <p className="text-sm font-medium text-primary">
          Your workspace
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Overview
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Monitor your indexed codebases and jump back into
          understanding your code.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold">
                    {stat.value}
                  </p>
                </div>
                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="size-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Recent repositories */}
      <section className="space-y-4">
        <RecentlyIndexedRepos />
        <RecentChattedRepos />
      </section>
    </div>
  );
}
