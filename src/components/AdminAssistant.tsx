"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Loader2, Shield, Wrench } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function toolLabel(partType: string): string {
  if (partType.includes("summarizeOrders")) return "Summarized orders";
  if (partType.includes("summarizeInquiries")) return "Summarized inquiries";
  return "Used a tool";
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  const key = "admin-copilot-session";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(key, id);
  return id;
}

export function AdminAssistant() {
  const [input, setInput] = useState("");
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/agent/admin",
        body: () => ({
          sessionId: sessionIdRef.current || undefined,
        }),
      }),
    [],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
  });

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
            <Shield className="h-4 w-4 text-primary" />
            Admin Copilot
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Role-gated tools for orders and inquiries — fixed queries, no raw SQL.
          </p>
        </div>
        {messages.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setMessages([])}
          >
            Clear
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          "Summarize orders from the last 30 days",
          "How much revenue did we take in?",
          "Any new contact inquiries this week?",
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

      <div className="max-h-72 space-y-3 overflow-y-auto rounded-md border bg-muted/30 p-3">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ask about paid orders, revenue, or contact-form volume.
          </p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="space-y-1 text-sm">
              <p className="font-medium text-foreground">
                {message.role === "user" ? "You" : "Admin Copilot"}
              </p>
              {message.parts?.map((part, index) => {
                if (part.type === "text" && part.text) {
                  return (
                    <p
                      key={`${message.id}-t-${index}`}
                      className="leading-relaxed text-muted-foreground"
                    >
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
            Looking up shop data…
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. Summarize paid orders this month"
          rows={3}
          disabled={busy}
        />
        <Button type="submit" disabled={busy || !input.trim()} className="w-full sm:w-auto">
          {busy ? "Working…" : "Ask Admin Copilot"}
        </Button>
      </form>

      {error ? (
        <p className="text-sm text-destructive">
          Admin Copilot hit an error. Confirm you are signed in as admin and AI Gateway is
          configured.
        </p>
      ) : null}
    </div>
  );
}
