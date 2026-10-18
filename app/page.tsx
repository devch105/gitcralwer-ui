
"use client";

import { FaGitkraken } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";
import { ENDPOINTS } from "@/utilities/endpoints";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,

  MessagesSquare,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

const features = [
  {
    icon: FaGithub,
    title: "GitHub Integration",
    description:
      "Connect your GitHub account and access your repositories from one workspace.",
  },
  {
    icon: Database,
    title: "Intelligent Code Indexing",
    description:
      "Process repository files into searchable code chunks for relevant context retrieval.",
  },
  {
    icon: MessagesSquare,
    title: "Conversational Code Search",
    description:
      "Ask questions about your codebase and explore answers with relevant code context.",
  },
  {
    icon: Search,
    title: "Repository Exploration",
    description:
      "Find the code and implementation details you need without manually browsing every file.",
  },
  {
    icon: BrainCircuit,
    title: "Context-Aware Assistance",
    description:
      "Use indexed repository context to help understand project structure and implementation.",
  },
  {
    icon: Zap,
    title: "Indexing Insights",
    description:
      "Review indexing status, processed files, and available chunks from your dashboard.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect GitHub",
    description: "Sign in and choose a repository you want to explore.",
    icon: FaGithub,
  },
  {
    number: "02",
    title: "Index your code",
    description: "Let GitCrawler process the supported files in your repository.",
    icon: GitBranch,
  },
  {
    number: "03",
    title: "Ask questions",
    description: "Start a chat and explore your indexed codebase with AI.",
    icon: MessagesSquare,
  },
];

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

    const handleSignIn = () => {
      window.location.href = ENDPOINTS.GITHUB_LOGIN;
    };

  const handleGetStarted = () => {
    if (loading) return;

    if (user) {
      router.push("/dashboard");
      return;
    }else{
      router.push(ENDPOINTS.GITHUB_LOGIN);
      return ;
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#09090b] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
              <FaGitkraken className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              GitCrawler
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
          </div>

          <button
            type="button"
            onClick={handleGetStarted}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {user ? "Open dashboard" : "Get started"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.10] blur-[130px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-violet-300" />
            AI-powered codebase exploration
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-7xl">
            Understand your codebase.
            <span className="mt-2 block bg-gradient-to-r from-violet-300 via-white to-blue-300 bg-clip-text text-transparent">
              Faster.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg md:leading-8">
            Connect your GitHub repositories, index your code, and ask questions
            about your projects with AI-powered codebase assistance.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleGetStarted}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50 sm:w-auto"
            >
              <FaGithub className="h-5 w-5" />
              {loading
                ? "Checking session..."
                : user
                  ? "Go to dashboard"
                  : "Continue with GitHub"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.07] hover:text-white sm:w-auto"
            >
              Explore how it works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              GitHub authentication
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Repository-aware chat
            </span>
          </div>

          {/* Product preview */}
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-2 shadow-2xl shadow-violet-950/20 md:mt-20">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0f]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 text-xs text-zinc-500">
                  GitCrawler / Repository Chat
                </span>
              </div>

              <div className="grid min-h-[250px] md:grid-cols-[0.8fr_1.2fr]">
                <div className="border-b border-white/10 p-5 text-left md:border-b-0 md:border-r">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Workspace
                  </p>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FaGithub className="h-4 w-4" />
                      your-repository
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Indexed repository
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-4/5 rounded bg-white/[0.06]" />
                    <div className="h-2 w-3/5 rounded bg-white/[0.06]" />
                    <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
                  </div>
                </div>

                <div className="flex flex-col p-5 text-left">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <BrainCircuit className="h-4 w-4 text-violet-300" />
                    Chat with your code
                  </div>
                  <div className="mt-5 max-w-[90%] self-end rounded-xl bg-white/[0.08] p-3 text-sm text-zinc-300">
                    Where is authentication handled in this project?
                  </div>
                  <div className="mt-3 flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                      <Code2 className="h-4 w-4 text-violet-300" />
                    </div>
                    <div className="space-y-2 pt-1">
                      <div className="h-2 w-48 max-w-full rounded bg-white/15" />
                      <div className="h-2 w-40 max-w-full rounded bg-white/[0.08]" />
                      <div className="h-2 w-44 max-w-full rounded bg-white/[0.08]" />
                      <p className="pt-1 text-xs text-zinc-500">
                        Illustrative product preview
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-3 text-xs text-zinc-500">
                    Ask a question about your repository...
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/[0.06] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-violet-300">FEATURES</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Spend less time searching.
              <span className="block text-zinc-500">Understand more.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400">
              Bring repository indexing, contextual code search, and AI-assisted
              exploration into one workflow.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.04]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition group-hover:border-violet-400/20 group-hover:bg-violet-500/10">
                    <Icon className="h-5 w-5 text-zinc-300 group-hover:text-violet-300" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-white/[0.06] px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-violet-300">HOW IT WORKS</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              From repository to answers.
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400">
              Three steps to start exploring your codebase.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-violet-300">
                      {step.number}
                    </span>
                    <Icon className="h-6 w-6 text-zinc-400" />
                  </div>
                  <h3 className="mt-7 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.03] to-blue-500/[0.08] px-6 py-14 text-center md:px-12 md:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
            <FaGitkraken className="h-6 w-6 text-violet-200" />
          </div>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Get to know your codebase.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
            Connect your GitHub account and turn your repositories into a
            searchable, conversational workspace.
          </p>
          <button
            type="button"
            onClick={handleGetStarted}
            disabled={loading}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {user ? "Open dashboard" : "Get started with GitHub"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] px-5 py-7 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 text-zinc-300">
            <FaGitkraken className="h-4 w-4" />
            <span className="font-medium">GitCrawler</span>
          </Link>
          <p>Explore your code. Understand your projects.</p>
        </div>
      </footer>
    </main>
  );
}
