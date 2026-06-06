"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Sparkles, Database, Layers, ShieldCheck, Box } from "lucide-react";
import Link from "next/link";
import { KogniteLogo } from "@/components/logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A12] text-white selection:bg-primary/30 relative overflow-hidden font-inter">
      
      {/* Background World Map / Dotted Grid (Vento Style) */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 30%, black 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 30%, black 10%, transparent 100%)'
        }}
      ></div>

      {/* Deep Purple/Magenta Glow (Finfoco Style) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-secondary/40 via-primary/10 to-transparent blur-[120px] rounded-[100%] pointer-events-none opacity-60"></div>

      {/* Floating Glass Header (WhatsMonk Style) */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center">
            <KogniteLogo className="scale-75 origin-left" />
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#purpose" className="hover:text-white transition-colors">Purpose</a>
          </nav>

          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-accent to-primary text-white font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all px-6 py-2 rounded-full text-sm">
              Launch App
            </button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 pt-48 pb-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 mb-8 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(217,70,239,0.8)]"></div>
            <span>Ingest & Retrieve Across Knowledge Bases, Instantly.</span>
          </motion.div>

          {/* Mixed Typography Headline (WhatsMonk & Vento Style) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight max-w-5xl leading-[1.05] mb-8"
          >
            Kognite: The RAG Protocol <br className="hidden md:block" />
            Bridging the Worlds of <br className="hidden md:block" />
            <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">Structured Data</span> and <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Language Models</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mb-12 font-light leading-relaxed"
          >
            A secure cross-document intelligence protocol enabling seamless querying and synthesis of digital assets across multiple knowledge spaces—without manual extraction.
          </motion.p>

          {/* High Contrast Buttons (Vento Style) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/dashboard">
              <button className="h-12 px-8 text-sm rounded-full bg-gradient-to-r from-secondary via-primary to-accent text-white shadow-[0_0_30px_rgba(217,70,239,0.4)] transition-all hover:scale-105 font-bold">
                Launch App
              </button>
            </Link>
            <button className="h-12 px-8 text-sm rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all font-medium text-white/80">
              View Documentation
            </button>
          </motion.div>
        </section>

        {/* Asymmetric Split Section (Vento Style "One Liquidity Layer") */}
        <section className="container mx-auto px-6 mt-48 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side: Big Typography */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
                One Intelligence Layer.<br />
                Every Source.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed font-light mb-8 max-w-md">
                Supply documents to your preferred workspace and start generating insights instantly through secure, automated retrieval protocols. Enjoy seamless cross-document access, optimized context windows, real-time citations, and full control of your intelligence—no intermediaries, just transparent, efficient knowledge synthesis working for you.
              </p>
              
              <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-accent/50 via-primary/20 to-transparent"></div>
              <p className="mt-8 text-sm text-white/40 max-w-md leading-relaxed">
                Our protocol intelligently routes queries across multiple documents using secure, trust-minimized semantic communication. It ensures seamless knowledge transfers and consistent execution.
              </p>
            </motion.div>

            {/* Right side: Wireframe Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none"></div>
              
              {/* Isometric / Wireframe Hexagon Structure */}
              <div className="relative w-[400px] h-[400px] perspective-[1000px]">
                <div className="absolute inset-0 transform-gpu rotate-x-[60deg] rotate-z-[-45deg] flex items-center justify-center">
                  
                  {/* Central Node */}
                  <div className="w-32 h-32 border border-accent/80 shadow-[0_0_40px_rgba(217,70,239,0.4)] absolute flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[pulse_4s_ease-in-out_infinite]">
                    <div className="w-16 h-16 border border-accent/50 absolute rotate-45"></div>
                    <Database className="w-8 h-8 text-accent transform-gpu rotate-z-[45deg] rotate-x-[-60deg]" />
                  </div>

                  {/* Satellite Nodes */}
                  {[
                    { translate: 'translate-x-48 translate-y-48', delay: '0s' },
                    { translate: '-translate-x-48 -translate-y-48', delay: '1s' },
                    { translate: 'translate-x-48 -translate-y-48', delay: '2s' },
                    { translate: '-translate-x-48 translate-y-48', delay: '3s' },
                  ].map((node, i) => (
                    <div key={i} className={`absolute w-16 h-16 border border-primary/50 shadow-[0_0_20px_rgba(217,70,239,0.1)] flex items-center justify-center ${node.translate} bg-black/60 backdrop-blur-md`}>
                      <div className="w-8 h-8 border border-primary/30 absolute rotate-45"></div>
                      <Box className="w-4 h-4 text-primary transform-gpu rotate-z-[45deg] rotate-x-[-60deg]" />
                    </div>
                  ))}

                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none text-accent/30" stroke="currentColor" strokeWidth="1" fill="none">
                    <line x1="200" y1="200" x2="392" y2="392" />
                    <line x1="200" y1="200" x2="8" y2="8" />
                    <line x1="200" y1="200" x2="392" y2="8" />
                    <line x1="200" y1="200" x2="8" y2="392" />
                    
                    {/* Outline hexagon */}
                    <polygon points="200,0 400,200 200,400 0,200" className="stroke-primary/20" />
                  </svg>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* How it Works / Purpose Section */}
        <section id="how-it-works" className="container mx-auto px-6 mt-40 max-w-6xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How Kognite Works</h2>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-8 max-w-4xl mx-auto">
              Kognite transforms static documents and multimedia into dynamic, queryable knowledge. 
              By ingesting PDFs, websites, and YouTube videos, the Kognite Engine processes, embeds, 
              and indexes the information into a high-dimensional vector space. When you ask a question, 
              our Retrieval-Augmented Generation (RAG) pipeline semantically matches your query against 
              these vectors, synthesizing precise, cited answers instantly.
            </p>
          </motion.div>

          {/* Animated Workflow Diagram */}
          <div className="relative max-w-5xl mx-auto my-20 py-16 px-6 rounded-[2rem] border border-white/5 bg-[#121626]/40 backdrop-blur-md overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-primary/5 to-accent/10 opacity-50 blur-2xl pointer-events-none"></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 z-10">
              
              {/* Step 1: Ingestion */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center flex-1 relative"
              >
                <div className="w-24 h-24 rounded-full bg-[#1A2235] border border-white/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(217,70,239,0.1)] group">
                  <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-primary/50 transition-colors animate-[spin_6s_linear_infinite]"></div>
                  <Layers className="w-10 h-10 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <h4 className="mt-8 font-bold text-xl tracking-tight">1. Ingest Data</h4>
                <p className="text-sm text-white/50 text-center mt-3 max-w-[220px] leading-relaxed">Connect knowledge bases, upload PDFs, or scrape websites.</p>
              </motion.div>

              {/* Connecting Line 1 */}
              <div className="hidden md:block flex-[1.5] h-[2px] bg-white/5 relative mx-4">
                <motion.div 
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                ></motion.div>
                {/* Moving dot */}
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(217,70,239,0.8)]"
                  style={{ left: 0 }}
                ></motion.div>
              </div>

              {/* Step 2: Embedding */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center flex-1 relative"
              >
                <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-secondary/20 to-primary/10 border border-primary/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(217,70,239,0.2)]">
                  <Database className="w-12 h-12 text-primary" />
                </div>
                <h4 className="mt-8 font-bold text-xl tracking-tight text-primary">2. Vectorize</h4>
                <p className="text-sm text-white/50 text-center mt-3 max-w-[220px] leading-relaxed">Data is chunked and embedded into high-dimensional vectors.</p>
              </motion.div>

              {/* Connecting Line 2 */}
              <div className="hidden md:block flex-[1.5] h-[2px] bg-white/5 relative mx-4">
                <motion.div 
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                ></motion.div>
                {/* Moving dot */}
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_rgba(232,121,249,0.8)]"
                  style={{ left: 0 }}
                ></motion.div>
              </div>

              {/* Step 3: Synthesis */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center flex-1 relative"
              >
                <div className="w-24 h-24 rounded-full bg-[#1A2235] border border-white/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(232,121,249,0.1)] group">
                  <div className="absolute inset-0 rounded-full border border-accent/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <BrainCircuit className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="mt-8 font-bold text-xl tracking-tight text-accent">3. Synthesize</h4>
                <p className="text-sm text-white/50 text-center mt-3 max-w-[220px] leading-relaxed">LLMs retrieve semantic matches and generate precise answers.</p>
              </motion.div>

            </div>
          </div>
          
          <div id="purpose" className="grid md:grid-cols-3 gap-8 text-left mt-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-[#141525]/80 border border-primary/20 p-10 rounded-[2rem] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] transition-all group"
            >
              <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Centralized Knowledge</h3>
              <p className="text-white/60 font-light leading-relaxed">
                The core purpose of Kognite is to break down information silos. Instead of hunting through endless files and folders, you can upload everything into isolated &quot;Knowledge Spaces&quot; and query them universally.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#141525]/80 border border-primary/20 p-10 rounded-[2rem] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] transition-all group"
            >
              <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Synthesis</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Kognite doesn&apos;t just search; it understands. It uses advanced Large Language Models to synthesize complex information across multiple documents, giving you complete, context-aware answers.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-[#141525]/80 border border-primary/20 p-10 rounded-[2rem] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] transition-all group"
            >
              <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Verifiable Truth</h3>
              <p className="text-white/60 font-light leading-relaxed">
                In an era of AI hallucinations, Kognite grounds every response in your actual uploaded data. It provides transparent citations, so you always know exactly where the intelligence came from.
              </p>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
