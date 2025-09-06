import { create } from 'zustand';
import type { Tool } from '../types';

interface ToolsState {
  tools: Tool[];
  updateTool: (updatedTool: Tool) => void;
  deleteTool: (toolId: number) => void;
  addTool: (newTool: Tool) => void;
}

export const useToolsStore = create<ToolsState>((set) => ({
  tools: [],
  updateTool: (updatedTool) =>
    set((state) => ({
      tools: state.tools.map((tool) => (tool.id === updatedTool.id ? { ...tool, ...updatedTool } : tool)),
    })),
  deleteTool: (toolId) =>
    set((state) => ({
      tools: state.tools.filter((tool) => tool.id !== toolId),
    })),
  addTool: (newTool) =>
    set((state) => ({
      tools: [...state.tools, newTool],
    })),
}));
