"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { CitationCard } from "@/components/chat/citation-card";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessageView({ message }: ChatMessageProps) {
  const isUser = message.role === "USER";

  return (
    <article
      className={`flex w-full gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] min-w-0 ${
          isUser ? "order-1" : "order-2"
        }`}
      >
        <div
          className={`mb-1 text-xs font-medium text-muted-foreground ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {isUser ? "You" : "GitCrawler"}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-7 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "border bg-card"
          }`}
        >
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {!isUser && message.citations?.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Sources
            </p>

            {message.citations.map((citation, index) => (
              <CitationCard
                key={`${citation.filePath ?? "source"}-${citation.startLine ?? "unknown"}-${index}`}
                citation={citation}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}