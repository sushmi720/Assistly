"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Plus,
  Command,
  X,
  CheckSquare,
  FileText,
  Calendar,
  Zap,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_USER, MOCK_TASKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const COMMAND_ITEMS = [
  { icon: CheckSquare, label: "New Task", shortcut: "T", href: "/dashboard/tasks" },
  { icon: FileText, label: "New Note", shortcut: "N", href: "/dashboard/notes" },
  { icon: Calendar, label: "Check Availability", shortcut: "A", href: "/dashboard/availability" },
  { icon: Search, label: "Semantic Search", shortcut: "S", href: "/dashboard/search" },
];

const urgentTasks = MOCK_TASKS.filter((t) => t.priority === "Urgent" && t.status !== "Completed");

function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  const filtered = COMMAND_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-16 left-1/2 z-50 w-full max-w-lg -translate-x-1/2"
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
          <Search className="size-4 text-zinc-500 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, tasks, notes..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
          />
          <kbd className="hidden sm:flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400 font-mono">
            ESC
          </kbd>
        </div>
        <div className="p-2">
          {filtered.length > 0 ? (
            <>
              <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Actions
              </p>
              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={onClose}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Icon className="size-4 text-zinc-500" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <kbd className="flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                      ⌘ {item.shortcut}
                    </kbd>
                  </button>
                );
              })}
            </>
          ) : (
            <p className="px-3 py-4 text-center text-sm text-zinc-500">
              No results for &quot;{query}&quot;
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function NotificationPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-16 right-4 z-50 w-80"
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
          <h3 className="text-sm font-semibold text-white">Notifications</h3>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px]">{urgentTasks.length} urgent</Badge>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X className="size-4" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
          {urgentTasks.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-zinc-500">
              No urgent notifications
            </p>
          ) : (
            urgentTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                <span className="mt-1 flex size-2 shrink-0 rounded-full bg-red-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{task.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Via {task.sourceChannel} · Urgent
                  </p>
                </div>
              </div>
            ))
          )}
          <div className="flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
            <span className="mt-1 flex size-2 shrink-0 rounded-full bg-violet-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white">AI Pipeline processed 7 messages</p>
              <p className="text-xs text-zinc-500 mt-0.5">Just now · Bedrock</p>
            </div>
          </div>
          <div className="flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
            <span className="mt-1 flex size-2 shrink-0 rounded-full bg-emerald-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white">Gmail integration synced</p>
              <p className="text-xs text-zinc-500 mt-0.5">2 min ago</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 px-4 py-2">
          <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Header() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = MOCK_USER.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() ?? "AJ";

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((p) => !p);
        setNotifOpen(false);
        setProfileOpen(false);
      }
      if (e.key === "Escape") {
        setCommandOpen(false);
        setNotifOpen(false);
        setProfileOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header className="relative flex h-14 items-center gap-4 border-b border-white/8 bg-zinc-950/60 px-4 backdrop-blur-xl shrink-0">
      {/* Command palette trigger */}
      <button
        onClick={() => {
          setCommandOpen((p) => !p);
          setNotifOpen(false);
          setProfileOpen(false);
        }}
        className="flex flex-1 max-w-xs items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-zinc-500 hover:border-white/15 hover:bg-white/6 transition-all"
      >
        <Search className="size-3.5" />
        <span className="flex-1 text-left text-xs">Search or run command...</span>
        <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono">
          <Command className="size-2.5" /> K
        </kbd>
      </button>

      <div className="flex items-center gap-2 ml-auto">
        {/* Quick action */}
        <Button size="sm" className="gap-1.5 h-8 text-xs">
          <Plus className="size-3.5" />
          Quick Add
        </Button>

        {/* Notification bell */}
        <button
          onClick={() => {
            setNotifOpen((p) => !p);
            setCommandOpen(false);
            setProfileOpen(false);
          }}
          className={cn(
            "relative flex size-8 items-center justify-center rounded-lg transition-colors",
            notifOpen ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
          )}
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          {urgentTasks.length > 0 && (
            <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-red-500">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            </span>
          )}
        </button>

        <Separator orientation="vertical" className="h-5" />

        {/* Profile */}
        <button
          onClick={() => {
            setProfileOpen((p) => !p);
            setCommandOpen(false);
            setNotifOpen(false);
          }}
          className="flex items-center gap-2 rounded-lg p-1 hover:bg-white/5 transition-colors"
        >
          <Avatar className="size-7">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-xs text-zinc-300 max-w-[120px] truncate">
            {MOCK_USER.name}
          </span>
        </button>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {commandOpen && <CommandPalette onClose={() => setCommandOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-16 right-4 z-50 w-56"
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur-xl">
              <div className="px-4 py-3 border-b border-white/8">
                <p className="text-sm font-semibold text-white">{MOCK_USER.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{MOCK_USER.email}</p>
              </div>
              <div className="p-1.5">
                {[
                  { icon: User, label: "Profile" },
                  { icon: Settings, label: "Settings" },
                  { icon: Zap, label: "Integrations" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setProfileOpen(false)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </button>
                  );
                })}
                <Separator className="my-1" />
                <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside overlay */}
      {(commandOpen || notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setCommandOpen(false);
            setNotifOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </header>
  );
}
