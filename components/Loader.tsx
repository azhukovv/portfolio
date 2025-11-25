import React, { forwardRef } from 'react';

interface LoaderProps {
  text: string;
}

// We forward ref to allow animations from parent
export const Loader = forwardRef<HTMLDivElement, LoaderProps>(({ text }, ref) => {
  return (
    <div 
      ref={ref}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
    >
      <h1 className="text-5xl md:text-8xl font-medium tracking-tightest text-white whitespace-nowrap">
        {text}
      </h1>
    </div>
  );
});

Loader.displayName = "Loader";