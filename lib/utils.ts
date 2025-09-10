import { Employee, SearchParams } from '@/types';

/**
 * Formats salary as currency
 */
export function formatSalary(salary: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(salary);
}

/**
 * Formats date string to readable format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Build URL with search parameters
 */
export function buildApiUrl(baseUrl: string, params: SearchParams): string {
  const url = new URL(baseUrl, window.location.origin);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value.toString());
    }
  });
  
  return url.toString();
}

/**
 * Get unique values from array of objects for a specific field
 */
export function getUniqueValues<T, K extends keyof T>(
  array: T[],
  key: K
): T[K][] {
  const values = array.map(item => item[key]);
  return Array.from(new Set(values));
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate pagination info
 */
export function getPaginationInfo(
  currentPage: number,
  totalPages: number,
  total: number,
  limit: number
) {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);
  
  return {
    startItem,
    endItem,
    total,
    currentPage,
    totalPages,
  };
}