"use client";

import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
    return (
        <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between gap-4 px-6 lg:px-8">

                {/* Search */}
                <div className="relative max-w-2xl flex-1">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />

                    <input
                        type="text"
                        placeholder="Search repositories, files, or ask anything..."
                        className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-16 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:bg-white focus:ring-2 focus:ring-zinc-100"
                    />

                    <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-400 sm:flex">
                        <span>⌘</span>
                        <span>K</span>
                    </div>
                </div>

                {/* Actions */}
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                </button>

            </div>
        </header>
    );
}