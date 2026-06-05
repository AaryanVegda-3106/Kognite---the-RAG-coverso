import { BarChart3, TrendingUp, Activity, Zap } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Monitor your RAG pipeline performance and usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Queries", value: "3,042", icon: Activity, trend: "+12%" },
          { label: "Avg Retrieval Time", value: "240ms", icon: Zap, trend: "-5%" },
          { label: "Vectors Stored", value: "45,231", icon: BarChart3, trend: "+1.2k" },
          { label: "Accuracy Score", value: "94.2%", icon: TrendingUp, trend: "+2.1%" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'text-primary bg-primary/10' : 'text-destructive bg-destructive/10'
              }`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[400px] w-full rounded-xl bg-card border border-border/50 flex items-center justify-center hover:border-primary/20 transition-colors relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="text-center relative z-10">
          <BarChart3 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Detailed Analytics UI Pending</p>
          <p className="text-xs text-muted-foreground/70 mt-2">Connects to telemetry API</p>
        </div>
      </div>
    </div>
  );
}
