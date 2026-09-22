"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGitkraken } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";

export default function AuthCallbackPage() {
  const router = useRouter();

  const { user, loading, refreshUser } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      await refreshUser();
    };

    authenticate();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }

    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#09090b] text-white">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center px-6 text-center">

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900">
          <FaGitkraken size={30} className="text-zinc-200" />
        </div>

        <div className="mb-6 h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-200" />

        <h1 className="text-2xl font-semibold text-zinc-100">
          Signing you in
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
          Verifying your GitHub account and preparing your GitCrawler
          dashboard.
        </p>

        <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" />
          Securely authenticating
        </div>

      </div>

      <footer className="absolute bottom-6 text-xs text-zinc-600">
        © {new Date().getFullYear()} GitCrawler
      </footer>

    </main>
  );
}