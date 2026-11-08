"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_NOTES } from "@/lib/mock-data";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  score: number;
  category?: string;
}

// Simulate semantic search with mock similarity scores
function mockSemanticSearch(query: string): SearchResult[] {
  if (!query.trim()) return [];
  return MOCK_NOTES.map((note) => ({
    id: note.id,
    title: note.title,
    excerpt: note.content
      .replace(/#+\s/g, "")
      .replace(/\n/g, " ")
      .slice(0, 120)
      .concat("..."),
    score: Math.random() * 0.3 + 0.7, // mock 0.7–1.0 similarity
    category: note.category,
  })).sort((a, b) => b.score - a.score);
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;
    setIsSearching(true);
    setHasSearched(false);
    // Simulate API latency
    await new Promise((r) => setTimeout(r, 800));
    setResults(mockSemanticSearch(query));
    setIsSearching(false);
    setHasSearched(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="size-5 text-violet-400" />
          <h1 className="text-2xl font-bold text-white">Smart Search</h1>
        </div>
        <p className="text-sm text-zinc-500">
          Semantic vector search across all your notes using Bedrock Titan embeddings and cosine similarity.
        </p>
      </motion.div>

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
          <Search className="size-4 text-zinc-500 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search notes semantically... (e.g. 'cloud database architecture')"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
          />
          <Sparkles className="size-3.5 text-violet-500 shrink-0" />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="gap-1.5"
        >
          {isSearching ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          Search
        </Button>
      </motion.div>

      {/* Info pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 rounded-lg border border-violet-500/15 bg-violet-600/6 px-4 py-2.5"
      >
        <Sparkles className="size-3.5 text-violet-400 shrink-0" />
        <p className="text-xs text-zinc-400">
          Powered by{" "}
          <span className="text-violet-400 font-medium">Amazon Bedrock Titan Text Embeddings</span>
          {" "}· 1536-dimensional vectors · Cosine similarity{" "}
          <code className="text-violet-300 bg-violet-500/15 px-1 rounded text-[10px]">
            ORDER BY embedding &lt;=&gt; query_vector
          </code>
        </p>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {isSearching && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-16"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Loader2 className="size-8 text-violet-500 animate-spin" />
                <Sparkles className="absolute inset-0 m-auto size-3 text-violet-400" />
              </div>
              <p className="text-sm text-zinc-500">Generating embeddings & searching...</p>
            </div>
          </motion.div>
        )}

        {hasSearched && !isSearching && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500">
                {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
              </p>
            </div>

            {results.length === 0 ? (
              <div className="rounded-xl border border-white/8 bg-zinc-900/50 py-12 text-center">
                <FileText className="size-8 text-zinc-700 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">No similar notes found</p>
              </div>
            ) : (
              results.map((result, i) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-white/8 bg-zinc-900/50 p-4 hover:border-violet-500/30 hover:bg-zinc-900/80 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-zinc-500 shrink-0" />
                      <h3 className="text-sm font-semibold text-white">{result.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {result.category && (
                        <Badge variant="secondary" className="text-[10px]">{result.category}</Badge>
                      )}
                      <span className="text-xs font-mono text-violet-400">
                        {(result.score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{result.excerpt}</p>
                  {/* Similarity bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600">Similarity</span>
                    <div className="flex-1 h-1 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-violet-500"
                        style={{ width: `${result.score * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {result.score.toFixed(3)}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
