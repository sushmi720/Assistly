"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Mail, MessageCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_TASKS } from "@/lib/mock-data";
import { useNow } from "@/hooks/use-now";
import type { TaskPriority, IntegrationProvider } from "@/types";

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  Urgent: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

const CHANNEL_ICONS: Record<IntegrationProvider, React.ReactNode> = {
  gmail: <Mail className="size-3 text-red-400" />,
  outlook: <Mail className="size-3 text-blue-400" />,
  whatsapp: <MessageCircle className="size-3 text-emerald-400" />,
  telegram: <Send className="size-3 text-sky-400" />,
};

function formatDueDate(
  iso: string | undefined,
  now: Date
): { label: string; color: string } | null {
  if (!iso) return null;
  const d = new Date(iso);
  const diff = d.getTime() - now.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 0) return { label: "Overdue", color: "text-red-400" };
  if (hours < 1) return { label: "Due in < 1h", color: "text-red-400" };
  if (hours < 24) return { label: `Due in ${hours}h`, color: "text-amber-400" };
  const days = Math.floor(hours / 24);
  return { label: `Due in ${days}d`, color: "text-zinc-400" };
}

export function UrgentItems() {
  const now = useNow();

  const urgentAndHigh = MOCK_TASKS.filter(
    (t) =>
      (t.priority === "Urgent" || t.priority === "High") &&
      t.status !== "Completed"
  ).sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

  return (
    <div className="rounded-xl border border-red-500/15 bg-zinc-900/50 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-red-400" />
          <h3 className="text-sm font-semibold text-white">Urgent Items</h3>
        </div>
        <Badge variant="destructive" className="text-[10px]">
          {urgentAndHigh.length} items
        </Badge>
      </div>

      {urgentAndHigh.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-zinc-500">All clear! No urgent items.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {urgentAndHigh.map((task, i) => {
            const due = now ? formatDueDate(task.dueDate, now) : null;
            const channel = task.sourceChannel as IntegrationProvider | undefined;

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/3 p-3 hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div
                  className={`size-2 shrink-0 rounded-full ${
                    task.priority === "Urgent" ? "bg-red-400" : "bg-orange-400"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{task.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {channel && CHANNEL_ICONS[channel] && (
                      <>
                        {CHANNEL_ICONS[channel]}
                        <span className="text-xs text-zinc-500 capitalize">
                          {channel}
                        </span>
                        <span className="text-zinc-700">·</span>
                      </>
                    )}
                    <span className="text-xs text-zinc-500">{task.category}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge
                    variant={task.priority === "Urgent" ? "urgent" : "high"}
                    className="text-[10px]"
                  >
                    {task.priority}
                  </Badge>
                  {due && (
                    <span className={`text-[10px] ${due.color}`}>{due.label}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
