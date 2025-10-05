'use client';

import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Employee, SearchParams } from '@/types';
import { exportEmployees, getExportSummary } from '@/lib/exportUtils';

interface ExportButtonProps {
  employees: Employee[];
  searchParams?: SearchParams;
  disabled?: boolean;
  className?: string;
}

export function ExportButton({ 
  employees, 
  searchParams = {}, 
  disabled = false, 
  className = '' 
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const exportSummary = getExportSummary(employees);

  const fetchAllFilteredData = async (): Promise<Employee[]> => {
    try {
      const params = new URLSearchParams();
      
      // Add search parameters to API call
      if (searchParams.query) params.append('query', searchParams.query);
      if (searchParams.department) params.append('department', searchParams.department);
      if (searchParams.status) params.append('status', searchParams.status);
      if (searchParams.location) params.append('location', searchParams.location);
      if (searchParams.sortBy) params.append('sortBy', searchParams.sortBy);
      if (searchParams.sortOrder) params.append('sortOrder', searchParams.sortOrder);

      const response = await fetch(`/api/employees/export?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Export API failed: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Export failed');
      }

      return result.data;
    } catch (error) {
      console.error('Failed to fetch export data:', error);
      // Fallback to current page data
      return employees;
    }
  };

  const handleExport = async (format: 'csv' | 'excel') => {
    if (disabled || employees.length === 0) return;

    setIsExporting(true);
    setShowDropdown(false);

    try {
      // Fetch all filtered data from API
      const allFilteredData = await fetchAllFilteredData();
      
      // Export the complete filtered dataset
      exportEmployees(allFilteredData, {
        format,
        includeHeaders: true
      });
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const isDisabled = disabled || employees.length === 0 || isExporting;

  // Check if there are active filters
  const hasActiveFilters = Boolean(
    searchParams.query || 
    searchParams.department || 
    searchParams.status || 
    searchParams.location
  );

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isDisabled}
        className={`
          inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium
          ${isDisabled 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }
          transition-colors duration-200
        `}
      >
        {isExporting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        {isExporting ? 'Exporting...' : 'Export'}
        {!isDisabled && (
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {showDropdown && !isDisabled && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Export Data</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Current Page: <span className="font-medium">{exportSummary.totalRecords} records</span></p>
                <p>Departments: <span className="font-medium">{exportSummary.departments.length}</span></p>
                {exportSummary.dateRange && (
                  <p>Date Range: <span className="font-medium">
                    {exportSummary.dateRange.earliest} to {exportSummary.dateRange.latest}
                  </span></p>
                )}
                {hasActiveFilters && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-blue-700">
                    <p className="font-medium">📊 Filtered Export</p>
                    <p>Will export ALL filtered results, not just current page</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => handleExport('csv')}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150"
              >
                <FileText className="w-4 h-4 mr-3 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Export as CSV</div>
                  <div className="text-xs text-gray-500">Comma-separated values</div>
                </div>
              </button>
              
              <button
                onClick={() => handleExport('excel')}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150"
              >
                <FileSpreadsheet className="w-4 h-4 mr-3 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Export as Excel</div>
                  <div className="text-xs text-gray-500">Excel-compatible CSV</div>
                </div>
              </button>
            </div>
            
            <div className="p-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-600">
              <p>💡 {hasActiveFilters ? 'Exports all filtered data' : 'Exports complete dataset'} with timestamps</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}