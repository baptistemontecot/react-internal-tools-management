import type { StateCreator } from 'zustand';

export interface CategorySlice {
  categoryFilter: string;
  availableCategories: string[];
  setCategoryFilter: (category: string) => void;
  resetCategoryFilter: () => void;
  setAvailableCategories: (categories: string[]) => void;
  hasActiveCategoryFilter: () => boolean;
}

export const createCategorySlice: StateCreator<CategorySlice, [], [], CategorySlice> = (set, get) => ({
  categoryFilter: 'all',
  availableCategories: [],

  setCategoryFilter: (category) => set({ categoryFilter: category }),
  resetCategoryFilter: () => set({ categoryFilter: 'all' }),
  setAvailableCategories: (categories) => set({ availableCategories: categories }),
  hasActiveCategoryFilter: () => get().categoryFilter !== 'all',
});

export const selectCategoryFilter = (state: CategorySlice) => state.categoryFilter;
export const selectAvailableCategories = (state: CategorySlice) => state.availableCategories;
