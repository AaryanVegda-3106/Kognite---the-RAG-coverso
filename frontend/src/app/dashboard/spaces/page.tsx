"use client";

import { Database, Plus, Search, Lock, MoreVertical, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Space {
  id: number;
  name: string;
  created_at: string;
  document_count: number;
}

export default function SpacesPage() {
  const [search, setSearch] = useState("");
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchSpaces = async () => {
    try {
      const res = await fetch(`${API_URL}/api/spaces/`);
      if (res.ok) {
        const data = await res.json();
        setSpaces(data);
      }
    } catch (err) {
      console.error("Failed to fetch spaces", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const handleCreateSpace = async () => {
    if (!newSpaceName.trim()) return;
    
    setIsCreating(true);
    try {
      const res = await fetch(`${API_URL}/api/spaces/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newSpaceName }),
      });
      
      if (res.ok) {
        setNewSpaceName("");
        setIsModalOpen(false);
        fetchSpaces(); // refresh list
      }
    } catch (err) {
      console.error("Failed to create space", err);
    } finally {
      setIsCreating(false);
    }
  };

  const filteredSpaces = spaces.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

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
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all rounded-full px-8 py-3 font-bold tracking-wide flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Vault
          </button>
        </motion.div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : filteredSpaces.length === 0 ? (
        <div className="text-center py-20 bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem]">
          <Database className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Vaults Found</h3>
          <p className="text-white/40">Create your first data vault to start ingesting knowledge.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space, i) => (
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
                <p className="text-white/50 text-sm line-clamp-2 mb-10 flex-1 leading-relaxed">
                  Created on {new Date(space.created_at).toLocaleDateString()}
                </p>
                
                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    {space.document_count} Documents
                  </div>
                  <div className="px-4 py-1.5 rounded-full text-xs font-bold border bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    Active
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isCreating && setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0F172A] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full pointer-events-none -z-10"></div>
              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Create New Vault</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isCreating}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Vault Name</label>
                  <input 
                    type="text" 
                    value={newSpaceName}
                    onChange={(e) => setNewSpaceName(e.target.value)}
                    placeholder="e.g. Finance Knowledge Base"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-primary transition-colors font-medium"
                    autoFocus
                  />
                </div>

                <button 
                  onClick={handleCreateSpace}
                  disabled={!newSpaceName.trim() || isCreating}
                  className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-all rounded-xl px-8 py-4 font-bold tracking-wide flex items-center justify-center gap-2"
                >
                  {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  {isCreating ? "Creating..." : "Create Vault"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
