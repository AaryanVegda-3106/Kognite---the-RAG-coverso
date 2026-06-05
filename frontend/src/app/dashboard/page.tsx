import { Database, UploadCloud, MessageSquare, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Here is what is happening with your knowledge spaces.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(110,231,183,0.3)]">
          <Plus className="w-4 h-4 mr-2" /> New Space
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Spaces", value: "4", icon: Database, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Documents Indexed", value: "128", icon: UploadCloud, color: "text-primary", bg: "bg-primary/10" },
          { label: "Queries Answered", value: "3,042", icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-400/10" },
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
          {[
            { name: "Machine Learning Research", sources: 12, updated: "2 hours ago" },
            { name: "Product Requirements", sources: 4, updated: "1 day ago" },
            { name: "Onboarding Docs", sources: 8, updated: "3 days ago" },
          ].map((space, i) => (
            <div key={i} className="p-5 rounded-xl bg-card border border-border/50 hover:shadow-[0_0_20px_rgba(110,231,183,0.1)] hover:border-primary/40 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50">
                  <Database className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-border/50">{space.sources} sources</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">{space.name}</h3>
              <p className="text-sm text-muted-foreground">Updated {space.updated}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
