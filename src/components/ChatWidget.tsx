"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function ChatWidget({ isAdmin = false }: { isAdmin?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: isAdmin 
        ? "Hello, Admin. I am your Business Intelligence Assistant. I can help you with sales reports, inventory levels, and customer trends." 
        : "Hi there! I''m Steffen''s Assistant. I can help you with questions about our wood designs, custom orders, or how to contact us."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = isAdmin 
        ? "As an admin assistant, I''ve analyzed our recent sales. Your ''Cedar Picnic Table'' is trending with 15 sales this week, but stock is down to 3 units. Should I create a restock alert?"
        : "That''s a great question! Our custom wood signs usually take 2-3 weeks for delivery. You can check our Gallery page for inspiration!";
      
      setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <div className="relative">
          <div className={cn(
            "absolute -inset-1 rounded-full opacity-60 blur-md animate-pulse",
            isAdmin ? "bg-slate-700" : "bg-primary"
          )} />
          
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-4 w-60 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-white dark:bg-slate-900 border shadow-2xl rounded-2xl p-3 text-md font-medium relative">
                <p className="text-slate-700 dark:text-slate-200">
                  {isAdmin ? "?? Review today''s BI analytics?" : "Need a custom wood design quote?"}
                </p>
                <div className="absolute top-full right-6 w-2 h-2 bg-white dark:bg-slate-900 border-r border-b rotate-45 -mt-1" />
                <button
                title="Close tooltip" 
                  onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                  className="absolute -top-1 -right-1 bg-slate-200 dark:bg-slate-800 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            </div>
          )}

          <Button 
            onClick={() => { setIsOpen(true); setShowTooltip(false); }}
            className={cn(
              "h-14 w-14 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group relative overflow-hidden",
              isAdmin ? "bg-slate-900" : "bg-primary"
            )}
          >
            <MessageSquare className="h-6 w-6 relative z-10 group-hover:rotate-12 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Button>
        </div>
      ) : (
        <Card className="w-[380px] h-[550px] shadow-2xl flex flex-col border-2 overflow-hidden animate-in slide-in-from-bottom-5">
          <CardHeader className={cn("p-4 flex flex-row items-center justify-between text-white", isAdmin ? "bg-slate-900" : "bg-primary")}>
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-white/20">
                <AvatarImage src={isAdmin ? "/admin-bot.png" : "/bot-avatar.png"} />
                <AvatarFallback>{isAdmin ? "AI" : "SB"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-headline">{isAdmin ? "Admin BI Bot" : "Steffen's Bot"}</CardTitle>
                <p className="text-xs opacity-80">{isAdmin ? "Analytics & Management" : "Always here to help"}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden bg-slate-50">
            <ScrollArea className="h-full p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex items-start gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm", m.role === "assistant" ? (isAdmin ? "bg-slate-800 text-white" : "bg-primary text-white") : "bg-white border text-slate-600")}>
                      {m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={cn("rounded-2xl px-4 py-2.5 max-w-[80%] text-sm shadow-sm", m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none")}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs ml-11">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Assistant is thinking...
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3 border-t bg-white">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 focus-visible:ring-primary"
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()} className={isAdmin ? "bg-slate-900" : "bg-primary"}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
