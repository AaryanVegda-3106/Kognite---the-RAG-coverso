"use client";

import { MessageSquare, Plus, Search, Sparkles, Clock, Send, Bot, User, CornerDownLeft, Loader2, Database } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Space {
  id: number;
  name: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

export default function ChatsPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState<number | "">("");
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch Spaces
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch(`${API_URL}/api/spaces/`);
        if (res.ok) {
          const data = await res.json();
          setSpaces(data);
          if (data.length > 0) setSelectedSpaceId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch spaces", err);
      }
    };
    fetchSpaces();
  }, [API_URL]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedSpaceId || isTyping) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch(`${API_URL}/api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          space_id: Number(selectedSpaceId),
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...newMessages, { role: "assistant", content: data.response, sources: data.sources }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Sorry, I encountered an error while processing your request." }]);
      }
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "assistant", content: "Failed to connect to the backend API." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedSpaceName = spaces.find(s => s.id === Number(selectedSpaceId))?.name || "Select a Vault";

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-6">
      
      {/* Sidebar: Chat History */}
      <div className="w-80 flex flex-col bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-xl shrink-0 hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <button 
            onClick={() => setMessages([])}
            className="w-full bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all rounded-xl py-3 font-bold flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Thread
          </button>
        </div>
        
        <div className="p-4 border-b border-white/5 relative">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search threads..." 
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-primary transition-colors font-medium"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10 flex flex-col items-center justify-center text-center">
          <MessageSquare className="w-8 h-8 text-white/10 mb-2" />
          <p className="text-white/40 text-sm font-medium">Current Session</p>
          <p className="text-white/20 text-xs mt-1">History is not saved yet.</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-xl relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        
        {/* Chat Header */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 shrink-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
              Intelligence Chat
              <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest">Active</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Database className="w-3 h-3 text-white/40" />
              <select 
                value={selectedSpaceId}
                onChange={(e) => setSelectedSpaceId(e.target.value ? Number(e.target.value) : "")}
                className="bg-transparent text-xs text-white/60 outline-none cursor-pointer hover:text-white transition-colors appearance-none font-medium"
              >
                <option value="" disabled>Select a vault...</option>
                {spaces.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#1A1D2D] text-white">
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <Sparkles className="w-4 h-4 text-primary" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 z-10 scrollbar-thin scrollbar-thumb-white/10">
          
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <Sparkles className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">How can I help you?</h3>
              <p className="text-white/60 text-sm max-w-sm">
                Ask a question about your documents in <strong>{selectedSpaceName}</strong>.
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row' : 'flex-row'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(217,70,239,0.2)] mt-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  
                  <div className={`p-5 rounded-2xl shadow-xl ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-sm border border-primary/50 shadow-[0_0_20px_rgba(217,70,239,0.3)]' 
                      : 'bg-black/40 border border-white/10 rounded-tl-sm text-white/80'
                  }`}>
                    {msg.role === 'user' ? (
                      <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                    ) : (
                      <div className="text-sm leading-relaxed font-medium prose prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                    
                    {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 flex-wrap">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Sources:</span>
                        {msg.sources.map((src, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 bg-white/5 rounded border border-white/10 text-white/60">
                            {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {msg.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center shrink-0 mt-2">
                      <User className="w-5 h-5 text-white/70" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(217,70,239,0.2)]">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                </div>
                <div className="bg-black/40 border border-white/10 p-4 rounded-2xl rounded-tl-sm flex items-center">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-black/20 border-t border-white/5 z-10 shrink-0">
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-end gap-2 bg-[#121626] border border-white/10 rounded-2xl p-2 transition-colors focus-within:border-primary/50 shadow-inner">
              <textarea 
                placeholder={selectedSpaceId ? `Ask anything about ${selectedSpaceName}...` : "Select a vault to start asking..."}
                className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 resize-none min-h-[44px] max-h-[150px] p-3 font-medium scrollbar-thin"
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!selectedSpaceId || isTyping}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!selectedSpaceId || !inputMessage.trim() || isTyping}
                className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-all shrink-0 mb-0.5"
              >
                <CornerDownLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-white/30 font-bold uppercase tracking-widest mt-4">
            Kognite may produce inaccurate information. Verify critical data.
          </p>
        </div>

      </div>
    </div>
  );
}
