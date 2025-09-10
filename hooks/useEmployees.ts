import { useState, useEffect, useCallback } from 'react';
import { Employee, ApiResponse, SearchParams } from '@/types';
import { buildApiUrl, debounce } from '@/lib/utils';

interface UseEmployeesReturn {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  refetch: () => void;
}

/**
 * Custom hook for managing employee data fetching and state
 */
export function useEmployees(initialParams: SearchParams = {}): UseEmployeesReturn {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 10,
    sortBy: 'id',
    sortOrder: 'asc',
    ...initialParams,
  });

  const fetchEmployees = useCallback(async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);

      const url = buildApiUrl('/api/employees', params);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<Employee> = await response.json();
      
      setEmployees(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setEmployees([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced fetch function for search queries
  const debouncedFetch = useCallback(
    debounce((params: SearchParams) => {
      fetchEmployees(params);
    }, 300),
    [fetchEmployees]
  );

  const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
    setSearchParams(prev => {
      const updated = { ...prev, ...newParams };
      
      // Reset to page 1 when search/filter parameters change
      if ('query' in newParams || 'department' in newParams || 
          'status' in newParams || 'location' in newParams) {
        updated.page = 1;
      }
      
      return updated;
    });
  }, []);

  const refetch = useCallback(() => {
    fetchEmployees(searchParams);
  }, [fetchEmployees, searchParams]);

  // Effect to fetch data when search parameters change
  useEffect(() => {
    // Use debounced fetch for search queries, immediate fetch for other params
    if (searchParams.query !== undefined) {
      debouncedFetch(searchParams);
    } else {
      fetchEmployees(searchParams);
    }
  }, [searchParams, fetchEmployees, debouncedFetch]);

  return {
    employees,
    loading,
    error,
    total,
    totalPages,
    currentPage: searchParams.page || 1,
    searchParams,
    updateSearchParams,
    refetch,
  };
}