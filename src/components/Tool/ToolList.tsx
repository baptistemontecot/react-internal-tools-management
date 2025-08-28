import { useMemo } from 'react';
import ToolRow from './ToolRow.tsx';
import type { Tools } from '../../types';
import ErrorMessage from '../common/ErrorMessage.tsx';
import ToolSkeleton from '../skeleton/ToolSkeleton.tsx';
import { isUpdatedLast30Days } from '../../utils/filterUtils.ts';
import { useFilterStore } from '../../stores/useFilterStore.tsx';
import { useDashboard } from '../../context/DashboardProvider.tsx';

export default function ToolList({ tools }: { tools: Tools }) {
  const { error, loading } = useDashboard();
  const { toolDateFilter, searchTerm, categoryFilter, statusFilter } = useFilterStore();

  const filteredTools = useMemo(() => {
    if (!tools) return [];

    return tools.filter((tool) => {
      const matchesDate = toolDateFilter === 'all' || isUpdatedLast30Days(tool);
      const matchesSearch = !searchTerm || tool.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || (tool.category && tool.category.toLowerCase() === categoryFilter.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;

      return matchesDate && matchesSearch && matchesCategory && matchesStatus;
    });
  }, [tools, toolDateFilter, searchTerm, categoryFilter, statusFilter]);

  return (
    <>
      {error ? (
        <ErrorMessage message="Impossible de charger les outils. Vérifiez votre connexion." />
      ) : loading ? (
        <ToolSkeleton />
      ) : (
        <>
          {error ? (
            <ErrorMessage message="Aucun outil trouvé" />
          ) : loading ? (
            <>
              <div className="h-6 w-6 rounded bg-gray-300 dark:bg-gray-700"></div>
            </>
          ) : (
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {filteredTools.length} outil{filteredTools.length !== 1 ? 's' : ''} trouvé
              {filteredTools.length !== 1 ? 's' : ''}
            </div>
          )}
          <div className="min-w-max overflow-hidden">
            <div className="grid grid-cols-[400px_1fr_1fr_1fr_1fr] border-b border-gray-200 px-2 py-5 text-sm dark:border-gray-800 dark:bg-black dark:text-gray-400">
              <div>Tool</div>
              <div>Department</div>
              <div>Users</div>
              <div>Monthly Cost</div>
              <div>Status</div>
            </div>
            {filteredTools.map((tool) => (
              <ToolRow key={tool.id} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <p>No tools found matching your criteria.</p>
              {searchTerm && <p className="mt-2 text-sm">Try adjusting your search or filters.</p>}
            </div>
          )}
        </>
      )}
    </>
  );
}
