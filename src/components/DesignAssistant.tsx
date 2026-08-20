"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type DesignDraft = {
  text: string;
  stain: string;
  size: string;
};

type AssistantResult = {
  reply: string;
  draft: DesignDraft;
  quoteCents: number;
};

export function DesignAssistant({
  draft,
  onApply,
}: {
  draft: DesignDraft;
  onApply: (draft: DesignDraft) => void;
}) {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [pending, setPending] = useState(false);

  async function handleAsk() {
    setPending(true);
    try {
      const response = await fetch("/api/agent/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, draft }),
      });
      const data = (await response.json()) as AssistantResult & { error?: string };
      if (!response.ok) {
        setReply(data.error ?? "Assistant is unavailable.");
        return;
      }
      setReply(data.reply);
      onApply(data.draft);
    } catch {
      setReply("Assistant is unavailable right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-lg border p-4 space-y-3 bg-card">
      <h2 className="font-headline text-lg font-semibold">Design assistant</h2>
      <p className="text-sm text-muted-foreground">
        Ask for a wood, size, or quote. It only uses local catalog tools — not Stripe keys.
      </p>
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder='e.g. large walnut sign that says "The Millers"'
        rows={3}
      />
      <Button type="button" onClick={handleAsk} disabled={pending || !message.trim()}>
        {pending ? "Thinking..." : "Get suggestion"}
      </Button>
      {reply ? <p className="text-sm leading-relaxed">{reply}</p> : null}
    </div>
  );
}
