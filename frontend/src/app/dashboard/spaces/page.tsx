import { Database, Plus, MoreVertical, FileText, Globe, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpacesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Knowledge Spaces</h1>
          <p className="text-muted-foreground mt-1">Manage your document collections and vectors.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(110,231,183,0.3)]">
          <Plus className="w-4 h-4 mr-2" /> Create Space
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Machine Learning Research", sources: 12, docs: 4, sites: 6, vids: 2, updated: "2 hours ago" },
          { name: "Product Requirements", sources: 4, docs: 4, sites: 0, vids: 0, updated: "1 day ago" },
          { name: "Onboarding Docs", sources: 8, docs: 2, sites: 5, vids: 1, updated: "3 days ago" },
        ].map((space, i) => (
          <div key={i} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/40 transition-all group cursor-pointer hover:shadow-[0_0_20px_rgba(110,231,183,0.05)]">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center border border-border/50 group-hover:bg-primary/10 transition-colors">
                <Database className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-1 text-foreground">{space.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">Updated {space.updated}</p>
            
            <div className="grid grid-cols-3 gap-2 border-t border-border/50 pt-4">
              <div className="flex flex-col items-center justify-center p-2 rounded-md bg-secondary/30">
                <FileText className="w-4 h-4 text-muted-foreground mb-1" />
                <span className="text-xs font-medium">{space.docs}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-md bg-secondary/30">
                <Globe className="w-4 h-4 text-muted-foreground mb-1" />
                <span className="text-xs font-medium">{space.sites}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-md bg-secondary/30">
                <Video className="w-4 h-4 text-muted-foreground mb-1" />
                <span className="text-xs font-medium">{space.vids}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
