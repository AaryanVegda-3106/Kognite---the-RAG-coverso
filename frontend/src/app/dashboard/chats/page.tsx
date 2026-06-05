"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Link as LinkIcon, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchSpaces } from "@/lib/api";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am Kognite, your AI research assistant. Ask me anything about the documents and sources you've uploaded."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [spaces, setSpaces] = useState<{id: number, name: string}[]>([]);
  const [selectedSpace, setSelectedSpace] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSpaces().then(setSpaces).catch(console.error);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!selectedSpace) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Please select a Knowledge Space from the dropdown above before chatting."
      }]);
      return;
    }

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== "1" && m.role !== "assistant" || m.content !== "Please select a Knowledge Space from the dropdown above before chatting.") // filter out static welcome msg
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, space_id: parseInt(selectedSpace), history })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Request failed");

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        sources: data.sources
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (e: unknown) {
      const error = e as Error;
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Error: ${error.message}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500 relative">
      {/* Space Selector Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-end z-10 pointer-events-none">
        <div className="bg-card border border-border/50 rounded-lg shadow-sm pointer-events-auto flex items-center pr-2">
          <div className="px-3 text-muted-foreground">
             <Database className="w-4 h-4" />
          </div>
          <select 
            value={selectedSpace} 
            onChange={(e) => setSelectedSpace(e.target.value)}
            className="bg-transparent border-none focus:ring-0 py-2 text-sm font-medium text-foreground outline-none cursor-pointer"
          >
            <option value="">Select a Space...</option>
            {spaces.map(space => (
              <option key={space.id} value={space.id}>{space.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pt-20">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            )}
            
            <div className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-sm shadow-[0_0_15px_rgba(110,231,183,0.15)]" 
                  : "bg-card border border-border/50 text-foreground rounded-tl-sm"
              }`}>
                {msg.content}
              </div>
              
              {/* Citations/Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {msg.sources.map((source, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs px-2 py-1 bg-secondary/50 border border-border/50 rounded-md text-muted-foreground">
                      <LinkIcon className="w-3 h-3" />
                      <span className="truncate max-w-[200px]">{source}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border/50">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 max-w-3xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="px-4 py-4 rounded-2xl bg-card border border-border/50 rounded-tl-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="text-sm text-muted-foreground">Synthesizing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="pt-4 border-t border-border/50 bg-background">
        <div className="max-w-3xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your knowledge base..."
            className="w-full bg-card border border-border/80 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-full px-6 py-4 pr-16 text-foreground placeholder:text-muted-foreground transition-all shadow-sm"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon" 
            className="absolute right-2 rounded-full w-10 h-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_10px_rgba(110,231,183,0.3)] transition-all disabled:opacity-50 disabled:shadow-none"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">
          Kognite can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );
}
