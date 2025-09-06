import type { StateCreator } from 'zustand';
import type { ToolStatus } from '../../types';

export interface StatusSlice {
  statusFilter: ToolStatus | undefined;
  setStatusFilter: (status: ToolStatus | undefined) => void;
  resetStatusFilter: () => void;
  getActiveStatusCount?: () => number;
}

export const createStatusSlice: StateCreator<StatusSlice, [], [], StatusSlice> = (set, get) => ({
  statusFilter: 'all',

  setStatusFilter: (status) => set({ statusFilter: status }),
  resetStatusFilter: () => set({ statusFilter: 'all' }),

  getActiveStatusCount: () => {
    const { statusFilter } = get();
    return statusFilter === 'active' ? 1 : 0;
  },
});

export const selectStatusFilter = (state: StatusSlice) => state.statusFilter;
export const selectResetStatusFilter = (state: StatusSlice) => state.resetStatusFilter;
