"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { KogniteLogo } from "@/components/logo";

const messages = [
  "Initializing Intelligence...",
  "Parsing Sources...",
  "Building Knowledge Graph...",
  "Creating Embeddings...",
  "Ready"
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (msgIndex < messages.length - 1) {
      const timer = setTimeout(() => setMsgIndex(msgIndex + 1), 800);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(onComplete, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [msgIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A12] text-white overflow-hidden">
      {/* Immersive Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-primary/20 blur-[150px] opacity-50 mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-[100px] opacity-50 mix-blend-screen animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center justify-center mb-12 z-10"
      >
        <div className="relative mb-12 flex items-center justify-center">
          {/* Orbital Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-[200px] h-[200px] rounded-full border border-primary/20 border-t-primary/80 border-r-transparent"
          ></motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-[240px] h-[240px] rounded-full border border-accent/20 border-b-accent/80 border-l-transparent"
          ></motion.div>
          
          {/* Pulsing Core Aura */}
          <div className="absolute w-[120px] h-[120px] rounded-full bg-primary/30 blur-2xl animate-pulse" style={{ animationDuration: '2s' }}></div>
          
          {/* Core Logo */}
          <div className="relative z-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full p-6 border border-white/10 shadow-[0_0_50px_rgba(217,70,239,0.3)]">
            <KogniteLogo showText={false} className="scale-150" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-[0.3em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-4" style={{ fontFamily: "system-ui, sans-serif" }}>
          KOGNIT<span className="text-[#DCC7A1]">E</span>
        </h1>
      </motion.div>

      <div className="h-10 z-10 flex items-center justify-center mb-12">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="text-white/60 font-mono text-sm tracking-[0.3em] uppercase font-bold"
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Futuristic Progress Bar */}
      <div className="absolute bottom-24 w-64 h-[2px] bg-white/10 overflow-hidden z-10 rounded-full">
         <motion.div 
           className="h-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_15px_rgba(217,70,239,0.8)]"
           initial={{ width: "0%", x: "-100%" }}
           animate={{ width: "100%", x: "0%" }}
           transition={{ duration: (messages.length * 0.8), ease: "easeInOut" }}
         />
      </div>
    </div>
  );
}
