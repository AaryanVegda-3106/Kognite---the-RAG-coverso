"use client";

import { Database, Plus, Search, Lock, MoreVertical } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Mock data
const MOCK_SPACES = [
  { id: 1, name: "Finance Knowledge Base", description: "All Q1-Q4 financial reports and analyses.", docs: 45, status: "Active" },
  { id: 2, name: "Engineering Docs", description: "Architecture diagrams and API specs.", docs: 128, status: "Syncing" },
  { id: 3, name: "HR Policies", description: "Employee handbook and onboarding.", docs: 12, status: "Active" },
];

export default function SpacesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Data Vaults</h1>
          <p className="text-white/50 text-lg">Manage and isolate your vector knowledge spaces.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4"
        >
          <div className="relative group w-64 hidden sm:block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-duration-500"></div>
            <div className="relative flex items-center bg-[#1A1D2D]/80 border border-white/10 rounded-full px-5 py-3 transition-colors group-hover:border-primary/30">
              <Search className="w-5 h-5 text-white/40 mr-3 group-hover:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search vaults..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 w-full font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <button className="bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all rounded-full px-8 py-3 font-bold tracking-wide flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Vault
          </button>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SPACES.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((space, i) => (
          <motion.div
            key={space.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-lg"
          >
            {/* Animated Glow Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <Database className="w-7 h-7" />
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{space.name}</h3>
              <p className="text-white/50 text-sm line-clamp-2 mb-10 flex-1 leading-relaxed">{space.description}</p>
              
              <div className="flex items-center justify-between pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  {space.docs} Documents
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${space.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-amber-500/10 border-amber-500/20 text-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.2)]'}`}>
                  {space.status}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
