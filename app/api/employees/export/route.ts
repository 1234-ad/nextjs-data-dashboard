import { NextRequest, NextResponse } from 'next/server';
import { employees } from '@/data/employees';
import { Employee, SearchParams } from '@/types';

/**
 * Filter and sort employees based on search parameters
 */
function filterAndSortEmployees(searchParams: SearchParams): Employee[] {
  let filteredEmployees = [...employees];

  // Apply text search
  if (searchParams.query) {
    const query = searchParams.query.toLowerCase();
    filteredEmployees = filteredEmployees.filter(employee =>
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query) ||
      employee.location.toLowerCase().includes(query) ||
      employee.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }

  // Apply department filter
  if (searchParams.department) {
    filteredEmployees = filteredEmployees.filter(employee =>
      employee.department === searchParams.department
    );
  }

  // Apply status filter
  if (searchParams.status) {
    filteredEmployees = filteredEmployees.filter(employee =>
      employee.status === searchParams.status
    );
  }

  // Apply location filter
  if (searchParams.location) {
    filteredEmployees = filteredEmployees.filter(employee =>
      employee.location === searchParams.location
    );
  }

  // Apply sorting
  if (searchParams.sortBy) {
    const { sortBy, sortOrder = 'asc' } = searchParams;
    
    filteredEmployees.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  return filteredEmployees;
}

/**
 * GET /api/employees/export
 * Export filtered employee data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams: urlSearchParams } = new URL(request.url);
    
    // Parse search parameters
    const searchParams: SearchParams = {
      query: urlSearchParams.get('query') || undefined,
      department: urlSearchParams.get('department') || undefined,
      status: urlSearchParams.get('status') || undefined,
      location: urlSearchParams.get('location') || undefined,
      sortBy: (urlSearchParams.get('sortBy') as keyof Employee) || 'name',
      sortOrder: (urlSearchParams.get('sortOrder') as 'asc' | 'desc') || 'asc',
    };

    // Get filtered and sorted employees
    const filteredEmployees = filterAndSortEmployees(searchParams);

    // Return the data
    return NextResponse.json({
      success: true,
      data: filteredEmployees,
      total: filteredEmployees.length,
      filters: searchParams,
      exportedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Export API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to export employee data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}