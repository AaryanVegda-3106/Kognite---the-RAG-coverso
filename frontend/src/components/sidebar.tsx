import { Home, Database, UploadCloud, MessageSquare, BarChart, Settings, BrainCircuit } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-full">
      <div className="p-6 flex items-center gap-2 border-b border-border/50">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
          <BrainCircuit className="w-5 h-5 text-primary" />
        </div>
        <span className="font-bold font-jetbrains text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Kognite</span>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1.5 overflow-y-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3 mt-4">Menu</div>
        <SidebarItem href="/dashboard" icon={Home} label="Dashboard" active />
        <SidebarItem href="/dashboard/spaces" icon={Database} label="Spaces" />
        <SidebarItem href="/dashboard/upload" icon={UploadCloud} label="Uploads" />
        <SidebarItem href="/dashboard/chats" icon={MessageSquare} label="Chats" />
        <SidebarItem href="/dashboard/analytics" icon={BarChart} label="Analytics" />
      </nav>
      <div className="p-4 border-t border-border/50">
        <SidebarItem href="/dashboard/settings" icon={Settings} label="Settings" />
      </div>
    </aside>
  );
}

function SidebarItem({ href, icon: Icon, label, active = false }: { href: string; icon: unknown; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
        active 
          ? "bg-primary/10 text-primary border border-primary/20" 
          : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-transparent"
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? "text-primary" : "group-hover:text-foreground"}`} />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}
