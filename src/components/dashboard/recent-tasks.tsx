"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckSquare, ArrowRight, Mail, MessageCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_TASKS } from "@/lib/mock-data";
import type { TaskStatus, TaskPriority, IntegrationProvider } from "@/types";

const STATUS_STYLES: Record<TaskStatus, string> = {
  Pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "In Progress": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const PRIORITY_STYLES: Record<TaskPriority, "urgent" | "high" | "medium" | "low"> = {
  Urgent: "urgent",
  High: "high",
  Medium: "medium",
  Low: "low",
};

const CHANNEL_ICONS: Record<IntegrationProvider, React.ReactNode> = {
  gmail: <Mail className="size-3 text-red-400" />,
  outlook: <Mail className="size-3 text-blue-400" />,
  whatsapp: <MessageCircle className="size-3 text-emerald-400" />,
  telegram: <Send className="size-3 text-sky-400" />,
};

export function RecentTasks() {
  const recent = MOCK_TASKS.slice(0, 5);

  return (
    <div className="rounded-xl border border-white/8 bg-zinc-900/50 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="size-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Recent Tasks</h3>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs text-zinc-500">
          View all <ArrowRight className="size-3" />
        </Button>
      </div>

      <div className="space-y-2">
        {recent.map((task, i) => {
          const channel = task.sourceChannel as IntegrationProvider | undefined;

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/3 p-3 hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{task.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {channel && CHANNEL_ICONS[channel] && (
                    <>
                      {CHANNEL_ICONS[channel]}
                      <span className="text-xs text-zinc-500 capitalize">{channel}</span>
                      <span className="text-zinc-700">·</span>
                    </>
                  )}
                  <span className="text-xs text-zinc-500">{task.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={PRIORITY_STYLES[task.priority]} className="text-[10px]">
                  {task.priority}
                </Badge>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                    STATUS_STYLES[task.status]
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
