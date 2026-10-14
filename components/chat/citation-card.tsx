import { FileCode2 } from "lucide-react";
import type { Citation } from "@/types/chat";

interface CitationCardProps {
  citation: Citation;
}

export function CitationCard({ citation }: CitationCardProps) {
  const lineRange =
    citation.startLine != null
      ? citation.endLine != null &&
        citation.endLine !== citation.startLine
        ? `L${citation.startLine}–L${citation.endLine}`
        : `L${citation.startLine}`
      : null;

  return (
    <div className="flex min-w-0 items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs">
      <FileCode2 className="size-4 shrink-0 text-muted-foreground" />

      <span className="min-w-0 flex-1 truncate font-mono">
        {citation.filePath ?? "Source file"}
      </span>

      {lineRange && (
        <span className="shrink-0 text-muted-foreground">
          {lineRange}
        </span>
      )}
    </div>
  );
}