import { Search, X } from 'lucide-react';
import { useFilterStore } from '../../stores/useFilterStore.tsx';

export default function SearchInput() {
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const setSearchTerm = useFilterStore((state) => state.setSearchTerm);

  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" size={16} />
      <input
        type="text"
        placeholder="Rechercher un outil..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="min-w-[280px] rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-10 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
