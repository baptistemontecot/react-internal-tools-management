// ===== STATUS SLICE =====
export {
  createDepartmentSlice,
  selectDepartmentFilter,
  selectResetDepartmentFilter,
  type DepartmentSlice,
} from './departmentSlice.ts';

// ===== STATUS SLICE =====
export { createStatusSlice, selectStatusFilter, selectResetStatusFilter, type StatusSlice } from './statusSlice.ts';

// ===== SEARCH SLICE =====
export { createSearchSlice, selectSearchTerm, selectHasSearchTerm, type SearchSlice } from './searchSlice.ts';

// ===== CATEGORY SLICE =====
export {
  createCategorySlice,
  selectCategoryFilter,
  selectAvailableCategories,
  type CategorySlice,
} from './categorySlice.ts';

// ===== DATE FILTER SLICE =====
export { createDateFilterSlice, selectToolDateFilter, type DateFilterSlice } from './dateFilterSlice.ts';

export type AllSlicesTypes = DepartmentSlice & StatusSlice & SearchSlice & CategorySlice & DateFilterSlice;
