import { useMemo } from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { useFilterStore } from '../../stores/useFilterStore.tsx';
import { useDashboard } from '../../context/DashboardProvider.tsx';

export default function ToolFilter() {
  const { error, loading, tools } = useDashboard();
  const {
    toolDateFilter,
    setToolDateFilter,
    searchTerm,
    categoryFilter,
    statusFilter,
    setCategoryFilter,
    setStatusFilter,
    clearFilters,
  } = useFilterStore();

  const availableCategories = useMemo(() => {
    if (!tools) return [];

    return [...new Set(tools.map((tool) => tool.category).filter(Boolean))].sort();
  }, [tools]);

  const availableStatus = useMemo(() => {
    if (!tools) return [];

    return [...new Set(tools.map((tool) => tool.status).filter(Boolean))].sort();
  }, [tools]);

  const hasActiveFilters = searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' || toolDateFilter !== 'all';

  return (
    <>
      <div className="relative mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white">Recent Tools</h2>

        {error ? (
          <></>
        ) : loading ? (
          <>
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              className="flex cursor-pointer items-center space-x-2 rounded focus:outline-none"
              onClick={() => setToolDateFilter(toolDateFilter === 'all' ? 'last30days' : 'all')}
              aria-label="Toggle date filter"
            >
              <Calendar className="dark:text-gray-400" />
              <span className="select-none dark:text-gray-400">
                {toolDateFilter === 'all' ? 'All time' : 'Last 30 days'}
              </span>
            </button>
          </div>
        )}
      </div>

      {error ? (
        <></>
      ) : loading ? (
        <>
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-8 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </>
      ) : (
        <div className="mb-6 space-y-4">
          {searchTerm && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Searching for: "<span className="font-medium">{searchTerm}</span>"
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Categories</option>
              {availableStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <X size={14} />
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
