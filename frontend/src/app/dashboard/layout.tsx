import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
          <div className="font-medium text-muted-foreground">Workspace Overview</div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-border mx-2"></div>
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          {children}
        </main>
      </div>
    </div>
  );
}
