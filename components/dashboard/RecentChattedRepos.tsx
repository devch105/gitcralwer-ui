"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  
  Clock3,
  FolderGit2,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { useRecentChats } from "@/hooks/use-recent-chats";

import { RiChatSmileAiFill } from "react-icons/ri";
function formatLastActivity(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Activity time unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function RecentChattedRepos() {
  const router = useRouter();
  const { data: chats, isPending, isError, error, refetch } =
    useRecentChats(5);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        
        <div>
          <div className="flex items-center gap-2">  
          <RiChatSmileAiFill size={22}/>
          <span className="text-lg font-semibold text-zinc-900">
            Recent repository conversations
          </span>
         
        </div>
          <p className="mt-2 ml-4 text-sm text-zinc-500">
            Pick up where you left off.
          </p>
        </div>

        
         

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isPending}
          aria-label="Refresh recent conversations"
          className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-xl border border-zinc-200 bg-white"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-700">
            Could not load recent conversations.
          </p>
          <p className="mt-1 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Please try again."}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 text-sm font-semibold text-red-700 underline"
          >
            Try again
          </button>
        </div>
      ) : !chats?.length ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="mt-3 font-medium text-zinc-800">
            No conversations yet
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            Start chatting with an indexed repository to see it here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() =>
                router.push(
                  `/chat/${encodeURIComponent(chat.repositoryId)}?sessionId=${encodeURIComponent(chat.id)}`
                )
              }
              className="group rounded-xl border border-zinc-200 bg-white p-5 text-left transition hover:border-zinc-400 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-lg bg-zinc-100 p-2">
                  <FolderGit2 className="h-5 w-5 text-zinc-700" />
                </div>

                <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-zinc-800" />
              </div>

              <h3 className="mt-4 truncate font-semibold text-zinc-900">
                {chat.repositoryFullName}
              </h3>

              <p className="mt-1 truncate text-sm text-zinc-600">
                {chat.title}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <Clock3 className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {formatLastActivity(chat.lastActivityAt)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}