import type { StateCreator } from 'zustand';
import type { DepartmentName } from '../../types';

export interface DepartmentSlice {
  departmentFilter: DepartmentName | undefined;
  setDepartmentFilter: (department: DepartmentName | undefined) => void;
  resetDepartmentFilter: () => void;
  getActiveDepartmentCount?: () => number;
}

export const createDepartmentSlice: StateCreator<DepartmentSlice, [], [], DepartmentSlice> = (set, get) => ({
  departmentFilter: 'all',

  setDepartmentFilter: (department) => set({ departmentFilter: department }),
  resetDepartmentFilter: () => set({ departmentFilter: 'all' }),

  getActiveDepartmentCount: () => {
    const { departmentFilter } = get();
    return departmentFilter ? 1 : 0;
  },
});

export const selectDepartmentFilter = (state: DepartmentSlice) => state.departmentFilter;
export const selectResetDepartmentFilter = (state: DepartmentSlice) => state.resetDepartmentFilter;
