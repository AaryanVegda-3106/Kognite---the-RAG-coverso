"use client";

import { UploadCloud, File as FileIcon, Link as LinkIcon, Video, ShieldCheck, Database } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'file' | 'link' | 'youtube'>('file');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Ingestion Engine</h1>
          <p className="text-white/50 text-lg max-w-2xl">Upload documents, sync websites, or process YouTube videos. The Kognite engine will automatically chunk, vectorize, and index the content into your selected vault.</p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Main Ingestion Area */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 space-y-6"
        >
          {/* Tabs */}
          <div className="flex gap-4 p-2 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-xl w-max">
            {[
              { id: 'file', label: 'Documents', icon: FileIcon },
              { id: 'link', label: 'Website Link', icon: LinkIcon },
              { id: 'youtube', label: 'YouTube Video', icon: Video },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'file' | 'link' | 'youtube')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area based on Active Tab */}
          {activeTab === 'file' ? (
            <div 
              className={`relative group bg-[#1A1D2D]/60 backdrop-blur-xl border-2 border-dashed rounded-[2rem] p-16 transition-all duration-500 overflow-hidden text-center flex flex-col items-center justify-center min-h-[400px] ${
                dragActive 
                  ? "border-primary bg-primary/5 shadow-[0_0_50px_rgba(217,70,239,0.2)]" 
                  : "border-white/10 hover:border-primary/50 hover:bg-white/[0.02]"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => { handleDrag(e); setDragActive(false); }}
            >
              {/* Ambient Pulse */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full bg-black/40 border flex items-center justify-center mb-8 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] ${
                  dragActive ? "border-primary text-primary scale-110 shadow-[0_0_30px_rgba(217,70,239,0.5)]" : "border-white/10 text-white/40 group-hover:text-white group-hover:scale-110 group-hover:border-primary/50"
                }`}>
                  <UploadCloud className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Drag & Drop Files Here
                </h3>
                
                <p className="text-white/40 mb-8 max-w-sm leading-relaxed">
                  Supports PDF, TXT, DOCX, CSV. Maximum file size 50MB per document.
                </p>
                
                <button className="bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all rounded-full px-10 py-4 font-bold tracking-wide">
                  Browse Files
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-16 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
              
              <div className="w-24 h-24 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] text-primary">
                {activeTab === 'link' ? <LinkIcon className="w-10 h-10" /> : <Video className="w-10 h-10" />}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {activeTab === 'link' ? 'Enter Website URL' : 'Enter YouTube URL'}
              </h3>
              
              <p className="text-white/40 mb-8 max-w-sm leading-relaxed text-center">
                {activeTab === 'link' 
                  ? 'The engine will crawl the webpage and extract text content automatically.' 
                  : 'The engine will process the video transcript and metadata.'}
              </p>

              <div className="w-full max-w-md space-y-4 relative z-10">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <input 
                    type="url"
                    placeholder={activeTab === 'link' ? "https://example.com" : "https://youtube.com/watch?v=..."}
                    className="relative w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-primary transition-colors text-center font-medium"
                  />
                </div>
                
                <button className="w-full bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] transition-all rounded-xl px-10 py-4 font-bold tracking-wide">
                  Process Link
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Configuration Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              Ingestion Config
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-white/50 uppercase tracking-widest block mb-3">Target Vault</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-primary transition-colors appearance-none font-medium">
                  <option>Finance Knowledge Base</option>
                  <option>Engineering Docs</option>
                  <option>HR Policies</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-white/50 uppercase tracking-widest block mb-3">Chunking Strategy</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-primary transition-colors appearance-none font-medium">
                  <option>Semantic (Recommended)</option>
                  <option>Fixed Size (500 tokens)</option>
                  <option>Fixed Size (1000 tokens)</option>
                  <option>Sentence Level</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex gap-4 mt-8">
                <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-emerald-500 font-bold text-sm mb-1">Secure Processing</p>
                  <p className="text-emerald-500/70 text-xs leading-relaxed">All documents are encrypted at rest and isolated within your workspace.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
