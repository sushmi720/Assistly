import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-violet-600/20 text-violet-300 border border-violet-500/30",
        secondary: "bg-white/10 text-zinc-300 border border-white/10",
        destructive: "bg-red-500/20 text-red-300 border border-red-500/30",
        outline: "border border-white/20 text-zinc-300",
        success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
        urgent: "bg-red-500/20 text-red-300 border border-red-500/30",
        high: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
        medium: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
        low: "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
