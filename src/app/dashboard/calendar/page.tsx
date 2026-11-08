"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_CALENDAR_EVENTS } from "@/lib/mock-data";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  // null until mounted on client — avoids prerender date mismatch
  const [today, setToday] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Show skeleton grid while hydrating
  if (!today || !viewDate) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <div className="h-8 w-48 rounded-lg bg-white/4 animate-pulse" />
        <div className="rounded-xl border border-white/8 bg-zinc-900/50 h-96 animate-pulse" />
      </div>
    );
  }

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }
  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }
  function goToday() {
    const now = new Date();
    setToday(now);
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  }

  function getEventsForDay(day: number) {
    return MOCK_CALENDAR_EVENTS.filter((e) => {
      const d = new Date(e.startTime);
      return (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day
      );
    });
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">Calendar</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prevMonth}
              className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-sm font-medium text-white w-36 text-center">
              {monthName}
            </span>
            <button
              onClick={nextMonth}
              className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
            <Button size="sm" className="text-xs" onClick={goToday}>
              Today
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-white/8 bg-zinc-900/50 overflow-hidden"
      >
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-white/8">
          {DAYS.map((d) => (
            <div
              key={d}
              className="py-3 text-center text-xs font-medium uppercase tracking-wider text-zinc-500"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {/* Empty cells for first week offset */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-24 border-b border-r border-white/5 bg-white/1"
            />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday =
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day;
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={day}
                className={`min-h-24 border-b border-r border-white/5 p-2 transition-colors hover:bg-white/2 ${
                  isToday ? "bg-violet-600/8" : ""
                }`}
              >
                <div className="mb-1">
                  <span
                    className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                      isToday
                        ? "bg-violet-600 text-white"
                        : "text-zinc-400"
                    }`}
                  >
                    {day}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] truncate ${
                        event.isExternal
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-violet-500/20 text-violet-300"
                      }`}
                    >
                      {event.isExternal && (
                        <ExternalLink className="size-2 shrink-0" />
                      )}
                      <span className="truncate">{event.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <p className="text-[10px] text-zinc-600 pl-1">
                      +{dayEvents.length - 2} more
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Upcoming events list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-white/8 bg-zinc-900/50 p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-3">Upcoming Events</h3>
        <div className="space-y-2">
          {MOCK_CALENDAR_EVENTS.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 rounded-lg border border-white/5 p-3 hover:bg-white/3 transition-colors"
            >
              <div
                className={`size-2 rounded-full shrink-0 ${
                  event.isExternal ? "bg-blue-400" : "bg-violet-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{event.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {new Date(event.startTime).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {event.isExternal && (
                <Badge variant="secondary" className="text-[10px]">
                  External
                </Badge>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
