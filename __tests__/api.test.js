/**
 * API Route Tests
 * Tests for the /api/employees endpoint
 */

const { createMocks } = require('node-mocks-http');
const handler = require('../app/api/employees/route');

// Mock data for testing
const mockEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 95000,
    joinDate: '2022-01-15',
    status: 'Active',
    location: 'New York',
    skills: ['JavaScript', 'React', 'Node.js']
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 78000,
    joinDate: '2021-06-20',
    status: 'Active',
    location: 'Los Angeles',
    skills: ['Digital Marketing', 'SEO', 'Analytics']
  }
];

// Mock fs module
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockResolvedValue(JSON.stringify(mockEmployees))
  }
}));

describe('/api/employees', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return all employees with default parameters', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/employees'
    });

    await handler.GET(req);
    
    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.data).toHaveLength(2);
    expect(data.total).toBe(2);
    expect(data.page).toBe(1);
  });

  test('should filter employees by department', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/employees?department=Engineering'
    });

    await handler.GET(req);
    
    const data = JSON.parse(res._getData());
    expect(data.data).toHaveLength(1);
    expect(data.data[0].department).toBe('Engineering');
  });

  test('should search employees by name', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/employees?query=John'
    });

    await handler.GET(req);
    
    const data = JSON.parse(res._getData());
    expect(data.data).toHaveLength(1);
    expect(data.data[0].name).toContain('John');
  });

  test('should sort employees by salary descending', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/employees?sortBy=salary&sortOrder=desc'
    });

    await handler.GET(req);
    
    const data = JSON.parse(res._getData());
    expect(data.data[0].salary).toBeGreaterThan(data.data[1].salary);
  });

  test('should paginate results correctly', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/employees?page=1&limit=1'
    });

    await handler.GET(req);
    
    const data = JSON.parse(res._getData());
    expect(data.data).toHaveLength(1);
    expect(data.totalPages).toBe(2);
    expect(data.page).toBe(1);
  });

  test('should handle empty search results', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/employees?query=NonexistentName'
    });

    await handler.GET(req);
    
    const data = JSON.parse(res._getData());
    expect(data.data).toHaveLength(0);
    expect(data.total).toBe(0);
  });

  test('should handle invalid parameters gracefully', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/employees?page=invalid&limit=invalid'
    });

    await handler.GET(req);
    
    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.page).toBe(1); // Should default to 1
  });

  test('should handle file read errors', async () => {
    const fs = require('fs');
    fs.promises.readFile.mockRejectedValueOnce(new Error('File not found'));

    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/employees'
    });

    await handler.GET(req);
    
    expect(res._getStatusCode()).toBe(500);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Failed to fetch employees');
  });
});