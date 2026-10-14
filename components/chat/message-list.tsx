"use client";

import type { ChatMessage } from "@/types/chat";
import ChatMessageView from "@/components/chat/chat-message";
import { LoaderCircle, MessageSquareText } from "lucide-react";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error?: string | null;
  streamedText?: string;
  isStreaming?: boolean;
}

export default function MessageList({
  messages,
  isLoading,
  error,
  streamedText = "",
  isStreaming = false,
}: MessageListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin" />
        Loading conversation...
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-1 items-center justify-center px-4 text-center text-sm text-destructive"
      >
        {error}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border bg-muted/40">
          <MessageSquareText className="size-6 text-muted-foreground" />
        </div>

        <h2 className="text-lg font-semibold">What would you like to know?</h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Ask GitCrawler about your repository's architecture, functions,
          dependencies, or implementation details.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-7 px-4 py-8">
      {messages.map((message) => (
        <ChatMessageView key={message.id} message={message} />
      ))}
      {isStreaming && (
  <div className="flex justify-start">
    <div className="max-w-[85%] rounded-2xl bg-muted px-4 py-3">
      {streamedText ? (
        <p className="whitespace-pre-wrap break-words">
          {streamedText}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Thinking...
        </p>
      )}
    </div>
  </div>
)}
    </div>
  );
}