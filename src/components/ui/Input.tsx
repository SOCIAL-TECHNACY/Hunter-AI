import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: "light" | "dark";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, variant = "light", ...props }, ref) => {
    const isLight = variant === "light";

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-xs font-semibold tracking-wide uppercase",
              isLight ? "text-slate-700" : "text-purple-200"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 outline-none",
            isLight
              ? cn(
                  "bg-white border text-slate-900 shadow-sm",
                  "border-purple-200/90 placeholder:text-slate-400 placeholder:font-normal",
                  "hover:border-brand-purple/60",
                  "focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
                )
              : cn(
                  "bg-brand-dark/80 border text-white shadow-inner",
                  "border-white/15 placeholder:text-purple-300/40 placeholder:font-normal",
                  "hover:border-brand-accent/50",
                  "focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20"
                ),
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        {hint && !error && (
          <p className={cn("text-xs", isLight ? "text-slate-500" : "text-purple-300/60")}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
