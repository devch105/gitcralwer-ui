"use client";

import {
    LogOut,
    Settings
} from "lucide-react";

import SidebarItem from "@/components/sidebar-content/SidebarItem";
import SidebarSection from "@/components/sidebar-content/SidebarSection";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaGitkraken } from "react-icons/fa";

import { workspaceItems } from "@/components/sidebar-content/sidebaritem";
import { useAuth } from "@/context/AuthContext";


interface SidebarProps {
  onNavigate?: () => void;
}
export default function Sidebar({ onNavigate }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading, logout } = useAuth();

    const displayName =
        user?.displayName || user?.githubusername || "GitCrawler User";
    const username = user?.githubusername || "github-user";

    const initials =
        displayName
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase() || "U";

    // Match the current route to a sidebar destination.
    const isActive = (href: string) => {
        if (pathname === href) return true;

        // Keep Overview active only on the exact dashboard route.
        if (href === "/dashboard") return false;

        // Keep parent navigation active on nested routes.
        return pathname.startsWith(`${href}/`);
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-[#0c0c0f] text-white">

            {/* Logo */}
            <div className="flex h-20 items-center justify-between px-6">
                <Link href="/dashboard" className="flex items-center gap-3">
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

                {/* <button
                    type="button"
                    aria-label="Collapse sidebar"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-white"
                >
                    <ChevronLeft size={17} />
                </button> */}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
                <SidebarSection title="Workspace">
                    {workspaceItems.map((item) => (
                      <SidebarItem
                        key={item.label}
                        {...item}
                        active={isActive(item.href)}
                        onClick={onNavigate}
                        />
                    ))}
                </SidebarSection>
            </nav>

            {/* Bottom navigation */}
            <div className="px-4 py-2">
                <div className="mb-3 h-px bg-white/10" />

               <SidebarItem
                    label="Settings"
                    href="/dashboard/settings"
                    icon={Settings}
                    active={isActive("/dashboard/settings")}
                    onClick={onNavigate}
                />
            </div>

            {/* User profile */}
            <div className="border-t border-white/10 p-4">
                <div
                   
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                        isActive("/dashboard/profile")
                            ? "border-white/20 bg-white/10"
                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-800">
                        {!loading && user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={`${displayName}'s avatar`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-xs font-semibold text-zinc-300">
                                {loading ? "..." : initials}
                            </span>
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-200">
                            {loading ? "Loading profile..." : displayName}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                            @{username}
                        </p>
                    </div>

                    
                </div>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
                >
                    <LogOut size={17} />
                    <span>Log out</span>
                </button>
            </div>
        </aside>
    );
}