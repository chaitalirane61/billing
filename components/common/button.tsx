// src/components/ui/button.tsx
'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';

// Define the component props
interface ButtonProps extends React.ComponentProps<'button'> {
  // You can extend this with variants later if needed (like size, color, etc.)
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    // Default Tailwind classes for a standard button (can be customized)
    const defaultClasses = 'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    return (
      <button
        className={twMerge(defaultClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';