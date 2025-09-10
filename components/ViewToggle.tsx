'use client';

import { Grid, List } from 'lucide-react';
import { ViewMode } from '@/types';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

/**
 * Toggle component for switching between card and row views
 */
export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange('card')}
        className={`p-2 rounded-md transition-colors duration-200 ${
          currentView === 'card'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        title="Card View"
      >
        <Grid className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewChange('row')}
        className={`p-2 rounded-md transition-colors duration-200 ${
          currentView === 'row'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        title="Row View"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}