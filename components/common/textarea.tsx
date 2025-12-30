"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

// Component props
interface TextareaProps extends React.ComponentProps<"textarea"> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    // Same styling as input (optimized for textarea)
    const defaultClasses =
      "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return (
      <textarea
        className={twMerge(defaultClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
