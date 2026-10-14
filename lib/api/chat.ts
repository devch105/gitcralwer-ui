
import type {
  ChatMessage,
  ChatSession,
  CreateChatSessionRequest,
  RecentChat
} from "@/types/chat";
import { ENDPOINTS } from "@/utilities/endpoints";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text().catch(() => "");

    throw new Error(
      message || `Chat API request failed: ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Create a new chat session for a repository.
 */
export async function createChatSession(
  request: CreateChatSessionRequest
): Promise<ChatSession> {
  const response = await fetch(ENDPOINTS.CHAT_SESSIONS, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  return handleResponse<ChatSession>(response);
}

/**
 * Fetch all chat sessions for a repository.
 */
export async function fetchChatSessions(
  repositoryId: string
): Promise<ChatSession[]> {
  const url = new URL(ENDPOINTS.CHAT_SESSIONS);
  url.searchParams.set("repositoryId", repositoryId);

  const response = await fetch(url.toString(), {
    method: "GET",
    credentials: "include",
  });

  return handleResponse<ChatSession[]>(response);
}

/**
 * Fetch all messages belonging to a chat session.
 */
export async function fetchChatMessages(
  sessionId: string
): Promise<ChatMessage[]> {
  const response = await fetch(
    `${ENDPOINTS.CHAT_SESSIONS}/${encodeURIComponent(sessionId)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return handleResponse<ChatMessage[]>(response);
}



export interface ChatStreamCallbacks {
  onUserMessage?: (message: import("@/types/chat").ChatMessage) => void;
  onToken?: (token: string) => void;
  onAssistantMessage?: (
    message: import("@/types/chat").ChatMessage
  ) => void;
  onDone?: () => void;
  onError?: (message: string) => void;
}

/**
 * Sends a message and consumes the Spring Boot SSE response.
 */
export async function streamChatMessage(
  sessionId: string,
  content: string,
  callbacks: ChatStreamCallbacks,
  signal?: AbortSignal
): Promise<void> {
  const response = await fetch(
    `${ENDPOINTS.CHAT_SESSIONS}/${encodeURIComponent(sessionId)}/messages`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({ content }),
      signal,
    }
  );

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(
      message || `Chat request failed with status ${response.status}`
    );
  }

  if (!response.body) {
    throw new Error("The server did not provide a streaming response");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";
  let eventName = "message";

  function dispatchEvent(block: string) {
    let name = "message";
    const dataLines: string[] = [];

    for (const line of block.split(/\r?\n/)) {
      if (line.startsWith("event:")) {
        name = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        dataLines.push(line.slice(5).replace(/^ /, ""));
      }
    }

    if (dataLines.length === 0) return;

    const data = dataLines.join("\n");

    try {
      switch (name) {
        case "user_message":
          callbacks.onUserMessage?.(JSON.parse(data));
          break;

        case "token":
          // Spring may serialize string data as JSON depending on its
          // message converter. Decode JSON strings when applicable.
          try {
            const parsed: unknown = JSON.parse(data);
            callbacks.onToken?.(
              typeof parsed === "string" ? parsed : data
            );
          } catch {
            callbacks.onToken?.(data);
          }
          break;

        case "assistant_message":
          callbacks.onAssistantMessage?.(JSON.parse(data));
          break;

        case "done":
          callbacks.onDone?.();
          break;

        case "error": {
          let message = data;

          try {
            const parsed = JSON.parse(data);
            if (typeof parsed.message === "string") {
              message = parsed.message;
            }
          } catch {
            // Keep the original event data.
          }

          callbacks.onError?.(message);
          break;
        }
      }
    } catch (error) {
      callbacks.onError?.(
        error instanceof Error
          ? error.message
          : "Could not process a chat event"
      );
    }
  }

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      buffer = buffer.replace(/\r\n/g, "\n");

      let separatorIndex: number;

      while ((separatorIndex = buffer.indexOf("\n\n")) !== -1) {
        const block = buffer.slice(0, separatorIndex);
        buffer = buffer.slice(separatorIndex + 2);

        if (block.trim()) dispatchEvent(block);
      }
    }

    buffer += decoder.decode();

    if (buffer.trim()) {
      dispatchEvent(buffer);
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Fetch the user's most recently active chat sessions.
 */
export async function fetchRecentChats(
  limit = 5
): Promise<RecentChat[]> {
  const url = new URL(`${ENDPOINTS.CHAT_SESSIONS}/recent`);
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url.toString(), {
    method: "GET",
    credentials: "include",
  });

  
  return handleResponse<RecentChat[]>(response);
}
