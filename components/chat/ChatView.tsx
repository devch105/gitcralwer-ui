"use client";

import ChatComposer from "@/components/chat/chat-composer";
import ChatHeader from "@/components/chat/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar";
import MessageList from "@/components/chat/message-list";
import { Button } from "@/components/ui/button";
import { ENDPOINTS } from "@/utilities/endpoints";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LuPanelLeftClose } from "react-icons/lu";

import { useChatMessages } from "@/hooks/use-chat-message";
import {
  useChatSessions,
  useCreateChatSession,
} from "@/hooks/use-chat-sessions";

import { useChatStream } from "@/hooks/use-chat-stream";
import type { ChatMessage } from "@/types/chat";
import { useQueryClient } from "@tanstack/react-query";

interface ChatViewProps {
  repoId: string;
}

interface RepositorySummary {
  id: string;
  fullName: string;
}

export default function ChatView({ repoId }: ChatViewProps) {
  const [repoFullName, setRepoFullName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const sessionsQuery = useChatSessions(repoId);
  const createSession = useCreateChatSession();

  const messagesQuery = useChatMessages(activeSessionId);

  const sessions = sessionsQuery.data ?? [];
  const messages = messagesQuery.data ?? [];

  const router = useRouter();

  useEffect(() => {
    if (!sessionsQuery.isSuccess) return;

    // Preserve the selected session if it still exists.
    if (
      activeSessionId &&
      sessions.some((session) => session.id === activeSessionId)
    ) {
      return;
    }

    // Select the most recent session when history first loads.
    setActiveSessionId(sessions[0]?.id ?? null);
  }, [sessionsQuery.isSuccess, sessions, activeSessionId]);


  useEffect(() => {
  let cancelled = false;

  async function loadRepositoryName() {
    try {
      const response = await fetch(ENDPOINTS.REPOS, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to load repositories");
      }

      const repositories: RepositorySummary[] = await response.json();

      const repository = repositories.find(
        (item) => item.id === repoId
      );

      if (!cancelled) {
        setRepoFullName(repository?.fullName ?? "");
      }
    } catch (error) {
      console.error("Failed to load repository name:", error);
    }
  }

  void loadRepositoryName();

  return () => {
    cancelled = true;
  };
}, [repoId]);

  async function handleNewChat() {
    try {
      const session = await createSession.mutateAsync({
        repositoryId: repoId,
      });

      setActiveSessionId(session.id);
    } catch {
      // The mutation error is displayed below the chat area.
    }
  }

  const pageError =
    createSession.error instanceof Error
      ? createSession.error.message
      : sessionsQuery.error instanceof Error
        ? sessionsQuery.error.message
        : null;

  const messageError =
    messagesQuery.error instanceof Error
      ? messagesQuery.error.message
      : null;



  const queryClient = useQueryClient();

const streamingSessionIdRef = useRef<string | null>(null);

function upsertMessage(sessionId: string, message: ChatMessage) {
  queryClient.setQueryData<ChatMessage[]>(
    ["chat-messages", sessionId],
    (previous = []) => {
      const index = previous.findIndex(
        (item) => item.id === message.id
      );

      if (index === -1) {
        return [...previous, message];
      }

      return previous.map((item) =>
        item.id === message.id ? message : item
      );
    }
  );
}

const chatStream = useChatStream({
  onUserMessage: (message) => {
    const sessionId = streamingSessionIdRef.current;
    if (sessionId) {
      upsertMessage(sessionId, message);
    }
  },

  onAssistantMessage: (message) => {
    const sessionId = streamingSessionIdRef.current;
    if (sessionId) {
      upsertMessage(sessionId, message);
    }
  },
onDone: () => {
  const sessionId = streamingSessionIdRef.current;

  if (sessionId) {
    // Refresh messages for the current conversation
    void queryClient.invalidateQueries({
      queryKey: ["chat-messages", sessionId],
    });

    // Refresh conversation titles in the sidebar
    void queryClient.invalidateQueries({
      queryKey: ["chat-sessions", repoId],
    });
  }
},
});

const handleRedirect =()=>{
  router.push(`/dashboard/repositories`);
}

async function handleSendMessage(content: string) {
  if (!activeSessionId || !content.trim() || chatStream.isStreaming) {
    return;
  }

  streamingSessionIdRef.current = activeSessionId;

  await chatStream.sendMessage(activeSessionId, content);
}

  return (
    <main className="flex h-dvh overflow-hidden bg-background">
      {sidebarOpen && (
        <div className="hidden md:block">
          <ChatSidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            isLoading={sessionsQuery.isLoading}
            isCreating={createSession.isPending}
            onNewChat={() => void handleNewChat()}
            onSelectSession={setActiveSessionId}
            onClose={() => setSidebarOpen(false)}
            onRedirect={handleRedirect}
          />
        </div>
      )}

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-3 sm:px-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <LuPanelLeftClose className="size-4" />
          </Button>

          <ChatHeader repoId={repoId} repoFullName={repoFullName} />
        </header>

        {pageError && (
          <div
            role="alert"
            className="border-b bg-destructive/10 px-4 py-2 text-sm text-destructive"
          >
            {pageError}
          </div>
        )}

        {sessionsQuery.isError && !sessionsQuery.data ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
            <p className="text-sm text-destructive">
              Could not load chat sessions.
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={() => void sessionsQuery.refetch()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {activeSessionId ? (
                <MessageList
                  messages={messages}
                  isLoading={messagesQuery.isLoading}
                  error={messageError}
                  streamedText={chatStream.streamedText}
                  isStreaming={chatStream.isStreaming}
                />
              ) : sessionsQuery.isLoading ? (
                <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
                  <LoaderCircle className="size-4 animate-spin" />
                  Loading your conversations...
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Ask your codebase anything
                  </h1>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                    Start a chat to explore architecture, investigate bugs,
                    and understand your repository.
                  </p>

                  <Button
                    className="mt-6"
                    onClick={() => void handleNewChat()}
                    disabled={createSession.isPending}
                  >
                    {createSession.isPending && (
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                    )}
                    Start a new chat
                  </Button>
                </div>
              )}
            </div>

            <div className="w-full px-4 pb-4 pt-3">
              <div className="mx-auto max-w-3xl">
                <ChatComposer
                  onSend={handleSendMessage}
                  disabled={!activeSessionId || createSession.isPending}
                  isStreaming={chatStream.isStreaming}
                  onStop={chatStream.stopStreaming}
                  placeholder="Ask anything about this repository..."
                />

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  GitCrawler can make mistakes. Verify important code changes.
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}