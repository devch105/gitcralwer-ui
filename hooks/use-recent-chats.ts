"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRecentChats } from "@/lib/api/chat";

export const recentChatKeys = {
  all: ["recent-chats"] as const,
};

export function useRecentChats(limit = 5) {
  return useQuery({
    queryKey: [...recentChatKeys.all, limit],
    queryFn: () => fetchRecentChats(limit),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}