
"use client";

import { useAuth } from "@/context/AuthContext";
import {
    Bell,
    CheckCircle2,
    ChevronRight,
   // Github,
    LogOut,
    Monitor,
    Moon,
    Palette,
    Settings,
    ShieldCheck,
    Sun,
    UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaGithub } from "react-icons/fa";

type Section = "account" | "notifications" | "security" | "appearance";

export default function SettingsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<Section>("account");
  const [indexingSuccess, setIndexingSuccess] = useState(true);
  const [indexingFailure, setIndexingFailure] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const username = user?.githubusername || "github-user";
  const displayName = user?.displayName || username;
  const avatarUrl = user?.avatarUrl;

  const sections = [
    {
      id: "account" as const,
      title: "Account",
      description: "Your connected GitHub profile",
      icon: UserRound,
    },
    {
      id: "notifications" as const,
      title: "Notifications",
      description: "Indexing notification preferences",
      icon: Bell,
    },
    {
      id: "security" as const,
      title: "Security",
      description: "Your connected account and sign-out",
      icon: ShieldCheck,
    },
    {
      id: "appearance" as const,
      title: "Appearance",
      description: "Customize your display preferences",
      icon: Palette,
    },
  ];

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setLogoutError("");
      await logout();
      router.replace("/");
    } catch {
      setLogoutError("Unable to sign out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const toggleClass =
    "relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/30";

  return (
    <main className="min-h-screen space-y-8 p-6 text-white md:p-8">
      <header>
        <div className="mb-2 flex items-center gap-3">
          <Settings className="h-6 w-6 text-zinc-400" />
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
        <p className="text-sm text-zinc-400">
          Manage your GitCrawler account and preferences.
        </p>
      </header>

      <div className="grid max-w-5xl gap-6 md:grid-cols-[230px_minmax(0,1fr)]">
        {/* Settings navigation */}
        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const active = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                  active
                    ? "border-white/10 bg-white/[0.08] text-white"
                    : "border-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">
                    {section.title}
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    {section.description}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
            );
          })}
        </nav>

        {/* Settings content */}
        <div className="min-w-0 space-y-5">
          {activeSection === "account" && (
            <>
              <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
                <h2 className="text-lg font-semibold">Account information</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Your profile information from GitHub.
                </p>

                {loading ? (
                  <div className="mt-6 animate-pulse space-y-3">
                    <div className="h-16 w-16 rounded-full bg-white/10" />
                    <div className="h-4 w-40 rounded bg-white/10" />
                    <div className="h-3 w-28 rounded bg-white/10" />
                  </div>
                ) : (
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={`${displayName}'s GitHub avatar`}
                        className="h-16 w-16 rounded-full border border-white/10 object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                        <UserRound className="h-7 w-7 text-zinc-300" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium">{displayName}</h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        @{username}
                      </p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        GitHub account connected
                      </p>
                    </div>
                    <FaGithub className="h-6 w-6 text-zinc-400" />
                  </div>
                )}

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-sm text-zinc-300">Display name</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {loading ? "Loading..." : displayName}
                  </p>

                  <p className="mt-4 text-sm text-zinc-300">GitHub username</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {loading ? "Loading..." : `@${username}`}
                  </p>
                </div>

                <p className="mt-5 text-xs leading-5 text-zinc-500">
                  Profile details are read-only because they come from your
                  connected GitHub account.
                </p>
              </section>
            </>
          )}

          {activeSection === "notifications" && (
            <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Choose which indexing events you want to track.
              </p>

              <div className="mt-6 divide-y divide-white/10">
                {[
                  {
                    title: "Indexing completed",
                    description:
                      "Show a preference for successful repository indexing.",
                    checked: indexingSuccess,
                    onChange: setIndexingSuccess,
                  },
                  {
                    title: "Indexing failed",
                    description:
                      "Show a preference for repository indexing failures.",
                    checked: indexingFailure,
                    onChange: setIndexingFailure,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={item.checked}
                      aria-label={item.title}
                      onClick={() => item.onChange(!item.checked)}
                      className={`${toggleClass} shrink-0 ${
                        item.checked ? "bg-emerald-500" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          item.checked ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-amber-400/90">
                These preferences currently exist only in page state. They are
                not saved or connected to a notification service yet.
              </p>
            </section>
          )}

          {activeSection === "security" && (
            <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <h2 className="text-lg font-semibold">Security</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Manage your current GitHub session.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-lg border border-white/10 p-4">
                <FaGithub className="h-6 w-6 text-zinc-300" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">GitHub OAuth</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Connected as @{username}
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <h3 className="text-sm font-medium">Sign out</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  End your current GitCrawler session on this device.
                </p>

                {logoutError && (
                  <p role="alert" className="mt-3 text-sm text-red-400">
                    {logoutError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            </section>
          )}

          {activeSection === "appearance" && (
            <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <h2 className="text-lg font-semibold">Appearance</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Choose your preferred display style.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { id: "light", label: "Light", icon: Sun },
                  { id: "dark", label: "Dark", icon: Moon },
                  { id: "system", label: "System", icon: Monitor },
                ].map((option) => {
                  const Icon = option.icon;
                  const selected = theme === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setTheme(option.id)}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition ${
                        selected
                          ? "border-white/40 bg-white/[0.08]"
                          : "border-white/10 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-zinc-300" />
                      <span className="text-sm">{option.label}</span>
                      {selected && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-amber-400/90">
                The selection is temporary and does not change the application
                theme until theme persistence and theme switching are wired up.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
