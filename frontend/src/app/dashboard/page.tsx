"use client";

import { useState, useEffect } from "react";
import { Database, UploadCloud, MessageSquare, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchMetrics, fetchSpaces } from "@/lib/api";
import Link from "next/link";
import { LoadingScreen } from "@/components/loading-screen";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({ total_spaces: 0, documents_indexed: 0, queries_answered: 0 });
  const [spaces, setSpaces] = useState<{id: number, name: string, created_at: string, document_count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [m, s] = await Promise.all([fetchMetrics(), fetchSpaces()]);
        setMetrics(m);
        setSpaces(s.slice(0, 3)); // top 3 recent spaces
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="h-full flex items-center justify-center"><LoadingScreen onComplete={() => {}} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Here is what is happening with your knowledge spaces.</p>
        </div>
        <Link href="/dashboard/spaces">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(110,231,183,0.3)]">
            <Plus className="w-4 h-4 mr-2" /> New Space
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Spaces", value: metrics.total_spaces, icon: Database, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Documents Indexed", value: metrics.documents_indexed, icon: UploadCloud, color: "text-primary", bg: "bg-primary/10" },
          { label: "Queries Answered", value: metrics.queries_answered, icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-400/10" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-xl bg-card border border-border/50 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-colors">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Spaces */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Spaces</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            View All <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.length === 0 ? (
            <div className="col-span-3 py-12 text-center border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground mb-4">No spaces created yet.</p>
              <Link href="/dashboard/spaces">
                <Button variant="outline">Create your first space</Button>
              </Link>
            </div>
          ) : spaces.map((space, i) => (
            <Link key={space.id} href={`/dashboard/spaces`}>
              <div className="p-5 rounded-xl bg-card border border-border/50 hover:shadow-[0_0_20px_rgba(110,231,183,0.1)] hover:border-primary/40 transition-all cursor-pointer group h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50">
                    <Database className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-border/50">{space.document_count} sources</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{space.name}</h3>
                <p className="text-sm text-muted-foreground">Created {new Date(space.created_at).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
