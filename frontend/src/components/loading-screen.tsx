"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex items-center justify-center mb-12 z-10 w-40 h-40"
      >
        <div className="absolute inset-0 border-t-2 border-l-2 border-primary rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute inset-2 border-r-2 border-b-2 border-accent rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
        <div className="absolute inset-6 bg-primary/5 rounded-full backdrop-blur-sm flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(110,231,183,0.3)]">
          <h1 className="text-xl font-bold font-jetbrains tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            KGN
          </h1>
        </div>
      </motion.div>

      <div className="h-8 z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground font-mono text-sm tracking-widest uppercase"
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
