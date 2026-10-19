
"use client";

import { useAuth } from "@/context/AuthContext";
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
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
type Theme = "light" | "dark" | "system";

const sections = [
  {
    id: "account",
    title: "Account",
    description: "Profile and connected account",
    icon: UserRound,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Indexing event preferences",
    icon: Bell,
  },
  {
    id: "security",
    title: "Security",
    description: "Sessions and authentication",
    icon: ShieldCheck,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize your workspace",
    icon: Palette,
  },
] as const;

const themes: {
  id: Theme;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  {
    id: "light",
    label: "Light",
    description: "Clean and bright",
    icon: Sun,
  },
  {
    id: "dark",
    label: "Dark",
    description: "Easy on the eyes",
    icon: Moon,
  },
  {
    id: "system",
    label: "System",
    description: "Follow your device",
    icon: Monitor,
  },
];

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold tracking-tight text-[#18181B]">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-[#71717A]">
        {description}
      </p>
    </div>
  );
}

function SettingsCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-[#E4E4E7] bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#18181B]">{title}</p>
        <p className="mt-1 text-sm leading-5 text-[#71717A]">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
          checked ? "bg-emerald-600" : "bg-[#D4D4D8]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [activeSection, setActiveSection] =
    useState<Section>("account");

  const [indexingSuccess, setIndexingSuccess] = useState(true);
  const [indexingFailure, setIndexingFailure] = useState(true);

  const [theme, setTheme] = useState<Theme>("light");
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const username = user?.githubusername || "github-user";
  const displayName = user?.displayName || username;
  const avatarUrl = user?.avatarUrl;

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

  const activeTitle =
    sections.find((section) => section.id === activeSection)?.title ??
    "Account";

  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-7 text-[#18181B] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <header className="mb-8 border-b border-[#E4E4E7] pb-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white shadow-sm">
              <Settings className="h-5 w-5 text-[#52525B]" />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Settings
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#71717A]">
                Manage your GitCrawler account, indexing preferences,
                security, and workspace appearance.
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
          {/* Settings navigation */}
          <aside className="min-w-0 rounded-2xl border border-[#27272A] bg-[#0B0B0D] p-3 lg:self-start">
            <p className="mb-3 px-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#71717A]">
              Preferences
            </p>

            <nav
              aria-label="Settings sections"
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1"
            >
              {sections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    aria-current={active ? "page" : undefined}
                    onClick={() => setActiveSection(section.id)}
                    className={`group flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#818CF8] ${
                      active
                        ? "border-transparent border-l-2 border-l-[#818CF8] bg-[#252527] text-white"
                        : "border-transparent text-[#A1A1AA] hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-white/[0.08] text-white"
                          : "bg-white/[0.04] text-[#A1A1AA] group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </div>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {section.title}
                      </span>

                      <span className="mt-1 hidden text-xs leading-4 text-[#A1A1AA] lg:block">
                        {section.description}
                      </span>
                    </span>

                    <ChevronRight
                      className={`hidden h-4 w-4 shrink-0 lg:block ${
                        active ? "text-white" : "text-[#71717A]"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Account summary */}
            <div className="mt-5 hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 lg:block">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                Signed in as
              </p>

              <div className="mt-3 flex items-center gap-3">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`${displayName}'s GitHub avatar`}
                    className="h-9 w-9 rounded-full border border-white/10 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08]">
                    <UserRound className="h-4 w-4 text-white" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {loading ? "Loading account..." : displayName}
                  </p>
                  <p className="truncate text-xs text-[#A1A1AA]">
                    @{username}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-white/[0.08] pt-3">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs text-[#A1A1AA]">
                  GitHub connected
                </span>
              </div>
            </div>
          </aside>

          {/* Settings content */}
          <div className="min-w-0 space-y-5">
            <div className="mb-5">
              <p className="text-xs font-medium text-[#71717A]">
                SETTINGS / {activeTitle.toUpperCase()}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#18181B]">
                {activeTitle}
              </h2>
            </div>

            {/* Account */}
            {activeSection === "account" && (
              <>
                <SettingsCard>
                  <SectionHeading
                    title="Account information"
                    description="Your profile information synced from GitHub."
                  />

                  {loading ? (
                    <div className="mt-7 flex animate-pulse items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-[#E4E4E7]" />
                      <div className="space-y-2">
                        <div className="h-4 w-36 rounded bg-[#E4E4E7]" />
                        <div className="h-3 w-24 rounded bg-[#E4E4E7]" />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-7 flex items-center gap-4 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={`${displayName}'s GitHub avatar`}
                          className="h-16 w-16 shrink-0 rounded-full border border-[#E4E4E7] object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F4F4F5]">
                          <UserRound className="h-7 w-7 text-[#52525B]" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-[#18181B]">
                          {displayName}
                        </h3>

                        <p className="mt-1 truncate text-sm text-[#71717A]">
                          @{username}
                        </p>

                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          GitHub account connected
                        </div>
                      </div>

                      <FaGithub className="hidden h-7 w-7 shrink-0 text-[#27272A] sm:block" />
                    </div>
                  )}

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#E4E4E7] bg-white p-4">
                      <p className="text-xs font-medium text-[#71717A]">
                        DISPLAY NAME
                      </p>

                      <p className="mt-2 break-words text-sm font-medium text-[#18181B]">
                        {loading ? "Loading..." : displayName}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E4E4E7] bg-white p-4">
                      <p className="text-xs font-medium text-[#71717A]">
                        GITHUB USERNAME
                      </p>

                      <p className="mt-2 break-words text-sm font-medium text-[#18181B]">
                        {loading ? "Loading..." : `@${username}`}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-5 text-[#71717A]">
                    Profile details are read-only and managed by your
                    connected GitHub account.
                  </p>
                </SettingsCard>

                <div className="flex items-start gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#52525B]" />

                  <p className="text-xs leading-5 text-[#71717A]">
                    GitCrawler uses GitHub OAuth to authenticate your
                    account. Your profile details are displayed from your
                    authenticated session.
                  </p>
                </div>
              </>
            )}

            {/* Notifications */}
            {activeSection === "notifications" && (
              <SettingsCard>
                <SectionHeading
                  title="Indexing notifications"
                  description="Choose the indexing events you want to receive updates about."
                />

                <div className="mt-5 divide-y divide-[#E4E4E7]">
                  <PreferenceRow
                    title="Indexing completed"
                    description="Get updates when repository indexing finishes successfully."
                    checked={indexingSuccess}
                    onChange={setIndexingSuccess}
                  />

                  <PreferenceRow
                    title="Indexing failed"
                    description="Get updates when repository indexing encounters an error."
                    checked={indexingFailure}
                    onChange={setIndexingFailure}
                  />
                </div>

                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs leading-5 text-amber-800">
                    Preferences are currently stored in page state only.
                    They reset when the page is reloaded and are not yet
                    connected to a notification service.
                  </p>
                </div>
              </SettingsCard>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <>
                <SettingsCard>
                  <SectionHeading
                    title="Authentication"
                    description="Review your connected identity provider."
                  />

                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white">
                      <FaGithub className="h-6 w-6 text-[#18181B]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#18181B]">
                        GitHub OAuth
                      </p>

                      <p className="mt-1 truncate text-xs text-[#71717A]">
                        Connected as @{username}
                      </p>
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      <Check className="h-3.5 w-3.5" />
                      Connected
                    </span>
                  </div>
                </SettingsCard>

                <SettingsCard>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50">
                      <LogOut className="h-5 w-5 text-red-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[#18181B]">
                        Sign out
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[#71717A]">
                        End your current GitCrawler session on this device.
                      </p>
                    </div>
                  </div>

                  {logoutError && (
                    <p
                      role="alert"
                      className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                    >
                      {logoutError}
                    </p>
                  )}

                  <div className="mt-5 flex justify-end border-t border-[#E4E4E7] pt-5">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <LogOut className="h-4 w-4" />
                      {loggingOut ? "Signing out..." : "Sign out"}
                    </button>
                  </div>
                </SettingsCard>
              </>
            )}

            {/* Appearance */}
            {activeSection === "appearance" && (
              <SettingsCard>
                <SectionHeading
                  title="Workspace appearance"
                  description="Choose your preferred display style."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {themes.map((option) => {
                    const Icon = option.icon;
                    const selected = theme === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setTheme(option.id)}
                        className={`rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52525B] ${
                          selected
                            ? "border-[#A1A1AA] bg-[#F4F4F5]"
                            : "border-[#E4E4E7] bg-white hover:border-[#A1A1AA] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                            selected
                              ? "bg-[#E4E4E7] text-[#18181B]"
                              : "bg-[#F4F4F5] text-[#52525B]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-[#18181B]">
                            {option.label}
                          </span>

                          {selected && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          )}
                        </div>

                        <p className="mt-1 text-xs leading-5 text-[#71717A]">
                          {option.description}
                        </p>

                        {/* Theme preview */}
                        <div
                          className={`mt-4 rounded-lg border p-2 ${
                            option.id === "light"
                              ? "border-[#E4E4E7] bg-white"
                              : option.id === "dark"
                                ? "border-[#3F3F46] bg-[#18181B]"
                                : "border-[#D4D4D8] bg-gradient-to-r from-white via-[#A1A1AA] to-[#27272A]"
                          }`}
                        >
                          <div
                            className={`h-1.5 w-1/2 rounded-full ${
                              option.id === "light"
                                ? "bg-[#D4D4D8]"
                                : option.id === "dark"
                                  ? "bg-[#52525B]"
                                  : "bg-[#71717A]"
                            }`}
                          />

                          <div className="mt-2 flex gap-1">
                            <div
                              className={`h-5 w-1/3 rounded ${
                                option.id === "light"
                                  ? "bg-[#F4F4F5]"
                                  : option.id === "dark"
                                    ? "bg-[#3F3F46]"
                                    : "bg-white/70"
                              }`}
                            />

                            <div
                              className={`h-5 flex-1 rounded ${
                                option.id === "light"
                                  ? "bg-[#F4F4F5]"
                                  : option.id === "dark"
                                    ? "bg-[#3F3F46]"
                                    : "bg-[#27272A]/30"
                              }`}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs leading-5 text-amber-800">
                    Theme selection is temporary. Applying the theme
                    across the application and saving your preference
                    requires theme switching and persistence to be
                    implemented.
                  </p>
                </div>
              </SettingsCard>
            )}
          </div>
        </div>

        <footer className="mt-10 border-t border-[#E4E4E7] pt-5">
          <p className="text-center text-xs text-[#71717A]">
            GitCrawler · Account and workspace preferences
          </p>
        </footer>
      </div>
    </main>
  );
}
