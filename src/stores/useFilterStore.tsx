import { create } from 'zustand';

interface FilterState {
  toolDateFilter: string;
  setToolDateFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  toolDateFilter: 'all',
  setToolDateFilter: (filter) => set({ toolDateFilter: filter }),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  categoryFilter: 'all',
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  statusFilter: 'all',
  setStatusFilter: (status) => set({ statusFilter: status }),
  clearFilters: () =>
    set({
      searchTerm: '',
      categoryFilter: 'all',
      statusFilter: 'all',
    }),
}));
