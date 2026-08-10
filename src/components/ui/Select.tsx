"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: "light" | "dark";
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      hint,
      options,
      placeholder,
      id,
      variant = "light",
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    // Track selected state to dynamically color placeholder vs selected text
    const [selectedValue, setSelectedValue] = useState<string>(
      (value as string) || (defaultValue as string) || ""
    );

    const isPlaceholderActive = !selectedValue;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

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

        <div className="relative w-full">
          <select
            ref={ref}
            id={id}
            value={value !== undefined ? value : selectedValue}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3.5 pr-11 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer appearance-none outline-none",
              isLight
                ? cn(
                    "bg-white border text-slate-900 shadow-sm",
                    "border-purple-200/90 hover:border-brand-purple/60",
                    "focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10",
                    isPlaceholderActive && "text-slate-400 font-normal"
                  )
                : cn(
                    "bg-brand-dark/80 border text-white shadow-inner",
                    "border-white/15 hover:border-brand-accent/50",
                    "focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20",
                    isPlaceholderActive && "text-purple-300/50 font-normal"
                  ),
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option
                value=""
                disabled
                className="bg-white text-slate-400 font-normal py-2"
              >
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-white text-slate-900 font-medium py-2 hover:bg-purple-50"
              >
                {opt.label}
              </option>
            ))}
          </select>

          {/* High contrast custom chevron SVG */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5">
            <svg
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isLight ? "text-brand-purple" : "text-brand-accent"
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

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

Select.displayName = "Select";

export { Select };
export type { SelectProps, SelectOption };
