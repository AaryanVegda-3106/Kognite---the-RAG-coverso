"use client";

import { useState, useEffect } from "react";
import { Database, Plus, MoreVertical, FileText, Globe, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchSpaces, createSpace } from "@/lib/api";
import { LoadingScreen } from "@/components/loading-screen";

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<{id: number, name: string, created_at: string, document_count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSpaces() {
    try {
      const data = await fetchSpaces();
      setSpaces(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSpaces();
  }, []);

  const handleCreateSpace = async () => {
    const name = prompt("Enter a name for the new Knowledge Space:");
    if (!name) return;
    try {
      await createSpace(name);
      loadSpaces();
    } catch (e) {
      alert("Failed to create space");
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><LoadingScreen onComplete={() => {}} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Knowledge Spaces</h1>
          <p className="text-muted-foreground mt-1">Manage your document collections and vectors.</p>
        </div>
        <Button onClick={handleCreateSpace} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(110,231,183,0.3)]">
          <Plus className="w-4 h-4 mr-2" /> Create Space
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.length === 0 ? (
          <div className="col-span-full py-12 text-center border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">You have not created any Knowledge Spaces yet.</p>
            <Button onClick={handleCreateSpace} variant="outline">Create Space</Button>
          </div>
        ) : spaces.map((space) => (
          <div key={space.id} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/40 transition-all group cursor-pointer hover:shadow-[0_0_20px_rgba(110,231,183,0.05)]">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center border border-border/50 group-hover:bg-primary/10 transition-colors">
                <Database className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-1 text-foreground">{space.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">Created {new Date(space.created_at).toLocaleDateString()}</p>
            
            <div className="flex justify-between border-t border-border/50 pt-4">
               <span className="text-xs font-medium text-muted-foreground">{space.document_count} total sources</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
