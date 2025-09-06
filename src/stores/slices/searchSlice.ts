import type { StateCreator } from 'zustand';

export interface SearchSlice {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  hasSearchTerm: () => boolean;
}

export const createSearchSlice: StateCreator<SearchSlice, [], [], SearchSlice> = (set, get) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term.trim() }),
  clearSearch: () => set({ searchTerm: '' }),
  hasSearchTerm: () => get().searchTerm.length > 0,
});

export const selectSearchTerm = (state: SearchSlice) => state.searchTerm;
export const selectHasSearchTerm = (state: SearchSlice) => state.hasSearchTerm();
