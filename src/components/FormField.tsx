import type React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  description?: string;
  className?: string;
}

export default function FormField({
  label,
  id,
  required,
  error,
  description,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label 
          htmlFor={id} 
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-0.5">*</span>
          )}
        </label>
        {description && (
          <span className="text-xs text-gray-400">{description}</span>
        )}
      </div>
      {children}
      <div
        className={cn(
          "text-sm text-red-500 transition-all duration-200",
          error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 h-0"
        )}
      >
        {error}
      </div>
    </div>
  );
}