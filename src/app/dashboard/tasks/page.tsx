"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckSquare,
  Plus,
  Filter,
  LayoutGrid,
  Table2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_TASKS } from "@/lib/mock-data";
import type { TaskStatus, TaskPriority, IntegrationProvider } from "@/types";
import { cn } from "@/lib/utils";

const COLUMNS: TaskStatus[] = ["Pending", "In Progress", "Completed"];

const STATUS_COLORS: Record<TaskStatus, string> = {
  Pending: "border-amber-500/30 bg-amber-500/8",
  "In Progress": "border-blue-500/30 bg-blue-500/8",
  Completed: "border-emerald-500/30 bg-emerald-500/8",
};

const STATUS_HEADER: Record<TaskStatus, string> = {
  Pending: "text-amber-400",
  "In Progress": "text-blue-400",
  Completed: "text-emerald-400",
};

const PRIORITY_VARIANT: Record<TaskPriority, "urgent" | "high" | "medium" | "low"> = {
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

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function TasksPage() {
  const [view, setView] = useState<"kanban" | "table">("kanban");

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="size-5 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">Tasks</h1>
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            {MOCK_TASKS.filter((t) => t.status !== "Completed").length} active ·{" "}
            {MOCK_TASKS.filter((t) => t.status === "Completed").length} completed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="size-3.5" /> Filter
          </Button>
          {/* View toggle */}
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-1 gap-1">
            <button
              onClick={() => setView("kanban")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                view === "kanban"
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <LayoutGrid className="size-3" /> Kanban
            </button>
            <button
              onClick={() => setView("table")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                view === "table"
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Table2 className="size-3" /> Table
            </button>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" /> New Task
          </Button>
        </div>
      </motion.div>

      {view === "kanban" ? (
        /* Kanban View */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {COLUMNS.map((status, colIdx) => {
            const colTasks = MOCK_TASKS.filter((t) => t.status === status);
            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: colIdx * 0.1 }}
                className={cn(
                  "rounded-xl border p-4 min-h-64",
                  STATUS_COLORS[status]
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={cn("text-sm font-semibold", STATUS_HEADER[status])}>
                    {status}
                  </h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {colTasks.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {colTasks.map((task, i) => {
                    const channel = task.sourceChannel as IntegrationProvider | undefined;
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: colIdx * 0.1 + i * 0.05 }}
                        className="group rounded-lg border border-white/8 bg-zinc-900/60 p-3 hover:border-white/15 hover:bg-zinc-900/80 transition-all cursor-pointer"
                      >
                        <p className="text-sm text-white font-medium mb-1.5">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {channel && CHANNEL_ICONS[channel]}
                            <span className="text-[10px] text-zinc-500">{task.category}</span>
                          </div>
                          <Badge
                            variant={PRIORITY_VARIANT[task.priority]}
                            className="text-[10px]"
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        {task.dueDate && (
                          <p className="mt-1.5 text-[10px] text-zinc-600">
                            Due {formatDate(task.dueDate)}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                  <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-3 text-xs text-zinc-600 hover:border-white/20 hover:text-zinc-400 transition-all">
                    <Plus className="size-3" /> Add task
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-white/8 bg-zinc-900/50 overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {["Title", "Category", "Priority", "Status", "Source", "Due Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_TASKS.map((task) => {
                const channel = task.sourceChannel as IntegrationProvider | undefined;
                return (
                  <tr
                    key={task.id}
                    className="hover:bg-white/3 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-white font-medium max-w-xs truncate">
                      {task.title}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">{task.category}</td>
                    <td className="px-4 py-3">
                      <Badge variant={PRIORITY_VARIANT[task.priority]} className="text-[10px]">
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border",
                          task.status === "Pending"
                            ? "border-amber-500/30 bg-amber-500/20 text-amber-300"
                            : task.status === "In Progress"
                            ? "border-blue-500/30 bg-blue-500/20 text-blue-300"
                            : "border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
                        )}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {channel && (
                        <div className="flex items-center gap-1.5">
                          {CHANNEL_ICONS[channel]}
                          <span className="text-xs text-zinc-500 capitalize">{channel}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">
                      {formatDate(task.dueDate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
