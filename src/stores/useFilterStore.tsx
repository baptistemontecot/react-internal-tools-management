import { create } from 'zustand';

interface ToolDateFilterState {
  toolDateFilter: string;
  setToolDateFilter: (filter: string) => void;
}

export const useFilterStore = create<ToolDateFilterState>((set) => ({
  toolDateFilter: 'all',
  setToolDateFilter: (newFilter: string) => set({ toolDateFilter: newFilter }),
}));
