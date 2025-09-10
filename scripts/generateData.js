// Script to generate 1000 employee records for the dashboard
const fs = require('fs');
const path = require('path');

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design', 'Customer Success'];
const positions = {
  Engineering: ['Senior Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Tech Lead'],
  Marketing: ['Marketing Manager', 'Digital Marketing Specialist', 'Content Manager', 'SEO Specialist', 'Marketing Coordinator'],
  Sales: ['Sales Representative', 'Sales Manager', 'Account Executive', 'Business Development Manager', 'Sales Coordinator'],
  HR: ['HR Specialist', 'HR Manager', 'Recruiter', 'HR Coordinator', 'People Operations Manager'],
  Finance: ['Financial Analyst', 'Accountant', 'Finance Manager', 'Controller', 'Financial Coordinator'],
  Operations: ['Operations Manager', 'Project Manager', 'Operations Coordinator', 'Process Manager', 'Operations Analyst'],
  Design: ['UX Designer', 'UI Designer', 'Product Designer', 'Graphic Designer', 'Design Manager'],
  'Customer Success': ['Customer Success Manager', 'Support Specialist', 'Account Manager', 'Customer Success Coordinator']
};

const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco', 'Boston', 'Seattle', 'Austin', 'Denver', 'Miami'];
const statuses = ['Active', 'Inactive'];

const skillsByDepartment = {
  Engineering: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
  Marketing: ['Digital Marketing', 'SEO', 'Analytics', 'Content Creation', 'Social Media', 'Email Marketing', 'PPC', 'Brand Management'],
  Sales: ['Sales', 'CRM', 'Communication', 'Negotiation', 'Lead Generation', 'Account Management', 'Salesforce', 'Cold Calling'],
  HR: ['Recruitment', 'Employee Relations', 'Training', 'Performance Management', 'HRIS', 'Compliance', 'Benefits Administration'],
  Finance: ['Excel', 'Financial Modeling', 'Analysis', 'Accounting', 'Budgeting', 'Forecasting', 'QuickBooks', 'SAP'],
  Operations: ['Project Management', 'Process Improvement', 'Leadership', 'Lean Six Sigma', 'Supply Chain', 'Quality Assurance'],
  Design: ['Figma', 'User Research', 'Prototyping', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Wireframing', 'User Testing'],
  'Customer Success': ['Customer Relations', 'Account Management', 'Support', 'Onboarding', 'Retention', 'Zendesk', 'Communication']
};

const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Robert', 'Jennifer', 'Christopher', 'Amanda', 'Matthew', 'Jessica', 'Daniel', 'Ashley', 'James', 'Stephanie', 'Ryan', 'Nicole', 'Andrew', 'Elizabeth'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Martinez', 'Lee', 'White', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott'];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateSalary(department, position) {
  const baseSalaries = {
    Engineering: { min: 70000, max: 150000 },
    Marketing: { min: 50000, max: 100000 },
    Sales: { min: 45000, max: 120000 },
    HR: { min: 45000, max: 90000 },
    Finance: { min: 55000, max: 110000 },
    Operations: { min: 60000, max: 120000 },
    Design: { min: 55000, max: 105000 },
    'Customer Success': { min: 50000, max: 95000 }
  };
  
  const range = baseSalaries[department];
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

function generateEmployees(count) {
  const employees = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const department = getRandomElement(departments);
    const position = getRandomElement(positions[department]);
    const location = getRandomElement(locations);
    const status = Math.random() > 0.1 ? 'Active' : 'Inactive'; // 90% active
    const joinDate = generateRandomDate(new Date(2020, 0, 1), new Date(2024, 11, 31));
    const salary = generateSalary(department, position);
    const skills = getRandomElements(skillsByDepartment[department], Math.floor(Math.random() * 4) + 2);
    
    employees.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      department,
      position,
      salary,
      joinDate: joinDate.toISOString().split('T')[0],
      status,
      location,
      skills
    });
  }
  
  return employees;
}

// Generate 1000 employees
const employees = generateEmployees(1000);

// Write to data.json
const dataPath = path.join(__dirname, '..', 'data', 'data.json');
fs.writeFileSync(dataPath, JSON.stringify(employees, null, 2));

console.log(`Generated ${employees.length} employee records and saved to ${dataPath}`);