"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_NOTES } from "@/lib/mock-data";

export default function NotesPage() {
  const [selected, setSelected] = useState(MOCK_NOTES[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_NOTES.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full max-h-[calc(100vh-56px)]">
      {/* Notes list panel */}
      <div className="w-72 shrink-0 border-r border-white/8 flex flex-col bg-zinc-950/50">
        <div className="p-4 border-b border-white/8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-violet-400" />
              <h2 className="text-sm font-semibold text-white">Notes</h2>
            </div>
            <Button size="icon" variant="ghost" className="size-7">
              <Plus className="size-3.5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5">
            <Search className="size-3.5 text-zinc-500 shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="flex-1 bg-transparent text-xs text-white placeholder:text-zinc-500 outline-none"
            />
            {searchQuery && (
              <Sparkles className="size-3.5 text-violet-400 shrink-0" />
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelected(note)}
              className={`w-full text-left rounded-lg p-3 transition-all ${
                selected?.id === note.id
                  ? "bg-violet-600/15 border border-violet-500/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <p className="text-sm font-medium text-white truncate">{note.title}</p>
              <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">
                {note.content.replace(/#+\s/g, "").slice(0, 80)}...
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                {note.category && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {note.category}
                  </Badge>
                )}
                <span className="text-[10px] text-zinc-600">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Note editor panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selected ? (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <div>
                <h1 className="text-lg font-semibold text-white">{selected.title}</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Last edited{" "}
                  {new Date(selected.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Sparkles className="size-3.5 text-violet-400" /> Semantic Search
                </Button>
                <Button size="sm" className="text-xs">Save</Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-300 leading-relaxed">
                  {selected.content}
                </pre>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <FileText className="size-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">Select a note to view or edit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
