"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Plug,
  CheckCircle2,
  XCircle,
  Mail,
  MessageCircle,
  Send,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_INTEGRATIONS } from "@/lib/mock-data";
import type { IntegrationProvider } from "@/types";

const PROVIDER_META: Record<
  IntegrationProvider,
  { label: string; description: string; icon: React.ReactNode; color: string }
> = {
  gmail: {
    label: "Gmail",
    description: "Extract tasks and deadlines from Gmail messages via OAuth.",
    icon: <Mail className="size-5 text-red-400" />,
    color: "border-red-500/20 bg-red-500/8",
  },
  outlook: {
    label: "Microsoft Outlook",
    description: "Sync Outlook emails and calendar events automatically.",
    icon: <Mail className="size-5 text-blue-400" />,
    color: "border-blue-500/20 bg-blue-500/8",
  },
  whatsapp: {
    label: "WhatsApp Business",
    description: "Parse WhatsApp messages for tasks via Business Cloud API.",
    icon: <MessageCircle className="size-5 text-emerald-400" />,
    color: "border-emerald-500/20 bg-emerald-500/8",
  },
  telegram: {
    label: "Telegram",
    description: "Monitor Telegram chats and channels for actionable items.",
    icon: <Send className="size-5 text-sky-400" />,
    color: "border-sky-500/20 bg-sky-500/8",
  },
};

export default function IntegrationsPage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Plug className="size-5 text-violet-400" />
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
        </div>
        <p className="text-sm text-zinc-500">
          Connect your communication platforms. OAuth tokens are stored securely in AWS Secrets Manager.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MOCK_INTEGRATIONS.map((integration, i) => {
          const meta = PROVIDER_META[integration.provider];
          const isConnected = integration.status === "CONNECTED";

          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl border p-5 ${meta.color}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-900/60 border border-white/8">
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{meta.label}</h3>
                    {isConnected && integration.connectedAt && (
                      <p className="text-xs text-zinc-500">
                        Connected {new Date(integration.connectedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {isConnected ? (
                  <Badge variant="success" className="gap-1 text-[10px]">
                    <CheckCircle2 className="size-2.5" /> Active
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1 text-[10px]">
                    <XCircle className="size-2.5" /> Disconnected
                  </Badge>
                )}
              </div>

              <p className="text-xs text-zinc-500 mb-4">{meta.description}</p>

              <div className="flex items-center gap-2">
                {isConnected ? (
                  <>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs flex-1">
                      <RefreshCw className="size-3" /> Re-sync
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="gap-1.5 text-xs flex-1">
                    <Plug className="size-3.5" /> Connect via OAuth
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Security note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-violet-500/15 bg-violet-600/6 p-4"
      >
        <p className="text-xs text-zinc-400">
          🔒 <span className="text-violet-400 font-medium">Security:</span> OAuth refresh tokens
          are encrypted with AES-256 via AWS KMS and stored in AWS Secrets Manager at{" "}
          <code className="text-violet-300 bg-violet-500/15 px-1 rounded">
            assistly/tokens/&#123;user_id&#125;/&#123;provider&#125;
          </code>
          . Raw tokens are never stored in the database.
        </p>
      </motion.div>
    </div>
  );
}
