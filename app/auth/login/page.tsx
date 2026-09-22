import GithubSignInButton from "@/components/github-sign-in-button";
import { FaGitkraken } from "react-icons/fa";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#09090b] text-white">

      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      {/* Main */}
      <div className="relative flex flex-1 items-center justify-center px-5 py-12">

        <div className="w-full max-w-[420px]">

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 shadow-sm">
                <FaGitkraken size={26} className="text-zinc-200" />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
                GitCrawler
              </h1>

            </div>
          </div>

          {/* Login Card */}
          <Card className="border-zinc-800 bg-slate-100 shadow-2xl shadow-black/20">

            <CardHeader className="space-y-3 px-7 pt-7 text-center">

              <CardTitle className="text-2xl font-semibold tracking-tight text-gray-800">
                Welcome to GitCrawler
              </CardTitle>

              <CardDescription className="mx-auto max-w-sm text-sm leading-6 text-gray-600">
                Connect your GitHub account to explore your repositories
                and use GitCrawler's RAG-powered services.
              </CardDescription>

            </CardHeader>

            <CardContent className="px-7 pb-7 pt-6">

              {/* GitHub Button */}
              <div className="w-full">
                <GithubSignInButton />
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-800" />

                <span className="text-xs text-zinc-800">
                  SECURE LOGIN
                </span>

                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              <p className="text-center text-xs leading-5 text-gray-500">
                You'll be redirected to GitHub to securely authorize
                GitCrawler.
              </p>

            </CardContent>

          </Card>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative px-5 pb-6 text-center text-xs text-zinc-500">

        <p>
          © {new Date().getFullYear()} GitCrawler. All rights reserved.
        </p>

        <p className="mt-2">
          Made with <span className="text-red-500">♥</span> by GitCrawler Team
        </p>

      </footer>

    </main>
  );
};

export default LoginPage;