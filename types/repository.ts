export type IndexStatus =
  | "PENDING"
  | "INDEXING"
  | "COMPLETED"
  | "FAILED";

export interface Repository {
  id: string;
  githubRepoId: number;
  name: string;
  description: string | null;
  owner: string;
  fullName: string;

  isPrivate: boolean;

  defaultBranch: string;
  language: string | null;

  htmlUrl: string;

  errorMessage: string | null;

  indexStatus: IndexStatus;
  indexedAt: string | null;

  chunkCount: number;
  filesTotal: number;
  filesProcessed: number;
}