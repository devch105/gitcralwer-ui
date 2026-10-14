"use client";

import { streamChatMessage } from "@/lib/api/chat";
import type { ChatMessage } from "@/types/chat";
import { useCallback, useRef, useState } from "react";

interface UseChatStreamOptions {
  onUserMessage?: (message: ChatMessage) => void;
  onAssistantMessage?: (message: ChatMessage) => void;
  onDone?: () => void;
}

export function useChatStream(options: UseChatStreamOptions = {}) {
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const sendMessage = useCallback(
    async (sessionId: string, content: string) => {
      if (!sessionId || !content.trim() || abortControllerRef.current) {
        return;
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setStreamedText("");
      setError(null);
      setIsStreaming(true);

      try {
        await streamChatMessage(
          sessionId,
          content.trim(),
          {
            onUserMessage: (message) => {
              optionsRef.current.onUserMessage?.(message);
            },

            onToken: (token) => {
              setStreamedText((previous) => previous + token);
            },

            onAssistantMessage: (message) => {
              optionsRef.current.onAssistantMessage?.(message);
            },

            onDone: () => {
              optionsRef.current.onDone?.();
            },

            onError: (message) => {
              setError(message);
            },
          },
          controller.signal
        );
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to generate a response"
          );
        }
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
          setIsStreaming(false);
        }
      }
    },
    []
  );

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
  }, []);

  const resetStream = useCallback(() => {
    setStreamedText("");
    setError(null);
  }, []);

  return {
    streamedText,
    isStreaming,
    error,
    sendMessage,
    stopStreaming,
    resetStream,
  };
}
