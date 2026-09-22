"use client";

import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-zinc-400">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-zinc-400">
        Please sign in.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-semibold">
          Welcome, {user.displayName}
        </h1>

        <p className="mt-2 text-zinc-400">
          {user.githubUsername}
        </p>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center gap-4">

            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="h-14 w-14 rounded-full border border-zinc-700"
              />
            )}

            <div>
              <h2 className="font-medium text-zinc-100">
                {user.displayName}
              </h2>

              <p className="text-sm text-zinc-500">
                {user.githubUsername}
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}