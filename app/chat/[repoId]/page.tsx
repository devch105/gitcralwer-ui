"use client";

import { useParams } from "next/navigation";
import ChatView from "@/components/chat/ChatView";

export default function ChatPage() {
  const params = useParams<{ repoId: string }>();
  const repoId = params.repoId;

  if (!repoId) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Repository not found.
        </p>
      </main>
    );
  }

  return <ChatView repoId={repoId} />;
}
