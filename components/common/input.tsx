// src/components/ui/input.tsx
'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';

// Define the component props
interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // Default Tailwind classes for a standard input
    const defaultClasses = 'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    return (
      <input
        type={type}
        className={twMerge(defaultClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';