'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Employee } from '@/types';

interface SortControlsProps {
  sortBy: keyof Employee;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: keyof Employee, order: 'asc' | 'desc') => void;
}

/**
 * Sort controls component with dropdown for field selection and order toggle
 */
export function SortControls({ sortBy, sortOrder, onSortChange }: SortControlsProps) {
  const sortOptions: { value: keyof Employee; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'department', label: 'Department' },
    { value: 'position', label: 'Position' },
    { value: 'salary', label: 'Salary' },
    { value: 'joinDate', label: 'Join Date' },
    { value: 'location', label: 'Location' },
  ];

  const handleFieldChange = (field: keyof Employee) => {
    onSortChange(field, sortOrder);
  };

  const handleOrderToggle = () => {
    onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const SortIcon = sortOrder === 'asc' ? ArrowUp : ArrowDown;

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-5 w-5 text-gray-500" />
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      
      <select
        value={sortBy}
        onChange={(e) => handleFieldChange(e.target.value as keyof Employee)}
        className="input-field w-auto min-w-[120px]"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleOrderToggle}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
      >
        <SortIcon className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
}