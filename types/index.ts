export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: 'Active' | 'Inactive';
  location: string;
  skills: string[];
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  department?: string;
  status?: string;
  location?: string;
}

export interface SortOptions {
  field: keyof Employee;
  direction: 'asc' | 'desc';
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof Employee;
  sortOrder?: 'asc' | 'desc';
  department?: string;
  status?: string;
  location?: string;
}

export type ViewMode = 'card' | 'row';