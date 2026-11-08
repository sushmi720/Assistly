"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, XCircle, AlertCircle, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_AVAILABILITY } from "@/lib/mock-data";
import type { AvailabilityStatus } from "@/types";

const STATUS_CONFIG: Record<
  AvailabilityStatus,
  { icon: React.ReactNode; color: string; badge: "success" | "warning" | "destructive" }
> = {
  "Fully Free": {
    icon: <CheckCircle2 className="size-5 text-emerald-400" />,
    color: "border-emerald-500/20 bg-emerald-500/8 text-emerald-400",
    badge: "success",
  },
  "Partially Free": {
    icon: <AlertCircle className="size-5 text-amber-400" />,
    color: "border-amber-500/20 bg-amber-500/8 text-amber-400",
    badge: "warning",
  },
  "Fully Busy": {
    icon: <XCircle className="size-5 text-red-400" />,
    color: "border-red-500/20 bg-red-500/8 text-red-400",
    badge: "destructive",
  },
};

export default function AvailabilityPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const availability = MOCK_AVAILABILITY;

  // Set today's date on the client only to avoid prerender mismatch
  React.useEffect(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  }, []);
  const config = STATUS_CONFIG[availability.status];

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Clock className="size-5 text-violet-400" />
          <h1 className="text-2xl font-bold text-white">Smart Availability</h1>
        </div>
        <p className="text-sm text-zinc-500">
          View your free and busy windows calculated from calendar events and tasks.
        </p>
      </motion.div>

      {/* Date selector */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3"
      >
        <label className="text-sm text-zinc-400 shrink-0">Target Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
        <Button size="sm" className="text-xs">Check Availability</Button>
      </motion.div>

      {/* Status card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className={`flex items-center gap-4 rounded-xl border p-5 ${config.color}`}
      >
        {config.icon}
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-0.5">Status</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-white">{availability.status}</p>
            <Badge variant={config.badge}>{availability.date}</Badge>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Working hours: 08:00 – 18:00</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Busy slots */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-red-500/15 bg-zinc-900/50 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="size-4 text-red-400" />
            <h3 className="text-sm font-semibold text-white">Busy Slots</h3>
            <Badge variant="destructive" className="ml-auto text-[10px]">
              {availability.busySlots.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {availability.busySlots.map((slot, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-red-500/15 bg-red-500/5 px-3 py-2"
              >
                <span className="text-xs font-mono text-zinc-300">
                  {slot.start} – {slot.end}
                </span>
                {slot.label && (
                  <span className="text-xs text-zinc-500 truncate ml-2">{slot.label}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Free slots */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-emerald-500/15 bg-zinc-900/50 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Free Windows</h3>
            <Badge variant="success" className="ml-auto text-[10px]">
              {availability.freeSlots.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {availability.freeSlots.map((slot, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-emerald-500/15 bg-emerald-500/5 px-3 py-2"
              >
                <span className="text-xs font-mono text-zinc-300">
                  {slot.start} – {slot.end}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] text-emerald-400 hover:text-emerald-300 gap-1 px-2"
                >
                  <CalendarPlus className="size-3" /> Book
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
