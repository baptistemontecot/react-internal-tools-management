import React from 'react';
import ToolRow from './ToolRow';
import type { Tool, Tools } from '../../types';
import ToolSkeleton from '../skeleton/ToolSkeleton.tsx';
import { useFilterStore } from '../../stores/useFilterStore';
import { isUpdatedLast30Days } from '../../utils/filterUtils';
import { useDashboard } from '../../context/DashboardProvider.tsx';
import ErrorMessage from '../common/ErrorMessage.tsx';

export default function ToolList({ tools }: { tools: Tools }) {
  const { error, loading } = useDashboard();
  const filter = useFilterStore((state) => state.toolDateFilter);

  const filteredTools = tools?.filter((tool: Tool) => filter === 'all' || isUpdatedLast30Days(tool)) || [];

  return (
    <>
      {error ? (
        <>
          <ErrorMessage message="Impossible de charger les outils. Vérifiez votre connexion." />
        </>
      ) : loading ? (
        <>
          <ToolSkeleton />
        </>
      ) : (
        <>
          <div className="min-w-max overflow-hidden">
            <div className="grid grid-cols-[400px_1fr_1fr_1fr_1fr] border-b border-gray-200 px-2 py-5 text-sm dark:border-gray-800 dark:bg-black dark:text-gray-400">
              <div>Tool</div>
              <div>Department</div>
              <div>Users</div>
              <div>Monthly Cost</div>
              <div>Status</div>
            </div>
            {filteredTools.map((tool: Tool) => (
              <ToolRow key={tool.id} tool={tool} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
