"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckSquare,
  AlertTriangle,
  Zap,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AiTicker } from "@/components/dashboard/ai-ticker";
import { UpcomingTimeline } from "@/components/dashboard/upcoming-timeline";
import { UrgentItems } from "@/components/dashboard/urgent-items";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import {
  MOCK_TASKS,
  MOCK_CALENDAR_EVENTS,
  MOCK_INTEGRATIONS,
  MOCK_USER,
} from "@/lib/mock-data";
import { useNow } from "@/hooks/use-now";

function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const now = useNow();

  const pendingTasks = MOCK_TASKS.filter((t) => t.status === "Pending").length;
  const urgentTasks = MOCK_TASKS.filter(
    (t) => t.priority === "Urgent" && t.status !== "Completed"
  ).length;
  const connectedIntegrations = MOCK_INTEGRATIONS.filter(
    (i) => i.status === "CONNECTED"
  ).length;

  // Date-dependent counts — 0 until client hydrates
  const today = now?.toDateString() ?? null;
  const todayEvents = today
    ? MOCK_CALENDAR_EVENTS.filter(
        (e) => new Date(e.startTime).toDateString() === today
      ).length
    : 0;
  const dueTodayTasks = today
    ? MOCK_TASKS.filter((t) => {
        if (!t.dueDate || t.status === "Completed") return false;
        return new Date(t.dueDate).toDateString() === today;
      }).length
    : 0;

  const greeting = now ? getGreeting(now.getHours()) : "Hello";
  const formattedDate = now
    ? now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">
            {greeting}, {MOCK_USER.name?.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {formattedDate}
            {formattedDate && " · "}
            {connectedIntegrations} integrations active
          </p>
        </div>
      </motion.div>

      {/* AI Ticker */}
      <AiTicker />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Due Today"
          value={dueTodayTasks}
          subtitle={`${pendingTasks} total pending`}
          icon={CheckSquare}
          accentColor="violet"
          trend={{ value: 12, label: "from yesterday" }}
          delay={0.05}
        />
        <StatsCard
          title="Today's Events"
          value={todayEvents}
          subtitle="Calendar meetings"
          icon={Calendar}
          accentColor="blue"
          delay={0.1}
        />
        <StatsCard
          title="Urgent Items"
          value={urgentTasks}
          subtitle="Needs immediate attention"
          icon={AlertTriangle}
          accentColor="red"
          trend={{ value: -8, label: "from last week" }}
          delay={0.15}
        />
        <StatsCard
          title="AI Processed"
          value="47"
          subtitle="Messages this week"
          icon={Zap}
          accentColor="emerald"
          trend={{ value: 23, label: "vs last week" }}
          delay={0.2}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="lg:col-span-1"
        >
          <UpcomingTimeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="lg:col-span-1"
        >
          <UrgentItems />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="lg:col-span-1"
        >
          <RecentTasks />
        </motion.div>
      </div>

      {/* Integration status strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="rounded-xl border border-white/8 bg-zinc-900/50 p-5 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-white">Integration Status</h3>
          </div>
          <span className="text-xs text-zinc-500">
            {connectedIntegrations}/{MOCK_INTEGRATIONS.length} connected
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {MOCK_INTEGRATIONS.map((integration) => (
            <div
              key={integration.id}
              className={`flex items-center gap-2.5 rounded-lg border p-3 ${
                integration.status === "CONNECTED"
                  ? "border-emerald-500/20 bg-emerald-500/8"
                  : "border-white/8 bg-white/3"
              }`}
            >
              <span
                className={`size-2 rounded-full shrink-0 ${
                  integration.status === "CONNECTED"
                    ? "bg-emerald-400"
                    : "bg-zinc-600"
                }`}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-white capitalize truncate">
                  {integration.provider}
                </p>
                <p
                  className={`text-[10px] ${
                    integration.status === "CONNECTED"
                      ? "text-emerald-500"
                      : "text-zinc-600"
                  }`}
                >
                  {integration.status === "CONNECTED" ? "Active" : "Not connected"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
