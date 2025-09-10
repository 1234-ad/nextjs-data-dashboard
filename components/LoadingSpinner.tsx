'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

/**
 * Loading spinner component with optional text
 */
export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
      {text && <span className="text-gray-600">{text}</span>}
    </div>
  );
}