'use client';

import { Mail, MapPin, Calendar, DollarSign, User, Briefcase } from 'lucide-react';
import { Employee } from '@/types';
import { formatSalary, formatDate } from '@/lib/utils';

interface EmployeeCardProps {
  employee: Employee;
}

/**
 * Employee card component for card view display
 */
export function EmployeeCard({ employee }: EmployeeCardProps) {
  const statusColor = employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{employee.name}</h3>
            <p className="text-gray-600 text-sm">{employee.position}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {employee.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{employee.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="h-4 w-4" />
          <span>{employee.department}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{employee.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="h-4 w-4" />
          <span className="font-medium">{formatSalary(employee.salary)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Joined {formatDate(employee.joinDate)}</span>
        </div>
      </div>

      {employee.skills && employee.skills.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {employee.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}