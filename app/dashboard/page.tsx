"use client";

import {
    BookOpen,
    FileCode2,
    FolderGit2,
    Search,
    Sparkles
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RepositoryCard from "@/components/dashboard/RepositoryCard";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";

const repositories = [
    {
        name: "gitcrawler",
        description:
            "AI-powered GitHub repository analysis and code intelligence platform.",
        language: "Java",
        stars: 12,
        branches: 8,
        indexedAt: "Indexed 2h ago",
    },
    {
        name: "portfolio",
        description:
            "Personal developer portfolio built with Next.js and Tailwind CSS.",
        language: "TypeScript",
        stars: 7,
        branches: 5,
        indexedAt: "Indexed 1d ago",
    },
    {
        name: "spring-boot-starter",
        description:
            "Reusable Spring Boot starter project with authentication and PostgreSQL.",
        language: "Java",
        stars: 15,
        branches: 6,
        indexedAt: "Indexed 3d ago",
    },
    {
        name: "nextjs-template",
        description:
            "Modern Next.js template with TypeScript, Tailwind and shadcn/ui.",
        language: "TypeScript",
        stars: 9,
        branches: 4,
        indexedAt: "Indexed 4d ago",
    },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">

            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <main className="min-h-screen lg:pl-64">

                {/* Header */}
                <DashboardHeader />

                {/* Content */}
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

                    {/* Welcome */}
                    <section className="mb-8">

                        <p className="mb-2 text-sm font-medium text-indigo-600">
                            Overview
                        </p>

                        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
                            Welcome back, Dev 👋
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            Here's what's happening with your codebases today.
                        </p>

                    </section>

                    {/* Stats */}
                    <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Repositories"
                            value="12"
                            description="connected"
                            icon={<FolderGit2 size={19} />}
                        />

                        <StatCard
                            title="Indexed files"
                            value="3.4K"
                            description="files"
                            icon={<FileCode2 size={19} />}
                        />

                        <StatCard
                            title="Code searches"
                            value="128"
                            description="this month"
                            icon={<Search size={19} />}
                        />

                        <StatCard
                            title="AI insights"
                            value="24"
                            description="generated"
                            icon={<Sparkles size={19} />}
                        />

                    </section>

                    {/* Recent repositories */}
                    <section>

                        <div className="mb-5 flex items-end justify-between">

                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900">
                                    Recent repositories
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Your recently indexed codebases.
                                </p>
                            </div>

                            <button className="hidden items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 sm:flex">
                                View all
                                <span>→</span>
                            </button>

                        </div>

                        <div className="grid gap-4 xl:grid-cols-2">

                            {repositories.map((repository) => (
                                <RepositoryCard
                                    key={repository.name}
                                    {...repository}
                                />
                            ))}

                        </div>

                    </section>

                    {/* Bottom information */}
                    <section className="mt-8 grid gap-4 lg:grid-cols-2">

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <Sparkles size={19} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Ask GitCrawler
                                    </h3>

                                    <p className="text-sm text-zinc-500">
                                        Ask questions about your codebase.
                                    </p>
                                </div>

                            </div>

                            <button className="mt-5 w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
                                Start asking questions
                            </button>

                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <BookOpen size={19} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Documentation
                                    </h3>

                                    <p className="text-sm text-zinc-500">
                                        Learn how GitCrawler understands your repositories.
                                    </p>
                                </div>

                            </div>

                            <button className="mt-5 w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
                                Read documentation
                            </button>

                        </div>

                    </section>

                </div>

            </main>
        </div>
    );
}