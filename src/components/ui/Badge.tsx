import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "emerald" | "amber" | "red";
  className?: string;
}

export function Badge({ children, variant = "purple", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        {
          "bg-brand-purple/20 text-purple-300 border border-brand-purple/30": variant === "purple",
          "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30": variant === "emerald",
          "bg-amber-500/20 text-amber-300 border border-amber-500/30": variant === "amber",
          "bg-red-500/20 text-red-300 border border-red-500/30": variant === "red",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
