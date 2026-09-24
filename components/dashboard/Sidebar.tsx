"use client";

import {
    ChevronLeft,
    // Github,
    HelpCircle,
    MoreVertical,
    Settings
} from "lucide-react";

import SidebarItem from "@/components/sidebar-content/SidebarItem";
import SidebarSection from "@/components/sidebar-content/SidebarSection";
import Link from "next/link";
import { FaGitkraken } from "react-icons/fa";

import {
    aiItems,
    developmentItems,
    workspaceItems
} from "@/components/sidebar-content/sidebaritem";

export default function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0c0c0f] text-white lg:flex">

            {/* Logo */}
            <div className="flex h-20 items-center justify-between px-6">

                <Link
                    href="/dashboard"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                        <FaGitkraken size={30} />
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold tracking-tight">
                            GitCrawler
                        </h1>

                        <p className="text-[10px] text-zinc-500">
                            AI-powered codebase intelligence
                        </p>
                    </div>
                </Link>

                <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-white"
                    aria-label="Collapse sidebar"
                >
                    <ChevronLeft size={17} />
                </button>

            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">

                <SidebarSection title="Workspace">
                    {workspaceItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                            active={item.label === "Overview"}
                        />
                    ))}
                </SidebarSection>

                <SidebarSection title="Development">
                    {developmentItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                        />
                    ))}
                </SidebarSection>

                <SidebarSection title="AI">
                    {aiItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                        />
                    ))}
                </SidebarSection>

            </nav>

            {/* Bottom navigation */}
            <div className="px-4">

                <div className="mb-3 h-px bg-white/10" />

                <SidebarItem
                    label="Settings"
                    href="/dashboard/settings"
                    icon={Settings}
                />

                <SidebarItem
                    label="Help & Docs"
                    href="/dashboard/help"
                    icon={HelpCircle}
                />

            </div>

            {/* User profile */}
            <div className="border-t border-white/10 p-4">

                <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left transition hover:bg-white/[0.05]">

                    {/* Avatar */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-800">

                        <div className="text-xs font-semibold text-zinc-300">
                            DD
                        </div>

                    </div>

                    {/* User info */}
                    <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-medium text-zinc-200">
                            Dev Dhama
                        </p>

                        <p className="truncate text-xs text-zinc-500">
                            @devch105
                        </p>

                    </div>

                    <MoreVertical
                        size={17}
                        className="shrink-0 text-zinc-500"
                    />

                </button>

            </div>

        </aside>
    );
}
