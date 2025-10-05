import { Employee } from '@/types';

/**
 * Export utilities for converting employee data to various formats
 */

export interface ExportOptions {
  format: 'csv' | 'excel';
  filename?: string;
  includeHeaders?: boolean;
}

/**
 * Convert employee data to CSV format
 */
export function convertToCSV(employees: Employee[], includeHeaders = true): string {
  const headers = [
    'ID',
    'Name', 
    'Email',
    'Department',
    'Position',
    'Salary',
    'Join Date',
    'Status',
    'Location',
    'Skills'
  ];

  const rows = employees.map(employee => [
    employee.id.toString(),
    employee.name,
    employee.email,
    employee.department,
    employee.position,
    employee.salary.toString(),
    employee.joinDate,
    employee.status,
    employee.location,
    employee.skills.join('; ')
  ]);

  const csvContent = [];
  
  if (includeHeaders) {
    csvContent.push(headers.join(','));
  }
  
  rows.forEach(row => {
    // Escape commas and quotes in CSV data
    const escapedRow = row.map(field => {
      if (field.includes(',') || field.includes('\"') || field.includes('\\n')) {
        return `\"${field.replace(/\"/g, '\"\"')}\"`;
      }
      return field;
    });
    csvContent.push(escapedRow.join(','));
  });

  return csvContent.join('\\n');
}

/**
 * Convert employee data to Excel-compatible format (CSV with BOM for proper encoding)
 */
export function convertToExcel(employees: Employee[], includeHeaders = true): string {
  const csvContent = convertToCSV(employees, includeHeaders);
  // Add BOM for proper Excel encoding
  return '\\uFEFF' + csvContent;
}

/**
 * Generate filename with timestamp
 */
export function generateFilename(format: 'csv' | 'excel', prefix = 'employees'): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
  const extension = format === 'excel' ? 'csv' : format;
  return `${prefix}_${timestamp}.${extension}`;
}

/**
 * Download data as file
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  window.URL.revokeObjectURL(url);
}

/**
 * Export employees data to specified format
 */
export function exportEmployees(
  employees: Employee[], 
  options: ExportOptions
): void {
  const { format, filename, includeHeaders = true } = options;
  
  let content: string;
  let mimeType: string;
  let finalFilename: string;

  switch (format) {
    case 'csv':
      content = convertToCSV(employees, includeHeaders);
      mimeType = 'text/csv;charset=utf-8;';
      finalFilename = filename || generateFilename('csv');
      break;
    
    case 'excel':
      content = convertToExcel(employees, includeHeaders);
      mimeType = 'text/csv;charset=utf-8;';
      finalFilename = filename || generateFilename('excel');
      break;
    
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }

  downloadFile(content, finalFilename, mimeType);
}

/**
 * Get export summary information
 */
export function getExportSummary(employees: Employee[]): {
  totalRecords: number;
  departments: string[];
  dateRange: { earliest: string; latest: string } | null;
} {
  if (employees.length === 0) {
    return {
      totalRecords: 0,
      departments: [],
      dateRange: null
    };
  }

  const departments = [...new Set(employees.map(emp => emp.department))].sort();
  
  const joinDates = employees.map(emp => new Date(emp.joinDate)).sort((a, b) => a.getTime() - b.getTime());
  const dateRange = {
    earliest: joinDates[0].toISOString().split('T')[0],
    latest: joinDates[joinDates.length - 1].toISOString().split('T')[0]
  };

  return {
    totalRecords: employees.length,
    departments,
    dateRange
  };
}