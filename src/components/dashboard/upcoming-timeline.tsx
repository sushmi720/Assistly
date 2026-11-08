"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_CALENDAR_EVENTS } from "@/lib/mock-data";
import { useNow } from "@/hooks/use-now";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDuration(start: string, end: string) {
  const mins = (new Date(end).getTime() - new Date(start).getTime()) / 60000;
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function UpcomingTimeline() {
  const now = useNow();

  // While hydrating (now is null), show a skeleton
  if (!now) {
    return (
      <div className="rounded-xl border border-white/8 bg-zinc-900/50 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="size-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Today&apos;s Schedule</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-lg bg-white/4 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const today = now.toDateString();
  const todayEvents = MOCK_CALENDAR_EVENTS.filter(
    (e) => new Date(e.startTime).toDateString() === today
  ).sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className="rounded-xl border border-white/8 bg-zinc-900/50 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Today&apos;s Schedule</h3>
        </div>
        <Badge variant="secondary" className="text-[10px]">
          {todayEvents.length} events
        </Badge>
      </div>

      {todayEvents.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-zinc-500">No events today</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-white/10 to-transparent" />

          <div className="space-y-4">
            {todayEvents.map((event, i) => {
              const start = new Date(event.startTime);
              const end = new Date(event.endTime);
              const isActive = now >= start && now <= end;
              const isPast = now > end;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`relative z-10 mt-1 flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 ${
                      isActive
                        ? "border-violet-500 bg-violet-600"
                        : isPast
                        ? "border-zinc-700 bg-zinc-800"
                        : "border-zinc-600 bg-zinc-900"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
                    )}
                    <Clock className="size-2.5 text-zinc-400" />
                  </div>

                  <div
                    className={`flex-1 min-w-0 rounded-lg border p-3 ${
                      isActive
                        ? "border-violet-500/30 bg-violet-600/10"
                        : isPast
                        ? "border-white/5 bg-white/3 opacity-60"
                        : "border-white/8 bg-white/4"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm font-medium truncate ${
                          isActive
                            ? "text-violet-300"
                            : isPast
                            ? "text-zinc-500"
                            : "text-white"
                        }`}
                      >
                        {event.title}
                      </p>
                      {event.isExternal && (
                        <ExternalLink className="size-3 text-zinc-600 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-zinc-500">
                        {formatTime(event.startTime)} – {formatTime(event.endTime)}
                      </span>
                      <span className="text-zinc-700">·</span>
                      <span className="text-xs text-zinc-600">
                        {formatDuration(event.startTime, event.endTime)}
                      </span>
                      {isActive && (
                        <Badge
                          variant="default"
                          className="text-[10px] px-1.5 py-0 ml-auto"
                        >
                          Now
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
