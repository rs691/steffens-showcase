"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Loader2, Sparkles, Wrench } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DesignDraft } from "@/lib/agent/design-tools";

type DesignAssistantProps = {
  draft: DesignDraft;
  onApply: (draft: DesignDraft) => void;
};

function extractDraftFromMessages(messages: UIMessage[]): DesignDraft | null {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "assistant") continue;
    for (const part of message.parts ?? []) {
      const type = part.type;
      if (
        type === "tool-applyDesignDraft" ||
        (typeof type === "string" && type.includes("applyDesignDraft"))
      ) {
        const toolPart = part as {
          state?: string;
          output?: { draft?: DesignDraft };
        };
        if (toolPart.output?.draft) {
          return toolPart.output.draft;
        }
      }
    }
  }
  return null;
}

function toolLabel(partType: string): string {
  if (partType.includes("retrieveKnowledge")) return "Retrieved shop knowledge (RAG)";
  if (partType.includes("searchWoods")) return "Searched wood catalog";
  if (partType.includes("quoteSign")) return "Quoted server price";
  if (partType.includes("applyDesignDraft")) return "Updated live design";
  return "Used a tool";
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  const key = "design-copilot-session";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(key, id);
  return id;
}

export function DesignAssistant({ draft, onApply }: DesignAssistantProps) {
  const [input, setInput] = useState("");
  const draftRef = useRef(draft);
  const appliedRef = useRef<string>("");
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/agent/design",
        body: () => ({
          draft: draftRef.current,
          sessionId: sessionIdRef.current || undefined,
        }),
      }),
    [],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
    onFinish: ({ message }) => {
      const next = extractDraftFromMessages([message]);
      if (!next) return;
      const key = `${next.text}|${next.stain}|${next.size}`;
      if (key === appliedRef.current) return;
      appliedRef.current = key;
      onApply(next);
    },
  });

  // Also catch tool results that arrive mid-stream
  useEffect(() => {
    const next = extractDraftFromMessages(messages);
    if (!next) return;
    const key = `${next.text}|${next.stain}|${next.size}`;
    if (key === appliedRef.current) return;
    appliedRef.current = key;
    onApply(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- apply only when message tool output changes
  }, [messages]);

  const busy = status === "submitted" || status === "streaming";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  function handleSuggestion(prompt: string) {
    if (busy) return;
    setInput("");
    void sendMessage({ text: prompt });
  }

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-headline flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-4 w-4 text-primary" />
            Design Copilot
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Grounded in shop knowledge (RAG), catalog tools, and server pricing — then updates
            the live preview.
          </p>
        </div>
        {messages.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setMessages([]);
              appliedRef.current = "";
            }}
          >
            Clear
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          'Large walnut sign that says "The Millers"',
          "Recommend a wood for outdoor use",
          "How long does a custom project take?",
          "What does a custom sign cost?",
        ].map((prompt) => (
          <Button
            key={prompt}
            type="button"
            variant="outline"
            size="sm"
            className="h-auto whitespace-normal px-2 py-1 text-left text-xs"
            disabled={busy}
            onClick={() => handleSuggestion(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>

      <div className="max-h-64 space-y-3 overflow-y-auto rounded-md border bg-muted/30 p-3">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Try a suggestion above, or ask in your own words.
          </p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="space-y-1 text-sm">
              <p className="font-medium text-foreground">
                {message.role === "user" ? "You" : "Copilot"}
              </p>
              {message.parts?.map((part, index) => {
                if (part.type === "text" && part.text) {
                  return (
                    <p key={`${message.id}-t-${index}`} className="leading-relaxed text-muted-foreground">
                      {part.text}
                    </p>
                  );
                }
                if (typeof part.type === "string" && part.type.startsWith("tool-")) {
                  return (
                    <p
                      key={`${message.id}-tool-${index}`}
                      className="inline-flex items-center gap-1 rounded bg-background px-2 py-1 text-xs text-muted-foreground"
                    >
                      <Wrench className="h-3 w-3" />
                      {toolLabel(part.type)}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          ))
        )}
        {busy ? (
          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />
            Thinking…
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='e.g. medium cherry sign that says "Welcome Home"'
          rows={3}
          disabled={busy}
        />
        <Button type="submit" disabled={busy || !input.trim()} className="w-full sm:w-auto">
          {busy ? "Working…" : "Ask Copilot"}
        </Button>
      </form>

      {error ? (
        <p className="text-sm text-destructive">
          Copilot hit an error. Check AI Gateway credentials and try again.
        </p>
      ) : null}
    </div>
  );
}
