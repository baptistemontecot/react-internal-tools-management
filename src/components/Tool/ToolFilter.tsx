import React from 'react';
import { Calendar } from 'lucide-react';
import { useFilterStore } from '../../stores/useFilterStore.tsx';
import { useDashboard } from '../../context/DashboardProvider.tsx';

export default function ToolFilter() {
  const { error, loading } = useDashboard();
  const { toolDateFilter, setToolDateFilter } = useFilterStore();

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
          <button
            className="flex cursor-pointer items-center space-x-2 rounded focus:outline-none"
            onClick={() => setToolDateFilter(toolDateFilter === 'all' ? 'last30days' : 'all')}
            aria-label="Toggle filter"
          >
            <Calendar className="dark:text-gray-400" />
            <span className="select-none dark:text-gray-400">
              {toolDateFilter === 'all' ? 'All time' : 'Last 30 days'}
            </span>
          </button>
        )}
      </div>
    </>
  );
}
