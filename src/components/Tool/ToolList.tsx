import ToolRow from './ToolRow.tsx';
import type { Tools } from '../../types';
import ErrorMessage from '../common/ErrorMessage.tsx';
import ToolSkeleton from '../skeleton/ToolSkeleton.tsx';
import { useDashboard } from '../../context/DashboardProvider.tsx';
import { useFilterStore } from '../../stores/useFilterStore.tsx';

export default function ToolList({ tools }: { tools: Tools }) {
  const { error, loading } = useDashboard();
  const searchTerm = useFilterStore((state) => state.searchTerm);
  // const setSearchTerm = useFilterStore((state) => state.setSearchTerm);

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
              {tools.length} outil{tools.length !== 1 ? 's' : ''} trouvé
              {tools.length !== 1 ? 's' : ''}
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
            {tools.map((tool) => (
              <ToolRow key={tool.id} tool={tool} />
            ))}
          </div>

          {tools.length === 0 && (
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
