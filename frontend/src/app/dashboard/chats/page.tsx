"use client";

import { MessageSquare, Plus, Search, Sparkles, Clock, Send, Bot, User, CornerDownLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Mock data
const MOCK_CHATS = [
  { id: 1, title: "Q3 Financial Analysis", date: "2 mins ago", preview: "The revenue grew by 15% due to...", active: true },
  { id: 2, title: "API Authentication Auth0", date: "1 hr ago", preview: "To implement JWT tokens, you need...", active: false },
  { id: 3, title: "Onboarding Process", date: "Yesterday", preview: "The first step for new hires is...", active: false },
];

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState<number | null>(1);

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-6">
      
      {/* Sidebar: Chat History */}
      <div className="w-80 flex flex-col bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-xl shrink-0">
        <div className="p-6 border-b border-white/5">
          <button className="w-full bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all rounded-xl py-3 font-bold flex items-center justify-center gap-2">
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

        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10">
          {MOCK_CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                chat.active 
                  ? "bg-primary/10 border-primary/30 border shadow-[0_0_15px_rgba(217,70,239,0.1)]" 
                  : "bg-transparent border-transparent border hover:bg-white/5 hover:border-white/10"
              }`}
            >
              {chat.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(217,70,239,1)]"></div>}
              <h4 className={`font-bold text-sm mb-1 truncate ${chat.active ? "text-primary" : "text-white group-hover:text-primary transition-colors"}`}>{chat.title}</h4>
              <p className="text-white/40 text-xs truncate mb-2">{chat.preview}</p>
              <div className="flex items-center gap-1.5 text-white/30 text-[10px] font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3" />
                {chat.date}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-xl relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        
        {/* Chat Header */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 shrink-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
              Q3 Financial Analysis
              <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest">Active</span>
            </h2>
            <p className="text-xs text-white/40 font-medium mt-1">Querying: Finance Knowledge Base</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <Sparkles className="w-4 h-4 text-primary" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 z-10 scrollbar-thin scrollbar-thumb-white/10">
          
          {/* User Message */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <div className="flex gap-4 max-w-[80%]">
              <div className="bg-primary text-white p-5 rounded-2xl rounded-tr-sm shadow-[0_0_20px_rgba(217,70,239,0.3)] border border-primary/50">
                <p className="text-sm leading-relaxed font-medium">What were the key drivers for the 15% revenue growth in Q3?</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-white/70" />
              </div>
            </div>
          </motion.div>

          {/* Bot Message */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-start">
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(217,70,239,0.2)]">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-black/40 border border-white/10 p-6 rounded-2xl rounded-tl-sm shadow-xl">
                <p className="text-sm text-white/80 leading-relaxed mb-4 font-medium">
                  Based on the <span className="text-primary cursor-pointer hover:underline">Q3 Financial Report.pdf</span>, the 15% revenue growth was primarily driven by:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex gap-3 text-sm text-white/70 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_5px_rgba(217,70,239,0.8)]"></div>
                    <strong>Enterprise Tier Expansion:</strong> A 22% increase in Enterprise subscriptions.
                  </li>
                  <li className="flex gap-3 text-sm text-white/70 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_5px_rgba(217,70,239,0.8)]"></div>
                    <strong>New Market Entry:</strong> Successful launch in the APAC region.
                  </li>
                </ul>
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Sources:</span>
                  <span className="text-[11px] px-2 py-1 bg-white/5 rounded border border-white/10 text-white/60 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors cursor-pointer">
                    Q3_Report_Final.pdf (Page 4)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-black/20 border-t border-white/5 z-10 shrink-0">
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-end gap-2 bg-[#121626] border border-white/10 rounded-2xl p-2 transition-colors focus-within:border-primary/50 shadow-inner">
              <textarea 
                placeholder="Ask anything about your documents..." 
                className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 resize-none min-h-[44px] max-h-[150px] p-3 font-medium scrollbar-thin"
                rows={1}
              />
              <button className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] transition-all shrink-0 mb-0.5">
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
