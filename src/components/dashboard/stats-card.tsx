"use client";

import React from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  accentColor?: "violet" | "emerald" | "amber" | "red" | "blue";
  delay?: number;
}

const ACCENT_STYLES = {
  violet: {
    icon: "bg-violet-600/20 text-violet-400",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/10",
    trend: "text-violet-400",
  },
  emerald: {
    icon: "bg-emerald-600/20 text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/10",
    trend: "text-emerald-400",
  },
  amber: {
    icon: "bg-amber-600/20 text-amber-400",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/10",
    trend: "text-amber-400",
  },
  red: {
    icon: "bg-red-600/20 text-red-400",
    border: "border-red-500/20",
    glow: "shadow-red-500/10",
    trend: "text-red-400",
  },
  blue: {
    icon: "bg-blue-600/20 text-blue-400",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/10",
    trend: "text-blue-400",
  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = "violet",
  delay = 0,
}: StatsCardProps) {
  const styles = ACCENT_STYLES[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-zinc-900/50 p-5 backdrop-blur-sm shadow-lg",
        styles.border,
        styles.glow
      )}
    >
      {/* Subtle gradient bg */}
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-gradient-to-br from-white/4 to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-white tabular-nums">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-zinc-500 truncate">{subtitle}</p>
          )}
          {trend && (
            <p className={cn("mt-2 text-xs font-medium", styles.trend)}>
              {trend.value > 0 ? "↑" : "↓"} {Math.abs(trend.value)}%{" "}
              <span className="text-zinc-500">{trend.label}</span>
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            styles.icon
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </motion.div>
  );
}
