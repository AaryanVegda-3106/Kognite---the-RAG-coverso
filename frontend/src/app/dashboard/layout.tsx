import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A12] selection:bg-primary/30 text-white font-sans">
      {/* Immersive Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[150px] opacity-50 mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[150px] opacity-50 mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Floating Sidebar Container */}
      <div className="relative z-10 p-4 pr-2 h-full flex flex-col w-[300px]">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden py-4 pr-4">
        <div className="flex-1 flex flex-col bg-[#121626]/60 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Floating Top Header */}
          <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 shrink-0 bg-white/[0.02]">
            <div className="flex items-center gap-4 flex-1">
              {/* Search Bar */}
              <div className="relative group max-w-md w-full hidden md:block">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-duration-500"></div>
                <div className="relative flex items-center bg-black/40 border border-white/10 rounded-full px-5 py-3 transition-colors group-hover:border-primary/30 group-hover:bg-black/60">
                  <Search className="w-5 h-5 text-white/40 mr-4 group-hover:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search intelligence..." 
                    className="bg-transparent border-none outline-none text-sm font-medium text-white placeholder:text-white/30 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="relative w-12 h-12 rounded-full flex items-center justify-center bg-black/40 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all text-white/70 hover:text-white group shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(217,70,239,1)]"></span>
              </button>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="p-1 rounded-full border border-white/10 bg-black/40 hover:border-primary/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 rounded-full" } }} />
              </div>
            </div>
          </header>

          {/* Dynamic Content Frame */}
          <main className="flex-1 overflow-y-auto p-10 relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
