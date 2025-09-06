import { devtools } from 'zustand/middleware';
import { create, type StateCreator } from 'zustand';
import { createDepartmentSlice, type DepartmentSlice } from './slices';
import { createStatusSlice, type StatusSlice } from './slices';
import { createSearchSlice, type SearchSlice } from './slices';
import { createCategorySlice, type CategorySlice } from './slices';
import { createDateFilterSlice, type DateFilterSlice } from './slices';

export interface FilterState extends DepartmentSlice, StatusSlice, SearchSlice, CategorySlice, DateFilterSlice {
  clearAllFilters: () => void;
  resetFiltersExceptSearch: () => void;
  hasAnyActiveFilter: () => boolean;
}

const createGlobalActions: StateCreator<
  FilterState,
  [['zustand/devtools', never]],
  [],
  Pick<FilterState, 'clearAllFilters' | 'resetFiltersExceptSearch' | 'hasAnyActiveFilter'>
> = (set, get) => ({
  clearAllFilters: () => {
    set(
      {
        searchTerm: '',
        departmentFilter: 'all',
        statusFilter: 'all',
        categoryFilter: 'all',
        toolDateFilter: 'all',
      },
      false,
      'clearAllFilters',
    );
  },

  resetFiltersExceptSearch: () => {
    set(
      {
        departmentFilter: 'all',
        statusFilter: 'all',
        categoryFilter: 'all',
        toolDateFilter: 'all',
      },
      false,
      'resetFiltersExceptSearch',
    );
  },

  hasAnyActiveFilter: () => {
    const state = get();
    return (
      state.searchTerm !== '' ||
      state.departmentFilter !== 'all' ||
      state.statusFilter !== 'all' ||
      state.categoryFilter !== 'all' ||
      state.toolDateFilter !== 'all'
    );
  },
});

export const useFilterStore = create<FilterState>()(
  devtools(
    (...args) => ({
      ...createDepartmentSlice(...args),
      ...createStatusSlice(...args),
      ...createSearchSlice(...args),
      ...createCategorySlice(...args),
      ...createDateFilterSlice(...args),
      ...createGlobalActions(...args),
    }),
    { name: 'filter-store' },
  ),
);

export const useSearchTerm = () => useFilterStore((state) => state.searchTerm);
export const useDepartmentFilter = () => useFilterStore((state) => state.departmentFilter);
export const useStatusFilter = () => useFilterStore((state) => state.statusFilter);
export const useCategoryFilter = () => useFilterStore((state) => state.categoryFilter);
export const useToolDateFilter = () => useFilterStore((state) => state.toolDateFilter);

export const useHasActiveFilters = () => useFilterStore((state) => state.hasAnyActiveFilter());

export const useSetSearchTerm = () => useFilterStore((state) => state.setSearchTerm);
export const useSetDepartmentFilter = () => useFilterStore((state) => state.setDepartmentFilter);
export const useSetStatusFilter = () => useFilterStore((state) => state.setStatusFilter);
export const useSetCategoryFilter = () => useFilterStore((state) => state.setCategoryFilter);
export const useSetToolDateFilter = () => useFilterStore((state) => state.setToolDateFilter);
export const useClearAllFilters = () => useFilterStore((state) => state.clearAllFilters);
