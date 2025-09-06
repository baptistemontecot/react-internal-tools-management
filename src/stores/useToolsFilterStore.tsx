import { useMemo } from 'react';
import type { Tool } from '../types';
import { useFilterStore } from './useFilterStore.tsx';
import { isUpdatedLast30Days } from '../utils/filterUtils.ts';

export function useToolsFilterStore(tools: Tool[] | null) {
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const departmentFilter = useFilterStore((state) => state.departmentFilter);
  const statusFilter = useFilterStore((state) => state.statusFilter);
  const categoryFilter = useFilterStore((state) => state.categoryFilter);
  const toolDateFilter = useFilterStore((state) => state.toolDateFilter);

  return useMemo(() => {
    if (!tools) return [];

    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.vendor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || tool.owner_department.toLowerCase() === departmentFilter;
      const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;

      const matchesDate = (() => {
        switch (toolDateFilter) {
          case 'recent':
            return isUpdatedLast30Days(tool);
          case 'old':
            return !isUpdatedLast30Days(tool);
          case 'all':
          default:
            return true;
        }
      })();

      return matchesSearch && matchesDepartment && matchesStatus && matchesCategory && matchesDate;
    });
  }, [tools, searchTerm, departmentFilter, statusFilter, categoryFilter, toolDateFilter]);
}
