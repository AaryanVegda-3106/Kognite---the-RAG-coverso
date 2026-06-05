import { Settings as SettingsIcon, Key, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and API keys.</p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="flex border-b border-border/50 bg-secondary/20 overflow-x-auto">
          <div className="px-6 py-4 border-b-2 border-primary text-primary font-medium text-sm flex items-center gap-2 whitespace-nowrap bg-card">
            <SettingsIcon className="w-4 h-4" /> General
          </div>
          <div className="px-6 py-4 text-muted-foreground font-medium text-sm flex items-center gap-2 hover:text-foreground cursor-pointer transition-colors whitespace-nowrap">
            <Key className="w-4 h-4" /> API Keys
          </div>
          <div className="px-6 py-4 text-muted-foreground font-medium text-sm flex items-center gap-2 hover:text-foreground cursor-pointer transition-colors whitespace-nowrap">
            <Shield className="w-4 h-4" /> Security
          </div>
          <div className="px-6 py-4 text-muted-foreground font-medium text-sm flex items-center gap-2 hover:text-foreground cursor-pointer transition-colors whitespace-nowrap">
            <Bell className="w-4 h-4" /> Notifications
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Workspace Name</h3>
            <input type="text" defaultValue="My Personal Workspace" className="w-full max-w-md bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-sm transition-colors" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default Embedding Model</h3>
            <select className="w-full max-w-md bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-sm appearance-none transition-colors">
              <option>BAAI/bge-m3 (HuggingFace API)</option>
              <option>text-embedding-3-small (OpenAI)</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default Generation Model</h3>
            <select className="w-full max-w-md bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-sm appearance-none transition-colors">
              <option>gemini-1.5-flash (Google)</option>
              <option>gemini-1.5-pro (Google)</option>
              <option>gpt-4o-mini (OpenAI)</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end border-t border-border/50 mt-8 pt-8">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(110,231,183,0.3)] px-8">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
