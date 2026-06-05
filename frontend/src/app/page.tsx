"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Globe, Video, ArrowRight, BrainCircuit, Sparkles, MessageSquare, BookOpen } from "lucide-react";
import { LoadingScreen } from "@/components/loading-screen";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  // For presentation, show loading screen for a short time
  // In a real app this might only run on first visit or during heavy init
  useEffect(() => {
    // If we want it to run every time
    // But maybe let's just use the state directly.
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <header className="container mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold font-jetbrains tracking-tight">Kognite</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#demo" className="hover:text-primary transition-colors">Demo</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex">Sign In</Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(110,231,183,0.4)]">
            Get Started
          </Button>
        </div>
      </header>

      <main className="relative z-10 pt-24 pb-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-primary mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Kognite 1.0 is now live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl leading-tight mb-6"
          >
            Turn Any Source Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Searchable Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Upload PDFs, Websites, and YouTube videos. Ask questions and get grounded answers with exact citations in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button size="lg" className="h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(110,231,183,0.3)] transition-all hover:scale-105">
              Start Exploring <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border hover:bg-secondary">
              Watch Demo
            </Button>
          </motion.div>
        </section>

        {/* Animated Pipeline Pipeline */}
        <section className="container mx-auto px-6 mt-32">
          <div className="relative w-full max-w-4xl mx-auto h-[300px] flex items-center justify-between">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0"></div>
            
            <div className="flex flex-col gap-6 z-10">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
                <FileText className="text-muted-foreground" />
              </motion.div>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
                <Globe className="text-muted-foreground" />
              </motion.div>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
                <Youtube className="text-muted-foreground" />
              </motion.div>
            </div>

            <div className="z-10 flex flex-col items-center relative">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 border border-primary/30 rounded-full border-dashed"
              ></motion.div>
              <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(110,231,183,0.2)]">
                <Video className="w-12 h-12 mb-4 text-primary" />
              </div>
              <div className="mt-4 font-jetbrains text-sm text-primary font-medium tracking-widest">KOGNITE ENGINE</div>
            </div>

            <div className="flex flex-col gap-6 z-10">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-48 h-20 rounded-xl bg-card border border-border flex items-center gap-3 px-4 shadow-lg">
                <MessageSquare className="text-primary w-5 h-5 shrink-0" />
                <div className="text-xs text-left">
                  <div className="font-semibold mb-1 text-foreground">Exact Answers</div>
                  <div className="text-muted-foreground truncate w-full">Grounded in your data</div>
                </div>
              </motion.div>
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="w-48 h-20 rounded-xl bg-card border border-border flex items-center gap-3 px-4 shadow-lg">
                <BookOpen className="text-accent w-5 h-5 shrink-0" />
                <div className="text-xs text-left">
                  <div className="font-semibold mb-1 text-foreground">Smart Citations</div>
                  <div className="text-muted-foreground truncate w-full">Page numbers & timestamps</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-6 mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Unleash Your Data</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to turn raw information into actionable knowledge.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, title: "Chat with Documents", desc: "Interact with your PDFs naturally. Ask complex questions and get summaries." },
              { icon: BrainCircuit, title: "Multi-Source Intelligence", desc: "Query across documents, websites, and videos simultaneously." },
              { icon: Video, title: "YouTube Videos", desc: "Paste any video URL for instant transcript extraction." },
              { icon: Sparkles, title: "AI Study Assistant", desc: "Create flashcards, quizzes, and FAQs from your sources instantly." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-[0_0_20px_rgba(110,231,183,0.1)] transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
