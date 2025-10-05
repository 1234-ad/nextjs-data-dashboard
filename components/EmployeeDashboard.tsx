'use client';

import { useState, useMemo } from 'react';
import { ViewMode, Employee } from '@/types';
import { useEmployees } from '@/hooks/useEmployees';
import { getUniqueValues, getPaginationInfo } from '@/lib/utils';

// Component imports
import { SearchBar } from './SearchBar';
import { FilterControls } from './FilterControls';
import { SortControls } from './SortControls';
import { ViewToggle } from './ViewToggle';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeTable } from './EmployeeTable';
import { Pagination } from './Pagination';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ExportButton } from './ExportButton';

/**
 * Main dashboard component that orchestrates all employee data display functionality
 */
export function EmployeeDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  
  const {
    employees,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    searchParams,
    updateSearchParams,
    refetch,
  } = useEmployees({
    page: 1,
    limit: 12, // Good for both card and row views
    sortBy: 'name',
    sortOrder: 'asc',
  });

  // Get unique values for filter options (this would ideally come from the API)
  const filterOptions = useMemo(() => {
    // For now, we'll use static options. In a real app, you'd fetch these from the API
    return {
      departments: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design', 'Customer Success'],
      statuses: ['Active', 'Inactive'],
      locations: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco', 'Boston', 'Seattle', 'Austin', 'Denver', 'Miami'],
    };
  }, []);

  const paginationInfo = getPaginationInfo(currentPage, totalPages, total, searchParams.limit || 12);

  const handleSearch = (query: string) => {
    updateSearchParams({ query });
  };

  const handleFilterChange = (filterType: 'department' | 'status' | 'location', value: string) => {
    updateSearchParams({ [filterType]: value });
  };

  const handleSortChange = (field: keyof Employee, order: 'asc' | 'desc') => {
    updateSearchParams({ sortBy: field, sortOrder: order });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page });
  };

  const handleClearFilters = () => {
    updateSearchParams({
      department: '',
      status: '',
      location: '',
    });
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
              <p className="text-gray-600">Manage and view employee information</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <ExportButton 
                employees={employees} 
                disabled={loading || employees.length === 0}
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchBar
                value={searchParams.query || ''}
                onChange={handleSearch}
                placeholder="Search by name, email, position, department, or location..."
              />
            </div>
            <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <FilterControls
              departments={filterOptions.departments}
              statuses={filterOptions.statuses}
              locations={filterOptions.locations}
              selectedDepartment={searchParams.department || ''}
              selectedStatus={searchParams.status || ''}
              selectedLocation={searchParams.location || ''}
              onDepartmentChange={(value) => handleFilterChange('department', value)}
              onStatusChange={(value) => handleFilterChange('status', value)}
              onLocationChange={(value) => handleFilterChange('location', value)}
              onClearFilters={handleClearFilters}
            />

            <SortControls
              sortBy={searchParams.sortBy || 'name'}
              sortOrder={searchParams.sortOrder || 'asc'}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              {total === 0 ? 'No employees found' : `Found ${total} employee${total === 1 ? '' : 's'}`}
              {searchParams.query && ` matching "${searchParams.query}"`}
            </p>
            {total > 0 && (
              <div className="mt-2 sm:mt-0">
                <ExportButton 
                  employees={employees} 
                  disabled={loading}
                  className="text-xs"
                />
              </div>
            )}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSpinner text="Loading employees..." />
        ) : (
          <>
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {employees.map((employee) => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <EmployeeTable employees={employees} />
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showInfo={true}
                startItem={paginationInfo.startItem}
                endItem={paginationInfo.endItem}
                total={paginationInfo.total}
              />
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && employees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600 mb-4">
              {searchParams.query || searchParams.department || searchParams.status || searchParams.location
                ? 'Try adjusting your search criteria or clearing filters.'
                : 'No employee data is currently available.'}
            </p>
            {(searchParams.query || searchParams.department || searchParams.status || searchParams.location) && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}