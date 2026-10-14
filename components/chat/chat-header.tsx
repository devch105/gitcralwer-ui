
"use client";

import { Code2, ChevronDown, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  repoId: string;
  repoFullName?: string;
}

export default function ChatHeader({ repoId, repoFullName }: ChatHeaderProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
          <Code2 className="size-4" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-sm font-semibold">
              Codebase Chat
            </h1>

            <span className="hidden rounded-md border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
              RAG
            </span>
          </div>

          <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            <GitBranch className="size-3 shrink-0" />
            <span className="truncate" title={repoFullName}>
  {repoFullName}
</span>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="shrink-0 gap-1.5 text-muted-foreground"
        disabled
        aria-label="Chat options coming soon"
      >
        <span className="hidden sm:inline">Repository</span>
        <ChevronDown className="size-4" />
      </Button>
    </div>
  );
}
