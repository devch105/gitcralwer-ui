"use client";

import {
  Clock3,
  LoaderCircle,
  MessageSquare,
  PanelLeftClose,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ChatSession } from "@/types/chat";

import { TiArrowLeftOutline } from "react-icons/ti";


interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isLoading: boolean;
  isCreating: boolean;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onClose: () => void;
  onRedirect: () => void;
}

export default function ChatSidebar({
  sessions,
  activeSessionId,
  isLoading,
  isCreating,
  onNewChat,
  onSelectSession,
  onClose,
  onRedirect,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r bg-muted/20 p-3">
      <div className="mb-5 flex items-center justify-between px-1">
        <span className="text-lg font-semibold tracking-tight">
          GitCrawler
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <PanelLeftClose className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRedirect}
          aria-label="Go back to dashboard"
        >
          <TiArrowLeftOutline/>
        </Button>
      </div>

      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={onNewChat}
        disabled={isCreating}
      >
        {isCreating ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
        New chat
      </Button>

      <div className="mb-2 mt-7 flex items-center gap-2 px-2">
        <Clock3 className="size-3.5 text-muted-foreground" />
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recent chats
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" />
            Loading conversations...
          </div>
        ) : sessions.length === 0 ? (
          <p className="px-3 py-4 text-sm leading-5 text-muted-foreground">
            No conversations yet. Start a new chat to explore your codebase.
          </p>
        ) : (
          sessions.map((session) => {
            const isActive = session.id === activeSessionId;

            return (
              <button
                key={session.id}
                type="button"
                onClick={() => onSelectSession(session.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                <MessageSquare className="size-4 shrink-0" />

                <span className="truncate">{session.title}</span>
              </button>
            );
          })
        )}
      </div>

      <div className="mt-3 border-t px-2 pt-3 text-xs text-muted-foreground">
        Repository-aware AI assistant
      </div>
    </aside>
  );
}