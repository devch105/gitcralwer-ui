
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Mobile and tablet header */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>

          <span className="font-semibold">GitCrawler</span>
        </header>

        {/* Backdrop */}
        {sidebarOpen && (
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />
        )}

        {/* Single responsive sidebar */}
        <div
          aria-hidden={!sidebarOpen ? true : undefined}
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen
              ? "visible translate-x-0"
              : "invisible -translate-x-full"
          } lg:visible lg:translate-x-0`}
        >
          <Sidebar onNavigate={closeSidebar} />

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main content */}
        <main className="min-h-screen lg:ml-64">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
