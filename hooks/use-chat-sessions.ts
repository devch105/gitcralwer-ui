
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createChatSession,
  fetchChatSessions,
} from "@/lib/api/chat";

import type { CreateChatSessionRequest } from "@/types/chat";

export const chatSessionKeys = {
  all: ["chat-sessions"] as const,
  byRepository: (repositoryId: string) =>
    [...chatSessionKeys.all, repositoryId] as const,
};

export function useChatSessions(repositoryId: string) {
  return useQuery({
    queryKey: chatSessionKeys.byRepository(repositoryId),
    queryFn: () => fetchChatSessions(repositoryId),
    enabled: Boolean(repositoryId),
    staleTime: 30_000,
  });
}

export function useCreateChatSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateChatSessionRequest) =>
      createChatSession(request),

    onSuccess: (session) => {
      queryClient.setQueryData(
        chatSessionKeys.byRepository(session.repositoryId),
        (oldSessions: typeof session[] | undefined) => {
          if (!oldSessions) return [session];

          return [
            session,
            ...oldSessions.filter(
              (existing) => existing.id !== session.id
            ),
          ];
        }
      );
    },
  });
}
