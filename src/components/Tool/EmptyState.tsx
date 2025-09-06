import { Search, FileX, Plus } from 'lucide-react';
import { useFilterStore } from '../../stores/useFilterStore.tsx';

export function EmptyState() {
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const statusFilter = useFilterStore((state) => state.statusFilter);
  const categoryFilter = useFilterStore((state) => state.categoryFilter);
  const clearFilters = useFilterStore((state) => state.clearAllFilters);

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || categoryFilter !== 'all';

  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 h-16 w-16 text-gray-400">
        {searchTerm ? <Search size={64} className="mx-auto" /> : <FileX size={64} className="mx-auto" />}
      </div>

      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
        {searchTerm
          ? 'Aucun outil trouvé'
          : hasActiveFilters
            ? 'Aucun résultat avec ces filtres'
            : 'Aucun outil disponible'}
      </h3>

      <p className="mb-6 text-gray-500 dark:text-gray-400">
        {searchTerm
          ? `Aucun résultat pour "${searchTerm}"`
          : hasActiveFilters
            ? 'Essayez de modifier ou supprimer vos filtres'
            : 'Commencez par ajouter des outils à votre tableau de bord'}
      </p>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-100 hover:text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30"
          >
            <Search size={16} className="mr-2" />
            Effacer les filtres
          </button>
        )}

        {!hasActiveFilters && (
          <button className="inline-flex items-center rounded-lg border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none">
            <Plus size={16} className="mr-2" />
            Ajouter un outil
          </button>
        )}
      </div>
    </div>
  );
}
