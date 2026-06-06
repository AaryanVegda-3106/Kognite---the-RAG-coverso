"use client";

import { Home, Database, UploadCloud, MessageSquare, BarChart, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KogniteLogo } from "@/components/logo";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full bg-[#121626]/60 backdrop-blur-3xl border border-white/5 rounded-[2rem] flex flex-col overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="h-24 flex items-center justify-center border-b border-white/5 bg-white/[0.02]">
        <KogniteLogo className="scale-[0.85]" />
      </div>

      <nav className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        <div className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2 px-4 mt-2">Workspace</div>
        <SidebarItem href="/dashboard" icon={Home} label="Overview" active={pathname === "/dashboard"} />
        <SidebarItem href="/dashboard/spaces" icon={Database} label="Data Vaults" active={pathname?.startsWith("/dashboard/spaces")} />
        <SidebarItem href="/dashboard/upload" icon={UploadCloud} label="Ingestion" active={pathname?.startsWith("/dashboard/upload")} />
        
        <div className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2 px-4 mt-8">Intelligence</div>
        <SidebarItem href="/dashboard/chats" icon={MessageSquare} label="Synthesize" active={pathname?.startsWith("/dashboard/chats")} />
        <SidebarItem href="/dashboard/analytics" icon={BarChart} label="Analytics" active={pathname?.startsWith("/dashboard/analytics")} />
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/20">
        <SidebarItem href="/dashboard/settings" icon={Settings} label="Settings" active={pathname?.startsWith("/dashboard/settings")} />
      </div>
    </aside>
  );
}

function SidebarItem({ href, icon: Icon, label, active = false }: { href: string; icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group overflow-hidden ${
        active 
          ? "bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(217,70,239,0.15)]" 
          : "hover:bg-white/5 border border-transparent"
      }`}
    >
      {/* Active Glow Backdrop */}
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50 blur-md pointer-events-none"></div>
      )}
      
      <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
        active ? "bg-primary/20 text-primary border border-primary/30" : "bg-black/40 text-white/50 group-hover:text-white border border-white/10"
      }`}>
        <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`} />
      </div>
      
      <span className={`relative z-10 font-bold text-sm tracking-wide transition-colors ${
        active ? "text-primary shadow-primary/50 drop-shadow-md" : "text-white/60 group-hover:text-white"
      }`}>
        {label}
      </span>
    </Link>
  );
}
