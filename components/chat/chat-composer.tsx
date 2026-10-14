
"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, LoaderCircle, Paperclip, Square } from "lucide-react";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";

interface ChatComposerProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isStreaming?: boolean;
  onStop?: () => void;
  placeholder?: string;
}

export default function ChatComposer({
  onSend,
  disabled = false,
  isStreaming = false,
  onStop,
  placeholder = "Ask anything about your repository...",
}: ChatComposerProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = message.trim().length > 0 && !disabled && !isStreaming;

  function resizeTextarea() {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled || isStreaming) return;

    onSend(trimmedMessage);
    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();

      if (canSend) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-background shadow-sm transition-shadow focus-within:ring-1 focus-within:ring-ring"
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
          resizeTextarea();
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isStreaming}
        rows={1}
        aria-label="Message"
        className="max-h-[180px] min-h-12 w-full resize-none bg-transparent px-4 pt-4 pb-2 text-sm leading-6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="flex items-center justify-between gap-3 px-3 pb-3">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Attachments coming soon"
            disabled
            className="size-8 rounded-full text-muted-foreground"
          >
            <Paperclip className="size-4" />
          </Button>

          <span className="hidden text-xs text-muted-foreground sm:inline">
            Shift + Enter for a new line
          </span>
        </div>

        {isStreaming ? (
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="size-9 rounded-full"
            onClick={onStop}
            disabled={!onStop}
            aria-label="Stop generating"
          >
            {onStop ? (
              <Square className="size-3.5 fill-current" />
            ) : (
              <LoaderCircle className="size-4 animate-spin" />
            )}
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            className="size-9 rounded-full"
            disabled={!canSend}
            aria-label="Send message"
          >
            <ArrowUp className="size-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
