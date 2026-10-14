"use client";

import { fetchChatMessages } from "@/lib/api/chat";
import { useQuery } from "@tanstack/react-query";

export function useChatMessages(sessionId: string | null) {
  return useQuery({
    queryKey: ["chat-messages", sessionId],
    queryFn: () => {
      if (!sessionId) {
        throw new Error("A session ID is required");
      }

      return fetchChatMessages(sessionId);
    },
    enabled: Boolean(sessionId),
    staleTime: 0,
  });
}
