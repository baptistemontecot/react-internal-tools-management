import { useMemo } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import {
  useDepartmentFilter,
  useStatusFilter,
  useCategoryFilter,
  useToolDateFilter,
  useHasActiveFilters,
  useClearAllFilters,
  useSetDepartmentFilter,
  useSetStatusFilter,
  useSetCategoryFilter,
  useSetToolDateFilter,
} from '../../stores';
import type { Tool, DepartmentName, ToolStatus } from '../../types';

interface ToolFiltersProps {
  tools: Tool[];
}

export default function ToolFilters({ tools }: ToolFiltersProps) {
  const departmentFilter = useDepartmentFilter();
  const statusFilter = useStatusFilter();
  const categoryFilter = useCategoryFilter();
  const toolDateFilter = useToolDateFilter();
  const hasActiveFilters = useHasActiveFilters();

  const setDepartmentFilter = useSetDepartmentFilter();
  const setStatusFilter = useSetStatusFilter();
  const setCategoryFilter = useSetCategoryFilter();
  const setToolDateFilter = useSetToolDateFilter();
  const clearAllFilters = useClearAllFilters();

  const availableCategories = useMemo(() => {
    return [...new Set(tools?.map((tool) => tool.category) || [])];
  }, [tools]);

  const departmentOptions: Array<{ value: 'all' | DepartmentName; label: string }> = [
    { value: 'all', label: 'Tous' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operations' },
    { value: 'communication', label: 'Communication' },
  ];

  const statusOptions: Array<{ value: 'all' | ToolStatus; label: string }> = [
    { value: 'all', label: 'Tous' },
    { value: 'active', label: 'Actifs' },
    { value: 'unused', label: 'Inactifs' },
    { value: 'expiring', label: 'Expirant' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
      <div className="flex items-center space-x-2">
        <Filter size={16} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtres:</span>
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Département:</label>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value as typeof departmentFilter)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 transition-colors hover:border-purple-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-purple-500"
        >
          {departmentOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Statut:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 transition-colors hover:border-purple-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-purple-500"
        >
          {statusOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Catégorie:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 transition-colors hover:border-purple-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-purple-500"
        >
          <option value="all">Toutes</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Mis à jour:</label>
        <select
          value={toolDateFilter}
          onChange={(e) => setToolDateFilter(e.target.value as typeof toolDateFilter)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 transition-colors hover:border-purple-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-purple-500"
        >
          <option value="all">Toutes dates</option>
          <option value="recent">Récemment (30j)</option>
          <option value="old">Plus ancien</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="flex items-center space-x-1 rounded-md bg-purple-50 px-3 py-1.5 text-sm text-purple-600 transition-colors hover:bg-purple-100 hover:text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30 dark:hover:text-purple-300"
        >
          <RotateCcw size={14} />
          <span>Effacer</span>
        </button>
      )}
    </div>
  );
}
