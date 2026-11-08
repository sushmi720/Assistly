"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MOCK_USER } from "@/lib/mock-data";

interface SettingRowProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
      </div>
      <div className="ml-6 shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <button
      onClick={() => setChecked((p) => !p)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        checked ? "bg-violet-600" : "bg-zinc-700"
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const SECTIONS = [
  { icon: Bell, label: "Notifications", color: "text-amber-400" },
  { icon: Shield, label: "Security & Privacy", color: "text-emerald-400" },
  { icon: Palette, label: "Appearance", color: "text-violet-400" },
  { icon: Globe, label: "Language & Region", color: "text-blue-400" },
];

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="size-5 text-violet-400" />
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
        <p className="text-sm text-zinc-500">Manage your account preferences.</p>
      </motion.div>

      {/* Account info */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-white/8 bg-zinc-900/50 p-5"
      >
        <h2 className="text-sm font-semibold text-white mb-4">Account</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Name", value: MOCK_USER.name ?? "" },
            { label: "Email", value: MOCK_USER.email },
            { label: "Timezone", value: MOCK_USER.timezone },
            { label: "Auth Provider", value: "Amazon Cognito" },
          ].map((f) => (
            <div key={f.label} className="rounded-lg border border-white/8 bg-white/3 p-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{f.label}</p>
              <p className="text-sm text-white mt-1 truncate">{f.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Settings sections */}
      {SECTIONS.map((section, i) => {
        const Icon = section.icon;
        return (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="rounded-xl border border-white/8 bg-zinc-900/50 p-5"
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`size-4 ${section.color}`} />
              <h2 className="text-sm font-semibold text-white">{section.label}</h2>
            </div>
            <Separator className="my-3" />
            <div className="divide-y divide-white/5">
              <SettingRow
                label={`Enable ${section.label}`}
                description={`Turn on ${section.label.toLowerCase()} features`}
              >
                <Toggle defaultChecked />
              </SettingRow>
              <SettingRow
                label="Advanced Options"
                description="Configure detailed settings"
              >
                <Button variant="outline" size="sm" className="text-xs">Configure</Button>
              </SettingRow>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
