import type { StateCreator } from 'zustand';

export interface DateFilterSlice {
  toolDateFilter: 'all' | 'recent' | 'old';
  setToolDateFilter: (filter: DateFilterSlice['toolDateFilter']) => void;
  resetDateFilter: () => void;
  isRecentFilter: () => boolean;
}

export const createDateFilterSlice: StateCreator<DateFilterSlice, [], [], DateFilterSlice> = (set, get) => ({
  toolDateFilter: 'all',
  setToolDateFilter: (filter) => set({ toolDateFilter: filter }),
  resetDateFilter: () => set({ toolDateFilter: 'all' }),
  isRecentFilter: () => get().toolDateFilter === 'recent',
});

export const selectToolDateFilter = (state: DateFilterSlice) => state.toolDateFilter;
