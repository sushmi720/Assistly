"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  Search,
  Calendar,
  FileText,
  Plug,
  Settings,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { MOCK_TASKS } from "@/lib/mock-data";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
    badgeCount: MOCK_TASKS.filter((t) => t.status === "Pending").length,
  },
  {
    label: "Smart Search",
    href: "/dashboard/search",
    icon: Search,
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    label: "Notes",
    href: "/dashboard/notes",
    icon: FileText,
  },
  {
    label: "Availability",
    href: "/dashboard/availability",
    icon: Clock,
  },
  {
    label: "Integrations",
    href: "/dashboard/integrations",
    icon: Plug,
    badgeCount: 2, // disconnected count
  },
] as const;

const BOTTOM_NAV_ITEMS = [
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
] as const;

type NavItemConfig = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
};

interface SidebarNavItemProps {
  item: NavItemConfig;
  isCollapsed: boolean;
  isActive: boolean;
}

function SidebarNavItem({ item, isCollapsed, isActive }: SidebarNavItemProps) {
  const Icon = item.icon;

  const content = (
    <Link
      href={item.href}
      prefetch={true}
      className={cn(
        "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
        isActive
          ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200 border border-transparent"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="active-nav"
          className="absolute inset-0 rounded-lg bg-violet-600/10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      <Icon
        className={cn(
          "size-4 shrink-0 transition-colors",
          isActive ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"
        )}
      />
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {!isCollapsed && item.badgeCount !== undefined && item.badgeCount > 0 && (
        <Badge variant="default" className="ml-auto text-[10px] px-1.5 py-0">
          {item.badgeCount}
        </Badge>
      )}
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">
          <span>{item.label}</span>
          {item.badgeCount !== undefined && item.badgeCount > 0 && (
            <span className="ml-1.5 text-violet-400">({item.badgeCount})</span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Prefetch all nav routes so clicks are instant
  React.useEffect(() => {
    const allRoutes = [
      ...NAV_ITEMS.map((i) => i.href),
      ...BOTTOM_NAV_ITEMS.map((i) => i.href),
    ];
    allRoutes.forEach((href) => router.prefetch(href));
  }, [router]);

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: isCollapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative flex flex-col h-full bg-zinc-950/80 border-r border-white/8 backdrop-blur-xl overflow-hidden shrink-0"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/8">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 shadow-lg shadow-violet-500/30">
            <Sparkles className="size-4 text-white" />
          </div>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-bold text-white tracking-wider">
                  ASSISTLY
                </p>
                <p className="text-[10px] text-zinc-500 tracking-widest uppercase">
                  AI Productivity
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Status pill */}
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-3 overflow-hidden"
            >
              <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-emerald-400 font-medium">AI Pipeline Active</span>
                <Zap className="ml-auto size-3 text-emerald-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation */}
        <ScrollArea className="flex-1 px-3 py-2">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <SidebarNavItem
                key={item.href}
                item={item}
                isCollapsed={isCollapsed}
                isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
              />
            ))}
          </nav>
        </ScrollArea>

        {/* Bottom nav */}
        <div className="border-t border-white/8 px-3 py-3">
          <nav className="flex flex-col gap-1">
            {BOTTOM_NAV_ITEMS.map((item) => (
              <SidebarNavItem
                key={item.href}
                item={item}
                isCollapsed={isCollapsed}
                isActive={pathname === item.href}
              />
            ))}
          </nav>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed((p) => !p)}
          className="absolute -right-3 top-20 z-10 flex size-6 items-center justify-center rounded-full bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white shadow-md transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="size-3" />
          ) : (
            <ChevronLeft className="size-3" />
          )}
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}
