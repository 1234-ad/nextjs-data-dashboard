'use client';

import { memo, useMemo, useCallback } from 'react';
import { Employee } from '@/types';

/**
 * Performance optimization utilities for the dashboard
 */

// Memoized employee card to prevent unnecessary re-renders
export const MemoizedEmployeeCard = memo(({ employee }: { employee: Employee }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
          <p className="text-sm text-gray-600">{employee.position}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          employee.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {employee.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Department:</span> {employee.department}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Location:</span> {employee.location}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Salary:</span> ${employee.salary.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Joined:</span> {new Date(employee.joinDate).toLocaleDateString()}
        </p>
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
        <div className="flex flex-wrap gap-1">
          {employee.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

MemoizedEmployeeCard.displayName = 'MemoizedEmployeeCard';

// Optimized search function with debouncing
export const useOptimizedSearch = (searchTerm: string, delay: number = 300) => {
  return useMemo(() => {
    const timeoutId = setTimeout(() => {
      return searchTerm;
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, delay]);
};

// Memoized filter options to prevent recalculation
export const useMemoizedFilterOptions = (employees: Employee[]) => {
  return useMemo(() => {
    const departments = [...new Set(employees.map(emp => emp.department))].sort();
    const locations = [...new Set(employees.map(emp => emp.location))].sort();
    const statuses = [...new Set(employees.map(emp => emp.status))].sort();
    
    return { departments, locations, statuses };
  }, [employees]);
};

// Optimized pagination calculator
export const usePaginationCalculator = (
  total: number, 
  currentPage: number, 
  itemsPerPage: number
) => {
  return useMemo(() => {
    const totalPages = Math.ceil(total / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, total);
    
    return {
      totalPages,
      startItem,
      endItem,
      hasPrevious: currentPage > 1,
      hasNext: currentPage < totalPages
    };
  }, [total, currentPage, itemsPerPage]);
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = useMemo(() => performance.now(), []);
  
  const logPerformance = useCallback((action: string) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] ${action}: ${duration.toFixed(2)}ms`);
    }
  }, [componentName, startTime]);
  
  return { logPerformance };
};

// Virtualization helper for large lists
export const useVirtualization = (
  items: any[], 
  containerHeight: number, 
  itemHeight: number
) => {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const bufferSize = Math.floor(visibleCount / 2);
    
    return {
      visibleCount,
      bufferSize,
      totalHeight: items.length * itemHeight
    };
  }, [items.length, containerHeight, itemHeight]);
};