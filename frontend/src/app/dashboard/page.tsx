"use client";

import { Database, FileText, MessageSquare, Activity, ArrowUpRight, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    total_spaces: 0,
    documents_indexed: 0,
    queries_answered: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/metrics`);
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (err) {
        console.error("Failed to fetch metrics", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, [API_URL]);

  const stats = [
    { name: "Total Knowledge Spaces", value: metrics.total_spaces.toString(), icon: Database, trend: "Live", color: "from-primary/40 to-primary/10", border: "border-primary/30", text: "text-primary" },
    { name: "Documents Ingested", value: metrics.documents_indexed.toString(), icon: FileText, trend: "Live", color: "from-accent/40 to-accent/10", border: "border-accent/30", text: "text-accent" },
    { name: "Active Queries", value: metrics.queries_answered.toString(), icon: MessageSquare, trend: "Live", color: "from-blue-500/40 to-blue-500/10", border: "border-blue-500/30", text: "text-blue-500" },
    { name: "System Health", value: "99.9%", icon: Activity, trend: "Optimal", color: "from-emerald-500/40 to-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            <Sparkles className="w-3 h-3" />
            System Status Active
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Overview</h1>
          <p className="text-white/50 text-lg">Your intelligence workspace is ready.</p>
        </motion.div>
        
        <Link href="/dashboard/chats">
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all rounded-full px-8 py-4 font-bold tracking-wide flex items-center gap-2"
          >
            New Query
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative group bg-[#1A1D2D]/60 backdrop-blur-xl border ${stat.border} rounded-[2rem] p-6 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden shadow-lg`}
          >
            {/* Hover Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center ${stat.text} group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white/40 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                  {stat.trend}
                </span>
              </div>
              
              <div>
                <h3 className="text-white/50 font-medium text-sm tracking-wide uppercase mb-2">{stat.name}</h3>
                {isLoading ? (
                  <Loader2 className={`w-8 h-8 animate-spin ${stat.text} mt-2`} />
                ) : (
                  <p className={`text-4xl font-bold tracking-tight ${stat.text} drop-shadow-md`}>{stat.value}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-[#1A1D2D]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 overflow-hidden relative shadow-xl hidden md:block"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
        
        <div className="flex items-center justify-center p-8 bg-black/20 rounded-2xl border border-white/5 text-white/40">
          Analytics feature coming soon...
        </div>
      </motion.div>
    </div>
  );
}
