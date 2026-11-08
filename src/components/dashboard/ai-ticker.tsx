"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AI_TICKER_MESSAGES } from "@/lib/mock-data";

export function AiTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % AI_TICKER_MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-600/8 px-4 py-3">
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-violet-500" />
        </span>
        <Sparkles className="size-3.5 text-violet-400" />
        <span className="text-xs font-semibold text-violet-400 whitespace-nowrap">
          AI Live Feed
        </span>
      </div>
      <div className="h-5 flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center text-xs text-zinc-300 truncate"
          >
            {AI_TICKER_MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
