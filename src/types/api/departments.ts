export type DepartmentName = 'all' | 'engineering' | 'design' | 'marketing' | 'operations' | 'communication';

export type Department = {
  id: number;
  name: DepartmentName;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Departments = Department[];
