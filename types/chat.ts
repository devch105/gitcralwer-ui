
export type MessageRole = "USER" | "ASSISTANT";

export interface Citation {
  filePath: string | null;
  startLine: number | null;
  endLine: number | null;
  language: string | null;
}

export interface ChatSession {
  id: string;
  repositoryId: string;
  title: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citations: Citation[];
  createdAt: string;
}

export interface CreateChatSessionRequest {
  repositoryId: string;
  title?: string;
}

export interface ChatMessageRequest {
  content: string;
}

export interface RecentChat {
  id: string;
  repositoryId: string;
  title: string;
  repositoryFullName: string;
  lastActivityAt: string;
}