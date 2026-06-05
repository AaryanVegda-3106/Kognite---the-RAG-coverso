"use client";

import { useState } from "react";
import { UploadCloud, FileText, Globe, Video, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState<"pdf" | "website" | "youtube">("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error", message: string } | null>(null);

  const handleUpload = async () => {
    setIsUploading(true);
    setStatus(null);
    try {
      let endpoint = "";
      const formData = new FormData();
      
      if (activeTab === "pdf") {
        if (!file) throw new Error("Please select a file.");
        endpoint = "http://localhost:8000/api/ingest/pdf";
        formData.append("file", file);
      } else if (activeTab === "website") {
        if (!url) throw new Error("Please enter a URL.");
        endpoint = "http://localhost:8000/api/ingest/website";
        formData.append("url", url);
      } else {
        if (!url) throw new Error("Please enter a YouTube URL.");
        endpoint = "http://localhost:8000/api/ingest/youtube";
        formData.append("url", url);
      }

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Upload failed");

      setStatus({ type: "success", message: data.message });
      setFile(null);
      setUrl("");
    } catch (err: unknown) {
      const error = err as Error;
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Add Knowledge</h1>
        <p className="text-muted-foreground mt-1">Upload PDFs, scrape websites, or ingest YouTube videos.</p>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row border-b border-border/50 bg-secondary/20">
          {[
            { id: "pdf", label: "PDF Document", icon: FileText },
            { id: "website", label: "Website URL", icon: Globe },
            { id: "youtube", label: "Video URL", icon: Video },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setStatus(null); }}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? "bg-card text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 border-b-2 border-transparent"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === "pdf" && (
            <div className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group relative">
              <input 
                type="file" 
                accept=".pdf" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                    setStatus(null);
                  }
                }}
              />
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-medium mb-1 text-foreground">{file ? file.name : "Click or drag to upload"}</h3>
              <p className="text-sm text-muted-foreground">PDFs up to 10MB are supported.</p>
            </div>
          )}

          {(activeTab === "website" || activeTab === "youtube") && (
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground">
                {activeTab === "website" ? "Website URL" : "YouTube URL"}
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={activeTab === "website" ? "https://example.com/article" : "https://youtube.com/watch?v=..."}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground transition-all"
              />
            </div>
          )}

          {status && (
            <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 text-sm font-medium ${
              status.type === "success" ? "bg-primary/10 text-primary border border-primary/20" : "bg-destructive/10 text-destructive border border-destructive/20"
            }`}>
              {status.type === "success" && <CheckCircle className="w-5 h-5" />}
              {status.message}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleUpload} 
              disabled={isUploading || (activeTab === "pdf" ? !file : !url)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(110,231,183,0.3)] transition-all px-8 h-12"
            >
              {isUploading ? "Processing..." : "Extract & Ingest"} 
              {!isUploading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
