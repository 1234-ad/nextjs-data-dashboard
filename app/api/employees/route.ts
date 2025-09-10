import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Employee, ApiResponse } from '@/types';

/**
 * GET /api/employees
 * Fetches employee data with support for pagination, search, filtering, and sorting
 */
export async function GET(request: NextRequest) {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'data', 'data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const employees: Employee[] = JSON.parse(fileContents);

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') as keyof Employee || 'id';
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'asc';
    const department = searchParams.get('department') || '';
    const status = searchParams.get('status') || '';
    const location = searchParams.get('location') || '';

    // Filter employees based on search query
    let filteredEmployees = employees.filter((employee) => {
      const matchesQuery = query === '' || 
        employee.name.toLowerCase().includes(query.toLowerCase()) ||
        employee.email.toLowerCase().includes(query.toLowerCase()) ||
        employee.position.toLowerCase().includes(query.toLowerCase()) ||
        employee.department.toLowerCase().includes(query.toLowerCase()) ||
        employee.location.toLowerCase().includes(query.toLowerCase());

      const matchesDepartment = department === '' || employee.department === department;
      const matchesStatus = status === '' || employee.status === status;
      const matchesLocation = location === '' || employee.location === location;

      return matchesQuery && matchesDepartment && matchesStatus && matchesLocation;
    });

    // Sort employees
    filteredEmployees.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    // Calculate pagination
    const total = filteredEmployees.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

    // Prepare response
    const response: ApiResponse<Employee> = {
      data: paginatedEmployees,
      total,
      page,
      limit,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}