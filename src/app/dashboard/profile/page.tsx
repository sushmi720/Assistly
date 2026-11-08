"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Globe, Shield, Zap } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_USER, MOCK_INTEGRATIONS, MOCK_TASKS } from "@/lib/mock-data";

export default function ProfilePage() {
  const initials = MOCK_USER.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() ?? "AJ";

  const completedTasks = MOCK_TASKS.filter((t) => t.status === "Completed").length;
  const connectedIntegrations = MOCK_INTEGRATIONS.filter(
    (i) => i.status === "CONNECTED"
  ).length;

  const stats = [
    { label: "Tasks Created", value: MOCK_TASKS.length, icon: Zap, color: "text-violet-400" },
    { label: "Tasks Completed", value: completedTasks, icon: Shield, color: "text-emerald-400" },
    { label: "Integrations", value: connectedIntegrations, icon: Zap, color: "text-blue-400" },
    { label: "Notes", value: 2, icon: Mail, color: "text-amber-400" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <User className="size-5 text-violet-400" />
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-white/8 bg-zinc-900/50 p-6"
      >
        <div className="flex items-start gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white">{MOCK_USER.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="size-3.5 text-zinc-500" />
              <span className="text-sm text-zinc-400">{MOCK_USER.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Globe className="size-3.5 text-zinc-500" />
              <span className="text-sm text-zinc-400">{MOCK_USER.timezone}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="default" className="gap-1 text-[10px]">
                <Shield className="size-2.5" /> Cognito Verified
              </Badge>
              <Badge variant="success" className="text-[10px]">Pro Plan</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-xs shrink-0">
            Edit Profile
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="rounded-xl border border-white/8 bg-zinc-900/50 p-4 text-center"
            >
              <Icon className={`size-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
