'use client';

import { Filter } from 'lucide-react';

interface FilterControlsProps {
  departments: string[];
  statuses: string[];
  locations: string[];
  selectedDepartment: string;
  selectedStatus: string;
  selectedLocation: string;
  onDepartmentChange: (department: string) => void;
  onStatusChange: (status: string) => void;
  onLocationChange: (location: string) => void;
  onClearFilters: () => void;
}

/**
 * Filter controls component with dropdowns for department, status, and location
 */
export function FilterControls({
  departments,
  statuses,
  locations,
  selectedDepartment,
  selectedStatus,
  selectedLocation,
  onDepartmentChange,
  onStatusChange,
  onLocationChange,
  onClearFilters,
}: FilterControlsProps) {
  const hasActiveFilters = selectedDepartment || selectedStatus || selectedLocation;

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <select
        value={selectedDepartment}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="input-field w-auto min-w-[140px]"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="input-field w-auto min-w-[120px]"
      >
        <option value="">All Statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
        className="input-field w-auto min-w-[140px]"
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}